$(document).ready(function() {
  PunchMenus.prototype.renderMenus();
  $('.master-slide-previews').hide();
  $('.slide-area-title').hide();

  punch = new Punch();
  punch.init();

  punch.setupDemoMaterial();
  punch.centerSlide();

  var contextMenu = new ContextMenu({
    app : punch,
    jqObj : $('.context-menu.set-layout'),
    selector : '.slide-preview, .slide-area'
  });
  contextMenu.init();

  var contextMenuShape = new ContextMenu({
    app : punch,
    jqObj : $('.context-menu.box-menu'),
    selector : '.slide-area .box, .slide-area .box .content'
  });
  contextMenuShape.init();
  
  var contextMenuLayoutPreview = new ContextMenu({
    app : punch,
    jqObj : $('.context-menu.layout-preview-menu'),
    selector : '.layout-preview'
  });
  contextMenuLayoutPreview.init();

  var toolbar = new Toolbar({
    app : punch
  });
  toolbar.init();

  var slideN = 0;
  punch.showSlide($($('.slide-area .slide')[slideN]), slideN);

  punch.setSelectedSlide(0);

  punch.createEditThemePreviews();
  punch.createLayoutMasterThemePreviews();
  punch.updateSlidePreviews();

  punch.setToolbar('default');

  $(window).resize(function() {
    punch.centerSlide();
  });

});