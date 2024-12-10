# Python load module from file

<pre class="language-python"><code class="lang-python"><strong>from types import ModuleType
</strong><strong>
</strong><strong>def load_module_from_file(file_path: str) -> ModuleType | None:
</strong>    if not file_path:
        return

    with open(file_path, "r") as f:
        code = f.read()
        module_name = os.path.basename(file_path).replace(".py", "")
        module = type(sys)(module_name)
        exec(code, module.__dict__)
        return module

</code></pre>
