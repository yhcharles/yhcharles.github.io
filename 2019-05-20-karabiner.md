Karabiner-Elements can be used to change key-map on Mac OSX.

1. install Karabiner-Elements: `brew cask install karabiner-elements`
2. open karabiner-elements, go to preferences
3. add some "Simple Modifications"
4. for "Complex Modifications", click "Add rule" -> "import more rules from the internet", add more rules
5. for customizing, edit `~/.config/karabiner/karabiner.json`, then restart karabiner
   1. in order to customize for an specific App on Max OS, you'll need the bundle identifier, to find the bundle id: `osascript -e 'id of app "Name of App"'` ([refererence](https://robservatory.com/easily-see-any-apps-bundle-identifier/))

