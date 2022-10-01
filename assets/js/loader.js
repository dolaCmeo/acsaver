let htmlString = {
    "header": "\n" +
        "<div class=\"nav\">\n" +
        "    <div class=\"nav-links\">\n" +
        "        <a href=\"https://www.acfun.cn/\" class=\"logo\"><img src=\"../../assets/img/acfunlogo.svg\" width=\"94\" height=\"30\"></a>\n" +
        "    </div>\n" +
        "    <div class=\"nav-title\" style=\"display:none;\"><a href></a></div>\n" +
        "    <div class=\"nav-bread\"></div>\n" +
        "    <div class=\"nav-guide\">\n" +
        "        <span class=\"nav-guide-main\">导航<span class=\"ac-icon\"><i class=\"iconfont\">&#xe15c;</i></span></span>\n" +
        "        <ul class=\"nav-guide-2\"></ul>\n" +
        "    </div>\n" +
        "    <div class=\"nav-entrance-wrap\" style=\"display:none;\">\n" +
        "        <a href=\"https://shop213417608.taobao.com/\" target=\"_blank\" class=\"nav-mall\">\n" +
        "            <span class=\"ac-icon\"><i class=\"iconfont\">&#xe420;</i></span>\n" +
        "            <span class=\"entrance-title\">周边商城</span></a> \n" +
        "        <a href=\"https://www.acfun.cn/face-catcher\" target=\"_blank\" class=\"face-catcher\">\n" +
        "            <span class=\"ac-icon\"><i class=\"iconfont\">&#xe3e8;</i></span>\n" +
        "            <span class=\"entrance-title\">AcFun面捕助手</span></a>\n" +
        "    </div>\n" +
        "    <div class=\"nav-search\">\n" +
        "        <span class=\"nav-search-input ac-input-wrapper ac-input-suffix\">\n" +
        "            <input placeholder=\"\" autocomplete=\"off\" minlength=\"\" maxlength=\"\" type=\"text\" value=\"\" class=\"ac-input\" id='nav-search' style='cursor: default;'> \n" +
        "            <div class=\"ac-input-suffix-item\"><span class=\"ac-icon\"><i class=\"iconfont\">&#xe15d;</i></span></div>\n" +
        "        </span>\n" +
        "    </div>\n" +
        "    <div class=\"nav-user\">\n" +
//        "        <a href=\"https://www.acfun.cn/app\" target=\"_blank\" rel=\"noopener\" class=\"app\"><span class=\"ac-icon\"><i class=\"iconfont\">&#xe242;</i></span></a>\n" +
//        "        <a href=\"https://www.acfun.cn/login\" target=\"_blank\" class=\"nologin\">登录/注册</a>\n" +
        "        <a rel=\"noopener\" href=\"https://message.acfun.cn\" target=\"_blank\" class=\"user-message nav-user-item\">\n" +
        "            <span class=\"icon ac-badge ac-badge-normal\"><span class=\"ac-icon\"><i class=\"iconfont\">&#xe15e;</i></span></span>\n" +
        "            <p class=\"desc\">消息</p></a> \n" +
        "        <a rel=\"noopener\" href=\"https://www.acfun.cn/member/feeds\" target=\"_blank\" class=\"user-history nav-user-item\">\n" +
        "            <span class=\"icon ac-icon\"><i class=\"iconfont\">&#xe160;</i></span>\n" +
        "            <p class=\"desc\">动态</p></a> \n" +
        "        <a href=\"https://live.acfun.cn\" target=\"_blank\" class=\"user-favourite nav-user-item\">\n" +
        "            <span class=\"icon ac-icon\"><i class=\"iconfont\">&#xe2af;</i></span>\n" +
        "            <p class=\"desc\">直播</p></a> \n" +
        "        <a href=\"https://github.com/dolaCmeo/acfunsdk\" target=\"_blank\" class=\"user-favourite nav-user-item\">\n" +
        "            <span class=\"icon ac-icon\"><i class=\"iconfont\">&#xe2ea;</i></span>\n" +
        "            <p class=\"desc\">AcSDK</p></a> \n" +
        "        <a href=\"https://github.com/dolaCmeo/acsaver\" target=\"_blank\" class=\"user-creative nav-user-item\">\n" +
        "            <span class=\"icon ac-icon\"><i class=\"iconfont\">&#xe15f;</i></span>\n" +
        "            <p class=\"desc\">AcSaver</p></a> \n" +
        "        <a href=\"https://www.acfun.cn\" target=\"_blank\" rel=\"noopener\" class=\"user-upload\" id='online-link'>\n" +
        "            <button type=\"button\" class=\"ac-button ac-button-primary ac-button-normal\">\n" +
        "                <span class=\"ac-icon\" style=\"margin-right:4px;\"><i class=\"iconfont\">&#xe3c9;</i></span> 看线上\n" +
        "            </button></a>\n" +
        "    </div>\n" +
        "</div>\n",
    "ac-pc-comment": "\n" +
        "<div class=\"ac-comment-title\">\n" +
        "    <div class=\"area-comm-title-left\">\n" +
        "        <span class=\"area-comm-str\">评论</span> \n" +
        "        <span class=\"area-comm-number\"></span>\n" +
        "    </div>\n" +
        "    <div class=\"area-comm-title-right\">\n" +
        "        <a class=\"area-update update\" title=\"刷新\">\n" +
        "            <img class=\"update\" src=\"../../assets/img/refresh-icon.png\" alt=''></a>\n" +
        "    </div> \n" +
        "</div>\n" +
        "<div class=\"ac-comment-warn\"></div>\n" +
        "<div class=\"ac-comment-top-editor\"></div>\n" +
        "<div class=\"ac-comment-top-pager\"></div>\n" +
        "<div class=\"ac-comment-loading\"></div>\n" +
        "<div class=\"ac-comment-list\">\n" +
        "    <div class=\"ac-comment-hot-list\" id=\"comment-hot-list\"></div>\n" +
        "    <div class=\"ac-comment-root-list\" id=\"comment-root-list\"></div>\n" +
        "</div>\n" +
        "<div class=\"ac-comment-bottom-pager\"></div>\n" +
        "<div class=\"ac-comment-bottom-editor\"></div>\n" +
        "<div class=\"ac-comment-toast\"></div>\n" +
        "<div class=\"ac-comment-usercard hide\"></div>\n" +
        "<div class=\"ac-comment-dialog\"></div>\n" +
        "<div class=\"ac-comment-message\"></div>\n",
    "pagelet_toolbar": "\n" +
        "<div id=\"toolbar\" class=\"toolbar showAll\">\n" +
        "    <div id=\"to-lab\" title=\"实验室\" class=\"icon icon-to-lab tool-item tool-to-lab\" style=\"display: none;\">\n" +
        "        <span class=\"lab\">实验室</span></div>\n" +
        "    <a href=\"#area-comment\">\n" +
        "        <div id=\"to-comm\" title=\"前往评论\" class=\"icon icon-to-comm tool-item tool-to-comm\">\n" +
        "            <span class=\"pts\"></span></div>\n" +
        "    </a>\n" +
        "    <a href=\"#main\">\n" +
        "        <div id=\"to-top\" title=\"返回顶部\" class=\"icon icon-arrow-slim-up tool-item tool-to-top toBottom\"></div>\n" +
        "    </a>\n" +
        "    <div id=\"comment-lastPage\" title=\"上一页评论\" class=\"icon icon-to-comm tool-item tool-to-comm\" style=\"display: none\">\n" +
        "        <span class=\"pts\">上一页</span></div>\n" +
        "    <div id=\"comment-nextPage\" title=\"下一页评论\" class=\"icon icon-to-comm tool-item tool-to-comm\" style=\"display: none\">\n" +
        "        <span class=\"pts\">下一页</span></div>\n" +
        "</div>\n",
    "pagelet_footer": "\n" +
        "<div id=\"footer\">\n" +
        "    <div class=\"wp footer-con\">\n" +
        "        <div class=\"footer-bottom\">\n" +
        "            <a><img src=\"../../assets/img/logo-gray.png\" width=\"78\" height=\"24\" loading=\"lazy\" alt=''></a>\n" +
        "            <p>Copyright © 2007-<script>document.write(new Date().getFullYear().toString())</script> AcFun. 保留所有权利</p></div>\n" +
        "    </div>\n" +
        "</div>\n"
};
// https://www.acfun.cn/rest/pc-direct/page/queryNavigators
let navData = [
    {
        "id": 112,
        "navName": "AC正义",
        "parent": 0,
        "link": "/v/list177/index.htm",
        "status": 0,
        "mediaType": 0,
        "cid": 177,
        "orders": 200,
        "navGrade": 0,
        "todayContentsCount": 0,
        "cmsCanSelect": 0,
        "children": [
            {
                "id": 125,
                "navName": "中国日报",
                "parent": 112,
                "link": "/u/3216851",
                "status": 0,
                "mediaType": 0,
                "cid": 0,
                "orders": 196,
                "navGrade": 0,
                "todayContentsCount": 0,
                "cmsCanSelect": 0,
                "children": []
            },
            {
                "id": 122,
                "navName": "环球时报",
                "parent": 112,
                "link": "/u/9755346",
                "status": 0,
                "mediaType": 0,
                "cid": 0,
                "orders": 194,
                "navGrade": 0,
                "todayContentsCount": 0,
                "cmsCanSelect": 0,
                "children": []
            },
            {
                "id": 144,
                "navName": "中国网",
                "parent": 112,
                "link": "/u/14194071",
                "status": 0,
                "mediaType": 0,
                "cid": 0,
                "orders": 191,
                "navGrade": 0,
                "todayContentsCount": 0,
                "cmsCanSelect": 0,
                "children": []
            },
            {
                "id": 150,
                "navName": "法治进行时",
                "parent": 112,
                "link": "/u/16591709",
                "status": 0,
                "mediaType": 0,
                "cid": 0,
                "orders": 190,
                "navGrade": 0,
                "todayContentsCount": 0,
                "cmsCanSelect": 0,
                "children": []
            },
            {
                "id": 145,
                "navName": "浙样红TV",
                "parent": 112,
                "link": "/u/14706221",
                "status": 0,
                "mediaType": 0,
                "cid": 0,
                "orders": 187,
                "navGrade": 0,
                "todayContentsCount": 0,
                "cmsCanSelect": 0,
                "children": []
            },
            {
                "id": 152,
                "navName": "快手",
                "parent": 112,
                "link": "/u/20143211",
                "status": 0,
                "mediaType": 0,
                "cid": 0,
                "orders": 184,
                "navGrade": 0,
                "todayContentsCount": 0,
                "cmsCanSelect": 0,
                "children": []
            },
            {
                "id": 124,
                "navName": "小央视频",
                "parent": 112,
                "link": "/u/13423227",
                "status": 0,
                "mediaType": 0,
                "cid": 0,
                "orders": 183,
                "navGrade": 0,
                "todayContentsCount": 0,
                "cmsCanSelect": 0,
                "children": []
            },
            {
                "id": 158,
                "navName": "人民资讯",
                "parent": 112,
                "link": "/u/30169313",
                "status": 0,
                "mediaType": 0,
                "cid": 0,
                "orders": 182,
                "navGrade": 0,
                "todayContentsCount": 0,
                "cmsCanSelect": 0,
                "children": []
            }
        ]
    },
    {
        "id": 105,
        "navName": "番剧",
        "parent": 0,
        "link": "/v/list155/index.htm",
        "status": 0,
        "mediaType": 0,
        "cid": 155,
        "orders": 100,
        "navGrade": 0,
        "todayContentsCount": 0,
        "cmsCanSelect": 0,
        "children": [
            {
                "id": 131,
                "navName": "番剧列表",
                "parent": 105,
                "link": "/bangumilist",
                "status": 0,
                "mediaType": 0,
                "cid": 0,
                "orders": 60,
                "navGrade": 0,
                "todayContentsCount": 0,
                "cmsCanSelect": 0,
                "children": []
            },
            {
                "id": 115,
                "navName": "TV动画",
                "parent": 105,
                "link": "/v/list67/index.htm",
                "status": 0,
                "mediaType": 0,
                "cid": 67,
                "orders": 50,
                "navGrade": 0,
                "todayContentsCount": 0,
                "cmsCanSelect": 0,
                "children": []
            },
            {
                "id": 116,
                "navName": "剧场动画",
                "parent": 105,
                "link": "/v/list180/index.htm",
                "status": 0,
                "mediaType": 0,
                "cid": 180,
                "orders": 40,
                "navGrade": 0,
                "todayContentsCount": 0,
                "cmsCanSelect": 0,
                "children": []
            },
            {
                "id": 130,
                "navName": "国产动画",
                "parent": 105,
                "link": "/v/list120/index.htm",
                "status": 0,
                "mediaType": 0,
                "cid": 120,
                "orders": 30,
                "navGrade": 0,
                "todayContentsCount": 0,
                "cmsCanSelect": 0,
                "children": []
            }
        ]
    },
    {
        "id": 14,
        "navName": "动画",
        "parent": 0,
        "link": "/v/list1/index.htm",
        "status": 0,
        "mediaType": 0,
        "cid": 1,
        "orders": 90,
        "navGrade": 0,
        "todayContentsCount": 0,
        "cmsCanSelect": 0,
        "children": [
            {
                "id": 132,
                "navName": "动画综合",
                "parent": 14,
                "link": "/v/list106/index.htm",
                "status": 0,
                "mediaType": 0,
                "cid": 106,
                "orders": 70,
                "navGrade": 0,
                "todayContentsCount": 0,
                "cmsCanSelect": 0,
                "children": []
            },
            {
                "id": 133,
                "navName": "短片·手书·配音",
                "parent": 14,
                "link": "/v/list190/index.htm",
                "status": 0,
                "mediaType": 0,
                "cid": 190,
                "orders": 60,
                "navGrade": 0,
                "todayContentsCount": 0,
                "cmsCanSelect": 0,
                "children": []
            },
            {
                "id": 34,
                "navName": "MAD·AMV",
                "parent": 14,
                "link": "/v/list107/index.htm",
                "status": 0,
                "mediaType": 0,
                "cid": 107,
                "orders": 50,
                "navGrade": 0,
                "todayContentsCount": 0,
                "cmsCanSelect": 0,
                "children": []
            },
            {
                "id": 35,
                "navName": "MMD·3D",
                "parent": 14,
                "link": "/v/list108/index.htm",
                "status": 0,
                "mediaType": 0,
                "cid": 108,
                "orders": 40,
                "navGrade": 0,
                "todayContentsCount": 0,
                "cmsCanSelect": 0,
                "children": []
            },
            {
                "id": 157,
                "navName": "虚拟偶像",
                "parent": 14,
                "link": "/v/list207/index.htm",
                "status": 0,
                "mediaType": 0,
                "cid": 207,
                "orders": 35,
                "navGrade": 0,
                "todayContentsCount": 0,
                "cmsCanSelect": 0,
                "children": []
            },
            {
                "id": 41,
                "navName": "动画资讯",
                "parent": 14,
                "link": "/v/list159/index.htm",
                "status": 0,
                "mediaType": 0,
                "cid": 159,
                "orders": 30,
                "navGrade": 0,
                "todayContentsCount": 0,
                "cmsCanSelect": 0,
                "children": []
            },
            {
                "id": 36,
                "navName": "COSPLAY·声优",
                "parent": 14,
                "link": "/v/list133/index.htm",
                "status": 0,
                "mediaType": 0,
                "cid": 133,
                "orders": 20,
                "navGrade": 0,
                "todayContentsCount": 0,
                "cmsCanSelect": 0,
                "children": []
            },
            {
                "id": 97,
                "navName": "特摄",
                "parent": 14,
                "link": "/v/list99/index.htm",
                "status": 0,
                "mediaType": 0,
                "cid": 99,
                "orders": 10,
                "navGrade": 0,
                "todayContentsCount": 0,
                "cmsCanSelect": 0,
                "children": []
            },
            {
                "id": 162,
                "navName": "番剧二创",
                "parent": 14,
                "link": "/v/list212/index.htm",
                "status": 0,
                "mediaType": 0,
                "cid": 212,
                "orders": 5,
                "navGrade": 0,
                "todayContentsCount": 0,
                "cmsCanSelect": 0,
                "children": []
            }
        ]
    },
    {
        "id": 18,
        "navName": "娱乐",
        "parent": 0,
        "link": "/v/list60/index.htm",
        "status": 0,
        "mediaType": 0,
        "cid": 60,
        "orders": 87,
        "navGrade": 0,
        "todayContentsCount": 0,
        "cmsCanSelect": 0,
        "children": [
            {
                "id": 156,
                "navName": "搞笑",
                "parent": 18,
                "link": "/v/list206/index.htm",
                "status": 0,
                "mediaType": 0,
                "cid": 206,
                "orders": 10,
                "navGrade": 0,
                "todayContentsCount": 0,
                "cmsCanSelect": 0,
                "children": []
            },
            {
                "id": 68,
                "navName": "鬼畜",
                "parent": 18,
                "link": "/v/list87/index.htm",
                "status": 0,
                "mediaType": 0,
                "cid": 87,
                "orders": 10,
                "navGrade": 0,
                "todayContentsCount": 0,
                "cmsCanSelect": 0,
                "children": []
            },
            {
                "id": 128,
                "navName": "明星",
                "parent": 18,
                "link": "/v/list188/index.htm",
                "status": 0,
                "mediaType": 0,
                "cid": 188,
                "orders": 9,
                "navGrade": 0,
                "todayContentsCount": 0,
                "cmsCanSelect": 0,
                "children": []
            }
        ]
    },
    {
        "id": 153,
        "navName": "生活",
        "parent": 0,
        "link": "/v/list201/index.htm",
        "status": 0,
        "mediaType": 0,
        "cid": 201,
        "orders": 86,
        "navGrade": 0,
        "todayContentsCount": 0,
        "cmsCanSelect": 0,
        "children": [
            {
                "id": 69,
                "navName": "生活日常",
                "parent": 153,
                "link": "/v/list86/index.htm",
                "status": 0,
                "mediaType": 0,
                "cid": 86,
                "orders": 10,
                "navGrade": 0,
                "todayContentsCount": 0,
                "cmsCanSelect": 0,
                "children": []
            },
            {
                "id": 66,
                "navName": "萌宠",
                "parent": 153,
                "link": "/v/list88/index.htm",
                "status": 0,
                "mediaType": 0,
                "cid": 88,
                "orders": 10,
                "navGrade": 0,
                "todayContentsCount": 0,
                "cmsCanSelect": 0,
                "children": []
            },
            {
                "id": 65,
                "navName": "美食",
                "parent": 153,
                "link": "/v/list89/index.htm",
                "status": 0,
                "mediaType": 0,
                "cid": 89,
                "orders": 10,
                "navGrade": 0,
                "todayContentsCount": 0,
                "cmsCanSelect": 0,
                "children": []
            },
            {
                "id": 154,
                "navName": "旅行",
                "parent": 153,
                "link": "/v/list204/index.htm",
                "status": 0,
                "mediaType": 0,
                "cid": 204,
                "orders": 2,
                "navGrade": 0,
                "todayContentsCount": 0,
                "cmsCanSelect": 0,
                "children": []
            },
            {
                "id": 85,
                "navName": "手工·绘画",
                "parent": 153,
                "link": "/v/list127/index.htm",
                "status": 0,
                "mediaType": 0,
                "cid": 127,
                "orders": 2,
                "navGrade": 0,
                "todayContentsCount": 0,
                "cmsCanSelect": 0,
                "children": []
            },
            {
                "id": 155,
                "navName": "美妆·造型",
                "parent": 153,
                "link": "/v/list205/index.htm",
                "status": 0,
                "mediaType": 0,
                "cid": 205,
                "orders": 1,
                "navGrade": 0,
                "todayContentsCount": 0,
                "cmsCanSelect": 0,
                "children": []
            }
        ]
    },
    {
        "id": 16,
        "navName": "音乐",
        "parent": 0,
        "link": "/v/list58/index.htm",
        "status": 0,
        "mediaType": 0,
        "cid": 58,
        "orders": 80,
        "navGrade": 0,
        "todayContentsCount": 0,
        "cmsCanSelect": 0,
        "children": [
            {
                "id": 166,
                "navName": "治愈系",
                "parent": 16,
                "link": "/v/list215/index.htm",
                "status": 0,
                "mediaType": 0,
                "cid": 215,
                "orders": 100,
                "navGrade": 0,
                "todayContentsCount": 0,
                "cmsCanSelect": 0,
                "children": []
            },
            {
                "id": 57,
                "navName": "原创·翻唱",
                "parent": 16,
                "link": "/v/list136/index.htm",
                "status": 0,
                "mediaType": 0,
                "cid": 136,
                "orders": 10,
                "navGrade": 0,
                "todayContentsCount": 0,
                "cmsCanSelect": 0,
                "children": []
            },
            {
                "id": 55,
                "navName": "演奏·乐器",
                "parent": 16,
                "link": "/v/list137/index.htm",
                "status": 0,
                "mediaType": 0,
                "cid": 137,
                "orders": 10,
                "navGrade": 0,
                "todayContentsCount": 0,
                "cmsCanSelect": 0,
                "children": []
            },
            {
                "id": 54,
                "navName": "Vocaloid",
                "parent": 16,
                "link": "/v/list103/index.htm",
                "status": 0,
                "mediaType": 0,
                "cid": 103,
                "orders": 10,
                "navGrade": 0,
                "todayContentsCount": 0,
                "cmsCanSelect": 0,
                "children": []
            },
            {
                "id": 52,
                "navName": "综合音乐",
                "parent": 16,
                "link": "/v/list139/index.htm",
                "status": 0,
                "mediaType": 0,
                "cid": 139,
                "orders": 10,
                "navGrade": 0,
                "todayContentsCount": 0,
                "cmsCanSelect": 0,
                "children": []
            },
            {
                "id": 129,
                "navName": "音乐选集·电台",
                "parent": 16,
                "link": "/v/list185/index.htm",
                "status": 0,
                "mediaType": 0,
                "cid": 185,
                "orders": 9,
                "navGrade": 0,
                "todayContentsCount": 0,
                "cmsCanSelect": 0,
                "children": []
            }
        ]
    },
    {
        "id": 17,
        "navName": "舞蹈·偶像",
        "parent": 0,
        "link": "/v/list123/index.htm",
        "status": 0,
        "mediaType": 0,
        "cid": 123,
        "orders": 75,
        "navGrade": 0,
        "todayContentsCount": 0,
        "cmsCanSelect": 0,
        "children": [
            {
                "id": 63,
                "navName": "宅舞",
                "parent": 17,
                "link": "/v/list134/index.htm",
                "status": 0,
                "mediaType": 0,
                "cid": 134,
                "orders": 5,
                "navGrade": 0,
                "todayContentsCount": 0,
                "cmsCanSelect": 0,
                "children": []
            },
            {
                "id": 59,
                "navName": "综合舞蹈",
                "parent": 17,
                "link": "/v/list135/index.htm",
                "status": 0,
                "mediaType": 0,
                "cid": 135,
                "orders": 4,
                "navGrade": 0,
                "todayContentsCount": 0,
                "cmsCanSelect": 0,
                "children": []
            },
            {
                "id": 81,
                "navName": "偶像",
                "parent": 17,
                "link": "/v/list129/index.htm",
                "status": 0,
                "mediaType": 0,
                "cid": 129,
                "orders": 3,
                "navGrade": 0,
                "todayContentsCount": 0,
                "cmsCanSelect": 0,
                "children": []
            },
            {
                "id": 159,
                "navName": "中国舞",
                "parent": 17,
                "link": "/v/list208/index.htm",
                "status": 0,
                "mediaType": 0,
                "cid": 208,
                "orders": 1,
                "navGrade": 0,
                "todayContentsCount": 0,
                "cmsCanSelect": 0,
                "children": []
            }
        ]
    },
    {
        "id": 15,
        "navName": "游戏",
        "parent": 0,
        "link": "/v/list59/index.htm",
        "status": 0,
        "mediaType": 0,
        "cid": 59,
        "orders": 74,
        "navGrade": 0,
        "todayContentsCount": 0,
        "cmsCanSelect": 0,
        "children": [
            {
                "id": 165,
                "navName": "王者荣耀",
                "parent": 15,
                "link": "/v/list214/index.htm",
                "status": 0,
                "mediaType": 0,
                "cid": 214,
                "orders": 40,
                "navGrade": 0,
                "todayContentsCount": 0,
                "cmsCanSelect": 0,
                "children": []
            },
            {
                "id": 161,
                "navName": "我的世界",
                "parent": 15,
                "link": "/v/list210/index.htm",
                "status": 0,
                "mediaType": 0,
                "cid": 210,
                "orders": 40,
                "navGrade": 0,
                "todayContentsCount": 0,
                "cmsCanSelect": 0,
                "children": []
            },
            {
                "id": 167,
                "navName": "和平精英",
                "parent": 15,
                "link": "/v/list216/index.htm",
                "status": 0,
                "mediaType": 0,
                "cid": 216,
                "orders": 35,
                "navGrade": 0,
                "todayContentsCount": 0,
                "cmsCanSelect": 0,
                "children": []
            },
            {
                "id": 168,
                "navName": "第五人格",
                "parent": 15,
                "link": "/v/list217/index.htm",
                "status": 0,
                "mediaType": 0,
                "cid": 217,
                "orders": 20,
                "navGrade": 0,
                "todayContentsCount": 0,
                "cmsCanSelect": 0,
                "children": []
            },
            {
                "id": 44,
                "navName": "英雄联盟",
                "parent": 15,
                "link": "/v/list85/index.htm",
                "status": 0,
                "mediaType": 0,
                "cid": 85,
                "orders": 20,
                "navGrade": 0,
                "todayContentsCount": 0,
                "cmsCanSelect": 0,
                "children": []
            },
            {
                "id": 47,
                "navName": "电子竞技",
                "parent": 15,
                "link": "/v/list145/index.htm",
                "status": 0,
                "mediaType": 0,
                "cid": 145,
                "orders": 19,
                "navGrade": 0,
                "todayContentsCount": 0,
                "cmsCanSelect": 0,
                "children": []
            },
            {
                "id": 134,
                "navName": "网络游戏",
                "parent": 15,
                "link": "/v/list186/index.htm",
                "status": 0,
                "mediaType": 0,
                "cid": 186,
                "orders": 17,
                "navGrade": 0,
                "todayContentsCount": 0,
                "cmsCanSelect": 0,
                "children": []
            },
            {
                "id": 45,
                "navName": "主机单机",
                "parent": 15,
                "link": "/v/list84/index.htm",
                "status": 0,
                "mediaType": 0,
                "cid": 84,
                "orders": 16,
                "navGrade": 0,
                "todayContentsCount": 0,
                "cmsCanSelect": 0,
                "children": []
            },
            {
                "id": 135,
                "navName": "手机游戏",
                "parent": 15,
                "link": "/v/list187/index.htm",
                "status": 0,
                "mediaType": 0,
                "cid": 187,
                "orders": 12,
                "navGrade": 0,
                "todayContentsCount": 0,
                "cmsCanSelect": 0,
                "children": []
            },
            {
                "id": 43,
                "navName": "桌游卡牌",
                "parent": 15,
                "link": "/v/list165/index.htm",
                "status": 0,
                "mediaType": 0,
                "cid": 165,
                "orders": 8,
                "navGrade": 0,
                "todayContentsCount": 0,
                "cmsCanSelect": 0,
                "children": []
            }
        ]
    },
    {
        "id": 19,
        "navName": "科技",
        "parent": 0,
        "link": "/v/list70/index.htm",
        "status": 0,
        "mediaType": 0,
        "cid": 70,
        "orders": 65,
        "navGrade": 0,
        "todayContentsCount": 0,
        "cmsCanSelect": 0,
        "children": [
            {
                "id": 160,
                "navName": "手办模玩",
                "parent": 19,
                "link": "/v/list209/index.htm",
                "status": 0,
                "mediaType": 0,
                "cid": 209,
                "orders": 8,
                "navGrade": 0,
                "todayContentsCount": 0,
                "cmsCanSelect": 0,
                "children": []
            },
            {
                "id": 71,
                "navName": "科技制造",
                "parent": 19,
                "link": "/v/list90/index.htm",
                "status": 0,
                "mediaType": 0,
                "cid": 90,
                "orders": 6,
                "navGrade": 0,
                "todayContentsCount": 0,
                "cmsCanSelect": 0,
                "children": []
            },
            {
                "id": 136,
                "navName": "人文科普",
                "parent": 19,
                "link": "/v/list189/index.htm",
                "status": 0,
                "mediaType": 0,
                "cid": 189,
                "orders": 5,
                "navGrade": 0,
                "todayContentsCount": 0,
                "cmsCanSelect": 0,
                "children": []
            },
            {
                "id": 70,
                "navName": "汽车",
                "parent": 19,
                "link": "/v/list122/index.htm",
                "status": 0,
                "mediaType": 0,
                "cid": 122,
                "orders": 3,
                "navGrade": 0,
                "todayContentsCount": 0,
                "cmsCanSelect": 0,
                "children": []
            },
            {
                "id": 84,
                "navName": "数码家电",
                "parent": 19,
                "link": "/v/list91/index.htm",
                "status": 0,
                "mediaType": 0,
                "cid": 91,
                "orders": 2,
                "navGrade": 0,
                "todayContentsCount": 0,
                "cmsCanSelect": 0,
                "children": []
            },
            {
                "id": 73,
                "navName": "演讲·公开课",
                "parent": 19,
                "link": "/v/list151/index.htm",
                "status": 0,
                "mediaType": 0,
                "cid": 151,
                "orders": 2,
                "navGrade": 0,
                "todayContentsCount": 0,
                "cmsCanSelect": 0,
                "children": []
            },
            {
                "id": 82,
                "navName": "广告",
                "parent": 19,
                "link": "/v/list149/index.htm",
                "status": 0,
                "mediaType": 0,
                "cid": 149,
                "orders": 1,
                "navGrade": 0,
                "todayContentsCount": 0,
                "cmsCanSelect": 0,
                "children": []
            }
        ]
    },
    {
        "id": 20,
        "navName": "影视",
        "parent": 0,
        "link": "/v/list68/index.htm",
        "status": 0,
        "mediaType": 0,
        "cid": 68,
        "orders": 60,
        "navGrade": 0,
        "todayContentsCount": 0,
        "cmsCanSelect": 0,
        "children": [
            {
                "id": 146,
                "navName": "电视剧放映厅",
                "parent": 20,
                "link": "https://hd.acfun.cn/doodle/GXEomtJv.html",
                "status": 0,
                "mediaType": 0,
                "cid": 0,
                "orders": 120,
                "navGrade": 0,
                "todayContentsCount": 0,
                "cmsCanSelect": 0,
                "children": []
            },
            {
                "id": 164,
                "navName": "电影放映厅",
                "parent": 20,
                "link": "https://hd.acfun.cn/s/QpdpZsjR",
                "status": 0,
                "mediaType": 0,
                "cid": 0,
                "orders": 110,
                "navGrade": 0,
                "todayContentsCount": 0,
                "cmsCanSelect": 0,
                "children": []
            },
            {
                "id": 170,
                "navName": "影视混剪",
                "parent": 20,
                "link": "/v/list219/index.htm",
                "status": 0,
                "mediaType": 0,
                "cid": 219,
                "orders": 100,
                "navGrade": 0,
                "todayContentsCount": 0,
                "cmsCanSelect": 0,
                "children": []
            },
            {
                "id": 137,
                "navName": "预告·花絮",
                "parent": 20,
                "link": "/v/list192/index.htm",
                "status": 0,
                "mediaType": 0,
                "cid": 192,
                "orders": 100,
                "navGrade": 0,
                "todayContentsCount": 0,
                "cmsCanSelect": 0,
                "children": []
            },
            {
                "id": 138,
                "navName": "电影杂谈",
                "parent": 20,
                "link": "/v/list193/index.htm",
                "status": 0,
                "mediaType": 0,
                "cid": 193,
                "orders": 90,
                "navGrade": 0,
                "todayContentsCount": 0,
                "cmsCanSelect": 0,
                "children": []
            },
            {
                "id": 139,
                "navName": "追剧社",
                "parent": 20,
                "link": "/v/list194/index.htm",
                "status": 0,
                "mediaType": 0,
                "cid": 194,
                "orders": 85,
                "navGrade": 0,
                "todayContentsCount": 0,
                "cmsCanSelect": 0,
                "children": []
            },
            {
                "id": 140,
                "navName": "综艺show",
                "parent": 20,
                "link": "/v/list195/index.htm",
                "status": 0,
                "mediaType": 0,
                "cid": 195,
                "orders": 80,
                "navGrade": 0,
                "todayContentsCount": 0,
                "cmsCanSelect": 0,
                "children": []
            },
            {
                "id": 141,
                "navName": "纪录片·短片",
                "parent": 20,
                "link": "/v/list196/index.htm",
                "status": 0,
                "mediaType": 0,
                "cid": 196,
                "orders": 75,
                "navGrade": 0,
                "todayContentsCount": 0,
                "cmsCanSelect": 0,
                "children": []
            }
        ]
    },
    {
        "id": 21,
        "navName": "体育",
        "parent": 0,
        "link": "/v/list69/index.htm",
        "status": 0,
        "mediaType": 0,
        "cid": 69,
        "orders": 55,
        "navGrade": 0,
        "todayContentsCount": 0,
        "cmsCanSelect": 0,
        "children": [
            {
                "id": 93,
                "navName": "综合体育",
                "parent": 21,
                "link": "/v/list152/index.htm",
                "status": 0,
                "mediaType": 0,
                "cid": 152,
                "orders": 10,
                "navGrade": 0,
                "todayContentsCount": 0,
                "cmsCanSelect": 0,
                "children": []
            },
            {
                "id": 92,
                "navName": "足球",
                "parent": 21,
                "link": "/v/list94/index.htm",
                "status": 0,
                "mediaType": 0,
                "cid": 94,
                "orders": 10,
                "navGrade": 0,
                "todayContentsCount": 0,
                "cmsCanSelect": 0,
                "children": []
            },
            {
                "id": 91,
                "navName": "篮球",
                "parent": 21,
                "link": "/v/list95/index.htm",
                "status": 0,
                "mediaType": 0,
                "cid": 95,
                "orders": 10,
                "navGrade": 0,
                "todayContentsCount": 0,
                "cmsCanSelect": 0,
                "children": []
            },
            {
                "id": 90,
                "navName": "搏击健身",
                "parent": 21,
                "link": "/v/list153/index.htm",
                "status": 0,
                "mediaType": 0,
                "cid": 153,
                "orders": 10,
                "navGrade": 0,
                "todayContentsCount": 0,
                "cmsCanSelect": 0,
                "children": []
            },
            {
                "id": 87,
                "navName": "极限竞速",
                "parent": 21,
                "link": "/v/list93/index.htm",
                "status": 0,
                "mediaType": 0,
                "cid": 93,
                "orders": 10,
                "navGrade": 0,
                "todayContentsCount": 0,
                "cmsCanSelect": 0,
                "children": []
            }
        ]
    },
    {
        "id": 22,
        "navName": "鱼塘",
        "parent": 0,
        "link": "/v/list125/index.htm",
        "status": 0,
        "mediaType": 0,
        "cid": 125,
        "orders": 45,
        "navGrade": 0,
        "todayContentsCount": 0,
        "cmsCanSelect": 0,
        "children": [
            {
                "id": 118,
                "navName": "普法安全",
                "parent": 22,
                "link": "/v/list183/index.htm",
                "status": 0,
                "mediaType": 0,
                "cid": 183,
                "orders": 11,
                "navGrade": 0,
                "todayContentsCount": 0,
                "cmsCanSelect": 0,
                "children": []
            },
            {
                "id": 78,
                "navName": "国防军事",
                "parent": 22,
                "link": "/v/list92/index.htm",
                "status": 0,
                "mediaType": 0,
                "cid": 92,
                "orders": 10,
                "navGrade": 0,
                "todayContentsCount": 0,
                "cmsCanSelect": 0,
                "children": []
            },
            {
                "id": 72,
                "navName": "历史",
                "parent": 22,
                "link": "/v/list131/index.htm",
                "status": 0,
                "mediaType": 0,
                "cid": 131,
                "orders": 10,
                "navGrade": 0,
                "todayContentsCount": 0,
                "cmsCanSelect": 0,
                "children": []
            },
            {
                "id": 67,
                "navName": "新鲜事·正能量",
                "parent": 22,
                "link": "/v/list132/index.htm",
                "status": 0,
                "mediaType": 0,
                "cid": 132,
                "orders": 10,
                "navGrade": 0,
                "todayContentsCount": 0,
                "cmsCanSelect": 0,
                "children": []
            }
        ]
    },
    {
        "id": 24,
        "navName": "文章",
        "parent": 0,
        "link": "/v/list63/index.htm",
        "status": 0,
        "mediaType": 1,
        "cid": 63,
        "orders": 40,
        "navGrade": 0,
        "todayContentsCount": 0,
        "cmsCanSelect": 0,
        "children": [
            {
                "id": 119,
                "navName": "二次元画师",
                "parent": 24,
                "link": "/v/list184/index.htm",
                "status": 0,
                "mediaType": 0,
                "cid": 184,
                "orders": 11,
                "navGrade": 0,
                "todayContentsCount": 0,
                "cmsCanSelect": 0,
                "children": []
            },
            {
                "id": 26,
                "navName": "综合",
                "parent": 24,
                "link": "/v/list110/index.htm",
                "status": 0,
                "mediaType": 1,
                "cid": 110,
                "orders": 10,
                "navGrade": 0,
                "todayContentsCount": 0,
                "cmsCanSelect": 0,
                "children": []
            },
            {
                "id": 27,
                "navName": "生活情感",
                "parent": 24,
                "link": "/v/list73/index.htm",
                "status": 0,
                "mediaType": 1,
                "cid": 73,
                "orders": 6,
                "navGrade": 0,
                "todayContentsCount": 0,
                "cmsCanSelect": 0,
                "children": []
            },
            {
                "id": 32,
                "navName": "游戏",
                "parent": 24,
                "link": "/v/list164/index.htm",
                "status": 0,
                "mediaType": 1,
                "cid": 164,
                "orders": 4,
                "navGrade": 0,
                "todayContentsCount": 0,
                "cmsCanSelect": 0,
                "children": []
            },
            {
                "id": 28,
                "navName": "动漫文化",
                "parent": 24,
                "link": "/v/list74/index.htm",
                "status": 0,
                "mediaType": 1,
                "cid": 74,
                "orders": 3,
                "navGrade": 0,
                "todayContentsCount": 0,
                "cmsCanSelect": 0,
                "children": []
            },
            {
                "id": 31,
                "navName": "漫画·文学",
                "parent": 24,
                "link": "/v/list75/index.htm",
                "status": 0,
                "mediaType": 1,
                "cid": 75,
                "orders": 2,
                "navGrade": 0,
                "todayContentsCount": 0,
                "cmsCanSelect": 0,
                "children": []
            }
        ]
    }
];


function navItemLoader() {
    let navMain = document.querySelector(".nav-guide-2");
    navData.forEach(function (item) {
        let nav2 = document.createElement("li"),
            nav2link = document.createElement("a"),
            nav2sub = document.createElement("ul");
        nav2.setAttribute("class", "nav-guide-2-item");
        nav2link.setAttribute("href", "https://www.acfun.cn" + item.link);
        nav2link.innerHTML = item.navName;
        nav2.append(nav2link);
        nav2sub.setAttribute("class", "nav-guide-3");
        item.children.forEach(function (sub) {
            let nav3 = document.createElement("li"),
                nav3link = document.createElement("a");
            nav3.setAttribute("class", "nav-guide-3-item");
            nav3link.setAttribute("href", "https://www.acfun.cn" + sub.link);
            nav3link.innerHTML = sub.navName;
            nav3.append(nav3link);
            nav2sub.append(nav3);
        });
        nav2.append(nav2sub);
        navMain.append(nav2);
    });
    navMain.innerHTML += "<div class=\"nav-guide-3-place\"></div>";
    document.getElementById("online-link").setAttribute("href", document.getElementById("srcUrl").getAttribute('href'));
    document.getElementById("nav-search").addEventListener("keypress", function(event) {
        // If the user presses the "Enter" key on the keyboard
        if (event.key === "Enter") {
            // Cancel the default action, if needed
            event.preventDefault();
            // Trigger the button element with a click
            window.open("https://www.acfun.cn/search?keyword=" + this.value, "_blank");
        }
    });
}

function tagsLoader(tids){
    tids.forEach(function (tid) {
        document.querySelector("#" + tid).innerHTML = htmlString[tid];
        if(tid==='header'){navItemLoader();}
    });
}
