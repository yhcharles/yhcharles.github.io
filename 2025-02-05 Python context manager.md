Context manger一般和`with`一起使用，并且可以在一条`with`语句有多个context manager。这多个context manager的调用顺序类似一个stack，遵循FILO的原则。举例如下：

```python
class A:
    def __init__(self, name):
        self.name = name

    def __enter__(self):
        print(f"{self.name} enter")

    def __exit__(self, exc_type, exc_val, exc_tb):
        print(f"{self.name} exit")


with A("a"), A("b"):
    print("hello")
```
输出结果为：
```
a enter
b enter
hello
b exit
a exit
```
