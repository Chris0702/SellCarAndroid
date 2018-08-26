package com.chris.dx.sellcarandroid.tool;

import android.app.Activity;
import android.app.Application;
import android.content.Context;
import android.webkit.WebView;
import android.widget.ScrollView;


import com.chris.dx.sellcarandroid.controller.HomeController;
import com.chris.dx.sellcarandroid.controller.PosterController;
import com.chris.dx.sellcarandroid.controller.PriceController;
import com.chris.dx.sellcarandroid.controller.ReferenceController;
import com.chris.dx.sellcarandroid.controller.TestDriveController;
import com.chris.dx.sellcarandroid.fragment.MainWebViewFragment;

//import com.webaccess.advantech.webaccessmobile.background.SystemData;
//import com.webaccess.advantech.webaccessmobile.controller.ActionLogController;
//import com.webaccess.advantech.webaccessmobile.controller.AlarmLogController;
//import com.webaccess.advantech.webaccessmobile.controller.AlarmSummaryLogController;
//import com.webaccess.advantech.webaccessmobile.controller.CommunicationStatusController;
//import com.webaccess.advantech.webaccessmobile.controller.DashboardViewController;
//import com.webaccess.advantech.webaccessmobile.controller.GoogleMapController;
//import com.webaccess.advantech.webaccessmobile.controller.HistoryTrendController;
//import com.webaccess.advantech.webaccessmobile.controller.LoginController;
//import com.webaccess.advantech.webaccessmobile.controller.HomeController;
//import com.webaccess.advantech.webaccessmobile.controller.ConfigController;
//import com.webaccess.advantech.webaccessmobile.controller.MapController;
//import com.webaccess.advantech.webaccessmobile.controller.MapListController;
//import com.webaccess.advantech.webaccessmobile.controller.NodeStatusController;
//import com.webaccess.advantech.webaccessmobile.controller.RealtimeTrendController;
//import com.webaccess.advantech.webaccessmobile.controller.TrendController;
//import com.webaccess.advantech.webaccessmobile.controller.TrendListController;
//import com.webaccess.advantech.webaccessmobile.controller.TagsInfoGroupController;
//import com.webaccess.advantech.webaccessmobile.controller.TagsInfoListController;
//import com.webaccess.advantech.webaccessmobile.controller.TagsInfoValueController;
//import com.webaccess.advantech.webaccessmobile.fragment.MainWebViewFragment;
//import com.webaccess.advantech.webaccessmobile.language.langController;
//import com.webaccess.advantech.webaccessmobile.role.Project;
//import com.webaccess.advantech.webaccessmobile.role.Server;
//import com.webaccess.advantech.webaccessmobile.role.SystemInfo;
//import com.webaccess.advantech.webaccessmobile.role.User;
//import com.webaccess.advantech.webaccessmobile.language.*;
//import com.webaccess.advantech.webaccessmobile.service.ServiceHelper;


/**
 * Created by Chris.Wu on 2016/10/20.
 */
public class Factory {

    // change Factory to singleton

    private static final Factory ourInstance = new Factory();

    public static Factory getInstance() {
        return ourInstance;
    }

    private Factory() {
    }
//
//    public LoginController createLoginController(Activity activity, WebView webView, JavaScriptInterface javaScriptInterface,String pageName,Project project,User user,Server server) {
//        return new LoginController(activity, webView, javaScriptInterface,pageName,project,user, server);
//    }
//
//
    public HomeController createHomeController(Activity activity, WebView webView, JavaScriptInterface javaScriptInterface, String pageName) {
        return new HomeController(activity, webView, javaScriptInterface,pageName);
    }

    public PosterController createPosterController(Activity activity, WebView webView, JavaScriptInterface javaScriptInterface, String pageName) {
        return new PosterController(activity, webView, javaScriptInterface,pageName);
    }

    public PriceController createPriceController(Activity activity, WebView webView, JavaScriptInterface javaScriptInterface, String pageName) {
        return new PriceController(activity, webView, javaScriptInterface,pageName);
    }

    public ReferenceController createReferenceController(Activity activity, WebView webView, JavaScriptInterface javaScriptInterface, String pageName) {
        return new ReferenceController(activity, webView, javaScriptInterface,pageName);
    }

    public TestDriveController createTestDriveController(Activity activity, WebView webView, JavaScriptInterface javaScriptInterface, String pageName) {
        return new TestDriveController(activity, webView, javaScriptInterface,pageName);
    }
//
//    public IntroductionController createIntroductionController(Activity activity, WebView webView, JavaScriptInterface javaScriptInterface, String pageName) {
//        return new IntroductionController(activity, webView, javaScriptInterface,pageName);
//    }
//
//    public AboutController createAboutController(Activity activity, WebView webView, JavaScriptInterface javaScriptInterface, String pageName) {
//        return new AboutController(activity, webView, javaScriptInterface,pageName);
//    }
//
//    public UploadController createUploadController(Activity activity, WebView webView, JavaScriptInterface javaScriptInterface, String pageName) {
//        return new UploadController(activity, webView, javaScriptInterface,pageName);
//    }
//
//    public MergeImageController createMergeImageController(Activity activity, WebView webView, JavaScriptInterface javaScriptInterface, String pageName) {
//        return new MergeImageController(activity, webView, javaScriptInterface,pageName);
//    }
//
//    public ConfigController createConfigController(Activity activity, WebView webView, JavaScriptInterface javaScriptInterface,String pageName,Project project,User user,Server server) {
//        return new ConfigController(activity, webView, javaScriptInterface,pageName,project,user, server);
//    }
//
//
//    public ActionLogController createActionLogController(Activity activity, WebView webView, JavaScriptInterface javaScriptInterface,String pageName,Project project,User user,Server server) {
//        return new ActionLogController(activity, webView, javaScriptInterface,pageName,project,user, server);
//    }
//
//
//    public AlarmLogController createAlarmLogController(Activity activity, WebView webView, JavaScriptInterface javaScriptInterface,String pageName,Project project,User user,Server server) {
//        return new AlarmLogController(activity, webView, javaScriptInterface,pageName,project,user, server);
//    }
//
//
//    public AlarmSummaryLogController createAlarmSummaryLogController(Activity activity, WebView webView, JavaScriptInterface javaScriptInterface,String pageName,Project project,User user,Server server) {
//        return new AlarmSummaryLogController(activity, webView, javaScriptInterface,pageName,project,user, server);
//    }
//
//    public TagsInfoGroupController createTagsInfoGroupController(Activity activity, WebView webView, JavaScriptInterface javaScriptInterface, String pageName, Project project, User user, Server server) {
//        return new TagsInfoGroupController(activity, webView, javaScriptInterface,pageName,project,user, server);
//    }
//
//    public TagsInfoListController createTagsInfoListController(Activity activity, WebView webView, JavaScriptInterface javaScriptInterface, String pageName, Project project, User user, Server server) {
//        return new TagsInfoListController(activity, webView, javaScriptInterface,pageName,project,user, server);
//    }
//
//    public TagsInfoValueController createTagsInfoValueController(Activity activity, WebView webView, JavaScriptInterface javaScriptInterface, String pageName, Project project, User user, Server server) {
//        return new TagsInfoValueController(activity, webView, javaScriptInterface,pageName,project,user, server);
//    }
//
//    public DashboardViewController createDashboardViewController(Activity activity, WebView webView, JavaScriptInterface javaScriptInterface, String pageName, Project project, User user, Server server) {
//        return new DashboardViewController(activity, webView, javaScriptInterface,pageName,project,user, server);
//    }
//
//    public CommunicationStatusController createCommunicationStatusController(Activity activity, WebView webView, JavaScriptInterface javaScriptInterface, String pageName, Project project, User user, Server server) {
//        return new CommunicationStatusController(activity, webView, javaScriptInterface,pageName,project,user, server);
//    }
//
//    //public GoogleMapController createGoogleMapController(Activity activity, WebView webView, JavaScriptInterface javaScriptInterface, String pageName, Project project, User user, Server server) {
//    //    return new GoogleMapController(activity, webView, javaScriptInterface,pageName,project,user, server);
//    //}
//
//    public HistoryTrendController createHistoryTrendController(Activity activity, WebView webView, JavaScriptInterface javaScriptInterface, String pageName, Project project, User user, Server server) {
//        return new HistoryTrendController(activity, webView, javaScriptInterface,pageName,project,user, server);
//    }
//
//    public RealtimeTrendController createRealtimeTrendController(Activity activity, WebView webView, JavaScriptInterface javaScriptInterface, String pageName, Project project, User user, Server server) {
//        return new RealtimeTrendController(activity, webView, javaScriptInterface,pageName,project,user, server);
//    }
//
//    public TrendController createTrendController(Activity activity, WebView webView, JavaScriptInterface javaScriptInterface, String pageName, Project project, User user, Server server) {
//        return new TrendController(activity, webView, javaScriptInterface,pageName,project,user, server);
//    }
//
//    public TrendListController createTrendListController(Activity activity, WebView webView, JavaScriptInterface javaScriptInterface, String pageName, Project project, User user, Server server) {
//        return new TrendListController(activity, webView, javaScriptInterface,pageName,project,user, server);
//    }
//
//    public NodeStatusController createNodeStatusController(Activity activity, WebView webView, JavaScriptInterface javaScriptInterface, String pageName, Project project, User user, Server server) {
//        return new NodeStatusController(activity, webView, javaScriptInterface,pageName,project,user, server);
//    }
//
//    public MapListController createMapListController(Activity activity, WebView webView, JavaScriptInterface javaScriptInterface, String pageName, Project project, User user, Server server) {
//        return new MapListController(activity, webView, javaScriptInterface, pageName, project, user, server);
//    }
//
//    public MapController createMapController(Activity activity, WebView webView, JavaScriptInterface javaScriptInterface, String pageName, Project project, User user, Server server) {
//        return new MapController(activity, webView, javaScriptInterface, pageName, project, user, server);
//    }


    //

    public MainWebViewFragment createMainWebViewFragment() {
        return new MainWebViewFragment();
    }


    public JavaScriptInterface createJavaScriptInterface(Activity activity, WebView webView, Model model, ScrollView scrollView) {
        return new JavaScriptInterface(activity, webView, model, scrollView);
    }

    public Model createModel(Activity activity) {
        return new Model(activity);
    }

    public Model createModel(Application application) {
        return new Model(application);
    }

    public Model createModel(Context context) {
        return new Model(context);
    }

    public Model createModel() {
        return new Model();
    }

    public HttpClient createHttpClient() {
        return new HttpClient();
    }
}
//    public HttpClient createHttpClient(String serverToken) {
//        return new HttpClient(serverToken);
//    }

