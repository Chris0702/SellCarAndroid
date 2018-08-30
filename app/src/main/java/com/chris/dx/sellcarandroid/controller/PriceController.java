package com.chris.dx.sellcarandroid.controller;

import android.app.Activity;
import android.util.Log;
import android.webkit.WebView;

import com.chris.dx.sellcarandroid.define.Constants;
import com.chris.dx.sellcarandroid.tool.JavaScriptInterface;
import com.chris.dx.sellcarandroid.tool.StringProcess;

public class PriceController extends Controller {
    private String carCompany;

    public PriceController(Activity activity, WebView webView, JavaScriptInterface javaScriptInterface, String pageName) {
        super(activity, webView, javaScriptInterface, pageName);
        controlModel.toastString("PriceController");
        carCompany = javaScriptInterface.getCarCompany();
    }

    public void executeCtrl() {
        controlActivity.runOnUiThread(new Runnable() {
            //  @Override
            public void run() {
                updateWebView();
            }
        });
    }

    public void executeCmd(String cmd, Object[] arg) {
        Log.d("debug", "price  exe");
        switch (cmd) {
            case Constants.GET_CARS_INFO_BY_COMPANY_COMMAND:
                getCarsInfoByCompany();
                break;
            default:
        }
    }

    private void updateWebView() {
        mainWebView.getSettings().setJavaScriptEnabled(true);
        mainWebView.getSettings().setDomStorageEnabled(true);
        mainWebView.loadUrl(Constants.PRICE_WEB_URL);
        mainWebView.addJavascriptInterface(controlJavaScriptInterface, Constants.ANDROID_PARAMETER_FOR_JAVASCRIPT);
    }

    private void getCarsInfoByCompany(){
        controlHttpClient.getCarsInfoByCompany(carCompany,this);
    }

    public void getCarsInfoByCompanyResponse(final String receiveMessage){
//        controlModel.toastString("PriceController  getCarsInfoByCompanyResponsey    "+receiveMessage);
//        controlActivity.runOnUiThread(new Runnable() {
//            //  @Override
//            public void run() {
//                String setImageAllUrl = StringProcess.getJavascriptFunctionStringByArrayStringAndString(Constants.IMAGE_ARRAY, receiveMessage, Constants.SERVER_URL_STRING, Constants.SERVER_URL, Constants.SET_IMAGE_ALL_JAVASCRIPT);
//                Log.d("debug", "getCarsInfoByCompanyResponse ok       " + setImageAllUrl);
//                mainWebView.loadUrl(setImageAllUrl);
//                Log.d("debug", "getCarsInfoByCompanyResponse ok");
//            }
//        });
        if (controlModel.getHttpResult(receiveMessage)) {
//                controlModel.toastString("server is exist");

            controlActivity.runOnUiThread(new Runnable() {
            //  @Override
            public void run() {
                String resString =  controlModel.getJSONProtString(Constants.RES_STRING_REST_API,receiveMessage);
                Log.d("debug", "getHttpResult   resString "+resString);
                String setImageAllUrl = StringProcess.getJavascriptFunctionStringByArrayStringAndString(Constants.CARS_INFO, resString, Constants.SERVER_URL_STRING, Constants.SERVER_URL, Constants.SET_CARS_INFO_JAVASCRIPT);
                Log.d("debug", "getCarsInfoByCompanyResponse ok       " + setImageAllUrl);
                mainWebView.loadUrl(setImageAllUrl);
                Log.d("debug", "getCarsInfoByCompanyResponse ok");
            }
        });
        } else {
//                controlModel.toastString("server is not exist");
        }
    }

//    public void getLocalPathAllResponse(final String receiveMessage){
//        controlActivity.runOnUiThread(new Runnable() {
//            //  @Override
//            public void run() {
//                String setImageAllUrl = StringProcess.getJavascriptFunctionStringByArrayStringAndString(Constants.IMAGE_ARRAY, receiveMessage, Constants.SERVER_URL_STRING, Constants.SERVER_URL, Constants.SET_IMAGE_ALL_JAVASCRIPT);
//                Log.d("debug", "getLocalPathAllResponse ok       " + setImageAllUrl);
//                mainWebView.loadUrl(setImageAllUrl);
//                Log.d("debug", "getLocalPathAllResponse ok");
//            }
//        });
//    }
//
//    private void getCarImagePathByFolder(final String folderName){
//        controlModel.toastString("PriceController  carCompany    "+carCompany);
//        controlModel.toastString("PriceController folderName    "+folderName);
//        String reqFolderName = StringProcess.getCompanyLocalImageFolderPath(carCompany,folderName);
//        controlHttpClient.getLocalPathAll(reqFolderName,this);
//    }
}
