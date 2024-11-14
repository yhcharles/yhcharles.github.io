# 2019-09-20 Python: Pandas tips

## Table display setting

To display all text in a cell without truncation:

`pd.set_option('display.max_colwidth', None)`

`pd.set_option('display.max_rows', None)`

{% embed url="https://songhuiming.github.io/pages/2017/04/02/jupyter-and-pandas-display/" %}

## Groupby

Convert a `groupby` result object back to `DataFrame`

{% embed url="https://stackoverflow.com/questions/10373660/converting-a-pandas-groupby-multiindex-output-from-series-back-to-dataframe" %}

