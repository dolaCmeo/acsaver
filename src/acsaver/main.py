# coding=utf-8
import os

__author__ = 'dolacmeo'


class AcSaver:

    def __init__(self, acer, root_path: [os.PathLike, str]):
        self.acer = acer
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

    def __init__(self, acer, root_path: [os.PathLike, str]):
        self.acer = acer
        self.root_path = root_path
        self.loading()

    def loading(self):
        os.makedirs(self.root_path, exist_ok=True)
        pass
