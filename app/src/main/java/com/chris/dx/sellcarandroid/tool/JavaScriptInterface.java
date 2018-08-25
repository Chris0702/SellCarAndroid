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
    //    private Project controlProject;
//    private User controlUser;
//    private Server controlServer;
    private JSONObject localStorageMem;
    private ScrollView mainWebViewScroll;

    //    ConnectivityManager connectivityManager;
//    NetworkInfo networkInfo;
//
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
            case Constants.MERGE_IMAGE_PAGE_NAME:
                changePage(StringProcess.getChangePageURL(Constants.HOME_PAGE_NAME));
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
        controlModel.toastString("setController type " + type);
        if (controller != null)
            controller.releaseResource();
        controller = null;
        switch (type) {
            case Constants.HOME_PAGE_NAME:
                Log.d(TAG, "new HomeController");
                controller = factory.createHomeController(controlActivity, controlWebView, self, Constants.HOME_PAGE_NAME);
                Log.d(TAG, "new HomeController ok");
                break;
            case Constants.INTRODUCTION_PAGE_NAME:
                Log.d(TAG, "new IntroductionController");
//                controller = factory.createIntroductionController(controlActivity, controlWebView, self, Constants.INTRODUCTION_PAGE_NAME);
                Log.d(TAG, "new IntroductionController ok");
                break;
            case Constants.MERGE_IMAGE_PAGE_NAME:
                Log.d(TAG, "new mergeImageController");
//                controller = factory.createMergeImageController(controlActivity, controlWebView, self, Constants.MERGE_IMAGE_PAGE_NAME);
                Log.d(TAG, "new mergeImageController ok");
                break;
            case Constants.ABOUT_PAGE_NAME:
                Log.d(TAG, "new aboutController");
//                controller = factory.createAboutController(controlActivity, controlWebView, self, Constants.ABOUT_PAGE_NAME);
                Log.d(TAG, "new aboutController ok");
                break;
            case Constants.UPLOAD_PAGE_NAME:
                Log.d(TAG, "new uploadController");
//                controller = factory.createUploadController(controlActivity, controlWebView, self, Constants.UPLOAD_PAGE_NAME);
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
    public void getMergeImageAllSrc() {
        Log.d(TAG, "   getMergeImageAllSrc    ");
        controller.executeCmd(Constants.GET_MERGE_IMAGE_ALL_SRC_COMMAND, null);
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
//
//    public JSONObject getLocalStorageMem() {
//        return localStorageMem;
//    }
//
//    public void setLocalStorageMem(JSONObject localStorageMem) {
//        this.localStorageMem = localStorageMem;
//    }
//
//    //
//
//    //login controller
//    @JavascriptInterface
//    public void getProjectListByIp(final String JSONString) {
//        Log.d(TAG, "getProjectListByIp    ");
//        Log.d(TAG, JSONString);
//        JSONObject jsonObject = controlModel.getJsonObject(JSONString);
//        if (jsonObject != null) {
//            Object[] arg = new Object[1];
//            arg[0] = controlModel.getJSONProtString(Constants.IP, jsonObject);
//            Log.d(TAG, " arg[0]    " + arg[0].toString());
//            if (!arg[0].toString().equals(Constants.EMPTY_STRING)) {
//                controller.executeCmd(Constants.GET_PROJECT_LIST_BY_IP_COMMAND, arg);
//            }
//        }
//    }
//
//
//    @JavascriptInterface
//    public void getProjectList() {
//        Log.d(TAG, "  insertProjectListUrl  ");
//        controller.executeCmd(Constants.GET_PROJECT_LIST_COMMAND, null);
//    }
//
//    @JavascriptInterface
//    public void getAccountHistoryList() {
//        Log.d(TAG, "getAccountHistoryList  ");
//        controller.executeCmd(Constants.GET_ACCOUNT_HISTORY_LIST_COMMAND, null);
//    }
//
//    @JavascriptInterface
//    public void inputAccount(final String JSONString) {
//        Log.d(TAG, "   inputAccount(final String JSONString    " + JSONString);
//        Object[] arg = new Object[4];
//        JSONObject jsonObject = controlModel.getJsonObject(JSONString);
//        if (jsonObject != null) {
//            //prevent "remember me" use the default SERVER_URL
//            Constants.SERVER_URL = controlModel.getProperIp(controlModel.getJSONProtString(Constants.IP, jsonObject));
//            //or the variables passed-in can be null
//            StringProcess.updateUrlPath(controlModel.getJSONProtString(Constants.PROJECT_NAME, jsonObject), controlModel.getJSONProtString(Constants.USERNAME, jsonObject), controlModel.getJSONProtString(Constants.PASSWORD, jsonObject));
//
//            arg[0] = controlModel.getJSONProtString(Constants.PROJECT_NAME, jsonObject);
//            arg[1] = controlModel.getJSONProtString(Constants.USERNAME, jsonObject);
//            arg[2] = controlModel.getJSONProtString(Constants.PASSWORD, jsonObject);
//            arg[3] = controlModel.getJSONProtString(Constants.REMEMBER, jsonObject);
//            if (!arg[0].toString().equals(Constants.EMPTY_STRING) && !arg[1].toString().equals(Constants.EMPTY_STRING) && !arg[3].toString().equals(Constants.EMPTY_STRING)) {
//                controller.executeCmd(Constants.INPUT_ACCOUNT_COMMAND, arg);
//            }
//        }
//    }
//
//    //home controller
//
//    @JavascriptInterface
//    public void getFunctionList() {
//        Log.d(TAG, "   getFunctionList    ");
//        controller.executeCmd(Constants.GET_FUNCTION_LIST_COMMAND, null);
//    }
//
//    //alarmsummary controller
//
//    @JavascriptInterface
//    public void getAlarmSummaryByPage(final String JSONString) {
//        Log.d(TAG, "   getAlarmSummaryByPage  JSONString   " + JSONString);
//
//        Object[] arg = new Object[4];
//        JSONObject jsonObject = controlModel.getJsonObject(JSONString);
//        if (jsonObject != null) {
//            arg[0] = controlModel.getJSONProtString(Constants.START, jsonObject);
//            arg[1] = controlModel.getJSONProtString(Constants.COUNT, jsonObject);
//            arg[2] = controlModel.getJSONProtString(Constants.FILTERS, jsonObject);
//            arg[3] = controlModel.getJSONProtString(Constants.SORT, jsonObject);
//            Log.d(TAG, "   getAlarmSummaryByPage  0  " + arg[0].toString());
//            Log.d(TAG, "   getAlarmSummaryByPage  1 " + arg[1].toString());
//            Log.d(TAG, "   getAlarmSummaryByPage  2  " + arg[2].toString());
//            Log.d(TAG, "   getAlarmSummaryByPage  3 " + arg[3].toString());
//            if (!arg[0].toString().equals(Constants.EMPTY_STRING) && !arg[1].toString().equals(Constants.EMPTY_STRING)) {
//                controller.executeCmd(Constants.GET_ALARM_SUMMARY_BY_PAGE_COMMAND, arg);
//            }
//        }
//    }
//
//    //alarm controller
//
//    @JavascriptInterface
//    public void alarmAck(final String JSONString) {
//        Log.d(TAG, "   alarmAck  JSONString   " + JSONString);
//
//        Object[] arg = new Object[1];
//        JSONObject jsonObject = controlModel.getJsonObject(JSONString);
//        if (jsonObject != null) {
//            arg[0] = controlModel.getJSONProtString(Constants.TAGS_LIST, jsonObject);
//            Log.d(TAG, "   alarmAck  0  " + arg[0].toString());
//            controller.executeCmd(Constants.ALARM_ACK_COMMAND, arg);
////            if (!arg[0].toString().equals(Constants.ENPTY_STRING) && !arg[1].toString().equals(Constants.ENPTY_STRING)) {
////                controller.executeCmd(Constants.GET_ALARM_SUMMARY_BY_PAGE_COMMAND, arg);
////            }
//        }
//    }
//
//    @JavascriptInterface
//    public void alarmAckAll() {
//        Log.d(TAG, "   alarmAckAll  JSONString   ");
//        controller.executeCmd(Constants.ALARM_ACK_ALL_LIST_COMMAND, null);
//    }
//
//
//    @JavascriptInterface
//    public void getAlarmLogAndCount(final String JSONString) {
//        Object[] arg = new Object[3];
//        JSONObject jsonObject = controlModel.getJsonObject(JSONString);
//        if (jsonObject != null) {
//            arg[0] = controlModel.getJSONProtString(Constants.START, jsonObject);
//            arg[1] = controlModel.getJSONProtString(Constants.COUNT, jsonObject);
//            arg[2] = controlModel.getJSONProtString(Constants.NODE_NAME, jsonObject);
//            Log.d(TAG, "   getAlarmLogAndCount  0  " + arg[0].toString());
//            Log.d(TAG, "   getAlarmLogAndCount  1 " + arg[1].toString());
//            Log.d(TAG, "   getAlarmLogAndCount  2  " + arg[2].toString());
//            controller.executeCmd(Constants.GET_ALARM_LOG_AND_COUNT_COMMAND, arg);
//        }
//    }
//
//    //action controller
//
//    @JavascriptInterface
//    public void getActionLogAndCount(final String JSONString) {
//        Object[] arg = new Object[3];
//        JSONObject jsonObject = controlModel.getJsonObject(JSONString);
//        if (jsonObject != null) {
//            arg[0] = controlModel.getJSONProtString(Constants.START, jsonObject);
//            arg[1] = controlModel.getJSONProtString(Constants.COUNT, jsonObject);
//            arg[2] = controlModel.getJSONProtString(Constants.NODE_NAME, jsonObject);
//            Log.d(TAG, "   getAlarmLogAndCount  0  " + arg[0].toString());
//            Log.d(TAG, "   getAlarmLogAndCount  1 " + arg[1].toString());
//            Log.d(TAG, "   getAlarmLogAndCount  2  " + arg[2].toString());
//            controller.executeCmd(Constants.GET_ACTION_LOG_AND_COUNT_COMMAND, arg);
//        }
//    }
//
//    //tagsInfoList
//    @JavascriptInterface
//    public void getTagsListByPage(final String JSONString) {
//        Log.d(TAG, "  getTagsListByPage    JSONString   " + JSONString);
//        Object[] arg = new Object[3];
//        JSONObject jsonObject = controlModel.getJsonObject(JSONString);
//        if (jsonObject != null) {
//            arg[0] = controlModel.getJSONProtString(Constants.START, jsonObject);
//            arg[1] = controlModel.getJSONProtString(Constants.COUNT, jsonObject);
//            arg[2] = controlModel.getJSONProtString(Constants.FILTERS, jsonObject);
//            Log.d(TAG, "   getTagsListByPage  0  " + arg[0].toString());
//            Log.d(TAG, "   getTagsListByPage  1 " + arg[1].toString());
//            Log.d(TAG, "   getTagsListByPage  2  " + arg[2].toString());
//            controller.executeCmd(Constants.GET_TAGS_LIST_BY_PAGE_COMMAND, arg);
//        }
//    }
//
//
//    //config controller
//
//    @JavascriptInterface
//    public void saveFunctionList(final String JSONString) {
//        Object[] arg = new Object[8];
//        JSONObject jsonObject = controlModel.getJsonObject(JSONString);
//        Log.d(TAG, "  JSONString  " + JSONString);
//        if (jsonObject != null) {
//            Log.d(TAG, "  jsonObject  " + jsonObject);
//            arg[0] = controlModel.getJSONProtString(Constants.ACTION_LOG_HOME, jsonObject);
//            arg[1] = controlModel.getJSONProtString(Constants.ALARM_LOG_HOME, jsonObject);
//            arg[2] = controlModel.getJSONProtString(Constants.ALARM_SUMMARY_LOG_HOME, jsonObject);
//            arg[3] = controlModel.getJSONProtString(Constants.TREND_HOME, jsonObject);
//            arg[4] = controlModel.getJSONProtString(Constants.DASHBOARD_HOME, jsonObject);
//            arg[5] = controlModel.getJSONProtString(Constants.TAGS_INFO_HOME, jsonObject);
//            arg[6] = controlModel.getJSONProtString(Constants.G_MAP_HOME, jsonObject);
//            arg[7] = controlModel.getJSONProtString(Constants.NODE_HOME, jsonObject);
//            controller.executeCmd(Constants.SAVE_FUNCTION_LIST_COMMAND, arg);
//        }
//    }
//
//    @JavascriptInterface
//    public void logout() {
//        Log.d(TAG, "    javascript   logout     ");
//        controller.executeCmd(Constants.LOGOUT_COMMAND, null);
//    }
//
//    @JavascriptInterface
//    public void setLanguage(final String JSONString) {
//        Log.d("lang", "setLanguage~~~~~~    " + JSONString);
//        JSONObject jsonObject = controlModel.getJsonObject(JSONString);
//        Object[] arg = new Object[1];
//        if (jsonObject != null) {
//            arg[0] = controlModel.getJSONProtString(Constants.LANG, jsonObject);
//            controller.executeCmd(Constants.SET_LANGUAGE_COMMAND, arg);
//        }
//    }
//
//    @JavascriptInterface
//    public void getVersion() {
//        Log.d(TAG, "   getVersion    ");
//        controller.executeCmd(Constants.GET_VERSION_COMMAND, null);
//    }
//
//
//    //tagsInfoValue controller
//    @JavascriptInterface
//    public void getTagValue(final String JSONString) {
//        Log.d(TAG, "    getTagValue  JSONString     " + JSONString);
//        JSONObject jsonObject = controlModel.getJsonObject(JSONString);
//        Object[] arg = new Object[1];
//        if (jsonObject != null) {
//            arg[0] = controlModel.getJSONProtString(Constants.TAGS_LOWERCASE, jsonObject);
//
//            Log.d(TAG, "    getTagValue  JSONString  arg[0]   " + arg[0].toString());
//            controller.executeCmd(Constants.GET_TAG_VALUE_COMMAND, arg);
//        }
//    }
//
//
//    @JavascriptInterface
//    public void setTagValue(final String JSONString) {
//        Log.d(TAG, "    setTagValue  JSONString     " + JSONString);
//        Log.d(TAG, "    setTagValue  !!!!!!!   ");
//        JSONObject jsonObject = controlModel.getJsonObject(JSONString);
//        Object[] arg = new Object[1];
//        if (jsonObject != null) {
//            arg[0] = controlModel.getJSONProtString(Constants.TAGS_LOWERCASE, jsonObject);
//            Log.d(TAG, "    setTagValue  JSONString  arg[0]   " + arg[0].toString());
//            controller.executeCmd(Constants.SET_TAG_VALUE_COMMAND, arg);
//        }
////        controller.executeCmd(Constants.GET_NODE_LIST_COMMAND, null);
//    }
//
//
//    //node controller
//
//    @JavascriptInterface
//    public void getNodeStatus() {
//        Log.d(TAG, "   getNodeStatus    ");
//        controller.executeCmd(Constants.GET_NODE_STATUS_COMMAND, null);
//    }
//
//    //common
//    @JavascriptInterface
//    public void getLocalStorageMemAll() {
//        controller.executeCmd(Constants.GET_LOCAL_STORAGE_MEM_ALL_COMMAND, null);
//    }
//
//    @JavascriptInterface
//    public void getLocalStorageMem(final String JSONString) {
//        controlActivity.runOnUiThread(new Runnable() {
//            //  @Override
//            public void run() {
//                Log.d(TAG, "    getLocalStorageMem  !!!!!!!   ");
//                JSONObject jsonObject = controlModel.getJsonObject(JSONString);
//                Object[] arg = new Object[1];
//                JSONObject result = new JSONObject();
//                if (jsonObject != null) {
//                    arg[0] = controlModel.getJSONProtString(Constants.KEY, jsonObject);
//                    Log.d(TAG, "    getLocalStorageMem  JSONString  arg[0]   " + arg[0].toString());
//                    try {
//                        result.put(arg[0].toString(), controlModel.getJSONProtString(arg[0].toString(), localStorageMem));
//                        String insertLocalStorageMemUrl = StringProcess.getJavascriptFunctionStringByJson(result, Constants.INSERT_LOCAL_STORAGE_MEM_JAVASCRIPT);
//                        controlWebView.loadUrl(insertLocalStorageMemUrl);
//                    } catch (JSONException e) {
//                        String insertLocalStorageMemUrl = StringProcess.getJavascriptFunctionStringByJson(result, Constants.INSERT_LOCAL_STORAGE_MEM_JAVASCRIPT);
//                        controlWebView.loadUrl(insertLocalStorageMemUrl);
//                    }
//                } else {
//                    String insertLocalStorageMemUrl = StringProcess.getJavascriptFunctionStringByJson(result, Constants.INSERT_LOCAL_STORAGE_MEM_JAVASCRIPT);
//                    controlWebView.loadUrl(insertLocalStorageMemUrl);
//                }
//            }
//        });
//    }
//
//    @JavascriptInterface
//    public void setLocalStorageMem(final String JSONString) {
//        Log.d(TAG, "    setLocalStorageMem  !!!!!!!   ");
//        JSONObject jsonObject = controlModel.getJsonObject(JSONString);
//        Object[] arg = new Object[2];
//        if (jsonObject != null) {
//            arg[0] = controlModel.getJSONProtString(Constants.KEY, jsonObject);
//            arg[1] = controlModel.getJSONProtString(Constants.VALUE, jsonObject);
//            try {
//                localStorageMem.put(arg[0].toString(), arg[1].toString());
//            } catch (JSONException e) {
//                Log.e(TAG, "setLocalStorageMem  !!!!!!! " + e.getLocalizedMessage());
//            }
//        }
//
//        Log.d(TAG, "setLocalStorageMem localStorageMem " + localStorageMem.toString());
//    }
//
//    @JavascriptInterface
//    public void removeLocalStorageMem(final String JSONString) {
//        Log.d(TAG, "    removeLocalStorageMem  !!!!!!!      ");
//        JSONObject jsonObject = controlModel.getJsonObject(JSONString);
//        Object[] arg = new Object[1];
//        if (jsonObject != null) {
//            arg[0] = controlModel.getJSONProtString(Constants.KEY, jsonObject);
//            localStorageMem.remove(arg[0].toString());
//        }
//    }
//
//    @JavascriptInterface
//    public void getNodeList() {
//        Log.d(TAG, "    getNodeList  !!!!!!!   ");
//        controller.executeCmd(Constants.GET_NODE_LIST_COMMAND, null);
//    }
//
//    @JavascriptInterface
//    public void getRTrendGroupId(final String JSONString) {
//        JSONObject jsonObject = controlModel.getJsonObject(JSONString);
//        Object[] arg = new Object[1];
//        if (jsonObject != null) {
//            arg[0] = controlModel.getJSONProtString(Constants.NODE_NAME, jsonObject);
//            Log.d(TAG, "    getRTrendGroupId  !!!!!!!   ");
//            controller.executeCmd(Constants.GET_R_TREND_GROUP_ID_COMMAND, arg);
//        }
//    }
//
//    @JavascriptInterface
//    public void getRTrendConfig(final String JSONString) {
//        JSONObject jsonObject = controlModel.getJsonObject(JSONString);
//        Object[] arg = new Object[2];
//        if (jsonObject != null) {
//            arg[0] = controlModel.getJSONProtString(Constants.NODE_NAME, jsonObject);
//            arg[1] = controlModel.getJSONProtString(Constants.TREND_GROUR_ID, jsonObject);
//            Log.d(TAG, "    getRTrendConfig  !!!!!!!   ");
//            controller.executeCmd(Constants.GET_R_TREND_CONFIG_COMMAND, arg);
//        }
//    }
//
//    @JavascriptInterface
//    public void getTagsData(final String JSONString) {
//        Log.d(TAG, "    getTagsData  JSONString     " + JSONString);
//        JSONObject jsonObject = controlModel.getJsonObject(JSONString);
//        Object[] arg = new Object[1];
//        if (jsonObject != null) {
//            arg[0] = controlModel.getJSONProtString(Constants.TAGS_LOWERCASE, jsonObject);
//
//            Log.d(TAG, "    getTagValue  JSONString  arg[0]   " + arg[0].toString());
//            controller.executeCmd(Constants.GET_TAGS_DATA_COMMAND, arg);
//        }
//    }
//
//    @JavascriptInterface
//    public void getRealTimeTagValues(final String JSONString) {
//        JSONObject jsonObject = controlModel.getJsonObject(JSONString);
//        Object[] arg = new Object[3];
//        if (jsonObject != null) {
//            arg[0] = controlModel.getJSONProtString(Constants.INTERVAL, jsonObject);
//            arg[1] = controlModel.getJSONProtString(Constants.RECORDS, jsonObject);
//            arg[2] = controlModel.getJSONProtString(Constants.TAGS_UPPERCASE, jsonObject);
//            Log.d(TAG, "    getRealTimeTagValues  !!!!!!!   ");
//            controller.executeCmd(Constants.GET_REAL_TIME_TAG_VALUES_COMMAND, arg);
//        }
//    }
//
//    @JavascriptInterface
//    public void showToast(final String text) {
//        Log.d(TAG, "ip input show toast");
//        Toast.makeText(controlActivity, "html arg: " + text, Toast.LENGTH_SHORT).show();
//    }
//
//    @JavascriptInterface
//    public void changePage(final String JSONString) {
//        Log.d(TAG, "changePage~~~~~~    " + JSONString);
//        JSONObject jsonObject = controlModel.getJsonObject(JSONString);
//        if (jsonObject != null) {
//            String controllerType = controlModel.getJSONProtString(Constants.URL, jsonObject);
//            Log.d(TAG, "controllerType~~~~~~~~~" + controllerType);
//            if (controlModel.isOnline()) {
//                controller.saveControllerInfo();
//                setController(controllerType);
//                controller.executeCtrl();
//            } else {
//                if (controllerType.equals(Constants.LOGIN_PAGE_NAME) || controllerType.equals(Constants.CONFIG_PAGE_NAME) || controllerType.equals(Constants.HOME_PAGE_NAME)) {
//                    controller.saveControllerInfo();
//                    setController(controllerType);
//                    controller.executeCtrl();
//                } else {
//                    Toast.makeText(controlActivity, "網路不穩，請確定網路通訊", Toast.LENGTH_SHORT).show();
//                    if (!controller.getControlPageName().equals(Constants.HOME_PAGE_NAME)) {
//                        setController(Constants.HOME_PAGE_NAME);
//                        controller.executeCtrl();
//                    }
//                }
//            }
//        }
//    }
//
//    @JavascriptInterface
//    public void getLanguage() {
//        controller.executeCmd(Constants.GET_LANGUAGE_COMMAND, null);
//    }
//
//
//    @JavascriptInterface
//    public void getMapListByNode(final String nodeName) {
//        Log.d(TAG, "getMapListByNode " + nodeName);
//        Object[] arg = new Object[1];
//        arg[0] = controlModel.getJSONProtString(Constants.NODE_NAME, nodeName);
//        controller.executeCmd(Constants.GET_MAP_LIST_BY_NODE_COMMAND, arg);
//    }
//
//    @JavascriptInterface
//    public void getMapConfig(final String JSONString) {
//        Log.d(TAG, "getMapConfig ");
//        JSONObject jsonObject = controlModel.getJsonObject(JSONString);
//        if (jsonObject != null) {
//            Object[] arg = new Object[3];
//            arg[0] = controlModel.getJSONProtString(Constants.NODE_NAME, jsonObject);
//            arg[1] = controlModel.getJSONProtString(Constants.MAP_TYPE, jsonObject);
//            arg[2] = controlModel.getJSONProtString(Constants.MAP_NAME, jsonObject);
//            controller.executeCmd(Constants.GET_MAP_CONFIG, arg);
//        }
//    }


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
            Object[] arg = new Object[3];
            arg[0] = controlModel.getJSONProtString(Constants.URL, jsonObject);
            setController(arg[0].toString());
            controlModel.toastString("changePage   " + arg[0].toString());
            controller.executeCtrl();
        }
    }
}
