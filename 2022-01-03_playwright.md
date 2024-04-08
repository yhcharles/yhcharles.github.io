# Get Started
https://playwright.dev/python/docs/library
```sh
pip install playwright  # install python package
playwright install  # install browser
```

There are sync API and async API. We have to use async API in Jupyter notebook.

# XPath
Tutorial: https://www.w3schools.com/xml/xpath_intro.asp

In Javascript, we can iterate all node matching an XPath:
```js
let nodes = document.evaluate('//span[@class="ztlz"]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null)

for (i = 0; i < nodes.snapshotLength; i++) {
	let node = nodes.snapshotItem(i);
}
```

In Python, we can use `locator`:
```python
nodes = await page.locator('xpath=//span[@class="ztlz"]').all()
```
in `nodes`, each is a [`Locator`](https://playwright.dev/python/docs/api/class-locator) instance

we can also use `page.query_selector_all()` which also accepts XPath in addition to CSS:
```python
nodes = await page.query_selector_all('xpath=//span[@class="ztlz"]')
```
however, this is not officially encouraged.
