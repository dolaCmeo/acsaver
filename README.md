# acfunsdk - AcSaver

<br />

<p align="center">
<a href="https://github.com/dolaCmeo/acfunSDK">
<img height="100" src="https://s3.dualstack.us-east-2.amazonaws.com/pythondotorg-assets/media/files/python-logo-only.svg" alt="">
<img height="100" src="https://ali-imgs.acfun.cn/kos/nlav10360/static/common/widget/header/img/acfunlogo.11a9841251f31e1a3316.svg" alt="">
</a>
</p>

<br />

acfunsdk是 **非官方的 [AcFun弹幕视频网][acfun.cn]** Python库。

> `acsaver` 是`acfunsdk`的附属组件，提供内容离线保存支持。

**‼需要`ffmpeg`**  主要用于下载视频。
> 建议去官网下载 https://ffmpeg.org/download.html
>
> 可执行文件 `ffmpeg` `ffprobe` 需要加入到环境变量，或复制到运行根目录。

- - -


<details>
<summary>依赖库</summary>

**依赖: 包含在 `requirements.txt` 中**

+ [`acfunsdk`](https://pypi.org/project/acfunsdk/)`>=0.9.5`

下载及html页面渲染:
+ [`filetype`](https://pypi.org/project/filetype/)`>=1.1`
+ [`jinja2`](https://pypi.org/project/jinja2/)`>=3.1`
+ [`pillow`](https://pypi.org/project/pillow/)`>=9.1`

命令行及输出控制:
+ [`rich`](https://pypi.org/project/rich/)`>=12.5`
+ [`click`](https://pypi.org/project/click/)`>=8.1`

>内置+修改: 位于 `utils` 文件夹内
>
>+ [`ffmpeg_progress_yield`](https://github.com/slhck/ffmpeg-progress-yield)

</details>

- - -

## About Me

[![ac彩娘-阿部高和](https://tx-free-imgs2.acfun.cn/kimg/bs2/zt-image-host/ChQwODliOGVhYzRjMTBmOGM0ZWY1ZRCIzNcv.gif)][dolacfun]
[♂ 整点大香蕉🍌][acfunsdk_page]
<img alt="AcFunCard" align="right" src="https://discovery.sunness.dev/39088">

- - - 

[dolacfun]: https://www.acfun.cn/u/39088
[acfunsdk_page]: https://www.acfun.cn/a/ac37416587

[acfun.cn]: https://www.acfun.cn/
[Issue]: https://github.com/dolaCmeo/acfunSDK/issues
[python]: https://www.python.org/downloads/
[venv]: https://docs.python.org/zh-cn/3.8/library/venv.html
