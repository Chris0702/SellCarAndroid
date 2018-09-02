package com.chris.dx.sellcarandroid;

import android.Manifest;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.net.Uri;
import android.os.Build;
import android.provider.Settings;
import android.support.v4.app.ActivityCompat;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.widget.Toast;

import com.chris.dx.sellcarandroid.define.Constants;
import com.chris.dx.sellcarandroid.fragment.MainWebViewFragment;
import com.chris.dx.sellcarandroid.service.FirebaseInstanceIDService;
import com.chris.dx.sellcarandroid.tool.Factory;
import com.chris.dx.sellcarandroid.tool.Model;

public class MainActivity extends AppCompatActivity {
    private Factory factory = Factory.getInstance();
    private Model controlModel;
    private MainWebViewFragment mainWebViewFragment;
    private static int PERMISSION_REQUEST_CODE = 1;
    private String[] requiredPermissions = {
            Manifest.permission.ACCESS_COARSE_LOCATION,
            Manifest.permission.WRITE_EXTERNAL_STORAGE,
            Manifest.permission.READ_PHONE_STATE
    };
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
        controlModel = factory.createModel(this);
        mainWebViewFragment = factory.createMainWebViewFragment();
    }

    @Override
    protected void onResume() {
        super.onResume();
//        requestAlertWindowPermission();
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();

    }

    private void requestAlertWindowPermission() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            if (!Settings.canDrawOverlays(this)) {
                //沒有設置權限
                Intent intent = new Intent(Settings.ACTION_MANAGE_OVERLAY_PERMISSION);
                intent.setData(Uri.parse("package:" + getPackageName()));
                startActivityForResult(intent, Constants.SYSTEM_ALERT_WINDOW_PERMISSIONS_REQUEST_CODE);
            } else {
                if (!hasAllPermissions(requiredPermissions)) {
                    requestPermissions(requiredPermissions);
                }
            }
        }
    }

    // request/check permission

    private boolean checkPermission(String permission) {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            return checkSelfPermission(permission) == PackageManager.PERMISSION_GRANTED;
        } else {
            return ActivityCompat.checkSelfPermission(this, permission) ==
                    PackageManager.PERMISSION_GRANTED;
        }
    }

    private void requestPermissions(String[] permissions) {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            requestPermissions(permissions, PERMISSION_REQUEST_CODE);
        } else {
            ActivityCompat.requestPermissions(this, permissions, PERMISSION_REQUEST_CODE);
        }
    }

    private boolean hasAllPermissions(String[] permissions) {
        for (String permission: permissions) {
            if (!checkPermission(permission)) {
                return false;
            }
        }
        return true;
    }

    @Override
    public void onRequestPermissionsResult(int requestCode, String[] permissions, int[] grantResults) {
        if (requestCode == PERMISSION_REQUEST_CODE) {
            for (int result: grantResults) {
                if (result != PackageManager.PERMISSION_GRANTED) {

                } else {
                    super.onRequestPermissionsResult(requestCode, permissions, grantResults);
                }
            }
        }
    }












    private void setMainFragment() {
        controlModel.changeFragment(getFragmentManager(), R.id.content_main, mainWebViewFragment);
    }
}
