package com.chris.dx.sellcarandroid.controller;

import android.app.Activity;
import android.util.Log;
import android.webkit.WebView;


import com.chris.dx.sellcarandroid.define.Constants;
import com.chris.dx.sellcarandroid.tool.Factory;
import com.chris.dx.sellcarandroid.tool.HttpClient;
import com.chris.dx.sellcarandroid.tool.JavaScriptInterface;
import com.chris.dx.sellcarandroid.tool.Model;
import com.chris.dx.sellcarandroid.tool.StringProcess;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.Iterator;

/**
 * Created by Chris.Wu on 2016/11/2.
 */
public class Controller {
    private final String TAG = "Controller";

    protected WebView mainWebView;
    protected Activity controlActivity;
    protected Factory factory = Factory.getInstance();
    protected JavaScriptInterface controlJavaScriptInterface;
    protected String controlPageName;
    protected Model controlModel;
    protected HttpClient controlHttpClient;

    public Controller() {
        controlPageName = Constants.CONTROL_PAGE_NAME;
    }

    public Controller(Activity activity, WebView webView, JavaScriptInterface javaScriptInterface, String pageName) {
        controlPageName = pageName;
        controlActivity = activity;
        mainWebView = webView;
        controlJavaScriptInterface = javaScriptInterface;
        controlModel = javaScriptInterface.getControlModel();
        controlHttpClient = factory.createHttpClient();
    }

    public void getLocalPathAllResponse(String result){
    }
    public void receiveImage(String imageByte){
//    public void receiveImage(byte[] imageByte){

    }

    public Model getControlModel() {
        return controlModel;
    }

    //    public void checkServerIsExistResponse(final String receiveMessage){
//        if (controlModel.getHttpResult(receiveMessage)) {
//            controlModel.toastString("server is exist");
//        }else{
//            controlModel.toastString("server is not exist");
//        }
//    }

    //
//    public langController getControllerLang(){
//        return lang;
//    }
//
//    public void saveControllerInfo() {
//
//    }
//
//    public void getNodeListResponse(final String receiveMessage) {
//
//    }
//
    public String getControlPageName() {
        return controlPageName;
    }

    //
//    public Model getControlModel() {
//        return controlModel;
//    }
//
//    public void alarmAckResponse(final String receiveMessage) {
//
//    }
//
    public void releaseResource() {
        Log.d(TAG, "releaseResource");
    }

    public void executeCmd(String cmd, Object[] arg) {
        Log.d(TAG, "executeCmd " + cmd + " " + arg);
    }

    public void executeCtrl() {
        Log.d(TAG, "executeCtrl");
    }
//
//    public void sendMobileInfoToServerResponse(final String receiveMessage) {
//        Log.d(TAG, "sendMobileInfoToServerResponse " + receiveMessage);
//    }
//
//    //
//
//    protected void insertLanguage() {
//        controlActivity.runOnUiThread(new Runnable() {
//            //  @Override
//            public void run() {
//                String lang = controlModel.getLang();
//                String insertLangUrl = StringProcess.getJavascriptFunctionStringByString(Constants.LANG, lang, Constants.INSERT_LANGUAGE_JAVASCRIPT);
//                Log.d(TAG, "insertLangUrl         " + insertLangUrl);
//                mainWebView.loadUrl(insertLangUrl);
//            }
//        });
//    }
//
//    protected void insertLocalStorageMemAll() {
//        controlActivity.runOnUiThread(new Runnable() {
//            //  @Override
//            public void run() {
//                JSONObject localStorageMem = controlJavaScriptInterface.getLocalStorageMem();
//                String insertLocalStorageMemAllUrl = StringProcess.getJavascriptFunctionStringByJson(
//                        localStorageMem, Constants.INSERT_LOCAL_STORAGE_MEM_All_JAVASCRIPT);
//                Log.d(TAG, "insertLocalStorageMemAllUrl " + insertLocalStorageMemAllUrl);
//
//                mainWebView.loadUrl(insertLocalStorageMemAllUrl);
//            }
//        });
//    }
//
//    void setLocalStorageMem(final JSONArray jsonArray) {
//        JSONObject localStorageMem = controlJavaScriptInterface.getLocalStorageMem();
//        try {
//            for (int i = 0; i<jsonArray.length(); ++i) {
//                JSONObject jsonObject = jsonArray.getJSONObject(i);
//                Iterator<String> iterator = jsonObject.keys();
//                while(iterator.hasNext()) {
//                    String key = iterator.next();
//                    Object value = jsonObject.get(key);
//                    localStorageMem.put(key, value.toString());
//                }
//            }
//        } catch (JSONException e) {
//                Log.e(TAG, "setLocalStorageMem" + e.getLocalizedMessage());
//        }
//
//        //Log.d(TAG, "localStorageMem " + localStorageMem.toString());
//    }
}
