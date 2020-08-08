var Box = function(config) {
  var obj = this;
  obj.resizeBoxTopRight = false;
  obj.resizeBoxBottomRight = false;
  obj.resizeBoxTopLeft = false;
  obj.resizeBoxBottomLeft = false;
  obj.dx = 0;
  obj.dy = 0;
  obj.bottomY = 0;
  obj.moveBox = false;
  obj.master = false;
  obj.slide = null;
  obj.layer = null;
  obj.modified = false;
  if (config) {
    obj.top = config.top;
    obj.left = config.left;
    obj.width = config.width;
    obj.height = config.height;
    obj.type = config.type;
    obj.punch = config.punch;
  }
};

Box.prototype = {
  init : function() {
    var obj = this;
    var html = '<div class="box">\
        <div class="content">\
        </div>\
        <div class="handle top left"></div>\
        <div class="handle top right"></div>\
        <div class="handle bottom left"></div>\
        <div class="handle bottom right"></div>\
      </div>';
    var boxDiv = $(html);
    boxDiv.addClass(obj.type);
    boxDiv.css('top', obj.top);
    boxDiv.css('left', obj.left);
    boxDiv.css('width', obj.width);
    boxDiv.css('height', obj.height);
    boxDiv.data(obj);
    obj.jqObj = boxDiv;
    obj.setContent();
    obj.jqObj.data(obj);
  },
  changeColor : function(color) {
    var obj = this;
    var shape = obj.jqObj.find('.shape')[0];
    shape.setAttribute('style', 'fill:' + color);
  },
  getLayer : function() {
    var obj = this;
    return obj.jqObj.parent();
  },
  setSelected : function(sel) {
    var obj = this;
    if (obj.punch) {
      obj.punch.setSelectedBox(obj);
    }
    if (obj.slide) {
      obj.slide.selectedItem = obj;
      obj.slide.punch.activeSlide.selectedItem = obj;
    }
    obj.jqObj.addClass('selected');
    if (obj.type == 'text' || obj.type == 'text-placeholder') {
      setTimeout(function() {
        obj.punch.setToolbar('text');
      }, 100);
    } else {
      obj.punch.activeSlide.selectedItem = obj;
      setTimeout(function() {
        obj.punch.setToolbar('shape');
      }, 100);
    }
  },
  getText : function() {
    var obj = this;
    return obj.jqObj.text().trim();
  },
  setMoveBox : function(move) {
    var obj = this;
    obj.moveBox = move;
  },
  addEvents : function() {
    var obj = this;
    var box = obj.jqObj[0];

    obj.jqObj.on({
      mousedown : function(e) {
        obj.slide.deselectAll();
        obj.dx = e.pageX - obj.jqObj[0].offsetLeft;
        obj.dy = e.pageY - obj.jqObj[0].offsetTop;
        obj.moveBox = true;
        obj.setSelected(true);
        obj.zIndex = obj.jqObj.css('z-index');
        // obj.jqObj.css('z-index', 100);
        if (obj.punch) {
          obj.punch.contextMenuOpen = false;
        }

        if (obj.type == 'text' || obj.type == 'text-placeholder') {
          obj.punch.setToolbar('text');
        } else {
          obj.punch.setToolbar('shape');
        }

        // obj.punch.showSlideBoxes();

        e.stopPropagation();
        return false;
      },
      mouseup : function(e) {
        obj.moveBox = false;
        obj.resizeBoxTopLeft = false;
        obj.resizeBoxBottomLeft = false;
        obj.resizeBoxTopRight = false;
        obj.resizeBoxBottomRight = false;
        // obj.jqObj.css('z-index', obj.zIndex);
        if (obj.punch) {
          if (obj.jqObj.parent().hasClass('master')) {
            obj.punch.createSlidePreview();
            obj.punch.createLayoutPreview();
            obj.punch.createMasterPreview();
          } else if (obj.jqObj.parent().hasClass('layout')) {
            obj.punch.createSlidePreview();
            obj.punch.createLayoutPreview();
          } else {
            obj.punch.createSlidePreview();
            obj.punch.createLayoutPreview();
          }
        }
        obj.punch.createLayoutPreviewsOnly();
        obj.punch.createSlidePreviewsNoTimeout();
        e.stopPropagation();
        return false;
      },
      click : function(e) {
        e.stopPropagation();
        return false;
      },
      keyup : function(e) {
        if (obj.handleKeyUp) {
          obj.handleKeyUp(e);
        }
      }
    });
    obj.jqObj.find('.handle.top.left').on({
      mousedown : function(e) {
        obj.resizeBoxTopLeft = true;
        obj.bottomY = box.offsetTop + box.offsetHeight;
        obj.rightX = box.offsetLeft + box.offsetWidth;
        e.stopPropagation();
      }
    });
    obj.jqObj.find('.handle.bottom.left').on({
      mousedown : function(e) {
        obj.resizeBoxBottomLeft = true;
        obj.rightX = box.offsetLeft + box.offsetWidth;
        e.stopPropagation();
      }
    });
    obj.jqObj.find('.handle.top.right').on({
      mousedown : function(e) {
        obj.resizeBoxTopRight = true;
        obj.bottomY = box.offsetTop + box.offsetHeight;
        e.stopPropagation();
      }
    });
    obj.jqObj.find('.handle.bottom.right').on({
      mousedown : function(e) {
        obj.resizeBoxBottomRight = true;
        e.stopPropagation();
      }
    });
    obj.jqObj.find('.handle').on({
      mousedown : function() {
        return false;
      }
    });
    obj.jqObj.find('.editable-text').on('click', function() {
      setTimeout(function() {
        obj.punch.setToolbar('text');
      }, 100);
    });

    if (obj.jqObj.find('svg')[0]) {
      obj.jqObj.find('svg')[0].onmousedown = function() {
        return false;
      };
    }
  }
};

var Circle = function(config) {
  Box.apply(this, arguments);
  var obj = this;
  obj.type = 'circle';
  obj.strokeWidth = 0;
  if (config) {
    if (config.strokeWidth) {
      obj.strokeWidth = config.strokeWidth;
    }
    obj.color = config.color;
  }
  obj.init();
};
Circle.prototype = new Box();

Circle.prototype.setContent = function() {
  var obj = this;
  var cx = obj.width / 2;
  var cy = obj.height / 2;
  var rx = obj.width / 2 - obj.strokeWidth / 2;
  var ry = obj.height / 2 - obj.strokeWidth / 2;
  var html = '<svg xmlns="http://www.w3.org/2000/svg" version="1.1">\
    <ellipse cx="'
      + cx
      + '" cy="'
      + cy
      + '" rx="'
      + rx
      + '" ry="'
      + ry
      + '" style="fill:'
      + obj.color
      + '; stroke:black; stroke-width:'
      + obj.strokeWidth
      + '" class="shape" />\
  </svg>';
  obj.jqObj.find('.content').append(html);
};

Circle.prototype.handleMouseMove = function(e) {
  var obj = this;

  var box = null;
  var c = null;
  if (obj.jqObj) {
    box = obj.jqObj[0];
    c = obj.jqObj.find('.shape')[0];
  }

  var parent = $('.master-area')[0];

  var x = e.clientX - parent.offsetLeft;
  var y = e.clientY - parent.offsetTop;

  if (obj.resizeBoxTopLeft) {
    var h = obj.bottomY - y;
    var w = obj.rightX - x;
    obj.jqObj.css('top', y);
    obj.jqObj.css('height', h);
    obj.jqObj.css('left', x);
    obj.jqObj.css('width', w);
    if (w > 0 && h > 0) {
      obj.jqObj.css('top', y);
      obj.jqObj.css('width', w);
      obj.jqObj.css('height', h);
      c.setAttribute('cx', w / 2);
      c.setAttribute('cy', h / 2);
      c.setAttribute('rx', w / 2);
      c.setAttribute('ry', h / 2);
    }
  }
  if (obj.resizeBoxBottomLeft) {
    var h = y - box.offsetTop;
    var w = obj.rightX - x;
    if (w > 0 && h > 0) {
      obj.jqObj.css('height', h);
      obj.jqObj.css('left', x);
      obj.jqObj.css('width', w);
      c.setAttribute('cx', w / 2);
      c.setAttribute('cy', h / 2);
      c.setAttribute('rx', w / 2);
      c.setAttribute('ry', h / 2);
    }
  }
  if (obj.resizeBoxTopRight) {
    var w = x - box.offsetLeft;
    var h = obj.bottomY - y;
    if (w > 0 && h > 0) {
      obj.jqObj.css('top', y);
      obj.jqObj.css('width', w);
      obj.jqObj.css('height', h);
      c.setAttribute('cx', w / 2);
      c.setAttribute('cy', h / 2);
      c.setAttribute('rx', w / 2);
      c.setAttribute('ry', h / 2);
    }
  }

  if (obj.resizeBoxBottomRight) {

    var w = x - box.offsetLeft;
    var h = y - box.offsetTop;
    if (w > 0 && h > 0) {
      obj.jqObj.css('width', w);
      obj.jqObj.css('height', h);

      var cx = w / 2;
      var cy = h / 2;
      var rx = w / 2 - obj.strokeWidth / 2;
      var ry = h / 2 - obj.strokeWidth / 2;

      c.setAttribute('cx', cx);
      c.setAttribute('cy', cy);
      c.setAttribute('rx', rx);
      c.setAttribute('ry', ry);
    }
  }

  if (obj.moveBox && !obj.punch.contextMenuOpen) {
    var l = e.pageX - obj.dx;
    var t = e.pageY - obj.dy;
    obj.jqObj.css('top', t + 'px');
    obj.jqObj.css('left', l + 'px');
    obj.left = l - obj.punch.slideLeft;
    obj.jqObj.data().left = l - obj.punch.slideLeft + obj.punch.paddingOffset;
  }
};

var Rect = function(config) {
  Box.apply(this, arguments);
  var obj = this;
  obj.type = 'rect';
  obj.strokeWidth = 0;
  if (config) {
    if (config.strokeWidth) {
      obj.strokeWidth = config.strokeWidth;
    }
    obj.color = config.color;
  }
  obj.init();
};
Rect.prototype = new Box();

Rect.prototype.setContent = function() {
  var obj = this;
  var w = obj.width - obj.strokeWidth;
  var h = obj.height - obj.strokeWidth;
  var dxy = obj.strokeWidth / 2;
  var html = '<svg xmlns="http://www.w3.org/2000/svg" version="1.1">\
    <rect x="'
      + dxy
      + '" y="'
      + dxy
      + '" width="'
      + w
      + '" height="'
      + h
      + '" style="fill:'
      + obj.color
      + '; stroke:black; stroke-width:'
      + obj.strokeWidth + '" class="shape" />\
  </svg>';
  obj.jqObj.find('.content').append(html);
};

Rect.prototype.handleMouseMove = function(e) {
  var obj = this;
  var box = obj.jqObj[0];
  var c = obj.jqObj.find('.shape')[0];

  var parent = $('.master-area')[0];
  var x = e.pageX - parent.offsetLeft;
  var y = e.pageY - parent.offsetTop;

  if (obj.resizeBoxTopLeft) {
    var h = obj.bottomY - y;
    var w = obj.rightX - x;
    obj.jqObj.css('top', y);
    obj.jqObj.css('height', h);
    obj.jqObj.css('left', x);
    obj.jqObj.css('width', w);
    if (w > 0 && h > 0) {
      obj.jqObj.css('top', y);
      obj.jqObj.css('width', w);
      obj.jqObj.css('height', h);
      c.setAttribute('width', w);
      c.setAttribute('height', h);
    }
  }
  if (obj.resizeBoxBottomLeft) {
    var h = y - box.offsetTop;
    var w = obj.rightX - x;
    if (w > 0 && h > 0) {
      obj.jqObj.css('height', h);
      obj.jqObj.css('left', x);
      obj.jqObj.css('width', w);
      c.setAttribute('width', w);
      c.setAttribute('height', h);
    }
  }
  if (obj.resizeBoxTopRight) {
    var w = x - box.offsetLeft;
    var h = obj.bottomY - y;
    if (w > 0 && h > 0) {
      obj.jqObj.css('top', y);
      obj.jqObj.css('width', w);
      obj.jqObj.css('height', h);
      c.setAttribute('width', w);
      c.setAttribute('height', h);
    }
  }
  if (obj.resizeBoxBottomRight) {
    var w = x - box.offsetLeft;
    var h = y - box.offsetTop;

    if (w > 0 && h > 0) {
      obj.jqObj.css('width', w);
      obj.jqObj.css('height', h);
      c.setAttribute('width', w - obj.strokeWidth);
      c.setAttribute('height', h - obj.strokeWidth);
    }
  }
  if (obj.moveBox && !obj.punch.contextMenuOpen) {
    var l = e.pageX - obj.dx;
    var t = e.pageY - obj.dy;
    obj.jqObj.css('top', t + 'px');
    obj.jqObj.css('left', l + 'px');
    obj.top = t;
    obj.left = l - obj.punch.slideLeft;
    obj.jqObj.data().left = l - obj.punch.slideLeft + obj.punch.paddingOffset;
  }
};

var RoundRect = function(config) {
  Box.apply(this, arguments);
  var obj = this;
  obj.type = 'rect';
  obj.strokeWidth = 0;
  if (config) {
    if (config.strokeWidth) {
      obj.strokeWidth = config.strokeWidth;
    }
    obj.color = config.color;
  }
  obj.init();
};
RoundRect.prototype = new Box();

RoundRect.prototype.setContent = function() {
  var obj = this;
  var w = obj.width - obj.strokeWidth;
  var h = obj.height - obj.strokeWidth;
  var dxy = obj.strokeWidth / 2;
  var path = '<path fill="#FFFFFF" stroke="#000000" stroke-width="2" stroke-miterlimit="10" d="M36.167,27.917c0,3.313-2.687,6-6,6H12.834 c-3.314,0-6-2.687-6-6v-13c0-3.314,2.686-6,6-6h17.333c3.313,0,6,2.686,6,6V27.917z"/>';
  var html = '<div style="position: absolute; background: url(img/shapes/roundrect.svg) no-repeat center; background-size: 100% 100%; width: 100%; height: 100%"></div>';
  obj.jqObj.find('.content').append(html);
};

RoundRect.prototype.handleMouseMove = function(e) {
  var obj = this;
  var box = obj.jqObj[0];
  var c = obj.jqObj.find('.shape')[0];

  var parent = $('.master-area')[0];
  var x = e.pageX - parent.offsetLeft;
  var y = e.pageY - parent.offsetTop;

  if (obj.resizeBoxTopLeft) {
    var h = obj.bottomY - y;
    var w = obj.rightX - x;
    obj.jqObj.css('top', y);
    obj.jqObj.css('height', h);
    obj.jqObj.css('left', x);
    obj.jqObj.css('width', w);
    if (w > 0 && h > 0) {
      obj.jqObj.css('top', y);
      obj.jqObj.css('width', w);
      obj.jqObj.css('height', h);
      c.setAttribute('width', w);
      c.setAttribute('height', h);
    }
  }
  if (obj.resizeBoxBottomLeft) {
    var h = y - box.offsetTop;
    var w = obj.rightX - x;
    if (w > 0 && h > 0) {
      obj.jqObj.css('height', h);
      obj.jqObj.css('left', x);
      obj.jqObj.css('width', w);
      c.setAttribute('width', w);
      c.setAttribute('height', h);
    }
  }
  if (obj.resizeBoxTopRight) {
    var w = x - box.offsetLeft;
    var h = obj.bottomY - y;
    if (w > 0 && h > 0) {
      obj.jqObj.css('top', y);
      obj.jqObj.css('width', w);
      obj.jqObj.css('height', h);
      c.setAttribute('width', w);
      c.setAttribute('height', h);
    }
  }
  if (obj.resizeBoxBottomRight) {
    var w = x - box.offsetLeft;
    var h = y - box.offsetTop;

    if (w > 0 && h > 0) {
      obj.jqObj.css('width', w);
      obj.jqObj.css('height', h);
      c.setAttribute('width', w - obj.strokeWidth);
      c.setAttribute('height', h - obj.strokeWidth);
    }
  }
  if (obj.moveBox && !obj.punch.contextMenuOpen) {
    var l = e.pageX - obj.dx;
    var t = e.pageY - obj.dy;
    obj.jqObj.css('top', t + 'px');
    obj.jqObj.css('left', l + 'px');
    obj.top = t;
    obj.left = l - obj.punch.slideLeft;
    obj.jqObj.data().left = l - obj.punch.slideLeft + obj.punch.paddingOffset;
  }
};

var Text = function(config) {
  Box.apply(this, arguments);
  var obj = this;
  obj.type = 'text';

  if (config) {
    obj.size = config.size;
    if (config.color) {
      obj.color = config.color;
    } else {
      obj.color = '#222';
    }
    obj.bold = config.bold;
    obj.italic = config.italic;
    if (obj.italic == null) {
      obj.italic = false;
    }
    obj.underline = config.underline;
    if (obj.underline == null) {
      obj.underline = false;
    }
    if (config.layer) {
      obj.layer = config.layer;
    }
    if (config.linkedParent) {
      obj.linkedParent = config.linkedParent;
    }
    obj.defaultText = config.defaultText;
  }
  obj.textParent = null;
  obj.init();
  if (obj.defaultText) {
    obj.setText(obj.defaultText);
  }

};
Text.prototype = new Box();

Text.prototype.setText = function(text) {
  var obj = this;
  if (obj.jqObj) {
    var editableText = obj.jqObj.find('.editable-text font');
    editableText.html('');

    if (editableText.length > 0) {
      if (obj.bold) {
        var bold = $('<b>');
        editableText.append(bold);
        editableText = bold;

      }
      if (obj.italic) {
        var i = $('<i>');
        editableText.append(i);
        editableText = i;
      }
      if (obj.underline) {
        var u = $('<span style="text-decoration: underline">');
        editableText.append(u);
        editableText = u;
      }
      if (obj.color) {
        var c = $('<span style="color: ' + obj.color + '">');
        editableText.append(c);
        editableText = c;
      }
      editableText.html(text);
    }
  }
};

Text.prototype.setContent = function() {
  var obj = this;
  var html = '<div class="editable-text" contenteditable="true"><font style="font-size: '
      + obj.size + 'pt" color="' + obj.color + '"></font></div>';
  var htmlObj = $(html);
  htmlObj.on({
    mousedown : function(e) {
      obj.slide.deselectAll();
      obj.setSelected(true);
      e.stopPropagation();
    }
  });
  obj.jqObj.find('.content').append(htmlObj);
};

Text.prototype.handleMouseMove = function(e) {
  var obj = this;
  var box = obj.jqObj[0];

  var parent = $('.master-area')[0];
  var x = e.pageX - parent.offsetLeft;
  var y = e.pageY - parent.offsetTop;

  if (obj.resizeBoxTopLeft) {
    var h = obj.bottomY - y;
    var w = obj.rightX - x;
    obj.jqObj.css('top', y);
    obj.jqObj.css('height', h);
    obj.jqObj.css('left', x);
    obj.jqObj.css('width', w);
    if (w > 0 && h > 0) {
      obj.jqObj.css('top', y);
      obj.jqObj.css('width', w);
      obj.jqObj.css('height', h);
    }
  }
  if (obj.resizeBoxBottomLeft) {
    var h = y - box.offsetTop;
    var w = obj.rightX - x;
    if (w > 0 && h > 0) {
      obj.jqObj.css('height', h);
      obj.jqObj.css('left', x);
      obj.jqObj.css('width', w);
    }
  }
  if (obj.resizeBoxTopRight) {
    var w = x - box.offsetLeft;
    var h = obj.bottomY - y;
    if (w > 0 && h > 0) {
      obj.jqObj.css('top', y);
      obj.jqObj.css('width', w);
      obj.jqObj.css('height', h);
    }
  }
  if (obj.resizeBoxBottomRight) {
    var w = x - box.offsetLeft;
    var h = y - box.offsetTop;
    if (w > 0 && h > 0) {
      obj.jqObj.css('width', w);
      obj.jqObj.css('height', h);
    }
  }
  if (obj.moveBox && !obj.punch.contextMenuOpen) {
    var l = e.pageX - obj.dx;
    var t = e.pageY - obj.dy;
    obj.jqObj.css('top', t + 'px');
    obj.jqObj.css('left', l + 'px');
    obj.top = t;
    obj.left = l - obj.punch.slideLeft;
    obj.jqObj.data().left = l - obj.punch.slideLeft + obj.punch.paddingOffset;
  }
  obj.top = obj.jqObj.css('top').replace('px', '') * 1;
  obj.left = obj.jqObj.css('left').replace('px', '') * 1;
  obj.width = obj.jqObj.css('width').replace('px', '') * 1;
  obj.height = obj.jqObj.css('height').replace('px', '') * 1;
};

Text.prototype.handleKeyUp = function(e) {
  var obj = this;
  var newText = obj.jqObj.find('.editable-text').text();
  obj.defaultText = newText
  obj.jqObj.data().defaultText = newText;
};

var TextPlaceholder = function(config) {
  Text.apply(this, arguments);
  var obj = this;
  obj.type = 'text-placeholder';
  obj.init();
  if (obj.defaultText) {
    obj.setText(obj.defaultText);
  }
};
TextPlaceholder.prototype = new Text();

var Image = function(config) {
  Box.apply(this, arguments);
  var obj = this;
  obj.type = 'image';
  obj.strokeWidth = 0;
  if (config) {
    if (config.strokeWidth) {
      obj.strokeWidth = config.strokeWidth;
    }
    obj.color = config.color;
  }
  obj.init();
};
Image.prototype = new Box();

Image.prototype.setContent = function(html) {
  var obj = this;
  if (html == null) {
    html = '<div style="position: absolute; background: url(img/sequoia_capital.png) no-repeat center; background-size: 100% 100%; width: 100%; height: 100%"></div>';
  }
  obj.jqObj.find('.content').append(html);
};

Image.prototype.handleMouseMove = function(e) {
  var obj = this;
  var box = obj.jqObj[0];
  var c = obj.jqObj.find('.shape')[0];

  var parent = $('.master-area')[0];
  var x = e.pageX - parent.offsetLeft;
  var y = e.pageY - parent.offsetTop;

  if (obj.resizeBoxTopLeft) {
    var h = obj.bottomY - y;
    var w = obj.rightX - x;
    obj.jqObj.css('top', y);
    obj.jqObj.css('height', h);
    obj.jqObj.css('left', x);
    obj.jqObj.css('width', w);
    if (w > 0 && h > 0) {
      obj.jqObj.css('top', y);
      obj.jqObj.css('width', w);
      obj.jqObj.css('height', h);
      c.setAttribute('width', w);
      c.setAttribute('height', h);
    }
  }
  if (obj.resizeBoxBottomLeft) {
    var h = y - box.offsetTop;
    var w = obj.rightX - x;
    if (w > 0 && h > 0) {
      obj.jqObj.css('height', h);
      obj.jqObj.css('left', x);
      obj.jqObj.css('width', w);
      c.setAttribute('width', w);
      c.setAttribute('height', h);
    }
  }
  if (obj.resizeBoxTopRight) {
    var w = x - box.offsetLeft;
    var h = obj.bottomY - y;
    if (w > 0 && h > 0) {
      obj.jqObj.css('top', y);
      obj.jqObj.css('width', w);
      obj.jqObj.css('height', h);
      c.setAttribute('width', w);
      c.setAttribute('height', h);
    }
  }
  if (obj.resizeBoxBottomRight) {
    var w = x - box.offsetLeft;
    var h = y - box.offsetTop;

    if (w > 0 && h > 0) {
      obj.jqObj.css('width', w);
      obj.jqObj.css('height', h);
      c.setAttribute('width', w - obj.strokeWidth);
      c.setAttribute('height', h - obj.strokeWidth);
    }
  }
  if (obj.moveBox && !obj.punch.contextMenuOpen) {
    var l = e.pageX - obj.dx;
    var t = e.pageY - obj.dy;
    obj.jqObj.css('top', t + 'px');
    obj.jqObj.css('left', l + 'px');
    obj.top = t;
    obj.left = l - obj.punch.slideLeft;
    obj.jqObj.data().left = l - obj.punch.slideLeft + obj.punch.paddingOffset;
  }
};

String.prototype.trim = function() {
  return this.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
};