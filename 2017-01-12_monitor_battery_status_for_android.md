# 2017-01-12 monitor battery status for android

1. You'll need a receiver to receive that broadcast. For example, you can declare one as a private member in the main activity class:

```java
    private BroadcastReceiver batteryInfoReciver = new BroadcastReceiver() {
        @Override
        public void onReceive(Context context, Intent intent) {
            int level = intent.getIntExtra(BatteryManager.EXTRA_LEVEL, -1);
            int scale = intent.getIntExtra(BatteryManager.EXTRA_SCALE, -1);
            float percent = level / (float) scale;
            // action to take when a intent is received ...
        }
    };
```

2. Then you can register/unregister it when you need:

```java
   // register receiver
   public void registerReceiver() {
       IntentFilter ifilter = new IntentFilter(Intent.ACTION_BATTERY_CHANGED);
       this.registerReceiver(batteryInfoReceiver, ifilter);
   }
   
   // unregister receiver
   public void unregisterReceiver() {
       this.unregisterReceiver(batteryInfoReceiver);
   }
```

Refer to
http://stackoverflow.com/questions/14423789/automatic-update-battery-level-in-android