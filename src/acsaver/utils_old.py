# coding=utf-8
import os
import math
import time
import json
import httpx
import random
import shutil
import filetype
import subprocess
from urllib import parse
from urllib.parse import urlparse
from rich.progress import Progress
from .libs.ffmpeg_progress_yield import FfmpegProgress

__author__ = 'dolacmeo'
__project__ = ''
__doc__ = ''

videoQualitiesRefer = {
    "2160p120HDR": {
        "definition": "4K",
        "disableAutoSwitch": True,
        "limitType": 1,
        "qualityLabel": "2160P120 HDR",
        "qualityType": "2160p120HDR",
        "width": 3840,
        "height": 2160
    },
    "2160p120": {
        "limitType": 1,
        "disableAutoSwitch": True,
        "qualityType": "2160p120",
        "qualityLabel": "2160P120",
        "definition": "4K",
        "width": 3840,
        "height": 2160
    },
    "2160p60HDR": {
        "limitType": 1,
        "disableAutoSwitch": True,
        "qualityType": "2160p60HDR",
        "qualityLabel": "2160P60 HDR",
        "definition": "4K",
        "width": 3840,
        "height": 2160
    },
    "2160p60": {
        "limitType": 1,
        "disableAutoSwitch": True,
        "qualityType": "2160p60",
        "qualityLabel": "2160P60",
        "definition": "4K",
        "width": 3840,
        "height": 2160
    },
    "2160pHDR": {
        "limitType": 1,
        "disableAutoSwitch": True,
        "qualityType": "2160pHDR",
        "qualityLabel": "2160P HDR",
        "definition": "4K",
        "width": 3840,
        "height": 2160
    },
    "2160p": {
        "limitType": 1,
        "disableAutoSwitch": True,
        "qualityType": "2160p",
        "qualityLabel": "2160P",
        "definition": "4K",
        "width": 3840,
        "height": 2160
    },
    "1080p60HDR": {
        "limitType": 1,
        "qualityType": "1080p60HDR",
        "qualityLabel": "1080P60 HDR",
        "definition": "HD",
        "width": 1920,
        "height": 1080
    },
    "1080p60": {
        "limitType": 1,
        "qualityType": "1080p60",
        "qualityLabel": "1080P60",
        "definition": "HD",
        "width": 1920,
        "height": 1080
    },
    "1080p+": {
        "limitType": 1,
        "qualityType": "1080p+",
        "qualityLabel": "1080P+",
        "definition": "HD",
        "width": 1920,
        "height": 1080
    },
    "1080pHDR": {
        "limitType": 1,
        "qualityType": "1080pHDR",
        "qualityLabel": "1080P HDR",
        "definition": "HD",
        "width": 1920,
        "height": 1080
    },
    "1080p": {
        "limitType": 1,
        "qualityType": "1080p",
        "qualityLabel": "1080P",
        "definition": "HD",
        "width": 1920,
        "height": 1080
    },
    "720p60": {
        "limitType": 1,
        "qualityType": "720p60",
        "qualityLabel": "720P60",
        "width": 1280,
        "height": 720
    },
    "720p": {
        "defaultSelect": True,
        "qualityType": "720p",
        "qualityLabel": "720P",
        "width": 1280,
        "height": 720
    },
    "540p": {
        "qualityType": "540p",
        "qualityLabel": "540P",
        "width": 960,
        "height": 540
    },
    "480p": {
        "qualityType": "480p",
        "qualityLabel": "480P",
        "width": 720,
        "height": 480
    },
    "360p": {
        "qualityType": "360p",
        "qualityLabel": "360P",
        "width": 640,
        "height": 360
    },
}


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

    thisVideoInfo = videoQualitiesRefer[vq]
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


def downloader(client, src_url, fname: [str, None] = None, dest_dir: [str, None] = None, display: bool = True):
    if dest_dir is None:
        dest_dir = os.getcwd()
    elif os.path.isabs(dest_dir) is False:
        dest_dir = os.path.abspath(dest_dir)
    if not os.path.isdir(dest_dir):
        os.makedirs(dest_dir, exist_ok=True)
    if fname is None:
        fname = urlparse(src_url).path.split('/')[-1]
    fpath = os.path.join(dest_dir, fname)

    try:
        with open(fpath, 'wb') as download_file:
            with client.stream("GET", src_url) as response:
                if response.status_code // 100 != 2:
                    download_file.close()
                    os.remove(fpath)
                    return None
                total = int(response.headers.get("Content-Length", 0))
                total = None if total == 0 else total // 1024
                with Progress(disable=not display) as pp:
                    download = pp.add_task(fname, total=total or 100)
                    for chunk in response.iter_bytes():
                        download_file.write(chunk)
                        if total is None:
                            pp.update(download, advance=1)
                        else:
                            pp.update(download, completed=response.num_bytes_downloaded // 1024)
                    pp.update(download, completed=total or 100)
                    pp.stop()
    except (httpx.ConnectError, httpx.ConnectTimeout, httpx.ReadTimeout):
        print("httpx.ConnectError:", src_url)
        os.remove(fpath)
        return None
    except KeyboardInterrupt:
        os.remove(fpath)
        raise KeyboardInterrupt

    if os.path.isfile(fpath) and os.path.exists(fpath):
        if '.' not in fname:
            kind = filetype.guess_extension(fpath)
            if kind is not None:
                new_fpath = ".".join([fpath, kind])
                shutil.move(fpath, new_fpath)
                return new_fpath
        return fpath
    return None


if __name__ == '__main__':
    pass
