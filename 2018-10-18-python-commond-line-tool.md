# Python command line tool

## Build a new tool

Here a command line tool refers to a program works like a shell, in which you can interact with the program with some command, and it echos some results. Some typical programs like `mysql` for MySQL, `mongo` for mongoDB, or `python` for Python.

- Python has a builtin library `cmd` which helps to build such a program: https://docs.python.org/3.6/library/cmd.html. With this library, you automatically get features like tab-completion, history-editing etc.
- If you want some more advanced features, `python-prompt-toolkit` is a good choice: https://github.com/jonathanslenders/python-prompt-toolkit. It is really powerful and provides syntax highlighting, auto suggestions. In fact, they even build a vim clone with the library. And there's even a Golang version inspired by it: https://github.com/c-bata/go-prompt
- Another library is `nubia`: https://github.com/facebookincubator/python-nubia, developed by Facebook. It's like kind of combination of `cmd` and `python-prompt-toolkit`.

## Improve an exsisting tool

With these libraries, you can actually build a wrapper of any exsiting tool to enhance them:

```python
proc = subprocess.Popen(original_command,
                       stdin=PIPE,
                       stdout=sys.stdout,
                       stderr=sys.stderr,
                       bufsize=0,
                       universal_newlines=True)
while True:
	proc.stdin.write(cmd + '\n')
    proc.stdin.flush()
```

Another simpler version by using the `sh` library:

```python
q = queue.Queue()
sh.Command(original_command, _in=q, _out=sys.stdout, _err=sys.stderr, _fg=True)
# accept use input, and append to q
```



## Other

- `fire`: https://github.com/google/python-fire, by Google, is a very easy to use library for build command line tools, but not aiming for interactive mode
- `sh`: https://amoffat.github.io/sh/, works the reverse way -- turn a command into a python function

