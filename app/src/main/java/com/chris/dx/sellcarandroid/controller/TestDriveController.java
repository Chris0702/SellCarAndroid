package com.chris.dx.sellcarandroid.controller;

import android.app.Activity;
import android.util.Log;
import android.webkit.WebView;

import com.chris.dx.sellcarandroid.define.Constants;
import com.chris.dx.sellcarandroid.tool.JavaScriptInterface;
import com.chris.dx.sellcarandroid.tool.StringProcess;

public class TestDriveController extends Controller {
    private String carCompany;
    private String favoriteCar;
    public TestDriveController(Activity activity, WebView webView, JavaScriptInterface javaScriptInterface, String pageName) {
        super(activity, webView, javaScriptInterface, pageName);
        carCompany = javaScriptInterface.getCarCompany();
        favoriteCar = javaScriptInterface.getFavoriteCar();
//        controlModel.toastString("TestDriveController carCompany   "+carCompany);
//        controlModel.toastString("TestDriveController favoriteCar    "+favoriteCar);
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
        Log.d("debug", "home  exe");
        switch (cmd) {
            case Constants.ORDER_TEST_DRIVE_COMMAND:
//                controlModel.logServerDB();
//                getFunctionList();
                orderTestDrive(arg[0].toString(),arg[1].toString(),arg[2].toString(),arg[3].toString(),arg[4].toString(),arg[5].toString(),arg[6].toString(),arg[7].toString(),arg[8].toString(),arg[9].toString());
                break;
            case Constants.GET_CARS_INFO_BY_ID_COMMAND:
                getCarsInfoById();
//                insertLanguage();
                break;
            default:
        }
    }

    private void updateWebView() {
        mainWebView.getSettings().setJavaScriptEnabled(true);
        mainWebView.getSettings().setDomStorageEnabled(true);
        mainWebView.loadUrl(Constants.TEST_DRIVE_WEB_URL);
        mainWebView.addJavascriptInterface(controlJavaScriptInterface, Constants.ANDROID_PARAMETER_FOR_JAVASCRIPT);
    }
    public void getCarsInfoByIdResponse(final String receiveMessage){
//        controlModel.toastString("getCarsInfoByIdResponse ing");
        if (controlModel.getHttpResult(receiveMessage)) {
//                controlModel.toastString("server is exist");
            controlActivity.runOnUiThread(new Runnable() {
                //  @Override
                public void run() {
                    String resString =  controlModel.getJSONProtString(Constants.RES_STRING_REST_API,receiveMessage);
                    Log.d("debug", "getHttpResult   resString "+resString);
                    String setCarsInfoUrl = StringProcess.getJavascriptFunctionStringByArrayStringAndString(Constants.CARS_INFO, resString, Constants.SERVER_URL_STRING, Constants.SERVER_URL, Constants.SET_CARS_INFO_JAVASCRIPT);
                    Log.d("debug", "getCarsInfoByCompanyResponse ok       " + setCarsInfoUrl);
                    mainWebView.loadUrl(setCarsInfoUrl);
                    Log.d("debug", "getCarsInfoByCompanyResponse ok");
                }
            });
        } else {
//                controlModel.toastString("server is not exist");
        }
    }

    private void getCarsInfoById(){
//        controlModel.toastString("getCarsInfoById ing     favoriteCar "+favoriteCar);
        controlHttpClient.getCarsInfoById(favoriteCar,this);
    }

    private void orderTestDrive(final String name,final String company,final String phone,final String address,final String paymentType,final String carName,final String carCompany,final String carVersion,final String carColor,final String hopeTime){
//        controlModel.toastString("orderTestDrive ing");
        controlHttpClient.orderTestDrive( name, company, phone, address, paymentType,carName, carCompany, carVersion,carColor, hopeTime,this);
    }

    public void orderTestDriveResponse(boolean result, final String receiveMessage) {
        if (result) {
            if (controlModel.getHttpResult(receiveMessage)) {
                controlModel.toastString(Constants.ORDER_TEST_DRIVE_SUCCESS);
                controlJavaScriptInterface.changePageByPageName(Constants.PRICE_PAGE_NAME);
            } else {
                controlModel.toastString(Constants.ORDER_TEST_DRIVE_FAIL);
            }
        } else {
            controlModel.toastString(Constants.ORDER_TEST_DRIVE_FAIL);
        }
    }
}
