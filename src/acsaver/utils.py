# coding=utf-8
import os
import math
import time
import json
import httpx
import shutil
import random
import filetype
import subprocess
from urllib import parse
from rich.progress import Progress
from jinja2 import PackageLoader, Environment
from .ffmpeg_progress_yield import FfmpegProgress
from .source import SaverData
from acfunsdk.source import AcSource

__author__ = 'dolacmeo'


class SaverBase:
    ac_obj = None
    __save_root = None
    __save_path = None

    def __init__(self, acer, ac_obj):
        self.acer = acer
        self.ac_obj = ac_obj
        self.loading()

    @property
    def _objname(self):
        return self.__class__.__name__

    def loading(self):
        self.__save_root = self.acer.config.get("SaverRootPath", os.getcwd())
        assert self.ac_obj._objname in SaverData.ac_name_map.keys()
        folder_name = SaverData.ac_name_map[self.ac_obj._objname]
        ac_name = str(self.ac_obj.resource_id)
        self.__save_path = os.path.join(self.__save_root, folder_name, ac_name)
        pass

    def _save_raw(self):
        url_saved = url_saver(self.ac_obj.referer, self.__save_path,
                              f"{self.ac_obj.title}")
        raw_saved = json_saver(self.ac_obj.raw_data, self.__save_path,
                               f"{self.ac_obj.resource_id}_raw")
        return all([url_saved, raw_saved])

    def _save_image(self):
        pass

    def _save_video(self):
        pass

    def _save_danmaku(self):
        pass

    def _save_comment(self):
        pass

    def _save_member(self):
        pass

    def _gen_html(self):
        pass

    def _update_js_data(self):
        pass


def saver_template(**filters):
    templates = Environment(loader=PackageLoader('acsaver', 'templates'))
    templates.filters['unix2datestr'] = unix2datestr
    templates.filters['math_ceil'] = math.ceil
    for name, func in filters.items():
        templates.filters[name] = func
    return templates


def unix2datestr(t: (int, float, None) = None, f: str = "%Y-%m-%d %H:%M:%S"):
    if t is None:
        return time.strftime(f, time.localtime(time.time()))
    t = int(t)
    n = int(math.log10(t))
    if n > 10:
        t = t // math.pow(10, n - 10)
    elif n < 10:
        t = t * math.pow(10, 10 - n)
    return time.strftime(f, time.localtime(t))


def url_saver(url: str, base_path: [os.PathLike, str], filename: str):
    file_path = os.path.join(base_path, filename)
    if not file_path.endswith(".url"):
        file_path = f"{file_path}.url"
    raw_data = f"[InternetShortcut]\nURL={url}\n"
    with open(file_path, 'wb') as url_file:
        url_file.write(raw_data.encode())
    result = os.path.isfile(file_path)
    print("SAVED:", result, file_path)
    return result


def json_saver(data: dict, base_path: [os.PathLike, str], filename: str):
    file_path = os.path.join(base_path, filename)
    if not file_path.endswith(".json"):
        file_path = f"{file_path}.json"
    json_string = json.dumps(data, separators=(',', ':'))
    with open(file_path, 'wb') as json_file:
        json_file.write(json_string.encode())
    result = os.path.isfile(file_path)
    print("SAVED:", result, file_path)
    return result


def danmaku2ass(client, folder_path: str, filenameId: str, vq: str = "720p", fontsize: int = 40):
    """
    https://github.com/niuchaobo/acfun-helper/blob/master/src/fg/modules/danmaku.js
    基础代码复刻自acfun助手中弹幕相关处理
    关于解决原代码中的弹幕重叠问题：
        0. 原弹幕数据要按时间进行排序
        1. 记录每条弹幕通道最后截止位置
        2. 如果同期所有通道已满，则减少弹幕停留时间(加速通过)

    :param client: acer.client
    :param folder_path: source path
    :param filenameId: ac_num
    :param vq: VideoQuality
    :return: ass file path
    :param fontsize: num px
    """
    # 检查路径
    assert os.path.isdir(folder_path) is True
    folder_name = os.path.basename(folder_path)
    video_data_path = os.path.join(folder_path, 'data', f"{filenameId}.json")
    danmaku_data_path = os.path.join(folder_path, 'data', f"{filenameId}.danmaku.json")
    assert all([os.path.isfile(video_data_path), os.path.isfile(danmaku_data_path)]) is True
    video_data = json.load(open(video_data_path, 'rb'))
    danmaku_data = json.load(open(danmaku_data_path, 'rb'))
    danmuMotionList = []
    if len(danmaku_data) == 0:
        return None

    thisVideoInfo = AcSource.videoQualitiesRefer[vq]
    thisVideoWidth = thisVideoInfo['width']
    thisVideoHeight = thisVideoInfo['height']
    thisDuration = 10
    channelNum = math.floor(thisVideoWidth / fontsize)
    scriptInfo = "\n".join([
        "[Script Info]",
        f"; AcVid: {folder_name}",
        f"; StreamName: {video_data['title']}",
        f"Title: {folder_name} - {video_data['user']['name']} - {video_data['title']}",
        f"Original Script: {folder_name} - {video_data['user']['name']} - {video_data['title']}",
        "Script Updated By: acfunSDK转换",
        "ScriptType: v4.00+",
        "Collisions: Normal",
        f"PlayResX: {thisVideoWidth}",
        f"PlayResY: {thisVideoHeight}"
    ])
    styles = "\n".join([
        "[V4+ Styles]",
        "Format: " + ", ".join([
            'Name', 'Fontname', 'Fontsize', 'PrimaryColour', 'SecondaryColour', 'OutlineColour',
            'BackColour', 'Bold', 'Italic', 'Underline', 'StrikeOut', 'ScaleX', 'ScaleY',
            'Spacing', 'Angle', 'BorderStyle', 'Outline', 'Shadow', 'Alignment', 'MarginL',
            'MarginR', 'MarginV', 'Encoding']),
        "Style: " + ",".join([
            'Danmu', 'Microsoft YaHei', f'{fontsize}',
            '&H00FFFFFF', '&H00FFFFFF', '&H00000000', '&H00000000',
            '0', '0', '0', '0', '100', '100', '0', '0', '1', '1',
            '0', '2', '20', '20', '2', '0'])
    ])
    events = "\n".join([
        "[Events]",
        "Format: " + ", ".join([
            'Layer', 'Start', 'End', 'Style', 'Name',
            'MarginL', 'MarginR', 'MarginV', 'Effect', 'Text\n'])
    ])
    assData = list()
    screenChannel = [None for i in range(channelNum)]

    def timeProc(second, offset=0):
        second = second + offset
        minute = math.floor(second / 60)
        hours = math.floor(second / 60 / 60)
        minute = minute - hours * 60
        second = second - hours * 60 * 60 - minute * 60
        sec = second + offset
        return f"{hours:0>2}:{minute:0>2}:{sec:0>2.2f}"

    def choice_channel(startT, endT):
        # 按新时间移除频道占位
        empty = []
        for i, thisEnd in enumerate(screenChannel):
            if i in [0, 1]:
                continue
            elif thisEnd is None:
                empty.append(i)
            elif startT > thisEnd:
                screenChannel[i] = None
        # 无空位时返回空
        if len(empty) == 0:
            return None
        # 随机选择空位，记录结束时间，返回结果
        used = random.choice(empty)
        screenChannel[used] = endT
        return used

    for danmaku in danmaku_data:
        # 略过高级弹幕
        if danmaku['danmakuType'] != 0:
            continue
        # 弹幕挂载时间（文本）（弹幕左边界 接触到 视频的右边界）
        startTime = danmaku['position'] / 1000
        # 弹幕的长度
        danmakuLen = len(danmaku['body']) * fontsize
        danmakuLen_total = danmakuLen + thisVideoWidth
        # 运动到出界的时间点
        toLeftTime = startTime + thisDuration + (danmakuLen_total / thisVideoWidth)
        # 寻找频道
        danmaku_channel = choice_channel(startTime, toLeftTime)
        if danmaku_channel is None:  # 频道全满，加速通过
            toLeftTime -= int(thisDuration / 2)
            danmaku_channel = random.randint(2, channelNum)
        channelHeight = danmaku_channel * fontsize
        # 所有点位
        x1 = danmakuLen_total
        y1 = channelHeight
        x2 = - danmakuLen
        y2 = channelHeight
        dialogue = [
            "Dialogue: 0", timeProc(startTime), timeProc(toLeftTime),
            "Danmu", f"{danmaku['userId']}", "20", "20", "2", "",
            "{\\move(" + f"{x1}", f"{y1}", f"{x2}", f"{y2})" + "}" + f"{danmaku['body']}"
        ]
        assData.append(",".join(dialogue))
    events += "\n".join(assData)
    result = "\n\n".join([scriptInfo, styles, events])
    ass_path = os.path.join(folder_path, f"{filenameId}.ass")
    with open(ass_path, 'w', encoding="utf_8_sig") as ass_file:
        ass_file.write(result)
    ass_js_path = os.path.join(folder_path, 'data', f"{filenameId}.ass.js")
    ass_js_data = [
        "let assData=\"\" + \n",
        *[f"\"{x}\" + \n" for x in result.split('\n')],
        "\"\";"
    ]
    with open(ass_js_path, 'wb') as ass_js:
        ass_js.write("".join(ass_js_data).encode())
    return ass_path


def get_usable_ffmpeg(cmd: [str, None] = None):
    cmds = ['ffmpeg', os.path.join(os.getcwd(), 'ffmpeg.exe')]
    if cmd is not None and os.path.isfile(cmd):
        cmds.append(cmd)
    for x in cmds:
        try:
            p = subprocess.Popen([x, '-version'], stdin=subprocess.DEVNULL,
                                 stdout=subprocess.PIPE, stderr=subprocess.PIPE)
            out, err = p.communicate()
            vers = str(out, 'utf-8').split('\n')[0].split()
            assert vers[0] == 'ffmpeg' and vers[2][0] > '0'
            return x
        except FileNotFoundError:
            continue
    return None


def acfun_video_downloader(client, data: dict,
                           save_path: [str, os.PathLike, None] = None, quality: [str, int, None] = 0):
    save_path = os.getcwd() if save_path is None else save_path
    quality = 0 if quality is None else quality
    quality_index, quality_text, filesize_bytes = -1, None, 0
    video_type, ac_num, part_num, ac_name, acfun_url = None, None, None, None, None
    # 获取视频编号名称等信息
    if "dougaId" in data:  # 视频类型
        video_type = "video"
        # ac_num = data.get("dougaId")
        # part_num = data.get("priority") + 1
        # ac_name = f"ac{ac_num}"
        # if part_num > 1:
        #     ac_name += f"_{part_num}"
        # acfun_url = f"{routes['video']}{ac_name[2:]}"
    elif "bangumiId" in data:  # 番剧类型
        video_type = "bangumi"
        # ac_num = data.get("bangumiId")
        # part_num = data.get("priority") // 10
        # item_id = data.get('itemId')
        # ac_name = f"aa{ac_num}"
        # if part_num > 1:
        #     ac_name += f"_36188_{item_id}"
        # acfun_url = f"{routes['bangumi']}{ac_name[2:]}"
    else:
        raise Exception("error: video type not support")
    # 编码信息，视频尺寸
    video_quality = data['currentVideoInfo']['transcodeInfos']
    if isinstance(quality, int):
        if quality not in range(len(video_quality)):
            raise Exception('error: out of the quality length')
        quality_index = quality
        quality_text = video_quality[quality]['qualityType']
        filesize_bytes = video_quality[quality]['sizeInBytes']
    elif isinstance(quality, str):
        for i, q in enumerate(video_quality):
            if q['qualityType'] == quality:
                quality_index = i
                quality_text = q['qualityType']
                filesize_bytes = q['sizeInBytes']
    if quality_index == -1 or filesize_bytes == 0:
        raise Exception('error: selected quality not found')
    player_json = json.loads(data['currentVideoInfo']['ksPlayJson'])
    quality_data = player_json['adaptationSet'][0]['representation'][quality_index]
    m3u8_url = quality_data['url']
    url_parse = parse.urlsplit(m3u8_url)
    video_path = "/".join(url_parse.path.split('/')[:-1])
    video_base_path = f"{url_parse.scheme}://{url_parse.netloc}{video_path}/"
    m3u8_req = client.get(m3u8_url)
    # 保存m3u8文件
    os.makedirs(save_path, exist_ok=True)
    with open(os.path.join(save_path, f"{ac_name}[{quality_text}].m3u8"), 'w') as m3u8_file:
        for line in m3u8_req.text.split('\n'):
            if line.startswith('#EXT'):
                m3u8_file.write(line + "\n")
                continue
            m3u8_file.write(f"{video_base_path}{line}\n")
    # ffmpeg 下载
    video_save_path = os.path.join(save_path, f"{ac_name}[{quality_text}].mp4")
    ffmpeg_cmd = get_usable_ffmpeg()
    ffmpeg_params = [
        ffmpeg_cmd, '-y', '-i', m3u8_url,
        '-c', 'copy', '-bsf:a', 'aac_adtstoasc',
        '--', video_save_path
    ]
    ff = FfmpegProgress(ffmpeg_params)
    with Progress() as pp:
        ff_download = pp.add_task(f"{ac_name}[{quality_text}].mp4", total=100)
        for progress in ff.run_command_with_progress():
            if progress > 0:
                pp.update(ff_download, completed=progress)
        pp.update(ff_download, completed=100)
        pp.stop()
    if os.path.isfile(video_save_path):
        return video_save_path
    return False


def downloader(client, src_urls_with_filename: list,
               dest_dir: [os.PathLike, str, None] = None,
               display: [bool, None] = None) -> dict:
    assert isinstance(client, httpx.Client)
    assert len(src_urls_with_filename) > 0 and len(src_urls_with_filename[0]) == 2
    dest_dir = os.getcwd() if dest_dir is None else dest_dir
    assert os.path.isdir(dest_dir)
    total = len(src_urls_with_filename)
    display = (total > 5) if display is None else display
    done_mark = dict()
    with Progress(disable=not display) as pp:
        for src_url, filename in src_urls_with_filename:
            ext_guess = filename is None
            if filename is None:
                filename = src_url.split("/")[-1] if filename is None else filename
                filename = os.path.join(dest_dir, filename)
            try:
                with client.stream("GET", src_url) as resp:
                    if resp.status_code // 100 != 2:
                        continue
                    total = int(resp.headers.get("Content-Length", 0))
                    total = None if total == 0 else total // 1024
                    download_task = pp.add_task(filename, total=(total or 100))
                    with open(filename, 'wb') as save_file:
                        for chunk in resp.iter_bytes():
                            save_file.write(chunk)
                            if total is None:
                                pp.update(download_task, advance=1)
                            else:
                                pp.update(download_task, completed=resp.num_bytes_downloaded // 1024)
                        pp.update(download_task, completed=total or 100)
            except (httpx.ConnectError, httpx.ConnectTimeout, httpx.ReadTimeout):
                print("httpx.ConnectError:", src_url)
                if os.path.isfile(filename):
                    os.remove(filename)
                if src_url.startswith("https://raw.githubusercontent.com"):
                    for x in SaverData.github_booster:
                        new_url = src_url.replace("raw.githubusercontent.com", x)
                        print(f"Retry With Github Booster: {new_url}")
                        resp = downloader(client, [(new_url, filename)])
                        if all(list(resp.values())):
                            break
                continue
            except KeyboardInterrupt:
                if os.path.isfile(filename):
                    os.remove(filename)
                raise KeyboardInterrupt
            finally:
                done_mark[src_url] = os.path.isfile(filename)
                if os.path.isfile(filename) is True and ext_guess is True:
                    if '.' not in filename:
                        kind = filetype.guess_extension(filename)
                        if kind is not None:
                            new_fpath = ".".join([filename, kind])
                            shutil.move(filename, new_fpath)
    return done_mark
