function getUrlVars() {
  return;
  // var vars = {};
  //  var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m, key, value) {
  //    vars[key] = value;
  //  });
  //  return vars;
}

$(document).ready(function() {
  var menuHideTimeout;
  $('.menu-button').on({
      click : function(e) {
        $('.menu').toggle();
      },
      mouseout : function(e) {
        if (menuHideTimeout) {
          clearTimeout(menuHideTimeout);
        }
        menuHideTimeout = setTimeout(function() {
          $('.menu').hide();
        }, 1000);
      }
  });
  $('.menu').on({
      click : function(e) {
        $('.menu').hide();
        e.stopPropagation();
      },
      mouseover : function(e) {
        if (menuHideTimeout) {
          clearTimeout(menuHideTimeout);
        }
      }
  });
  // $('.skills .circle').on({
  //   click : function(e) {
  //     var desc = $(e.currentTarget).find('.circle-desc').text().trim();
  //     var descEnc = encodeURIComponent(desc);
  //     // document.location = 'badge_info.html?desc=' + descEnc;
  //     document.location = '/badge_info/' + desc;
  //   }
  // });
});