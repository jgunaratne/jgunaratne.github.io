var ContextMenu = function(config) {
  var obj = this;
  if (config) {
    obj.app = config.app;
    obj.jqObj = config.jqObj;
    obj.selector = config.selector;
  }
};

ContextMenu.prototype = {
  init : function() {
    var obj = this;
    obj.addEvents();
  },
  addEvents : function() {
    var obj = this;

    $(document).on(
        'contextmenu',
        obj.selector,
        function(e) {
          $('.context-menu').hide();

          var viewportWidth = $(window).width();
          var viewportHeight = $(window).height();

          obj.jqObj.show();
          obj.jqObj.css('top', (e.pageY - 40) + 'px');
          obj.jqObj.css('left', (e.pageX - 40) + 'px');

          var bottom = obj.jqObj.offset().top + obj.jqObj.height();
          var right = obj.jqObj.offset().left + obj.jqObj.width();
          var submenus = obj.jqObj.find('.context-sub-menu');

          if (bottom > viewportHeight) {
            obj.jqObj.css('top', (viewportHeight - obj.jqObj.height() - 40)
                + 'px');
          }
          if (right > viewportWidth) {
            obj.jqObj.css('left', (viewportWidth - obj.jqObj.width() - 40)
                + 'px');
          }

          for ( var i = 0; i < submenus.length; i++) {
            var submenu = $(submenus[i]);
            if (right + submenu.width() > viewportWidth) {
              submenu.css('left', (-1 * submenu.width() - 2) + 'px');
            } else {
              submenu.css('left', obj.jqObj.width() + 'px');
            }
            if (bottom + submenu.height() > viewportHeight) {
              submenu.css('top', (-1 * (submenu.height() / 2) - 2) + 'px');
            } else {
              submenu.css('top', 0 + 'px');
            }
          }

          obj.app.contextMenuOpen = true;
          
          obj.app.createMenuPreviews();
          obj.app.createEditThemePreviews();
          obj.app.createLayoutMasterThemePreviews();

          e.stopPropagation();
          return false;
        });

    obj.jqObj.on('click', function(e) {
      obj.jqObj.hide();
      return false;
    });

    $(document).on('click', function(e) {
      obj.jqObj.hide();
    });

    $(document).on('mousedown', '.edit-theme-menu-item', function(e) {
      obj.app.setMode('layout');
      obj.app.createLayoutPreviews();
      $('.master-slide-previews').show();
      obj.app.updateUIComponents();

      setTimeout(function() {
        var layout = obj.app.getSelectedSlide().layout;
        obj.app.selectLayout(layout);
      }, 500);
    });

    obj.jqObj.on({
      mouseout : function() {
        if (obj.contextMenuTimeout) {
          clearTimeout(obj.contextMenuTimeout);
        }
        obj.contextMenuTimeout = setTimeout(function() {
          obj.jqObj.hide();
        }, 1000);
      },
      mouseover : function() {
        if (obj.contextMenuTimeout) {
          clearTimeout(obj.contextMenuTimeout);
        }
      }
    });

  }
};