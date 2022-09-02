# Stylus simple usage

Stylus is a Chrome extension allows users to write css to customize the style of web pages.

### Install

Go to Chrome extension store and search for "stylus", [here is the current link](https://chrome.google.com/webstore/detail/stylus/clngdbkpkpeebahjckkjfobafhncgmne).

### Add new style

Open a web page you want to customize, click on the extension, and select "Write style for XXX"

### Syntax

Refer to the official doc for syntax: [https://github.com/openstyles/stylus/wiki/Writing-styles#syntax](https://github.com/openstyles/stylus/wiki/Writing-styles#syntax)

### CSS Doc

Refer to w3schools for CSS doc: [https://www.w3schools.com/w3css/w3css\_fonts.asp](https://www.w3schools.com/w3css/w3css\_fonts.asp)

### Example

```css
/* ==UserStyle==
@name           www.cnblogs.com - 9/1/2022, 8:02:11 PM
@namespace      github.com/openstyles/stylus
@version        1.0.0
@description    A new userstyle
@author         Me
==/UserStyle== */

@-moz-document domain("www.cnblogs.com") {
    /* Insert code here... */
    code {
        font-family: menlo !important;
    }
}
```
