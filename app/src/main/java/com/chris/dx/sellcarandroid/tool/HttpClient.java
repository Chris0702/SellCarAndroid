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

    public void checkServerIsExist(final JavaScriptInterface javaScriptInterface) {
        Log.d("debug", "http  rest api getWebAccessProjectList  ");
        Request request = new Request.Builder()
                .url(Constants.SERVER_IS_EXIST_API)
                .build();
        Call call = okHttpClient.newCall(request);
        call.enqueue(new Callback() {
            @Override
            public void onFailure(Call call, IOException e) {
                javaScriptInterface.checkServerIsExistResponse(false,Constants.EMPTY_STRING);
            }

            @Override
            public void onResponse(Call call, Response response) throws IOException {
                String receiveMessage = response.body().string();
                Log.d("http", receiveMessage);
                javaScriptInterface.checkServerIsExistResponse(true,receiveMessage);
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

    public void sendMessage2SupportLine(final String lineAuth,final String message, final JavaScriptInterface javaScriptInterface) {
        RequestBody requestBody = new FormBody.Builder()
                .add(Constants.LINE_MESSAGE_NAME, message)
                .build();
        Request request = new Request.Builder()
                .url(Constants.LINE_NOTIFY_URL)
                .post(requestBody)
                .addHeader(Constants.LINE_AUTH_NAME, Constants.LINE_SUPPORT_AUTH)
                .build();
        Call call = okHttpClient.newCall(request);
        call.enqueue(new Callback() {
            @Override
            public void onFailure(Call call, IOException e) {
                Log.d("http", "http rest api  sendLineMessage  fail         "+e);
                javaScriptInterface.sendMessage2SupportLineResponse(false,Constants.EMPTY_STRING);
            }

            @Override
            public void onResponse(Call call, Response response) throws IOException {
                Log.d("http", "http rest api  sendLineMessage  success  ");
                String receiveMessage = response.body().string();
                Log.d("http", "http rest api  sendLineMessage  success   receiveMessage   " + receiveMessage);
                javaScriptInterface.sendMessage2SupportLineResponse(true,receiveMessage);
            }
        });
    }

    public void updateServerUrl(final JavaScriptInterface javaScriptInterface) {
        Log.d("debug", "http  rest api getLocalPathAll  ");
        String requestUrl = Constants.GET_SERVER_URL_REST_API;
        Log.d("debug", requestUrl);
        Request request = new Request.Builder()
                .url(requestUrl)
                .build();
        Call call = okHttpClient.newCall(request);
        call.enqueue(new Callback() {
            @Override
            public void onFailure(Call call, IOException e) {
//                controller.checkServerIsExistResponse(false,Constants.EMPTY_STRING);
                javaScriptInterface.updateServerUrlResponse(false,Constants.EMPTY_STRING);
            }

            @Override
            public void onResponse(Call call, Response response) throws IOException {
                String receiveMessage = response.body().string();
                Log.d("http", receiveMessage);
                javaScriptInterface.updateServerUrlResponse(true,receiveMessage);
            }
        });
    }

}