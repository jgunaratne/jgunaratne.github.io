var dng = dng || {}; // Namespace declaration.


// Example data:
/*
var data = {
  menus: [
    menu1, // an UNRENDERED dng.Menu
    menu2
  ]
};
*/


dng.MenuBar = function(data) {
  this.data_ = data;
  this.element_ = null;
  this.rendered_ = false;

  /**
   * Whether the menu bar has been clicked on and should open menus on hover.
   */
  this.active_ = false;

  /**
   * Whether the little white masks between menu buttons and menus have been adjusted.
   */
  this.masksAdjusted_ = false;

  // How many of this menu bar's menus have yet to render.
  this.numMenusWaitingToRender_ = 0;
};


dng.MenuBar.prototype.getElement = function() {
  return this.element_;
};


dng.MenuBar.prototype.render = function(parentEl) {
  // If we don't have our templateFn yet, try again shortly.
  if (!dng.MenuBar.templateFn) {
    window.setTimeout($.proxy(function() {
      this.render(parentEl);
    }, this), 10);
    return;
  }

  // Render the menu bar itself, including buttons for each menu.
  this.element_ = $(parentEl).render(this.data_, dng.MenuBar.templateFn);

  var menus = this.getMenus_();
  this.numMenusWaitingToRender_ = menus.length;
  var context = this;
  $('.menu-button').each(function(idx, el) {
    // Add a small white element that will remove border between menu button
    // and menu when menu is open.
    $(el).append('<div class="mask"></div>');

    // Render this menu button's menu (it's a separate component).
    var placeholderId = 'menu-placeholder-' + idx;
    $(el).append('<div id="' + placeholderId + '"></div>');
    var placeholderEl = $('#' + placeholderId);
    var menu = menus[idx];
    $(menu).bind('rendered.Menu', $.proxy(context.handleMenuRendered_, context));
    menu.render(placeholderEl);

    // Associate the menu with its menu button.
    $(el).data('menu', menu);
  });
};


dng.MenuBar.prototype.handleMenuRendered_ = function(e) {
  if (--this.numMenusWaitingToRender_ == 0) {
    // The menu bar is only considered rendered when all of its menus are.
    this.rendered_ = true;
    $(this).trigger('rendered.MenuBar');

    // Now that it's rendered, we can attach listeners.
    this.attachListeners_();
  }
};


/**
 * Makes the little white mask <divs> the proper width to cover border between
 * menu buttons and their menus.
 */
dng.MenuBar.prototype.adjustMasks_ = function() {
  if (!this.masksAdjusted_) {
    // We can't do this in render_ because the CSS files might not have
    // finished loading yet, and so offsetWidth will return an incorrect
    // value. We skirt around this by deferring the adjustment until the first
    // time a menu is opened.
    $('.menu-button').each(function(idx, el) {
      $('.mask', el).css('width', el.offsetWidth - 2 + 'px');
    });
    this.masksAdjusted_ = true;
  }
};


dng.MenuBar.prototype.attachListeners_ = function() {
  // Menu bar itself
  $(this.element_).blur($.proxy(this.handleBlur_, this));

  // Menu buttons
  $('.menu-button', this.element_).
      mousedown($.proxy(this.handleMenuButtonMouseDown_, this)).
      mouseenter($.proxy(this.handleMenuButtonEnter_, this));

  // Menus
  var menus = this.getMenus_();
  for (var i = 0; i < menus.length; i++) {
    $(menus[i]).
        bind('hide.Menu', $.proxy(this.handleMenuHidden_, this)).
        bind('select.Menu', $.proxy(this.handleMenuSelection_, this));
  }
};


dng.MenuBar.prototype.handleBlur_ = function(e) {
  this.setActive(false);
};


dng.MenuBar.prototype.handleMenuButtonEnter_ = function(e) {
  if (!this.active_) {
    return;
  }

  var menuButtonEl = e.currentTarget;
  this.displayMenuForMenuButton_(menuButtonEl);
  $(menuButtonEl).addClass('active');
};


dng.MenuBar.prototype.displayMenuForMenuButton_ = function(menuButtonEl) {
  var menu = $(menuButtonEl).data('menu');
  if (menu.isVisible()) {
  	return; // Already open.
  }

  // Can only have one menu open at a time, so close others.
  this.closeMenus();

  // Then display this one.
  menu.setPosition(0 /* left */, menuButtonEl.offsetHeight - 2 /* top */);
  menu.setVisible(true);
};


dng.MenuBar.isMenuButton = function(el) {
	return $(el).hasClass('menu-button');
};


dng.MenuBar.isMenuButtonLabel = function(el) {
	return $(el).hasClass('label') && $(el.parentNode).hasClass('menu-button');
};


dng.MenuBar.prototype.handleMenuButtonMouseDown_ = function(e) {
  this.adjustMasks_();

  // If the mouse is down on something other than the menu button itself
  // (e.g. its menu), don't handle this.
  if (!(dng.MenuBar.isMenuButton(e.target) || dng.MenuBar.isMenuButtonLabel(e.target))) {
    return;
  }

  // preventDefault stops cursor from changing to text insertion cursor.
  // (Note that this can't be solved with CSS, it's Chrome behavior.)
  e.originalEvent.preventDefault();
  $(this.getElement()).focus();

  var menuButtonEl = e.currentTarget;

  if ($(menuButtonEl).hasClass('active')) {
    this.setActive(false); // Clicking an active menu deactivates entire bar.
  } else {
    this.displayMenuForMenuButton_(menuButtonEl);

    // Activate the menu button and overall menu bar.
    this.setActive(true);
    $(menuButtonEl).addClass('active');
  }
};


/**
 * @param active Whether the menu bar should actively open menus when its
 *     buttons are hovered. If false, also closes all menus.
 */
dng.MenuBar.prototype.setActive = function(active) {
  this.active_ = active;
  $(this.element_).toggleClass('active', active);

  if (!active) {
  	// TODO find a better way
  	// Defer this a moment, to let any clicks land on menus first.
  	window.setTimeout($.proxy(function() {
      this.closeMenus();
  	}, this), 200);
  }
};


dng.MenuBar.prototype.handleMenuHidden_ = function(e) {
  var hiddenMenu = e.currentTarget;
  $('.menu-button', this.element_).each(function(idx, el) {
    var menu = $(el).data('menu');
    if (menu === hiddenMenu) {
      $(el).removeClass('active');
    }
  });
};


dng.MenuBar.prototype.handleMenuSelection_ = function(e) {
  // When user selects something from a menu, menu bar becomes inactive.
  this.setActive(false);
};


dng.MenuBar.prototype.getMenus_ = function() {
  return this.data_['menus'];
};


/**
 * Just closes every menu. If the menu bar is active, it continues to be so
 * (e.g. hovering over a menu button will reopen a menu).
 */
dng.MenuBar.prototype.closeMenus = function() {
  var menus = this.getMenus_();
  for (var i = 0; i < menus.length; i++) {
    menus[i].setVisible(false);
  }

  $('.menu-button', this.element_).each(function(idx, el) {
    $(el).removeClass('active');
  });
};


dng.MenuBar.templateFn = null; // Will be set asynchronously (see below).


dng.MenuBar.DIRECTIVE = {
      '.menu-button': {
        'menu <- menus': {
          '.label': function(a) { // Label text
            return a.item.getLabel();
          }
        }
      }
    };


dng.MenuBar.handleTemplateLoaded_ = function(templateFn) {
  dng.MenuBar.templateFn = templateFn;
};


$(function(){
  dng.Component.loadTemplate(
      'menubar.css'         /* cssFile */,
      'menubar.html'        /* templateFile */,
      '.menu-bar'            /* templateSelector */,
      dng.MenuBar.DIRECTIVE /* directive */,
      dng.MenuBar.handleTemplateLoaded_ /* callbackFn */);
});
