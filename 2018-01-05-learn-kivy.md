# Getting Started &gt;&gt; A first App

[https://kivy.org/docs/gettingstarted/first\_app.html](https://kivy.org/docs/gettingstarted/first_app.html)

从第一个App开始，让自己沉浸在Kivy的世界中。

![](https://kivy.org/docs/_images/gs-tutorial.png)

Pong Game 是一个基础教程。介绍了一些基本概念。后续的文档是这些概念的拓展。

# Programming Guide &gt;&gt; Kivy Basics

[https://kivy.org/docs/guide/basic.html](https://kivy.org/docs/guide/basic.html)

## Create an application

创建一个application非常简单，只需以下几步：

* 继承App类
* 实现其`build()`方法，并返回一个`Widget`类的实例（所有控件的包含关系可以构成一棵树，这个控件就是它们的根节点）
* 实例化这个类，并调用其`run()`方法

一个最简单的application的实现代码：

```python
import kivy
kivy.require('1.0.6') # replace with your current kivy version !

from kivy.app import App
from kivy.uix.label import Label


class MyApp(App):

    def build(self):
        return Label(text='Hello world')


if __name__ == '__main__':
    MyApp().run()
```

你可以把代码保存成文件`main.py`，然后运行。

## Kivy App Life Cycle

![](https://kivy.org/docs/_images/Kivy_App_Life_Cycle.png)

可以看到，App的入口是`run()`方法。

先来看看第三行：

```python
from kivy.app import App
```

你的自定义类必须继承自`App`类。它的定义在`kivy_installation_dir/kivy/app.py`中。

> 鼓励你阅读源代码。Kivy是用Python实现的，文档用的是Sphinx，所以文档就在代码文件中。

下一行类似：

```python
from kivy.uix.label import Label
```

这里需要注意包/类的组织结构。`uix`模块中包含了用户界面相关的元素，如layout（布局）和widget（控件）。

下一行：

```python
class MyApp(App):
```

这里定义了我们的应用的基类。你只需要在这里把名字`MyApp`改成你自己的。

下一行：

```python
def build(self):
```

如图所示，在Kivy应用的生命周期中，`build()`是用来初始化并返回root widget根控件的。下一行：

```python
return Label(text='Hello World!')
```

这里初始化了一个Label实例，设置其文本内容为'Hello World!'。这个Label就是该应用的根控件。

最后：

```python
if __name__ == '__main__':
    MyApp().run()
```

实例化`MyApp`并调用其`run()`方法。这就是我们的Kivy应用初始化并开始运行的地方。

## Running the application

在Linux/Windows/Mac OS X上，都类似：

```shell
$ python main.py
```

在Android等平台上，需要先打包安装。

运行结果：

![](https://kivy.org/docs/_images/quickstart.png)

## Customize the application

稍微扩展一下我们的程序，实现一个简单的输入用户名/密码的界面。

```python
from kivy.app import App
from kivy.uix.gridlayout import GridLayout
from kivy.uix.label import Label
from kivy.uix.textinput import TextInput


class LoginScreen(GridLayout):

    def __init__(self, **kwargs):
        super(LoginScreen, self).__init__(**kwargs)
        self.cols = 2
        self.add_widget(Label(text='User Name'))
        self.username = TextInput(multiline=False)
        self.add_widget(self.username)
        self.add_widget(Label(text='password'))
        self.password = TextInput(password=True, multiline=False)
        self.add_widget(self.password)


class MyApp(App):

    def build(self):
        return LoginScreen()


if __name__ == '__main__':
    MyApp().run()
```

第二行我们导入了`Gridlayout`：

```python
from kivy.uix.gridlayout import GridLayout
```

这个类被我们的根控件的基类：

```python
class LoginScreen(GridLayout):
```

然后我们重写了`__init__()`方法，用来添加控件并定义它们的行为：

```python
def __init__(self, **kwargs):
    super(LoginScreen, self).__init__(**kwargs)
```

注意要记得通过`super`调用父类的`__init__()`方法，并且最好保留`**kwargs`参数，它们有时候会被内部实现用到。

接下来：

```python
self.cols = 2
self.add_widget(Label(text='User Name'))
self.username = TextInput(multiline=False)
self.add_widget(self.username)
self.add_widget(Label(text='password'))
self.password = TextInput(password=True, multiline=False)
self.add_widget(self.password)
```

我们让`GridLayout`把它包含的子控件排成两列，然后添加了`Label`和`TextInput`用于用户名和密码。

运行上面的代码，可以看到：

![](https://kivy.org/docs/_images/guide_customize_step1.png)

尝试调整窗口大小，可以看到控件能够自适应，这是由于它们默认使用了size hint。

# Tutorials &gt;&gt; A Simple Paint App

[https://kivy.org/docs/tutorials/firstwidget.html](https://kivy.org/docs/tutorials/firstwidget.html)

该教程中会教你如何创建自己的控件。从中你会学习到非常有用并且很重要的知识，能够让你创建全新的用户界面，根据你的意图定制各种元素。

## Basic Considerations

在创建一个应用时，你应该问自己几个重要的问题：

* 我的应用处理什么数据？（Model）
* 我如何展示这些数据？（View）
* 用户如何与数据进行交互？（Control）

假设你想写一个简单的画图程序，只需要用户在屏幕上用手指画画。这就是用户与应用进行交互的方式。同时，你的应用需要记住用户手指经过的点的位置，然后你才能在这些点之间画上线。所以，手指经过的位置就是你的数据，而你画的线就是数据的展示。

在Kivy中，用户界面由控件构成。你在屏幕上看到的所有东西基本上都是由控件画出来的。通常你会希望你的代码在其他地方能够被重用，这就是为什么一般情况下一个控件需要回答以上三个问题。一个控件需要封装数据、定义用户与数据之间的交互以及负责展示数据。通过控件组合，你就能够创造出各种简单或者复杂的应用。有很多现成的控件，如按钮、滑动条等等。但是在很多情况下，你还是需要自己定制一个Kivy中没有的控件。

所以在设计你的控件时，请记住这三个问题。尝试以最小、可重用的方式来设计它们。

## Paint Widget

让我们来创建一个多点触摸的画图程序。

### Initial Structure

我们先从最简单的代码结构开始。这一节用到的所有代码片段都在随Kivy安装的`examples/guide/firstwidget`目录中。

```python
from kivy.app import App
from kivy.uix.widget import Widget


class MyPaintWidget(Widget):
    pass


class MyPaintApp(App):
    def build(self):
        return MyPaintWidget()


if __name__ == '__main__':
    MyPaintApp().run()
```

这很简单，如果把它保存成`paint.py`，并且运行，你只会看到黑色的屏幕。如你所见，我们没有使用现成的像Button这样的控件，我们要写一个我们自己的控件来画图。我们从`Widget`继承了一个类，但是现在它还什么都不能做。

### Adding Behaviour

现在我们为控件添加一些行为，让它能够响应用户输入：

```python
from kivy.app import App
from kivy.uix.widget import Widget


class MyPaintWidget(Widget):
    def on_touch_down(self, touch):
        print(touch)


class MyPaintApp(App):
    def build(self):
        return MyPaintWidget()


if __name__ == '__main__':
    MyPaintApp().run()
```

可以看到响应用户输入很简单。当一个`MotionEvent`动作事件（如触摸，点击等）发生时，我们在终端上打印touch对象的信息。你在屏幕上不会看到任何东西，但是每次动作都会在命令行上输出一条消息。

让我们再加点代码，在窗口上画点什么：

```python
from kivy.app import App
from kivy.uix.widget import Widget
from kivy.graphics import Color, Ellipse


class MyPaintWidget(Widget):

    def on_touch_down(self, touch):
        with self.canvas:
            Color(1, 1, 0)
            d = 30.
            Ellipse(pos=(touch.x - d / 2, touch.y - d / 2), size=(d, d))


class MyPaintApp(App):

    def build(self):
        return MyPaintWidget()


if __name__ == '__main__':
    MyPaintApp().run()
```

运行修改后的代码，每当你点击（触摸）时，就会在你点击的位置画一个黄色的圆。怎么做到的呢？

* 第9行：在Python的`with`语句中使用控件的`Canvas`对象。这就是屏幕上的一块区域，控件把自己画在这块区域内。通过使用`with`语句，后续的所有绘图命令都会修改这个canvas。`with`语句也使得在绘制完成后，能够妥善的清理内部状态。
* 第10行：设置后续绘图的颜色为黄色（默认的颜色格式是RGB，所以\(1, 1, 0\)是黄色）。该设置一直有效，直到下一次调用`Color`。可以想象成把你的画笔染成了某种颜色，你可以一直用这种颜色进行绘画，直到换一种颜色。
* 第11行：设置圆的直径。
* 第12行：调用`Ellipse`并使用相同的宽和高，就得到了一个圆。为了让圆被画在用户点击的位置，我们把点击的位置参数传给函数。但是函数接受的是圆的外框的左下角坐标，所以还要偏移`-d/2`。

再来：

```python
from kivy.app import App
from kivy.uix.widget import Widget
from kivy.graphics import Color, Ellipse, Line


class MyPaintWidget(Widget):

    def on_touch_down(self, touch):
        with self.canvas:
            Color(1, 1, 0)
            d = 30.
            Ellipse(pos=(touch.x - d / 2, touch.y - d / 2), size=(d, d))
            touch.ud['line'] = Line(points=(touch.x, touch.y))

    def on_touch_move(self, touch):
        touch.ud['line'].points += [touch.x, touch.y]


class MyPaintApp(App):

    def build(self):
        return MyPaintWidget()


if __name__ == '__main__':
    MyPaintApp().run()
```

![](https://kivy.org/docs/_images/guide-4.jpg)

* 第3行：我们新导入了一个`Line`指令，它接受一个`points`参数，由2维的点的坐标构成的list，像这样`(x1, y1, x2, y2, …, xN, yN)`
* 第13行：从这里开始变得有意思了。`touch.ud`是一个Python字典（类型`<dict>`），让我们可以存放touch的一些属性。
* 第13行：我们利用导入的`Line`指令来开始画一条线。因为这是在`on_touch_down`中完成的，所以每次touch都会新画一条线。在`with`语句块中创建line，会使得canvas自动知道这条线并进行绘制。我们稍后还需要对line进行修改，所以我们把一个引用存放在`touch.ud`字典中。
* 第15行：我们的控件中加入了一个新方法，与`on_touch_down`类似，但是该方法不是一次新的touch时调用，而是一个已有的touch发生移动时。注意这是**同一个**`MotionEvent`对象，但是属性的值改变了。很快你就会发现这个很有用。
* 第16行：记住：这里是与`on_touch_down`里的同一个touch对象，所以我们可以直接访问存放在`touch.ud`字典中的数据！现在我们把当前的位置添加到line中。

再改一下，让每次touch画出的线条色彩不一样：

```python
from random import random
from kivy.app import App
from kivy.uix.widget import Widget
from kivy.graphics import Color, Ellipse, Line


class MyPaintWidget(Widget):

    def on_touch_down(self, touch):
        color = (random(), random(), random())
        with self.canvas:
            Color(*color)
            d = 30.
            Ellipse(pos=(touch.x - d / 2, touch.y - d / 2), size=(d, d))
            touch.ud['line'] = Line(points=(touch.x, touch.y))

    def on_touch_move(self, touch):
        touch.ud['line'].points += [touch.x, touch.y]


class MyPaintApp(App):

    def build(self):
        return MyPaintWidget()


if __name__ == '__main__':
    MyPaintApp().run()
```

![](https://kivy.org/docs/_images/guide-5.jpg)

* 第1行：导入了Python的`random()`函数
* 第10行：生成一种随机颜色
* 第12行：设置颜色

> 由于`Color`指令默认接受RGB颜色值，所以你有可能得到一些比较深的颜色，从而在黑色背景下看不清楚。一种办法是生成这样的tuple: `(random(), 1., 1.)`。然后在设置颜色的时候使用`Color(*color, mode='hsv')`。

### Bonus Points

我们已经有一个基本可用的控件了。但是，如果用户想重新开始一次新绘画怎么办？现在的代码只能重启整个程序。我们也可以做得更好。让我们加一个按钮，用来清除所有的线条和圆。有两种选择：

* 可以把按钮作为控件的一部分。那意味着如果我们创建多个控件的实例，我们就会有多个按钮。而且，在绘画的时候还有可能画到按钮上。
* 只在应用层级上设置一个按钮，当按下这个按钮时，就清空控件。

对于我们的例子来说，这可能无关紧要。但在实际中，你可能需要考虑清楚。这里我们选择第二种方式，你可以看到在`build()`方法中如何构建应用的控件。同时我们也换用HSV模式颜色。

```python
from random import random
from kivy.app import App
from kivy.uix.widget import Widget
from kivy.uix.button import Button
from kivy.graphics import Color, Ellipse, Line


class MyPaintWidget(Widget):

    def on_touch_down(self, touch):
        color = (random(), 1, 1)
        with self.canvas:
            Color(*color, mode='hsv')
            d = 30.
            Ellipse(pos=(touch.x - d / 2, touch.y - d / 2), size=(d, d))
            touch.ud['line'] = Line(points=(touch.x, touch.y))

    def on_touch_move(self, touch):
        touch.ud['line'].points += [touch.x, touch.y]


class MyPaintApp(App):

    def build(self):
        parent = Widget()
        self.painter = MyPaintWidget()
        clearbtn = Button(text='Clear')
        clearbtn.bind(on_release=self.clear_canvas)
        parent.add_widget(self.painter)
        parent.add_widget(clearbtn)
        return parent

    def clear_canvas(self, obj):
        self.painter.canvas.clear()


if __name__ == '__main__':
    MyPaintApp().run()
```

![](https://kivy.org/docs/_images/guide-6.jpg)

* 第4行：导入`Button`类
* 第25行：创建一个`Widget()`对象，作为painting控件和button控件的父亲。这是一个简化的设置控件树的办法。我们也可以用一个layout或者其他高科技。该控件其实什么也不做，只是用来容纳两个孩子。
* 第26行：还是创建`MyPaintWidget()`对象，但这次不直接返回，而是赋值给一个变量
* 第27行：创建一个按钮控件，上面显示"Clear"
* 第28行：绑定按钮的`on_release`事件（当按钮被按下，然后释放时发生）到回调函数`clear_canvas`
* 第29、30行：把画图和按钮控件都作为`Widget`对象的孩子。
* 第33、34行：按钮对应的回调函数，功能是清除painter控件的canvas

> Kivy的Widget类在设计时有意保持简洁。它们并不具有一些常见的属性，如背景色、边框色等。在例子和文档中你可以找到如何自己定制这些属性，就像我们在这里所做的一样，设置canvas的颜色，画出各种形状。你可以开始尝试一些更复杂的定制。一些从Widget继承得到的高级控件，如按钮，为了方便，是具有一些这类属性的（如背景色background\_color），但这个要看具体控件。查看API文档来确定各个控件提供什么属性，如果需要的话可以继承并添加你需要的内容。

# Programming Guide &gt;&gt; Kv language

## Concept behind the language

当你的应用变得越来越复杂的时候，构建控件树、声明绑定关系就变得难以维护。KV语言尝试克服这些问题。

KV语言（有时称为kvlang，或者kivy语言），让你用声明的方式创建控件树，并且用一种自然的方式把控件属性和回调函数进行绑定。这让你可以快速开发原型和修改UI。这也使得应用的逻辑和用户界面解耦。

## How to load KV

有两种方式在应用中加载Kv代码：

* 使用名字规则：
  Kivy会自动查找与App名字对应的Kv文件，文件名是小写的，并且去掉"App"后缀，例如：
  `MyApp -> my.kv`
  如果这个文件定义了一个根控件，那么它会被做为你的应用的root属性并且作为控件树的根节点。
* Builder：可以直接从一个字符串或者文件加载。如果这个字符串或者文件中定义了根控件，那它会被作为返回值：
  `Builder.load_file('path/to/file.kv')`
  或者：
  `Builder.load_string(kv_string)`

## Rule context

Kv源文件由rules规则构成，规则是用于描述控件的所包含的内容，可以有一个root rule，以及任意多个class或者模板rule。

root rule声明了根控件的类，代码无缩进，后面紧跟一个":"，会被设置为App的root属性：

`Widget:`

class rule的声明，由 &lt; &gt; 包含的控件类名，后面跟一个":"，定义了该类的实例如何显示：

`<MyWidget>`

rule使用缩进来表示层级，并且使用四空格缩进。

Kv语言有三个关键词：

* app：一个引用，总是指向你的application应用
* root：引用，指向当前rule的base wedge/template
* self：引用，指向当前的控件

## Special syntaxes

有两个特殊语法，用于定义Kv上下文：

在kv中访问Python模块和类：

```
#:import name x.y.z
#:import isdir os.path.isdir
#:import np numpy
```

等价于Python中的：

```python
from x.y import z as name
from os.path import isdir
import numpy as np
```

设置一个全局变量：

```
#:set name value
```

等价于Python中的：

```python
name = value
```

## Instantiate children

要声明某个控件为子控件，并且为某个类的实例，只需要在rule下面声明：

```kv
MyRootWidget:
    BoxLayout:
        Button:
        Button:
```

上面的例子定义了我们的根控件，是`MyRootWidget`类的一个实例，并且有一个孩子是`BoxLayout`类的实例。这个`BoxLayout`的实例又有两个`Button`类的实例。

等价的Python代码是：

```python
root = MyRootWidget()
box = BoxLayout()
box.add_widget(Button())
box.add_widget(Button())
root.add_widget(box)
```

比使用kv要复杂一些。

当然，在Python中，你可以在创建控件的时候提供参数，用来定制其行为。例如，要设置`GridLayout`的列的数量：

```python
grid = GridLayout(cols=3)
```

在kv中，你可以设置直接设置子控件的属性：

```kv
GridLayout:
    cols: 3
```

cols的值是被当做Python表达式进行求值的，并且表达式中的所有属性都会被observed监听。也就是说如有有下面的Python代码（假设`self`是一个控件，并且该控件有一个ListProperty叫做data）：

```python
grid = GridLayout(cols=len(self.data))
self.bind(data=grid.setter('cols'))
```

每当data发生变化时，为了让界面自动更新，你只需要：

```kv
GridLayout:
    cols: len(root.data)
```

> 注意：控件名应该以大写字母开头，属性名应该以小写字母开头。建议遵从PEP8。

## Event Bindings

在Kv中，可以把一个回调函数绑定到一个事件上：

```
Widget:
    on_size: my_callback()
```

也可以把事件的信号作为参数传递：

```
TextInput:
    on_text: app.search(args[1])
```

也可以使用更复杂的表达式：

```
pos: self.center_x - self.texture_size[0] / 2., self.center_y - self.texture_size[1] / 2.
```

该表达式会监听`center_x, center_y, texture_size`的变化，只要它们其中任何一个发生变化，表达式都会被重新求值，并更新`pos`字段。

你也可以直接在kv语言中处理`on_events`事件。例如，`TextInput`类有一个`focus`属性，其`on_focus`事件可以在kv语言中这样来访问：

```
TextInput:
    on_focus: print(args)
```

## Extend canvas

Kv语言可以用来定义控件的canvas指令：

```
MyWidget:
    canvas:
        Color:
            rgba: 1, .3, .8, .5
        Line:
            points: zip(self.data.x, self.data.y)
```

当属性值改变时，canvas会自动更新。

当然你也可以使用`canvas.before`和`canvas.after`。

## Referencing Widgets

在一个控件树中，经常需要访问/引用其他的控件。Kv语言为此提供了用id的方式。可以把它们想象成类层级的变量，并且只能在Kv语言中使用。

```
<MyFirstWidget>:
    Button:
        id: f_but
    TextInput:
        text: f_but.state

<MySecondWidget>:
    Button:
        id: s_but
    TextInput:
        text: s_but.state
```

id的作用域限制在该id所在的rule之内，所以上面代码中的`s_but`在`<MySecondWidget>`这条rule之外无法访问。

> 警告：给id指定值的时候，记住这个值并不是字符串，没有引号。好的例子：id: value，坏的例子：id: 'value'

id只是对控件的弱引用，而非控件本身。因此，保存id不足以防止控件被垃圾回收自动清理。

```
<MyWidget>:
    label_widget: label_widget
    Button:
        text: 'Add Button'
        on_press: root.add_widget(label_widget)
    Button:
        text: 'Remove Button'
        on_press: root.remove_widget(label_widget)
    Label:
        id: label_widget
        text: 'widget'
```

尽管MyWidget中保存了label\_widget的引用，但是一旦其他的引用被删除后，并不能保证对象是存活的，因为这只是一个弱引用。因此，当remove按钮被点击（删除了所有该控件的直接引用）并且窗口改变大小（会调用垃圾回收，导致label\_widget被删除）后，再点击add按钮尝试把控件添加回来，就会出现`ReferenceError: weakly-referenced object no longer exists`异常。

为了保证控件存活，必须保存对控件的直接引用。可以使用`id.__self__`或者在这里是`label_widget.__self__`。

```
<MyWidget>:
    label_widget: label_widget.__self__
```

## Accessing Widget defined inside Kv lang in your python code

考虑如下代码 my.kv：

```
<MyFirstWidget>:
    # both these variables can be the same name and this doesn't lead to
    # an issue with uniqueness as the id is only accessible in kv.
    txt_inpt: txt_inpt
    Button:
        id: f_but
    TextInput:
        id: txt_inpt
        text: f_but.state
        on_text: root.check_status(f_but)
```

在myapp.py中：

```python
...
class MyFirstWidget(BoxLayout):

    txt_inpt = ObjectProperty(None)

    def check_status(self, btn):
        print('button state is: {state}'.format(state=btn.state))
        print('text input text is: {txt}'.format(txt=self.txt_inpt))
...
```

`txt_inpt`被定义为类的一个`ObjectProperty`并用`None`进行初始化。

```
txt_inpt = ObjectProperty(None)
```

此时`self.txt_inpt`是`None`。在Kv语言中，该属性会被更新，用于存放`txt_inpt`引用的`TextInput`的实例：

```
txt_inpt: txt_inpt
```

从这里开始，`self.txt_inpt`就保存了`txt_inpt`这个id所标识的控件的引用，并且可以在类内部任何地方使用，就像在`check_status`函数中那样。你也可以直接把id传给需要的函数，就像上面代码中的`f_but`一样。

还有一个更简单的用id访问对象的方式，就是使用`ids`查找对象。像这样：

```
<Marvel>
  Label:
    id: loki
    text: 'loki: I AM YOUR GOD!'
  Button:
    id: hulk
    text: "press to smash loki"
    on_release: root.hulk_smash()
```

在你的Python代码中：

```python
class Marvel(BoxLayout):

    def hulk_smash(self):
        self.ids.hulk.text = "hulk: puny god!"
        self.ids["loki"].text = "loki: >_<!!!"  # alternative syntax
```

在解析kv文件的时候，kivy收集所有的id并且把它们保存到`self.ids`这个字典类型的属性中。这意味着你也可以用字典的方式遍历所有的控件：

```python
for key, val in self.ids.items():
    print("key={0}, val={1}".format(key, val))
```

> 注意：尽管`self.ids`这种方式很简单，但是一般情况下还是建议使用`ObjectProperty`。这样能够创建一个直接的引用，提供更快速的访问和更明晰的代码。

## Dynamic Classes

考虑以下代码：

```
<MyWidget>:
    Button:
        text: "Hello world, watch this text wrap inside the button"
        text_size: self.size
        font_size: '25sp'
        markup: True
    Button:
        text: "Even absolute is relative to itself"
        text_size: self.size
        font_size: '25sp'
        markup: True
    Button:
        text: "Repeating the same thing over and over in a comp = fail"
        text_size: self.size
        font_size: '25sp'
        markup: True
    Button:
```

为了避免为每个button设置值，我们可以使用一个模板，像这样：

```
<MyBigButt@Button>:
    text_size: self.size
    font_size: '25sp'
    markup: True

<MyWidget>:
    MyBigButt:
        text: "Hello world, watch this text wrap inside the button"
    MyBigButt:
        text: "Even absolute is relative to itself"
    MyBigButt:
        text: "repeating the same thing over and over in a comp = fail"
    MyBigButt:
```

这样我们从Button这个类继承了一个新的类，修改了一些默认值，并且为所有实例重建了绑定，而且不需要写任何python的代码。

## Re-using styles in multiple widgets

考虑如下代码my.kv：

```
<MyFirstWidget>:
    Button:
        on_press: root.text(txt_inpt.text)
    TextInput:
        id: txt_inpt

<MySecondWidget>:
    Button:
        on_press: root.text(txt_inpt.text)
    TextInput:
        id: txt_inpt
```

在myapp.py中：

```python
class MyFirstWidget(BoxLayout):

    def text(self, val):
        print('text input text is: {txt}'.format(txt=val))

class MySecondWidget(BoxLayout):

    writing = StringProperty('')

    def text(self, val):
        self.writing = val
```

因为两个类共享相同的.kv格式，所以可以这样写：

```
<MyFirstWidget,MySecondWidget>:
    Button:
        on_press: root.text(txt_inpt.text)
    TextInput:
        id: txt_inpt
```

用逗号分隔列出所有的类名，可以让这些类都共享相同的kv属性。

## Designing with the Kivy Language

Kivy语言的目的之一是将展示视图和逻辑解耦。展示视图由kv文件负责，逻辑在py文件中实现。

### 代码写在py文件中

让我们从一个小例子开始。首先，Python文件main.py：

```python
import kivy
kivy.require('1.0.5')

from kivy.uix.floatlayout import FloatLayout
from kivy.app import App
from kivy.properties import ObjectProperty, StringProperty


class Controller(FloatLayout):
    '''Create a controller that receives a custom widget from the kv lang file.

    Add an action to be called from the kv lang file.
    '''
    label_wid = ObjectProperty()
    info = StringProperty()

    def do_action(self):
        self.label_wid.text = 'My label after button press'
        self.info = 'New info text'


class ControllerApp(App):

    def build(self):
        return Controller(info='Hello world')


if __name__ == '__main__':
    ControllerApp().run()
```

在这个例子中，我们创建了一个Controller类，有两个属性：

* `info`用来接收一些文本内容
* `label_wid`用来接收label控件

另外，我们还创建了一个`do_action()`函数，会用到这两个属性。它会修改`info`文本，并且修改`label_wid`控件上的文字。

### 展示布局写在controller.kv中

即使没有相应的kv文件，这个程序也能运行，只是屏幕上没有任何显示。这是因为`Controller`类不包含任何控件，它只是一个`FloatLayout`。我们可以在controller.kv的文件中创建相应的UI，在我们运行`ControllerApp`的时候会被自动加载。关于这个过程是如何完成的，以及什么文件会被加载，可以参看`kivy.app.App.load_kv()`方法。

```kivy
#:kivy 1.0

<Controller>:
    label_wid: my_custom_label

    BoxLayout:
        orientation: 'vertical'
        padding: 20

        Button:
            text: 'My controller info is: ' + root.info
            on_press: root.do_action()

        Label:
            id: my_custom_label
            text: 'My label before button press'
```

一个label和一个button，在一个垂直的`BoxLayout`中。似乎很简单。这里有三件事情：

1. 使用来自`Controller`的数据。一旦controller中的`info`属性发生改变，表达式：`'My controller info is: ' + root.info`就会自动重新计算，修改`Button`上的文本。

2. 把数据发送给`Controller`。创建的Label被指定了id为`my_custom_label`。然后，通过表达式`label_wid: my_custom_label`就把这个Label控件的实例发送给了`Controller`。

3. 在`Button`内创建一个回调函数，指向`Controller`的`on_press`方法。

   * `root`和`self`是保留的关键词，可以在任何地方使用。`root`代表一条rule的最顶层的控件，`self`代表当前的控件。

   * 你可以像使用`root`和`self`那样，使用一条rule内定义的任何id。例如，你可以在`on_press()`内这样做：

     ```
     Botton:
         on_press: root.do_action(); my_custom_label.font_size = 18
     ```

就是这些了。现在当你运行main.py，controller.kv会被自动加载，`Button`和`Label`会出现在屏幕上并且能够响应你的动作。

# Tutorials &gt;&gt; Pong Game Tutorial

[https://kivy.org/docs/tutorials/pong.html](https://kivy.org/docs/tutorials/pong.html)

该教程会教你如何用Kivy来实现pong游戏。

![](https://kivy.org/docs/_images/pong.jpg)

# Build Android APK

官方文档：[https://github.com/kivy/kivy/wiki/Creating-a-Release-APK](https://github.com/kivy/kivy/wiki/Creating-a-Release-APK)

1. 为了避免安装build工具的麻烦，可以直接使用docker镜像来build，比如这个：[https://github.com/jedie/kivy-buildozer-docker](https://github.com/jedie/kivy-buildozer-docker)

   * `docker pull jedie/buildozer`
   * 进入kivy应用程序代码所在目录
   * `docker run -t -v ${PWD}:/buildozer/ -v ~/.buildozer:/home/buildozer/.buildozer jedie/buildozer buildozer -v android release`
     这会在`~/.buildozer`目录缓存android sdk，如果之前运行过bulldozer，建议先清空该目录

2. 这个默认build出来是未签名的apk，还要对apk进行签名，参照：[https://groups.google.com/forum/\#!topic/kivy-users/5-G7wkbHb\_k](https://groups.google.com/forum/#!topic/kivy-users/5-G7wkbHb_k)

   > In general, the steps are:
   >
   > 1. Generate Keystore \(once\)
   > 2. Create Release APK
   > 3. Sign APK
   > 4. Zip-align APK
   >
   > For a specific example of doing a release, here is the setup for my SayThis app:
   >
   > * My keystore is in ~/keystores
   >
   > * My project root is in ~/saythis
   >
   > * Which means buildozer.spec is at ~/saythis/buildozer.spec
   >
   > * The virtualenv for the project is activated
   >
   > The specific commands I use to release the SayThis app are:
   >
   > ```bash
   > $ cd ~
   >
   > $ keytool -genkey -v -keystore ./keystores/net-clusterbleep-saythis.keystore -alias cb-play -keyalg RSA -keysize 2048 -validity 10000
   >
   > $ cd ~/saythis
   >
   > $ buildozer android release
   >
   > $ cd ~
   >
   > $ jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore ./keystores/net-clusterbleep-saythis-release.keystore ./saythis/bin/SayThis-1.1.6-release-unsigned.apk cb-play
   >
   > $ .buildozer/android/platform/android-sdk-21/tools/zipalign -v 4 ./saythis/bin/SayThis-1.1.6-release-unsigned.apk ./saythis/bin/SayThis.apk
   > ```
   >
   > The SayThis.apk is what you upload to Google Play. Please make sure you use your own name for the keystore and APKs.

   先生成keystore，然后进行签名：

   * `jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore ${YOUR_KEYSTORE_PATH} ${YOUR_UNSIGNED_APK_PATH} ${YOUR_KEY_ALIAS}`
   * `~/.buildozer/android/platform/android-sdk-20/build-tools/19.1.0/zipalign -v 4 ${YOUR_UNSIGNED_APK_PATH} ${YOUR_SIGNED_APK_PATH}`

# Build OSX app

https://kivy.org/docs/guide/packaging-osx.html#using-the-kivy-sdk

After tried the different ways of building a standalone App, this might be the easiest one.

1. https://kivy.org/downloads/ download a proper version of Kivy app. It depends on your OS version, Python version and Kivy version. I tried using the latest version to build, but it turns out the latest version is for OSX 11.12, which I'm using is still 11.11. So I downloaded an older version. But that old version is build for Python2.7, and I have to make some minor changes to my code.
2. follow the instructions on official website
3. if you can not run your app due to some security issue, try to right-click your app, and select "_open_", which will give you a chance to skip the security check.


