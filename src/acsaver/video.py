# coding=utf-8
import os
from bs4 import BeautifulSoup as Bs
from .utils import SaverBase, downloader

__author__ = 'dolacmeo'


class VideoSaver(SaverBase):

    def __init__(self, acer, ac_obj):
        self.acer = acer
        self.ac_obj = ac_obj
        super().__init__(acer, ac_obj)

    def _gen_html(self, index: int = 0) -> bool:
        vname = self._part_video_name(index)
        page_html = self.page_template.render(dict(saver=self, partNum=index))
        html_path = os.path.join(self._save_path, f"{vname}.html")
        with open(html_path, 'wb') as html_file:
            html_file.write(page_html.encode())
        return os.path.isfile(html_path)

    @property
    def video_list(self):
        return self.ac_obj.video_list

    def save_all(self):
        self._save_raw()
        self._save_image()
        self._gen_html()
        self._save_video()
        self._save_danmaku()
        self._save_comment()
        self._update_js_data()
