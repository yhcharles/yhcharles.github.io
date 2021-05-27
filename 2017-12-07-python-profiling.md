# Python profiling

## pre-requisite

Python's builtin module:
https://docs.python.org/3/library/profile.html

Tool converts profiling output to a dot graph:
https://github.com/jrfonseca/gprof2dot
`apt-get install graphviz`
`pip install gprof2dot`

## simple use case

1. generate profile log: `python3 -m cProfile -o output.pstats main.py args`
2. generate image: `gprof2dot -f pstats output.pstats | dot -Tpng -o output.png`
