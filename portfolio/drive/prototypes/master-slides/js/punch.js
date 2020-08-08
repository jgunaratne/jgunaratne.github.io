var Punch = function() {

  var obj = this;

  obj.selectedSlideJQObj = null;
  obj.selectedSlideN = 0;

  obj.selectedLayoutJQObj = null;
  obj.selectedLayoutN = 0;

  obj.lastTextBoxSelected = null;
  obj.lastTextBoxDupSelected = null;

  obj.contextMenuOpen = false;

};

Punch.prototype.init = function() {
  var obj = this;
  obj.addEvents();
};

Punch.prototype.setMode = function(mode) {
  var obj = this;
  obj.mode = mode;
  switch (obj.mode) {
  case 'slide':
    $('.slide-area').removeClass('layout-mode');
    $('.slide-previews').removeClass('layout-mode');
    $('.text-placeholder .editable-text').attr('contenteditable', 'true');
    obj.setToolbar('slide');
    break;
  case 'layout':
    $('.slide-area .slide').hide();
    $('.slide-area').addClass('layout-mode');
    $('#exitLayoutItem a').text('Exit Masters');
    $('.slide-area-title').show();
    $('.slide-previews').addClass('layout-mode');
    obj.getSelectedLayout();
    $($('.slide-area .layout')[obj.selectedLayoutN]).show();
    $('.text-placeholder .editable-text').attr('contenteditable', 'false');
    obj.setToolbar('layout');
    break;
  case 'master':
    $('.slide-area .slide, .slide-area .layout').hide();
    $('.slide-area').addClass('layout-mode');
    $('#exitLayoutItem a').text('Exit Masters');
    $('.slide-area-title').show();
    $('.slide-previews').addClass('layout-mode');
    $('.text-placeholder .editable-text').attr('contenteditable', 'false');
    obj.setToolbar('layout');
    break;
  }
  obj.centerSlide();
};

Punch.prototype.setToolbar = function(type) {
  var obj = this;

  switch (type) {
  case 'no-tools':
    $('.toolbar.text').hide();
    $('.toolbar.shape').hide();
    break;
  case 'text':
    $('.toolbar.text').show();
    $('.toolbar.shape').hide();
    break;
  case 'shape':
    $('.toolbar.text').hide();
    $('.toolbar.shape').show();
    break;
  case 'layout':
    $('.toolbar.common').show();
    $('.toolbar.layout-options').show();
    break;
  case 'slide':
    $('.toolbar.common').show();
    if (obj.getMode() == 'slide') {
      $('.toolbar.layout-options').hide();
    } else {
      $('.toolbar.layout-options').show();
    }
    break;
  case 'default':
    $('.toolbar').hide();
    $('.toolbar.common').show();
  }

};

Punch.prototype.getMode = function() {
  var obj = this;
  return obj.mode;
};

Punch.prototype.getSelectedBox = function() {
  var obj = this;
  var selObj = obj.selectedSlideJQObj;
  var selData = obj.selectedSlideJQObj.data();
  var selItem = selData.selectedItem;
  return selItem;
};

Punch.prototype.getSelectedSlide = function() {
  var obj = this;
  var selected = $($('.slide-preview.selected')[0]);
  return selected.data().slideData;
};

Punch.prototype.getSelectedLayout = function() {
  var obj = this;
  var selData = obj.selectedSlideJQObj.data();
  var selLayout = selData.layout;
  obj.selectedLayoutJQObj = selLayout.jqObj;
  var layouts = $('.slide-area .layout');
  var layoutN = 0;
  for ( var i = 0; i < layouts.length; i++) {
    if (layouts[i] == obj.selectedLayoutJQObj[0]) {
      layoutN = i;
    }
  }
  obj.selectedLayoutN = layoutN;
  return selLayout;
};

Punch.prototype.setSelectedSlide = function(n) {
  var obj = this;

  var slidePreviews = $('.slide-previews .slide-preview');
  slidePreviews.removeClass('selected');
  $(slidePreviews[n]).addClass('selected');
  $('.sidenote').hide();

  obj.selectedSlideJQObj = $($('.slide-area .slide')[n]);
  obj.selectedSlideN = n;
  var slideData = obj.selectedSlideJQObj.data();

  $('.master-slide-previews .master-slide-preview').removeClass('selected')
      .addClass('affected');
  $('.master-slide-previews .layout-preview').removeClass('selected')
      .removeClass('affected');
  var layoutData = obj.selectedSlideJQObj.data().layout;
  layoutData.jqObjPreview.addClass('affected');

  $('.title-name').html('');
  $('.slide-layout-label').html('Slide ' + (n + 1));
  $('.layout-slide-use').html('');

};

Punch.prototype.setSelectedLayout = function(n) {
  var obj = this;

  $('.master-slide-previews').removeClass('slide-preview-active');

  var slidePreviews = $('.slide-preview');
  slidePreviews.removeClass('selected').removeClass('affected');

  var masterPreview = $('.master-slide-preview');
  masterPreview.addClass('affected');

  var slidePreviews = $('.master-slide-previews .slide-preview.layout-preview');
  slidePreviews.removeClass('selected');
  $(slidePreviews[n]).addClass('selected');

  obj.selectedLayoutJQObj = $($('.slide-area .layout')[n]);
  obj.selectedLayoutN = n;

  var childrenSlides = obj.selectedLayoutJQObj.data().childrenSlides;
  for ( var i = 0; i < childrenSlides.length; i++) {
    childrenSlides[i].jqObjPreview.addClass('affected');
  }

};

Punch.prototype.setMasterSelected = function() {
  $('.master-slide-previews').removeClass('slide-preview-active');
  var slidePreviews = $('.slide-preview');
  slidePreviews.addClass('affected');
  var masterPreview = $('.master-slide-preview');
  masterPreview.addClass('selected').removeClass('affected');
};

Punch.prototype.selectLayout = function(layoutPreviewObj) {
  var obj = this;

  if (layoutPreviewObj == null) {
    layoutPreviewObj = obj.selectedSlideJQObj.data().layout.jqObjPreview[0];
  }

  var layoutPreviews = $('.master-slide-previews .slide-preview.layout-preview');
  layoutPreviews.removeClass('affected');

  var slidePreviews = $('.slide-previews .slide-preview');
  slidePreviews.removeClass('selected');

  var layoutN = 0;
  for ( var i = 0; i < layoutPreviews.length; i++) {
    if (layoutPreviews[i] == layoutPreviewObj) {
      layoutN = i;
    }
  }
  obj.setMode('layout');
  obj.setSelectedLayout(layoutN);
  obj.showLayout(layoutN);
  obj.createLayoutPreview(layoutN);

  var layouts = $('.slide-area .layout');
  var layout = $(layouts[layoutN]);
  var layoutData = layout.data();

  $('.title-name').html(layoutData.name);
  $('.slide-layout-label').html('layout');
  $('.sidenote').show();
  var slideChildren = layoutData.childrenSlides.length;
  var slidesStr = ' slides';
  if (slideChildren == 1) {
    slidesStr = ' slide';
  }
  $('.layout-slide-use').html(slideChildren + slidesStr)

  $('.slide-previews .slide-preview').removeClass('affected');
  for ( var i = 0; i < layoutData.childrenSlides.length; i++) {
    var slide = layoutData.childrenSlides[i];
    slide.jqObjPreview.addClass('affected');
  }
  $('.master-slide-previews .master-slide-preview').removeClass('selected')
      .removeClass('affected');
  $('.master-slide-previews').removeClass('slide-preview-active');
};

Punch.prototype.selectMaster = function() {
  var obj = this;

  $('.title-name').html('');
  $('.slide-layout-label').html('Master');
  $('.layout-slide-use').html('all slides');
  $('.sidenote').show();

  obj.setMode('master');
  obj.showMaster();
  $('.slide-previews .slide-preview').removeClass('affected');

  $('.master-slide-previews .master-slide-preview').addClass('selected')
      .removeClass('affected');
  $('.master-slide-previews .layout-preview').removeClass('selected').addClass(
      'affected');

  var slidePreviews = $('.slide-previews .slide-preview');
  slidePreviews.removeClass('selected').addClass('affected');
  $('.master-slide-previews').removeClass('slide-preview-active');
};

Punch.prototype.createSlidePreviews = function() {
  var obj = this;
  var slides = $('.slide-area .slide');
  var currSlide = obj.selectedSlideN;

  if (obj.getMode() == 'slide') {
    for ( var i = 0; i < slides.length; i++) {
      (function(i) {
        setTimeout(function() {
          obj.setSelectedSlide(i);
          obj.showSlide($($('.slide-area .slide')[i]), i);
          obj.createSlidePreview(i);
        }, i * 0);
      })(i);
    }
    setTimeout(function() {
      obj.setSelectedSlide(currSlide);
      obj.showSlide($($('.slide-area .slide')[currSlide]), currSlide);
    }, 50);
  } else {
    for ( var i = 0; i < slides.length; i++) {
      (function(i) {
        setTimeout(function() {
          obj.createSlidePreview(i);
        }, i * 0);
      })(i);
    }
  }
};

Punch.prototype.createSlidePreviewsNoTimeout = function() {
  var obj = this;
  var slides = $('.slide-area .slide');
  var currSlide = obj.selectedSlideN;

  if (obj.getMode() == 'slide') {
    for ( var i = 0; i < slides.length; i++) {
      (function(i) {
        obj.setSelectedSlide(i);
        obj.showSlide($($('.slide-area .slide')[i]), i);
        obj.createSlidePreview(i);
      })(i);
    }
    obj.setSelectedSlide(currSlide);
    obj.showSlide($($('.slide-area .slide')[currSlide]), currSlide);
  } else {
    for ( var i = 0; i < slides.length; i++) {
      (function(i) {
        setTimeout(function() {
          obj.createSlidePreview(i);
        }, i * 0);
      })(i);
    }
  }
};

Punch.prototype.createSlidePreview = function(i) {

  var obj = this;
  if (i == null) {
    i = obj.selectedSlideN;
  }

  var zoomLevel = .15;
  var master = $('.slide-area .master');

  var slidePreviews = $('.slide-previews .slide-preview');
  var slides = $('.slide-area .slide');

  var slide = $(slides[i]);
  var slidePreview = $(slidePreviews[i]);
  slidePreview.html('<div class="check"></div>');

  var slideData = slide.data();
  var layoutJQObj = slideData.layout.jqObj;

  var masterClone = master.clone().show();
  slidePreview.append(masterClone);
  masterClone.css('left', masterClone.offset().left - obj.slideLeft - 30);
  masterClone.css('zoom', zoomLevel);

  var layoutClone = layoutJQObj.clone().show();
  slidePreview.append(layoutClone);
  layoutClone.css('line-height', '1em');
  layoutClone.css('left', layoutClone.offset().left - obj.slideLeft - 30);
  layoutClone.css('zoom', zoomLevel);

  var layoutCloneTextPlaceholderBoxes = layoutClone
      .find('.box.text-placeholder');
  layoutCloneTextPlaceholderBoxes.hide();

  var slideClone = slide.clone(true, false).show();
  slidePreview.append(slideClone);
  slideClone.css('left', slideClone.offset().left - obj.slideLeft - 30);
  slideClone.css('zoom', zoomLevel);

  var slidePreviewData = slidePreview.data();
  slidePreviewData.slideData = slideData;

  $('.slide-previews .editable-text').attr('contenteditable', 'false');
  $('.slide-previews .box').unbind('click');

};

Punch.prototype.createLayoutPreviews = function() {
  var obj = this;

  var hideDivs = $('.slide-previews .slide-preview, .master-area');
  hideDivs.css('opacity', 0);
  var layouts = $('.slide-area .layout');
  var layoutPreviews = $('.master-slide-previews .layout-preview');
  setTimeout(function() {
    for ( var i = 0; i < layouts.length; i++) {
      (function(i) {
        // setTimeout(function() {
        if (i < layouts.length) {
          var layout = layoutPreviews[i];
          obj.showSlideBoxes();
          obj.selectLayout(layout);
          obj.createLayoutPreview(i);
        }
        // }, 0);
      })(i);
    }
    // setTimeout(function() {
    obj.selectLayout(layoutPreviews[0]);
    hideDivs.css('opacity', 1);
    // }, 100);
    obj.createMasterPreview();
  }, 50);
};

Punch.prototype.createLayoutPreviewsOnly = function() {
  var obj = this;
  var layouts = $('.slide-area .layout');
  for ( var i = 0; i < layouts.length; i++) {
    (function(i) {
      if (i < layouts.length) {
        obj.createLayoutPreview(i);
      }
    })(i);
  }
  obj.createMasterPreview();
};

Punch.prototype.createLayoutPreview = function(i) {
  var obj = this;
  if (i == null) {
    i = obj.selectedLayoutN;
  }

  var zoomLevel = .15;
  var master = $('.slide-area .master');

  var layoutPreviews = $('.master-slide-previews .slide-preview.layout-preview');
  var layouts = $('.slide-area .layout');

  var layout = $(layouts[i]);
  var layoutPreview = $(layoutPreviews[i]);
  var layoutData = layoutPreview.data();
  layoutPreview.html('<div class="caption">' + layoutData.name + '</div>');

  var masterClone = master.clone().show();
  layoutPreview.append(masterClone);
  masterClone.css('left', masterClone.offset().left - obj.slideLeft - 240);
  masterClone.css('zoom', zoomLevel);

  var layoutClone = layout.clone().show();
  layoutPreview.append(layoutClone);
  layoutClone.css('left', layoutClone.offset().left - obj.slideLeft - 240);
  layoutClone.css('zoom', zoomLevel);
  layoutClone.css('line-height', '1em');

  var layoutData = layout.data();
  var layoutPreviewData = layoutPreview.data();
  layoutPreviewData.slideData = layoutData;

};

Punch.prototype.createMasterPreview = function() {
  var obj = this;
  var zoomLevel = .15;
  var master = $('.slide-area .master');
  var masterClone = master.clone().show();

  var masterPreview = $('.master-slide-previews .slide-preview.master-slide-preview');
  masterPreview.html('');
  masterPreview.append(masterClone);
  masterClone.css('left', masterClone.offset().left - obj.slideLeft - 240);
  masterClone.css('zoom', zoomLevel);

  var masterData = master.data();
  var masterPreviewData = masterPreview.data();
  masterPreviewData.slideData = masterData;
};

Punch.prototype.createMenuPreviews = function() {
  var obj = this;

  var thumbsContainers = $('.thumbnails-container.context-menu-thumbnails');
  thumbsContainers.html('');

  var zoomLevel = .135;
  var master = $('.slide-area .master');
  var layouts = $('.slide-area .layout');

  for ( var i = 0; i < thumbsContainers.length; i++) {
    var thumbsContainer = $(thumbsContainers[i]);
    for ( var j = 0; j < layouts.length; j++) {

      var layout = $(layouts[j]);
      var layoutData = layout.data();
      var slidePreview = $('<div class="thumbnail">');
      slidePreview.html('<div class="caption">' + layoutData.name + '</div>');
      thumbsContainer.append(slidePreview);

      var centerOffset = -obj.getSlideCenterOffset() + 30;

      var masterClone = master.clone().show();
      slidePreview.append(masterClone);
      masterClone.css('left', centerOffset);
      masterClone.css('zoom', zoomLevel);

      var layoutClone = layout.clone().show();
      slidePreview.append(layoutClone);
      layoutClone.css('left', centerOffset);
      layoutClone.css('zoom', zoomLevel);
      layoutClone.css('line-height', '1em');

      (function(n) {
        slidePreview.click(function(e) {
          obj.changeLayout(n);
        });
      })(j);
    }
  }
};

Punch.prototype.createEditThemePreviews = function() {
  var obj = this;

  var thumbsContainers = $('.context-menu-theme-thumbnails');
  thumbsContainers.html('');

  var zoomLevel = .135;

  for ( var i = 0; i < thumbsContainers.length; i++) {

    var thumbsContainer = $(thumbsContainers[i]);
    var layoutContainer = $('<div class="thumbnail-container"><div class="desc">Edit layout</div></div>');
    var layoutPreview = $('<div class="thumbnail layout-preview"></div>');
    layoutContainer.append(layoutPreview);
    thumbsContainer.append(layoutContainer);

    if (obj.selectedSlideJQObj) {
      var layoutObj = obj.selectedSlideJQObj.data().layout;
      var layoutClone = layoutObj.jqObj.clone().show();
      layoutPreview.append(layoutClone);
      layoutClone.css('left', 30 - obj.getSlideCenterOffset());
      layoutClone.css('zoom', zoomLevel);
    }

    layoutContainer.click(function(e) {
      obj.selectLayout();
      
      setTimeout(function() {
        $('.master-slide-previews').show();
        obj.centerSlide();
        obj.createLayoutPreviewsOnly();
        obj.updateTitle();
      }, 100);
      
    });

    var masterContainer = $('<div class="thumbnail-container"><div class="desc">Edit master slide</div></div>');
    var masterPreview = $('<div class="thumbnail master-preview"></div>');
    masterContainer.append(masterPreview);
    thumbsContainer.append(masterContainer);

    var master = $('.slide-area .master');
    var masterClone = master.clone().show();
    masterPreview.append(masterClone);
    masterClone.css('left', 30 - obj.getSlideCenterOffset());
    masterClone.css('zoom', zoomLevel);

    masterContainer.click(function(e) {
      obj.selectMaster();
      
      setTimeout(function() {
        $('.master-slide-previews').show();
        obj.centerSlide();
        obj.createLayoutPreviewsOnly();
        obj.updateTitle();
      }, 100);
      
      
    });
  }

};

Punch.prototype.createLayoutMasterThemePreviews = function() {

  var obj = this;
  var thumbsContainers = $('.context-menu-add-to-theme-thumbnails');
  thumbsContainers.html('');
  var zoomLevel = .135;

  for ( var i = 0; i < thumbsContainers.length; i++) {

    var thumbsContainer = $(thumbsContainers[i]);
    var layoutContainer = $('<div class="thumbnail-container"><div class="desc">Move to slide layout</div></div>');
    var layoutPreview = $('<div class="thumbnail layout-preview"></div>');
    layoutContainer.append(layoutPreview);
    thumbsContainer.append(layoutContainer);

    if (obj.selectedSlideJQObj) {
      var layoutObj = obj.selectedSlideJQObj.data().layout;
      var layoutClone = layoutObj.jqObj.clone().show();
      layoutPreview.append(layoutClone);
      layoutClone.css('left', 30 - obj.getSlideCenterOffset());
      layoutClone.css('zoom', zoomLevel);
    }

    layoutContainer.click(function(e) {
      var selectedSlideObj = obj.selectedSlideJQObj.data();
      var selItem = selectedSlideObj.selectedItem;
      var selLayout = selectedSlideObj.layout;

      var dupBox = selItem;
      if (selItem.type == 'text-placeholder') {
        dupBox = obj.duplicateBox(selItem);
      }

      selLayout.add(dupBox, selLayout.jqObj);
      obj.showSlideBoxes();

      if (selItem.type == 'text-placeholder') {
        selectedSlideObj.selectedItem.jqObj.remove();
        selectedSlideObj.selectedItem = null;
      }

      obj.updateUIComponents();
      obj.createSlidePreviews();
    });

    var masterContainer = $('<div class="thumbnail-container"><div class="desc">Move to master slide</div></div>');
    var masterPreview = $('<div class="thumbnail master-preview"></div>');
    masterContainer.append(masterPreview);
    thumbsContainer.append(masterContainer);

    var master = $('.slide-area .master');
    var masterClone = master.clone().show();
    masterPreview.append(masterClone);
    masterClone.css('left', 30 - obj.getSlideCenterOffset());
    masterClone.css('zoom', zoomLevel);

    masterContainer.click(function(e) {
      var selectedSlideObj = obj.selectedSlideJQObj.data();
      var selItem = selectedSlideObj.selectedItem;

      var dupBox = selItem;
      if (selItem.type == 'text-placeholder') {
        dupBox = obj.duplicateBox(selItem);
      }

      var masterSlide = $('.slide-area .master').data();
      masterSlide.add(dupBox, masterSlide.jqObj);

      if (selItem.type == 'text-placeholder') {
        selectedSlideObj.selectedItem.jqObj.remove();
        selectedSlideObj.selectedItem = null;
      }

      obj.updateUIComponents();
      obj.createSlidePreviews();
    });
  }
};

Punch.prototype.duplicateBox = function(originalBox) {
  var obj = this;
  if (originalBox.type == 'text-placeholder') {
    var textDup = new TextPlaceholder({
      punch : obj,
      top : originalBox.jqObj[0].offsetTop,
      left : originalBox.jqObj[0].offsetLeft
          - (obj.slideLeft - obj.paddingOffset),
      width : originalBox.width,
      height : originalBox.height,
      size : originalBox.size,
      bold : originalBox.bold,
      color : originalBox.color,
      italic : originalBox.italic,
      underline : originalBox.underline,
      defaultText : originalBox.defaultText
    });
    return textDup;
  }
};

Punch.prototype.changeLayout = function(layoutN) {
  var obj = this;
  obj.showLayout(layoutN);
  obj.setLayout(layoutN);
  obj.showSlideBoxes();
};

Punch.prototype.updateSlidePreviews = function() {
  var obj = this;
  obj.createSlidePreviews();
  obj.createMenuPreviews();
};

Punch.prototype.showSlide = function(slideJQObj, slideN) {
  var obj = this;
  obj.setMode('slide');

  obj.hideAllSlides();
  obj.hideAllLayouts();

  slideJQObj.show();
  var data = slideJQObj.data();

  if (data && data.layout) {
    var layout = data.layout;
    layout.jqObj.show();
  }
  obj.showSlideBoxes();
  $('.title-name').html(data.layout.name);
};

Punch.prototype.showSlideBoxes = function() {
  var obj = this;

  if (obj.selectedSlideJQObj) {
    var selectedSlideData = obj.selectedSlideJQObj.data();

    var masterBoxes = $('.slide-area .master .box').show();
    selectedSlideData.layout.jqObj.find('.box').show();

    var slideBoxes = selectedSlideData.jqObj.find('.box');
    if (obj.getMode() == 'slide') {
      slideBoxes.show();
      for ( var i = 0; i < slideBoxes.length; i++) {
        var boxParent = $(slideBoxes[i]).data().linkedParent;
        if (boxParent) {
          boxParent.jqObj.hide();
        }
      }
    } else {
      $('.slide-area .layout .box').show();
    }
  }
};

Punch.prototype.showLayoutBoxes = function() {
  var obj = this;
  if (obj.selectedLayoutJQObj) {
    var selectedSlideData = obj.selectedSlideJQObj.data();
    var bgBoxes = selectedSlideData.layout.jqObj.find('.box');
    for ( var i = 0; i < bgBoxes.length; i++) {
      $(bgBoxes[i]).show();
    }
  }
};

Punch.prototype.newSlide = function() {
  var obj = this;
  var slide = new Slide({
    punch : obj,
    layout : obj.defaultLayout
  });
  slide.render();
  obj.updateSlidePreviews();
};

Punch.prototype.hideAllSlides = function() {
  $('.slide-area .slide').hide();
};

Punch.prototype.setLayout = function(n) {
  var obj = this;
  var selectedSlideData = obj.selectedSlideJQObj.data();
  var layoutNData = $($('.slide-area .layout')[n]).data();
  selectedSlideData.setLayout(layoutNData);
  obj.showSlide($($('.slide-area .slide')[obj.selectedSlideN]),
      obj.selectedSlideN);
  obj.createSlidePreview();

  var layoutPreviews = $('.master-slide-previews .slide-preview.layout-preview');
  layoutPreviews.removeClass('affected');
  $(layoutPreviews[n]).addClass('affected');
};

Punch.prototype.showLayout = function(n) {
  var obj = this;
  obj.hideAllLayouts();
  $($('.slide-area .layout')[n]).show();
  obj.showLayoutBoxes();
  $('.slide-preview.master-slide-preview').removeClass('selected');
};

Punch.prototype.showMaster = function() {
  var obj = this;

  obj.hideAllSlides();
  obj.hideAllLayouts();
  $('.slide-area .master-slide-preview').show();
  $('.slide-preview.layout-preview').removeClass('selected');
  $('.slide-preview.master-slide-preview').addClass('selected');

  setTimeout(function() {
    obj.setMode('master');
    $('.slide-area .slide').hide();
    $('.slide-area .layout').hide();
    $('.slide-area .master').show();
  }, 100);

};

Punch.prototype.getIntersectingBoxes = function(e) {
  var retBox = null;
  var boxes = $('.slide-area .box:visible');
  var x = e.offsetX;
  var y = e.offsetY;
  boxes.each(function() {
    var box = this;
    if (box.offsetLeft < x && box.offsetTop < y
        && box.offsetLeft + box.offsetWidth > x
        && box.offsetTop + box.offsetHeight > y) {
      var boxObj = $(box).data();
      boxObj.jqObj = $(box);
      retBox = boxObj;
    }
  });
  return retBox;
};

Punch.prototype.hideAllLayouts = function() {
  $('.slide-area .layout').hide();
};

Punch.prototype.setSelectedBox = function(box) {
  var obj = this;
  var selectedSlideData = obj.selectedSlideJQObj.data();
  selectedSlideData.selectedItem = box;
};

Punch.prototype.removeBox = function() {
  var obj = this;
  if (obj) {
    if (obj.activeSlide && obj.activeSlide.selectedItem) {
      obj.activeSlide.selectedItem.jqObj.remove();
      obj.createSlidePreview();
    }
  }
};

Punch.prototype.getSlideCenterOffset = function() {
  var slideArea = $('.slide-area');
  var slideBg = $('.slide-bg');
  var msPreviews = $('.master-slide-previews');
  var slideLeft = (slideArea.width() - slideBg.width()) / 2;
  if (msPreviews.css('display') == 'block') {
    var msWidth = msPreviews.width();
    slideLeft = (((slideArea.width() - msWidth) - slideBg.width()) / 2)
        + msWidth;
  }
  return slideLeft;
};

Punch.prototype.centerSlide = function() {
  var obj = this;
  var slideBg = $('.slide-bg');
  var slideLeft = obj.getSlideCenterOffset();
  slideBg.css('left', slideLeft + 'px');
  obj.slideLeft = slideLeft;
  obj.repositionBoxes();
};

Punch.prototype.repositionBoxes = function() {
  var obj = this;
  var boxes = $('.slide-area .box');
  obj.paddingOffset = 30;
  for ( var i = 0; i < boxes.length; i++) {
    var box = $(boxes[i]);
    var boxData = box.data();
    var boxLeft = boxData.left;
    var newLeft = boxLeft + obj.slideLeft - obj.paddingOffset;
    box.css('left', newLeft + 'px');
  }
};

Punch.prototype.updateTitle = function() {
  var obj = this;
  if ($('.master-slide-previews').css('display') == 'block') {
    $('.slide-area-title.main-theme').addClass('master-slide-preview-open');
  } else {
    $('.slide-area-title.main-theme').removeClass('master-slide-preview-open');
  }
  var mode = obj.getMode();
  if (mode == 'layout') {
    var layout = obj.getSelectedSlide().layout;
    obj.selectLayout(layout);
  } else if (mode == 'master') {
    obj.selectMaster();
  }
};

Punch.prototype.updateUIComponents = function() {
  var obj = this;
  obj.updateTitle();
  obj.showSlide($($('.slide-area .slide')[obj.selectedSlideN]),
      obj.selectedSlideN);
}