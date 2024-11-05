# VSCode & Tmux

VSCode can also install a command `code` in your `PATH`, which allows you to open a file in VSCode from command line with `code a.txt`. But this becomes tricky when you are also using `tmux`.

Assum you're using VSCode to connect to a remote host. When you start a terminal in VSCode's "terminal" pannel, it sets some Env vars (`VSCODE_IPC_HOOK_CLI`) which exposes a socket of the current VSCode session. Then when you try to open a file with `code` command, it reads this Env var and connect to the socket and tell the VSCode session to open the file you want. The socket changes when you connect in a new VSCode session.

The problem with `tmux` is when you attach to a previous session, the Env var still points to the old socket. Thus, the `code` command can't work as expected.

To solve this problem:

1. tell `tmux` to update the Env var by adding the line `set-option -g update-environment VSCODE_IPC_HOOK_CLI`
2. when you connect to remote host in a new VSCode session, open a new terminal, and attach to the old session with `tmux a`
3. config your shell to update the Env var:

* for zsh: [https://babushk.in/posts/renew-environment-tmux.html](https://babushk.in/posts/renew-environment-tmux.html)
* for bash: [https://superuser.com/questions/175799/does-bash-have-a-hook-that-is-run-before-executing-a-command](https://superuser.com/questions/175799/does-bash-have-a-hook-that-is-run-before-executing-a-command)
* for fish: TBD

