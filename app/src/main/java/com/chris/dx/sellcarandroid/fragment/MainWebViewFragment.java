package com.chris.dx.sellcarandroid.fragment;

import android.app.Activity;
import android.app.Fragment;
import android.os.Bundle;
import android.os.Handler;
import android.util.Log;
import android.view.KeyEvent;
import android.view.LayoutInflater;
import android.view.MotionEvent;
import android.view.View;
import android.view.ViewGroup;
import android.webkit.JavascriptInterface;
import android.webkit.WebView;
import android.widget.ScrollView;
import android.widget.Toast;

import com.chris.dx.sellcarandroid.define.Constants;
import com.chris.dx.sellcarandroid.tool.Factory;
import com.chris.dx.sellcarandroid.tool.Model;
import com.chris.dx.sellcarandroid.R;
import com.chris.dx.sellcarandroid.tool.JavaScriptInterface;
import com.chris.dx.sellcarandroid.tool.StringProcess;


/**
 * Created by Chris.Wu on 2016/11/1.
 */
public class MainWebViewFragment extends Fragment {
    private WebView mainWebView;
    private Model controlModel;
    private Factory factory = Factory.getInstance();
    private JavaScriptInterface controlJavaScriptInterface;
    private ScrollView mainWebViewScroll;

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        View returnView = inflater.inflate(R.layout.main_webview, container, false);
        createObj(returnView);
        return returnView;
    }

    @Override
    public void onResume() {
        Log.d("debug","MainWebViewFragment    onResume");
        super.onResume();
        controlJavaScriptInterface.updateServerUrl();
    }


    private void createObj(View view) {
        controlModel = factory.createModel(getActivity());
        mainWebView = (WebView) view.findViewById(R.id.mainWebviewContent);
        mainWebViewScroll = ((ScrollView) view.findViewById(R.id.mainWebviewScroll));
        controlJavaScriptInterface = factory.createJavaScriptInterface(getActivity(), mainWebView, controlModel,mainWebViewScroll);
    }

}
