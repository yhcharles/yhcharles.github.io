https://code.visualstudio.com/docs/remote/tunnels

1. install `code` cli
```shell
curl -Lk 'https://code.visualstudio.com/sha/download?build=stable&os=cli-alpine-x64' --output vscode_cli.tar.gz

tar -xf vscode_cli.tar.gz
```

2. start tunnel
```shell
code tunnel
```
It will ask you to login with Github or Microsoft account. This is necessary for authentication when you try to connect to this tunnel from a VSCode desktop or web app.

3. [optional] run as a service
```shell
code tunnel service install
```
Or remove the service
```shell
code tunnel service uninstall
```

If you are running the service on a Mac and want to prevent it from sleeping
```shell
code tunnel --no-sleep
```

To check service log
```shell
code tunnel service log
```

4. unregister the host
```shell
code tunnel unregister
```
then the host will no longer show in the host list in your account
