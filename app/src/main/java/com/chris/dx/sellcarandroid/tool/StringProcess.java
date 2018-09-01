package com.chris.dx.sellcarandroid.tool;

import android.util.Log;

import com.chris.dx.sellcarandroid.define.Constants;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.util.Iterator;
import java.util.Locale;
import java.util.Calendar;

/**
 * Created by Chris.Wu on 2016/11/21.
 */

public class StringProcess {
    public static String getCompanyLocalImageFolderPath(String company,String folderName) {
        String result = Constants.COMPANY_PRE_FOLDER_PATH + "/"+company+"/image/"+folderName;
        return result;
    }

    public static String getChangePageURL(String controllerType) {
        String result = "{" + Constants.DOUBLE_QUOTES + "url" + Constants.DOUBLE_QUOTES + ":" + controllerType + "}";
        return result;
    }

    public static void updateUrlPath() {
        Constants.SERVER_IS_EXIST_API = Constants.SERVER_URL + getLocalRestAPI(Constants.SERVER_API_TYPE,Constants.SERVER_IS_EXIST_API);
        Constants.GET_LOCAL_PATH_ALL_API = Constants.SERVER_URL + getLocalRestAPI(Constants.FILE_API_TYPE,Constants.GET_LOCAL_PATH_ALL_API);
        Constants.GET_CARS_INFO_BY_COMPANY_API = Constants.SERVER_URL + getLocalRestAPI(Constants.CAR_API_TYPE,Constants.GET_CARS_INFO_BY_COMPANY_API);
        Constants.GET_CARS_INFO_BY_ID_API = Constants.SERVER_URL + getLocalRestAPI(Constants.CAR_API_TYPE,Constants.GET_CARS_INFO_BY_ID_API);
        Constants.ORDER_TEST_DRIVE_API = Constants.SERVER_URL + getLocalRestAPI(Constants.TEST_DRIVE_API_TYPE,Constants.ORDER_TEST_DRIVE_API);
    }

    public static String getLocalRestAPI(String apiType,String api) {
        return api.substring(api.indexOf("/"+apiType), api.length());
    }

    public static String filter(String str,char key) {
        String result = Constants.EMPTY_STRING;
        for(int i=0;i<str.length();i++){
            if(str.charAt(i)!=key){
                result = result+str.charAt(i);
            }
        }
        return result;
    }

    public static String getLocalPathAllApiUrl(String folderName) {
        return Constants.GET_LOCAL_PATH_ALL_API + "?foldername="+folderName;
    }

    public static String getCarsInfoByCompanyApiUrl(String company) {
        return Constants.GET_CARS_INFO_BY_COMPANY_API + "?company="+company;
    }

    public static String getCarsInfoByIdApiUrl(String id) {
        return Constants.GET_CARS_INFO_BY_ID_API + "?id="+id;
    }

    public static String getJavascriptFunctionStringBy1WayStringArrayString(String stringArray, String stringName, String functionName) {
        String arg = "{" + Constants.DOUBLE_QUOTES + stringName + Constants.DOUBLE_QUOTES + ":" + stringArray + "}";
        String result = Constants.JAVASCRIPT + ":" + Constants.JAVASCRIPT_PARAMETER_FOR_ANDROID + "." + functionName + "('" + arg + "')";
        return result;
    }

        public static String getJavascriptFunctionStringByArrayStringAndString(String arrayStringName, String arrayStringValue, String stringName, String stringValue, String functionName) {
        String arg = "{"
                + Constants.DOUBLE_QUOTES + arrayStringName + Constants.DOUBLE_QUOTES + ":" + arrayStringValue + ","
                + Constants.DOUBLE_QUOTES + stringName + Constants.DOUBLE_QUOTES + ":" + Constants.DOUBLE_QUOTES + stringValue + Constants.DOUBLE_QUOTES
                + "}";
        String result = Constants.JAVASCRIPT + ":" + Constants.JAVASCRIPT_PARAMETER_FOR_ANDROID + "." + functionName + "('" + arg + "')";
        return result;
    }

    // getJavascriptFunctionString
    public static String getJavascriptFunctionString(String arg, String functionName) {
        String result = Constants.JAVASCRIPT + ":" + Constants.JAVASCRIPT_PARAMETER_FOR_ANDROID + "." + functionName + "('" + arg + "')";
        return result;
    }

        public static String getJavascriptFunctionStringByString(String stringName, String stringValue, String functionName) {
        String arg = "{" + Constants.DOUBLE_QUOTES + stringName + Constants.DOUBLE_QUOTES + ":" + Constants.DOUBLE_QUOTES + stringValue + Constants.DOUBLE_QUOTES + "}";
        String result = Constants.JAVASCRIPT + ":" + Constants.JAVASCRIPT_PARAMETER_FOR_ANDROID + "." + functionName + "('" + arg + "')";
        return result;
    }

        public static String getJavascriptFunctionStringByString(String stringName1, String stringValue1,String stringName2, String stringValue2, String functionName) {
            String arg = "{"
                    + Constants.DOUBLE_QUOTES + stringName1 + Constants.DOUBLE_QUOTES + ":" + Constants.DOUBLE_QUOTES + stringValue1 + Constants.DOUBLE_QUOTES + ","
                    + Constants.DOUBLE_QUOTES + stringName2 + Constants.DOUBLE_QUOTES + ":" + Constants.DOUBLE_QUOTES + stringValue2 + Constants.DOUBLE_QUOTES
                    + "}";
        String result = getJavascriptFunctionString(arg, functionName);
        return result;
    }

//    public static String getModifiedDialogTagName(String tagName) {
//        if (tagName.length() >= Constants.TAG_NAME_MODIFIED_LENGTH_DIALOG) {
//            return tagName.substring(0, Constants.TAG_NAME_MODIFIED_LENGTH_DIALOG) + "...";
//        } else {
//            return tagName;
//        }
//    }
//
//    public static String getSystemLang(String langString) {
//        if (langString.indexOf("zh") == 0) {
//            if (Locale.getDefault().getCountry().equals("CN")) {
//                return Constants.ZH_CN_LANGUAGE;
//            } else if (Locale.getDefault().getCountry().equals("TW")) {
//                return Constants.ZH_TW_LANGUAGE;
//            } else {
//                return Constants.EN_LANGUAGE;
//            }
//        } else if (langString.indexOf("ja") == 0) {
//            return Constants.JA_LANGUAGE;
//        }
//        if (langString.indexOf("ko") == 0) {
//            return Constants.KO_LANGUAGE;
//        } else if (langString.indexOf("fr") == 0) {
//            return Constants.FR_LANGUAGE;
//        } else {
//            return Constants.EN_LANGUAGE;
//        }
//    }
//
//    public static String getAlarmAckTagString(String tagList) {
//        if (tagList.length() > 4) {
//            String tmp = tagList.substring(1, tagList.length() - 1);
//            tmp = tmp.substring(tmp.indexOf(":"));
//            tmp = tmp.substring(1, tmp.length() - 1);
//            String result = "[{" + Constants.DOUBLE_QUOTES + "Name" + Constants.DOUBLE_QUOTES + ":" + tmp + "}]";
//            return result;
//        } else {
//            return Constants.EMPTY_STRING;
//        }
//    }
//
//    public static String addProjectNameToUrl(String url, String projectName) {
//        String result = url + "/" + projectName;
//        return result;
//    }
//
//    public static String getRTrendGroupIdUrl(String url, String projectName, String nodeName) {
//        String result = url + "/" + projectName + "/" + nodeName;
//        return result;
//    }
//
//    public static String getRTrendConfigUrl(String url, String projectName, String nodeName, String trendGroupId) {
//        String result = url + "/" + projectName + "/" + nodeName + "/" + trendGroupId;
//        return result;
//    }
//
//    public static String getTagsDataRestApiUrl(final String projectName) {
//        return Constants.GET_TAGS_DATA_REST_API + "/" + projectName ;
//    }
//
//    public static String getChangePageURL(String controllerType) {
//        String result = "{" + Constants.DOUBLE_QUOTES + "url" + Constants.DOUBLE_QUOTES + ":" + controllerType + "}";
//        return result;
//    }
//
//    public static String getCookieString(String serverToken) {
//        return "WDT=" + serverToken;
//    }
//
//    public static String getTagListByPageRestApiUrl(final String projectName, final String start, final String count) {
//        return Constants.GET_TAG_LIST_BY_PAGE_REST_API + "/" + projectName + "/" + start + "/" + count;
//    }
//
//    public static String getAlarmSummaryLogSocketMsg(String projectName, String start, String count, String filters, String sort) {
//        String result = "{" +
//                Constants.DOUBLE_QUOTES + "projectName1" + Constants.DOUBLE_QUOTES + ":" + Constants.DOUBLE_QUOTES + projectName + Constants.DOUBLE_QUOTES + "," +
//                Constants.DOUBLE_QUOTES + "Widget" + Constants.DOUBLE_QUOTES + ":" + Constants.DOUBLE_QUOTES + "alarmSummaryAndCount" + Constants.DOUBLE_QUOTES + "," +
//                Constants.DOUBLE_QUOTES + "Widgetlid" + Constants.DOUBLE_QUOTES + ":" + Constants.DOUBLE_QUOTES + "ALARM_SUMMARY_WIDGETLID" + Constants.DOUBLE_QUOTES + "," +
//                Constants.DOUBLE_QUOTES + "widPushinterval" + Constants.DOUBLE_QUOTES + ":" + Constants.DOUBLE_QUOTES + "0" + Constants.DOUBLE_QUOTES + "," +
//                Constants.DOUBLE_QUOTES + "count" + Constants.DOUBLE_QUOTES + ":" + Constants.DOUBLE_QUOTES + count + Constants.DOUBLE_QUOTES + "," +
//                Constants.DOUBLE_QUOTES + "start" + Constants.DOUBLE_QUOTES + ":" + Constants.DOUBLE_QUOTES + start + Constants.DOUBLE_QUOTES +
//                "}";
//        return result;
//    }
//
//    public static String getAlarmLogSocketMsg(String projectName, String start, String count, String nodeName) {
//        String result = "{" +
//                Constants.DOUBLE_QUOTES + "projectName1" + Constants.DOUBLE_QUOTES + ":" + Constants.DOUBLE_QUOTES + projectName + Constants.DOUBLE_QUOTES + "," +
//                Constants.DOUBLE_QUOTES + "Widget" + Constants.DOUBLE_QUOTES + ":" + Constants.DOUBLE_QUOTES + "alarmLogAndCount" + Constants.DOUBLE_QUOTES + "," +
//                Constants.DOUBLE_QUOTES + "Widgetlid" + Constants.DOUBLE_QUOTES + ":" + Constants.DOUBLE_QUOTES + "ALARM_WIDGETLID" + Constants.DOUBLE_QUOTES + "," +
//                Constants.DOUBLE_QUOTES + "widPushinterval" + Constants.DOUBLE_QUOTES + ":" + Constants.DOUBLE_QUOTES + "0" + Constants.DOUBLE_QUOTES + "," +
//                Constants.DOUBLE_QUOTES + "count" + Constants.DOUBLE_QUOTES + ":" + Constants.DOUBLE_QUOTES + count + Constants.DOUBLE_QUOTES + "," +
//                Constants.DOUBLE_QUOTES + "nodeName" + Constants.DOUBLE_QUOTES + ":" + Constants.DOUBLE_QUOTES + nodeName + Constants.DOUBLE_QUOTES + "," +
//                Constants.DOUBLE_QUOTES + "start" + Constants.DOUBLE_QUOTES + ":" + Constants.DOUBLE_QUOTES + start + Constants.DOUBLE_QUOTES +
//                "}";
//        return result;
//    }
//
//    public static String getActionLogSocketMsg(String projectName, String start, String count, String nodeName) {
//        String result = "{" +
//                Constants.DOUBLE_QUOTES + "projectName1" + Constants.DOUBLE_QUOTES + ":" + Constants.DOUBLE_QUOTES + projectName + Constants.DOUBLE_QUOTES + "," +
//                Constants.DOUBLE_QUOTES + "Widget" + Constants.DOUBLE_QUOTES + ":" + Constants.DOUBLE_QUOTES + "actionLogAndCount" + Constants.DOUBLE_QUOTES + "," +
//                Constants.DOUBLE_QUOTES + "Widgetlid" + Constants.DOUBLE_QUOTES + ":" + Constants.DOUBLE_QUOTES + "ACTION_WIDGETLID" + Constants.DOUBLE_QUOTES + "," +
//                Constants.DOUBLE_QUOTES + "widPushinterval" + Constants.DOUBLE_QUOTES + ":" + Constants.DOUBLE_QUOTES + "0" + Constants.DOUBLE_QUOTES + "," +
//                Constants.DOUBLE_QUOTES + "count" + Constants.DOUBLE_QUOTES + ":" + Constants.DOUBLE_QUOTES + count + Constants.DOUBLE_QUOTES + "," +
//                Constants.DOUBLE_QUOTES + "nodeName" + Constants.DOUBLE_QUOTES + ":" + Constants.DOUBLE_QUOTES + nodeName + Constants.DOUBLE_QUOTES + "," +
//                Constants.DOUBLE_QUOTES + "start" + Constants.DOUBLE_QUOTES + ":" + Constants.DOUBLE_QUOTES + start + Constants.DOUBLE_QUOTES +
//                "}";
//        return result;
//    }
//
//    public static String getNodeStatusSocketMsg(String projectName) {
//        String result = "{" +
//                Constants.DOUBLE_QUOTES + "projectName1" + Constants.DOUBLE_QUOTES + ":" + Constants.DOUBLE_QUOTES + projectName + Constants.DOUBLE_QUOTES +
//                "}";
//        return result;
//    }
//
//    public static String getSingleValueSocketMsg(String projectName, String tagsArray) {
//        String result = "{" +
//                Constants.DOUBLE_QUOTES + "projectName1" + Constants.DOUBLE_QUOTES + ":" + Constants.DOUBLE_QUOTES + projectName + Constants.DOUBLE_QUOTES + "," +
//                Constants.DOUBLE_QUOTES + "Widget" + Constants.DOUBLE_QUOTES + ":" + Constants.DOUBLE_QUOTES + "SingleValue" + Constants.DOUBLE_QUOTES + "," +
//                Constants.DOUBLE_QUOTES + "Widgetlid" + Constants.DOUBLE_QUOTES + ":" + Constants.DOUBLE_QUOTES + "SingleValue" + Constants.DOUBLE_QUOTES + "," +
//                Constants.DOUBLE_QUOTES + "widPushinterval" + Constants.DOUBLE_QUOTES + ":" + Constants.DOUBLE_QUOTES + "5000" + Constants.DOUBLE_QUOTES + "," +
//                Constants.DOUBLE_QUOTES + "intervalWPush" + Constants.DOUBLE_QUOTES + ":" + Constants.DOUBLE_QUOTES + "N" + Constants.DOUBLE_QUOTES + "," +
//                Constants.DOUBLE_QUOTES + "Tags" + Constants.DOUBLE_QUOTES + ":" + tagsArray +
//                "}";
//        return result;
//    }
//
//    public static String getSystemDataSocketMsg(String projectName) {
//        String result = "{" +
//                Constants.DOUBLE_QUOTES + "projectName1" + Constants.DOUBLE_QUOTES + ":" + Constants.DOUBLE_QUOTES + projectName + Constants.DOUBLE_QUOTES +
//                "}";
//        return result;
//    }
//
//    public static String getRealTrendsSocketMsg(String projectName, String interval, String records, String tags) {
//        String result = "{" +
//                Constants.DOUBLE_QUOTES + "projectName1" + Constants.DOUBLE_QUOTES + ":" + Constants.DOUBLE_QUOTES + projectName + Constants.DOUBLE_QUOTES + "," +
//                Constants.DOUBLE_QUOTES + "Widget" + Constants.DOUBLE_QUOTES + ":" + Constants.DOUBLE_QUOTES + "realTrends" + Constants.DOUBLE_QUOTES + "," +
//                Constants.DOUBLE_QUOTES + "Widgetlid" + Constants.DOUBLE_QUOTES + ":" + Constants.DOUBLE_QUOTES + "RealTrends" + Constants.DOUBLE_QUOTES + "," +
//                Constants.DOUBLE_QUOTES + "widPushinterval" + Constants.DOUBLE_QUOTES + ":" + Constants.DOUBLE_QUOTES + interval + Constants.DOUBLE_QUOTES + "," +
//                Constants.DOUBLE_QUOTES + "intervalWPush" + Constants.DOUBLE_QUOTES + ":" + Constants.DOUBLE_QUOTES + "Y" + Constants.DOUBLE_QUOTES + "," +
//                Constants.DOUBLE_QUOTES + "Tags" + Constants.DOUBLE_QUOTES + ":" + tags + "," +
//                Constants.DOUBLE_QUOTES + "timezoneOffset" + Constants.DOUBLE_QUOTES + ":" + (Calendar.getInstance().get(Calendar.ZONE_OFFSET) + Calendar.getInstance().get(Calendar.DST_OFFSET)) / (-60 * 1000) + "," +
//                Constants.DOUBLE_QUOTES + "params" + Constants.DOUBLE_QUOTES + ":" + "[" + interval + "," + records + "]" +
//                "}";
//        return result;
//    }
//
//    public static String getQueryUserWhereStringByPK(User user) {
//        return Constants.USER_USERNAME_SQL + "='" + user.getUsername()
//                + "' AND " + Constants.USER_PASSWORD_SQL + "='" + user.getPassword()
//                + "' AND " + Constants.USER_PROJECT_NAME_SQL + "='" + user.getProjectName()
//                + "' AND " + Constants.USER_SERVER_IP_SQL + "='" + user.getServerIP() + "' ";
//    }
//
//    public static String getQuerySystemInfoWhereStringByPK(SystemInfo systemInfo) {
//        return Constants.ID_SQL + "='" + systemInfo.getId() + "'";
//    }
//
//    public static String getQueryProjectWhereStringByPK(Project project) {
//        return Constants.PROJECT_IP_SQL + "='" + project.getIP()
//                + "' AND " + Constants.PROJECT_NAME_SQL + "='" + project.getProjectName() + "' ";
//    }
//
//    public static String getQueryServerWhereStringByPK(Server server) {
//        return Constants.SERVER_IP_SQL + "='" + server.getIP() + "' ";
//    }
//
//
//    public static String getJavascriptFunctionStringBy1WayArray(Object[] array, String arrayName, String functionName) {
//        String arg = getJsonStringBy1WayArray(arrayName, array);
////        String result = Constants.JAVASCRIPT + ":" + Constants.JAVASCRIPT_PARAMETER_FOR_ANDROID + "." + functionName + "('" + arg + "')";
//        String result = getJavascriptFunctionString(arg, functionName);
//        return result;
//    }
//
//    public static String getJavascriptFunctionStringBy1WayJsonArray(JSONObject[] jsonArray, String arrayName, String functionName) {
//        String arg = "{"
//                + Constants.DOUBLE_QUOTES + arrayName + Constants.DOUBLE_QUOTES + ":"
//                + getJsonArray2StringForJavascript(jsonArray)
//                + "}";
////        String result = Constants.JAVASCRIPT + ":" + Constants.JAVASCRIPT_PARAMETER_FOR_ANDROID + "." + functionName + "('" + arg + "')";
//        String result = getJavascriptFunctionString(arg, functionName);
//        return result;
//    }
//
//    public static String getJavascriptFunctionStringBy1WayStringArrayString(String stringArray, String stringName, String functionName) {
//        String arg = "{" + Constants.DOUBLE_QUOTES + stringName + Constants.DOUBLE_QUOTES + ":" + stringArray + "}";
//        String result = Constants.JAVASCRIPT + ":" + Constants.JAVASCRIPT_PARAMETER_FOR_ANDROID + "." + functionName + "('" + arg + "')";
//        return result;
//    }
//
//    public static String getJavascriptFunctionStringByString(String stringName, String stringValue, String functionName) {
//        String arg = "{" + Constants.DOUBLE_QUOTES + stringName + Constants.DOUBLE_QUOTES + ":" + Constants.DOUBLE_QUOTES + stringValue + Constants.DOUBLE_QUOTES + "}";
//        String result = Constants.JAVASCRIPT + ":" + Constants.JAVASCRIPT_PARAMETER_FOR_ANDROID + "." + functionName + "('" + arg + "')";
//        return result;
//    }
//
//    public static String getJavascriptFunctionStringByArrayStringAndString(String arrayStringName, String arrayStringValue, String stringName, String stringValue, String functionName) {
//        String arg = "{"
//                + Constants.DOUBLE_QUOTES + arrayStringName + Constants.DOUBLE_QUOTES + ":" + arrayStringValue + ","
//                + Constants.DOUBLE_QUOTES + stringName + Constants.DOUBLE_QUOTES + ":" + Constants.DOUBLE_QUOTES + stringValue + Constants.DOUBLE_QUOTES
//                + "}";
//        String result = Constants.JAVASCRIPT + ":" + Constants.JAVASCRIPT_PARAMETER_FOR_ANDROID + "." + functionName + "('" + arg + "')";
//        return result;
//    }
//
//    // getJavascriptFunctionString
//    public static String getJavascriptFunctionString(String arg, String functionName) {
//        String result = Constants.JAVASCRIPT + ":" + Constants.JAVASCRIPT_PARAMETER_FOR_ANDROID + "." + functionName + "('" + arg + "')";
//        return result;
//    }
//
//
//    public static String getJavascriptFunctionStringByJson(JSONObject jsonObject, String jsonName, String functionName) {
//        String arg = "{" + Constants.DOUBLE_QUOTES + jsonName + Constants.DOUBLE_QUOTES + ":" + getJson2StringForJavascript(jsonObject) + "}";
//        String result = getJavascriptFunctionString(arg, functionName);
//        return result;
//    }
//
//    public static String getJavascriptFunctionStringByJson(JSONObject jsonObject, String functionName) {
//        String arg = getJson2StringForJavascript(jsonObject);
//        String result = getJavascriptFunctionString(arg, functionName);
//        return result;
//    }
//
//    public static String getJsonStringBy1WayArray(String name, Object[] array) {
//        String result = "{" + Constants.DOUBLE_QUOTES + name + Constants.DOUBLE_QUOTES + ":[";
//        for (int i = 0; i < array.length; i++) {
//            if (i != 0)
//                result = result + ",";
//            result = result + Constants.DOUBLE_QUOTES + array[i].toString() + Constants.DOUBLE_QUOTES;
//        }
//        result = result + "]}";
//        return result;
//    }
//
//    public static String getJsonArray2StringForJavascript(JSONObject[] jsonArray) {
//        String result = "[";
//        for (int i = 0; i < jsonArray.length; i++) {
//            if (i < jsonArray.length - 1)
//                result = result + getJson2StringForJavascript(jsonArray[i]) + ",";
//            else
//                result = result + getJson2StringForJavascript(jsonArray[i]);
//        }
//        result = result + "]";
//        return result;
//    }
//
//    public static String getJson2StringForJavascript(JSONObject jsonObject) {
//        String result = "{";
//        Iterator<?> keys = jsonObject.keys();
//        while (keys.hasNext()) {
//            String key = (String) keys.next();
//            if (keys.hasNext()) {
//                try {
//                    result = result + Constants.DOUBLE_QUOTES + key + Constants.DOUBLE_QUOTES + ":" + Constants.DOUBLE_QUOTES + jsonObject.getString(key) + Constants.DOUBLE_QUOTES + ",";
//                } catch (JSONException e) {
//                }
//            } else {
//                try {
//                    result = result + Constants.DOUBLE_QUOTES + key + Constants.DOUBLE_QUOTES + ":" + Constants.DOUBLE_QUOTES + jsonObject.getString(key) + Constants.DOUBLE_QUOTES;
//                } catch (JSONException e) {
//                }
//            }
//        }
//        result = result + "}";
//        return result;
//    }
//

//
//    public static String getRestApiUrl(String ip, String restApiUrl) {
//        return ip + getLocalRestAPI(restApiUrl);
//    }
//

//
//    public static String getSubscribeNotifyOffUrl(String domainUrl, String deviceID, String deviceType) {
//        return domainUrl + "?deviceID=" + deviceID + "&deviceType=" + deviceType;
//    }
////    public static JSONObject getJsonStringBy1WayArray2(String name, String[] array)
////    {
////        JSONObject jsonObject=new JSONObject();
////        try {
////            jsonObject.put(name,array);
////        }catch (JSONException e){}
////        return jsonObject;
////    }
//
//    //
//
//    public static String getMapListApiUrl(String programName, String nodeName, String mapType) {
//        if (mapType.equals("b")) {
//            return Constants.GET_BAIDU_MAP_LIST_REST_API + "/" + programName + "/" + nodeName;
//        } else {
//            return Constants.GET_GOOGLE_MAP_LIST_REST_API + "/" + programName + "/" + nodeName;
//        }
//    }
//
//    public static String getMapCoinfigApiUrl(String programName, String nodeName, String mapType, String mapName) {
//        if (mapType.equals("b")) {
//            return Constants.GET_BAIDU_MAP_CONFIG_REST_API + "/" + programName + "/" + nodeName + "/" + mapName;
//        } else {
//            return Constants.GET_GOOGLE_MAP_CONFIG_REST_API + "/" + programName + "/" + nodeName + "/" + mapName;
//        }
//    }


}
