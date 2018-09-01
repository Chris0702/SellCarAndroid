package com.chris.dx.sellcarandroid.tool;

import android.app.Activity;
import android.app.Application;
import android.app.Fragment;
import android.app.FragmentManager;
import android.app.FragmentTransaction;
import android.content.Context;
import android.graphics.Bitmap;
import android.icu.text.LocaleDisplayNames;
import android.location.Address;
import android.location.Criteria;
import android.location.Geocoder;
import android.location.Location;
import android.location.LocationManager;
import android.net.ConnectivityManager;
import android.net.NetworkInfo;
import android.os.Bundle;
import android.util.Log;
import android.widget.Toast;

//import com.webaccess.advantech.webaccessmobile.background.SystemData;
//import com.webaccess.advantech.webaccessmobile.define.Constants;
//import com.webaccess.advantech.webaccessmobile.language.langController;
//import com.webaccess.advantech.webaccessmobile.role.Project;
//import com.webaccess.advantech.webaccessmobile.role.Server;
//import com.webaccess.advantech.webaccessmobile.role.SystemInfo;
//import com.webaccess.advantech.webaccessmobile.role.User;

import com.chris.dx.sellcarandroid.define.Constants;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.ByteArrayOutputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;

/**
 * Created by Chris.Wu on 2016/10/20.
 */
public class Model {
    Factory factory = Factory.getInstance();
//    DBConnection dbHelper;
    Activity controlActivity;
    HttpClient httpClient;
    Application controlApplication;
//    SystemData systemData;
    Context controlContext;
//
    public Model() {
        controlActivity = null;
        controlApplication = null;
        createObj();
    }

    public Model(Activity activity) {
        controlActivity = activity;
        controlContext = null;
        controlApplication = null;
        createObj();
    }

    public Model(Application application) {
        controlActivity = null;
        controlContext = null;
        controlApplication = application;
        createObj();
    }

    public Model(Context context) {
        controlActivity = null;
        controlApplication = null;
        controlContext = context;
        createObj();
    }
//
    private void createObj() {
        //factory = new Factory();
        httpClient = factory.createHttpClient();
//        systemData = null;
//        if (controlActivity != null) {
//            dbHelper = factory.createDBConnection(controlActivity);
//            dbHelper.DBInit();
//            createSystemInfo();
//
//        } else if (controlApplication != null) {
//            dbHelper = factory.createDBConnection(controlApplication);
//            dbHelper.DBInit();
//            createSystemInfo();
//        } else if (controlContext != null) {
//            dbHelper = factory.createDBConnection(controlContext);
//            dbHelper.DBInit();
//        } else {
//            dbHelper = null;
//        }
    }

        public void toastString(final String string) {
        if (controlActivity != null) {
            controlActivity.runOnUiThread(new Runnable() {
                //  @Override
                public void run() {
                    Toast.makeText(controlActivity, string, Toast.LENGTH_SHORT).show();
                }
            });
        }
    }


//
//    public boolean isOnline() {
//        ConnectivityManager connectivityManager = (ConnectivityManager) controlActivity.getSystemService(Context.CONNECTIVITY_SERVICE);;
//        NetworkInfo networkInfo = connectivityManager.getActiveNetworkInfo();
//        if (networkInfo != null) {
//            if (networkInfo.isConnected()) {
//                return true;
//            } else {
//                return false;
//            }
//        } else {
//            return false;
//        }
//    }
//
//    public langController getLangObject(String type) {
//        switch (type) {
//            case Constants.EN_LANGUAGE:
//                return factory.createEn();
//            case Constants.FR_LANGUAGE:
//                return factory.createFr();
//            case Constants.JA_LANGUAGE:
//                return factory.createJa();
//            case Constants.KO_LANGUAGE:
//                return factory.createKo();
//            case Constants.ZH_CN_LANGUAGE:
//                return factory.createZh_cn();
//            case Constants.ZH_TW_LANGUAGE:
//                return factory.createZh_tw();
//            default:
//                return factory.createEn();
//        }
//    }
//
//    public void toastString(final String string) {
//        if (controlActivity != null) {
//            controlActivity.runOnUiThread(new Runnable() {
//                //  @Override
//                public void run() {
//                    Toast.makeText(controlActivity, string, Toast.LENGTH_SHORT).show();
//                }
//            });
//        }
//    }
//
//    public void systemDataOn(String projectName, String serverToken) {
//        if (controlActivity != null) {
//            if (systemData == null) {
//                systemData = factory.createSystemData(controlActivity);
//                systemData.systemDataRun(projectName, serverToken);
//            }
//        }
//    }
//
//    public void systemDataOff() {
//        if (systemData != null) {
//            systemData.systemDataStop();
//            systemData = null;
//        }
//    }
//
//    public void closeDB() {
//        if (dbHelper != null) {
//            dbHelper.close();
//        }
//    }
//
//    private void createSystemInfo() {
//        SystemInfo systemInfo = getSystemInfo();
//        if (systemInfo == null) {
//            systemInfo = factory.createSystemInfo();
//            dbHelper.insertSystemInfo(systemInfo);
//        }
//    }
//
//    public SystemInfo getSystemInfo() {
//        if (dbHelper != null) {
//            List<SystemInfo> systemInfoList = dbHelper.getSystemInfoList();
//            Log.d("debug", "systemInfoList.size()    " + systemInfoList.size());
//            if (systemInfoList.size() == 0) {
//                return null;
//            } else {
//                SystemInfo systemInfo = systemInfoList.get(0);
//                return systemInfo;
//            }
//        } else {
//            return null;
//        }
//    }
//
//    public boolean isLogin() {
//        SystemInfo systemInfo = getSystemInfo();
//        if (systemInfo != null) {
//            return systemInfo.getIsLogin();
//        } else {
//            return false;
//        }
//    }
//
//    public void exitApp() {
//        controlActivity.moveTaskToBack(true);
//        android.os.Process.killProcess(android.os.Process.myPid());
//        System.exit(1);
//    }
//
//    public String getSystemInfoDeviceID() {
//        SystemInfo systemInfo = getSystemInfo();
//       return systemInfo.getDeviceID();
//    }
//
//    public boolean isPushMessage(String UUID) {
//        if (dbHelper != null) {
//            SystemInfo systemInfo = getSystemInfo();
//            List<Server> server = dbHelper.getServerList();
//            if (server.size() > 0) {
//                boolean result = false;
//                for (int i = 0; i < server.size(); i++) {
//                    Log.d("debug", "Notification server.get(i).getUUID()  : " + server.get(i).getUUID());
//                    if (server.get(i).getIP().equals(systemInfo.getLastIP())) {
//                        if (server.get(i).getUUID().equals(UUID)) {
//                            result = true;
//                        }
//                    }
//                }
//                return result;
//            } else {
//                return false;
//            }
//        } else {
//            return false;
//        }
//    }
//
//    public void setLogoutToDB() {
//        SystemInfo systemInfo = getSystemInfo();
//        if (systemInfo != null) {
//            systemInfo.setAttribute(2, Constants.FALSE_STRING);
//            dbHelper.updateSystemInfoByPK(systemInfo);
//        }
//    }
//
//    public void saveFirebaseToken(String token) {
//        SystemInfo systemInfo = getSystemInfo();
//        if (systemInfo != null) {
//            systemInfo.setAttribute(1, token);
//            dbHelper.updateSystemInfoByPK(systemInfo);
//        }
//    }
//
//    public void saveBaiduNotificationChannelId(String channelId) {
//        SystemInfo systemInfo = getSystemInfo();
//        if (systemInfo != null) {
//            systemInfo.setAttribute(16, channelId);
//            dbHelper.updateSystemInfoByPK(systemInfo);
//        }
//    }
//
//    public void saveLoginAccount(String ip, String projectName, String username, String password, String serverToken) {
//        SystemInfo systemInfo = getSystemInfo();
//        if (systemInfo != null) {
//            systemInfo.setAttribute(2, Constants.TRUE_STRING);
//            systemInfo.setAttribute(3, ip);
//            systemInfo.setAttribute(4, projectName);
//            systemInfo.setAttribute(5, username);
//            systemInfo.setAttribute(6, password);
//            systemInfo.setAttribute(7, serverToken);
//            dbHelper.updateSystemInfoByPK(systemInfo);
//            logSystemInfoDB();
//        }
//    }
//
//    public String getLang() {
//        SystemInfo systemInfo = getSystemInfo();
//        if (systemInfo == null) {
//            return systemInfo.getLanguage();
//        } else if (systemInfo.getLanguage().equals(Constants.EMPTY_STRING)) {
//            String lang = Locale.getDefault().getLanguage();
//            lang = StringProcess.getSystemLang(lang);
//            return lang;
//        } else {
//            return systemInfo.getLanguage();
//        }
//    }
//
//    public void saveLang(String lang) {
//        SystemInfo systemInfo = getSystemInfo();
//        if (systemInfo != null) {
//            systemInfo.setAttribute(15, lang);
//            dbHelper.updateSystemInfoByPK(systemInfo);
//        }
//    }
//
//    public void saveFunctionList(String actionLog, String alarmLog, String alarmSummary, String trend, String dashboard, String tagsInfo, String gMap,String node) {
//        SystemInfo systemInfo = getSystemInfo();
//        if (systemInfo != null) {
//            systemInfo.setAttribute(8, actionLog);
//            systemInfo.setAttribute(9, alarmLog);
//            systemInfo.setAttribute(10, alarmSummary);
//            systemInfo.setAttribute(11, trend);
//            systemInfo.setAttribute(12, dashboard);
//            systemInfo.setAttribute(13, tagsInfo);
//            systemInfo.setAttribute(14, gMap);
//            systemInfo.setAttribute(18, node);
//            Log.d("debug","aaaaaaaaaaa    "+systemInfo.getNodePage());
//            dbHelper.updateSystemInfoByPK(systemInfo);
//        }
//    }
//
//    public JSONObject getFunctionListJson() {
//        JSONObject jsonObject = new JSONObject();
//        try {
//            SystemInfo systemInfo = getSystemInfo();
//            jsonObject.put(Constants.ACTION_LOG_HOME, systemInfo.getActionLogPage());
//            jsonObject.put(Constants.ALARM_LOG_HOME, systemInfo.getAlarmLogPage());
//            jsonObject.put(Constants.ALARM_SUMMARY_LOG_HOME, systemInfo.getAlarmSummaryPage());
//            jsonObject.put(Constants.TREND_HOME, systemInfo.getTrendPage());
//            jsonObject.put(Constants.DASHBOARD_HOME, systemInfo.getDashboardPage());
//            jsonObject.put(Constants.TAGS_INFO_HOME, systemInfo.getTagsInfoPage());
//            jsonObject.put(Constants.G_MAP_HOME, systemInfo.getGMapPage());
//            jsonObject.put(Constants.NODE_HOME, systemInfo.getNodePage());
//        } catch (JSONException e) {
//            jsonObject = null;
//        }
//        return jsonObject;
//    }
//
//    public void saveLoginProject(Project saveProject) {
//        if (dbHelper != null) {
//            dbHelper.insertProject(saveProject);
//        }
//    }
//
//    public void saveLoginServer(Server saveServer) {
//        if (dbHelper != null) {
//            dbHelper.insertServer(saveServer);
//        }
//    }
//
//    public List<Server> getRegisterServerList() {
//        if (dbHelper != null) {
//            List<Server> serverList = dbHelper.getServerList();
//            return serverList;
//        } else {
//            return new ArrayList<Server>();
//        }
//    }
//
//    public void serverFirebaseEnableFalse() {
//        List<Server> serverList = getRegisterServerList();
//        for (int i = 0; i < serverList.size(); i++) {
//            serverList.get(i).setAttribute(1, Constants.FALSE_STRING);
//            dbHelper.updateServerByPK(serverList.get(i));
//        }
//    }
//
//    public void saveFirebaseTokenEnableByIP(String ip, String firebaseTokenEnable) {
//        List<Server> serverList = getRegisterServerList();
//        for (int i = 0; i < serverList.size(); i++) {
//            if (serverList.get(i).getIP().equals(ip)) {
//                serverList.get(i).setAttribute(1, firebaseTokenEnable);
//                dbHelper.updateServerByPK(serverList.get(i));
//            }
//        }
//    }
//
//    public String getLastIP() {
//        if (dbHelper != null) {
//            List<SystemInfo> systemInfoList = dbHelper.getSystemInfoList();
//            if (systemInfoList.size() == 0) {
//                return Constants.EMPTY_STRING;
//            } else {
//                SystemInfo systemInfo = systemInfoList.get(0);
//                return systemInfo.getLastIP();
//            }
//        } else {
//            return Constants.EMPTY_STRING;
//        }
//    }
//
//    public String getLastUsername() {
//        if (dbHelper != null) {
//            List<SystemInfo> systemInfoList = dbHelper.getSystemInfoList();
//            if (systemInfoList.size() == 0) {
//                return Constants.EMPTY_STRING;
//            } else {
//                SystemInfo systemInfo = systemInfoList.get(0);
//                return systemInfo.getLastUsername();
//            }
//        } else {
//            return Constants.EMPTY_STRING;
//        }
//    }
//
//    public String getLastPassword() {
//        if (dbHelper != null) {
//            List<SystemInfo> systemInfoList = dbHelper.getSystemInfoList();
//            if (systemInfoList.size() == 0) {
//                return Constants.EMPTY_STRING;
//            } else {
//                SystemInfo systemInfo = systemInfoList.get(0);
//                return systemInfo.getLastPassword();
//            }
//        } else {
//            return Constants.EMPTY_STRING;
//        }
//    }
//
//    public String getLastProjectName() {
//        if (dbHelper != null) {
//            logSystemInfoDB();
//            List<SystemInfo> systemInfoList = dbHelper.getSystemInfoList();
//            if (systemInfoList.size() == 0) {
//                return Constants.EMPTY_STRING;
//            } else {
//                SystemInfo systemInfo = systemInfoList.get(0);
//                return systemInfo.getLastProjectName();
//            }
//        } else {
//            return Constants.EMPTY_STRING;
//        }
//    }
//
//    public String getLastServerToken() {
//        if (dbHelper != null) {
//            List<SystemInfo> systemInfoList = dbHelper.getSystemInfoList();
//            if (systemInfoList.size() == 0) {
//                return Constants.EMPTY_STRING;
//            } else {
//                SystemInfo systemInfo = systemInfoList.get(0);
//                return systemInfo.getLastServerToken();
//            }
//        } else {
//            return Constants.EMPTY_STRING;
//        }
//    }
//
//    public String getUUIDByIP(String ip) {
//        String UUID = Constants.EMPTY_STRING;
//        if (dbHelper != null) {
//            List<Server> serverList = dbHelper.getServerList();
//            for (int i = 0; i < serverList.size(); i++) {
//                if (serverList.get(i).getIP().equals(ip)) {
//                    UUID = serverList.get(i).getUUID();
//                }
//            }
//        }
//        return UUID;
//    }
//
//    public String getFirebaseToken() {
//        if (dbHelper != null) {
//            List<SystemInfo> systemInfoList = dbHelper.getSystemInfoList();
//            if (systemInfoList.size() == 0) {
//                return Constants.EMPTY_STRING;
//            } else {
//                return systemInfoList.get(0).getFirebaseToken();
//            }
//        } else {
//            return Constants.EMPTY_STRING;
//        }
//    }
//
//    public String getBaiduNotificationChannelId() {
//        if (dbHelper != null) {
//            List<SystemInfo> systemInfoList = dbHelper.getSystemInfoList();
//            if (systemInfoList.size() == 0) {
//                return Constants.EMPTY_STRING;
//            } else {
//                return systemInfoList.get(0).getBaiduNotificationChannelId();
//            }
//        } else {
//            return Constants.EMPTY_STRING;
//        }
//    }
//
//    public User getUserFromDB(String username, String password, String projectName, String serverIP) {
//        User returnUser = factory.createUser();
//        if (dbHelper != null) {
//            List<User> user = dbHelper.getUserList();
//            if (user.size() > 0) {
//                for (int i = 0; i < user.size(); i++) {
//                    if (user.get(i).getServerIP().equals(serverIP) && user.get(i).getUsername().equals(username) && user.get(i).getPassword().equals(password) && user.get(i).getProjectName().equals(projectName)) {
//                        returnUser = user.get(i);
//                    }
//                }
//
//                return returnUser;
//            } else {
//                return returnUser;
//            }
//        } else {
//
//            return returnUser;
//        }
//    }
//
//
//    public void saveLoginUser(User user) {
//        if (dbHelper != null) {
//            dbHelper.insertUser(user);
////            logUserDB();
//        }
//    }
//
//    public void updateUserDB(User user) {
//        if (dbHelper != null) {
//            dbHelper.updateUserByPK(user);
////            logUserDB();
//        }
//    }
//
//    public String[] getIpHistoryList() {
//        if (dbHelper != null) {
//            List<Server> server = dbHelper.getServerList();
//            if (server.size() > 0) {
//                String[] ipList = new String[server.size()];
//                for (int i = 0; i < server.size(); i++) {
//                    ipList[i] = server.get(i).getIP();
//                }
//                return ipList;
//            } else {
//                String[] ipList = new String[0];
//                return ipList;
//            }
//        } else {
//            String[] ipList = new String[0];
//            return ipList;
//        }
//    }
//
//    public JSONObject[] getUserAccountHistoryArray() {
//        JSONObject[] userAccountHistoryArray;
//        if (dbHelper != null) {
//            List<User> user = dbHelper.getUserList();
//            if (user.size() > 0) {
//                userAccountHistoryArray = new JSONObject[user.size()];
//                for (int i = 0; i < user.size(); i++) {
//                    try {
//                        userAccountHistoryArray[i] = new JSONObject();
//                        userAccountHistoryArray[i].put(Constants.USERNAME, user.get(i).getUsername());
//                        userAccountHistoryArray[i].put(Constants.PASSWORD, user.get(i).getPassword());
//                        userAccountHistoryArray[i].put(Constants.PROJECT_NAME, user.get(i).getProjectName());
//                        userAccountHistoryArray[i].put(Constants.IP, user.get(i).getServerIP());
//                    } catch (JSONException e) {
//                    }
//                }
//                return userAccountHistoryArray;
//            } else {
//                userAccountHistoryArray = new JSONObject[0];
//                return userAccountHistoryArray;
//            }
//        } else {
//            userAccountHistoryArray = new JSONObject[0];
//            return userAccountHistoryArray;
//        }
//    }
//
//    public String[] getProjectArray() {
//        if (dbHelper != null) {
//            List<Project> project = dbHelper.getProjectList();
//            if (project.size() > 0) {
//                String[] projectArray = new String[project.size()];
//                for (int i = 0; i < project.size(); i++) {
//                    projectArray[i] = project.get(i).getProjectName();
//                }
//                return projectArray;
//            } else {
//                String[] projectArray = new String[0];
//                return projectArray;
//            }
//        } else {
//            String[] projectArray = new String[0];
//            return projectArray;
//        }
//    }
//
//    public void logServerDB() {
//        List<Server> server = dbHelper.getServerList();
//        Log.d("debug", "server list size  " + server.size());
//        for (int i = 0; i < server.size(); i++) {
//            Log.d("debug", "ip  " + server.get(i).getIP());
//            Log.d("debug", "firebaseTokenEnable   " + server.get(i).getFirebaseTokenEnable());
//            Log.d("debug", "UUID  " + server.get(i).getUUID());
//
//        }
//    }
//
//    public void logUserDB() {
//        List<User> User = dbHelper.getUserList();
//        Log.d("debug", "User list size  " + User.size());
//        for (int i = 0; i < User.size(); i++) {
//            Log.d("debug", "username  " + User.get(i).getUsername());
//            Log.d("debug", "password   " + User.get(i).getPassword());
//            Log.d("debug", "projectName   " + User.get(i).getProjectName());
//            Log.d("debug", "serverToken   " + User.get(i).getServerToken());
//            Log.d("debug", "ip   " + User.get(i).getServerIP());
//
//        }
//    }
//
//    public void logSystemInfoDB() {
//        List<SystemInfo> SystemInfo = dbHelper.getSystemInfoList();
//        Log.d("debug", "SystemInfo list size  " + SystemInfo.size());
//        for (int i = 0; i < SystemInfo.size(); i++) {
//            Log.d("debug", "id  " + SystemInfo.get(i).getId());
//            Log.d("debug", "firebase token  " + SystemInfo.get(i).getFirebaseToken());
//            Log.d("debug", "last ip  " + SystemInfo.get(i).getLastIP());
//            Log.d("debug", "last project  " + SystemInfo.get(i).getLastProjectName());
//            Log.d("debug", "last username  " + SystemInfo.get(i).getLastUsername());
//            Log.d("debug", "last password  " + SystemInfo.get(i).getLastPassword());
//            Log.d("debug", "isLogin  " + SystemInfo.get(i).getIsLogin());
//        }
//    }
//
//
    public boolean getHttpResult(String receiveMessage) {
        try {
            JSONObject jsonObject = getJsonObject(receiveMessage);
            if (jsonObject == null) {
                return false;
            } else {
                String result = jsonObject.getString(Constants.RESULT_REST_API);
                if (result.equals(Constants.ZERO)) {
                    return true;
                } else {
                    return false;
                }
            }
        } catch (JSONException e) {
            return false;
        }
    }

    public boolean getHttpStatusResult(String receiveMessage) {
        try {
            JSONObject jsonObject = getJsonObject(receiveMessage);
            if (jsonObject == null) {
                return false;
            } else {
                String result = jsonObject.getString(Constants.STATUS);
                if (result.equals(Constants.STATUS_OK)) {
                    return true;
                } else {
                    return false;
                }
            }
        } catch (JSONException e) {
            return false;
        }
    }

    public String getJSONProtString(String protName, String JSONString) {
        JSONObject jsonObject = getJsonObject(JSONString);
        return getJSONProtString(protName, jsonObject);
    }

    public JSONObject getJsonObject(String JSONString) {
        JSONObject jsonObject = null;
        try {
            if (JSONString.indexOf(Constants.OPEN_BRACE) >= 0) {
                JSONString = JSONString.substring(JSONString.indexOf(Constants.OPEN_BRACE), JSONString.lastIndexOf(Constants.CLOSE_BRACE) + 1);
            }
            jsonObject = new JSONObject(JSONString);
        } catch (JSONException e) {
        }
        return jsonObject;
    }

    public String getJSONProtString(String protName, JSONObject jsonObject) {
        String result = Constants.EMPTY_STRING;
        if (jsonObject != null)
            try {
                result = jsonObject.getString(protName);
            } catch (JSONException e) {
            }
        return result;
    }

    public byte[] Bitmap2Bytes(Bitmap bm) {
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        bm.compress(Bitmap.CompressFormat.PNG, Constants.BITMAP_COMPRESS_RATIO, baos);
        return baos.toByteArray();
    }

//    public String getProperIp(String ip) {
//        String front = Constants.EMPTY_STRING;
//        boolean addFront = true;
//        if (ip.indexOf(Constants.HTTP) == 0) {
//            addFront = false;
//        }
//        if (ip.indexOf(Constants.HTTPS) == 0) {
//            addFront = false;
//        }
//        if (addFront) {
//            ip = Constants.HTTP + Constants.SLASH + ip;
//        }
//        return ip;
//    }
//
//    public boolean isNotifyAlarmSummary() {
//        if (controlActivity == null) {
//            Log.d("debug", "isNotifyAlarmSummary       controlActivity null");
//            return false;
//        } else {
//
//            Log.d("debug", "isNotifyAlarmSummary       controlActivity ing");
//            Bundle params = controlActivity.getIntent().getExtras();
//            if (params != null) {
//                String action = params.getString(Constants.ACTION_EXTRA_KEY);
//                if (action == null) {
//                    return false;
//                } else if (action.equals(Constants.ALARM_SUMMARY_EXTRA_VALUE)) {
//                    return true;
//                } else {
//                    return false;
//                }
//            } else {
//                return false;
//            }
//        }
//    }
//
//
//    public void cancelNotifyAlarmSummary() {
//        controlActivity.getIntent().putExtra(Constants.ACTION_EXTRA_KEY, Constants.NORMAL_EXTRA_VALUE);
//    }
//
//    public void setLoadingViewSize(int width, int height) {
//        LoadingView.settingDefaultSize(width, height);
//    }
//
//    public void showLoadingView() {
//        if (controlActivity != null) {
//            controlActivity.runOnUiThread(new Runnable() {
//                //  @Override
//                public void run() {
//                    LoadingView.startProgressDialog(controlActivity);
//                }
//            });
//        }
//    }
//
//    public void stopLoadingView() {
//        LoadingView.stopProgressDialog();
//    }
//
//    public String getPushMessageType() {
//        String pushMessageType=Constants.FIREBASE_PUSH_MESSAGE_TYPE;
//        String country=getCurrentCountry();
//        if(country.equals(Constants.CHINA_PUSH_MESSAGE_TYPE)||this.getFirebaseToken().equals(Constants.EMPTY_STRING))
//        {
//            pushMessageType=Constants.BAIDU_PUSH_MESSAGE_TYPE;
//        }
//        return pushMessageType;
//    }
//
//    public String getCurrentCountry() {
//        LocationManager locationManager = (LocationManager) controlActivity.getSystemService(Context.LOCATION_SERVICE);
//        Criteria criteria = new Criteria();
//        criteria.setAccuracy(Criteria.ACCURACY_FINE);
//        criteria.setAltitudeRequired(false);
//        criteria.setBearingRequired(false);
//        criteria.setCostAllowed(true);
//        criteria.setPowerRequirement(Criteria.POWER_LOW);
//        double latitude = 0;
//        double longitude = 0;
//        String strAddress = "";
//        String strGPSStatus = "Disabled";
//        if (locationManager.isProviderEnabled(LocationManager.GPS_PROVIDER)) {
//            strGPSStatus = "Enabled";
//            try {
//                Location location = locationManager.getLastKnownLocation(LocationManager.GPS_PROVIDER);
//                if (location != null) {
//                    latitude = location.getLatitude();
//                    longitude = location.getLongitude();
//                    strAddress = getAddress(latitude, longitude);
//                } else {
//                    strAddress = "Can't located.";
//                    location = locationManager.getLastKnownLocation(LocationManager.NETWORK_PROVIDER);
//                    if (location != null) {
//                        latitude = location.getLatitude();
//                        longitude = location.getLongitude();
//                        strAddress = getAddress(latitude, longitude);
//                    } else {
//                        strAddress = "Still can't located.";
//                    }
//                }
//            }catch(SecurityException e){
//                Log.d("debug","local   SecurityException   "+e);
//            }
//        } else {
//            strGPSStatus = "Disabled";
//            strAddress = "something wrong.";
//        }
//        return strAddress;
//    }
//
//    public String getAddress(double latitude, double longitude) {
//        String strAddress = "";
//        Geocoder geocoder = new Geocoder(controlActivity, Locale.ENGLISH);
//        List places = null;
//        try {
//            places = geocoder.getFromLocation(latitude, longitude, 5);
//        } catch (Exception e) {
//            e.printStackTrace();
//        }
//        if (places != null && places.size() > 0) {
//            strAddress = ((Address) places.get(0)).getCountryName();
//        }
//        return strAddress;
//    }
    public void changeFragment(FragmentManager fragmentManager, int id, Fragment fragment) {
        FragmentTransaction transaction = fragmentManager.beginTransaction();
        transaction.replace(id, fragment);
        transaction.commit();
    }


}
