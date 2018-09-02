package com.chris.dx.sellcarandroid.define;

/**
 * Created by Chris.Wu on 2016/10/21.
 */
public class Constants {
//    public static final String SERVER_URL = "http://172.16.12.122:3000";
//        public static  String SERVER_URL = "http://192.168.0.11:3000";
//    public static String SERVER_URL = "http://172.18.2.42:81";
//public static final String SERVER_URL = "http://172.18.2.42:3000";
//public static final String SERVER_URL = "http://54.249.42.33:81";
    public static  String SERVER_URL = "";
    public static final String GET_SERVER_URL_REST_API = "https://raw.githubusercontent.com/Chris0702/sellCarServer/master/lib/setting/server_url.txt";
    public static final String VERSION_CONTENT = "1.0.0";

    //line
    public static final String LINE_NOTIFY_URL = "https://notify-api.line.me/api/notify";
    public static final String LINE_SUPPORT_AUTH = "Bearer BVcrSpv8eNjk4KjErJvAE1KjvFNc6X2kcI30u0njaNf";
    public static final String LINE_AUTH_NAME = "Authorization";
    public static final String LINE_MESSAGE_NAME = "message";

    public static final String PLEASE_CHECK_NETWORK = "請檢察網際網路是否正常";
    public static final String SERVER_ABMORMAL = "平台維護中請稍後使用";
    public static final String SERVER_ABMORMAL_SUPPORT = "server 異常請快去檢查!!!";
    public static final String SERVER_GIT_URL_ABMORMAL_SUPPORT = "github 異常，抓取不到 server url，請快去檢查!!!";


    public static final boolean PUSH_MESSAGE = true;
    public static boolean SHOW_PUSH_MESSAGE_DIALOG = true;
    public static final String BODY_PUSH_MESSAGE = "body";
    public static final String TITLE_PUSH_MESSAGE = "title";
    public static final String DIALOG_TITLE_MESSAGE = "dialogTitle";
    public static final String DESCRIPTION_PUSH_MESSAGE = "description";

    //socket
    public static final String SOCKET_PATH = "/WADashboard/socket.io";
    public static final String ACTION_LOG_NSP = "/actionlog";
    public static final String ALARM_LOG_NSP = "/alarmlog";
    public static final String ALARM_SUMMARY_LOG_NSP = "/alarmSummary";
    public static final String DATA_NSP = "/data";
    public static final String NODE_STATUS_NSP = "/nodeStatus";
    public static final String SYSTEM_DATA_NSP = "/systemData";
    public static final String SOCKET_SUBSCRIBE_EVENT = "subscribe";
    public static final String SOCKET_STREAM_EVENT = "stream";
    public static final String SOCKET_AUTHENTICATION_EVENT = "authentication";
    public static final String SOCKET_AUTHENTICATED_EVENT = "authenticated";

    //web url
    public static final String HOME_WEB_URL = "file:///android_asset/views/home.html";
    public static final String POSTER_WEB_URL = "file:///android_asset/views/poster.html";
    public static final String PRICE_WEB_URL = "file:///android_asset/views/price.html";
    public static final String TEST_DRIVE_WEB_URL = "file:///android_asset/views/testDrive.html";
    public static final String REFERENCE_WEB_URL = "file:///android_asset/views/reference.html";
    //javascript
    public static final String ANDROID_PARAMETER_FOR_JAVASCRIPT = "appJsInterface";
    public static final String JAVASCRIPT_PARAMETER_FOR_ANDROID = "jsAppInterface";

    public static final String SET_IMAGE_ALL_JAVASCRIPT = "setImageAll";
    public static final String SET_CARS_INFO_JAVASCRIPT = "setCarsInfo";




    public static final String SET_MERGE_IMAGE_ALL_JAVASCRIPT = "setMergeImageAll";
    public static final String SET_MERGE_IMAGE_RESULT_JAVASCRIPT = "setMergeImageResult";


    public static final String INSERT_IP_HISTORY_LIST_JAVASCRIPT = "insertIpHistoryList";
    public static final String INSERT_ACCOUNT_HISTORY_LIST_JAVASCRIPT = "insertAccountHistoryList";
    public static final String INSERT_PROJECT_LIST_JAVASCRIPT = "insertProjectList";
    public static final String INSERT_FUNCTION_LIST_JAVASCRIPT = "insertFunctionList";
    public static final String INSERT_ALARM_SUMMARY_JAVASCRIPT = "insertAlarmSummary";
    public static final String CB_ACCOUNT_LOGIN_JAVASCRIPT = "cbAccountLogin";
    public static final String INSERT_NODE_LIST_JAVASCRIPT = "insertNodeList";
    public static final String INSERT_R_TREND_ID_JAVASCRIPT = "insertRTrendId";
    public static final String INSERT_R_TREND_CONFIG_JAVASCRIPT = "insertRTrendConfig";
    public static final String INSERT_ALARM_LOG_JAVASCRIPT = "insertAlarmLog";
    public static final String INSERT_ACTION_LOG_JAVASCRIPT = "insertActionLog";
    public static final String INSERT_REAL_TIME_TAG_VALUES_JAVASCRIPT = "insertRealTimeTagValues";
    public static final String INSERT_NODE_STATUS_JAVASCRIPT = "insertNodeStatus";
    public static final String ALARM_ACK_STATUS_JAVASCRIPT = "alarmAckStatus";
    public static final String ALARM_ACK_ALL_STATUS_JAVASCRIPT = "alarmAckAllStatus";
    public static final String INSERT_TAGS_LIST_JAVASCRIPT = "insertTagsList";
    public static final String INSERT_TAG_VALUE_JAVASCRIPT = "insertTagValue";
    public static final String INSERT_TAGS_DATA_JAVASCRIPT = "insertTagsData";

    public static final String INSERT_LANGUAGE_JAVASCRIPT ="insertLanguage";
    public static final String INSERT_LOCAL_STORAGE_MEM_All_JAVASCRIPT ="insertLocalStorageMemAll";
    public static final String INSERT_LOCAL_STORAGE_MEM_JAVASCRIPT ="insertLocalStorageMem";
    public static final String INSERT_VERSION_JAVASCRIPT ="insertVersion";

    public static final String INSERT_MAP_LIST_BY_NODE_JAVASCRIPT = "insertMapListByNode";
    public static final String INSERT_MAP_CONFIG_JAVASCRIPT = "insertMapConfig";

    //dialog
    public static final String ALARM_SUMMARY_TITLE_DIALOG = "Alarm";
    public static final String ALARM_SUMMARY_CLOSE_BUTTON_DIALOG = "Close";
    public static final String ALARM_SUMMARY_VIEW_BUTTON_DIALOG = "View";
    public static final int TAG_NAME_MODIFIED_LENGTH_DIALOG = 8;


    //baidu
    public static final String BAIDU_API_KEY = "PFPrBXtPvGpydK0gOfz2yBl1";

    //permissions
    public static final int SYSTEM_ALERT_WINDOW_PERMISSIONS_REQUEST_CODE = 0;
    public static final int WRITE_EXTERNAL_STORAGE_PERMISSIONS_REQUEST_CODE = 1;

    //folderName
    public static final String MERGE_IMAGE_FOLDER = "mergeImage";


    //folderPath
    public static final String COMPANY_PRE_FOLDER_PATH = "resource/company";


    //util
    public static final String ORDER_TEST_DRIVE_SUCCESS="預約試乘成功，稍後有專人聯繫您。";
    public static final String ORDER_TEST_DRIVE_FAIL="預約試乘失敗，請再試一次。";
    public static final String ORDER_TEST_DRIVE_INPUT_FORMAT_ERROR="輸入格式錯誤";
    public static final int PHOTO = 99;
    public static final int BITMAP_COMPRESS_RATIO = 30;
    public static final String SERVER_URL_STRING="serverUrl";
    public static final String IMAGE_ARRAY="imgArr";
    public static final String CARS_INFO="carsInfo";
    public static final String OPEN_BRACE = "{";
    public static final String CLOSE_BRACE = "}";
    public static final String TOKEN = "token";
    public static final String RESULT_REST_API = "resStatus";
    public static final String RES_STRING_REST_API = "resString";
    public static final String ZERO = "0";
    public static final String ONE = "1";
    public static final String HTTP = "http:";
    public static final String HTTPS = "https:";
    public static final String SLASH = "//";
    public static final String EMPTY_STRING = "";
    public static final String IP = "ip";
    public static final String USERNAME = "username";
    public static final String ACCOUNT = "account";
    public static final String PASSWORD = "password";
    public static final String REMEMBER = "remember";
    public static final String TYPE = "type";
    public static final String PROJECT_NAME = "projectName";
    public static final String PROJECT_NAME_1 = "projectName1";
    public static final String PROJECT = "project";
    public static final String TRUE_STRING = "true";
    public static final String FALSE_STRING = "false";
    public static final String FIREBASE_TOKEN = "firebaseToken";
    public static final String DOUBLE_QUOTES="\"";
    public static final String JAVASCRIPT="javascript";
    public static final String IP_LIST="ipList";
    public static final String PROJECT_LIST="projectList";
    public static final String ACCOUNT_LIST="accountList";
    public static final String FUNCTION_LIST="funcList";
    public static final String HTTP_FAIL="{"+DOUBLE_QUOTES+RESULT_REST_API+DOUBLE_QUOTES+":"+ONE+"}";
    public static final String URL="url";
    public static final String FAVORITE_CAR="favoriteCar";
    public static final String START="start";
    public static final String COUNT="count";
    public static final String FILTERS="filters";
    public static final String SORT="sort";
    public static final String COOKIE="Cookie";
    public static final String STATUS = "status";
    public static final String STATUS_OK = "200";
    public static final String SERVER_TOKEN_TITLE="WDT=";
    public static final String SEMICOLON=";";
    public static final String NODE_LISTS="nodeLists";
    public static final String TREND_LIST="trendList";
    public static final String TREND_GROUR_ID="trendGroupId";
    public static final String TREND_CONFIG="trendConfig";
    public static final String MERGE_IMAGE_ARRAY="mergeImgArr";
    public static final String MERGE_IMAGE_ARRAY_S="mergeImgArr[]";
    public static final String IMAGE_BYTE="imageByte";
    public static final String TARGET_IMAGE="targetImg";
    public static final String RESULT="result";


    public static final String FOLDER_NAME="folderName";

    public static final String NAME="name";
    public static final String COMPANY="company";
    public static final String PHONE="phone";
    public static final String ADDRESS="address";
    public static final String PAYMENT_TYPE="payment_type";
    public static final String CAR_NAME="car_name";
    public static final String CAR_COMPANY="car_company";
    public static final String CAR_VERSION="car_version";
    public static final String CAR_COLOR="car_color";
    public static final String HOPE_TIME="hopeTime";

    public static final String COMPANY_TYPE="companyType";

    public static final char BACKSLASH_CHAR='\\';


    public static final String NODE_NAME="nodeName";
    public static final String TAGS_LIST="tagsList";
    public static final String UUID="UUID";
    public static final String DATA = "data";
    public static final String TOTAL_COUNT ="totalCount";
    public static final String TAGS_LOWERCASE ="tags";
    public static final String TAGS_UPPERCASE ="Tags";
    public static final String TAG_INFOS ="tagInfos";
    public static final String TAGS_DATA ="tagsData";
    public static final String ENPTY_ARRAY_STRING="[]";
    public static final String NOTIFICATION="notification";
    public static final String IS_SCREEN_ON="isScreenOn";
    public static final String SCREEN_ON_STRING = "bright";
    public static final String LANG = "lang";
    public static final String LANGUAGE="language";
    public static final String ANDROID="Android";
    public static final String BAIDU_NOTIFICATION_CHANNELID="baiduNotificationChannelId";
    public static final String KEY="key";
    public static final String VALUE="value";
    public static final String DEVICE_ID="deviceID";
    public static final String DEVICE_TYPE="deviceType";
    public static final String IS_NOTIFY="isNotify";
    public static final String APP_TYPE="appType";
    public static final String SCADA="scada";
    public static final String APNS_TOKEN="apnsToken";
    public static final String PUSH_MESSAGE_TYPE="pushMessageType";
    public static final String INTERVAL="Interval";
    public static final String RECORDS="Records";
    public static final String VERSION ="version";

    public static final String G_MAP = "map";

    public static final String MAP_LIST = "mapList";
    public static final String MAP_TYPE = "mapType";
    public static final String MAP_NAME = "mapName";

    //time
    public static final int ONE_SECOND_TIME=1000;
    public static final int SCROLL_DELAY_TIME=250;

    //page
    public static final String CONTROL_PAGE_NAME = "controller";

    public static final String HOME_PAGE_NAME = "homePage";
    public static final String POSTER_PAGE_NAME = "posterPage";
    public static final String PRICE_PAGE_NAME = "pricePage";
    public static final String TEST_DRIVE_PAGE_NAME = "testDrivePage";
    public static final String REFERENCE_PAGE_NAME = "referencePage";

    public static final String NISSAN_COMPANY = "NISSAN";
    public static final String TOYOTA_COMPANY = "TOYOTA";
    public static final String HONDA_COMPANY = "HONDA";



    public static final String INTRODUCTION_PAGE_NAME = "introduction";
    public static final String MERGE_IMAGE_PAGE_NAME = "mergeImage";
    public static final String UPLOAD_PAGE_NAME = "upload";
    public static final String ABOUT_PAGE_NAME = "about";


    //controller command
    public static final String GET_CAR_IMAGE_PATH_BY_FOLDER_COMMAND = "getCarImagePathByFolder";
    public static final String ORDER_TEST_DRIVE_COMMAND = "orderTestDrive";
    public static final String GET_CARS_INFO_BY_COMPANY_COMMAND = "getCarsInfoByCompany";
    public static final String GET_CARS_INFO_BY_ID_COMMAND = "getCarsInfoById";

    public static final String GET_MERGE_IMAGE_ALL_SRC_COMMAND = "getMergeImageAllSrc";
    public static final String MERGE_IMAGE_EXE_COMMAND = "mergeImageExe";
    public static final String SELECT_IMAGE_FILE_COMMAND = "selectImageFile";

    public static final String INPUT_CONNECT_IP_COMMAND = "inputConnectIP";
    public static final String GET_IP_HISTORY_LIST_COMMAND = "getIpHistoryList";
    public static final String INPUT_ACCOUNT_COMMAND = "inputAccount";
    public static final String GET_ACCOUNT_HISTORY_LIST_COMMAND = "getAccountHistoryList";
    public static final String GET_PROJECT_LIST_COMMAND = "getProjectList";
    public static final String GET_FUNCTION_LIST_COMMAND = "getFunctionList";
    public static final String GET_VERSION_COMMAND = "getVersion";
    public static final String GET_ALARM_SUMMARY_BY_PAGE_COMMAND = "getAlarmSummaryByPage";
    public static final String GET_PROJECT_LIST_BY_IP_COMMAND = "getProjectListByIp";
    public static final String GET_NODE_LIST_COMMAND = "getNodeList";
    public static final String GET_R_TREND_GROUP_ID_COMMAND = "getRTrendGroupId";
    public static final String GET_R_TREND_CONFIG_COMMAND = "getRTrendConfig";
    public static final String GET_TAGS_DATA_COMMAND = "getTagsData";
    public static final String GET_REAL_TIME_TAG_VALUES_COMMAND = "getRealTimeTagValues";
    public static final String GET_ALARM_LOG_AND_COUNT_COMMAND = "getAlarmLogAndCount";
    public static final String GET_ACTION_LOG_AND_COUNT_COMMAND = "getActionLogAndCount";
    public static final String SAVE_FUNCTION_LIST_COMMAND = "saveFunctionList";
    public static final String ALARM_ACK_COMMAND = "alarmAck";
    public static final String ALARM_ACK_ALL_LIST_COMMAND = "alarmAckAll";
    public static final String GET_TAGS_LIST_BY_PAGE_COMMAND = "getTagsListByPage";
    public static final String GET_TAG_VALUE_COMMAND = "getTagValue";
    public static final String SET_TAG_VALUE_COMMAND = "setTagValue";
    public static final String GET_LANGUAGE_COMMAND = "getLanguage";
    public static final String SET_LANGUAGE_COMMAND = "setLanguage";
    public static final String GET_NODE_STATUS_COMMAND = "getNodeStatus";
    public static final String LOGOUT_COMMAND = "logout";

    public static final String GET_MAP_LIST_BY_NODE_COMMAND = "getMapListByNode";
    public static final String GET_MAP_CONFIG = "getMapConfig";
    public static final String GET_LOCAL_STORAGE_MEM_ALL_COMMAND="getLocalStorageMemAll";

    //rest api type
    public static String SERVER_API_TYPE = "server";
    public static String EXE_API_TYPE = "exe";
    public static String FILE_API_TYPE = "file";
    public static String USER_API_TYPE = "user";
    public static String TEST_DRIVE_API_TYPE = "testDrive";
    public static String CAR_API_TYPE = "car";

    //rest api
    public static String SERVER_IS_EXIST_API = SERVER_URL + "/server/isExist";
    public static String GET_LOCAL_PATH_ALL_API = SERVER_URL + "/file/getLocalPathAll";
    public static String GET_CARS_INFO_BY_COMPANY_API = SERVER_URL + "/car/getCarsInfoByCompany";
    public static String GET_CARS_INFO_BY_ID_API = SERVER_URL + "/car/getCarsInfoById";
    public static String ORDER_TEST_DRIVE_API = SERVER_URL + "/testDrive/orderTestDrive";

    //loadview
    public static final int WIDTH_LOADING_VIEW = 150;
    public static final int HEIGHT_LOADING_VIEW = 150;

    //pushMessageType
    public static final String FIREBASE_PUSH_MESSAGE_TYPE = "firebase";
    public static final String BAIDU_PUSH_MESSAGE_TYPE = "baidu";
    public static final String CHINA_PUSH_MESSAGE_TYPE = "China";

    //language
    public static final String EN_LANGUAGE="en";
    public static final String FR_LANGUAGE="fr";
    public static final String JA_LANGUAGE="ja";
    public static final String KO_LANGUAGE="ko";
    public static final String ZH_CN_LANGUAGE="zh_cn";
    public static final String ZH_TW_LANGUAGE="zh_tw";
}
