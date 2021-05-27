# 2017-01-12 vibrate for android device

1. Add permission to `AndroidManifest.xml` file:

```xml
<manifest ...>

  <uses-permission android:name="android.permission.VIBRATE" />

  <application ...>
  </application>

</manifest>
```

2. Add Java code:

```java
import android.os.Vibrator;
...

  Vibrator v = (Vibrator) getSystemService(Context.VIBRATOR_SERVICE);
  v.vibrate(500);
```

Refer to: 

http://stackoverflow.com/questions/13950338/how-to-make-an-android-device-vibrate

https://developer.android.com/reference/android/os/Vibrator.html#vibrate(long[], int)
