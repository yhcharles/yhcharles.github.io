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
