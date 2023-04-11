写在最前面，简单而言：
- **iterator类似一个指针，或者C++中的iterator，可以被迭代；iterable一般指一个容器，是“可以被迭代访问（其中的元素）的”**
- iterator实现`__next__()`接口，调用`next(iterator_obj)`的时候，返回一个元素或者抛出StopIteration异常
- iterable实现`__iter()__`接口，调用`iter(iterable_obj)`的时候，返回一个iterator对象
- iterator也实现`__iter()__`接口，从而iterator也是iterable的，一般返回self
- for语句接受的是iterable对象，然后自动调用iter()函数得到一个iterator对象，在循环体中再自动调用next()获取iterator的元素或者停止循环

# iterator

摘自Python官方文档：https://docs.python.org/3/glossary.html

> **iterator**
> An object representing a stream of data. Repeated calls to the iterator’s `__next__()` method (or passing it to the built-in function next()) return successive items in the stream. When no more data are available a StopIteration exception is raised instead. At this point, the iterator object is exhausted and any further calls to its `__next__()` method just raise StopIteration again. Iterators are required to have an `__iter__()` method that returns the iterator object itself so every iterator is also iterable and may be used in most places where other iterables are accepted. One notable exception is code which attempts multiple iteration passes. A container object (such as a list) produces a fresh new iterator each time you pass it to the iter() function or use it in a for loop. Attempting this with an iterator will just return the same exhausted iterator object used in the previous iteration pass, making it appear like an empty container.
> 一个代表stream of data（数据流）的对象。通过反复调用iterator对象的`__next()__`方法（或者把它传给内建的next()函数），可以获得数据流中连续的元素。当遍历完成时，没有其他元素了，会触发StopIteration异常。此时iterator对象已经被穷举尽，任何尝试调用`__next()__`方法的操作都只会再次触发StopIteration异常。iterator对象需要实现一个`__iter()__`方法，该方法返回iterator对象本身[1]，所以每个iterator也是iterable的，并且能也出现在任何iterable对象可以出现的地方。一个需要注意的不同是，有些代码可能会尝试多次遍历。一个容器对象（如list），会在每次被传给iter()函数时或者用在for循环时，生成一个全新的iterator。如果换做iterator的话，只会返回在上一轮已经被穷尽的iterator对象，从而使其看起来像一个空的容器。

[1] 其实也可以不返回对象本身

# iterable object
iterable object顾名思义就是“可以迭代的对象”，即可以用`for x in obj`的方式进行迭代。

> **iterable**
 An object capable of returning its members one at a time. Examples of iterables    include all sequence types (such as list, str, and tuple) and some non-sequence types like dict, file objects, and objects of any classes you define with an `__iter__()` method or with a `__getitem__()` method that implements Sequence semantics.
> 一个能够每次返回其一个成员的对象。例如，所有的序列类型（list, str和tuple），还有一些非序列类型，如dict, file对象，以及所有定义了`__iter__()`方法，或者定义了`__getitem__()`方法并实现了Sequence语义的类。

> Iterables can be used in a for loop and in many other places where a sequence is needed (zip(), map(), …). When an iterable object is passed as an argument to the built-in function iter(), it returns an iterator for the object. This iterator is good for one pass over the set of values. When using iterables, it is usually not necessary to call iter() or deal with iterator objects yourself. The for statement does that automatically for you, creating a temporary unnamed variable to hold the iterator for the duration of the loop. See also iterator, sequence, and generator.
> iterable可以被用在for循环中，以及其他很多使用序列的地方（zip(), map(), ...）。当iterable对象被当做参数，调用内建函数iter()时，会得到一个iterator对象。这个iterator对象适合用来对集合中的值进行一次遍历，注意是一次性的。在使用iterable时，通常不必调用iter()来获得iterator对象。for语句会自动生成一个临时的iterator对象用于循环过程。



举例：
```python
class Integers(object):  # iterator and iterable
    def __init__(self, n):
        self.i = 0
        self.n = n

    def __iter__(self):
        return self

    def __next__(self):
        self.i += 1
        if self.i > n:
            raise StopIteration()
        return self.i

class IntegersWrap(object):  # iterable
    def __init__(self, n):
        self.it = Integers(n)

    def __iter__(self):
        return self.it

n = 5
it = Integers(n)
print('first run iterator')
for i in it:
    print(i)
print('second run iterator')
for i in it:
    print(i)
    
it = IntegersWrap(n)
print('first run iteratorwrap')
for i in it:
    print(i)
print('second run iteratorwrap')
for i in it:
    print(i)
"""    
first run iterator
1
2
3
4
5
second run iterator
first run iteratorwrap
1
2
3
4
5
second run iteratorwrap
"""

class GenIntegers(object):  # iterable
    def __init__(self, n):
        self.n = n

    def __iter__(self):
        return Integers(self.n)

gen = GenIntegers(n)
print('first run iterable')
for i in gen:
    print(i)
print('second run iterable')
for i in gen:
    print(i)
"""
first run iterable
1
2
3
4
5
second run iterable
1
2
3
4
5
"""

class PosIterator(object):  # iterator does not return itself
    def __init__(self, n):
        self.i = 0
        self.n = n
    def __next__(self):
        self.i += 1
        if self.i > n:
            raise StopIteration()
        return self.i
    def __iter__(self):
        return NegIterator(self.n)
    
class NegIterator(object):
    def __init__(self, n):
        self.i = 0
        self.n = n
    def __next__(self):
        self.i += 1
        if self.i > n:
            raise StopIteration()
        return -self.i
    def __iter__(self):
        return PosIterator(self.n)
    
it = PosIterator(n)
for j in range(3):
    print('\n{}-th run'.format(j))
    for i in it:
        print(i, end=' ')
"""
0-th run
-1 -2 -3 -4 -5 
1-th run
-1 -2 -3 -4 -5 
2-th run
-1 -2 -3 -4 -5 
"""

class OnlyIterator(object):  # iterator, but not iterable, cannot be used in for loop
    def __init__(self, n):
        self.i = 0
        self.n = n
    def __next__(self):
        self.i += 1
        if self.i > n:
            raise StopIteration()
        return self.i

it = OnlyIterator(n)
while True:
    try:
        print(next(it))
    except StopIteration:
        break
"""
1
2
3
4
5
"""        
```

# generator

> **generator iterator**
> An object created by a generator function.

> Each yield temporarily suspends processing, remembering the location execution state (including local variables and pending try-statements). When the generator iterator resumes, it picks-up where it left-off (in contrast to functions which start fresh on every invocation).
> 类似iterator，是由generator生成的

> **generator**
> A function which returns a generator iterator. It looks like a normal function except that it contains yield expressions for producing a series of values usable in a for-loop or that can be retrieved one at a time with the next() function.

> Usually refers to a generator function, but may refer to a generator iterator in some contexts. In cases where the intended meaning isn’t clear, using the full terms avoids ambiguity.
> 返回generator iterator对象的函数

## 参考
https://docs.python.org/3/glossary.html
http://anandology.com/python-practice-book/iterators.html
http://treyhunner.com/2016/12/python-iterator-protocol-how-for-loops-work/