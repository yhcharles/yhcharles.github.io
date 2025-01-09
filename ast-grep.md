# ast-grep

`ast-grep`is a tool that performs pattern matching on AST (abstract syntax tree) of programming languages. Similar to `grep`, which operates on characters in strings, `ast-grep` operates on tokens in syntax trees.



An example from the [official doc](https://ast-grep.github.io/guide/quick-start.html) is:

```sh
ast-grep --pattern '$PROP && $PROP()' --lang ts TypeScript/src
```

it will match all the following cases:

```javascript
obj.val && obj.val() // verbatim match, of course
obj.val    &&     obj.val() // this matches, too

// this matches as well!
const result = obj.val &&
   obj.val()
```



Another common use case is for code refactoring. Instead of parsing the text of source code using some AST library (e.g. ast or libcst in Python), `ast-grep`makes it as simple as a command. For example, to replace a common pattern in old typescript to use the new optional chaining operator `?.`:

```sh
# pattern and language argument support short form
ast-grep -p '$PROP && $PROP()' \
   --rewrite '$PROP?.()' \
   --interactive \
   -l ts \
   TypeScript/src
```

That's it!



More powerful usages can be found in the official doc [https://ast-grep.github.io/guide/introduction.html](https://ast-grep.github.io/guide/introduction.html).
