;(function () {
  window.$clamp = function (c, d) {
    function s(a, b) {
      n.getComputedStyle || (n.getComputedStyle = function (a, b) {
        this.el = a;
        this.getPropertyValue = function (b) {
          var c = /(\-([a-z]){1})/g;
          "float" == b && (b = "styleFloat");
          c.test(b) && (b = b.replace(c, function (a, b, c) {
            return c.toUpperCase()
          }));
          return a.currentStyle && a.currentStyle[b] ? a.currentStyle[b] : null
        };
        return this
      });
      return n.getComputedStyle(a, null).getPropertyValue(b)
    }

    function t(a) {
      a = a || c.clientHeight;
      var b = u(c);
      return Math.max(Math.floor(a / b), 0)
    }

    function x(a) {
      return u(c) *
        a
    }

    function u(a) {
      var b = s(a, "line-height");
      "normal" == b && (b = 1.2 * parseInt(s(a, "font-size")));
      return parseInt(b)
    }

    function l(a) {
      if (a.lastChild && a.lastChild.children && 0 < a.lastChild.children.length) return l(Array.prototype.slice.call(a.children).pop());
      if (a.lastChild && a.lastChild.nodeValue && "" != a.lastChild.nodeValue && a.lastChild.nodeValue != b.truncationChar) return a.lastChild;
      if (a.lastChild && a.lastChild.parentNode) {
        a.lastChild.parentNode.removeChild(a.lastChild)
      }
      ;
      return l(c)
    }

    function p(a, d) {
      if (d) {
        var e = a.nodeValue.replace(b.truncationChar, "");
        f || (h = 0 < k.length ?
          k.shift() : "", f = e.split(h));
        1 < f.length ? (q = f.pop(), r(a, f.join(h))) : f = null;
        m && (a.nodeValue = a.nodeValue.replace(b.truncationChar, ""), c.innerHTML = a.nodeValue + " " + m.innerHTML + b.truncationChar);
        if (f) {
          if (c.clientHeight <= d) if (0 <= k.length && "" != h) r(a, f.join(h) + h + q), f = null; else return c.innerHTML
        } else "" == h && (r(a, ""), a = l(c), k = b.splitOnChars.slice(0), h = k[0], q = f = null);
        if (b.animate) setTimeout(function () {
          p(a, d)
        }, !0 === b.animate ? 10 : b.animate); else return p(a, d)
      }
    }

    function r(a, c) {
      a.nodeValue = c + b.truncationChar
    }

    d = d || {};
    var n = window, b = {
        clamp: d.clamp || 2,
        useNativeClamp: "undefined" != typeof d.useNativeClamp ? d.useNativeClamp : !0,
        splitOnChars: d.splitOnChars || [".", "-", "\u2013", "\u2014", " "],
        animate: d.animate || !1,
        truncationChar: d.truncationChar || "\u2026",
        truncationHTML: d.truncationHTML
      }, e = c.style, y = c.innerHTML, z = "undefined" != typeof c.style.webkitLineClamp, g = b.clamp,
      v = g.indexOf && (-1 < g.indexOf("px") || -1 < g.indexOf("em")), m;
    b.truncationHTML && (m = document.createElement("span"), m.innerHTML = b.truncationHTML);
    var k = b.splitOnChars.slice(0),
      h = k[0], f, q;
    "auto" == g ? g = t() : v && (g = t(parseInt(g)));
    var w;
    z && b.useNativeClamp ? (e.overflow = "hidden", e.textOverflow = "ellipsis", e.webkitBoxOrient = "vertical", e.display = "-webkit-box", e.webkitLineClamp = g, v && (e.height = b.clamp + "px")) : (e = x(g), e <= c.clientHeight && (w = p(l(c), e)));
    return {original: y, clamped: w}
  }
})();

Date.prototype.pattern = function (fmt) {
  var o = {
    "M+": this.getMonth() + 1,
    "d+": this.getDate(),
    "h+": this.getHours() % 12 == 0 ? 12 : this.getHours() % 12,
    "H+": this.getHours(),
    "m+": this.getMinutes(),
    "s+": this.getSeconds(),
    "q+": Math.floor((this.getMonth() + 3) / 3),
    "S": this.getMilliseconds()
  };
  var week = {"0": "/u65e5", "1": "/u4e00", "2": "/u4e8c", "3": "/u4e09", "4": "/u56db", "5": "/u4e94", "6": "/u516d"};
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length))
  }
  if (/(E+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "/u661f/u671f" : "/u5468") : "") + week[this.getDay() + ""])
  }
  for (var k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)))
    }
  }
  return fmt
};

function preloadimages(arr) {
  var newimages = [], loadedimages = 0;
  var postaction = function () {
  }
  var arr = (typeof arr != "object") ? [arr] : arr;

  function imageloadpost() {
    loadedimages++;
    if (loadedimages == arr.length) {
      postaction(newimages); //call postaction and pass in newimages array as parameter
    }
  }

  for (var i = 0; i < arr.length; i++) {
    newimages[i] = new Image();
    newimages[i].src = arr[i]
    newimages[i].onload = function () {
      imageloadpost()
    };
    newimages[i].onerror = function () {
      imageloadpost()
    }
  }
  return { //return blank object with done() method
    done: function (f) {
      postaction = f || postaction //remember user defined callback functions to be called when images load
    }
  }
}

var doImgCovers;

function tabChange(className, index) {
  var tab = $('.tabText_tab_' + className);
  tab.removeClass('cur');
  $(tab.get(index)).addClass('cur');
  var text = $('.tabText_text_' + className);
  text.hide();
  $(text.get(index)).show();
  doImgCovers(true);
}

function computeImg(obj) {
  var obj = $(obj),
    _img = obj.find("img"),
    _src = _img.attr("src"),
    parentW = obj.width(),
    parentH = obj.height();
  preloadimages(_src).done(function (images) {
    //call back codes, for example:
    $.each(images, function (i, v) {
      var mediaW = v.width,
        mediaH = v.height,
        sw = (parentW / mediaW),
        sh = (parentH / mediaH),
        s = Math.max(sw, sh);
      var _left = (((parentW - (mediaW * s)) / 2) / parentW) * 100;
      var _top = (((parentH - (mediaH * s)) / 2) / parentW) * 100;

      var cssJson = {
        marginLeft: _left + '%',
        marginTop: _top + '%',
        width: ((mediaW / parentW) * s) * 100 + "%",
        height: ((mediaH / parentH) * s) * 100 + '%'
      };
      _img.css(cssJson)
    })
  });
}

function upScrollLoading(obj) {
  var obj = obj || ".scrollLoading";
  $(obj).scrollLoading({
      callback: function () {
        $(this).addClass("loadingEnd")
        var cover = $(this).closest(".do-img-cover");
        if (cover.length) {
          computeImg(cover);
        }
        // computeImg(this);
      }
    }
  )
}

$(function () {
  // 手机导航
  var doNavM = $(".do-nav-m"),
    doHeader = $(".do-header"),
    body = $("body");
  $(".do-nav-menu,.do-nav-btn,.do-subNav-btn").on("click", function () {
    if (!body.hasClass("navOpen")) {
      body.addClass("navOpen")
    } else {
      body.removeClass("navOpen")
    }
    ;
  });
  $(".do-close").on("click", function () {
    doNavM.removeClass("open")
  });

  if ($("#do-m-menustate:checked")[0]) {
    if (!body.hasClass("navOpen")) {
      body.addClass("navOpen")
    }
  }

  var waypointObj = $(".do-banner").length ? $(".do-banner") : false || $(".do-body").length ? $(".do-body") : $("#fullpage").find(".do-area").first();
  if (waypointObj.length) {
    var waypoint = new Waypoint({
      element: waypointObj,
      handler: function (direction) {
        if (direction == "down") {
          doHeader.addClass("open");
          doNavM.addClass("open");
        } else {
          doHeader.removeClass("open");
          doNavM.removeClass("open");
        }
      },
      offset: '-100px'
    })
  }

  // 字符截取
  $(".js-toclamp").each(function () {
    var num = parseInt($(this).data("clampnum")) || 2;
    if (num == 1) {
      $(this).addClass("do-ellipsis");
    } else {
      $clamp($(this)[0], {clamp: num, useNativeClamp: false, animate: false});
    }
  });

  // 横屏提醒
  body.append('<div class="do-tip-horizontal">\
                                <div class="do-middle">\
                                    <div class="do-middle-center">\
                                        <h4>建议使用竖屏浏览，以获得最佳体验</h4>\
                                        <p>如需横屏浏览，请点击 <span class="tipbtn">继续访问</span></p>\
                                    </div>\
                                </div>\
                            </div>');
  var doTipHorizontal = $(".do-tip-horizontal");
  doTipHorizontal.on("click", ".tipbtn", function () {
    doTipHorizontal.hide();
  });

  if ((window.orientation == 90 || window.orientation == -90) && screen.width < 1024) {
    doTipHorizontal.show();
  }

  if (window.addEventListener) {
    window.addEventListener('orientationchange', function (event) {
      if (window.orientation == 180 || window.orientation == 0) {
        doTipHorizontal.hide();
      }
      if ((window.orientation == 90 || window.orientation == -90) && screen.width < 1024) {
        doTipHorizontal.show();
      }
    });
  }

  doImgCovers = function doImgCovers(isup) {
    var doImgCover = $(".do-img-cover");
    if (doImgCover.length) {
      doImgCover.each(function () {
        if ($(this).find(".scrollLoading").length && !isup) return;
        computeImg(this);
      })
    }
  }
  doImgCovers();
  upScrollLoading();
  setTimeout(function () {
    upScrollLoading();
  }, 1000)

  // 返回顶部
  var winHeight = $(window).height();
  var win = $(window);
  var doGotop = $(".do-gotop");
  win.scroll(function () {
    var $top = $(this).scrollTop();
    if ($top > winHeight / 2) {
      doGotop.show();
    } else {
      doGotop.hide();
    }
  });
  doGotop.on("click", function () {
    $("html,body").animate({scrollTop: "0px"}, 666)
  });
  // 视频播放
  head.ready(document, function () {
    var doVideo = $(".do-element-video-content");
    if (doVideo.length) {
      doVideo.on("click", ".do-playbtn", function () {
        var videoUrl = $(this).data("video"),
          vodtpl = '';
        if (videoUrl.indexOf(".mp4") !== -1) {
          vodtpl = '<video style="width:100%;height:100%" controls="" autoplay="" name="media"><source src="' + videoUrl + '" type="video/mp4"></video>';
        } else {
          vodtpl = '<iframe height="100%" width="100%" src="' + videoUrl + '" frameborder="0" allowfullscreen=""></iframe>';
        }
        layer.alert(vodtpl, {
          title: false,
          btn: false,
          skin: 'do-video-alert'
        });
      })
    }
    // 表单地区选择
    var formArea = $(".form-area");
    if (formArea.length) {
      head.load([StaticUrl + "editor/js/jquery.cityselect.js?" + jsVersion], function () {
        formArea.each(function () {
          var _this = $(this),
            _area = _this.find(".form-area-val").val().split(",");

          $(this).citySelect({
            prov: _area[0] || null,
            city: _area[1] || null,
            dist: _area[2] || null,
            nodata: "none",
            url: StaticUrl + "editor/js/city.js"
          });
        });
      });
    }
    // 二维码组件
    var doQrcode = $(".do-element-qrcode");
    if (doQrcode.length) {
      head.load([StaticUrl + "editor/js/qrcode.js?" + jsVersion], function () {
        var qrcodeArr = [];
        doQrcode.each(function (i) {
          var _text = $(this).data('text'),
            _conf = $(this).data('conf')
          var showQrcodeClass = $(this).find('.showQrcode');
          showQrcodeClass.html('');
          qrcodeArr[i] = new QRCode(showQrcodeClass.get(0), {
            text: _text,
            width: _conf.width,
            height: _conf.width,
            colorDark: _conf.colorDark,
            colorLight: _conf.colorLight,
            correctLevel: QRCode.CorrectLevel.H
          });
        });
      });
    }
  });
  // 浏览器发生变化
  var isWidth = false;
  var resizeConf = {
    isWidth: false,
    doOnlineService: $("#do-online-service").length ? $("#do-online-service") : false
  };
  // 小图变大
  var listImgPreview = $(".do-listImgPreview");
  if (listImgPreview.length) {

    listImgPreview.each(function () {
      var _this = $(this),
        imgObjArr = _this.find("li").length ? _this.find("li") : _this.find(".do-element-image-content");

      _this.on("click", ".scrollLoading", function (e) {
        e.stopPropagation();
        e.preventDefault();
        var imgs = '', imgIndex = 0;
        if (imgObjArr.selector == "li") {
          var imgObjParent = $(this).closest("li");
          imgIndex = imgObjParent.index();
          $.map(imgObjArr, function (item, index) {
            var _src = $(item).find("img").data("src").split("?")[0],
              _src = _src + "?imageView2/2/w/1500";

            var _title = $(item).find(".title p").text();
            var _des = $(item).find(".des p").text();
            if (_title == '输入内容') {
              _title = '';
            }
            if (_des == '输入内容') {
              _title = '';
            }
            imgs += '<div class="swiper-slide"><div class="do-middle"><div class="do-middle-center"><img src="' + _src + '"><div class="title"><h5>' + _title + '</h5><p>' + _des + '</p></div></div></div></div>'
          });
        } else {
          imgIndex = 0;
          var _src = imgObjArr.find("img").data("src");
          var _title = imgObjArr.closest('.do-element-image').find(".title p").text();
          var _des = imgObjArr.closest('.do-element-image').find(".des p").text();
          if (_title == '输入内容') {
            _title = '';
          }
          if (_des == '输入内容') {
            _title = '';
          }
          imgs = '<div class="swiper-slide"><div class="do-middle"><div class="do-middle-center"><img src="' + _src + '"><div class="title"><h5>' + _title + '</h5><p>' + _des + '</p></div></div></div></div>';
        }

        var tpl = '<div class="do-swiperImgPreview"><div class="swiper-container"><div class="swiper-wrapper">\
                ' + imgs + '</div><div class="swiper-pagination"></div><div class="swiper-button-next swiper-button-white"></div>\
                <div class="swiper-button-prev swiper-button-white"></div></div><div class="do-swiper-button-close"><i class="icon-close"></i></div></div>';

        $(".do-swiperImgPreview").remove();
        $('body').append(tpl);

        var mySwiper = new Swiper('.do-swiperImgPreview .swiper-container', {
          initialSlide: imgIndex,
          slidesPerView: 1,
          spaceBetween: 0,
          pagination: '.swiper-pagination',
          paginationClickable: true,
          nextButton: '.swiper-button-next',
          prevButton: '.swiper-button-prev',
          grabCursor: true
        });
        $('.do-swiper-button-close').click(function () {
          $(".do-swiperImgPreview").remove();
        });
      })
    });
  }

  $(window).resize(function () {
    if (this.innerWidth < 640) {
      if (!resizeConf.isWidth) {
        if (resizeConf.doOnlineService) resizeConf.doOnlineService.prop("checked", false);
      }
      resizeConf.isWidth = true;
    } else {
      if (resizeConf.isWidth) {

      }
      resizeConf.isWidth = false;
    }
  });
  if ((head.browser.ie && head.browser.version <= 9)) {
    var doOnlineService = $(".do-online-service");
    doOnlineService.on("click", ".do-open", function () {
      doOnlineService.addClass("open")
    });
    doOnlineService.on("click", ".do-close", function () {
      doOnlineService.removeClass("open");
    })
  }
  // sns
  $(".do-alertOpen").click(function () {
    var json = (new Function("return " + $(this).data("json")))();
    layer.alert(json.content, json.conf);
  });
});