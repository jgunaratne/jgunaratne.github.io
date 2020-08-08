var Toolbar = function(config) {
  var obj = this;
  obj.app = config.app;
};

Toolbar.prototype = {
  init : function() {
    var obj = this;
    obj.addEvents();
  },
  addEvents : function() {
    var obj = this;
    $('.toolbar .toolbar-icon, .toolbar .toolbar-text').on(
        'click',
        function(e) {
          var item = $(this);
          var isSelected = false;
          if (item.hasClass('selected')) {
            isSelected = true;
          }
          $('.toolbar .toolbar-icon, .toolbar .toolbar-text').removeClass(
              'selected');
          if (isSelected) {
            item.removeClass('selected');
          } else {
            item.addClass('selected');
          }
        });

    $('#newSlideToolbarBtn').on('click', function(e) {
      obj.app.newSlide();
      setTimeout(function() {
        var slides = $('.slide-area .slide');
        var slideN = slides.length - 1;
        punch.showSlide($(slides[slideN]), slideN);
        punch.setSelectedSlide(slideN);
      }, 250);
    });

    $('#zoomToFit').on('click', function(e) {
      obj.app.zoomToFit();
    });

    $('#zoomInBtn').on('click', function(e) {
      obj.app.zoomIn();
    });

    $('#insertCircleBtn').on('click', function(e) {
      obj.app.addCircle();
      obj.app.createSlidePreviewsNoTimeout();
      obj.app.createLayoutPreviewsOnly();
    });

    $('#insertRectBtn').on('click', function(e) {
      obj.app.addRect();
      obj.app.createSlidePreviewsNoTimeout();
      obj.app.createLayoutPreviewsOnly();
    });

    $('#insertRoundRectBtn').on('click', function(e) {
      obj.app.addRoundRect();
    });

    $('#insertTextBtn').on('click', function(e) {
      obj.app.addText();
      $(this).removeClass('selected');
    });

    $('#insertPlaceholderBtn').on('click', function(e) {
      obj.app.addTextPlaceholder();
      $(this).removeClass('selected');
    });
    
    $('#newLayoutBtn').on('click', function(e) {
      
      var layout4 = new Layout({
        punch : obj,
        name : 'Blank'
      });
      layout4.render();
      $(this).removeClass('selected');
      
    });

    $('#boldBtn').on('mousedown', function(e) {
      obj.app.boldText();
      return false;
    });

    $('#italicBtn').on('mousedown', function(e) {
      obj.app.italicText();
      return false;
    });

    $('#underlineBtn').on('mousedown', function(e) {
      obj.app.underlineText();
      return false;
    });

    $('#fontSizeMenu').on('mousedown', function(e) {
      return false;
    });

    $('#fontSizeMenu li').on('mousedown', function(e) {
      var sizeLi = $(this);
      var size = sizeLi.text() * 1;
      obj.app.changeFontSize(size);
      $('#fontSizeMenu .label').html(size);
    });

    $('#textColorBtn').on('mousedown', function(e) {
      return false;
    });

    $('#textColorBtn .kd-colorpicker td').on('mousedown', function(e) {
      var td = $(this);
      var color = td.css('background-color');
      obj.app.changeTextColor(color);
    });

    $('#fillColorBtn').on('mousedown', function(e) {
      return false;
    });

    $('#fillColorBtn .kd-colorpicker td').on(
        'mousedown',
        function(e) {
          var td = $(this);
          var color = td.css('background-color');
          var shape = obj.app.activeSlide.selectedItem.jqObj.find('svg')
              .children();
          shape.css('fill', color);
          obj.app.createSlidePreviewsNoTimeout();
          obj.app.createLayoutPreviewsOnly();
        });

    $('#lineColorBtn .kd-colorpicker td').on(
        'mousedown',
        function(e) {
          var td = $(this);
          var color = td.css('background-color');
          var shape = obj.app.activeSlide.selectedItem.jqObj.find('svg')
              .children();
          shape.css('stroke', color);
        });

    $('#numListBtn').on('mousedown', function(e) {
      obj.app.insertNumList();
      return false;
    });

    $('#bulletListBtn').on('mousedown', function(e) {
      obj.app.insertBulletList();
      return false;
    });

    $('.toolbar').on('click', function(e) {
      e.stopPropagation();
    });

  }
};