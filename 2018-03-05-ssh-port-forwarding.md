https://wangdoc.com/ssh/port-forwarding.html

http://www.ruanyifeng.com/blog/2011/12/ssh_port_forwarding.html
https://www.ibm.com/developerworks/cn/linux/l-cn-sshforward/
https://www.ssh.com/ssh/tunneling/example (for some extra config)

# Local port forwarding

"Local port forwarding" is *forwarding all the requests sent to local port to remote host/port*, i.e. mapping a port of local host to a port of remote host.

- Say you want to connect to some host `T` (target). But you cannot connect to it directly. You'll need to first connect to some other host `R` (relay). You can setup a local port forwarding: all data sent to local port `L_PORT` will go to host `R`, then forwarded to host `T`.

```bash
$ ssh -N -f -L ${L_PORT}:${T_IP}:${T_PORT} ${R_HOST}

# requests -> local:L_PORT -> R_HOST -> T_HOST(view from R_HOST):T_PORT
```


The `-N` option tells SSH that no remote commands will be executed, and is useful for port forwarding.

The `-f` option tells SSH go to background, so the local tunnel-enabling terminal remains usable.

Note that when you see some error like `ControlSocket /tmp/xxxxx:22 already exists, disabling multiplexing`, you should quit all existing connections first.

- Especially, when `R` and `T` is the same host, you can start a service on `T` which listens on `localhost` only. And use local port forwarding to connect to that service. This can make the service safer, instead of expose the port to all traffic.

```bash
$ ssh -N -f -L ${L_PORT}:localhost:${T_PORT} ${T_HOST}
```

Note that in the above command, `localhost` is relative to the host `R`, i.e. host `T`, which is host `T` itself.

# Remote port forwarding

"Remote port forwarding" is mapping a remote port to a local port.

```bash
$ ssh -N -f -R ${L_PORT}:${T_IP}:${T_PORT} ${R_HOST}
```

# Dynamic port forwarding

"Dynamic port forwarding" is actually a socket proxy.

```bash
$ ssh -N -f -D ${L_PORT} ${R_HOST}
```

This starts a proxy server on `L_PORT` of local host. And all traffic goes through the relay host.

