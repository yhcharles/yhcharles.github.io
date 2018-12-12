https://superuser.com/questions/472951/make-a-clone-of-virtualbox-machine-that-doesnt-cause-windows-re-activation-afte

> - Full clone the machine. Do not start it.
> - From command line:
>   `VBoxManage modifyvm "Cloned VM name" --hardwareuuid xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`
> - As UUID use the the machine id (or hardware id if present) from the original machine.
> - To get the that UUID use:
>   `VBoxManage showvminfo "Original VM name"`
> 
> This should work. Tested on Windows 10 guest, already activated.



