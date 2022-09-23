# coding=utf-8
import os
from .source import SaverData

__author__ = 'dolacmeo'


class AcSaver:

    def __init__(self, acer, root_path: [os.PathLike, str, None] = None):
        self.acer = acer
        root_path = root_path if os.path.isdir(root_path) else os.getcwd()
        self.acer.config.update({"SaverRootPath": root_path})
        self.local = SaverLocal(self.acer, root_path)
        self.loading()

    def loading(self):
        pass

    def resource(self, rtype: int, rid: int):
        pass

    def get(self, url_str: str):
        pass


class SaverLocal:
    root_path = None
    __assets_check_times = 0

    def __init__(self, acer, root_path: [os.PathLike, str]):
        self.acer = acer
        self.root_path = root_path
        self.loading()

    def history(self):
        pass

    def loading(self):
        self._folder_check()
        self._assets_check()
        pass

    def _folder_check(self):
        # 必要目录检查
        os.makedirs(self.root_path, exist_ok=True)
        for x in SaverData.folder_names:
            os.makedirs(os.path.join(self.root_path, x), exist_ok=True)

    def _assets_check(self):
        self.__assets_check_times += 1
        # 检查静态文件目录
        os.makedirs(os.path.join(self.root_path, "assets"), exist_ok=True)
        # 查找静态文件map
        assets_map_path = os.path.join(self.root_path, "assets", "assets.map")
        if os.path.isfile(assets_map_path) is False:
            # 如map不存在，认为静态文件缺失
            # 优先获取完整的map文件
            pass
        # 读取map文件，进行本地文件校验
        assets_map_data = open(assets_map_path, 'r').readlines()
        map_check = dict.fromkeys(assets_map_data, None)
        for x in map_check.keys():
            map_check[x] = os.path.exists(os.path.join(self.root_path, x))
        map_check_pass = all(map_check.values())
        # 如未通过校验，缺失少于10个
        if map_check_pass is False:
            if list(map_check.values()).count(False) <= 10:
                # 逐个将丢失文件重新下载
                pass
            else:
                # 下载完整压缩包，覆盖解压处理
                pass
            # 循环调用检查，并计数，最大次数3次后报错
            if self.__assets_check_times > 3:
                raise FileNotFoundError("Assets Files Check MaxTried.")
            return self._assets_check()
        return map_check_pass
