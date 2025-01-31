alist可以连接到各种云存储，方便管理，并且提供：
1. 作为web server，提供web UI，可以查看文件，预览、播放音视频
2. 作为ftp/webdav server，提供文件访问接口，甚至被挂载到本地，当做本地文件系统一样访问

官方文档： https://alist.nn.ci/zh/guide/webdav.html

## 安装和配置

1. 从官方github https://github.com/AlistGo/alist/releases 下载操作系统对应版本，此时最新版本是`v3.42.0`
2. 建立一个新文件夹，解压下载的程序
3. 在该文件夹下运行`./alist admin set PASSWORD`，设置一个访问密码
4. 运行`./alist start`启动web server，此时web server会默认运行在 http://localhost:5244 端口
5. 进入web页面，用用户`admin`和刚才设置的密码进入系统
6. 在系统中添加云存储

## 挂载到本地文件系统

1. alist默认开启webdav，URL 为 http://localhost:5244/dav/
2. 默认状态下，刚才的`admin`账户并未开启webdav访问权限，需要进入系统后，在“用户”设置中修改权限，添加webdav访问
3. 在OSX系统中，可以直接在finder中挂载：点击菜单栏Go -> Connect to server，然后添加 webdav 的 URL，输入用户名和密码
4. 如果想在命令行中访问挂载的目录，默认路径在`/Volumes/dav/`下
