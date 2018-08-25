package com.chris.dx.sellcarandroid.service;

import android.util.Log;

import com.chris.dx.sellcarandroid.define.Constants;
import com.google.firebase.iid.FirebaseInstanceId;
import com.google.firebase.iid.FirebaseInstanceIdService;

import java.util.List;



/**
 * Created by Chris.Wu on 2016/11/9.
 */

public class FirebaseInstanceIDService extends FirebaseInstanceIdService {

//    Factory factory = Factory.getInstance();
//    Model controlModel;
//    SystemInfo systemInfo;;
    @Override
    public void onCreate() {
        super.onCreate();
        createObj();
    }

    @Override
    public void onTokenRefresh() {
        Log.d("debug", "Firebase    onTokenRefresh");
        String firebaseToken = FirebaseInstanceId.getInstance().getToken();
        Log.d("debug", "Firebase   Token:" + firebaseToken);
//        saveFirebaseToken(firebaseToken);
//        updateServerFirebaseTokenRequest(firebaseToken);
//        registerToken(token);
    }

    @Override
    public void onDestroy() {
        super.onDestroy();
//        controlModel.closeDB();
    }

    private void createObj() {
        //factory = new Factory();
//        controlModel = factory.createModel(getApplication());
//        systemInfo=controlModel.getSystemInfo();
    }

    private void saveFirebaseToken(String firebaseToken) {
//        controlModel.saveFirebaseToken(firebaseToken);
    }

    private void updateServerFirebaseTokenRequest(String firebaseToken) {
//        controlModel.serverFirebaseEnableFalse();
//        String lastServerToken =systemInfo.getLastServerToken();
//        String lastIP = systemInfo.getLastIP();
//        String lastProjectName = systemInfo.getLastProjectName();
//        String lastUsername = systemInfo.getLastUsername();
//        String lastPassword = systemInfo.getLastPassword();
//        if (!lastServerToken.equals(Constants.EMPTY_STRING)) {
//            String UUID = controlModel.getUUIDByIP(lastIP);
//            HttpClient httpClient = factory.createHttpClient(lastServerToken);
//            httpClient.refreshFirebaseTokenToServer(systemInfo,firebaseToken, this);
//        }
    }

    public void updateServerFirebaseTokenResponse(final String receiveMessage) {
//        if (controlModel.getHttpResult(receiveMessage)) {
//            String lastIP = systemInfo.getLastIP();
//            controlModel.saveFirebaseTokenEnableByIP(lastIP,Constants.TRUE_STRING);
//        }
    }
}
