# 2016-06-20 static link for cgo

Example refers to: [https://github.com/yhcharles/go/tree/master/cgo](https://github.com/yhcharles/go/tree/master/cgo)

cgo provides a way for Go to call C/C++ code.

The usual way is to compile C/C++ code into a .so library (say `hi.so`), and provide a .h file (say `hi.h`). Then, in Go source file, by adding extra comment lines which starts with `#cgo CFLAGS: -I.` and `#cgo LDFLAGS: -L. -lhi`, Go is able to compile and link to C/C++ code. And this is the easy way.

But in some circumstances, it would be better if we can use static link to C/C++ library, which will generate a single binary excutable and much easier to deploy. To do so, of course we need to compile the C/C++ code into a .a library instead of .so (say `hi.a`), and you can just make use of the same `hi.h`. But in Go source file, you'll need to make some minor changes to this line: `#cgo LDFLAGS: hi.a -lstdc++`. Note that the full filename of .a library is needed, and you'll have to told the linker to add standard C++ lib as well. Then you can build with `go build`, and get a single binary file.

P.S.
If you want the whole binary to be static linked, you can set the -ldflags option for go build: `go build -ldflags '-extldflags "-static"'`

