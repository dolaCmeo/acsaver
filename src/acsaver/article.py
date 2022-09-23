# coding=utf-8
from .utils import SaverBase

__author__ = 'dolacmeo'


class ArticleSaver(SaverBase):

    def __init__(self, acer, ac_obj):
        self.acer = acer
        self.ac_obj = ac_obj
        super().__init__(acer, ac_obj)

    def save_all(self):
        self._save_raw()
        # html_page(with image)
        # call uper saver
        # comment(with image)(with member)
        pass
