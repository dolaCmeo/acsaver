let is_LOCAL = window.location.protocol === "file:",
    container_video = document.querySelector(".container-video"),
    video_bottom_info = document.querySelector(".control-bar-bottom");
if(is_LOCAL){
    container_video.insertAdjacentHTML("afterBegin",
        "<video id=\"localPlayer\" preload=\"auto\" poster=\"cover._\" controls>\n" +
            "<source src=\""+PAGE.rName+".mp4\" type=\"video/mp4\"></video>");
    video_bottom_info.innerHTML = "<p><span>⚠️</span>因为受到<a href='https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS' target='_blank'>浏览器跨域访问限制</a>，" +
        "无法加载弹幕。如需观看弹幕，请使用http服务。(例如：<a href='https://docs.python.org/zh-cn/3/library/http.server.html#http.server.SimpleHTTPRequestHandler' target='_blank'>python -m http.server</a>)</p>";
}else{
    container_video.insertAdjacentHTML("afterBegin",
        "<div id=\"localPlayer\"></div>");
    video_bottom_info.innerHTML = "<p><span>✔️</span>已使用<a href='https://dplayer.diygod.dev/zh/' target='_blank'>DPlayer</a>播放器，可以加载本地弹幕</p>";
    document.querySelector("#header .logo").setAttribute("href", "/");
}

let player = document.getElementById('localPlayer'),
    player_logo = document.getElementsByClassName('video-status')[0];
if(is_LOCAL) {
    player.addEventListener('play', function (ev) {
        player_logo.setAttribute('data-bind-attr', "play");
    });
    player.addEventListener('pause', function (ev) {
        player_logo.setAttribute('data-bind-attr', "pause");
    });
    player.addEventListener('resize', function (ev) {
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
            return a > 1050 && a < 1710 && a <= l.offsetWidth + 100 ? (l.style.maxWidth = 16 * (n - 60 - 90 - 20 - 40) / 9 + 370 + "px",
                l.style.margin = "0 auto") : (l.style.maxWidth = "",
                l.style.margin = "0 auto"),
                l.style.width = "",
                d.style.width = "";
        // void this.handleTitleDescSize();
        if (r || e) {
            var s = n - 60 - 90 - 20 - 40;
            if (n && window.innerWidth > 1150) {
                var c = a - 370 - 100;
                if ((s = s < 382.5 ? 382.5 : s) > 9 * (c = c > 1340 ? 1340 : c) / 16)
                    return l.style.width = "",
                        l.style.margin = "",
                        l.style.maxWidth = c + 370 + "px",
                        d.style.width = "";
                // void this.handleTitleDescSize();
                var u = Math.floor(16 * s / 9);
                l.style.width = u + 370 + "px",
                    l.style.maxWidth = "",
                    l.style.margin = "0 auto",
                    d.style.maxWidth = "",
                    d.style.width = u + "px"
            } else
                l.style.width = "",
                    l.style.maxWidth = "",
                    l.style.margin = "",
                    d.style.width = "",
                    d.style.maxWidth = ""
        }
        // this.handleTitleDescSize()
    });
}else{
    const dp = new DPlayer({
        container: document.getElementById('localPlayer'),
        autoplay: false,
        theme: '#FADFA3',
        loop: false,
        lang: 'zh-cn',
        screenshot: true,
        hotkey: true,
        airplay: false,
        chromecast: false,
        preload: 'auto',
        volume: 0.7,
        playbackSpeed: [0.5, 0.75, 1, 1.25, 1.5, 2],
        //logo: '../../assets/img/acfun_player_logo.png',
        mutex: true,
        contextmenu: [
            {
                text: '去AcFun看原片',
                link: 'https://www.acfun.cn/v/ac' + PAGE.rName,
            }
        ],
        video: {
            url: PAGE.rName + '.mp4',
            pic: 'cover._',
            thumbnails: 'data/'+PAGE.rName+'.thumbnails.png',
            type: 'auto',
        },
        danmaku: {
            addition: ["data/"+PAGE.rName+".dplayer.json"]
        }
    });
    dp.on('play', function () {
        player_logo.setAttribute('data-bind-attr', "play");
    });
    dp.on('pause', function () {
        player_logo.setAttribute('data-bind-attr', "pause");
    });
}

function quickJump(sec) {player.currentTime = sec;goTo("ACPlayer")}