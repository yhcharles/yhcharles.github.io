# matplotlib tips

Use matplotlib in jupyter:

```python
# show plot automatically
%matplotlib inline

# set resolution of plot to 'retina'
%config InlineBackend.figure_format = 'retina'

import matplotlib.pyplot as plt

# new fig and ax
fig, ax = plt.subplots(nrows=1, ncols=1, figsize=(15, 9))

# histogram
x = np.random.randn(1000, 3)
ax.hist(x, bins=20, histtype='bar', label=['a', 'b', 'c'])
# show legend
ax.legend()

# title
ax.set_title('test')

# xlabel, ylabel
plt.xlabel('x value')
plt.ylabel('y value')
```
