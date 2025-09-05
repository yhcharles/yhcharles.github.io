# GUI with Python

| Package     | Web | Mobile | Desktop |
| ----------- | --- | ------ | ------- |
| Tkinter     |     |        |         |
| PyQT/PySide |     |        |         |
| Kivy        |     |        |         |
| PySimpleGUI |     |        |         |
| DearPyGui   |     |        |         |
| Flet        |     |        |         |
| streamlit   |     |        |         |
| Dash        |     |        |         |
| Gradio      |     |        |         |
| NiceGUI     |     |        |         |
| Reflex      |     |        |         |
| Rio         |     |        |         |
| Taipy       |     |        |         |



## 3. Web

- [Eel](https://github.com/ChrisKnott/Eel)
  - approach: start a browser window (in App mode if possible), and use websocket for IPC of Python and Js
  - also check the issues in this project
- [remi](https://github.com/dddomodossola/remi)
  - with some built-in widgets, but seems not able to draw on canvas
  - there is a gui editor: http://remiguieditor--daviderosa.repl.co/
- [pywebview](https://github.com/r0x0r/pywebview) ([js_api](https://github.com/r0x0r/pywebview/blob/master/examples/js_api.py))
  - integrate a webview in the app window, and interact with it, but in my test, sometimes the window just not show up
- [flexx](https://github.com/flexxui/flexx)
- [cefpython](https://github.com/cztomczak/cefpython)


## 4. interact with Js

Translate/compile Python to Js:
- [brython](http://www.brython.info/)
- [transcrypt](https://transcrypt.org/)
- [pypyjs](http://pypyjs.org/)
- pyodide/pyscript
