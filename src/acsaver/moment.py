# coding=utf-8
from .utils import os, SaverBase, downloader, tans_uub2html

__author__ = 'dolacmeo'


class MomentSaver(SaverBase):

    def __init__(self, acer, ac_obj):
        self.acer = acer
        self.ac_obj = ac_obj
        super().__init__(acer, ac_obj)

    @property
    def html_content(self):
        html_str, img_task = tans_uub2html(self.ac_obj.raw_data.get('text'), self._save_path)
        if len(img_task) > 0:
            downloader(self.acer.client, img_task, display=True)
        return html_str.replace(r"\"", '"')

    def _gen_html(self):
        page_html = self.page_template.render(dict(saver=self))
        html_path = os.path.join(self._save_path, f"{self.rid}.html")
        with open(html_path, 'wb') as html_file:
            html_file.write(page_html.encode())
        return os.path.isfile(html_path)

    def _save_image(self):
        img_task = [
            (self.ac_obj.qrcode, os.path.join(self._data_path, 'share_qrcode.png')),
            (self.ac_obj.mobile_qrcode, os.path.join(self._data_path, 'mobile_qrcode.png'))
        ]
        self.tasks.extend(img_task)
        t = downloader(self.acer.client, self.tasks, display=True)
        self.tasks = list()
        return t

    def save_all(self):
        self._save_raw()
        self._gen_html()
        self._save_comment()
        self.update_js_data()
