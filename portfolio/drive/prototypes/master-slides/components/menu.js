var dng = dng || {}; // Namespace declaration.

// Example data:

dng.Menu = function(data) {
  this.data_ = data;
  this.element_ = null;
  this.rendered_ = false;
  this.visible_ = false;
  this.left_ = 0;
  this.top_ = 0;
};

dng.Menu.prototype.getElement = function() {
  return this.element_;
};

// TODO If we want more menu item methods (like setChecked, setDisabled), add a
// new class for that. For now, just change img src to this URL for checkmarks.
dng.Menu.CHECKMARK_URL = 'img/toolbar/check_no_box.png';
dng.Menu.TRANSPARENT_URL = 'img/toolbar/transparent.png';

dng.Menu.prototype.render = function(parentEl) {
  // Create the menu itself.

  if (this.data_.customContent) {

    var customElem = $('<div class="custom-menu"></div>');
    customElem.append(this.data_.customContent);
    this.element_ = customElem.get(0);
    $(parentEl).append(this.element_);

  } else {

    this.element_ = $('<ul class="menu" tabindex="0"></ul>').get(0);

    // Add menu items to it.
    for ( var i = 0; i < this.data_.menuitems.length; i++) {
      var menuItemData = this.data_.menuitems[i];

      // Find menu item icon, if any.
      var iconSrc = '';
      if (menuItemData.opt_checked) { // Checked overrules icon
        iconSrc = dng.Menu.CHECKMARK_URL;
      } else if (menuItemData.opt_icon) {
        iconSrc = menuItemData.opt_icon;
      } else {
        iconSrc = dng.Menu.TRANSPARENT_URL;
      }

      // Create the menu item.
      $(this.element_).append('<li class="menu-item ' + (menuItemData.opt_divider ? 'divider' : '') + (menuItemData.opt_disabled ? 'disabled' : '') + (menuItemData.opt_submenu ? 'has-sub-menu' : '') + '"' + (menuItemData.opt_id ? (' id="' + menuItemData.opt_id + '"') : '') + '>' + '<img src="' + iconSrc + '" class="icon">' + '<span class="label">' + (menuItemData.opt_divider ? '' : menuItemData.label) + '</span>' + '<span class="right-text">' + '<span class="arrow-right ' + (menuItemData.opt_submenu ? 'has-sub-menu' : '') + '"></span>' + '</span>' + '<span class="sub-menu"></span>' + '</li>');
    }

    $(parentEl).append(this.element_);

  }

  // Render sub-menus.

  var subMenusToRender = [];
  if (this.data_['menuitems']) {
    for ( var i = 0; i < this.data_['menuitems'].length; i++) {
      var menuItemData = this.data_['menuitems'][i];
      if (menuItemData.opt_submenu) {
        subMenusToRender.push({
            submenu : menuItemData.opt_submenu,
            submenuEl : $('.has-sub-menu .sub-menu', this.element_).get(subMenusToRender.length),
            menuItemEl : $('.menu-item.has-sub-menu', this.element_).get(subMenusToRender.length)
        });
      }
    }
  }

  for ( var i = 0; i < subMenusToRender.length; i++) {
    (function() {

      var subMenu = subMenusToRender[i]['submenu'];
      var menuItemEl = subMenusToRender[i]['menuItemEl'];
      $(menuItemEl).on('mouseenter', function(e) {
        clearTimeout(menuItemEl.menuTimeout);
        menuItemEl.menuTimeout = setTimeout(function() {
          subMenu.setVisible(true);
        }, 50);
      });
      $(menuItemEl).on('mouseleave', function(e) {
        clearTimeout(menuItemEl.menuTimeout);
        menuItemEl.menuTimeout = setTimeout(function() {
          subMenu.setVisible(false);
        }, 50);
      });

      $(subMenusToRender[i]['submenu']).one('rendered.Menu', $.proxy(function(e) {
      }, this));
      subMenu.render(subMenusToRender[i]['submenuEl']);

    })(i);
  }

  this.rendered_ = true;
  this.handleRenderComplete_();
};

dng.Menu.prototype.handleRenderComplete_ = function() {
  $(this).trigger('rendered.Menu');

  // Now that DOM exists, we can listen for events.
  this.attachListeners_();

  // Apply changes that might have come in before rendering was complete.
  this.setPosition(this.left_, this.top_);
  this.setVisible(this.visible_, true /* opt_force */);
};

dng.Menu.prototype.attachListeners_ = function() {
  $('.menu-item', this.element_).mouseup($.proxy(this.handleMenuItemMouseUp_, this)).mouseenter($.proxy(this.handleMenuItemEnter_, this)).mouseleave($.proxy(this.handleMenuItemLeave_, this));
};

dng.Menu.prototype.handleMenuItemEnter_ = function(e) {
  var menuItemEl = e.currentTarget;
  $(menuItemEl).addClass('active');
};

dng.Menu.prototype.handleMenuItemLeave_ = function(e) {
  var menuItemEl = e.currentTarget;
  $(menuItemEl).removeClass('active');
};

dng.Menu.prototype.handleMenuItemMouseUp_ = function(e) {
  // Choosing a menu item closes the menu.
  var menuItemEl = e.currentTarget;
  if (!($(menuItemEl).hasClass('disabled') || $(menuItemEl).hasClass('divider'))) {
    // TODO find a better way
    // Defer hiding a moment, so any pending clicks can land on menu items
    // first.
    window.setTimeout($.proxy(function() {
      this.setVisible(false);
    }, this), 1);

    // Inform other interested components that a menu item was selected.
    $(this).trigger('select.Menu');
  }
};

dng.Menu.prototype.setVisible = function(visible, opt_force) {
  // Can't make a menu with no items visible (will be a weird thin white bar.)
  if (this.data_.menuitems.length == 0) {
    return;
  }

  if (!opt_force && this.visible_ == visible) {
    return;
  }

  this.visible_ = visible;

  if (this.rendered_) {
    $(this.element_).css('display', (visible ? 'block' : ''));
  }

  if (!visible) {
    // Inform other interested components that this menu is hidden.
    $(this).trigger('hide.Menu');
  }
};

dng.Menu.prototype.isVisible = function() {
  return this.visible_;
};

dng.Menu.prototype.setPosition = function(left, top) {
  this.left_ = left;
  this.top_ = top;

  if (this.rendered_) {
    $(this.element_).css('left', left + 'px').css('top', top + 'px');
  }
};

dng.Menu.prototype.getLabel = function() {
  return this.data_['opt_label'];
};

/**
 * Selects the first menu item.
 */
dng.Menu.prototype.selectFirst = function() {
  var activeMenuItemEl = $('.active.menu-item', this.element_).get(0);
  if (activeMenuItemEl) {
    $(activeMenuItemEl).removeClass('active');
  }

  $('.menu-item:first-child', this.element_).addClass('active');
};

/**
 * Selects the next menu item. If none is selected, selects the first.
 */
dng.Menu.prototype.selectNext = function() {
  var activeMenuItemEl = $('.active.menu-item', this.element_).get(0);
  var nextMenuItemEl = null;
  if (!activeMenuItemEl) {
    // Nothing is selected, start at first.
    nextMenuItemEl = $('.menu-item:first-child', this.element_).get(0);
  } else {
    nextMenuItemEl = activeMenuItemEl.nextSibling;
    if (!nextMenuItemEl || nextMenuItemEl.nodeType != Node.ELEMENT_NODE) {
      // There's no next item, so start over.
      nextMenuItemEl = $('.menu-item:first-child', this.element_).get(0);
    }
  }

  if (activeMenuItemEl) {
    $(activeMenuItemEl).removeClass('active');
  }

  $(nextMenuItemEl).addClass('active');
};

/**
 * Selects the previous menu item. If none is selected, selects the last.
 */
dng.Menu.prototype.selectPrevious = function() {
  var activeMenuItemEl = $('.active.menu-item', this.element_).get(0);
  var previousMenuItemEl = null;
  if (!activeMenuItemEl) {
    // Nothing is selected, start at end.
    previousMenuItemEl = $('.menu-item:last-child', this.element_).get(0);
  } else {
    previousMenuItemEl = activeMenuItemEl.previousSibling;
    if (!previousMenuItemEl || previousMenuItemEl.nodeType != Node.ELEMENT_NODE) {
      // There's no previous item, so start over.
      previousMenuItemEl = $('.menu-item:last-child', this.element_).get(0);
    }
  }

  if (activeMenuItemEl) {
    $(activeMenuItemEl).removeClass('active');
  }

  $(previousMenuItemEl).addClass('active');
};
