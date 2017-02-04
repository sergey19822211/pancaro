$('.slider_wrapper').slick({
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000
});

/*===============================
Isotope – jQuery плагин для управления группой блоков
http://isotope.metafizzy.co/
================================*/
// PORTFOLIO ISOTOPE 
$(".portfolio_items").isotope({
  itemSelector: '.single_item',
  layoutMode: 'fitRows',
  columnWidth: '.col-md-4'
});

// isotope click function

$('.portfolio_filter ul li').on('click', function(){
  $(".portfolio_filter ul li").removeClass("active");
  $(this).addClass("active");

  var selector = $(this).attr('data-filter');
  $(".portfolio_items").isotope({
    filter: selector,
    animationOptions: {
      duration: 750,
      easing: 'linear',
      queue: false,
    }
  }); 
});

/*=======================
overlay menu
=========================*/
!function($, window, _) {
  "use strict";

  var $doc = $(document), win = $(window), AnimationsArray = [];
  window.SITE = {
    init: function() {
     var menu2 = $("#full-menu.style2"), 
     items2 = menu2.find(".full-menu>li"), 
     toggle = $(".fa-bars"), 
     tlMainNav = (toggle.find("span"), 
      new TimelineLite({
        paused: !0,
        onStart: function() {
          menu2.css("display", "block");
        },
        onReverseComplete: function() {
          menu2.css("display", "none");
        }
      })), close = $(".menu-close"), links = menu2.find("li.scroll > a");

     AnimationsArray.push(tlMainNav), tlMainNav.add(TweenLite.to(menu2, .5, {
      autoAlpha: 1,
      ease: Quart.easeOut
    })).staggerFrom(items2, .1 * items2.length, {
      y: "50",
      opacity: 0,
      ease: Quart.easeOut
    }, .1), toggle.on("click", function() {
      return toggle.data("toggled") ? (tlMainNav.timeScale(1.6).reverse(), 
        toggle.data("toggled", !1)) : (tlMainNav.timeScale(1).restart(), 
        toggle.data("toggled", !0)), !1;
      }), close.on("click", function() {
        return tlMainNav.timeScale(1.6).reverse(), 
        toggle.data("toggled", !1), !1;
      }), links.on("click", function() {
        var _this = $(this), url = _this.attr("href"), hash = -1 !== url.indexOf("#") ? url.substring(url.indexOf("#") + 1) : "", pos = $("#" + hash).offset().top - $(".header").outerHeight() 
        return hash ? (tlMainNav.timeScale(2).reverse(), 
          toggle.data("toggled", !1), TweenMax.to(window, win.height() / 500, {
            scrollTo: {
              y: pos - 90
            },
            ease: Quart.easeOut
          }), !1) : !0;
      });
    }
  }, $doc.ready(function() {
    window.SITE.init();     
    $("a.home-down").on('click', function(){
      $('html, body').animate({scrollTop: $(this.hash).offset().top - 90}, 1000);
      return false;
    });
  });
}(jQuery, this, _);

 // GOOGLE MAP  
 function initialize() {
  var latlng = new google.maps.LatLng(48.54126609, 39.26449835); // в переменную latlng вносим координаты, которые мы будем использовать как центр нашей карты
  var settings = {
    zoom: 15,
    center: latlng,
    mapTypeControl: true,
    mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU},
    navigationControl: true,
    navigationControlOptions: {style: google.maps.NavigationControlStyle.SMALL},
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  var map = new google.maps.Map(document.getElementById("map_canvas"), 
    settings); //переменная map определяет, что наша карта будет использовать все заданные выше настройки
  var companyPos = new google.maps.LatLng(48.54126609, 39.26449835); // с помощью переменной companyPos, с помощью кот. устан. расположение маркера
  var companyMarker = new google.maps.Marker({ // создаем сам маркер
    position: companyPos,
    map: map,
    title:"Some title"
  });
}