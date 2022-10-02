let is_LOCAL = window.location.protocol === "file:";
let rTypeMap = {
        1: "bangumi",
        2: "video",
        3: "article",
        4: "album",
        5: "member",
        6: "comment",
        10: "moment"
    },
    rTypeCnName = {
        1: "番剧",
        2: "视频",
        3: "文章",
        4: "合辑",
        5: "用户",
        6: "评论",
        10: "动态"
    };
let htmlString = {
    "header": "\n" +
        "<div class=\"nav\">\n" +
        "    <div class=\"nav-links\">\n" +
        "        <a href=\"../../index.html\" class=\"logo\"><img src=\"../../assets/img/acsaverlogo.svg\" width=\"94\" height=\"30\"></a>\n" +
        "    </div>\n" +
        "    <div class=\"nav-title\" style=\"display:none;\"><a href></a></div>\n" +
        "    <div class=\"nav-bread\"></div>\n" +
        "    <div class=\"nav-guide\">\n" +
        "        <span class=\"nav-guide-main\">导航<span class=\"ac-icon\"><i class=\"iconfont\">&#xe15c;</i></span></span>\n" +
        "        <ul class=\"nav-guide-2\"></ul>\n" +
        "    </div>\n" +
        "    <div class=\"nav-entrance-wrap\" style=\"display:none;\">\n" +
        "        <a href=\"index.html\" class=\"nav-mall\">\n" +
        "            <span class=\"ac-icon\"><i class=\"iconfont\">&#xe3c5;</i></span>\n" +
        "            <span class=\"entrance-title\">近期保存内容</span></a> \n" +
        "        <a href=\"feed.html\" class=\"face-catcher\">\n" +
        "            <span class=\"ac-icon\"><i class=\"iconfont\">&#xe3c4;</i></span>\n" +
        "            <span class=\"entrance-title\">近期保存动态</span></a>\n" +
        "    </div>\n" +
        "    <div class=\"nav-search\">\n" +
        "        <span class=\"nav-search-input ac-input-wrapper ac-input-suffix\">\n" +
        "            <input placeholder=\"\" autocomplete=\"off\" minlength=\"\" maxlength=\"\" type=\"text\" value=\"\" class=\"ac-input\" id='nav-search' style='cursor: default;'> \n" +
        "            <div class=\"ac-input-suffix-item\" id='nav-search-btn'><span class=\"ac-icon\"><i class=\"iconfont\">&#xe15d;</i></span></div>\n" +
        "        </span>\n" +
        "    </div>\n" +
        "    <div class=\"nav-user\">\n" +
        "        <a href=\"https://github.com/dolaCmeo/acfunsdk\" target=\"_blank\" class=\"user-favourite nav-user-item\">\n" +
        "            <span class=\"icon ac-icon\"><i class=\"iconfont\">&#xe353;</i></span>\n" +
        "            <p class=\"desc\">AcSDK</p></a> \n" +
        "        <a href=\"https://github.com/dolaCmeo/acsaver\" target=\"_blank\" class=\"user-creative nav-user-item\">\n" +
        "            <span class=\"icon ac-icon\"><i class=\"iconfont\">&#xe62e;</i></span>\n" +
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


function createTag(tagName, className="", attrs=[]) {
    let thisTag = document.createElement(tagName);
    if(className.length){thisTag.setAttribute("class", className);}
    attrs.forEach(function (attr) {
        thisTag.setAttribute(attr[0], attr[1]);
    });
    return thisTag;
}

function navItemLoader() {
    let navMain = document.querySelector(".nav-guide-2");
    navData.forEach(function (item) {
        let nav2 = createTag("li", "nav-guide-2-item"),
            nav2link = createTag("a", "", [
                ["target", "_blank"],
                ["href", "https://www.acfun.cn" + item.link]
            ]),
            nav2sub = createTag("ul", "nav-guide-3");
        nav2link.innerHTML = item.navName;
        nav2.append(nav2link);
        item.children.forEach(function (sub) {
            let nav3 = createTag("li", "nav-guide-3-item"),
                nav3link = createTag("a", "", [
                    ["target", "_blank"],
                    ["href", "https://www.acfun.cn" + sub.link]
                ]);
            nav3link.innerHTML = sub.navName;
            nav3.append(nav3link);
            nav2sub.append(nav3);
        });
        nav2.append(nav2sub);
        navMain.append(nav2);
    });
    navMain.innerHTML += "<div class=\"nav-guide-3-place\"></div>";
    let olink = document.getElementById("online-link");
    if(olink!==null){
        olink.setAttribute("href", document.getElementById("srcUrl").getAttribute('href'));
    }
    let nav_input = document.getElementById("nav-search"),
        nav_btn = document.getElementById("nav-search-btn");
    nav_input.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            event.preventDefault();
            window.open("https://www.acfun.cn/search?keyword=" + this.value, "_blank");
        }
    });
    nav_btn.addEventListener("click", function(event) {
        window.open("https://www.acfun.cn/search?keyword=" + nav_input.value, "_blank");
    });

}

function tagsLoader(tids){
    tids.forEach(function (tid) {
        document.querySelector("#" + tid).innerHTML = htmlString[tid];
        if(tid==='header'){navItemLoader();}
    });
}

function emot2html(s='') {
    let regex = /(?<emot>\[emot=(?<key>\w+),(?<num>\d+)\/])/gm,
        rep = '<img class="ubb-emotion" src="assets/emot/$2/$3.gif" alt="$1">';
    return s
        .replace(regex, rep)
        .replace(/src="assets\/emot\/acfun\//gm, 'src="assets/emot/small/');
}

function momentLoader(rId) {
    let RAW = LOADED.moment[rId],mLink="moment/"+rId+"/"+rId+".html";
    if(RAW===undefined){return false;}
    let momentMain = createTag("div", "ac-member-feed"),
        momentUser = createTag("div", "member-feed-user"),
        momentContent = createTag("div", "feed-content"),
        momentInfos = createTag("div", "member-feed-interactive"),
        momentSeparate = createTag("div", "feed-separate"),
        momentMore = createTag("div", "feed-more");
    // feed-up
    let feed_up = createTag("div", "feed-up"),
        up_avatar = createTag("div", "feed-up-avatar"),
        up_link = createTag("a", "", [
            ["target", "_blank"],
            ["href", "https://www.acfun.cn/u/" + RAW.user.href]
        ]),
        up_avatar_img = createTag("img", "", [
            ["src", "member/" + RAW.user.href + "_avatar"],
            ["onerror", "this.src='assets/img/defaultAvatar.jpg';"]
        ]),
        up_info = createTag("div", "feed-up-info"),
        up_name = createTag("div", "up-name no-color"),
        up_name_link = createTag("a", "text-overflow", [
            ["target", "_blank"],
            ["href", "https://www.acfun.cn/u/" + RAW.user.href]
        ]),
        up_verify = createTag("div", "verify"),
        create_time = createTag("span", "feed-time");
    RAW.user.verifiedTypes.forEach(function (i) {
        let vIcon = createTag("span", "ac-icon ac-icon-small"), vInfo;
        switch (i) {
            case 1:
                vInfo = [
                    ["src", "assets/img/icon_monkey_new.svg"],
                    ["title", "AcFun管理员认证"],
                ];
                break;
            case 2:
                vInfo = [
                    ["src", "assets/img/icon_v.svg"],
                    ["title", "AcFun官方认证"],
                ];
                break;
            case 3:
                vInfo = [
                    ["src", "assets/img/icon_avi.svg"],
                    ["title", "AVI虚拟偶像标识"],
                ];
                break;
            case 4:
                vInfo = [
                    ["src", "assets/img/icon_gjdm.svg"],
                    ["title", "高弹达人标识"],
                ];
                break;
            case 5:
                vIcon.setAttribute("class", "ac-icon ac-icon-small ac-icon-academy");
                vInfo = [
                    ["src", "assets/img/icon_up.svg"],
                    ["title", "阿普学院标志"],
                ];
                break;
        }
        vIcon.append(createTag("img", "icon-img", vInfo));
        up_verify.append(vIcon);
    });
    up_link.append(up_avatar_img);
    up_avatar.append(up_link);
    feed_up.append(up_avatar);
    up_name_link.innerHTML = RAW.user.name;
    up_name.append(up_name_link);
    up_info.append(up_name);
    up_info.append(up_verify);
    create_time.innerHTML = RAW.createTime;
    up_info.append(create_time);
    feed_up.append(up_info);
    momentUser.append(feed_up);
    momentUser.addEventListener("click", function (event) {window.location.href = mLink;});
    momentMain.append(momentUser);
    // member-feed-moment
    let feed_content = createTag("div", "member-feed-moment"),
        content_text = createTag("div", "member-feed-text");
    content_text.innerHTML = emot2html(RAW.text);
    feed_content.append(content_text);
    if((RAW.imgs||[]).length){
        let feed_image = createTag("div", "member-feed-moment-image member-feed-moment-image-" + RAW.imgs.length);
        RAW.imgs.forEach(function (item) {
            feed_image.append(createTag("img", "", [["src", item.originUrl]]));
        });
        feed_content.append(feed_image);
    }
    // member-feed-repost-content
    if(RAW.repostSource){
        let repost = createTag("div", "member-feed-repost-content"),
            repost_up = createTag("div", "repost-up"),
            repost_up_link = createTag("a", "",
                [["target", "_blank"],["href", "https://www.acfun.cn/u/" + RAW.repostSource.user.userId]]),
            repost_up_name = createTag("span", "up-name"),
            repost_up_follow = createTag("span", "follow"),
            repost_resource = createTag("div", "member-feed-resource");
        repost_up_name.innerHTML = "@" + RAW.repostSource.user.userName;
        repost_up_link.append(repost_up_name);
        repost_up_follow.innerHTML = "关注";
        repost_up_link.append(repost_up_follow);
        repost_up.append(repost_up_link);
        repost.append(repost_up);
        repost_resource.append(createTag("div", "member-feed-text"));
        if([2,3].indexOf(RAW.repostSource.resourceType)>-1){
            let resource_content = createTag("div", "member-feed-resource-content"),
                content_left = createTag("div", "content-left"),
                content_right = createTag("div", "content-right"),
                resource_url = RAW.repostSource.shareUrl,
                rtype = rTypeMap[RAW.repostSource.resourceType],
                rid = RAW.repostSource.resourceId;
            if(AcSaver[rtype].indexOf(rid.toString())>-1){
                resource_url = rtype + "/" + rid + "/" + rid + ".html";
            }
            let left_link = createTag("a", "member-feed-resource-link",
                    [["target", "_blank"],["href", resource_url]]),
                cover_img = createTag("img", "cover", [["src", RAW.repostSource.coverUrl]]),
                resource_tag = createTag("span", "resource-tag");
            resource_tag.innerHTML = rTypeCnName[RAW.repostSource.resourceType];
            left_link.append(cover_img);
            left_link.append(resource_tag);
            content_left.append(left_link);
            resource_content.append(content_left);
            if(rtype==='video'){
                let video_time = createTag("div", "video-time");
                video_time.innerHTML = RAW.repostSource.playDuration;
                left_link.append(video_time);
            }
            let right_link = createTag("a", "member-feed-resource-link",
                    [["target", "_blank"],["href", resource_url]]),
                resource_title = createTag("h1", "title text-overflow feed-link"),
                resource_desc = createTag("div", "desc"),
                resource_info = createTag("div", "info"),
                info_view = createTag("span", "view"),
                info_view_icon = createTag("span", "ac-icon"),
                info_danmu = createTag("span", "danmu"),
                info_danmu_icon = createTag("span", "ac-icon");
            resource_title.innerHTML = RAW.repostSource.caption||RAW.repostSource.articleTitle;
            resource_desc.innerHTML = RAW.repostSource.articleBody||RAW.repostSource.detail.description;
            info_view_icon.innerHTML = "<i class=\"iconfont\">&#xe62f;</i>";
            info_view.append(info_view_icon);
            info_view.append(RAW.repostSource.viewCount);
            resource_info.append(info_view);
            info_danmu_icon.innerHTML = "<i class=\"iconfont\">&#xe630;</i>";
            info_danmu.append(info_danmu_icon);
            info_danmu.append(RAW.repostSource.commentCount||RAW.repostSource.detail.danmakuCount);
            resource_info.append(info_danmu);
            right_link.append(resource_title);
            right_link.append(resource_desc);
            right_link.append(resource_info);
            content_right.append(right_link);
            resource_content.append(content_right);
            // return
            repost_resource.append(resource_content);
        }
        repost.append(repost_resource);
        feed_content.append(repost);
    }
    momentContent.append(feed_content);
    momentMain.append(momentContent);
    let interactive = createTag("div", "feed-interactive"),
        iComment = createTag("div", "feed-interactive-comment"),
        iBanana = createTag("div", "feed-interactive-banana"),
        iLike = createTag("div", "feed-interactive-like"),
        iShare = createTag("div", "feed-interactive-repost");
    iComment.innerHTML = "<div class=\"feed-interactive-comment\">" +
        "<span class=\"ac-icon\"><i class=\"iconfont\"></i></span>" +
        "<span>" + RAW.commentCount + "</span></div>";
    interactive.append(iComment);
    iBanana.innerHTML = "<div class=\"feed-interactive-banana\">" +
        "<span class=\"icon_path ac-icon\"><i class=\"iconfont\"></i></span>" +
        "<span class=\"icon_fill ac-icon\"><i class=\"iconfont\"></i></span>" +
        "<span>" + RAW.commentCount + "</span></div>";
    interactive.append(iBanana);
    iLike.innerHTML = "<div class=\"feed-interactive-like\">" +
        "<span class=\"icon_path ac-icon\"><i class=\"iconfont\"></i></span>" +
        "<span class=\"icon_fill ac-icon\"><i class=\"iconfont\"></i></span>" +
        "<span>" + RAW.likeCount + "</span></div>";
    interactive.append(iLike);
    iShare.innerHTML = "<div class=\"feed-interactive-repost\">" +
        "<span class=\"ac-icon\"><i class=\"iconfont\"></i></span>" +
        "<span>"+ RAW.shareCount + "</span></div>";
    interactive.append(iShare);
    momentInfos.append(interactive);
    momentMain.append(momentInfos);
    momentMain.append(momentSeparate);
    momentMore.innerHTML = "<a href='"+mLink+"'><span class=\"ac-icon\"><i class=\"iconfont\"></i></span></a>";
    momentMain.append(momentMore);
    document.getElementById("feed-loading").before(momentMain);
}
