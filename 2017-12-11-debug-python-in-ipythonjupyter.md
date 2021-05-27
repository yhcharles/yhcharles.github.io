# Debug python in ipython/jupyter

## in ipython

just start ipython, and use `%run?` for detailed information.

## in jupyter

https://davidhamann.de/2017/04/22/debugging-jupyter-notebooks/

The old way:

```python
def you_func():
    from IPython.core.debugger import Tracer; Tracer()()
    do_something()
```

New way:

```python
def you_func():
    from IPython.core.debugger import set_trace; set_trace()
    do_something()
```

This will start an interactive debug shell in the cell's output area.