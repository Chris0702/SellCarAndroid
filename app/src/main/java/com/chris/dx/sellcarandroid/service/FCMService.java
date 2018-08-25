package com.chris.dx.sellcarandroid.service;

import android.app.AlertDialog;
import android.app.KeyguardManager;
import android.app.Notification;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.app.Service;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.media.RingtoneManager;
import android.net.Uri;
import android.os.Build;
import android.os.Looper;
import android.os.PowerManager;
import android.os.Vibrator;
import android.provider.Settings;
import android.support.v4.app.NotificationCompat;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.WindowManager;
import android.widget.Button;
import android.widget.FrameLayout;
import android.widget.TextView;

import com.google.firebase.messaging.FirebaseMessagingService;
import com.google.firebase.messaging.RemoteMessage;

import org.json.JSONObject;

import java.lang.reflect.Method;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Locale;
import java.util.Map;

/**
 * Created by Chris.Wu on 2016/11/9.
 */

public class FCMService extends FirebaseMessagingService {

    //    AlertDialog dialog;
//    boolean showDialog;
//    DialogMessage dialogMessage;
//    Factory factory = Factory.getInstance();
    ServiceHelper serviceHelper;
//    Model controlModel;
//    SystemInfo systemInfo;
    static int notificationId = 0;
    static boolean dialogShowing = false;

    @Override
    public void onCreate() {
        super.onCreate();
        createObj();
    }

    @Override
    public void onDestroy() {
        super.onDestroy();
    }

    @Override
    public void onMessageReceived(RemoteMessage remoteMessage) {
//        Log.d("debug", "remoteMessage title11111");
//        Log.d("debug", "remoteMessage title:22222 " + remoteMessage.getData());
//        if (Constants.PUSH_MESSAGE) {
//            Vibrator mVibrator = (Vibrator) getSystemService(Service.VIBRATOR_SERVICE);
//            Log.d("debug", "remoteMessage title: " + remoteMessage.getData());
//            String message = remoteMessage.getData().get(Constants.BODY_PUSH_MESSAGE);
//            String tagName = remoteMessage.getData().get(Constants.TITLE_PUSH_MESSAGE);
//            String UUID = remoteMessage.getData().get(Constants.UUID);
//            tagName= StringProcess.getModifiedDialogTagName(tagName);
//            Log.d("debug", "Notification title: " + tagName);
//            Log.d("debug", "Notification message: " + message);
//            Log.d("debug", "Notification UUID: " + UUID);
//            serviceHelper.sendNotification(tagName, message);
//            serviceHelper.activeDialog(tagName,message);
//            sendNotification(tagName, message);
////            dialogMessage.showDialogMessage(getApplication(), message,tagName);
////            dialogShowing = true;
//            if (dialogMessage.isShowDialog(this) && (!isScreenOn() || dialogShowing)) {
//                dialogMessage.showDialogMessage(getApplication(), message,tagName);
//                dialogShowing = true;
//            }
//            if (!isScreenOn()) {
//                screenOn();
//            }
//        }
    }

//    public static void releaseDialogResource() {
//        dialogShowing = false;
//    }

//    private void screenOn() {
//        PowerManager pm = (PowerManager) getSystemService(getApplication().POWER_SERVICE);
//        PowerManager.WakeLock wl = pm.newWakeLock(PowerManager.ACQUIRE_CAUSES_WAKEUP | PowerManager.SCREEN_DIM_WAKE_LOCK, Constants.SCREEN_ON_STRING);
//        wl.acquire();
//        wl.release();
//    }
//
//    private boolean isScreenOn() {
//        boolean screenState;
//        PowerManager pm = (PowerManager) getSystemService(getApplication().POWER_SERVICE);
//        Method mReflectScreenState;
//        try {
//            mReflectScreenState = PowerManager.class.getMethod(Constants.IS_SCREEN_ON, new Class[]{});
//            screenState = (Boolean) mReflectScreenState.invoke(pm);
//        } catch (Exception nsme) {
//            screenState = false;
//        }
//        return screenState;
//    }
//
//    private void sendNotification(String title, String message) {
////        final int notifyID = 1; // 通知的識別號碼
//        if (notificationId >= 32766) {
//            notificationId = 0;
//        }
//        Bitmap largeIcon = BitmapFactory.decodeResource(
//                getResources(), R.drawable.notification_large_icon);
//        Intent intent = new Intent(this, MainActivity.class);
//        intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK);
//        intent.putExtra(Constants.ACTION_EXTRA_KEY, Constants.ALARM_SUMMARY_EXTRA_VALUE);
//        PendingIntent contentIntent = PendingIntent.getActivity(this, 0, intent, PendingIntent.FLAG_UPDATE_CURRENT);
//        final NotificationManager notificationManager = (NotificationManager) getSystemService(Context.NOTIFICATION_SERVICE); // 取得系統的通知服務
//        final Notification notification = new Notification.Builder(getApplicationContext())
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

    private void createObj() {
        //factory = new Factory();
//        serviceHelper=factory.createServiceHelper(getApplication());
//        controlModel = factory.createModel(getApplication());
//        dialogMessage = factory.createDialogMessage(this,controlModel.getLang());
//        systemInfo = controlModel.getSystemInfo();
    }


}
