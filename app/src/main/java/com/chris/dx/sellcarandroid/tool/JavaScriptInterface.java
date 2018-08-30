package com.chris.dx.sellcarandroid.tool;

import android.app.Activity;
import android.os.Handler;
import android.util.Log;
import android.view.KeyEvent;
import android.view.MotionEvent;
import android.view.View;
import android.webkit.JavascriptInterface;
import android.webkit.WebView;
import android.widget.ScrollView;
import android.widget.Toast;


import com.chris.dx.sellcarandroid.controller.Controller;
import com.chris.dx.sellcarandroid.define.Constants;

import org.json.JSONException;
import org.json.JSONObject;


/**
 * Created by Chris.Wu on 2016/11/1.
 */
public class JavaScriptInterface {
    private final String TAG = "JavaScriptInterface";

    private Activity controlActivity;
    private Controller controller;
    private Factory factory = Factory.getInstance();
    private WebView controlWebView;
    private JavaScriptInterface self = this;
    private Model controlModel;
    private JSONObject localStorageMem;
    private ScrollView mainWebViewScroll;


    public JavaScriptInterface(Activity activity, WebView webView, Model model, ScrollView view) {
        controlActivity = activity;
        controlWebView = webView;
        controlModel = model;
        createObj();
        mainWebViewScroll = view;
        controller = factory.createHomeController(controlActivity, controlWebView, self, Constants.HOME_PAGE_NAME);
        controller.executeCtrl();
//        setListener();
//        connectivityManager = (ConnectivityManager) controlActivity.getSystemService(Context.CONNECTIVITY_SERVICE);
//        networkInfo = connectivityManager.getActiveNetworkInfo();
    }
    public void controllerReceiveImage(String imageByte){
//    public void controllerReceiveImage(byte[] imageByte){
        controller.receiveImage(imageByte);
    }

    private void createObj() {
        localStorageMem = new JSONObject();
    }

    public WebView refreshWebview() {
        if (mainWebViewScroll != null) {
            mainWebViewScroll.removeView(controlWebView);
            controlWebView = new WebView(controlActivity);
            mainWebViewScroll.addView(controlWebView);
            setListener();
        }
        return controlWebView;
    }

    private void backPress() {
        switch (getControllerName()) {
            case Constants.PRICE_PAGE_NAME:
                changePage(StringProcess.getChangePageURL(Constants.POSTER_PAGE_NAME));
                break;
            case Constants.POSTER_PAGE_NAME:
                changePage(StringProcess.getChangePageURL(Constants.HOME_PAGE_NAME));
                break;
            case Constants.REFERENCE_PAGE_NAME:
                changePage(StringProcess.getChangePageURL(Constants.HOME_PAGE_NAME));
                break;
            case Constants.TEST_DRIVE_PAGE_NAME:
                changePage(StringProcess.getChangePageURL(Constants.PRICE_PAGE_NAME));
                break;
                default:
                changePage(StringProcess.getChangePageURL(Constants.HOME_PAGE_NAME));
        }
    }

    private void setListener() {
        controlWebView.setOnKeyListener(new View.OnKeyListener() {
            @Override
            public boolean onKey(View v, int keyCode, KeyEvent event) {
                if (event.getAction() == KeyEvent.ACTION_DOWN) {
                    if (keyCode == KeyEvent.KEYCODE_BACK) {
                        backPress();
                        return true;
                    }
                }
                return false;
            }
        });
        controlWebView.setOnTouchListener(new View.OnTouchListener() {
            @Override
            public boolean onTouch(View v, MotionEvent event) {
                if (event.getAction() == MotionEvent.ACTION_UP) {
                    Handler handler = new Handler();
                    handler.postDelayed(new Runnable() {
                        @Override
                        public void run() {
                            mainWebViewScroll.fullScroll(ScrollView.FOCUS_DOWN);
                        }
                    }, Constants.SCROLL_DELAY_TIME);
                }
                return false;
            }
        });
    }


    public String getControllerName() {
        String name = "";
        if (controller != null)
            name = controller.getControlPageName();
        return name;
    }

    public Model getControlModel() {
        return controlModel;
    }

    public void setController(final String type) {
        Log.d(TAG, "setController type " + type);
        if (controller != null)
            controller.releaseResource();
        controller = null;
        switch (type) {
            case Constants.HOME_PAGE_NAME:
                Log.d(TAG, "new HomeController");
                controller = factory.createHomeController(controlActivity, controlWebView, self, Constants.HOME_PAGE_NAME);
                Log.d(TAG, "new HomeController ok");
                break;
            case Constants.POSTER_PAGE_NAME:
                Log.d(TAG, "new IntroductionController");
                controller = factory.createPosterController(controlActivity, controlWebView, self, Constants.INTRODUCTION_PAGE_NAME);
                Log.d(TAG, "new IntroductionController ok");
                break;
            case Constants.PRICE_PAGE_NAME:
                Log.d(TAG, "new mergeImageController");
                controller = factory.createPriceController(controlActivity, controlWebView, self, Constants.PRICE_PAGE_NAME);
                Log.d(TAG, "new mergeImageController ok");
                break;
            case Constants.TEST_DRIVE_PAGE_NAME:
                Log.d(TAG, "new aboutController");
                controller = factory.createTestDriveController(controlActivity, controlWebView, self, Constants.ABOUT_PAGE_NAME);
                Log.d(TAG, "new aboutController ok");
                break;
            case Constants.REFERENCE_PAGE_NAME:
                Log.d(TAG, "new uploadController");
                controller = factory.createReferenceController(controlActivity, controlWebView, self, Constants.UPLOAD_PAGE_NAME);
                Log.d(TAG, "new uploadController ok");
                break;
            default:
                Log.d(TAG, "The page not ready yet");
                controlModel.toastString("此頁面還未實作");
        }
    }


    public void executeCtrl() {
        controller.executeCtrl();
    }

    @JavascriptInterface
    public void orderTestDrive(final String JSONString) {
        Log.d(TAG, "   orderTestDrive    ");
//        controlModel.toastString("js  orderTestDrive");
        Object[] arg = new Object[10];
        JSONObject jsonObject = controlModel.getJsonObject(JSONString);
        if (jsonObject != null) {
            arg[0] = controlModel.getJSONProtString(Constants.NAME, jsonObject);
            arg[1] = controlModel.getJSONProtString(Constants.COMPANY, jsonObject);
            arg[2] = controlModel.getJSONProtString(Constants.PHONE, jsonObject);
            arg[3] = controlModel.getJSONProtString(Constants.ADDRESS, jsonObject);
            arg[4] = controlModel.getJSONProtString(Constants.PAYMENT_TYPE, jsonObject);
            arg[5] = controlModel.getJSONProtString(Constants.CAR_NAME, jsonObject);
            arg[6] = controlModel.getJSONProtString(Constants.CAR_COMPANY, jsonObject);
            arg[7] = controlModel.getJSONProtString(Constants.CAR_VERSION, jsonObject);
            arg[8] = controlModel.getJSONProtString(Constants.CAR_COLOR, jsonObject);
            arg[9] = controlModel.getJSONProtString(Constants.HOPE_TIME, jsonObject);


            Log.d(TAG, "   orderTestDrive  0  " + arg[0].toString());

            controller.executeCmd(Constants.ORDER_TEST_DRIVE_COMMAND, arg);
        }
//        controller.executeCmd(Constants.GET_MERGE_IMAGE_ALL_SRC_COMMAND, null);
    }

    @JavascriptInterface
    public void getCarImagePathByFolder(final String JSONString) {
        Log.d(TAG, "   getCarImagePathByFolder    ");
        Object[] arg = new Object[1];
        JSONObject jsonObject = controlModel.getJsonObject(JSONString);
        if (jsonObject != null) {
            arg[0] = controlModel.getJSONProtString(Constants.FOLDER_NAME, jsonObject);
            Log.d(TAG, "   FOLDER_NAME  0  " + arg[0].toString());
            controller.executeCmd(Constants.GET_CAR_IMAGE_PATH_BY_FOLDER_COMMAND, arg);
        }
//        controller.executeCmd(Constants.GET_MERGE_IMAGE_ALL_SRC_COMMAND, null);
    }

    @JavascriptInterface
    public void mergeImageExe(final String JSONString) {
        Log.d(TAG, "  mergeImageExe    JSONString   " + JSONString);
        Object[] arg = new Object[3];
        JSONObject jsonObject = controlModel.getJsonObject(JSONString);
        if (jsonObject != null) {
            arg[0] = controlModel.getJSONProtString(Constants.MERGE_IMAGE_ARRAY, jsonObject);
            arg[1] = controlModel.getJSONProtString(Constants.TARGET_IMAGE, jsonObject);
            Log.d(TAG, "   mergeImageExe  0  " + arg[0].toString());
            Log.d(TAG, "   mergeImageExe  1 " + arg[1].toString());
            controller.executeCmd(Constants.MERGE_IMAGE_EXE_COMMAND, arg);
        }
    }

    @JavascriptInterface
    public void selectImageFile() {
//        controlModel.toastString("selectImageFile1111   ");
       controller.executeCmd(Constants.SELECT_IMAGE_FILE_COMMAND, null);
    }

    @JavascriptInterface
    public void changePage(final String JSONString) {
        Log.d(TAG, "changePage   " + JSONString);
        JSONObject jsonObject = controlModel.getJsonObject(JSONString);
        if (jsonObject != null) {
            String carCompany = controller.getCarCompany();
            Object[] arg = new Object[2];
            arg[0] = controlModel.getJSONProtString(Constants.URL, jsonObject);
            arg[1] = controlModel.getJSONProtString(Constants.COMPANY_TYPE, jsonObject);
            setController(arg[0].toString());
            if(arg[1].toString().equals(Constants.EMPTY_STRING)){
                controller.setCarCompany(carCompany);
            }else{
                controller.setCarCompany(arg[1].toString());
            }
            controller.executeCtrl();
        }
    }
}
