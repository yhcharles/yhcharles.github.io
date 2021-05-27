# monitor CPU/memory usage of a process

https://askubuntu.com/questions/720451/monitor-memory-usage-of-a-single-process-in-ubuntu

**pre-requisite:**
1. install _sysstat_ package
2. read `man pidstat`

**example:**
say you want to monitor the process with PID 12345, track its memory usage every 30 seconds, till it finishes:

`pidstat -p 12345 -r 30 >usage.log`

Then you can check the the output or plot a diagram to show the amount of memory usage with time.
