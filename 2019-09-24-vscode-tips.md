## “unresolved import" error

https://stackoverflow.com/questions/53939751/pylint-unresolved-import-error-in-visual-studio-code

add setting:

```json
"python.autoComplete.extraPaths": ["./src"]
```

replace `"./src"` with your path

