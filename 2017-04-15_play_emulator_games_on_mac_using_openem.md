# 2017-04-15 play emulator games on Mac using OpenEmu

After searching and trying a lot of times, I finally found this works for me: https://www.youtube.com/watch?v=Bq59puEVmI0

Here's how:

1. Go to https://github.com/OpenEmu/OpenEmu/releases
2. Download version 2.0.1-experimental, and install it
3. Start OpenEmu, goto "preference -> Cores", install core for "MAME"
4. goto "Library", uncheck all of "Organization Methods", and check "Arcade" in "Available Libraries"
4. Download BIOS for mame from: [here](https://www.dropbox.com/sh/ut99y6bmawh5e7u/AACf0Lq3WyEmeC6m7oIxXczJa?dl=0) or [here](https://archive.org/download/MESS-0.149.BIOS.ROMs), extract the files into a directory, say "ROMs"
5. Download any other ROMs of the game you want from [here](http://ia600903.us.archive.org/zipview.php?zip=/31/items/MAME_0.149_ROMs/MAME_0.149_ROMs.zip) ([or download them all](https://archive.org/download/MAME_0.149_ROMs), [extra](https://archive.org/download/MAME_0.149_EXTRAs)) put them into the same "ROMs" folder
6. Back to OpenEmu, drag the ROM of your game into OpenEmu. It should work now.



