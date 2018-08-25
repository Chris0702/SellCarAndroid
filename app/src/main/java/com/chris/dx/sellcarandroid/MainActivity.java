package com.chris.dx.sellcarandroid;

import android.provider.Settings;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;

import com.chris.dx.sellcarandroid.fragment.MainWebViewFragment;
import com.chris.dx.sellcarandroid.service.FirebaseInstanceIDService;
import com.chris.dx.sellcarandroid.tool.Factory;
import com.chris.dx.sellcarandroid.tool.Model;

public class MainActivity extends AppCompatActivity {
    private Factory factory = Factory.getInstance();
    private Model controlModel;
    private MainWebViewFragment mainWebViewFragment;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        createObj();
        setMainFragment();
        setContentView(R.layout.activity_main);
//        String androidId = Settings.Secure.getString(getContentResolver(), Settings.Secure.ANDROID_ID);
//        controlModel.toastString(androidId);
    }

    private void createObj() {
        //factory = new Factory();
        controlModel = factory.createModel(this);
        mainWebViewFragment = factory.createMainWebViewFragment();
//        DisplayMetrics metrics = new DisplayMetrics();
//        getWindowManager().getDefaultDisplay().getMetrics(metrics);
//        controlModel.setLoadingViewSize(Constants.WIDTH_LOADING_VIEW,Constants.HEIGHT_LOADING_VIEW);
    }

    private void setMainFragment() {
        controlModel.changeFragment(getFragmentManager(), R.id.content_main, mainWebViewFragment);
    }
}
