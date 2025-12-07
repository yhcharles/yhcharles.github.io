# interesting\_things

## some interesting things

(started on 2017-12-06)

## Mac Apps
* platypus: [https://sveinbjorn.org/files/manpages/PlatypusDocumentation.html](https://sveinbjorn.org/files/manpages/PlatypusDocumentation.html), a developer tool to create native macOS app wrappers around scripts
* ice: [https://icemenubar.app/](https://icemenubar.app/), menubar management tool
* menubarX: [https://menubarx.app/](https://menubarx.app/), browser in menubar, so you can add any web-apps to your menubar
* fastscripts: [https://redsweater.com/fastscripts/](https://redsweater.com/fastscripts/), run scripts from menubar
* xbar: https://github.com/matryer/xbar, lets you put the output from any script/program in your macOS menu bar.
* finicky: https://github.com/johnste/finicky, allows you to set up rules that decide which browser is opened for every url
* mos: https://mos.caldis.me/ smooth scrolling
* boring notch: https://github.com/TheBoredTeam/boring.notch, macbook notch enhancement
## Python Packages
- [PyXA](https://skaplanofficial.github.io/PyXA/index.html): Python for Automation is a wrapper around Apple’s Scripting Bridge framework that enables AppleScript- and JXA-like control over macOS applications from within Python.
* menuscript: [https://github.com/mubranch/menuscript](https://github.com/mubranch/menuscript), run any Python script from the menubar
* rumps: [https://rumps.readthedocs.io/en/latest/index.html](https://rumps.readthedocs.io/en/latest/index.html), a Python library to create statusbar apps

## AI gaming

https://www.aigaming.com/ AIgaming.com is a platform that allows computer programs - also known as bots, to play each other at challenging games to win bitcoin.

https://github.com/M-J-Murray/MAMEToolkit

A Python toolkit used to train reinforcement learning algorithms against arcade games

## Top developer tools 2017

https://stackshare.io/posts/top-developer-tools-2017

* https://github.com/localstack/localstack a local AWS stack
* https://github.com/deepgram/kur descriptive deep learning
* https://github.com/wallix/awless golang aws client

## interesting command lines

https://codeandunicorns.com/interesting-command-lines/

Example:

* Capture video Macbook webcam with cpu accelerated: `ffmpeg -f avfoundation -framerate 30 -video_size 1280x720 -pix_fmt uyvy422 -i "0" -c:v h264_videotoolbox -profile:v high -b:v 3M -color_range 1 /tmp/out.mp4`
* play video through Facebook live

## 30 amazing python project in 2017

https://medium.mybridge.co/30-amazing-python-projects-for-the-past-year-v-2018-9c310b04cdb3

1. https://github.com/google/python-fire Python Fire is a library for automatically generating command line interfaces (CLIs) from absolutely any Python object.
2. https://github.com/Qix-/better-exceptions Pretty and more helpful exceptions in Python, automatically.![](https://github.com/Qix-/better-exceptions/raw/master/screenshot.png)

## A VIM-inspired filemanager for the console

https://github.com/ranger/ranger

## AI

* https://github.com/SerpentAI/SerpentAI Game Agent Framework. Helping you create AIs / Bots to play any game you own! BETA http://serpent.ai

## Data visualization

* Of course you can use matplotlib, seaborn, Bokeh, etc. Here is a list and comparison: https://blog.modeanalytics.com/python-data-visualization-libraries/
* https://plot.ly/products/dash/ Dash is a Python framework for building analytical web applications. No JavaScript required.

## Data processing visualization

Luna is a data processing and visualization environment built on a principle that people need an immediate connection to what they are building. It provides an ever-growing library of highly tailored, domain specific components and an extensible framework for building new ones.

http://www.luna-lang.org/#Overview

## Browser automation

There're Selenium, python requests package. And someone combines them together: https://github.com/cryzed/Selenium-Requests

Now a new one: https://github.com/MechanicalSoup/MechanicalSoup

re-use a browser session in selenium: https://web.archive.org/web/20171129014322/http://tarunlalwani.com:80/post/reusing-existing-browser-session-selenium/

## Online Python editor

https://www.jdoodle.com/python3-programming-online

### Blender

Blender is a free and open source 3D creation suite. https://docs.blender.org/manual/en/dev/getting\_started/about/introduction.html

And it has python API. https://docs.blender.org/api/2.79/info\_quickstart.html#

Domino effect in Blender Python http://slicker.me/blender/domino.htm

### Webpage layout

https://blog.buildo.io/flexview-the-easiest-way-to-use-flex-with-react-c698db55926a

How to implement complex layout in webpages?

Very old times: html `<table>` elements Old times: use CSS, and many frameworks like Bootstrap and Foundation were based on float elements. Present: [CSS flexbox API.](https://developer.mozilla.org/en-US/docs/Web/CSS/flex) Future: Maybe the [CSS grid API](https://developer.mozilla.org/en-US/docs/Web/CSS/grid)?

### PWA

https://appsco.pe/

https://developers.google.com/web/fundamentals/codelabs/debugging-service-workers

https://codelabs.developers.google.com/codelabs/your-first-pwapp/

https://github.com/alienzhou/learning-pwa

https://tomoya92.github.io/2019/05/23/pwa-cache/

https://zhuanlan.zhihu.com/p/25459319

https://juejin.im/post/5abba6a7f265da239706ec60

https://juejin.im/post/5c6cbe6b51882503b3271dde

### 一些中文翻译文档

pandas: https://www.gitbook.com/book/wizardforcel/pandas-official-tut-zh/details

来自apachecn:

* [TensorFlow R1.2 中文文档](http://cwiki.apachecn.org/pages/viewpage.action?pageId=10030122)
* [sklearn 0.18 中文文档](http://cwiki.apachecn.org/pages/viewpage.action?pageId=10030181)
* [sklearn 0.19 中文文档](http://sklearn.apachecn.org/cn/0.19.0/tutorial/statistical_inference/settings.html)
* [Spark 2.2.0 中文文档](http://spark.apachecn.org/docs/cn/2.2.0/)
* [Spark 2.0.2 中文文档](http://cwiki.apachecn.org/pages/viewpage.action?pageId=2883613)
* [Kudu 1.4.0 中文文档](http://cwiki.apachecn.org/pages/viewpage.action?pageId=10813594)
* [Zeppelin 0.7.2 中文文档](http://cwiki.apachecn.org/pages/viewpage.action?pageId=10030467)
* [Elasticsearch 5.4 中文文档](http://cwiki.apachecn.org/pages/viewpage.action?pageId=4260364)
* [Kibana 5.2 中文文档](http://cwiki.apachecn.org/pages/viewpage.action?pageId=8159377)
* [Storm 1.1.0 中文文档](http://storm.apachecn.org/releases/cn/1.1.0/)
