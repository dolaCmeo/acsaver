# coding=utf-8
from .utils import os, json, subprocess, SaverBase, SaverData, \
    url_saver, json_saver, json2js, downloader, live_danmaku_log_to_json

__author__ = 'dolacmeo'


class LiveSaver(SaverBase):

    def __init__(self, acer, ac_obj):
        self.acer = acer
        self.ac_obj = ac_obj
        super().__init__(acer, ac_obj)

    @property
    def begin_time(self):
        if self.ac_obj.past_time > 0:
            return self.ac_obj.live.start_time.replace("-", "").replace(":", "").replace(" ", "")
        return None

    @property
    def save_dir(self):
        return os.path.join(self._save_path, self.begin_time)

    def live_raw_save(self):
        if self.ac_obj.past_time == -1:
            return False
        os.makedirs(self.save_dir, exist_ok=True)
        url_name = f"{self.ac_obj.live.raw_data.get('caption', '@'+self.ac_obj.username)}"
        url_saved = url_saver(self.ac_obj.referer, self.save_dir, url_name)
        raw_saved = json_saver(self.ac_obj.live.raw_data, self.save_dir, f"{self.begin_time}.video.json")
        json2js(os.path.join(self.save_dir, f"{self.begin_time}.video.json"),
                f"LOADED.live['{self.ac_obj.uid}_{self.begin_time}']")
        downloader(self.acer.client, [(self.ac_obj.cover, os.path.join(self.save_dir, 'cover._'))])
        return all([url_saved, raw_saved])

    def loading(self):
        assert self.ac_obj.__class__.__name__ in SaverData.ac_name_map.keys()
        self.keyname = SaverData.ac_name_map[self.ac_obj.__class__.__name__]
        self._save_root = self.acer.config.get("SaverRootPath", os.getcwd())
        self._save_path = os.path.join(self._save_root, self.keyname, str(self.ac_obj.uid))
        os.makedirs(self._save_path, exist_ok=True)

    def _save_raw(self):
        url_name = f"@{self.ac_obj.raw_data['user']['name']}"
        url_saved = url_saver(self.ac_obj.referer, self._save_path, url_name)
        self.tasks.extend([
            (self.ac_obj.qrcode, os.path.join(self._save_path, 'share_qrcode.png')),
            (self.ac_obj.mobile_qrcode, os.path.join(self._save_path, 'mobile_qrcode.png'))
        ])
        downloader(self.acer.client, self.tasks)
        self.tasks = list()
        self._save_member([self.ac_obj.uid])
        return url_saved

    def _record_live(self, quality: [int, str] = -1):
        live = self.ac_obj.live
        if live is None:
            return False
        if quality in [-1, "-1"]:
            quality = len(live.representation) - 1
        cmd_with_progress = [
            "start", "cmd", "/q", "/k",
            f"chcp 65001 && mode con cols=49 lines=4 && title AcLive({live.uid}) &&",
            "python", SaverData.cmd_path, "live_recorder",
            "--args", f"{self.ac_obj.referer}", f"{self._save_path}", f"{quality}"
        ]
        subprocess.Popen(cmd_with_progress, shell=True)

    def _live_danmaku_logger(self):
        live = self.ac_obj.live
        if self.ac_obj.past_time < 0:
            return False
        cmd_with_progress = [
            "start", "cmd", "/q", "/k",
            f"chcp 65001 && mode con cols=49 lines=6 && title AcLive({live.uid}) &&",
            "python", SaverData.cmd_path, "live_danmaku",
            "--args", f"{self.ac_obj.uid}", f"{self.save_dir}", "0"
        ]
        subprocess.Popen(cmd_with_progress, shell=True)

    def record(self):
        self._save_raw()
        self.live_raw_save()
        if self.ac_obj.past_time > 0:
            self._record_live()
            print("已开启一个直播录像窗口")
            self._live_danmaku_logger()
            print("已开启一个直播弹幕记录窗口")
            print("提前关闭窗口会导致记录不完整。\n如直播结束则自动关闭。")
        else:
            print(f"Live is CLOSED.")
        return True

    def gen_datas(self, live_start_date_str: [str, None] = None):
        if live_start_date_str is None:
            if self.begin_time is None:
                print(f"Live is CLOSED.")
                return False
            base_dir = self.save_dir
        else:
            base_dir = os.path.join(self._save_path, live_start_date_str)
            if os.path.isdir(base_dir) is False:
                print(f"NOT FOUND: {base_dir=}")
                return False
        uid = os.path.basename(os.path.dirname(base_dir))
        start_date = os.path.basename(base_dir)
        vdata = json.load(open(os.path.join(base_dir, f"{start_date}.video.json"), "r"))
        start_unix = vdata.get("liveStartTime")
        danmaku_log_path = os.path.join(base_dir, f"{uid}_{start_unix}.log")
        videos = [x for x in os.listdir(base_dir) if x.endswith(".mp4")]
        for video in videos:
            video_path = os.path.join(base_dir, video)
            print(f"{video_path=}")
            live_danmaku_log_to_json(danmaku_log_path, video_path)
        return True
