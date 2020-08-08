var Slide = function(config) {
  var obj = this;
  obj.selectedItem = null;
  obj.type = 'slide';
  obj.name = 'Untitled';
  obj.slideData = this;
  if (config) {
    obj.punch = config.punch;
    obj.layout = config.layout;
    obj.slideN = config.slideN;
    if (obj.layout) {
      obj.layout.addChildSlide(obj);
    }
    if (config.name) {
      obj.name = config.name;
    }
  }
};

Slide.prototype = {
  render : function() {
    var obj = this;
    var slidePreviews = $('.slide-previews');
    var slidePreview = $('<div class="slide-preview">');
    slidePreviews.append(slidePreview);
    obj.jqObjPreview = slidePreview;
    slidePreview.data(this);
    var slideArea = $('.slide-area');
    var slide = $('<div class="slide">');
    obj.jqObj = slide;
    obj.jqObj.data(this);
    slideArea.append(obj.jqObj);
    obj.addEvents();
  },
  setLayout : function(layout) {
    var obj = this;
    obj.layout.removeChildSlide(obj);
    obj.layout = layout;
    obj.layout.addChildSlide(obj);
  },
  add : function(box, layer) {
    var obj = this;
    layer.append(box.jqObj);
    box.slide = obj;
    box.addEvents();
  },
  deselectAll : function() {
    var obj = this;
    $('.box').removeClass('selected');
    obj.selectedItem = null;
    window.getSelection().empty();
  },
  addEvents : function() {
    var obj = this;
    obj.jqObj.on({
      mousedown : function() {
        obj.deselectAll();
      },
      mouseup : function() {
        if (obj && obj.punch && obj.punch.lastTextBoxDupSelected) {
          var lastBox = obj.punch.lastTextBoxDupSelected;
          var lastBoxJQObj = lastBox.jqObj;
          var linkedBox = lastBox.linkedParent;
          if (lastBox.linkedParent) {
            var linkedBoxJQObj = lastBox.linkedParent.jqObj;
            if (lastBox.getText() == linkedBox.getText()
                && lastBoxJQObj.css('top') == linkedBoxJQObj.css('top')
                && lastBoxJQObj.css('left') == linkedBoxJQObj.css('left')
                && lastBox.modified == false) {
              linkedBoxJQObj.show();
              lastBoxJQObj.remove();
              obj.punch.lastTextBoxDupSelected = null;
            }
          }
        }
      },
      mousemove : function(e) {
        if (obj.punch && obj.punch.activeSlide
            && obj.punch.activeSlide.selectedItem) {
          obj.punch.activeSlide.selectedItem.handleMouseMove(e);
        }
      }
    });
  }
};

var Layout = function(config) {
  Slide.apply(this, arguments);
  var obj = this;
  obj.type = 'layout';
  if (config) {
    config.punch.bgCount++;
    obj.bgId = config.punch.bgCount;
  }
  obj.childrenSlides = [];
};

Layout.prototype = new Slide();

Layout.prototype.render = function() {
  var obj = this;
  var bgPreviews = $('.master-slide-previews');
  console.log(bgPreviews);
  var bgPreview = $('<div class="slide-preview layout-preview">');
  obj.jqObjPreview = bgPreview;
  bgPreviews.append(bgPreview);
  bgPreview.data(this);
  var slideArea = $('.slide-area');
  var layout = $('<div class="layout">');
  obj.jqObj = layout;
  slideArea.append(layout);
  layout.data(this);
  obj.addEvents();
};

Layout.prototype.addChildSlide = function(slide) {
  var obj = this;
  obj.childrenSlides.push(slide);
};

Layout.prototype.removeChildSlide = function(slide) {
  var currLayout = slide.layout;
  var currLayoutChildren = currLayout.childrenSlides;
  for ( var i = 0; i < currLayoutChildren.length; i++) {
    if (currLayoutChildren[i].jqObj == slide.jqObj) {
      currLayoutChildren = currLayoutChildren.splice(i, 1);
    }
  }
};

Layout.prototype.addEvents = function() {
  var obj = this;
  obj.jqObj.on({
    mousedown : function() {
      obj.deselectAll();
    },
    mousemove : function(e) {
      if (obj.punch && obj.punch.activeSlide
          && obj.punch.activeSlide.selectedItem) {
        obj.punch.activeSlide.selectedItem.handleMouseMove(e);
      }
    }
  });
};

var Master = function() {
  Slide.apply(this, arguments);
  var obj = this;
  obj.type = 'master';
  obj.jqObj = $('.master');
  obj.addEvents();
};

Master.prototype = new Slide();

Master.prototype.render = function() {
  var obj = this;

  var masterPreview = $('.master-slide-preview');
  obj.jqObjPreview = masterPreview;
  masterPreview.data(this);

  var master = $('.slide-area .master');
  obj.jqObj = master;

  master.data(this);
  obj.addEvents();
};

Master.prototype.addEvents = function() {
  var obj = this;
  obj.jqObj.on({
    mousedown : function() {
      obj.deselectAll();
    },
    mousemove : function(e) {
      if (obj.punch && obj.punch.activeSlide
          && obj.punch.activeSlide.selectedItem) {
        obj.punch.activeSlide.selectedItem.handleMouseMove(e);
      }
    }
  });
};