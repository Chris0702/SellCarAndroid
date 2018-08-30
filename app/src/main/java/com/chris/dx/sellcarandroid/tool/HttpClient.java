package com.chris.dx.sellcarandroid.tool;

//import android.util.Log;
//
//import com.webaccess.advantech.webaccessmobile.controller.AlarmSummaryLogController;
//import com.webaccess.advantech.webaccessmobile.controller.Controller;
//import com.webaccess.advantech.webaccessmobile.controller.LoginController;
//import com.webaccess.advantech.webaccessmobile.controller.ConfigController;
//import com.webaccess.advantech.webaccessmobile.controller.MapController;
//import com.webaccess.advantech.webaccessmobile.controller.MapListController;
//import com.webaccess.advantech.webaccessmobile.controller.TagsInfoListController;
//import com.webaccess.advantech.webaccessmobile.controller.TagsInfoValueController;
//import com.webaccess.advantech.webaccessmobile.controller.TrendListController;
//import com.webaccess.advantech.webaccessmobile.controller.TrendController;
//import com.webaccess.advantech.webaccessmobile.define.Constants;
//import com.webaccess.advantech.webaccessmobile.define.HttpHandler;
//import com.webaccess.advantech.webaccessmobile.role.SystemInfo;
//import com.webaccess.advantech.webaccessmobile.service.FirebaseInstanceIDService;
//
import android.util.Log;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
//

import com.chris.dx.sellcarandroid.controller.Controller;
import com.chris.dx.sellcarandroid.controller.PriceController;
import com.chris.dx.sellcarandroid.controller.TestDriveController;
import com.chris.dx.sellcarandroid.define.Constants;

import okhttp3.Call;
import okhttp3.Callback;
import okhttp3.Cookie;
import okhttp3.CookieJar;
import okhttp3.FormBody;
import okhttp3.HttpUrl;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;
import okhttp3.MediaType;

/**
 * Created by Chris.Wu on 2016/11/10.
 */

public class HttpClient {
    private OkHttpClient okHttpClient;
    private String serverToken;

    public HttpClient() {
        createOkHttpClient();
    }

    public HttpClient(String serverToken) {
        okHttpClient = new OkHttpClient();
        this.serverToken = serverToken;
        createOkHttpClient();
    }

    public void setServerToken(String serverToken) {
        this.serverToken = serverToken;
    }

    public String getServerToken() {
        return serverToken;
    }

    public void createOkHttpClient() {
        okHttpClient = new OkHttpClient.Builder()
                .cookieJar(new CookieJar() {
                    private final HashMap<HttpUrl, List<Cookie>> cookieStore = new HashMap<>();

                    @Override
                    public void saveFromResponse(HttpUrl url, List<Cookie> cookies) {
//                        Log.d("okhttp","saveFromResponse");
//                        Log.d("okhttp",""+url.toString());
//                        Log.d("okhttp",""+ cookies.toString());
                        String cookiesString = cookies.toString();
                        if (cookiesString.indexOf(Constants.SERVER_TOKEN_TITLE) > 0) {
                            cookiesString = cookiesString.substring(cookiesString.indexOf(Constants.SERVER_TOKEN_TITLE) + 4, cookiesString.indexOf(Constants.SEMICOLON));
//                            serverToken = cookiesString;
                        }
                        Log.d("okhttp", " :::   " + cookiesString);
                    }

                    @Override
                    public List<Cookie> loadForRequest(HttpUrl url) {
                        List<Cookie> cookies = cookieStore.get(url.host());
//                        Log.d("okhttp","loadForRequest");
//                        Log.d("okhttp",""+ url.toString());
                        return cookies != null ? cookies : new ArrayList<Cookie>();
                    }
                })
                .build();
    }

    public OkHttpClient getClient() {
        return okHttpClient;
    }

    public Call getCall(Request request) {
        return okHttpClient.newCall(request);
    }

    public void checkServerIsExist(final Controller controller) {
        Log.d("debug", "http  rest api getWebAccessProjectList  ");
        Request request = new Request.Builder()
                .url(Constants.SERVER_IS_EXIST_API)
                .build();
        Call call = okHttpClient.newCall(request);
        call.enqueue(new Callback() {
            @Override
            public void onFailure(Call call, IOException e) {
                controller.checkServerIsExistResponse(false,Constants.EMPTY_STRING);
            }

            @Override
            public void onResponse(Call call, Response response) throws IOException {
                String receiveMessage = response.body().string();
                Log.d("http", receiveMessage);
                controller.checkServerIsExistResponse(true,receiveMessage);
            }
        });
    }

    public void getCarsInfoById(final String id,final TestDriveController testDriveController) {
        Log.d("debug", "http  rest api getCarsInfoById  ");
        String requestUrl = StringProcess.getCarsInfoByIdApiUrl(id);
        Log.d("debug", requestUrl);
        Request request = new Request.Builder()
                .url(requestUrl)
                .build();
        Call call = okHttpClient.newCall(request);
        call.enqueue(new Callback() {
            @Override
            public void onFailure(Call call, IOException e) {
//                controller.checkServerIsExistResponse(false,Constants.EMPTY_STRING);
//                controller.getLocalPathAllResponse(Constants.EMPTY_STRING);
                testDriveController.getCarsInfoByIdResponse(Constants.EMPTY_STRING);
            }

            @Override
            public void onResponse(Call call, Response response) throws IOException {
                String receiveMessage = response.body().string();
                Log.d("http", receiveMessage);
//                controller.getLocalPathAllResponse(receiveMessage);
                testDriveController.getCarsInfoByIdResponse(receiveMessage);
            }
        });
    }

    public void getCarsInfoByCompany(final String company,final PriceController priceController) {
        Log.d("debug", "http  rest api getLocalPathAll  ");
        String requestUrl = StringProcess.getCarsInfoByCompanyApiUrl(company);
        Log.d("debug", requestUrl);
        Request request = new Request.Builder()
                .url(requestUrl)
                .build();
        Call call = okHttpClient.newCall(request);
        call.enqueue(new Callback() {
            @Override
            public void onFailure(Call call, IOException e) {
//                controller.checkServerIsExistResponse(false,Constants.EMPTY_STRING);
//                controller.getLocalPathAllResponse(Constants.EMPTY_STRING);
                priceController.getCarsInfoByCompanyResponse(Constants.EMPTY_STRING);
            }

            @Override
            public void onResponse(Call call, Response response) throws IOException {
                String receiveMessage = response.body().string();
                Log.d("http", receiveMessage);
//                controller.getLocalPathAllResponse(receiveMessage);
                priceController.getCarsInfoByCompanyResponse(receiveMessage);
            }
        });
    }

    public void getLocalPathAll(final String folderName,final Controller controller) {
        Log.d("debug", "http  rest api getLocalPathAll  ");
        String requestUrl = StringProcess.getLocalPathAllApiUrl(folderName);
        Log.d("debug", requestUrl);
        Request request = new Request.Builder()
                .url(requestUrl)
                .build();
        Call call = okHttpClient.newCall(request);
        call.enqueue(new Callback() {
            @Override
            public void onFailure(Call call, IOException e) {
//                controller.checkServerIsExistResponse(false,Constants.EMPTY_STRING);
                controller.getLocalPathAllResponse(Constants.EMPTY_STRING);
            }

            @Override
            public void onResponse(Call call, Response response) throws IOException {
                String receiveMessage = response.body().string();
                Log.d("http", receiveMessage);
                controller.getLocalPathAllResponse(receiveMessage);
            }
        });
    }

    public void orderTestDrive(final String name,final String company,final String phone,final String address,final String paymentType,final String carName,final String carCompany,final String carVersion,final String carColor,final String hopeTime, final TestDriveController testDriveController) {
        RequestBody requestBody = new FormBody.Builder()
                .add(Constants.NAME, name)
                .add(Constants.COMPANY, company)
                .add(Constants.PHONE, phone)
                .add(Constants.ADDRESS, address)
                .add(Constants.PAYMENT_TYPE, paymentType)
                .add(Constants.CAR_NAME, carName)
                .add(Constants.CAR_COMPANY, carCompany)
                .add(Constants.CAR_VERSION, carVersion)
                .add(Constants.CAR_COLOR, carColor)
                .add(Constants.HOPE_TIME, hopeTime)
                .build();
        Request request = new Request.Builder()
                .url(Constants.ORDER_TEST_DRIVE_API)
                .post(requestBody)
//                .addHeader(Constants.COOKIE, StringProcess.getCookieString(serverToken))
                .build();
        Call call = okHttpClient.newCall(request);
        call.enqueue(new Callback() {
            @Override
            public void onFailure(Call call, IOException e) {
                Log.d("http", "http rest api  orderTestDrive  fail         "+e);
                testDriveController.orderTestDriveResponse(false,Constants.EMPTY_STRING);
            }

            @Override
            public void onResponse(Call call, Response response) throws IOException {
                Log.d("http", "http rest api  orderTestDrive  success  ");
                String receiveMessage = response.body().string();
                Log.d("http", "http rest api  orderTestDrive  success   receiveMessage   " + receiveMessage);
                testDriveController.orderTestDriveResponse(true,receiveMessage);
            }
        });
    }
//
//    public void uploadImage(final String imageByte,final UploadController uploadController) {
//        RequestBody requestBody = new FormBody.Builder()
//                .add(Constants.IMAGE_BYTE, imageByte)
//                .build();
//        Request request = new Request.Builder()
//                .url(Constants.UPLOAD_IMAGE_API)
//                .post(requestBody)
////                .addHeader(Constants.COOKIE, StringProcess.getCookieString(serverToken))
//                .build();
//        Call call = okHttpClient.newCall(request);
//        call.enqueue(new Callback() {
//            @Override
//            public void onFailure(Call call, IOException e) {
//                Log.d("http", "http rest api  uploadImage  fail         "+e);
//                uploadController.uploadImageResponse(Constants.EMPTY_STRING);
//            }
//
//            @Override
//            public void onResponse(Call call, Response response) throws IOException {
//                Log.d("http", "http rest api  uploadImage  success  ");
//                String receiveMessage = response.body().string();
//                Log.d("http", "http rest api  uploadImage  success   receiveMessage   " + receiveMessage);
//                uploadController.uploadImageResponse(receiveMessage);
//            }
//        });
//    }
//
//
////    public void getMapListByNode(final String projectName, final String nodeName, final String mapType, final MapListController controller) {
//        Log.d("debug", "Constants.GET_XXX_MAP_LIST_REST_API");
//        String requestUrl = StringProcess.getMapListApiUrl(projectName, nodeName, mapType);
//        Request request = new Request.Builder()
//                .url(requestUrl)
//                .addHeader(Constants.COOKIE, StringProcess.getCookieString(serverToken))
//                .build();
//        Call call = okHttpClient.newCall(request);
//        call.enqueue(new Callback() {
//            @Override
//            public void onFailure(Call call, IOException e) {
//                Log.d("http", "http rest api getMapListByNode  fail         ");
//                controller.getControlModel().toastString(controller.getControllerLang().INTERNET_SERVER_ERROR);
//                controller.getMapListResponse(Constants.HTTP_FAIL);
//            }
//
//            @Override
//            public void onResponse(Call call, Response response) throws IOException {
//                Log.d("http", "http rest api  getMapListByNode  success  ");
//                String receiveMessage = response.body().string();
//                controller.getMapListResponse(receiveMessage);
//            }
//        });
//    }

//
//    public void setTagValue(final String projectName, final String tags, final HttpHandler handler ){ //TagsInfoValueController tagsInfoValueController) {
//        RequestBody requestBody = new FormBody.Builder()
//                .add(Constants.TAGS_UPPERCASE, tags)
//                .build();
//        Request request = new Request.Builder()
//                .url(StringProcess.addProjectNameToUrl(Constants.SET_TAG_VALUES_REST_API, projectName))
//                .post(requestBody)
//                .addHeader(Constants.COOKIE, StringProcess.getCookieString(serverToken))
//                .build();
//        Call call = okHttpClient.newCall(request);
//        call.enqueue(new Callback() {
//            @Override
//            public void onFailure(Call call, IOException e) {
//                Log.d("http", "http rest api  setTagValue  fail         ");
//            }
//
//            @Override
//            public void onResponse(Call call, Response response) throws IOException {
//                Log.d("http", "http rest api  setTagValue  success  ");
//                String receiveMessage = response.body().string();
//                Log.d("http", "http rest api  setTagValue  success   receiveMessage   " + receiveMessage);
//                handler.completion("setTagValues", receiveMessage);
//                //tagsInfoValueController.setTagValueResponse(receiveMessage);
////                controller.alarmAckResponse(receiveMessage);
//            }
//        });
//    }
//
//    public void alarmAck(final String projectName, final String tags, final Controller controller) {
//        RequestBody requestBody = new FormBody.Builder()
//                .add(Constants.TAGS_UPPERCASE, tags)
//                .build();
//        Request request = new Request.Builder()
//                .url(StringProcess.addProjectNameToUrl(Constants.ALARM_ACK_REST_API, projectName))
//                .post(requestBody)
//                .addHeader(Constants.COOKIE, StringProcess.getCookieString(serverToken))
//                .build();
//        Call call = okHttpClient.newCall(request);
//        call.enqueue(new Callback() {
//            @Override
//            public void onFailure(Call call, IOException e) {
//                Log.d("http", "http rest api  alarmAck  fail         ");
//            }
//
//            @Override
//            public void onResponse(Call call, Response response) throws IOException {
//                Log.d("http", "http rest api  alarmAck  success  ");
//                String receiveMessage = response.body().string();
//                Log.d("http", "http rest api  alarmAck  success   receiveMessage   " + receiveMessage);
//                controller.alarmAckResponse(receiveMessage);
//            }
//        });
//    }
//
//    public void alarmAckAllList(final String projectName, final AlarmSummaryLogController alarmSummaryLogController) {
//        Log.d("debug", "Constants.ALARM_ACK_ALL_REST_API         " + Constants.ALARM_ACK_ALL_REST_API);
//        Request request = new Request.Builder()
//                .url(StringProcess.addProjectNameToUrl(Constants.ALARM_ACK_ALL_REST_API, projectName))
//                .addHeader(Constants.COOKIE, StringProcess.getCookieString(serverToken))
//                .build();
//        Call call = okHttpClient.newCall(request);
//        call.enqueue(new Callback() {
//            @Override
//            public void onFailure(Call call, IOException e) {
//                Log.d("http", "http rest api alarmAckAllList  fail         ");
//                alarmSummaryLogController.getControlModel().toastString(alarmSummaryLogController.getControllerLang().INTERNET_SERVER_ERROR);
//            }
//
//            @Override
//            public void onResponse(Call call, Response response) throws IOException {
//                Log.d("http", "http rest api  alarmAckAllList  success  ");
//                String receiveMessage = response.body().string();
//                alarmSummaryLogController.alarmAckAllListResponse(receiveMessage);
//            }
//        });
//    }
//
//    public void getWebAccessProjectList(final LoginController LoginController) {
//        Log.d("debug", "http  rest api getWebAccessProjectList  ");
//        Request request = new Request.Builder()
//                .url(Constants.GET_WEBACCESS_PROJECT_LIST_API)
//                .build();
//        Call call = okHttpClient.newCall(request);
//        call.enqueue(new Callback() {
//            @Override
//            public void onFailure(Call call, IOException e) {
//                Log.d("http", "http  rest api get webAccess project list  fail  ");
//                LoginController.getControlModel().toastString(LoginController.getControllerLang().INTERNET_SERVER_ERROR);
//                LoginController.getProjectListByIPResponse(Constants.HTTP_FAIL);
//            }
//
//            @Override
//            public void onResponse(Call call, Response response) throws IOException {
//                Log.d("http", "http rest api get webAccess project list   success  ");
//                String receiveMessage = response.body().string();
//                Log.d("http", receiveMessage);
//                LoginController.getProjectListByIPResponse(receiveMessage);
////                LoginController.inputConnectIPResponse(receiveMessage,ip,remember);
//            }
//        });
//    }
//
//    public void getVersion(final ConfigController ConfigController) {
//        Log.d("debug", "http  rest api getVersion  ");
//        Request request = new Request.Builder()
//                .url(Constants.GET_VERSION_API)
//                .build();
//        Call call = okHttpClient.newCall(request);
//        call.enqueue(new Callback() {
//            @Override
//            public void onFailure(Call call, IOException e) {
//                Log.d("http", "http  rest api get webAccess project list  fail  ");
//                ConfigController.getControlModel().toastString(ConfigController.getControllerLang().INTERNET_SERVER_ERROR);
//                ConfigController.getVersionResponse(Constants.HTTP_FAIL);
//            }
//
//            @Override
//            public void onResponse(Call call, Response response) throws IOException {
//                Log.d("http", "http rest api get webAccess project list   success  ");
//                String receiveMessage = response.body().string();
//                Log.d("http", receiveMessage);
//                ConfigController.getVersionResponse(receiveMessage);
////                LoginController.inputConnectIPResponse(receiveMessage,ip,remember);
//            }
//        });
//    }
//
//    public void inputAccount(final String projectName, final String username, final String password, final String remember, final LoginController LoginController) {
//
//        RequestBody requestBody = new FormBody.Builder()
//                .add(Constants.TOKEN, getServerToken())
//                .add(Constants.PROJECT_NAME_1, projectName)
//                .add(Constants.USERNAME, username)
//                .add(Constants.PASSWORD, password)
//                .add(Constants.TYPE, Constants.EMPTY_STRING)
//                .build();
//
//        Request request = new Request.Builder()
//                .url(Constants.GET_DASHBOARD_TOKEN_REST_API)
//                .post(requestBody)
//                .addHeader(Constants.COOKIE, StringProcess.getCookieString(serverToken))
//                .build();
//
//        Call call = okHttpClient.newCall(request);
//        call.enqueue(new Callback() {
//            @Override
//            public void onFailure(Call call, IOException e) {
//                Log.d("http", "http rest api inputAccount  fail  ");
//                LoginController.getControlModel().toastString(LoginController.getControllerLang().INTERNET_SERVER_ERROR);
//                LoginController.inputAccountResponse(projectName, username, password, remember, Constants.HTTP_FAIL);
//            }
//
//            @Override
//            public void onResponse(Call call, Response response) throws IOException {
//                Log.d("http", "http rest api inputAccount  success  ");
//                String receiveMessage = response.body().string();
//                Log.d("http", "receiveMessage     " + receiveMessage);
//                LoginController.inputAccountResponse(projectName, username, password, remember, receiveMessage);
//
//            }
//        });
//    }
//
//    public void subscribeNotify(final String deviceID, final String deviceType, final String project, final String username, final String password, final String isNotify, final String appType, final String language, final String firebaseToken, final String baiduNotificationChannelId,final String pushMessageType, final LoginController loginController) {
//        RequestBody requestBody = new FormBody.Builder()
//                .add(Constants.DEVICE_ID, deviceID)
//                .add(Constants.DEVICE_TYPE, deviceType)
//                .add(Constants.PROJECT, project)
//                .add(Constants.USERNAME, username)
//                .add(Constants.PASSWORD, password)
//                .add(Constants.IS_NOTIFY, Constants.TRUE_STRING)
//                .add(Constants.APP_TYPE, appType)
//                .add(Constants.LANGUAGE, language)
//                .add(Constants.FIREBASE_TOKEN, firebaseToken)
//                .add(Constants.BAIDU_NOTIFICATION_CHANNELID, baiduNotificationChannelId)
//                .add(Constants.APNS_TOKEN,Constants.EMPTY_STRING)
//                .add(Constants.PUSH_MESSAGE_TYPE,pushMessageType)
//                .build();
//
//
//        //PUSH_MESSAGE_TYPE
//
//        Request request = new Request.Builder()
//                .url(Constants.SUBSCRIBE_NOTIFY_REST_API)
//                .post(requestBody)
//                .addHeader(Constants.COOKIE, StringProcess.getCookieString(serverToken))
//                .build();
//        Call call = okHttpClient.newCall(request);
//        call.enqueue(new Callback() {
//            @Override
//            public void onFailure(Call call, IOException e) {
//                Log.d("http", "http rest api  sendMobileInfoToServer  fail         ");
//                //loginController.getControlModel().toastString(loginController.getControllerLang().INTERNET_SERVER_ERROR);
//                loginController.subscribeNotifyResponse(Constants.HTTP_FAIL);
//
//            }
//
//            @Override
//            public void onResponse(Call call, Response response) throws IOException {
//                Log.d("http", "http rest api  sendMobileInfoToServer  success      ");
//                String receiveMessage = response.body().string();
//                loginController.subscribeNotifyResponse(receiveMessage);
//            }
//        });
//    }
//
//    public void subscribeNotifyOFF(final String deviceID, final String deviceType) {
//        //PUSH_MESSAGE_TYPE
//        Request request = new Request.Builder()
//                .url(StringProcess.getSubscribeNotifyOffUrl(Constants.UNSUBSCRIBE_NOTIFY_REST_API, deviceID, deviceType))
//                .addHeader(Constants.COOKIE, StringProcess.getCookieString(serverToken))
//                .build();
//
//        Call call = okHttpClient.newCall(request);
//        call.enqueue(new Callback() {
//            @Override
//            public void onFailure(Call call, IOException e) {
//                Log.d("http", "http rest api  subscribeNotifyOFF  fail         ");
//            }
//
//            @Override
//            public void onResponse(Call call, Response response) throws IOException {
//                Log.d("http", "http rest api  subscribeNotifyOFF  success      ");
//            }
//        });
//    }
//
//    public void getNodeList(final String projectName, final Controller controller) {
//        Log.d("debug", "Constants.GET_NODE_LIST_REST_APIl         " + Constants.GET_NODE_LIST_REST_API);
//        Request request = new Request.Builder()
//                .url(StringProcess.addProjectNameToUrl(Constants.GET_NODE_LIST_REST_API, projectName))
//                .addHeader(Constants.COOKIE, StringProcess.getCookieString(serverToken))
//                .build();
//        Call call = okHttpClient.newCall(request);
//        call.enqueue(new Callback() {
//            @Override
//            public void onFailure(Call call, IOException e) {
//                Log.d("http", "http rest api getNodeList  fail         ");
//                controller.getControlModel().toastString(controller.getControllerLang().INTERNET_SERVER_ERROR);
//                controller.getNodeListResponse(Constants.HTTP_FAIL);
//            }
//
//            @Override
//            public void onResponse(Call call, Response response) throws IOException {
//                Log.d("http", "http rest api  getNodeList  success  ");
//                String receiveMessage = response.body().string();
//                controller.getNodeListResponse(receiveMessage);
//            }
//        });
//    }
//
//    public void getRTrendGroupId(final String projectName, final String nodeName, final TrendListController trendListController) {
//        Log.d("debug", "Constants.GET_R_TREND_GROUP_ID_REST_API " + Constants.GET_NODE_LIST_REST_API);
//        Request request = new Request.Builder()
//                .url(StringProcess.getRTrendGroupIdUrl(Constants.GET_R_TREND_GROUP_ID_REST_API, projectName, nodeName))
//                .addHeader(Constants.COOKIE, StringProcess.getCookieString(serverToken))
//                .build();
//        Call call = okHttpClient.newCall(request);
//        call.enqueue(new Callback() {
//            @Override
//            public void onFailure(Call call, IOException e) {
//                Log.d("http", "http rest api getRTrendGroupId  fail");
//                trendListController.getControlModel().toastString(trendListController.getControllerLang().INTERNET_SERVER_ERROR);
//                trendListController.getRTrendGroupIdResponse(Constants.HTTP_FAIL);
//            }
//
//            @Override
//            public void onResponse(Call call, Response response) throws IOException {
//                Log.d("http", "http rest api  getRTrendGroupId  success");
//                String receiveMessage = response.body().string();
//                trendListController.getRTrendGroupIdResponse(receiveMessage);
//            }
//        });
//    }
//
//    public void getRTrendConfig(final String projectName, final String nodeName, final String trendGroupId, final TrendController trendController) {
//        Log.d("debug", "Constants.GET_R_TREND_CONFIG_REST_API " + Constants.GET_NODE_LIST_REST_API);
//        Request request = new Request.Builder()
//                .url(StringProcess.getRTrendConfigUrl(Constants.GET_R_TREND_CONFIG_REST_API, projectName, nodeName, trendGroupId))
//                .addHeader(Constants.COOKIE, StringProcess.getCookieString(serverToken))
//                .build();
//        Call call = okHttpClient.newCall(request);
//        call.enqueue(new Callback() {
//            @Override
//            public void onFailure(Call call, IOException e) {
//                Log.d("http", "http rest api getRTrendGroupId  fail");
//                trendController.getControlModel().toastString(trendController.getControllerLang().INTERNET_SERVER_ERROR);
//                trendController.getRTrendConfigResponse(Constants.HTTP_FAIL);
//            }
//
//            @Override
//            public void onResponse(Call call, Response response) throws IOException {
//                Log.d("http", "http rest api  getRTrendGroupId  success");
//                String receiveMessage = response.body().string();
//                trendController.getRTrendConfigResponse(receiveMessage);
//            }
//        });
//    }
//
//    public void getTagsData(final String projectName, final String tags, final TrendController TrendController) {
//        String requestUrl = StringProcess.getTagsDataRestApiUrl(projectName);
//        final MediaType JSON = MediaType.parse("application/json; charset=utf-8");
//        //RequestBody requestBody = new FormBody.Builder()
//        //        .add(Constants.TAGS_UPPERCASE, tags)
//        //        .build();
//        RequestBody requestBody = RequestBody.create(JSON, "{\"Tags\":"+tags+"}");
//        Request request = new Request.Builder()
//                .url(requestUrl)
//                .post(requestBody)
//                .addHeader(Constants.COOKIE, StringProcess.getCookieString(serverToken))
//                .build();
//        Log.d("debug", "http      requestUrl         " + requestUrl);
//        Call call = okHttpClient.newCall(request);
//        call.enqueue(new Callback() {
//            @Override
//            public void onFailure(Call call, IOException e) {
//                Log.d("http", "http rest api  getTagListByPage  fail         ");
//                TrendController.getControlModel().toastString(TrendController.getControllerLang().INTERNET_SERVER_ERROR);
//            }
//
//            @Override
//            public void onResponse(Call call, Response response) throws IOException {
//                Log.d("http", "http rest api  getTagListByPage  success  ");
//                String receiveMessage = response.body().string();
//                TrendController.getTagsDataResponse(receiveMessage);
//            }
//        });
//    }
//
//    public void refreshFirebaseTokenToServer(final SystemInfo systemInfo, final String firebaseToken, final FirebaseInstanceIDService firebaseInstanceIDService) {
//        RequestBody requestBody = new FormBody.Builder()
//                .add(Constants.DEVICE_ID, systemInfo.getDeviceID())
//                .add(Constants.DEVICE_TYPE, Constants.ANDROID)
//                .add(Constants.PROJECT, systemInfo.getLastProjectName())
//                .add(Constants.USERNAME, systemInfo.getLastUsername())
//                .add(Constants.PASSWORD, systemInfo.getLastPassword())
//                .add(Constants.IS_NOTIFY, Constants.TRUE_STRING)
//                .add(Constants.APP_TYPE, Constants.SCADA)
//                .add(Constants.LANGUAGE, systemInfo.getLanguage())
//                .add(Constants.FIREBASE_TOKEN, firebaseToken)
//                .add(Constants.BAIDU_NOTIFICATION_CHANNELID, systemInfo.getBaiduNotificationChannelId())
//                .build();
//        Request request = new Request.Builder()
//                .url(Constants.SUBSCRIBE_NOTIFY_REST_API)
//                .post(requestBody)
//                .addHeader(Constants.COOKIE, StringProcess.getCookieString(serverToken))
//                .build();
//        Call call = okHttpClient.newCall(request);
//        call.enqueue(new Callback() {
//            @Override
//            public void onFailure(Call call, IOException e) {
//                Log.d("http", "http rest api  refreshFirebaseTokenToServer  fail         ");
//                firebaseInstanceIDService.updateServerFirebaseTokenResponse(Constants.HTTP_FAIL);
//
//            }
//
//            @Override
//            public void onResponse(Call call, Response response) throws IOException {
//                Log.d("http", "http rest api  refreshFirebaseTokenToServer  success      ");
//                String receiveMessage = response.body().string();
//                firebaseInstanceIDService.updateServerFirebaseTokenResponse(receiveMessage);
//            }
//        });
//
////        RequestBody requestBody = new FormBody.Builder()
////                .add(Constants.UUID, UUID)
////                .add(Constants.FIREBASE_TOKEN, firebaseToken)
////                .add(Constants.PROJECT, projectName)
////                .add(Constants.USERNAME, username)
////                .add(Constants.PASSWORD, password)
////                .build();
////        Request request = new Request.Builder()
////                .url(Constants.SAVE_MOBILE_INFO_REST_API)
////                .post(requestBody)
////                .addHeader(Constants.COOKIE, StringProcess.getCookieString(serverToken))
////                .build();
////        Call call = okHttpClient.newCall(request);
////        call.enqueue(new Callback() {
////            @Override
////            public void onFailure(Call call, IOException e) {
////                Log.d("http", "http rest api  refreshFirebaseTokenToServer  fail         ");
////                firebaseInstanceIDService.updateServerFirebaseTokenResponse(Constants.HTTP_FAIL);
////            }
////
////            @Override
////            public void onResponse(Call call, Response response) throws IOException {
////                Log.d("http", "http rest api  refreshFirebaseTokenToServer  success  ");
////                String receiveMessage = response.body().string();
////                firebaseInstanceIDService.updateServerFirebaseTokenResponse(receiveMessage);
////            }
////        });
//    }
//
//    public void getTagListByPage(final String projectName, final String start, final String count, final String filters, final TagsInfoListController tagsInfoListController) {
//        String requestUrl = StringProcess.getTagListByPageRestApiUrl(projectName, start, count);
//        RequestBody requestBody = new FormBody.Builder()
//                .add(Constants.FILTERS, filters)
//                .build();
//        Request request = new Request.Builder()
//                .url(requestUrl)
//                .post(requestBody)
//                .addHeader(Constants.COOKIE, StringProcess.getCookieString(serverToken))
//                .build();
//        Log.d("debug", "http      requestUrl         " + requestUrl);
//        Call call = okHttpClient.newCall(request);
//        call.enqueue(new Callback() {
//            @Override
//            public void onFailure(Call call, IOException e) {
//                Log.d("http", "http rest api  getTagListByPage  fail         ");
//                tagsInfoListController.getControlModel().toastString(tagsInfoListController.getControllerLang().INTERNET_SERVER_ERROR);
////                LoginController.sendMobileInfoToServerResponse(Constants.HTTP_FAIL);
//            }
//
//            @Override
//            public void onResponse(Call call, Response response) throws IOException {
//                Log.d("http", "http rest api  getTagListByPage  success  ");
//                String receiveMessage = response.body().string();
//                tagsInfoListController.getTagListByPageResponse(receiveMessage);
////                LoginController.sendMobileInfoToServerResponse(receiveMessage);
//            }
//        });
//    }
//
//    //
//
//    public void getMapListByNode(final String projectName, final String nodeName, final String mapType, final MapListController controller) {
//        Log.d("debug", "Constants.GET_XXX_MAP_LIST_REST_API");
//        String requestUrl = StringProcess.getMapListApiUrl(projectName, nodeName, mapType);
//        Request request = new Request.Builder()
//                .url(requestUrl)
//                .addHeader(Constants.COOKIE, StringProcess.getCookieString(serverToken))
//                .build();
//        Call call = okHttpClient.newCall(request);
//        call.enqueue(new Callback() {
//            @Override
//            public void onFailure(Call call, IOException e) {
//                Log.d("http", "http rest api getMapListByNode  fail         ");
//                controller.getControlModel().toastString(controller.getControllerLang().INTERNET_SERVER_ERROR);
//                controller.getMapListResponse(Constants.HTTP_FAIL);
//            }
//
//            @Override
//            public void onResponse(Call call, Response response) throws IOException {
//                Log.d("http", "http rest api  getMapListByNode  success  ");
//                String receiveMessage = response.body().string();
//                controller.getMapListResponse(receiveMessage);
//            }
//        });
//    }
//
//    public void getMapConfig(final String projectName, final String nodeName, final String mapType, final String mapName, final MapController controller) {
//        Log.d("debug", "Constants.GET_MAP_CONFIG_REST_API");
//
//        String requestUrl = StringProcess.getMapCoinfigApiUrl(projectName, nodeName, mapType, mapName);
//        Log.d("debug", "requestUrl " + requestUrl);
//        Request request = new Request.Builder()
//                .url(requestUrl)
//                .addHeader(Constants.COOKIE, StringProcess.getCookieString(serverToken))
//                .build();
//        Call call = okHttpClient.newCall(request);
//        call.enqueue(new Callback() {
//            @Override
//            public void onFailure(Call call, IOException e) {
//                Log.d("http", "http rest api getMapListByNode  fail         ");
//                controller.getControlModel().toastString(controller.getControllerLang().INTERNET_SERVER_ERROR);
//                controller.getMapConfigResponse(Constants.HTTP_FAIL);
//            }
//
//            @Override
//            public void onResponse(Call call, Response response) throws IOException {
//                Log.d("http", "http rest api  getMapListByNode  success  ");
//                String receiveMessage = response.body().string();
//                controller.getMapConfigResponse(receiveMessage);
//            }
//        });
//    }

    /*
    public void setTagValue2(final String projectName, final String tags, final MapController MapController) {
        RequestBody requestBody = new FormBody.Builder()
                .add(Constants.TAGS_UPPERCASE, tags)
                .build();
        Request request = new Request.Builder()
                .url(StringProcess.addProjectNameToUrl(Constants.SET_TAG_VALUES_REST_API, projectName))
                .post(requestBody)
                .addHeader(Constants.COOKIE, StringProcess.getCookieString(serverToken))
                .build();
        Call call = okHttpClient.newCall(request);
        call.enqueue(new Callback() {
            @Override
            public void onFailure(Call call, IOException e) {
                Log.d("http", "http rest api  setTagValue  fail         ");
            }

            @Override
            public void onResponse(Call call, Response response) throws IOException {
                Log.d("http", "http rest api  setTagValue  success  ");
                String receiveMessage = response.body().string();
                Log.d("http", "http rest api  setTagValue  success   receiveMessage   " + receiveMessage);
                MapController.setTagValueResponse(receiveMessage);
//                controller.alarmAckResponse(receiveMessage);
            }
        });
    }
    */
}