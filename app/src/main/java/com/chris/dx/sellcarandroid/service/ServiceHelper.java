package com.chris.dx.sellcarandroid.service;

import android.app.Activity;
import android.app.Notification;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.app.Service;
import android.content.Context;
import android.content.Intent;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.os.IBinder;
import android.os.PowerManager;
import android.util.Log;



import java.lang.reflect.Method;

/**
 * Created by Chris.Wu on 2017/2/23.
 */

public class ServiceHelper  {
//    DialogMessage dialogMessage;
//    Factory factory;
//    Model controlModel;
//    SystemInfo systemInfo;
    static int notificationId = 0;
    static boolean dialogShowing = false;
    public Context controlContext;

    public ServiceHelper(Context context)
    {
        createObj(context);
    }



//    public void activeDialog(String tagName,String message){
//        if (dialogMessage.isShowDialog(controlContext) && (!isScreenOn() || dialogShowing)) {
//            dialogMessage.showDialogMessage(controlContext, message,tagName);
//            dialogShowing = true;
//        }
//        if (!isScreenOn()) {
//        }
//            screenOn();
//    }

    public static void releaseDialogResource() {
        dialogShowing = false;
    }

//    private void screenOn() {
//        PowerManager pm = (PowerManager) controlContext.getSystemService(controlContext.POWER_SERVICE);
//        PowerManager.WakeLock wl = pm.newWakeLock(PowerManager.ACQUIRE_CAUSES_WAKEUP | PowerManager.SCREEN_DIM_WAKE_LOCK, Constants.SCREEN_ON_STRING);
//        wl.acquire();
//        wl.release();
//    }

//    private boolean isScreenOn() {
//        boolean screenState;
//        PowerManager pm = (PowerManager) controlContext.getSystemService(controlContext.POWER_SERVICE);
//        Method mReflectScreenState;
//        try {
//            mReflectScreenState = PowerManager.class.getMethod(Constants.IS_SCREEN_ON, new Class[]{});
//            screenState = (Boolean) mReflectScreenState.invoke(pm);
//        } catch (Exception nsme) {
//            screenState = false;
//        }
//        return screenState;
//    }

//    public void sendNotification(String title, String message) {
////        final int notifyID = 1; // 通知的識別號碼
//        if (notificationId >= 32766) {
//            notificationId = 0;
//        }
//        Bitmap largeIcon = BitmapFactory.decodeResource(
//                controlContext.getResources(), R.drawable.notification_large_icon);
//        Intent intent = new Intent(controlContext, MainActivity.class);
//        intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK);
//        intent.putExtra(Constants.ACTION_EXTRA_KEY, Constants.ALARM_SUMMARY_EXTRA_VALUE);
//        PendingIntent contentIntent = PendingIntent.getActivity(controlContext, 0, intent, PendingIntent.FLAG_UPDATE_CURRENT);
//        final NotificationManager notificationManager = (NotificationManager) controlContext.getSystemService(Context.NOTIFICATION_SERVICE); // 取得系統的通知服務
//        final Notification notification = new Notification.Builder(controlContext.getApplicationContext())
//                .setLargeIcon(largeIcon)
//                .setSmallIcon(R.drawable.notification_small_icon)
//                .setShowWhen(false)
//                .setContentTitle(title)
//                .setContentText(message)
//                .setContentIntent(contentIntent)
//                .build(); // 建立通知
//        notification.flags = Notification.FLAG_AUTO_CANCEL;
//        notification.defaults |= Notification.DEFAULT_SOUND;
//        notification.defaults |= Notification.DEFAULT_VIBRATE;
//        notificationManager.notify(notificationId++, notification); // 發送通知
//    }

    private void createObj(Context context) {
        controlContext= context;
        //factory = new Factory();
//        factory = Factory.getInstance();
//        controlModel = factory.createModel(controlContext);
//        dialogMessage = factory.createDialogMessage(controlContext,controlModel.getLang());
//        systemInfo = controlModel.getSystemInfo();

    }
}
