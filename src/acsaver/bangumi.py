# coding=utf-8
import os
from .utils import SaverBase

__author__ = 'dolacmeo'


class BangumiSaver(SaverBase):

    def __init__(self, acer, ac_obj):
        self.acer = acer
        self.ac_obj = ac_obj
        super().__init__(acer, ac_obj)

