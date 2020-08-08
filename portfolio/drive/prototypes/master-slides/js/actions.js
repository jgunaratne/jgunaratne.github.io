Punch.prototype.zoomIn = function() {
  $('.slide-area').css('zoom', 1.5);
};

Punch.prototype.zoomToFit = function() {
  $('.slide-area').css('zoom', 1);
};

Punch.prototype.addCircle = function() {
  var obj = this;
  var c = new Circle({
    punch : obj,
    top : 100,
    left : 100 + obj.slideLeft,
    width : 200,
    height : 200,
    color : 'orange',
    strokeWidth : 2
  });

  var selectedSlide = obj.getSelectedSlide();
  var selectedSlideJQObj = selectedSlide.jqObj;
  selectedSlide.add(c, selectedSlideJQObj);
  obj.createSlidePreview();
};

Punch.prototype.addRect = function() {
  var obj = this;
  var r = new Rect({
    punch : obj,
    top : 100,
    left : 100,
    width : 500,
    height : 100,
    color : 'purple',
    strokeWidth : 1
  });

  var selectedSlide = obj.getSelectedSlide();
  var selectedSlideJQObj = selectedSlide.jqObj;
  selectedSlide.add(r, selectedSlideJQObj);
  obj.createSlidePreview();
};

Punch.prototype.addRoundRect = function() {
  var obj = this;
  var r = new RoundRect({
    punch : obj,
    top : 100,
    left : 100,
    width : 100,
    height : 100,
    color : 'purple',
    strokeWidth : 1
  });

  var selectedSlide = obj.getSelectedSlide();
  var selectedSlideJQObj = selectedSlide.jqObj;
  selectedSlide.add(r, selectedSlideJQObj);
  obj.createSlidePreview();
};

Punch.prototype.addText = function() {
  var obj = this;
  var t = new Text({
    punch : obj,
    top : 100,
    left : 50 + obj.slideLeft,
    width : 400,
    height : 200,
    defaultText : ''
  });
  var selectedSlide = obj.getSelectedSlide();
  var selectedSlideJQObj = selectedSlide.jqObj;
  selectedSlide.add(t, selectedSlideJQObj);
  obj.createSlidePreview();
  if (obj.getMode() != 'slide') {
    $('.text-placeholder .editable-text').attr('contenteditable', 'false');
  }
  obj.centerSlide();
};

Punch.prototype.addTextPlaceholder = function() {
  var obj = this;
  var t = new TextPlaceholder({
    punch : obj,
    top : 200,
    left : 300,
    width : 400,
    height : 200,
    defaultText : 'Click here to add text'
  });
  var selectedSlide = obj.getSelectedSlide();
  var selectedSlideJQObj = selectedSlide.jqObj;
  selectedSlide.add(t, selectedSlideJQObj);
  obj.createSlidePreview();
  if (obj.getMode() != 'slide') {
    $('.text-placeholder .editable-text').attr('contenteditable', 'false');
  }
};

function selectText(objId) {
  var range = document.createRange();
  range.selectNode(objId);
  window.getSelection().addRange(range);
}

Punch.prototype.boldText = function() {

  var obj = this;
  var selectedSlideObj = obj.selectedSlideJQObj.data();
  if (selectedSlideObj.selectedItem) {
    var selItem = selectedSlideObj.selectedItem;
    selItem.bold = !selItem.bold;
    selItem.modified = true;

    if (obj.getMode() != 'slide'
        && selectedSlideObj.selectedItem.type == 'text-placeholder') {
      var editTextObj = selectedSlideObj.selectedItem.jqObj
          .find('.editable-text');
      editTextObj.attr('contenteditable', 'true');
      selectText(editTextObj.find('font')[0]);
      document.execCommand('bold', false, null);
      editTextObj.attr('contenteditable', 'false');
      
      selItem.jqObj.data().bold = selItem.bold;
      selItem.jqObj.data().modified = true;

      
    } else {
      document.execCommand('bold', false, null);
    }
  }
  
  

};

Punch.prototype.italicText = function() {

  var obj = this;
  var selectedSlideObj = obj.selectedSlideJQObj.data();
  if (selectedSlideObj.selectedItem) {
    var selItem = selectedSlideObj.selectedItem;
    selItem.italic = !selItem.italic;
    selItem.modified = true;

    if (obj.getMode() != 'slide'
        && selectedSlideObj.selectedItem.type == 'text-placeholder') {
      var editTextObj = selectedSlideObj.selectedItem.jqObj
          .find('.editable-text');
      editTextObj.attr('contenteditable', 'true');
      selectText(editTextObj.find('font')[0]);
      document.execCommand('italic', false, null);
      editTextObj.attr('contenteditable', 'false');
      
      selItem.jqObj.data().italic = selItem.italic;
      selItem.jqObj.data().modified = true;
      
    } else {
      document.execCommand('italic', false, null);
    }
  }
};

Punch.prototype.underlineText = function() {

  var obj = this;
  var selectedSlideObj = obj.selectedSlideJQObj.data();
  if (selectedSlideObj.selectedItem) {
    var selItem = selectedSlideObj.selectedItem;
    selItem.underline = !selItem.underline;
    selItem.modified = true;

    if (obj.getMode() != 'slide'
        && selectedSlideObj.selectedItem.type == 'text-placeholder') {
      var editTextObj = selectedSlideObj.selectedItem.jqObj
          .find('.editable-text');
      editTextObj.attr('contenteditable', 'true');
      selectText(editTextObj.find('font')[0]);
      document.execCommand('underline', false, null);
      editTextObj.attr('contenteditable', 'false');
      
      selItem.jqObj.data().underline = selItem.underline;
      selItem.jqObj.data().modified = true;
      
    } else {
      document.execCommand('underline', false, null);
    }
  }
};

Punch.prototype.changeFontSize = function(n) {
  var obj = this;
  var pts = n + 'pt';
  var sel = window.getSelection();
  if (sel.rangeCount) {
    parentEl = sel.getRangeAt(0).commonAncestorContainer;
    if (parentEl.nodeType != 1) {
      parentEl = parentEl.parentNode;
    }
    document.execCommand('fontSize', false, pts);
    obj.currSelTextParent = parentEl;
  }
  if (obj.currSelTextParent) {
    var fontEl = $(obj.currSelTextParent).parents('.box').find('font');
    fontEl.css('font-size', pts);
  }
  var selectedSlideObj = obj.selectedSlideJQObj.data();
  if (selectedSlideObj.selectedItem) {
    var selItem = selectedSlideObj.selectedItem;
    selItem.size = n;
    selItem.modified = true;
    
    selItem.jqObj.data().size = selItem.size;
    selItem.jqObj.data().modified = true;
    
  }
};

Punch.prototype.changeTextColor = function(color) {

  var obj = this;
  var selectedSlideObj = obj.selectedSlideJQObj.data();
  var selItem = selectedSlideObj.selectedItem;
  if (selectedSlideObj.selectedItem) {
    selItem.color = color;
    selItem.modified = true;
    obj.createSlidePreviewsNoTimeout();
    obj.createLayoutPreviewsOnly();

    if (obj.getMode() != 'slide'
        && selectedSlideObj.selectedItem.type == 'text-placeholder') {
      var editTextObj = selectedSlideObj.selectedItem.jqObj
          .find('.editable-text');
      editTextObj.attr('contenteditable', 'true');
      selectText(editTextObj.find('font')[0]);
      document.execCommand('forecolor', false, color);
      editTextObj.attr('contenteditable', 'false');
      
      selItem.jqObj.data().color = selItem.color;
      selItem.jqObj.data().modified = true;
      
    } else {
      document.execCommand('forecolor', false, color);
    }

  }
};

Punch.prototype.insertNumList = function() {
  document.execCommand('insertorderedlist', false, null);
};

Punch.prototype.insertBulletList = function() {
  document.execCommand('insertunorderedlist', false, null);
};