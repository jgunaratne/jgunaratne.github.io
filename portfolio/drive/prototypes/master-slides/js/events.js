Punch.prototype.addEvents = function() {

  var obj = this;

  $(document).on('click', '.slide-previews .slide-preview', function() {
    var slidePreviews = $('.slide-previews .slide-preview');
    var slideN = 0;
    for ( var i = 0; i < slidePreviews.length; i++) {
      if (slidePreviews[i] == this) {
        slideN = i;
      }
    }
    obj.setSelectedSlide(slideN);
    obj.showSlide($($('.slide-area .slide')[slideN]), slideN);
    obj.createSlidePreview(slideN);
    $('.slide-previews .slide-preview').removeClass('affected');
    $('.master-slide-previews').removeClass('slide-preview-active');
    $('.slide-area-title.main-theme').hide();
    $('.master-slide-previews').hide();
    obj.createSlidePreview();
    obj.centerSlide();
    obj.showSlideBoxes();
  });

  $(document).on('click',
      '.master-slide-previews .slide-preview.layout-preview', function(e) {
        var layoutPreviewObj = $(e.currentTarget)[0];
        obj.selectLayout(layoutPreviewObj);
        obj.showSlideBoxes();
      });

  $(document).on('click',
      '.master-slide-previews .slide-preview.master-slide-preview', function() {
        obj.selectMaster();
        obj.showSlideBoxes();
      });

  $(document).on('dblclick', '.slide-area', function(e) {

    function goToBoxLayer() {
      var intersectBox = obj.getIntersectingBoxes(e);
      if (intersectBox) {
        intersectBox.setSelected(true);

        var selectedLayoutData = intersectBox.jqObj.parent().data();

        if (selectedLayoutData.type == 'layout') {
          var n = 0;
          var layouts = $('.slide-area .layout');
          for ( var i = 0; i < layouts.length; i++) {
            if (layouts[i] == selectedLayoutData.jqObj[0]) {
              n = i;
            }
          }

          obj.setSelectedLayout(n);
          obj.setMode('layout');
        } else if (selectedLayoutData.type == 'master') {
          obj.setMasterSelected();
        }
        var layer = intersectBox.getLayer();
        if (layer) {
          if (layer.hasClass('layout')) {
            obj.setMode('layout');
          } else if (layer.hasClass('master')) {
            obj.setMode('master');
          }
          setTimeout(function() {
            $('.master-slide-previews').show();
            obj.centerSlide();
            obj.createLayoutPreviewsOnly();
            obj.updateTitle();
          }, 100);
        }
      }
      obj.showSlideBoxes();
      obj.updateTitle();
    }
    
    goToBoxLayer();
    
    

    
  });

  $(document).on('keydown', function(e) {

    var sel = window.getSelection();

    if (e.keyCode == 8 || e.keyCode == 46) {

      if (sel.type == 'None') {
        obj.removeBox();
        return false;
      }
      if (sel.rangeCount) {
        /*
         * var rangeCount = sel.getRangeAt(0).commonAncestorContainer; if
         * (rangeCount.tagName) { if
         * (!$(sel.focusNode).hasClass('editable-text')) {
         * console.log(sel.focusNode);
         * 
         * //obj.removeBox(); } return false; }
         */

        if ($(sel.focusNode).hasClass('editable-text')) {
          if ($(sel.focusNode).text() == '') {
            obj.removeBox();
            return false;
          }
        }

      } else {
        return false;
      }
    }

    function moveTo(keyCode) {
      var selObj = obj.getSelectedBox();
      var sel = selObj.jqObj;
      switch (keyCode) {
      case 38:
        var top = sel.css('top').replace('px', '') * 1;
        var newTop = top - 1;
        sel.css('top', newTop + 'px');
        break;
      case 40:
        var top = sel.css('top').replace('px', '') * 1;
        var newTop = top + 1;
        sel.css('top', newTop + 'px');
        break;
      case 37:
        var left = sel.css('left').replace('px', '') * 1;
        var newLeft = left - 1;
        sel.css('left', newLeft + 'px');
        break;
      case 39:
        var left = sel.css('left').replace('px', '') * 1;
        var newLeft = left + 1;
        sel.css('left', newLeft + 'px');
        break;
      }
    }

    if (sel.rangeCount != null) {
      try {
        var rangeCount = sel.getRangeAt(0).commonAncestorContainer;
        if (rangeCount && rangeCount.tagName == 'DIV') {
          moveTo(e.keyCode);
        }
      } catch (ex) {
        moveTo(e.keyCode);
      }
    }

  });

  $(document).on('keyup', function(e) {
    obj.createSlidePreview();
    if (obj.getMode() != 'slide') {
      // obj.createSlidePreviews();
      // obj.createLayoutPreviews();
      // obj.createMasterPreview();
    }
  });

  $(document).on('click', '.slide-area .slide', function(e) {
    var intersectBox = obj.getIntersectingBoxes(e);

    if (obj.mode == 'slide') {
      if (intersectBox && intersectBox.type == 'text-placeholder') {

        var textDup = obj.duplicateBox(intersectBox);

        var selectedSlide = obj.selectedSlideJQObj.data();
        selectedSlide.add(textDup, obj.selectedSlideJQObj);

        textDup.jqObj.data(textDup);
        textDup.jqObj.data().linkedParent = intersectBox;
        textDup.jqObj.addClass('dup');
        textDup.linkedParent = intersectBox;

        var domObj = textDup.jqObj.find('.editable-text font')[0];
        var sel = window.getSelection();
        var range = document.createRange();
        range.selectNodeContents(domObj);
        sel.removeAllRanges();
        sel.addRange(range);

        obj.lastTextBoxSelected = intersectBox;
        obj.lastTextBoxDupSelected = textDup;

        textDup.setSelected(true);
        obj.updateUIComponents();

        // console.log(intersectBox);
        // console.log(textDup);
      }
    }
  });

  $('.bg-settings').on('click', function(e) {
    if ($('.master-slide-previews').css('display') == 'none') {
      $('#showLayoutsItem').html('Show Layouts');
    } else {
      $('#showLayoutsItem').html('Hide Layouts');
    }
    $('.menu-custom.bg-settings-menu').toggle();
    e.stopPropagation();
  });

  $('.menu-custom.bg-settings-menu li').on('click', function(e) {
    $('.menu-custom.bg-settings-menu').hide();
    e.stopPropagation();
  });

  $('#exitLayoutItem').on('click', function(e) {
    obj.setMode('slide');
    $('.master-slide-previews').hide();
    $('.slide-area-title').hide();
    var slideN = obj.selectedSlideN;
    obj.setSelectedSlide(slideN);
    obj.showSlide($($('.slide-area .slide')[slideN]), slideN);
    obj.createSlidePreview(slideN);
  });

  $('#updateInThemeItem').on('click', function(e) {
    var selectedSlideObj = obj.selectedSlideJQObj.data();
    var selItem = selectedSlideObj.selectedItem;
    if (selItem.linkedParent) {
      var parentJQObj = selItem.linkedParent.jqObj;
      var editTxt = selItem.jqObj.find('.editable-text');
      var parentTxt = parentJQObj.find('.editable-text');
      var newHTML = editTxt.html();
      var newText = editTxt.text();
      newHTML = newHTML.replace(newText, selItem.linkedParent.defaultText);
      parentTxt.html(newHTML);

      selItem.linkedParent.top = selItem.top;
      selItem.linkedParent.left = selItem.left - obj.getSlideCenterOffset();
      selItem.linkedParent.width = selItem.width;
      selItem.linkedParent.height = selItem.height;
      selItem.linkedParent.size = selItem.size;
      selItem.linkedParent.bold = selItem.bold;
      selItem.linkedParent.color = selItem.color;
      selItem.linkedParent.italic = selItem.italic;
      selItem.linkedParent.underline = selItem.underline;
      // selItem.linkedParent.defaultText = selItem.defaultText;

      obj.updateSlidePreviews();
    }
  });

  $(document).on('click', function(e) {
    $('.menu-custom.bg-settings-menu').hide();
    obj.setToolbar('no-tools');
    obj.setToolbar('slide');
  });

  $(document).on('contextmenu', function(e) {
    $('.context-menu').hide();
  });

  $('#showLayoutsItem').on('click', function(e) {
    $('.master-slide-previews').toggle();
    obj.updateUIComponents();
    obj.centerSlide();
    obj.createLayoutPreviews();
    setTimeout(function() {
      var layout = obj.getSelectedSlide().layout;
      obj.selectLayout(layout);
    }, 500);
  });

  $(document).on('click', '#mastersMenuItem, #mastersMenuItem2', function() {
    $('.master-slide-previews').show();
    obj.selectMaster();
    obj.createLayoutPreviews();
    obj.updateUIComponents();
    setTimeout(function() {
      var layout = obj.getSelectedSlide().layout;
      obj.selectLayout(layout);
    }, 500);
  });

  $('#componentMenubar').on({
    mouseenter : function() {
      obj.createMenuPreviews();
      obj.createEditThemePreviews();
    }
  });

  $(document).on('click', '#menu-text-box', function(e) {
    obj.addText();
  });

  $(document).on('click', '#menu-insert-slide', function(e) {
    obj.newSlide();
    setTimeout(function() {
      var slides = $('.slide-area .slide');
      var slideN = slides.length - 1;
      obj.showSlide($(slides[slideN]), slideN);
      obj.setSelectedSlide(slideN);
    }, 250);
  });

  /*
  $(document).on('click', '#menu-bold', function(e) {
    obj.boldText();
    return false;
  });

  $(document).on('click', '#menu-italic', function(e) {
    obj.italicText();
    return false;
  });

  $(document).on('click', '#menu-underline', function(e) {
    obj.underlineText();
    return false;
  });
  */

};