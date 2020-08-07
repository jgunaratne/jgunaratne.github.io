var Tool = function() {
  var obj = this;
  $('.toolbar a').bind('click', function(e) {
    var toolName = e.srcElement.innerHTML;
    var page = $('.page');
    switch (toolName) {
      case 'Image':
        $('#imagePicker').show();
        break;
      case 'Text':
        Global.editor.insertText();
        break;
      case 'HTML':
        Global.editor.insertHTML();
        break;
      case 'Box':
        Global.editor.insertBox();
        break;
      case 'Rule':
        break;
      case 'Google Doc':
        $('#docPicker').show();
        break;
    }
  });
};

var ToolBar = function(config) {
  var obj = this;
  obj.jqObj = config.jqObj;
  var toolLis = obj.jqObj.find('li');
  toolLis.bind('click', function(e) {
    var elem = $(e.currentTarget);
    var elemName = elem.text().replace(/^\s+|\s+$/g, '');
    switch (elemName) {
      case 'Bold':
        
        var styleElem = $('<span/>');
        styleElem.css('font-weight', 'bold');
        //$('<b/>')
        Global.editor.addStyle(styleElem);
        break;
      case 'Italic':
        Global.editor.addStyle($('<i/>'));
        break;
      case 'Underline':
        Global.editor.addStyle($('<u/>'));
        break;
      case 'Rotate':
        Global.page.selectedBlock.rotate();
        break;
      case 'TextColor':
        var picker = $('#colorPicker');
        picker.show();
        picker.css('top', 120).css('left', elem.offset().left);
        Global.colorPicker.tool = elemName;
        break;
      case 'Bucket':
        var picker = $('#colorPicker');
        picker.show();
        picker.css('top', 120).css('left', elem.offset().left);
        Global.colorPicker.tool = elemName;
        break;
      case 'Pen':
        var picker = $('#colorPicker');
        picker.show();
        picker.css('top', 120).css('left', elem.offset().left);
        Global.colorPicker.tool = elemName;
        break;
    }
    if (elemName.replace(/([0-9])*/,'') == ' pt') {
      $('#fontSizeOverlay').show();
    }
  });
};