

let lazyLoadInstance, gallery, player,
    is_ONLINE = window.navigator.onLine,
    is_LOCAL = window.location.protocol === "file:",
    is_MAIN = null,
    LOADED = {bangumi:{},article:{},video:{},live:{},moment:{},comment:[],danmaku: {}},
    PAGE = {},
    SAVER = {
        playerSwitcher: undefined,
        ele: {
            head: document.head || document.getElementsByTagName('head')[0],
            referer: document.querySelector("meta[name=referer]"),
            pagelet_header: document.querySelector("header#header"),
            pagelet_toolbar: document.querySelector("div#pagelet_toolbar"),
            pagelet_footer: document.querySelector("div#pagelet_footer"),
        },
        html: {
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
            "pagelet_footer": "\n" +
                "<div id=\"footer\">\n" +
                "    <div class=\"wp footer-con\">\n" +
                "        <div class=\"footer-bottom\">\n" +
                "            <a><img src=\"../../assets/img/logo-gray.png\" width=\"78\" height=\"24\" loading=\"lazy\" alt=''></a>\n" +
                "            <p>Copyright © 2007-<script>document.write(new Date().getFullYear().toString())</script> AcFun. 保留所有权利</p></div>\n" +
                "    </div>\n" +
                "</div>\n",
            "pagelet_toolbar": "\n" +
                "<div id=\"toolbar\" class=\"toolbar showAll\">\n" +
                "    <div id=\"to-lab\" title=\"实验室\" class=\"icon icon-to-lab tool-item tool-to-lab\" style=\"display: none;\">\n" +
                "        <span class=\"lab\">实验室</span></div>\n" +
                "    <a href=\"#area-comment\">\n" +
                "        <div id=\"to-comm\" title=\"前往评论\" class=\"icon icon-to-comm tool-item tool-to-comm\">\n" +
                "            <span class=\"pts\"></span></div>\n" +
                "    </a>\n" +
                "    <a>\n" +
                "        <div id=\"to-top\" title=\"返回顶部\" class=\"icon icon-arrow-slim-up tool-item tool-to-top toBottom\"></div>\n" +
                "    </a>\n" +
                "    <div id=\"comment-lastPage\" title=\"上一页评论\" class=\"icon icon-to-comm tool-item tool-to-comm\" style=\"display: none\">\n" +
                "        <span class=\"pts\">上一页</span></div>\n" +
                "    <div id=\"comment-nextPage\" title=\"下一页评论\" class=\"icon icon-to-comm tool-item tool-to-comm\" style=\"display: none\">\n" +
                "        <span class=\"pts\">下一页</span></div>\n" +
                "</div>\n",
            "pagelet_newcomment": "" +
                "<div class=\"comment-area\">\n" +
                "    <div class=\"clearfix comm\">\n" +
                "        <div class=\"columen-left fl\">\n" +
                "            <div id=\"area-comment\" class=\"block\"></div>\n" +
                "            <div class=\"ac-pc-comment\" id=\"ac-pc-comment\">\n" +
                "                <div class=\"ac-comment-title\">\n" +
                "                    <div class=\"area-comm-title-left\">\n" +
                "                        <span class=\"area-comm-str\">评论</span>\n" +
                "                        <span class=\"area-comm-number\"></span>\n" +
                "                    </div>\n" +
                "                    <div class=\"area-comm-title-right\">\n" +
                "                        <a class=\"area-update update\" title=\"刷新\">\n" +
                "                            <img class=\"update\" src=\"../../assets/img/refresh-icon.png\" alt=''></a>\n" +
                "                    </div>\n" +
                "                </div>\n" +
                "                <div class=\"ac-comment-warn\"></div>\n" +
                "                <div class=\"ac-comment-top-editor\"></div>\n" +
                "                <div class=\"ac-comment-top-pager\"></div>\n" +
                "                <div class=\"ac-comment-loading\"></div>\n" +
                "                <div class=\"ac-comment-list\">\n" +
                "                    <div class=\"ac-comment-hot-list\" id=\"comment-hot-list\"></div>\n" +
                "                    <div class=\"ac-comment-root-list\" id=\"comment-root-list\"></div>\n" +
                "                </div>\n" +
                "                <div class=\"ac-comment-bottom-pager\"></div>\n" +
                "                <div class=\"ac-comment-bottom-editor\"></div>\n" +
                "                <div class=\"ac-comment-toast\"></div>\n" +
                "                <div class=\"ac-comment-usercard hide\"></div>\n" +
                "                <div class=\"ac-comment-dialog\"></div>\n" +
                "                <div class=\"ac-comment-message\"></div>\n" +
                "            </div>\n" +
                "        </div>\n" +
                "    </div>\n" +
                "</div>",
            "pagelet_danmaku": "" +
                "<div class=\"danmaku-wrapper\">\n" +
                "    <div class=\"danmaku-container\">\n" +
                "        <div class=\"danmaku-list-container\">\n" +
                "            <div class=\"danmaku-list\">\n" +
                "                <div class=\"list-title\">\n" +
                "                    <div class=\"time-grid\">时间<i></i></div>\n" +
                "                    <div class=\"content-grid\">弹幕内容<i></i></div>\n" +
                "                </div>\n" +
                "                <div class=\"list-body\">\n" +
                "                    <div class=\"scroll-content\">\n" +
                "                        <ul class=\"danmaku-items\" id=\"danmaku-items\"></ul>\n" +
                "                    </div>\n" +
                "                    <div class=\"message-box\"></div>\n" +
                "                    <div class=\"danmaku-page\">\n" +
                "                        <div class=\"last-page\"></div>\n" +
                "                        <div class=\"current-page\">\n" +
                "                            <div class=\"cur-page\">\n" +
                "                                <span id=\"page-info\"></span>\n" +
                "                                <i></i>\n" +
                "                            </div>\n" +
                "                            <ul class=\"page-pool\">\n" +
                "                                <li data-page=\"1\">第1页</li>\n" +
                "                            </ul>\n" +
                "                        </div>\n" +
                "                        <div class=\"next-page\"></div>\n" +
                "                    </div>\n" +
                "                </div>\n" +
                "            </div>\n" +
                "        </div>\n" +
                "    </div>\n" +
                "    <div class=\"danmaku-fold\">弹幕列表</div>\n" +
                "</div>\n",
            "player_box": "" +
                "<div id=\"player\">\n" +
                "    <div id=\"ACPlayer\">\n" +
                "        <div class=\"container-player\" style=\"\">\n" +
                "            <div class=\"container-video\">\n" +
                "                <div class=\"container-plugins-inner\">\n" +
                "                    <div class=\"container-controls\">\n" +
                "                        <div class=\"control-bar-bottom\"></div>\n" +
                "                        <div class=\"video-status\" data-bind-key=\"playStatus\" data-bind-attr=\"pause\"></div>\n" +
                "                    </div>\n" +
                "                </div>\n" +
                "            </div>\n" +
                "            <div class=\"container-plugins-outer\"></div>\n" +
                "        </div>\n" +
                "    </div>\n" +
                "</div>",
            "player_info": "<p><span>✔️</span>已使用<a href='https://dplayer.diygod.dev/zh/' target='_blank'>DPlayer</a>播放器，可以加载本地弹幕</p>",
            "player_warning": "" +
                "<p><span>⚠️</span>因为受到<a href='https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS' target='_blank'>浏览器跨域访问限制</a>，无法加载弹幕。如需观看弹幕，请使用http服务。" +
                "(例如：<a href='https://github.com/civetweb/civetweb' target='_blank'>推荐使用 CivetWeb</a>)</p>",
        },
        errMsg: {
            default: "<span>咦？世界线变动了，你好像来到了奇怪的地方。看看缺啥东西了~</span>",
            config: "<span>缺少 assets/js/config.js</span><br><span>这可是必要的数据</span>",
            main_data: "<span>缺少 data.js</span><br><span>用AcSaver保存点什么吧</span>",
            sub_data: "<span>缺少 data.js</span><br><span>一定是打开的姿势不对</span>"
        },
        rtypeMap: {
            id:{"bangumi":1,"video":2,"article":3,"album":4,"member":5,"comment":6,"moment":10},
            keys:{1:"bangumi",2:"video",3:"article",4:"album",5:"member",6:"comment",10:"moment"},
            name:{1:"番剧",2:"视频",3:"文章",4:"合辑",5:"用户",6:"评论",10:"动态"},
        },
        utils: {
            createTag: function (tagName, className="", attrs=[], innerHTML="") {
                let thisTag = document.createElement(tagName);
                if(className.length){thisTag.setAttribute("class", className);}
                attrs.forEach(function (attr) {
                    thisTag.setAttribute(attr[0], attr[1]);
                });
                thisTag.innerHTML = innerHTML;
                return thisTag;
            },
            quickJump: function (sec) {document.querySelector('video').currentTime = sec;},
            copyText: function (text) {navigator.clipboard?.writeText && navigator.clipboard.writeText(text)},
            pos2time: function (p) {
                let t = new Date(p);
                return t.toLocaleString("zh-CN");
            },
            playtime: function (p) {
                let t = new Date(0,0,0,0,0, 0,p);
                return t.toLocaleTimeString();
            },
            commentBlock: function (commentItem, subCommentsMap, isTop=false, nohr =false) {
                let userLink = 'https://www.acfun.cn/u/',
                    userPath = '../../member/',
                    cid = commentItem.commentId.toString(),
                    ncolor = {
                        '1': "color: #fd4c5c",
                        '2': "color: #964cfd",
                        '3': "color: #ff862a"
                    },
                    itemContent = commentItem.content;

                if(commentItem.replyTo!==0){
                    itemContent = "回复<a data-uid='"+commentItem.replyTo+"'>@"+commentItem.replyToUserName+"</a>: "+commentItem.content;
                }

                let mainDiv = SAVER.utils.createTag("div"),
                    commentMain = SAVER.utils.createTag("div", 'area-comment-top clearfix main-comment-item-'+cid, [
                        ['data-commentid', cid],
                        ['id', 'comment-'+cid]
                    ]),
                    commentFirst = SAVER.utils.createTag("div", 'area-comment-first clearfix', [
                        ['id', 'comment-first-'+cid]
                    ]),
                    commentFirstLeft = SAVER.utils.createTag("div", 'area-comment-left'),
                    commentAcerAvatarLink = SAVER.utils.createTag("a", 'thumb', [
                        ['target', '_blank'],
                        ['href', userLink+commentItem.userId.toString()]
                    ]),
                    commentAcerAvatarImg = SAVER.utils.createTag("img", 'avatar lazy', [
                        ['alt', commentItem.userId.toString()],
                        ['src', "../../assets/img/defaultAvatar.jpg"],
                        ['data-src', is_ONLINE?commentItem.userHeadImgInfo.thumbnailImageCdnUrl:(userPath+commentItem.userId.toString()+'_avatar')],
                        ['onerror', "this.src='../../assets/img/defaultAvatar.jpg';"]
                    ]),
                    commentFirstRight = SAVER.utils.createTag("div", "area-comment-right"),
                    commentTitle = SAVER.utils.createTag("div", "area-comment-title", [
                        ['title', commentItem.commentId.toString()]
                    ]),
                    commentTitleAcerLink = SAVER.utils.createTag("a", "name", [
                        ['target', '_blank'],
                        ['href', userLink+commentItem.userId.toString()],
                        ['data-userid', commentItem.userId.toString()]
                    ], commentItem.userName),
                    commentTitleText = SAVER.utils.createTag("span", "time_day", [], "发表于"),
                    commentTitleTime = SAVER.utils.createTag("span", "time_times", [], SAVER.utils.pos2time(commentItem.timestamp)),
                    commentDesc = SAVER.utils.createTag("div", "area-comment-des"),
                    commentDescContent = SAVER.utils.createTag("p", "area-comment-des-content", [], itemContent),
                    commentTool = SAVER.utils.createTag("div", "area-comment-tool"),
                    commentToolLike = SAVER.utils.createTag("a", "area-comment-like area-comment-up", [
                        ['target', '_blank'],
                        ['href', SAVER.ele.referer.getAttribute('content')+"#ncid="+commentItem.commentId]
                    ], "赞"+(parseInt(commentItem.likeCount)>0?commentItem.likeCountFormat:"")),
                    commentToolReply = SAVER.utils.createTag("a", "area-comment-reply", [
                        ['target', '_blank'],
                        ['href', SAVER.ele.referer.getAttribute('content')+"#ncid="+commentItem.commentId]
                    ], "回复"),
                    commentToolFrom = SAVER.utils.createTag("span", "area-comment-from"),
                    commentToolFromText = SAVER.utils.createTag("span", '', [], "来自"),
                    commentToolFromHere = SAVER.utils.createTag("span", "", [
                        ['style', 'margin-left:3px;']
                    ], commentItem.deviceModel),
                    commentToolMore = SAVER.utils.createTag("div", "area-comment-more"),
                    commentFirstIndex = SAVER.utils.createTag("span", "index-comment", [], "#"+commentItem.floor.toString()),

                    commentSec = SAVER.utils.createTag("div", "", [
                        ['id', 'comment-sec-'+cid]
                    ]),
                    commentArea = SAVER.utils.createTag("div", "area-comment-sec area-sec-close clearfix"),
                    commentList = SAVER.utils.createTag("div", "area-sec-list", [
                        ['id', 'area-sec-list-'+cid]
                    ]),  // 迭代评论块
                    commentPager = SAVER.utils.createTag("div"),
                    commentEnd = SAVER.utils.createTag("hr");

                commentAcerAvatarLink.appendChild(commentAcerAvatarImg);
                commentFirstLeft.appendChild(commentAcerAvatarLink);
                if(commentItem.nameColor!==0){
                    commentTitleAcerLink.setAttribute('style', ncolor[commentItem.nameColor.toString()]);
                }
                commentTitle.appendChild(commentTitleAcerLink);
                commentTitle.appendChild(commentTitleText);
                commentTitle.appendChild(commentTitleTime);
                commentDesc.appendChild(commentDescContent);
                commentToolFrom.appendChild(commentToolFromText);
                commentToolFrom.appendChild(commentToolFromHere);
                commentTool.appendChild(commentToolLike);
                commentTool.appendChild(commentToolReply);
                commentTool.appendChild(commentToolFrom);
                commentTool.appendChild(commentToolMore);
                commentFirstRight.appendChild(commentTitle);
                commentFirstRight.appendChild(commentDesc);
                commentFirstRight.appendChild(commentTool);
                commentFirst.appendChild(commentFirstLeft);
                commentFirst.appendChild(commentFirstRight);
                if(isTop){commentFirst.appendChild(commentFirstIndex);}
                commentArea.appendChild(commentList);
                commentArea.appendChild(commentPager);
                commentSec.appendChild(commentArea);
                commentMain.appendChild(commentFirst);
                commentMain.appendChild(commentSec);
                if(nohr===false){commentMain.appendChild(commentEnd);}
                mainDiv.appendChild(commentMain);

                // 循环插入 commentBlock
                if(subCommentsMap.hasOwnProperty(cid)){
                    subCommentsMap[cid]['subComments'].forEach(function (item, index) {
                        commentList.appendChild(SAVER.utils.commentBlock(item, {}));
                    });
                }
                else{commentSec.innerHTML = "";}
                return mainDiv;
            },
            commentPager: function (curPage, total) {
                if(total===1){return false;}
                function pageBtn(n) {
                    let p = SAVER.utils.createTag('a', 'pager__btn', [], n);
                    p.addEventListener('click', function () {SAVER.loader.commentLoader(parseInt(p.innerHTML));});
                    return p;
                }
                let pageMain = SAVER.utils.createTag('div', '', [['id', 'page-main']]),
                    pageWrapper = SAVER.utils.createTag('div', 'pager__wrapper'),
                    pagePrev = SAVER.utils.createTag('a', 'pager__btn pager__btn__prev', [], "上一页"),
                    pageNext = SAVER.utils.createTag('a', 'pager__btn pager__btn__next', [], "下一页"),
                    pageFirst = SAVER.utils.createTag('a', 'pager__btn', [], "1"),
                    pageEnd = SAVER.utils.createTag('a', 'pager__btn'),
                    pageInputDiv = SAVER.utils.createTag('div', 'pager__input'),
                    pageInput = SAVER.utils.createTag('input', "", [['type', 'text']]),
                    pageTags = [];
                if(curPage>1){
                    pagePrev.addEventListener('click', function () {SAVER.loader.commentLoader(curPage-1);});
                }
                else{pagePrev.classList.add("pager__btn__disabled");}
                if(curPage<total){
                    pageNext.addEventListener('click', function () {SAVER.loader.commentLoader(curPage+1);});
                }
                else{pageNext.classList.add('pager__btn__disabled');}
                pageInputDiv.append("跳至");
                pageInput.addEventListener('keydown', function (ev) {
                    if (ev.key === 'Enter') {
                        let i = parseInt(pageInput.value);
                        if (isNaN(i) || 1 > i > total || i === commentPageNow) {return false;}
                        SAVER.loader.commentLoader(i);
                    }
                })
                pageInputDiv.append(pageInput);
                pageInputDiv.append("页");
                pageTags.push(pagePrev);
                let cMax = 3,
                    cLeft = curPage - cMax, cRight = curPage + cMax,
                    pStart = cLeft < 1 ? 1 : cLeft, pEnd = cRight > total ? total : cRight;
                for (let i = pStart; i <= pEnd; i++) {
                    let nPage = pageBtn(i);
                    if(i === curPage) { // 当前页
                        nPage.classList.add("pager__btn__selected");
                        pageTags.push(nPage);
                    }else if(curPage - i === cMax){ // 第一个
                        if(i !== 1){
                            let ellipsis = SAVER.utils.createTag('span', 'pager__ellipsis', [], "...");
                            nPage.innerHTML = "1";
                            pageTags.push(nPage);
                            pageTags.push(ellipsis);
                        }
                        else{pageTags.push(nPage);}
                    }else if(i - curPage === cMax){ // 最后一个
                        if(i !== total){
                            let ellipsis = SAVER.utils.createTag('span', 'pager__ellipsis', [], "...");
                            nPage.innerHTML = total.toString();
                            pageTags.push(ellipsis);
                            pageTags.push(nPage);
                        }
                        else{pageTags.push(nPage);}
                    }else if(Math.abs(curPage - i) < cMax){ // 其他页
                        pageTags.push(nPage);
                    }
                }
                pageTags.push(pageNext);
                pageTags.push(pageInputDiv);
                pageTags.forEach(function (item) {pageWrapper.append(item);});
                pageMain.append(pageWrapper);
                let pager = document.querySelector('.ac-comment-top-pager');
                pager.innerHTML = "";
                pager.append(pageMain);
            },
            danmakuItem: function (danmaku_single) {
                let danmaku_li = SAVER.utils.createTag("li", 'danmaku-item', [
                        ['data-id', danmaku_single.danmakuId],
                        ['data-user', danmaku_single.userId],
                        ['data-time', (danmaku_single.position / 1000).toString()],
                        ['data-message', danmaku_single.body]
                    ]),
                    dan_time = SAVER.utils.createTag("div", 'danmaku-time', [], SAVER.utils.playtime(danmaku_single.position)),
                    dan_content = SAVER.utils.createTag("div", 'danmaku-content', [], danmaku_single.body),
                    dan_user = SAVER.utils.createTag("div", 'searchListUser', [
                        ['style', 'margin-right: 6px; font-size: 20px;'],
                        ['title', 'UID:' + danmaku_single.userId]
                    ], "⌂");
                danmaku_li.addEventListener('click', function () {
                    SAVER.utils.quickJump(Math.floor(danmaku_single.position / 1000));
                });
                danmaku_li.appendChild(dan_time);
                danmaku_li.appendChild(dan_content);
                danmaku_li.appendChild(dan_user);
                return danmaku_li
            },
            indexItem: function (data) {
                let basePath = data[0] + "/" + data[1],
                    dataJs = basePath + "/data/" + data[1] + ".js",
                    thisData;
                function iconText(main_class, sp_class, icon_class, icon_text, text) {
                    let sub = SAVER.utils.createTag('span', main_class||""),
                        sp = SAVER.utils.createTag('span', sp_class||"icon ac-icon"),
                        icon = SAVER.utils.createTag('i', icon_class, [], icon_text||"iconfont");
                    sp.append(icon);
                    sub.append(sp);
                    sub.append(text);
                    return sub;
                }
                SAVER.jsLoader(dataJs, function () {
                    thisData = LOADED[data[0]][data[1]];
                    let cell = SAVER.utils.createTag('div', 'rlist__cards'),
                        leftC = SAVER.utils.createTag('div', 'video-card'),
                        leftLink = SAVER.utils.createTag('a', 'video-card__img', [
                            ['href', basePath + "/" + data[1] + ".html"]
                        ]),
                        leftImg = SAVER.utils.createTag('img', 'preview', [
                            ['src', basePath + "/cover._"]
                        ]),
                        playIcon = SAVER.utils.createTag('span', 'play-hover ac-icon'),
                        articleIcon = SAVER.utils.createTag('i', 'iconfont', [], "&#xe1a8;"),
                        videoIcon = SAVER.utils.createTag('i', 'iconfont', [], "&#xe164;"),
                        leftInfo = SAVER.utils.createTag('div', 'video-card__info', [],
                            "<span class=\"number\">"+(document.querySelectorAll('.rlist__cards').length+1)+"</span>"),
                        leftTitle = SAVER.utils.createTag('a', 'title', [
                            ['href', basePath + "/" + data[1] + ".html"]
                        ], thisData.title),
                        description = SAVER.utils.createTag('div', 'description', [], thisData.description||""),
                        leftExtra = SAVER.utils.createTag('div', 'extra'),
                        rightC = SAVER.utils.createTag('div', 'up-card'),
                        rightLink = SAVER.utils.createTag('a', 'up-card__avatar', [
                            ['target', '_Blank'],
                            ['href', 'https://www.acfun.cn/u/' + thisData.user.id]
                        ]),
                        rightImg = SAVER.utils.createTag('img', 'avatar', [
                            ['src', 'member/' + thisData.user.id + "_avatar"],
                            ['onerror', "this.src='assets/img/defaultAvatar.jpg';"]
                        ]),
                        rightInfo = SAVER.utils.createTag('div', 'up-card__info'),
                        upLink = SAVER.utils.createTag('a', 'name', [
                            ['target', '_Blank'],
                            ['href', 'https://www.acfun.cn/u/' + thisData.user.id]
                        ], thisData.user.name),
                        upSign = SAVER.utils.createTag('p', 'sign', [],
                            thisData.user.signature||thisData.user.verifiedText||thisData.user.comeFrom),
                        upInfo = SAVER.utils.createTag('div', 'extra');
                    if(data[0]==='article'){playIcon.append(articleIcon);}
                    else if(data[0]==='video'){playIcon.append(videoIcon);}
                    leftLink.append(leftImg);
                    leftLink.append(playIcon);
                    // 发布时间
                    leftExtra.append(iconText('pts', 'icon shallow-gray ac-icon',
                        'iconfont', '&#xe2f5;', thisData.createTime));
                    // 浏览量
                    leftExtra.append(iconText('pts', 'icon ac-icon',
                        'iconfont', data[0]==='article'?'&#xe1a8;':'&#xe164;', thisData.viewCountShow||thisData.formatViewCount));
                    // 评论数量
                    leftExtra.append(iconText('pts shallow-gray', 'icon ac-icon',
                        'iconfont', '&#xe627;', thisData.formatCommentCount||thisData.commentCountShow));
                    if(data[0]==='article'){
                        // 收藏数量
                        leftExtra.append(iconText('pts shallow-gray', 'icon ac-icon',
                            'iconfont', '&#xe160;', thisData.formatStowCount||""));
                    }else {
                        // 弹幕数量
                        leftExtra.append(iconText('pts shallow-gray', 'icon ac-icon',
                            'iconfont', '&#xe161;', thisData.danmakuCountShow||""));
                    }
                    let channelText=thisData.channel.name;
                    if(data[0]==='article'){
                        channelText = thisData.realm.realmName + " / " + channelText;
                    }else if(data[0]==='video'){
                        channelText += " / " + thisData.channel.parentName;
                    }
                    // 频道名
                    leftExtra.append(iconText('pts', 'icon ac-icon', 'iconfont', '&#xe15c;', channelText));
                    leftInfo.append(leftTitle);
                    leftInfo.append(description);
                    leftInfo.append(leftExtra);
                    leftC.append(leftLink);
                    leftC.append(leftInfo);
                    cell.append(leftC);
                    rightLink.append(rightImg);
                    upInfo.append(iconText('pts', 'icon ac-icon','iconfont', '&#xe15b;', thisData.user.followingCount));
                    upInfo.append(iconText('pts', 'icon ac-icon','iconfont', '&#xe155;', thisData.user.fanCount));
                    rightInfo.append(upLink);
                    rightInfo.append(upSign);
                    rightInfo.append(upInfo);
                    rightC.append(rightLink);
                    rightC.append(rightInfo);
                    cell.append(rightC);
                    document.getElementById('ac-list').append(cell);
                });
            },
            bangumiItem: function (data) {
                let basePath = data[0] + "/" + data[1],
                    dataJs = basePath + "/data/" + data[1] + ".js",
                    thisData;
                SAVER.jsLoader(dataJs, function () {
                    thisData = LOADED[data[0]][data[1]];
                    let mod_li = SAVER.utils.createTag("li", "ac-mod-li",[
                            ['data-aid', data[1]]]),
                        mod_link = SAVER.utils.createTag("a", "ac-mod-link", [
                            ['href', basePath + "/" + data[1] + ".html"]
                        ]),
                        mod_cover = SAVER.utils.createTag("div", "ac-mod-cover-wrap"),
                        mod_img = SAVER.utils.createTag("img", "ac-mod-cover", [
                            ['src', basePath + "/coverV._"]]),
                        mod_stat = SAVER.utils.createTag("div", "ac-mod-cover-stats ac-mod-cover-icon-zhuifan", [],
                            thisData.data.stowCountShow),
                        mod_title = SAVER.utils.createTag("div", "ac-mod-title", [
                            ['title', thisData.data.bangumiTitle]
                        ]);
                    mod_title.append(SAVER.utils.createTag("span","",[],
                        thisData.data.bangumiTitle));
                    mod_title.append(SAVER.utils.createTag("br"));
                    mod_title.append(SAVER.utils.createTag("em","",[],
                        thisData.data.latestItem));
                    mod_cover.append(mod_img);
                    mod_cover.append(mod_stat);
                    mod_link.append(mod_cover);
                    mod_link.append(mod_title);
                    mod_li.append(mod_link);
                    document.querySelector("ul.ac-mod-ul").append(mod_li);
                });
            },
            playerListener: function () {
                document.querySelector('#localPlayer').addEventListener('resize', function (ev) {
                    var e = this;
                    var i = this.lastWindowWidth
                        , t = this.lastWindowHeight
                        , n = window.innerHeight
                        , a = window.innerWidth
                        , o = !(a === i)
                        , r = !(n === t);
                    this.lastWindowWidth = a,
                        this.lastWindowHeight = n;
                    var l = document.getElementById("main-content")
                        , d = document.querySelector(".left-column");
                    if (o && !e && !r)
                        return a > 1050 && a < 1720 && a <= l.offsetWidth + 100 ? (l.style.maxWidth = 16 * (n - 60 - 90 - 20 - 40) / 9 + 380 + "px",
                            l.style.margin = "0 auto") : (l.style.maxWidth = "",
                            l.style.margin = "0 auto"),
                            l.style.width = "",
                            d.style.width = "";
                    if (r || e) {
                        var s = n - 60 - 90 - 20 - 40;
                        if (n && window.innerWidth > 1150) {
                            var c = a - 370 - 100;
                            if ((s = s < 382.5 ? 382.5 : s) > 9 * (c = c > 1340 ? 1340 : c) / 16)
                                return l.style.width = "",
                                    l.style.margin = "",
                                    l.style.maxWidth = c + 380 + "px",
                                    d.style.width = "";
                            var u = Math.floor(16 * s / 9);
                            l.style.width = u + 380 + "px";
                            l.style.maxWidth = "";
                            l.style.margin = "0 auto";
                            d.style.maxWidth = "";
                            d.style.width = u + "px";
                        } else
                            l.style.width = "";
                        l.style.maxWidth = "";
                        l.style.margin = "";
                        d.style.width = "";
                        d.style.maxWidth = "";
                    }
                });
            },
            h5player: function () {
                if(!is_LOCAL) {return SAVER.utils.dplayer();}
                document.querySelector(".container-video").insertAdjacentHTML("afterBegin",
                    "<video id=\"localPlayer\" preload=\"auto\" poster=\"cover._\" controls><source src=\""+PAGE.rId+".mp4\" type=\"video/mp4\"></video>");
                document.querySelector(".control-bar-bottom").innerHTML = SAVER.html.player_warning;
                player = document.querySelector('#localPlayer');
                player.addEventListener('play', function (ev) {
                    document.querySelector('.video-status').setAttribute('data-bind-attr', "play");
                });
                player.addEventListener('pause', function (ev) {
                    document.querySelector('.video-status').setAttribute('data-bind-attr', "pause");
                });
                SAVER.utils.playerListener();
                SAVER.playerSwitcher = function (src="") {
                    if(src.length===0){return false;}
                    player.getElementsByTagName('source')[0].setAttribute("src", src+".mp4");
                    player.load();
                    SAVER.loader.danmakuLoader(src);
                };
                return player;
            },
            dplayer: function () {
                if(is_LOCAL) {return SAVER.utils.h5player();}
                document.querySelector(".container-video").insertAdjacentHTML("afterBegin",
                    "<div id=\"localPlayer\"></div>");
                document.querySelector(".control-bar-bottom").innerHTML = SAVER.html.player_info;
                function setupDPlayer() {
                    // SAVER.jsLoader((is_MAIN?"":"../../")+"assets/js/localplayer.js");
                    const dp = new DPlayer({
                        container: document.getElementById('localPlayer'),
                        autoplay: false,
                        theme: '#618cd2',
                        loop: false,
                        lang: 'zh-cn',
                        screenshot: true,
                        hotkey: true,
                        preload: 'auto',
                        volume: 0.7,
                        mutex: true,
                        contextmenu: [
                            {
                                text: '去AcFun看原片',
                                link: 'https://www.acfun.cn/v/ac' + PAGE.rId,
                            }
                        ],
                        video: {
                            url: PAGE.rId + '.mp4',
                            pic: 'cover._',
                            thumbnails: 'data/'+PAGE.rId+'.thumbnails.png',
                            type: 'auto',
                        },
                        danmaku: {
                            id: '0',
                            api: "/assets/",
                            addition: ["data/"+PAGE.rId+".dplayer.json"]
                        }
                    });
                    player = dp;
                    let player_logo = document.getElementsByClassName('video-status')[0];
                    dp.on('play', function () {player_logo.setAttribute('data-bind-attr', "play");});
                    dp.on('pause', function () {player_logo.setAttribute('data-bind-attr', "pause");});
                    SAVER.playerSwitcher = function (src="") {
                        if(src.length===0){return false;}
                        dp.switchVideo(
                            {
                                url: src + '.mp4',
                                pic: 'cover._',
                                type: 'auto',
                            },
                            {
                                id: '0',
                                api: "/assets/",
                                addition: ["data/"+src+".dplayer.json"]
                            }
                        );
                        document.querySelector(".dplayer-bar-preview").style['background-image'] = "url(data/"+src+".thumbnails.png)";
                        SAVER.loader.danmakuLoader(src);
                    };

                }
                if(typeof DPlayer === "undefined"){
                    SAVER.jsLoader((is_MAIN?"":"../../")+"assets/js/DPlayer.min.js", setupDPlayer, SAVER.utils.h5player);
                }else{setupDPlayer();}
                return player;
            },
            resentListShow: function () {
                if(document.querySelectorAll("#recommends > div").length>0){
                    document.querySelector("#pagelet_newrecommend").style.display = "block";
                }
            },
            resentItem: {
                1: function (data) {
                    data = data.data;
                    let base = SAVER.utils.createTag('div', 'fl block-box block-video no-animate auto-recommend block-show'),
                        leftS = SAVER.utils.createTag('a', 'block-img has-danmu',[
                            ['href', '../'+data.bangumiId+'/'+data.bangumiId+'.html']
                        ]),
                        info = SAVER.utils.createTag('div', 'action-data'),
                        viewC = SAVER.utils.createTag('span', 'viewCount', [], data.stowCountShow),
                        // commC = SAVER.utils.createTag('span', 'commentCount', [], data.commentCountShow),
                        cover = SAVER.utils.createTag('img', '', [
                            ['src', '../'+data.bangumiId+'/cover._']
                        ]),
                        rightS = SAVER.utils.createTag('figure', 'block-title'),
                        h3 = SAVER.utils.createTag('h3'),
                        title = SAVER.utils.createTag('a', "", [
                            ['title', data.bangumiTitle],
                            ['href', '../'+data.bangumiId+'/'+data.bangumiId+'.html']
                        ], data.bangumiTitle),
                        up = SAVER.utils.createTag('a', 'uper-name', [
                            ['target', '_blank'],
                            ['href', 'https://www.acfun.cn/bangumi/aa'+data.bangumiId]
                        ], data.latestItem);
                    info.append(viewC);
                    // info.append(commC);
                    leftS.append(info);
                    leftS.append(cover);
                    h3.append(title);
                    rightS.append(h3);
                    rightS.append(up);
                    base.append(leftS);
                    base.append(rightS);
                    document.getElementById('recommends').append(base);
                    SAVER.utils.resentListShow();
                },
                2: function (data) {
                    let base = SAVER.utils.createTag('div', 'fl block-box block-video no-animate auto-recommend block-show'),
                        leftS = SAVER.utils.createTag('a', 'block-img has-danmu',[
                            ['href', '../'+data.dougaId+'/'+data.dougaId+'.html']
                        ]),
                        info = SAVER.utils.createTag('div', 'action-data'),
                        viewC = SAVER.utils.createTag('span', 'viewCount', [], data.viewCountShow),
                        commC = SAVER.utils.createTag('span', 'commentCount', [], data.commentCountShow),
                        cover = SAVER.utils.createTag('img', '', [
                            ['src', '../'+data.dougaId+'/cover._']
                        ]),
                        rightS = SAVER.utils.createTag('figure', 'block-title'),
                        h3 = SAVER.utils.createTag('h3'),
                        title = SAVER.utils.createTag('a', "", [
                            ['title', data.title],
                            ['href', '../'+data.dougaId+'/'+data.dougaId+'.html']
                        ], data.title),
                        up = SAVER.utils.createTag('a', 'uper-name', [
                            ['target', '_blank'],
                            ['href', 'https://www.acfun.cn/u/'+data.user.id]
                        ], "UP：" + data.user.name);
                    info.append(viewC);
                    info.append(commC);
                    leftS.append(info);
                    leftS.append(cover);
                    h3.append(title);
                    rightS.append(h3);
                    rightS.append(up);
                    base.append(leftS);
                    base.append(rightS);
                    document.getElementById('recommends').append(base);
                    SAVER.utils.resentListShow();
                },
                3: function (data) {
                    let base = SAVER.utils.createTag('div', 'contribution weblog-item'),
                        title = SAVER.utils.createTag('p', 'contb-title tit'),
                        link = SAVER.utils.createTag('a', '', [
                            ['href', '../'+data.articleId+'/'+data.articleId+'.html']
                        ], data.title),
                        info = SAVER.utils.createTag('div', 'contb-count'),
                        viewC = SAVER.utils.createTag('div', 'view-count'),
                        viewIco = SAVER.utils.createTag('i', 'view'),
                        viewNum = SAVER.utils.createTag('span', 'count num', [], data.formatViewCount),
                        commC = SAVER.utils.createTag('div', 'comm-count'),
                        commIco = SAVER.utils.createTag('i', 'commv'),
                        commNum = SAVER.utils.createTag('span', 'count num', [], data.commentCount);
                    title.append(link);
                    base.append(title);
                    viewC.append(viewIco);
                    viewC.append(viewNum);
                    info.append(viewC);
                    commC.append(commIco);
                    commC.append(commNum);
                    info.append(commC);
                    base.append(info);
                    document.getElementById('recommends').append(base);
                    SAVER.utils.resentListShow();
                }
            },
        },
        jsLoader: function (path, callback, failed) {
            let script = SAVER.utils.createTag('script', "by-jsloader", [
                ['type', 'text/javascript'],
                ['src', path]
            ]);
            if (script.readyState) {  // only required for IE <9
                script.onreadystatechange = function () {
                    if (script.readyState === "loaded" || script.readyState === "complete") {
                        script.onreadystatechange = null;
                        if(typeof callback !== "undefined") {callback();return true;}
                        if(typeof failed === "function"){failed();}else{console.log("jsLoader FAILED:", path);}
                        return false;
                    }
                };
            } else {  //Others
                script.onload = function () {
                    if(typeof callback !== "undefined") {callback();return true;}
                    if(typeof failed === "function"){failed();}else{console.log("jsLoader FAILED:", path);}
                    return false;
                };
                script.onerror = function () {
                    console.log("jsLoader FAILED:", path);
                    if(typeof failed === "function"){failed();}
                }
            }
            document.body.append(script);
        },
        dataLoader: function (dataName="", rid="", dataNum=-1, recall) {
            if(dataName.length===0||rid.length===0){return undefined;}
            let src = "data/" + rid + "." + dataName + ".js",
                cData = LOADED[dataName][rid];
            if(dataName==='comment'){
                if(dataNum<1){return undefined;}
                src="data/" + rid + ".comment." + dataNum + ".js";
                cData = LOADED[dataName][dataNum];
            }
            if(cData!==undefined){return recall(cData);}
            else{
                SAVER.jsLoader(src, function () {
                    if(dataName!=='comment'){recall(LOADED[dataName][rid]);}
                    else {recall(LOADED[dataName][dataNum]);}
                });
            }
        },
        cssLoader: function (cssName) {
            let src = (is_MAIN?"":"../../") + "assets/css/" + cssName,
                style = SAVER.utils.createTag('link', "by-jsloader", [
                ['type', 'text/css'],
                ['rel', 'stylesheet'],
                ['href', src]
            ]);
            SAVER.ele.head.appendChild(style);
        },
        loader: {
            // 错误页
            errorLoader: function (msgHtml="") {
                let msg = msgHtml||SAVER.errMsg.default,
                    headHtml = "" +
                        "<link href=\"https://cdn.aixifan.com/ico/favicon.ico\" rel=\"shortcut icon\">" +
                        "<title>有喵病~ AcSaver - 认真你就输啦 (?ω?)ノ- ( ゜- ゜)つロ</title>" +
                        "<link rel=\"stylesheet\" href=\""+(is_MAIN?"":"../../")+"assets/css/error.css\">",
                    bodyHtml = "" +
                    "<div id=\"app\"><div class=\"layout\"><main><div class=\"page-404\"><div class=\"img404\">" +
                    "<div class=\"img-icon\"></div><div class=\"page-text\">" + msg +
                    "<a href=\"https://github.com/dolaCmeo/acfunsdk\">去 AcFunSDK</a></div></div></div></main></div></div>";
                document.head.innerHTML = headHtml;
                document.body.innerHTML = bodyHtml;
            },
            // 懒加载初始化
            lazyLoader: function () {
                if(typeof LazyLoad === "undefined"){
                    SAVER.jsLoader((is_MAIN?"":"../../")+"assets/js/lazyload.min.js", function () {
                        lazyLoadInstance = new LazyLoad({});
                    });
                }
                else if(typeof lazyLoadInstance === "undefined"){
                    lazyLoadInstance = new LazyLoad({});
                }
                else{
                    lazyLoadInstance.update();
                }
            },
            // 图片预览初始化
            imageViwerLoader: function () {
                let areaClass = {article: "article-content",moment: "member-feed-moment-image"};
                if(typeof Viewer === "undefined"){
                    SAVER.cssLoader("viewer.min.css");
                    SAVER.jsLoader((is_MAIN?"":"../../")+"assets/js/viewer.min.js", function () {
                        gallery = new Viewer(document.getElementsByClassName(areaClass[PAGE.keyName])[0]);
                    });
                }
                else if(typeof gallery === "undefined"){
                    gallery = new Viewer(document.getElementsByClassName(areaClass[PAGE.keyName])[0]);
                }
            },
            // 导航栏初始化
            pageletHeader: function () {
                if(SAVER.ele.pagelet_header===null){return false;}
                if(!is_MAIN) {SAVER.ele.pagelet_header.innerHTML = SAVER.html.header;}
                let navMain = document.querySelector(".nav-guide-2"),
                    toOnlineLink = document.getElementById("online-link"),
                    searchInput = document.getElementById("nav-search"),
                    searchBtn = document.getElementById("nav-search-btn");
                CONFIG.navData.forEach(function (item) {
                    let nav2 = SAVER.utils.createTag("li", "nav-guide-2-item"),
                        nav2link = SAVER.utils.createTag("a", "", [
                            ["target", "_blank"],
                            ["href", "https://www.acfun.cn" + item.link]
                        ], item.navName),
                        nav2sub = SAVER.utils.createTag("ul", "nav-guide-3");
                    nav2.append(nav2link);
                    item.children.forEach(function (sub) {
                        let nav3 = SAVER.utils.createTag("li", "nav-guide-3-item"),
                            nav3link = SAVER.utils.createTag("a", "", [
                                ["target", "_blank"],
                                ["href", "https://www.acfun.cn" + sub.link]
                            ], sub.navName);
                        nav3.append(nav3link);
                        nav2sub.append(nav3);
                    });
                    nav2.append(nav2sub);
                    navMain.append(nav2);
                });
                navMain.innerHTML += "<div class=\"nav-guide-3-place\"></div>";
                if(SAVER.ele.referer!==null){
                    toOnlineLink.setAttribute("href", SAVER.ele.referer.getAttribute('content'));
                }
                searchInput.addEventListener("keypress", function(event) {
                    if (event.key === "Enter") {
                        event.preventDefault();
                        window.open("https://www.acfun.cn/search?keyword=" + this.value, "_blank");
                    }
                });
                searchBtn.addEventListener("click", function(event) {
                    window.open("https://www.acfun.cn/search?keyword=" + searchInput.value, "_blank");
                });
                if(!is_MAIN){
                    let bread = document.querySelector(".nav-bread"),
                        cInfo = LOADED[PAGE.keyName][parseInt(PAGE.rId)]['channel'];
                    if(cInfo){
                        let cMain = "<a href=\"https://www.acfun.cn/v/list"+cInfo.parentId+"/index.htm\" target=\"_blank\" class=\"channel-second\">"+cInfo.parentName+"</a>",
                            cSub = "<a href=\"https://www.acfun.cn/v/list"+cInfo.id+"/index.htm\" target=\"_blank\" class=\"channel-third\">"+cInfo.name+"</a>";
                        bread.innerHTML = cMain + cSub;
                    }else if(PAGE.keyName === 'bangumi'){
                        bread.innerHTML = "<a href=\"https://www.acfun.cn/bangumilist\" target=\"blank\" class=\"channel-second\">番剧</a>";
                    }
                    if(PAGE.keyName==='moment'){
                        document.querySelector("#header .logo").setAttribute("href", "../../feed.html");
                    }
                    else if(PAGE.keyName==='bangumi'){
                        document.querySelector("#header .logo").setAttribute("href", "../../anime.html");
                    }
                }
            },
            // 页脚初始化
            pageletFooter: function () {
                if(SAVER.ele.pagelet_footer===null){return false;}
                SAVER.ele.pagelet_footer.innerHTML = SAVER.html.pagelet_footer;
            },
            // 工具栏初始化
            pageletToolbar: function () {
                if(SAVER.ele.pagelet_toolbar===null){return false;}
                if(!is_MAIN){
                    SAVER.ele.pagelet_toolbar.innerHTML = SAVER.html.pagelet_toolbar;
                }
                document.getElementById('to-top').addEventListener('click', function () {
                    let timer= setInterval(function () {
                        if (document.documentElement.scrollTop !== 0) {
                            document.documentElement.scrollTop -= 100;
                        } else {
                            clearInterval(timer);
                        }
                    }, 2);
                })
            },
            // 评论加载
            commentLoader: function (pageNum=1) {
                SAVER.dataLoader('comment', PAGE.rId, pageNum, function (cData) {
                    let commentHotList= document.getElementById('comment-hot-list'),
                        commentRootList= document.getElementById('comment-root-list');
                    commentPageNow=pageNum;
                    commentHotList.innerHTML = "";commentRootList.innerHTML = "";
                    let totalToolbar = document.querySelector('#to-comm>.pts'),
                        totalText = totalToolbar.innerHTML,
                        total = parseInt(totalText);
                    cData.hotComments.forEach(function (item, index) {
                        commentHotList.appendChild(SAVER.utils.commentBlock(item, cData.subCommentsMap, true, index===(cData.hotComments.length-1)));
                    });
                    if(cData.hotComments.length>0){
                        commentHotList.innerHTML += "<div><div class=\"hot-comment-divid\"><hr><span>以上为热门评论</span><hr></div></div>";
                    }
                    cData.rootComments.forEach(function (item, index) {
                        commentRootList.appendChild(SAVER.utils.commentBlock(item, cData.subCommentsMap, true));
                    });
                    SAVER.utils.commentPager(cData.page, cData.total);
                    let lastP = document.getElementById('comment-lastPage'),
                        nextP = document.getElementById('comment-nextPage');
                    lastP.addEventListener('click', function () {
                        if(pageNum>1){SAVER.loader.commentLoader(pageNum-1);}
                    });
                    nextP.addEventListener('click', function () {
                        if(pageNum<cData.total){SAVER.loader.commentLoader(pageNum+1);}
                    });
                    if(cData.total<=1){
                        lastP.style.display = "none";
                        nextP.style.display = "none";
                    }else{
                        if(pageNum===1){
                            lastP.style.display = "none";
                            nextP.style.display = "";
                        }else if(pageNum===cData.total){
                            lastP.style.display = "";
                            nextP.style.display = "none";
                        }else{
                            lastP.style.display = "";
                            nextP.style.display = "";
                        }
                    }
                    lazyLoadInstance.update();
                });
            },
            // 评论区初始化
            pageletComment: function () {
                let pagelet_newcomment = document.querySelector("div.pagelet_newcomment");
                if(pagelet_newcomment===null){return false;}
                pagelet_newcomment.innerHTML = SAVER.html.pagelet_newcomment;
                SAVER.loader.commentLoader();
            },
            // 弹幕加载
            danmakuLoader: function (danmakuId="") {
                if(danmakuId.length===0){danmakuId=PAGE.rId;}
                SAVER.dataLoader('danmaku', danmakuId, -1, function (danmakuData) {
                    if(danmakuData===undefined){return false;}
                    let danmaku_list = document.getElementById('danmaku-items');
                    danmaku_list.innerHTML = "";
                    danmakuData.forEach(function (item, index) {danmaku_list.appendChild(SAVER.utils.danmakuItem(item));});
                    document.getElementById('page-info').innerHTML = "共"+danmakuData.length+"条";
                });
            },
            // 弹幕区初始化
            pageletDanmaku: function () {
                let pagelet_danmaku = document.querySelector("div.pagelet_danmaku");
                if(pagelet_danmaku===null){return false;}
                pagelet_danmaku.innerHTML = SAVER.html.pagelet_danmaku;
                document.querySelector(".danmaku-fold").addEventListener('click', function (ev) {
                    let father = document.querySelector(".danmaku-wrapper");
                    [this, father].forEach(function (item) {item.classList.toggle('unfold');});
                });
                SAVER.loader.danmakuLoader();
            },
            // 视频初始化
            videoInit: function () {
                if(document.querySelector("#player-box")===null){return false;}
                document.querySelector("#player-box").innerHTML = SAVER.html.player_box;
                if(is_LOCAL) {SAVER.utils.h5player();}else {SAVER.utils.dplayer();}
                document.querySelectorAll("#pagelet_partlist .single-p").forEach(function (ele) {
                    ele.addEventListener('click', function () {
                        if(ele.classList.contains('active')){return false;}
                        let on_active = document.querySelector("#pagelet_partlist .single-p.active");
                        if(on_active){
                            on_active.classList.remove('active');
                            ele.classList.add('active');
                            let on_num = document.querySelector("#pagelet_partlist .current-priority"),
                                title_episode = document.querySelector("#bangumiTitle .episode");
                            if(on_num){on_num.innerHTML = "" + (parseInt(ele.getAttribute("data-index")) + 1);}
                            if(title_episode){title_episode.innerHTML = ele.getAttribute("data-title");}
                            SAVER.playerSwitcher(ele.getAttribute("data-href"));
                        }
                    });
                });
            },
            // 缓存历史加载
            cacheLoader: function () {
                if([1, 2, 3].indexOf(PAGE.rType)>-1){
                    SAVER.jsLoader("../../data.js", function(){
                        AcSaver[PAGE.keyName].splice(0,9).forEach(function (rid) {
                            if(parseInt(rid)!==parseInt(PAGE.rId)){
                                SAVER.jsLoader('../'+rid+'/data/'+rid+'.js', function () {
                                    SAVER.utils.resentItem[PAGE.rType](LOADED[PAGE.keyName][rid]);
                                });
                            }
                        });
                    });
                }else if([10].indexOf(PAGE.rType)>-1){
                    let rdataTag = document.getElementById("member-feed-resource-data");
                    SAVER.jsLoader("../../data.js", function () {
                        if(rdataTag!==null){
                            let rrType = rdataTag.getAttribute('datatype'),
                                rrId = rdataTag.getAttribute('datasrc');
                            if(AcSaver[rrType].indexOf(rrId)>-1){
                                document.querySelectorAll(".member-feed-resource-link").forEach(function (ele) {
                                    ele.setAttribute('href', "../../"+rrType+"/"+rrId+"/"+rrId+".html");
                                });
                            }
                        }
                    });
                }
            },
            // 加载动态
            momentLoader: function (rId) {
                let RAW = LOADED.moment[rId],
                    mLink="moment/"+rId+"/"+rId+".html",
                    rLink="https://www.acfun.cn/moment/am"+rId;
                if(RAW===undefined){return false;}
                let momentMain = SAVER.utils.createTag("div", "ac-member-feed"),
                    momentUser = SAVER.utils.createTag("div", "member-feed-user"),
                    momentContent = SAVER.utils.createTag("div", "feed-content"),
                    momentInfos = SAVER.utils.createTag("div", "member-feed-interactive"),
                    momentSeparate = SAVER.utils.createTag("div", "feed-separate"),
                    momentMore = SAVER.utils.createTag("div", "feed-more");
                // feed-up
                let feed_up = SAVER.utils.createTag("div", "feed-up"),
                    up_avatar = SAVER.utils.createTag("div", "feed-up-avatar"),
                    up_link = SAVER.utils.createTag("a", "", [
                        ["target", "_blank"],
                        ["href", "https://www.acfun.cn/u/" + RAW.user.href]
                    ]),
                    up_avatar_img = SAVER.utils.createTag("img", "", [
                        ["src", "member/" + RAW.user.href + "_avatar"],
                        ["onerror", "this.src='assets/img/defaultAvatar.jpg';"]
                    ]),
                    up_info = SAVER.utils.createTag("div", "feed-up-info"),
                    up_name = SAVER.utils.createTag("div", "up-name no-color"),
                    up_name_link = SAVER.utils.createTag("a", "text-overflow", [
                        ["target", "_blank"],
                        ["href", "https://www.acfun.cn/u/" + RAW.user.href]
                    ], RAW.user.name),
                    up_verify = SAVER.utils.createTag("div", "verify"),
                    create_time = SAVER.utils.createTag("span", "feed-time", [], RAW.createTime);
                RAW.user.verifiedTypes.forEach(function (i) {
                    let vIcon = SAVER.utils.createTag("span", "ac-icon ac-icon-small"), vInfo;
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
                    vIcon.append(SAVER.utils.createTag("img", "icon-img", vInfo));
                    up_verify.append(vIcon);
                });
                up_link.append(up_avatar_img);
                up_avatar.append(up_link);
                feed_up.append(up_avatar);
                up_name.append(up_name_link);
                up_info.append(up_name);
                up_info.append(up_verify);
                up_info.append(create_time);
                feed_up.append(up_info);
                momentUser.append(feed_up);
                momentUser.addEventListener("click", function (event) {window.location.href = mLink;});
                momentMain.append(momentUser);
                // member-feed-moment
                let feed_content = SAVER.utils.createTag("div", "member-feed-moment"),
                    content_text = SAVER.utils.createTag("div", "member-feed-text", [], RAW.text);
                feed_content.append(content_text);
                if((RAW.imgs||[]).length){
                    let feed_image = SAVER.utils.createTag("div", "member-feed-moment-image member-feed-moment-image-" + RAW.imgs.length);
                    RAW.imgs.forEach(function (item) {
                        feed_image.append(SAVER.utils.createTag("img", "", [
                            ["src", "moment/"+rId+"/data/"+item.originUrl.split("/").slice(-1)[0]]
                        ]));
                    });
                    feed_content.append(feed_image);
                }
                // member-feed-repost-content
                if(RAW.repostSource){
                    let repost = SAVER.utils.createTag("div", "member-feed-repost-content"),
                        repost_up = SAVER.utils.createTag("div", "repost-up"),
                        repost_up_link = SAVER.utils.createTag("a", "",
                            [["target", "_blank"],["href", "https://www.acfun.cn/u/" + RAW.repostSource.user.userId]]),
                        repost_up_name = SAVER.utils.createTag("span", "up-name", [],
                            "@" + RAW.repostSource.user.userName),
                        repost_up_follow = SAVER.utils.createTag("span", "follow", [], "关注"),
                        repost_resource = SAVER.utils.createTag("div", "member-feed-resource");
                    repost_up_link.append(repost_up_name);
                    repost_up_link.append(repost_up_follow);
                    repost_up.append(repost_up_link);
                    repost.append(repost_up);
                    repost_resource.append(SAVER.utils.createTag("div", "member-feed-text"));
                    if([2,3].indexOf(RAW.repostSource.resourceType)>-1){
                        let resource_content = SAVER.utils.createTag("div", "member-feed-resource-content"),
                            content_left = SAVER.utils.createTag("div", "content-left"),
                            content_right = SAVER.utils.createTag("div", "content-right"),
                            resource_url = RAW.repostSource.shareUrl,
                            rtype = rTypeMap[RAW.repostSource.resourceType],
                            rid = RAW.repostSource.resourceId;
                        if(AcSaver[rtype].indexOf(rid.toString())>-1){resource_url = rtype + "/" + rid + "/" + rid + ".html";}
                        let left_link = SAVER.utils.createTag("a", "member-feed-resource-link",
                                [["target", "_blank"],["href", resource_url]]),
                            cover_img = SAVER.utils.createTag("img", "cover", [["src", RAW.repostSource.coverUrl]]),
                            resource_tag = SAVER.utils.createTag("span", "resource-tag", [],
                                rTypeCnName[RAW.repostSource.resourceType]);
                        left_link.append(cover_img);
                        left_link.append(resource_tag);
                        content_left.append(left_link);
                        resource_content.append(content_left);
                        if(rtype==='video'){
                            let video_time = SAVER.utils.createTag("div", "video-time", [],
                                RAW.repostSource.playDuration);
                            left_link.append(video_time);
                        }
                        let right_link = SAVER.utils.createTag("a", "member-feed-resource-link",
                                [["target", "_blank"],["href", resource_url]]),
                            resource_title = SAVER.utils.createTag("h1", "title text-overflow feed-link", [],
                                RAW.repostSource.caption||RAW.repostSource.articleTitle),
                            resource_desc = SAVER.utils.createTag("div", "desc", [],
                                RAW.repostSource.articleBody||RAW.repostSource.detail.description),
                            resource_info = SAVER.utils.createTag("div", "info"),
                            info_view = SAVER.utils.createTag("span", "view"),
                            info_view_icon = SAVER.utils.createTag("span", "ac-icon", [],
                                "<i class=\"iconfont\">&#xe62f;</i>"),
                            info_danmu = SAVER.utils.createTag("span", "danmu"),
                            info_danmu_icon = SAVER.utils.createTag("span", "ac-icon", [],
                                "<i class=\"iconfont\">&#xe630;</i>");
                        info_view.append(info_view_icon);
                        info_view.append(RAW.repostSource.viewCount);
                        resource_info.append(info_view);
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
                let interactive = SAVER.utils.createTag("div", "feed-interactive"),
                    iComment = SAVER.utils.createTag("div", "feed-interactive-comment"),
                    iBanana = SAVER.utils.createTag("div", "feed-interactive-banana"),
                    iLike = SAVER.utils.createTag("div", "feed-interactive-like"),
                    iShare = SAVER.utils.createTag("div", "feed-interactive-repost");
                iComment.innerHTML = "<div class=\"feed-interactive-comment\">" +
                    "<span class=\"ac-icon\"><i class=\"iconfont\">&#xe627;</i></span>" +
                    "<span>" + RAW.commentCount + "</span></div>";
                interactive.append(iComment);
                iBanana.innerHTML = "<div class=\"feed-interactive-banana\">" +
                    "<span class=\"icon_path ac-icon\"><i class=\"iconfont\">&#xe62a;</i></span>" +
                    "<span class=\"icon_fill ac-icon\"><i class=\"iconfont\">&#xe154;</i></span>" +
                    "<span>" + RAW.commentCount + "</span></div>";
                interactive.append(iBanana);
                iLike.innerHTML = "<div class=\"feed-interactive-like\">" +
                    "<span class=\"icon_path ac-icon\"><i class=\"iconfont\">&#xe629;</i></span>" +
                    "<span class=\"icon_fill ac-icon\"><i class=\"iconfont\">&#xe660;</i></span>" +
                    "<span>" + RAW.likeCount + "</span></div>";
                interactive.append(iLike);
                iShare.innerHTML = "<div class=\"feed-interactive-repost\">" +
                    "<span class=\"ac-icon\"><i class=\"iconfont\">&#xe628;</i></span>" +
                    "<span>"+ RAW.shareCount + "</span></div>";
                interactive.append(iShare);
                momentInfos.append(interactive);
                momentMain.append(momentInfos);
                momentMain.append(momentSeparate);
                momentMore.innerHTML = "<a href='"+rLink+"'><span class=\"ac-icon\"><i class=\"iconfont\">&#xe167;</i></span></a>";
                momentMain.append(momentMore);
                document.getElementById("feed-loading").before(momentMain);
            },
        },
        init: function () {
            let pathinfo = window.location.pathname.split('/'),
                topPages = ['index.html', 'feed.html', 'anime.html'];
            if(is_LOCAL){
                if(topPages.indexOf(pathinfo.slice(-1)[0])>-1){is_MAIN = true;}
                else if(pathinfo.length===6){is_MAIN = false;}
            }else{
                if(window.location.pathname==='/'){window.location.href="/index.html";return false;}
                if(topPages.indexOf(pathinfo.slice(-1)[0])>-1){is_MAIN = true;}
                else if(pathinfo.length>=4){is_MAIN = false;}
            }
            SAVER.jsLoader((is_MAIN?"":"../../")+"assets/js/config.js", function () {
                if(is_MAIN===true){
                    SAVER.loader.pageletHeader();
                    SAVER.loader.pageletToolbar();
                    SAVER.jsLoader("data.js", function () {
                        switch (pathinfo.slice(-1)[0]) {
                            case 'index.html':
                                let ADDED = [];
                                AcSaver.least.reverse().forEach(function (item) {
                                    if(['article', 'video'].indexOf(item[0])>-1 &&
                                        ADDED.indexOf({t: item[0], i: item[1]})===-1){
                                        SAVER.utils.indexItem(item);
                                        ADDED.push({t: item[0], i: item[1]});
                                    }
                                });
                                break;
                            case 'anime.html':
                                let animes = [];
                                AcSaver.least.reverse().forEach(function (item) {
                                    if(item[0]==='bangumi' && animes.indexOf({t: item[0], i: item[1]})===-1){
                                        SAVER.utils.bangumiItem(item);
                                        animes.push({t: item[0], i: item[1]});
                                    }
                                });
                                break;
                            case 'feed.html':
                                let lastMoment = [];
                                AcSaver.least.forEach(function (item) {
                                    if(item[0]==='moment'){lastMoment.push(item[1]);}
                                });
                                lastMoment.reverse().splice(0,9).forEach(function (rid) {
                                    SAVER.jsLoader('moment/'+rid+'/data/'+rid+'.js', function () {
                                        SAVER.loader.momentLoader(rid);
                                    });
                                });
                                break;
                        }
                    }
                    ,function () {SAVER.loader.errorLoader(SAVER.errMsg.main_data);});
                }
                else if(is_MAIN===false){
                    PAGE.rId = pathinfo.slice(-2)[0];
                    PAGE.keyName = pathinfo.slice(-3)[0];
                    PAGE.rType = SAVER.rtypeMap.id[PAGE.keyName];
                    SAVER.jsLoader("data/"+PAGE.rId+".js", function () {
                        SAVER.loader.pageletHeader();
                        SAVER.loader.pageletFooter();
                        SAVER.loader.pageletToolbar();
                        if(['video', 'bangumi', 'live'].indexOf(PAGE.keyName)>-1){
                            SAVER.loader.videoInit();
                            SAVER.loader.pageletDanmaku();
                        }
                        if(['article', 'moment'].indexOf(PAGE.keyName)>-1){
                            SAVER.loader.imageViwerLoader();
                        }
                        SAVER.loader.cacheLoader();
                        SAVER.loader.pageletComment();
                    }
                    ,function () {SAVER.loader.errorLoader(SAVER.errMsg.sub_data);});
                }
                SAVER.loader.lazyLoader();
            }
            ,function () {SAVER.loader.errorLoader(SAVER.errMsg.config);});
            return false;
        }
    }

SAVER.init();
