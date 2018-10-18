# 2016-06-17 gitbook使用tip

gitbook是一个免费的、支持markdown语法、支持latex数学公式、支持codeblock语法高亮的文档写作工具。并且支持将文档导出成mobi/epub/pdf/website等多种格式，便于阅读和分享。gitbook.com还提供免费的空间，可以将文档发布到互联网上。

它利用git进行后台版本控制，所以天然继承了git的很多好处。

另外，它可以进行多人协作，所以也可以作为团队博客。

## gitbook editor

从[gitbook.com](https://www.gitbook.com/)上下载gitbook editor，就可以在本地编辑文档了。

你可以从gitbook.com上同步文档到本地，写好后，再同步回去。也可以就在本地新建文档，进行写作。

gitbook是用git进行版本管理的，所以不管是本地还是服务器上，你的文件都是存放在git repo里面的。

## gitbook client

gitbook client是一个命令行工具，可以把写好的文档编译成pdf, epub, mobi, website等多种格式。

如果不想安装，可以找一下别人做好的docker image，比如这个：billryan/gitbook，然后设置一下就可以用了。这个image的作者还提供了多种版本，其中有支持中文的image。

## gitbook.com

gitbook.com上提供了在线编辑的功能，并且可以在线编译文档。