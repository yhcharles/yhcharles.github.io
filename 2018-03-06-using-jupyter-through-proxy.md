# Using Jupyter through proxy

Recently Jupyter lab becomes available, which makes a better environment for Python and Machine Learning.

Sometimes, you may want to run Jupyter on a remote host. By default, Jupyter server listens on `localhost:8888`, which can only be accessed locally.

Yes, of course you can set Jupyter to listen on all interfaces with `--ip=0.0.0.0`. So that you can directly access the remote Jupyter instance with the IP address. But this may bring some security issues.

A better way is to use SSH port forwarding, as introduced in my last post.

You can either setup a local port forwarding -- forward a local port to remote Jupyter port, or use a dynamic port forwarding as a proxy -- which will be detailed below.

1. setup dynamic port forwarding: `ssh -N -f -D ${LOCAL_PORT} ${REMOTE_HOST}`. If you're using Mac, there's a App "SSH Tunnel Manager" to help you get this done easier.
2. install some proxy management extensions with your browser, say "SwitchyOmega" for Google Chrome. Create a new profile, set the proxy server as `localhost:${LOCAL_PORT}`.
3. add **two** new Auto Switch Rule: one for `http://localhost:8888/*`, the other for `ws://localhost:8888/*`, both use the new profile you created

Now when you open your browser and go to http://localhost:8888/lab, the traffic will go through the proxy, to the 8888 port of remote host.