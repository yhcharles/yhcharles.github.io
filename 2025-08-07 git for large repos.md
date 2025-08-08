When working on large repos, sometime git commands can take a long time to finish. However, there are a few approaches that may help to mitigate this problem.

1. [Partial Clone](https://git-scm.com/docs/partial-clone)
It defers downloading the file content (blob) till you need them.
```shell
git clone --filter=blob:none <url>
```

2. [Sparse Checkout](https://git-scm.com/docs/git-sparse-checkout)
It allows you to only checkout a subset of files/folders of the repo.
```shell
# init
git sparse-checkout init --cone

# config and checkout a list of folders/files
git sparse-checkout set path/to/folder1/ path/to/file1

# add a path to current checkout
git sparse-checkout add path/to/folder/

# list files/folders in current checkout
git sparse-checkout list
```
Remember to run those commands in the root folder of your repo.

3. [Shallow Clone](https://git-scm.com/docs/git-clone)
```shell
git clone --depth 1 <url>
```
Only download limited history of the repo.

4. Do not download all remote branches
By default, git will get all remote branches when you run `git fetch` or `git pull`. Of course you can specify the branch when you run these commands, e.g.
```shell
git fetch origin main
```
But it's more convenient to set it in your config as default:
```shell
git config --add remote.origin.fetch '+refs/heads/bugfix/*:refs/remotes/origin/bugfix/*'
```
or edit your .gitconfig file:
```toml
[remote "origin"]
    url = <repository-url>
    fetch = +refs/heads/main:refs/remotes/origin/main
    fetch = +refs/heads/feature/*:refs/remotes/origin/feature/*
```
