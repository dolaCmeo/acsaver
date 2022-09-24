import os
import json
import httpx
import zipfile
from urllib import parse

routes = {
    "emot_api": "https://www.acfun.cn/rest/pc-direct/emotion/getUserEmotion",
    "emot_base": "https://cdnfile.aixifan.com/static/umeditor/emotion/images"
}
header = {
        "Referer":          "https://www.acfun.cn/",
        "accept-encoding":  "gzip, deflate, br",
        "accept-language":  "zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",
        'User-Agent':       'Mozilla/5.0 (Windows NT 10.0; Win64; x64) '
                            'AppleWebKit/537.36 (KHTML, like Gecko) '
                            'Chrome/104.0.5112.102 Safari/537.36'
}
client = httpx.Client(headers=header)
emot_alias = ['default', 'ac', 'ac2', 'ac3', 'dog', 'tsj', 'brd', 'ais', 'td', 'zuohe', 'blizzard']


def json_saver(data: dict, base_path: [os.PathLike, str], filename: str):
    file_path = os.path.join(base_path, filename)
    if not file_path.endswith(".json"):
        file_path = f"{file_path}.json"
    json_string = json.dumps(data, separators=(',', ':'))
    with open(file_path, 'wb') as json_file:
        json_file.write(json_string.encode())
    print(f"SAVED: {file_path=}")
    return os.path.isfile(file_path)


def download(src: str, dest: str):
    req = client.get(src)
    if req.status_code // 100 == 2 and len(req.content):
        with open(dest, 'wb') as f:
            f.write(req.content)
        return os.path.isfile(dest)
    return None


def save_emot(assets_path: [os.PathLike, str, None] = r"assets"):
    if assets_path is None:
        assets_path = os.getcwd()
    assets_path = assets_path if os.path.isdir(assets_path) else os.getcwd()
    emot_path = os.path.join(assets_path, 'emot')
    os.makedirs(emot_path, exist_ok=True)
    # 接口获取表情数据
    emot_req = client.post(routes['emot_api'])
    emot_data = emot_req.json()
    assert emot_data['result'] == 0
    emot_json_saved = json_saver(emot_data, emot_path, "emotion.json")
    for pack in emot_data['emotionPackageList']:
        if len(pack['downloadUrl']):
            fname = parse.urlparse(pack['downloadUrl']).path.split('/')[-1]
            zip_path = os.path.join(emot_path, f"{fname}.zip")
            if os.path.isfile(zip_path) is False:
                download(pack['downloadUrl'], os.path.join(emot_path, f"{fname}.zip"))
            if os.path.isfile(zip_path):
                zip_file = zipfile.ZipFile(zip_path)
                zip_file.extractall(os.path.dirname(zip_path))
                zip_file.close()
                os.remove(zip_path)
        for em in pack['emotions']:
            for x, y in {'small': 'smallImageInfo', 'big': 'bigImageInfo'}.items():
                em_src = em[y]['thumbnailImageCdnUrl']
                em_ext = parse.urlparse(em_src).path.split('/')[-1].split('.')[-1]
                em_path = os.path.join(emot_path, x, f"{em['id']}.{em_ext}")
                if not os.path.isfile(em_path):
                    download(em_src, os.path.join(emot_path, x, f"{em['id']}.{em_ext}"))
    local_emot_list = os.listdir(os.path.join(emot_path, 'big'))
    for n in range(1, 56):
        if f"{n}.gif" not in local_emot_list:
            src = f"{routes['emot_base']}/ac/{n}.gif"
            download(src, os.path.join(emot_path, 'big', f"{n}.gif"))
    emot_map_path = os.path.join(emot_path, "emotion_map.json")
    emot_map = {"saved": {}, "lost": []}
    if os.path.isfile(emot_map_path) is True:
        emot_map = json.load(open(emot_map_path, 'rb'))
    else:
        for emot_name in os.listdir(emot_path):
            this_path = os.path.join(emot_path, emot_name)
            if os.path.isdir(this_path) is False or emot_name in ['small']:
                continue
            files = os.listdir(this_path)
            emot_map['saved'].update({
                f"acfun,{x.split('.')[0]}" if emot_name == 'big' else f"{emot_name},{x.split('.')[0]}":
                    f"../../assets/emot/{emot_name}/{x}"
                for x in files
            })
    for alias in emot_alias:
        alias_emot_path = os.path.join(emot_path, alias)
        os.makedirs(alias_emot_path, exist_ok=True)
        alias_emot_list = os.listdir(alias_emot_path)
        for n in range(1, 60):
            if n < 10:
                map_name0 = f"{alias},{n}"
                if f"{n}.gif" in alias_emot_list:
                    emot_map['saved'].update({f"{map_name0}": f"../../assets/emot/{alias}/{n}.gif"})
                    continue
                elif map_name0 in emot_map['lost']:
                    continue
                src = f"{routes['emot_base']}/{alias}/{n}.gif"
                name0_save = download(src, os.path.join(emot_path, alias, f"{n}.gif"))
                if name0_save is None:
                    emot_map['lost'].append(map_name0)
                elif name0_save is True:
                    emot_map['saved'].update({f"{map_name0}": f"../../assets/emot/{alias}/{n}.gif"})
                else:
                    print("EMOT UNKNOWN:", map_name0)
            map_name1 = f"{alias},{n:0>2}"
            if f"{n:0>2}.gif" in alias_emot_list:
                emot_map['saved'].update({f"{map_name1}": f"../../assets/emot/{alias}/{n:0>2}.gif"})
                continue
            elif map_name1 in emot_map['lost']:
                continue
            src = f"{routes['emot_base']}/{alias}/{n:0>2}.gif"
            name1_save = download(src, os.path.join(emot_path, alias, f"{n:0>2}.gif"))
            if name1_save is None:
                emot_map['lost'].append(map_name1)
            elif name1_save is True:
                emot_map['saved'].update({f"{map_name1}": f"../../assets/emot/{alias}/{n:0>2}.gif"})
            else:
                print("EMOT UNKNOWN:", map_name1)
    emot_map_saved = json_saver(emot_map, emot_path, "emotion_map.json")

    return all([emot_json_saved, emot_map_saved])


def create_assets_map(assets_path: [os.PathLike, str, None] = r"assets") -> tuple:
    if assets_path is None:
        assets_path = os.getcwd()
    assets_path = assets_path if os.path.isdir(assets_path) else os.getcwd()
    files_map = list()
    for dirpath, dirnames, filenames in os.walk(assets_path):
        for filepath in filenames:
            files_map.append(os.path.join(dirpath, filepath))
    assets_map_path = os.path.join(os.path.dirname(assets_path), "assets.map")
    with open(assets_map_path, 'wb') as afile:
        afile.write("\n".join(files_map).encode())
    return assets_path, files_map


def create_assets_zip(assets_path: [os.PathLike, str, None] = r"assets") -> str:
    assets_path, files_map = create_assets_map(assets_path)
    assets_zip_path = os.path.join(os.path.dirname(assets_path), "assets.zip")
    with zipfile.ZipFile(assets_zip_path, "w", zipfile.ZIP_DEFLATED, True, 9) as assets_zip:
        for f in files_map:
            assets_zip.write(f)
    return os.path.abspath(assets_zip_path)


if __name__ == '__main__':
    save_emot()
    create_assets_zip()
