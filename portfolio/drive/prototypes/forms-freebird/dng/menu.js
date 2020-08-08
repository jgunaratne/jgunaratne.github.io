var dng = dng || {}; // Namespace declaration.


// Example data:
/*
var data = {
  opt_label: 'Edit', // Set this if Menu will be used in a MenuBar.
  menuitems: [
    // Full-fledged item with an icon and an ID we can reference later.
    {
      label: 'Bold',
      opt_icon: 'icon-bold.png',
      opt_id: 'bold-menu-item'
    },
    // A divider, which doesn't need a label (it's ignored).
    {
      label: '',
      opt_divider: true
    },
    // Simple item with just a label.
    {
      label: 'Undo'
    },
    // Checked. All items are checkable, so only specify those that are checked.
    {
      label: 'Show changes',
      opt_checked: true
    }
  ]
};
*/


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


dng.Menu.prototype.render = function(parentEl) {
  // If we don't have our templateFn yet, try again shortly.
  if (!dng.Menu.templateFn) {
    window.setTimeout($.proxy(function() {
      this.render(parentEl);
    }, this), 10);
    return;
  }

  this.element_ = $(parentEl).render(this.data_, dng.Menu.templateFn);
  this.rendered_ = true;
  $(this).trigger('rendered.Menu');

  // Now that DOM exists, we can listen for events.
  this.attachListeners_();

  // Apply changes that might have come in before rendering was complete.
  this.setPosition(this.left_, this.top_);
  this.setVisible(this.visible_);
};


dng.Menu.prototype.attachListeners_ = function() {
  $('.menu-item', this.element_).
      mouseup($.proxy(this.handleMenuItemMouseUp_, this)).
      mouseenter($.proxy(this.handleMenuItemEnter_, this)).
      mouseleave($.proxy(this.handleMenuItemLeave_, this));
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
  	// Defer hiding a moment, so any pending clicks can land on menu items first.
  	window.setTimeout($.proxy(function() {
      this.setVisible(false);
  	}, this), 200);

    // Inform other interested components that a menu item was selected.
    $(this).trigger('select.Menu');
  }
};


dng.Menu.prototype.setVisible = function(visible) {
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


dng.Menu.templateFn = null; // Will be set asynchronously (see below).


// TODO If we want more menu item controls (like setChecked, setDisabled), add a
// new class for that. For now, just change img src to this URL for checkmarks.
dng.Menu.CHECKMARK_URL = dng.Component.BASE_URL + 'check_no_box.png';


dng.Menu.DIRECTIVE = {
      '.menu-item': {
        'menuitem <- menuitems': {
          '.label': 'menuitem.label',       // Label text
          '@id': 'menuitem.opt_id',         // (opt) ID to refer to this menu item
          '.icon@src': function(a) {
            if (a.item.opt_checked) {       // (opt) checked, overrules icon
              return dng.Menu.CHECKMARK_URL;
            } else if (a.item.opt_icon) {   // (opt) icon
              return a.item.opt_icon;
            } else {
              return '';
            }
          },
          '@class+': function(a) {
            var classes = '';
            if (a.item.opt_divider) {       // (opt) whether this is a divider
              classes += ' divider';
            }
            if (a.item.opt_disabled) {      // (opt) whether this is disabled
              classes += ' disabled';
            }
            return classes;
          }
        }
      }
    };


dng.Menu.handleTemplateLoaded_ = function(templateFn) {
  dng.Menu.templateFn = templateFn;
};


$(function(){
  dng.Menu.templateFn = dng.Component.loadTemplate(
          'menu.css' /* cssFile */,
          'menu.html' /* templateFile */,
          '.menu' /* templateSelector */,
          dng.Menu.DIRECTIVE /* directive */,
          dng.Menu.handleTemplateLoaded_ /* callbackFn */);
});
