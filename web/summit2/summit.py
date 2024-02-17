from datetime import datetime

from browser import aio, document, window


_location_list = (
    "summitWest summitCentral silverFir summitEast alpental nordic tubingPark".split()
)
_location_hours = {}


async def open_hours(location):
    for _ in range(3):
        r = await aio.get(
            f"https://summitatsnoqualmie.com/hours?location={location}", cache=True
        )
        if r.status != 200:
            continue
        data = r.data
        if not data:
            continue

        parser = window.DOMParser.new()
        doc = parser.parseFromString(data, "text/html")

        ret = {}
        for tag_month in doc.getElementsByClassName("calendar-container"):
            month, year = tag_month["class"].split()[1:3]
            month, year = int(month[len("month-") :]), int(year[len("year-") :])
            for tag_day in tag_month.getElementsByClassName("grid-item"):
                if not tag_day.innerHTML.strip():
                    continue
                day_of_week = tag_day.getElementsByClassName("calendar-day")
                day_of_week = (
                    tag_day.getElementsByClassName("calendar-day")
                    .item(0)
                    .innerText.strip()
                )
                date = int(
                    tag_day.getElementsByClassName("calendar-date")
                    .item(0)
                    .innerText.strip()
                )
                hours = " ".join(
                    tag_day.getElementsByClassName("calendar-hours")
                    .item(0)
                    .innerText.split()
                )
                if len(hours):
                    ret[f"{year}-{month:02d}-{date:02d} ({day_of_week})"] = hours
        if not ret:
            continue
        return ret


async def set_loc_hours(loc):
    ret = await open_hours(loc)
    global _location_hours
    _location_hours[loc] = ret


def get_date_hours():
    date_hours = {}
    for loc, hours in _location_hours.items():
        for date, hour in hours.items():
            if date not in date_hours:
                date_hours[date] = {}
            date_hours[date][loc] = hour
    return date_hours


def format_hours(date_hours):
    output = []
    now = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    output.append(f"updated: {now}\n")
    for date in sorted(date_hours.keys()):
        if date < now[:10]:
            continue
        output.append(f"----- {date} -----")
        for loc in _location_list:
            output.append(
                f"{loc.replace('summit', ''):>10}: {date_hours[date].get(loc, 'N/A').replace('Open ', '')}"
            )
    return "\n".join(output)


React = window.React
ReactDOM = window.ReactDOM
mui = window.MaterialUI


def E(tag_or_component, *children, **props):
    return React.createElement(tag_or_component, props, *children)


def DefineComponent(tag_or_component):
    def Component(*children, **props):
        return E(tag_or_component, *children, **props)

    return Component


AppBar = DefineComponent(mui.AppBar)
Box = DefineComponent(mui.Box)
Button = DefineComponent(mui.Button)
Div = DefineComponent("div")
H1 = DefineComponent("h1")
P = DefineComponent("p")
Paper = DefineComponent(mui.Paper)
Pre = DefineComponent("pre")
Table = DefineComponent(mui.Table)
TableBody = DefineComponent(mui.TableBody)
TableCell = DefineComponent(mui.TableCell)
TableContainer = DefineComponent(mui.TableContainer)
TableHead = DefineComponent(mui.TableHead)
TableRow = DefineComponent(mui.TableRow)
Typography = DefineComponent(mui.Typography)


def App(props=None, *children):
    hour_info, set_hour_info = React.useState(False)

    def init():
        async def get_hour_info(location):
            await set_loc_hours(location)
            if len(list(_location_hours.keys())) < len(_location_list):
                return
            set_hour_info(True)

        if hour_info:
            return
        for loc in _location_list:
            aio.run(get_hour_info(loc))

    init()

    today = datetime.now().strftime("%Y-%m-%d")

    return Div(
        Box(
            AppBar(
                Typography(
                    "Summit@Snoqualmie Open Hours",
                    variant="h6",
                    component="div",
                    sx={"flexGrow": 1},
                ),
                position="static",
                sx=dict(mr=2),
            ),
            sx=dict(flexGrow=1),
        ),
        (
            Paper(
                TableContainer(
                    Table(
                        TableHead(
                            TableRow(
                                TableCell("Date"),
                                *(TableCell(loc) for loc in _location_list),
                            ),
                        ),
                        TableBody(
                            *[
                                TableRow(
                                    TableCell(date),
                                    *(
                                        TableCell(loc_hour.get(loc, "N/A"))
                                        for loc in _location_list
                                    ),
                                    hover=True,
                                    style=(
                                        dict(backgroundColor="#EEFFEE")
                                        if "S" in date
                                        else {}
                                    ),
                                )
                                for date, loc_hour in get_date_hours().items()
                                if date >= today
                            ],
                        ),
                        stickyHeader=True,
                    ),
                    sx=dict(maxHeight=window.innerHeight - 60),
                ),
                width="100%",
                overflow="auto",
            )
            if hour_info
            else "loading..."
        ),
    )


ReactDOM.createRoot(document["root"]).render(E(App))
