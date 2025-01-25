import shlex
from functools import partial

from js import document, navigator
from puepy import Application, Page, t


app = Application()


@app.page()
class HelloWorldPage(Page):
    def initial(self):
        return {"shell-command-single-line": "", "shell-command-multi-line": ""}

    def populate(self):
        with t.sl_tab_group(placement="start"):
            t.sl_tab("shell command converter", slot="nav", panel="tab-1")
            t.sl_tab("Tab 2", slot="nav", panel="tab-2")
            with t.sl_tab_panel(name="tab-1"):
                with t.div(style="display: flex; gap: 1rem;"):
                    with t.div(style="position: relative; flex: 1;"):
                        t("single-line:")
                        t.textarea(
                            style="width: 100%; height: 200px;",
                            rows="10",
                            placeholder="t1",
                            class_="code",
                            bind="shell-command-single-line",
                        )
                        with t.sl_button(
                            style="position: absolute; top: 30px; right: 10px;",
                            class_="copy-btn",
                            data_target="t1",
                            on_click=self.copy_to_clipboard_single,
                        ):
                            t.sl_icon(name="copy")
                    with t.div(
                        style="display: flex; flex-direction: column; align-items: center; gap: 1rem;"
                    ):
                        with t.sl_button(
                            class_="convert-btn",
                            on_click=self.on_convert_btn_click_to_multi,
                        ):
                            t.sl_icon(name="arrow-right")
                        with t.sl_button(
                            class_="convert-btn",
                            on_click=self.on_convert_btn_click_to_single,
                        ):
                            t.sl_icon(name="arrow-left")
                    with t.div(style="position: relative; flex: 1;"):
                        t("multi-line:")
                        t.textarea(
                            style="width: 100%; height: 200px;",
                            rows="10",
                            placeholder="t2",
                            class_="code",
                            bind="shell-command-multi-line",
                        )
                        with t.sl_button(
                            style="position: absolute; top: 30px; right: 10px;",
                            class_="copy-btn",
                            data_target="t2",
                            on_click=partial(
                                self.copy_to_clipboard_single, is_multi_line=True
                            ),
                        ):
                            t.sl_icon(name="copy")
            with t.sl_tab_panel(name="tab-2"):
                t.h1("Content: Tab 2")

    def on_convert_btn_click_to_multi(self, event):
        self.state["shell-command-multi-line"] = " \\\n".join(
            shlex.split(self.state["shell-command-single-line"])
        )

    def on_convert_btn_click_to_single(self, event):
        self.state["shell-command-single-line"] = " ".join(
            s.strip().rstrip("\\").strip()
            for s in self.state["shell-command-multi-line"].splitlines()
        )

    def copy_to_clipboard_single(self, event, is_multi_line=False):
        if is_multi_line:
            navigator.clipboard.writeText(self.state["shell-command-multi-line"])
        else:
            navigator.clipboard.writeText(self.state["shell-command-single-line"])


app.mount("#app")
