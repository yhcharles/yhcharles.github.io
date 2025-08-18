It seems there's no way to turn if off for all cases, but only for network locations or USB disks.

- For network locations
Run this command, and reboot:
```shell
defaults write com.apple.desktopservices DSDontWriteNetworkStores true
```

To verify after reboot:
```shell
defaults read com.apple.desktopservices DSDontWriteNetworkStores
```
it should show `true`.

- For USB drives
```
defaults write com.apple.desktopservices DSDontWriteUSBStores -bool true
```

Reference: https://www.techrepublic.com/article/how-to-disable-the-creation-of-dsstore-files-for-mac-users-folders/



