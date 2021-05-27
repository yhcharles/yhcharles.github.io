https://pymotw.com/2/argparse/

sample code:

```python
import argparse

parser = argparse.ArgumentParser()

parser.add_argument('-s', action='store', dest='simple_value',
                    help='Store a simple value')

parser.add_argument('-c', action='store_const', dest='constant_value',
                    const='value-to-store',
                    help='Store a constant value')

parser.add_argument('-t', action='store_true', default=False,
                    dest='boolean_switch',
                    help='Set a switch to true')
parser.add_argument('-f', action='store_false', default=False,
                    dest='boolean_switch',
                    help='Set a switch to false')

parser.add_argument('-a', action='append', dest='collection',
                    default=[],
                    help='Add repeated values to a list',
                    )

parser.add_argument('-A', action='append_const', dest='const_collection',
                    const='value-1-to-append',
                    default=[],
                    help='Add different values to list')
parser.add_argument('-B', action='append_const', dest='const_collection',
                    const='value-2-to-append',
                    help='Add different values to list')

parser.add_argument('--version', action='version', version='%(prog)s 1.0')

results = parser.parse_args()
print 'simple_value     =', results.simple_value
print 'constant_value   =', results.constant_value
print 'boolean_switch   =', results.boolean_switch
print 'collection       =', results.collection
print 'const_collection =', results.const_collection
```

run:

```bash
$ python argparse_action.py -h

usage: argparse_action.py [-h] [-s SIMPLE_VALUE] [-c] [-t] [-f]
                          [-a COLLECTION] [-A] [-B] [--version]

optional arguments:
  -h, --help       show this help message and exit
  -s SIMPLE_VALUE  Store a simple value
  -c               Store a constant value
  -t               Set a switch to true
  -f               Set a switch to false
  -a COLLECTION    Add repeated values to a list
  -A               Add different values to list
  -B               Add different values to list
  --version        show program's version number and exit

$ python argparse_action.py -s value

simple_value     = value
constant_value   = None
boolean_switch   = False
collection       = []
const_collection = []

$ python argparse_action.py -c

simple_value     = None
constant_value   = value-to-store
boolean_switch   = False
collection       = []
const_collection = []

$ python argparse_action.py -t

simple_value     = None
constant_value   = None
boolean_switch   = True
collection       = []
const_collection = []

$ python argparse_action.py -f

simple_value     = None
constant_value   = None
boolean_switch   = False
collection       = []
const_collection = []

$ python argparse_action.py -a one -a two -a three

simple_value     = None
constant_value   = None
boolean_switch   = False
collection       = ['one', 'two', 'three']
const_collection = []

$ python argparse_action.py -B -A

simple_value     = None
constant_value   = None
boolean_switch   = False
collection       = []
const_collection = ['value-2-to-append', 'value-1-to-append']

$ python argparse_action.py --version

argparse_action.py 1.0
```



```python
parser.add_argument('--int_arg', type=int)  # typing
parser.add_argument('position_arg')  # positional args
parser.add_argument('--multiple_arg', nargs='+')  # a list of args, if nargs is *, it can take 0 or more args ??? need to verify

```



## Run another program with args

If you want to start another program with args:

```python
ap = argparse.ArgumentParser(allow_abbrev=False)  # https://stackoverflow.com/a/56640098/6526184
ap.add_argument('--a1')
ap.add_argument('command-line', nargs=argparse.REMAINDER)
ap.parse_args('other_program -a b c --a1 d e'.split())
```

This is still not perfect, e.g:

```python
ap = argparse.ArgumentParser(allow_abbrev=False)  # https://stackoverflow.com/a/56640098/6526184
ap.add_argument('--a1')
ap.add_argument('--a2', nargs='*')  # this will "eat" the remainder args
ap.add_argument('command-line', nargs=argparse.REMAINDER)
ap.parse_args('other_program -a b c --a1 d e'.split())
```

So, the best choice might be use the `--` delimiter:

```python
ap = argparse.ArgumentParser()
ap.add_argument('--a1')
ap.add_argument('--a2', nargs='*')  # this will "eat" the remainder args
ap.add_argument('command-line', nargs=argparse.REMAINDER)
ap.parse_args('--a1 --a2 -- other_program -a b c --a1 d e'.split())  # note the -- as delimiter
```

