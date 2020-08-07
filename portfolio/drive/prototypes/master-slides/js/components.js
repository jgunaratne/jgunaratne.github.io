PunchMenus = function() {

};

PunchMenus.prototype.renderMenus = function() {
  // TODO add the rest of the Punch icons

  var fileMenuData = {
    opt_label : 'File',
    menuitems : [ {
      label : 'Share...',
      opt_id : 'menu-share'
    }, {
      opt_divider : true
    }, {
      label : 'New',
      opt_id : 'menu-new'
    }, {
      label : 'Open...',
      opt_id : 'menu-open'
    }, {
      label : 'Rename...',
      opt_id : 'menu-rename'
    }, {
      label : 'Make a copy...',
      opt_id : 'menu-make-a-copy'
    }, {
      opt_divider : true
    }, {
      label : 'See revision history',
      opt_id : 'menu-revision-history'
    }, {
      label : 'Language',
      opt_id : 'menu-language'
    }, {
      opt_divider : true
    }, {
      label : 'Download as',
      opt_id : 'menu-download'
    }, {
      label : 'Publish to the Web...',
      opt_id : 'menu-publish'
    }, {
      label : 'Email collaborators...',
      opt_id : 'menu-email-collab'
    }, {
      label : 'Email as attachment...',
      opt_id : 'menu-email-attach'
    }, {
      opt_divider : true
    }, {
      label : 'Print settings and preview',
      opt_id : 'menu-print-settings'
    }, {
      label : 'Print',
      opt_icon : 'img/toolbar/print-icon.png',
      opt_id : 'menu-print'
    } ]
  };
  var fileMenu = new dng.Menu(fileMenuData);

  var editMenuData = {
    opt_label : 'Edit',
    menuitems : [ {
      label : 'Undo',
      opt_icon : 'img/toolbar/undo-icon.png',
      opt_id : 'menu-undo'
    }, {
      label : 'Redo',
      opt_icon : 'img/toolbar/redo-icon.png',
      opt_id : 'menu-redo'
    }, {
      opt_divider : true
    }, {
      label : 'Cut',
      opt_disabled : true,
      opt_icon : 'img/toolbar/cut-icon.png',
      opt_id : 'menu-cut'
    }, {
      label : 'Copy',
      opt_disabled : true,
      opt_icon : 'img/toolbar/copy-icon.png',
      opt_id : 'menu-copy'
    }, {
      label : 'Paste',
      opt_icon : 'img/toolbar/paste-icon.png',
      opt_id : 'menu-paste'
    }, {
      label : 'Delete',
      opt_id : 'menu-delete'
    }, {
      label : 'Duplicate',
      opt_id : 'menu-duplicate'
    }, {
      opt_divider : true
    }, {
      label : 'Select all',
      opt_id : 'menu-select-all'
    }, {
      label : 'Select none',
      opt_id : 'menu-select-none'
    }, {
      opt_divider : true
    }, {
      label : 'Find and replace...',
      opt_id : 'menu-find-replace'
    } ]
  };
  var editMenu = new dng.Menu(editMenuData);

  var viewMenuData = {
    opt_label : 'View',
    menuitems : [ {
      label : 'Start presentation',
      opt_id : 'menu-start-presentation'
    }, {
      opt_divider : true
    }, {
      label : 'Animations',
      opt_id : 'menu-animations'
    }, {
      label : 'Masters...',
      opt_id : 'mastersMenuItem'
    }, {
      opt_divider : true
    }, {
      label : 'Fit (70%)',
      opt_id : 'menu-fit',
      opt_disabled : true
    }, {
      label : '50%',
      opt_id : 'menu-50-percent'
    }, {
      label : '100%',
      opt_id : 'menu-100-percent'
    }, {
      label : '200%',
      opt_id : 'menu-200-percent'
    }, {
      opt_divider : true
    }, {
      label : 'Zoom in',
      opt_id : 'menu-zoom-in'
    }, {
      label : 'Zoom out',
      opt_id : 'menu-zoom-out'
    }, {
      opt_divider : true
    }, {
      label : 'Snap to',
      opt_id : 'menu-snap-to'
    }, {
      opt_divider : true
    }, {
      label : 'HTML view',
      opt_id : 'menu-html-view'
    }, {
      opt_divider : true
    }, {
      label : 'Show spelling suggestions',
      opt_id : 'menu-show-spelling',
      opt_checked : true
    }, {
      opt_divider : true
    }, {
      label : 'Show speaker notes',
      opt_id : 'menu-show-speaker-notes'
    }, {
      opt_divider : true
    }, {
      label : 'Compact controls',
      opt_id : 'menu-compact'
    }, {
      label : 'Full screen',
      opt_id : 'menu-full-screen'
    } ]
  };
  var viewMenu = new dng.Menu(viewMenuData);

  var insertMenuData = {
    opt_label : 'Insert',
    menuitems : [ {
      label : 'Text box',
      opt_id : 'menu-text-box'
    }, {
      label : 'Image...',
      opt_icon : 'img/toolbar/insert-image-icon.png',
      opt_id : 'menu-image'
    }, {
      label : 'Link...',
      opt_id : 'menu-link'
    }, {
      label : 'Video...',
      opt_id : 'menu-video'
    }, {
      label : 'Word Art',
      opt_id : 'menu-word-art'
    }, {
      label : 'Line',
      opt_id : 'menu-line'
    }, {
      label : 'Shape',
      opt_id : 'menu-shape'
    }, {
      label : 'Table',
      opt_id : 'menu-table'
    }, {
      label : 'Animate',
      opt_id : 'menu-animate',
      opt_disabled : true
    }, {
      opt_divider : true
    }, {
      label : 'Comment',
      opt_icon : 'img/toolbar/insert-comment-icon.png',
      opt_id : 'menu-comment'
    }, {
      opt_divider : true
    }, {
      label : 'New slide',
      opt_id : 'menu-insert-slide'
    }, {
      label : 'Import slides...',
      opt_id : 'menu-import-slides'
    } ]
  };
  var insertMenu = new dng.Menu(insertMenuData);

  var layoutSubmenuData = {
    menuitems : [ {} ]
  };
  layoutSubmenuData.customContent = $('#layoutThumbSubmenu').clone();

  var layoutSubmenu = new dng.Menu(layoutSubmenuData);

  var themeSubmenuData = {
    menuitems : [ {} ]
  };
  themeSubmenuData.customContent = $('.theme-thumb-submenu').clone();
  var themeSubmenu = new dng.Menu(themeSubmenuData);

  var slideMenuData = {
    opt_label : 'Slide',
    menuitems : [ {
      label : 'New slide',
      opt_id : 'menu-new-slide'
    }, {
      label : 'Duplicate slide',
      opt_id : 'menu-duplicate-slide'
    }, {
      label : 'Delete slide',
      opt_id : 'menu-delete-slide'
    }, {
      opt_divider : true
    }, 
    {
      label : 'Masters...',
      opt_id : 'mastersMenuItem2'
    },
    {
      label : 'Background...',
      opt_id : 'menu-background'
    }, {
      label : 'Change layout',
      opt_id : 'change-layout',
      opt_submenu : layoutSubmenu
    }, {
      label : 'Change theme',
      out_id : 'change-theme',
      opt_submenu : themeSubmenu
    }, {
      opt_divider : true
    }, {
      label : 'Change transition',
      opt_id : 'menu-change-transition'
    }, {
      opt_divider : true
    }, {
      label : 'Move slide up',
      opt_id : 'menu-move-slide-up',
      opt_disabled : true
    }, {
      label : 'Move slide down',
      opt_id : 'menu-move-slide-down',
      opt_disabled : true
    }, {
      label : 'Move slide to beginning',
      opt_id : 'menu-move-slide-beginning',
      opt_disabled : true
    }, {
      label : 'Move slide to end',
      opt_id : 'menu-move-slide-end',
      opt_disabled : true
    }, {
      opt_divider : true
    }, {
      label : 'Next slide',
      opt_id : 'menu-next-slide'
    }, {
      label : 'Previous slide',
      opt_id : 'menu-previous-slide'
    }, {
      label : 'First slide',
      opt_id : 'menu-first-slide'
    }, {
      label : 'Last slide',
      opt_id : 'menu-last-slide'
    } ]
  };
  var slideMenu = new dng.Menu(slideMenuData);

  var listStylesSubmenuData = {
    menuitems : [
        {
          label : 'Bullet <span style="line-height: 17px;font-size: 24px;position: relative;bottom: -4px;">&#8226;</span>',
          opt_id : 'menu-bullet'
        }, {
          label : 'Hollow &#9675;',
          opt_id : 'menu-hollow'
        }, {
          label : 'Square &#9632;',
          opt_id : 'menu-square'
        }, {
          opt_divider : true
        }, {
          label : '1, 2, 3',
          opt_id : 'menu-123'
        }, {
          label : 'a, b, c',
          opt_id : 'menu-lower-abc'
        }, {
          label : 'i, ii, iii',
          opt_id : 'menu-lower-roman'
        }, {
          label : 'A, B, C',
          opt_id : 'menu-upper-abc'
        }, {
          label : 'I, II, III',
          opt_id : 'menu-upper-roman'
        }, {
          opt_divider : true
        }, {
          label : 'More options...',
          opt_id : 'menu-more-options'
        } ]
  };
  var listStylesSubmenu = new dng.Menu(listStylesSubmenuData);

  var formatMenuData = {
    opt_label : 'Format',
    menuitems : [ {
      label : 'Bold',
      opt_icon : 'img/toolbar/bold-icon.png',
      opt_id : 'menu-bold'
    }, {
      label : 'Italic',
      opt_icon : 'img/toolbar/italic-icon.png',
      opt_id : 'menu-italic'
    }, {
      label : 'Underline',
      opt_icon : 'img/toolbar/underline-icon.png',
      opt_id : 'menu-underline'
    }, {
      label : 'Strikethrough',
      opt_icon : 'img/toolbar/strikethrough-icon.png',
      opt_id : 'menu-strikethrough'
    }, {
      label : 'Superscript',
      opt_icon : 'img/toolbar/superscript-icon.png',
      opt_id : 'menu-superscript'
    }, {
      label : 'Subscript',
      opt_icon : 'img/toolbar/subscript-icon.png',
      opt_id : 'menu-subscript'
    }, {
      opt_divider : true
    }, {
      label : 'Paragraph styles',
      opt_id : 'menu-para-styles'
    }, {
      label : 'Align',
      opt_id : 'menu-align'
    }, {
      label : 'Line spacing',
      opt_id : 'menu-line-spacing'
    }, {
      label : 'List styles',
      opt_submenu : listStylesSubmenu
    }, {
      opt_divider : true
    }, {
      label : 'Clear formatting',
      opt_icon : 'img/toolbar/clear-formatting-icon.png',
      opt_id : 'menu-clear-formatting'
    }, {
      opt_divider : true
    }, {
      label : 'Change shape',
      opt_id : 'menu-change-shape'
    }, {
      label : 'Line weight',
      opt_id : 'menu-line-weight'
    }, {
      label : 'Line dash',
      opt_id : 'menu-line-dash'
    }, {
      label : 'Line decorations',
      opt_id : 'menu-line-decorations'
    }, {
      label : 'Arrowhead size',
      opt_id : 'menu-arrowhead-size'
    }, {
      opt_divider : true
    }, {
      label : 'All text...',
      opt_id : 'menu-all-text'
    } ]
  };
  var formatMenu = new dng.Menu(formatMenuData);

  var arrangeMenuData = {
    opt_label : 'Arrange',
    menuitems : [ {
      label : 'Order',
      opt_id : 'menu-order'
    }, {
      opt_divider : true
    }, {
      label : 'Align horizontally',
      opt_id : 'menu-align-horiz'
    }, {
      label : 'Align vertically',
      opt_id : 'menu-align-vert'
    }, {
      label : 'Center on page',
      opt_id : 'menu-center-on-page'
    }, {
      opt_divider : true
    }, {
      label : 'Distribute',
      opt_id : 'menu-distribute'
    }, {
      label : 'Rotate',
      opt_id : 'menu-rotate'
    }, {
      opt_divider : true
    }, {
      label : 'Group',
      opt_id : 'menu-group'
    }, {
      label : 'Ungroup',
      opt_id : 'menu-ungroup'
    }, {
      label : 'Regroup',
      opt_id : 'menu-regroup'
    }, {
      opt_divider : true
    }, {
      label : 'Move to Slide',
      opt_id : 'menu-fg'
    }, {
      label : 'Move to Layout',
      opt_id : 'menu-bg'
    }, {
      label : 'Move to Master',
      opt_id : 'menu-master'
    } ]
  };
  var arrangeMenu = new dng.Menu(arrangeMenuData);

  var tableMenuData = {
    opt_label : 'Table',
    menuitems : [ {
      label : 'Insert table',
      opt_id : 'menu-insert-table'
    }, {
      opt_divider : true
    }, {
      label : 'Insert row above',
      opt_disabled : true,
      opt_id : 'menu-insert-row-above'
    }, {
      label : 'Insert row below',
      opt_disabled : true,
      opt_id : 'menu-insert-row-below'
    }, {
      label : 'Insert column left',
      opt_disabled : true,
      opt_id : 'menu-insert-col-left'
    }, {
      label : 'Insert column right',
      opt_disabled : true,
      opt_id : 'menu-insert-col-right'
    }, {
      opt_divider : true
    }, {
      label : 'Delete row',
      opt_disabled : true,
      opt_id : 'menu-delete-row'
    }, {
      label : 'Delete column',
      opt_disabled : true,
      opt_id : 'menu-delete-col'
    }, {
      opt_divider : true
    }, {
      label : 'Merge cells',
      opt_disabled : true,
      opt_id : 'menu-merge-cells'
    }, {
      label : 'Unmerge cells',
      opt_disabled : true,
      opt_id : 'menu-unmerge-cells'
    } ]
  };
  var tableMenu = new dng.Menu(tableMenuData);

  var helpMenuData = {
    opt_label : 'Help',
    menuitems : [ {
      label : 'Docs Help Center',
      opt_id : 'menu-help-center'
    }, {
      label : 'Docs User Forum',
      opt_id : 'menu-user-forum'
    }, {
      label : 'Docs Community on Google+',
      opt_id : 'menu-google-plus'
    }, {
      opt_divider : true
    }, {
      label : 'Report an issue',
      opt_id : 'menu-report-issue'
    }, {
      label : 'Report abuse',
      opt_id : 'menu-report-abuse'
    }, {
      opt_divider : true
    }, {
      label : 'Keyboard shortcuts',
      opt_id : 'menu-shortcuts'
    } ]
  };
  var helpMenu = new dng.Menu(helpMenuData);

  var menubarData = {
    menus : [ fileMenu, editMenu, viewMenu, insertMenu, slideMenu, formatMenu,
        arrangeMenu, tableMenu, helpMenu ]
  };
  this.menubar_ = new dng.MenuBar(menubarData);

  $(this.menubar_).bind('rendered.MenuBar', $.proxy(function(e) {
    this.menusRendered_ = true;
  }, this));

  // Render the menus in the DOM.
  this.menubar_.render($('#componentMenubar'));
};
