
const copyText = (text) => navigator.clipboard?.writeText && navigator.clipboard.writeText(text)
function goTo(domId) {
    let aTag = document.createElement('a');
    aTag.setAttribute('href', '#'+domId);
    aTag.click();
}
function loadJs(path, callback) {
    let script = document.createElement('script');
    script.setAttribute('type', 'text/javascript');
    script.setAttribute('src', path);
    if (script.readyState) {  // only required for IE <9
        script.onreadystatechange = function () {
            if (script.readyState === "loaded" || script.readyState === "complete") {
                script.onreadystatechange = null;
                if(typeof callback !== "undefined")(callback());
            }
        };
    } else {  //Others
        script.onload = function () {
            if(typeof callback !== "undefined")(callback());
        };
    }
    document.body.append(script);
}
let resentLoader = {
    2: function (data) {
    let base = document.createElement('figure'),
        leftS = document.createElement('a'),
        info = document.createElement('div'),
        viewC = document.createElement('span'),
        commC = document.createElement('span'),
        cover = document.createElement('img'),
        rightS = document.createElement('figure'),
        h3 = document.createElement('h3'),
        title = document.createElement('a'),
        up = document.createElement('a');
    base.setAttribute('class', 'fl block-box block-video no-animate auto-recommend block-show');
    leftS.setAttribute('class', 'block-img has-danmu');
    leftS.setAttribute('target', '_self');
    leftS.setAttribute('href', '../'+data.dougaId+'/'+data.dougaId+'.html');
    info.setAttribute('class', 'action-data');
    viewC.setAttribute('class', 'viewCount');
    viewC.innerHTML = data.viewCountShow;
    info.append(viewC);
    commC.setAttribute('class', 'commentCount');
    commC.innerHTML = data.commentCountShow;
    info.append(commC);
    leftS.append(info);
    cover.setAttribute('src', '../'+data.dougaId+'/cover._');
    leftS.append(cover);
    rightS.setAttribute('class', 'block-title');
    title.setAttribute('title', data.title);
    title.setAttribute('target', '_self');
    title.setAttribute('href', '../'+data.dougaId+'/'+data.dougaId+'.html');
    title.innerHTML = data.title;
    h3.append(title);
    rightS.append(h3);
    up.setAttribute('class', 'uper-name');
    up.setAttribute('target', '_blank');
    up.setAttribute('href', 'https://www.acfun.cn/u/'+data.user.id);
    up.innerHTML = "UP：" + data.user.name;
    rightS.append(up);
    base.append(leftS);
    base.append(rightS);
    document.getElementById('recommends').append(base);
},
    3: function (data) {
    let base = document.createElement('div'),
        title = document.createElement('p'),
        link = document.createElement('a'),
        info = document.createElement('div'),
        viewC = document.createElement('div'),
        viewIco = document.createElement('i'),
        viewNum = document.createElement('span'),
        commC = document.createElement('div'),
        commIco = document.createElement('i'),
        commNum = document.createElement('span');
    base.setAttribute('class', 'contribution weblog-item');
    title.setAttribute('class', 'contb-title tit');
    link.setAttribute('href', '../'+data.articleId+'/'+data.articleId+'.html');
    link.setAttribute('target', '_blank');
    link.innerHTML = data.title;
    title.append(link);
    base.append(title);
    info.setAttribute('class', 'contb-count');
    viewC.setAttribute('class', 'view-count');
    viewIco.setAttribute('class', 'view');
    viewNum.setAttribute('class', 'count num');
    viewNum.innerHTML = data.formatViewCount;
    viewC.append(viewIco);
    viewC.append(viewNum);
    info.append(viewC);
    commC.setAttribute('class', 'comm-count');
    commIco.setAttribute('class', 'comm');
    commNum.setAttribute('class', 'count num');
    commNum.innerHTML = data.commentCount;
    commC.append(commIco);
    commC.append(commNum);
    info.append(commC);
    base.append(info);
    document.getElementById('recommends').append(base);
}
};
function subNavLoader() {
    let bread = document.querySelector(".nav-bread"),
        cInfo = LOADED[PAGE.keyName][PAGE.rId]['channel'];
    let cMain = "<a href=\"https://www.acfun.cn/v/list"+cInfo.parentId+"/index.htm\" target=\"_blank\" class=\"channel-second\">"+cInfo.parentName+"</a>",
        cSub = "<a href=\"https://www.acfun.cn/v/list"+cInfo.id+"/index.htm\" target=\"_blank\" class=\"channel-third\">"+cInfo.name+"</a>";
    bread.innerHTML = cMain + cSub;
}
let pageLoader = {
        2: function () { // 视频
            subNavLoader();
            document.querySelector(".danmaku-fold").addEventListener('click', function (ev) {
                let father = document.querySelector(".danmaku-wrapper"),
                    leftC = document.querySelector(".left-column"),
                    rightC = document.querySelector(".right-column");
                [this, father, leftC, rightC].forEach(function (item) {
                    item.classList.toggle('unfold');
                })
            });
            document.querySelectorAll(".part-wrap .single-p").forEach(function (item) {
                item.addEventListener('click', function (ev) {
                    window.location.href = item.getAttribute('data-href');
                });
            });
        },
        3: function () { // 文章
            subNavLoader();
            document.querySelectorAll(".parts-container li.art-part").forEach(function (item) {
                item.addEventListener('click', function (ev) {
                    if(!item.classList.contains('active')){
                        let i = item.getAttribute('data-index');
                        document.querySelectorAll(".parts-container li.art-part").forEach(function (it) {
                            it.setAttribute('class', 'art-part');
                        })
                        item.setAttribute('class', 'art-part active');
                        document.querySelectorAll(".article-content > div").forEach(function (it) {
                            it.style = "display: none;"
                        })
                        document.querySelector("#content-part"+i).style = "";
                    }
                });
            });
        },
        10: function () {}
    };
function pageInit(pageData){
    // 载入基本数据
    loadJs("data/"+pageData.rId+".js", pageLoader[pageData.rType]);
    function commentLoader() {
        loadJs("data/"+pageData.rId+".comment.1.js", function () {
            loadJs("../../assets/js/comment.js");});
    }
    function danmakuLoader() {
        loadJs("data/"+pageData.rName+".danmaku.js", function () {
            loadJs("../../assets/js/danmakuList.js");});
    }
    let jsList = {
        2: [
            commentLoader,
            danmakuLoader,
            "../../assets/js/localplayer.js"
        ],
        3: [
            commentLoader
        ],
        10: [
            commentLoader
        ]
    }
    jsList[pageData.rType].forEach(function (p) {
        if (typeof p === "string"){
            loadJs(p);
        } else if(typeof p === "function"){
            p()
        }
    });
    // 载入近期缓存
    if([2, 3].indexOf(pageData.rType)>-1){
        loadJs("../../data.js", function(){
            AcSaver[pageData.keyName].splice(0,9).forEach(function (rid) {
                if(parseInt(rid)!==parseInt(pageData.rId)){
                    loadJs('../'+rid+'/data/'+rid+'.js', function () {
                        resentLoader[pageData.rType](LOADED[pageData.keyName][rid]);
                    });
                }
            });
        });
    }else if([10].indexOf(pageData.rType)>-1){
        let rdataTag = document.getElementById("member-feed-resource-data");
        loadJs("../../data.js", function () {
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
}
