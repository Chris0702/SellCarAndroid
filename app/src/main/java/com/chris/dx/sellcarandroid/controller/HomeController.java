package com.chris.dx.sellcarandroid.controller;

import android.app.Activity;
import android.os.Handler;
import android.util.Log;
import android.view.KeyEvent;
import android.view.View;
import android.webkit.WebView;

import com.chris.dx.sellcarandroid.define.Constants;
import com.chris.dx.sellcarandroid.tool.JavaScriptInterface;

import org.json.JSONException;
import org.json.JSONObject;

/**
 * Created by Chris.Wu on 2016/11/2.
 */
public class HomeController extends Controller {

    public HomeController(Activity activity, WebView webView, JavaScriptInterface javaScriptInterface, String pageName) {
        super(activity, webView, javaScriptInterface, pageName);
//        controlModel.toastString("home");
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
            case Constants.GET_FUNCTION_LIST_COMMAND:
//                controlModel.logServerDB();
//                getFunctionList();
                break;
            case Constants.GET_LANGUAGE_COMMAND:
//                insertLanguage();
                break;
            default:
        }
    }

    private void updateWebView() {
        mainWebView.getSettings().setJavaScriptEnabled(true);
        mainWebView.getSettings().setDomStorageEnabled(true);
        mainWebView.loadUrl(Constants.HOME_WEB_URL);
        mainWebView.addJavascriptInterface(controlJavaScriptInterface, Constants.ANDROID_PARAMETER_FOR_JAVASCRIPT);
    }
}
