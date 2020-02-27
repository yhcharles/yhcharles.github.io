阅读官方教程（https://docs.python.org/3/howto/logging.html）的笔记。

## 基础

```python
import logging
logging.basicConfig(
	format='%(asctime)-15s [%(levelname).1s] [%(filename)s:%(lineno)d] %(message)s',  # 格式
  datefmt='%Y-%m-%d %H:%M:%S',
	level=logging.DEBUG,  # 生效级别
	filename='log.txt',  # 写入到文件
	filemode='w',  # 文件打开方式，默认是'a'
)
logging.debug('debug')
logging.info('info')
logging.warning('warn')
logging.error('error')
logging.critical('fatal')
logging.fatal('fatal')
logging.exception('except')  # 建议只用于异常处理中
```
关于格式化字符串，可以参考https://docs.python.org/3/library/logging.html#logrecord-attributes

## 进阶

logging库中包括几个组件：logger, handler, filter, formatter

- logger提供了对外被调用的接口
- handler负责处理log record（每一条日志对应一个LogRecord对象）
- filter负责过滤，决定每条log record是否被输出
- formatter用于log record输出时的格式化

为了调用logger的接口，先要得到一个Logger对象：
`logger = logging.getLogger(__name__)`
代码中可能有多个logger对象，他们一般是按照代码的package, module层级结构来组织的。如果按照上面的方式用`__name__`作为logger的`name`，那么logger之间就自然按照代码架构形成了parent-child关系。

child logger的事件会默认propagete给parent logger。因此，一个package可以只设置最顶层的logger，其子模块的logger事件会自动转给最顶层的logger来处理。

一个logger可以有多个handler，每个handler可以设置formatter。其工作流程如下：
![logging flow](https://docs.python.org/3/_images/logging_flow.png)

下面是一段示例代码：
```python
handler = logging.FileHandler('log.txt')  # 写入到文件
handler.setFormatter(logging.Formatter('%(asctime)-15s [%(levelname)s] [%(name)-9s] %(message)s'))  # 设置formatter

# Google-like format:
# I0226 22:25:54.284 /full/file/path:55] message
logging.Formatter(
            "%(levelname).1s%(asctime)-13s.%(msecs)d %(pathname)s:%(lineno)d] %(message)s",
            "%m%d %H:%M:%S",
        )

logger = logging.getLogger('package_name')
logger.addHandler(handler)  # 将上面的handler添加到logger中，可以添加多个handler
logger.setLevel(logging.DEBUG)

# 其他子模块中，获取自己的logger即可
logger = logging.getLogger(__name__)
```
这样在输出的log前缀中，可以看到当前log来自哪个logger，即来自哪个模块。

