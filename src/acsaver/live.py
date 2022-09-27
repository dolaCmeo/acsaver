# coding=utf-8
import os
from .utils import SaverBase, SaverData

__author__ = 'dolacmeo'


class LiveSaver(SaverBase):

    def __init__(self, acer, ac_obj):
        self.acer = acer
        self.ac_obj = ac_obj
        super().__init__(acer, ac_obj)

    def loading(self):
        assert self.ac_obj.__class__.__name__ in SaverData.ac_name_map.keys()
        self.keyname = SaverData.ac_name_map[self.ac_obj.__class__.__name__]
        self._save_root = self.acer.config.get("SaverRootPath", os.getcwd())
        self._save_path = os.path.join(self._save_root, self.keyname, str(self.ac_obj.uid))
        os.makedirs(self._save_path, exist_ok=True)
        pass

    def save_all(self):
        self._record_live()
