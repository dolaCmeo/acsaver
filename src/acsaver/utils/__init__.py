# coding=utf-8
from .utils import *

__author__ = 'dolacmeo'


class SaverBase:
    ac_obj = None
    templates = saver_template()
    keyname = None
    _save_root = None
    _save_path = None
    tasks = list()

    def __init__(self, acer, ac_obj):
        self.acer = acer
        self.ac_obj = ac_obj
        self.loading()

    @property
    def _objname(self):
        return self.__class__.__name__

    @property
    def _data_path(self):
        p = os.path.join(self._save_path, 'data')
        os.makedirs(p, exist_ok=True)
        return p

    @property
    def _img_path(self):
        p = os.path.join(self._save_path, 'img')
        os.makedirs(p, exist_ok=True)
        return p

    @property
    def rtype(self):
        return self.ac_obj.resource_type

    @property
    def rid(self):
        return self.ac_obj.resource_id

    @property
    def page_template(self):
        return self.templates.get_template(f"{self.keyname}.html")

    def loading(self):
        assert self.ac_obj.__class__.__name__ in SaverData.ac_name_map.keys()
        self.keyname = SaverData.ac_name_map[self.ac_obj.__class__.__name__]
        self._save_root = self.acer.config.get("SaverRootPath", os.getcwd())
        self._save_path = os.path.join(self._save_root, self.keyname, str(self.rid))
        os.makedirs(self._save_path, exist_ok=True)
        pass

    def _save_raw(self):
        url_saved = url_saver(self.ac_obj.referer, self._save_path, f"{self.ac_obj.title}")
        raw_saved = json_saver(self.ac_obj.raw_data, self._data_path, f"{self.ac_obj.resource_id}")
        json2js(os.path.join(self._data_path, f"{self.rid}.json"), f"{self.keyname}['{self.rid}']")
        self._save_member([self.ac_obj.up().uid], True)
        return all([url_saved, raw_saved])

    def _save_image(self):
        img_task = [
            (self.ac_obj.cover, os.path.join(self._save_path, 'cover._')),
            (self.ac_obj.qrcode, os.path.join(self._data_path, 'share_qrcode.png'))
        ]
        if self.keyname in ['video']:
            img_task.append((self.ac_obj.mobile_qrcode, os.path.join(self._data_path, 'mobile_qrcode.png')))
        self.tasks.extend(img_task)
        t = downloader(self.acer.client, self.tasks, display=True)
        self.tasks = list()
        return t

    def _part_video_name(self, num: int):
        assert self.keyname in ['video', 'bangumi']
        ends = "" if num == 0 else f"_{num + 1}"
        if self.keyname == 'bangumi':
            this_episode = self.ac_obj.episode_data[num]
            item_id = this_episode['itemId']
            vid = this_episode['videoId']
            ends = "" if num == 0 else f"_36188_{item_id}"
        return f"{self.rid}{ends}"

    def _save_video(self, num: int = 0, quality: [int, str] = "1080p"):
        this_video = self.ac_obj.video(num)
        m3u8_url = this_video.m3u8_url(quality, False)
        vname = self._part_video_name(num)
        save_path = os.path.join(self._save_path, f"{vname}.mp4")
        return m3u8_downloader(m3u8_url[0], save_path)

    def _record_live(self, quality: [int, str] = -1):
        live = self.ac_obj.live
        assert live.is_open is True
        # live_start = live.raw_data.get('liveStartTime', 0) // 1000
        begin_time = live.start_time.replace("-", "").replace(":", "").replace(" ", "")
        save_dir = os.path.join(self._save_path, begin_time)
        time_now = unix2datestr(f="%Y%m%d%H%M%S")
        save_mp4 = os.path.join(save_dir, f"{time_now}.mp4")
        os.makedirs(save_dir, exist_ok=True)
        adapt = live.m3u8_url(quality, False)
        live_obs_stream = adapt['url']
        stream_split = parse.urlsplit(live_obs_stream)
        stream_key = parse.parse_qs(stream_split.query).get('auth_key', [])[0]
        live_obs_stream = f"{stream_split.scheme}://{stream_split.netloc}{stream_split.path}?auth_key={stream_key}"
        ffmpeg = get_usable_ffmpeg()
        if ffmpeg is None:
            print(f"record need ffmpeg")
            return False
        cmd_with_progress = [
            "start", "cmd", "/q", "/c",
            f"chcp 65001 && mode con cols=52 lines=12 && title AcLive({live.uid}) &&",
            ffmpeg,
            "-progress", "-", "-nostats",
            '-loglevel', '+repeat',
            "-i", f"{live_obs_stream}",
            "-c:v", "copy", "-c:a", "copy",
            f"{save_mp4}"
        ]
        p = subprocess.Popen(
            cmd_with_progress,
            stdin=subprocess.PIPE,
            stdout=subprocess.PIPE,
            stderr=subprocess.STDOUT,
            universal_newlines=False,
            shell=True)
        begin_read = False
        tmp = dict()
        console = Console()

        def display_tui(data):
            filesize = int(data.get('total_size', 0))
            infos = f" 已录制 {data.get('out_time', '00:00:00.000000')}\r\n " \
                    f" 比特率: {data.get('bitrate', '???')}   " \
                    f"大小: {sizeof_fmt(filesize): >6} "
            record_panel = Panel(Text(infos, justify='center'),
                                 title=f"AcLive({live.uid})@{time_now}.mp4",
                                 border_style='red', width=50, style="black on white")
            return record_panel

        with Live(console=console) as live_console:
            while True:
                if p.stdout is None:
                    continue
                stderr_line = p.stdout.readline().decode("utf-8", errors="replace").strip()
                if stderr_line == "" and p.poll() is not None:
                    break
                if stderr_line == "Press [q] to stop, [?] for help":
                    begin_read = True
                    continue
                if begin_read is True:
                    r = stderr_line.split('=')
                    tmp.update({r[0]: r[1]})
                    live_console.update(Align.center(display_tui(tmp)))

        return True

    def _save_danmaku(self, num: int = 0, quality: [int, str] = "1080p"):
        this_video = self.ac_obj.video(num)
        vname = self._part_video_name(num)
        json_saver(this_video.danmaku.danmaku_data, self._data_path, f"{vname}.danmaku.json")
        json2js(os.path.join(self._data_path, f"{self.rid}.danmaku.json"), f"let danmakuData")
        return danmaku2ass(self._save_path, vname, quality)

    def _save_comment(self, update: bool = False):
        local_comment_data, local_comment_floors = None, []
        comment_json_path = os.path.join(self._data_path, f"{self.rid}.comment.json")
        comment_json_path_saved = os.path.isfile(comment_json_path)
        if comment_json_path_saved:
            print("loading comment data.json")
            local_comment_data = json.load(open(comment_json_path, 'rb'))
            local_comment_floors = [x['floor'] for x in local_comment_data['rootComments']]
        if update is True or comment_json_path_saved is False:
            comment_obj = self.ac_obj.comment()
            comment_obj.get_all_comments()
            if local_comment_data is not None:
                comment_data = local_comment_data
                comment_data['hotComments'] = comment_obj.hot_comments
                comment_data['rootComments'].extend(
                    [c for c in comment_obj.root_comments if c['floor'] not in local_comment_floors])
                comment_data['subCommentsMap'].update(comment_obj.sub_comments)
                comment_data['save_unix'] = time.time()
            else:
                comment_data = {
                    "hotComments": comment_obj.hot_comments,
                    "rootComments": comment_obj.root_comments,
                    "subCommentsMap": comment_obj.sub_comments,
                    "save_unix": time.time()
                }
            uids = list()
            for c in comment_data['rootComments']:
                if c['userId'] not in uids:
                    uids.append(c['userId'])
            for _, i in comment_data['subCommentsMap'].items():
                for j in i['subComments']:
                    if j['userId'] not in uids:
                        uids.append(j['userId'])
            self._save_member(uids)
            json_saver(comment_data, self._data_path, f"{self.rid}.comment.json")
            print(f"SAVED: {comment_json_path=}")
        img_task = tans_comment_uub2html(self._save_path)
        if len(img_task) > 0:
            os.makedirs(os.path.join(self._save_path, 'img'), exist_ok=True)
            downloader(self.acer.client, img_task, display=True)
        return True

    def _save_member(self, ids: list, force: bool = False):
        if len(ids) == 0:
            return []
        done = list()
        member_dir = os.path.join(self._save_root, 'member')
        saved = os.listdir(member_dir)
        ids = sorted(list(set(ids)))
        ids_with_ext = [f"{i}.json" for i in ids]
        ids = list(set(ids_with_ext).difference([x for x in saved if x.endswith('.json')]))
        ids = [y.split('.')[0] for y in ids]
        avatar_task = list()
        with Progress() as pp:
            get_member = pp.add_task("save members", total=len(ids))
            for uid in ids:
                if all([f"{uid}.json" in saved, f"{uid}.js" in saved, f"{uid}_avatar" in saved]) is True \
                        and force is False:
                    pp.update(get_member, advance=1)
                    done.append(uid)
                    continue
                user_req = self.acer.client.get(AcSource.apis['userInfo'], params=dict(userId=uid))
                user_data = user_req.json()
                profile = user_data.get('profile')
                user_json = os.path.join(member_dir, f"{uid}.json")
                user_js = os.path.join(member_dir, f"{uid}.js")
                user_avatar = os.path.join(member_dir, f"{uid}_avatar")
                if all([os.path.isfile(user_json), os.path.isfile(user_js), os.path.isfile(user_avatar)]) is True \
                        and force is False:
                    pp.update(get_member, advance=1)
                    done.append(uid)
                    continue
                with open(user_json, 'w') as uid_file:
                    json.dump(profile, uid_file, separators=(',', ':'))
                user_json_saved = os.path.isfile(user_json)
                user_json_string = open(os.path.join(user_json), 'rb').read().decode()
                with open(user_js, 'wb') as js_file:
                    user_js_string = f"let user_{uid}={user_json_string};"
                    js_file.write(user_js_string.encode())
                user_js_saved = os.path.isfile(user_js)
                avatar = parse.urlparse(profile['headUrl'])
                if not avatar.path.endswith('defaultAvatar.jpg'):
                    avatar_url = f"{avatar.scheme}://{avatar.netloc}{avatar.path}"
                    avatar_task.append((avatar_url, user_avatar))
                if all([user_json_saved, user_js_saved]):
                    done.append(uid)
                pp.update(get_member, advance=1)
                time.sleep(0.1)
            pp.update(get_member, completed=len(ids))
            pp.stop()
        if len(avatar_task) > 0:
            downloader(self.acer.client, avatar_task, display=True)
        return done

    def _update_js_data(self):
        self.__folder_list_update()
        self.__record_last()

    def __folder_list_update(self):
        jsFiles = []
        for fn in SaverData.folder_names:
            fpath = os.path.join(self._save_root, fn)
            f_all = os.listdir(fpath)
            f_all = [i for i in f_all if os.path.isdir(os.path.join(fpath, i))]
            f_all_string = json.dumps(f_all, separators=(',', ':'))
            nums_js = f"let {fn}Nums={f_all_string};"
            js_path = os.path.join(fpath, 'nums.js')
            with open(os.path.join(fpath, 'nums.js'), 'wb') as js:
                js.write(nums_js.encode())
            jsFiles.append(os.path.isfile(js_path))
        return all(jsFiles)

    def __record_last(self):
        last_data = []
        last_path = os.path.join(self._save_root, self.keyname, 'leatest.js')
        if os.path.isfile(last_path):
            sn = len(f"{self.keyname}Last=")
            last_text = open(last_path, 'r').read()
            last_data = json.loads(last_text.strip()[sn:-1])
        if self.rid not in last_data:
            last_data.append(self.rid)
        last_string = json.dumps(last_data, separators=(',', ':'))
        last_js = f"{self.keyname}Last={last_string};"
        with open(last_path, 'wb') as js:
            js.write(last_js.encode())
        recent_data = []
        recent_path = os.path.join(self._save_root, 'assets', 'data', 'recent.js')
        if os.path.isfile(recent_path):
            recent_text = open(recent_path, 'r').read()
            recent_data = json.loads(recent_text.strip()[12:-1])
        if [self.keyname, self.rid] not in recent_data:
            recent_data.append([self.keyname, self.rid])
        recent_string = json.dumps(recent_data, separators=(',', ':'))
        recent_js = f"AcCacheList={recent_string};"
        with open(recent_path, 'wb') as js:
            js.write(recent_js.encode())
        return all([os.path.isfile(last_path), os.path.isfile(recent_path)])
