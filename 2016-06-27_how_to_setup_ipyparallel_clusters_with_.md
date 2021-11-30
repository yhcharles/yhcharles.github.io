# 2016-06-27 how to setup ipyparallel clusters with ssh

ipython-parallel is a great python tool to implement parallel computing. Here's a brief introduction about how to setup a cluster using ssh.

1. you'd better to config ssh trust between the sever nodes in cluster
2. initialize config profile: `ipython profile create --parallel --profile=ssh`, in which `ssh` is the profile name and you can change it as you wish, more options can be found by `ipython profile create --help-all`
3. ~~modify `~/.ipython/profile_ssh/ipcluster_config.py`, add~~(by adding command line arguments in step 5, this will not be necessary)

```python
   c.IPClusterEngines.engine_launcher_class = 'SSH'
   c.SSHEngineSetLauncher.engines = {
    'IP_1:PORT_1': 1,
    'IP_2:PORT_2': 1
   }
```

in which `IP_n:PORT_n` is the ssh address of your nodes to run engines on.
4. start your controller: `ipcontroller --enginessh="IP_0:PORT_0"`
5. start your engines: `ipcluster engines --engines='SSH' --SSHEngineSetLauncher.engines='{"IP_1:PORT_1": 1, "IP_2:PORT_2": 1}'`

then, on each node, you can start a client:
```python
import ipyparallel as ipp
rc = ipp.Client()
print rc.ids
```

refers to:

more about setting up a cluster:
http://ipyparallel.readthedocs.io/en/latest/process.html

more about how to use ipyparallel:
http://ipyparallel.readthedocs.io/en/latest/multiengine.html

