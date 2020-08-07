var Global = {
    init : function() {
      var obj = this;
      obj.editor = new Editor();
      obj.page = new Page();
      obj.tool = new Tool();
      obj.colorPicker = new ColorPicker();

      obj.textToolBar = new ToolBar({
        jqObj : $('.toolbar.text')
      });
      obj.imageToolBar = new ToolBar({
        jqObj : $('.toolbar.image')
      });

      obj.docPicker = new DocPicker({
        jqObj : $('#docPicker')
      });
      obj.imagePickerDialog = new ImagePicker({
        jqObj : $('#imagePicker')
      });

      obj.addOverlay = new AddOverlay();
      obj.fontSizeOverlay = new FontSizeOverlay();

      Global.page.sizePanels();

      // obj.docsList = new DocsList();
      // obj.docsList.checkCookies();
      // obj.docsList.requestGlobalFeed();

      
    },
    addDummyContent : function() {
      var page = $('.page');

      var b1 = new TextBlock({
        content : $('#block1').html()
      });
      page.append(b1.jqObj);
      b1.jqObj.css('top', 600);
      b1.jqObj.draggable(Global.draggableConfig);
      
      // dogs
      var b2 = new TextBlock({
        content : $('#block2').html()
      });
      page.append(b2.jqObj);
      b2.jqObj.css('background-color', '#8EC923');
      b2.jqObj.css('padding', '10px');
      b2.jqObj.css('width', '265px');
      b2.jqObj.css('top', 500);
      b2.jqObj.draggable(Global.draggableConfig);
      
      // cats
      var b3 = new TextBlock({
        content : $('#block3').html()
      });
      page.append(b3.jqObj);
      b3.jqObj.css('background-color', '#FFCA18');
      b3.jqObj.css('padding', '10px');
      b3.jqObj.css('width', '265px');
      b3.jqObj.css('top', 600);
      b3.jqObj.css('left', 315);
      b3.jqObj.draggable(Global.draggableConfig);
      
      // small animals
      var b4 = new TextBlock({
        content : $('#block4').html()
      });
      page.append(b4.jqObj);
      b4.jqObj.css('background-color', '#FF9300');
      b4.jqObj.css('padding', '10px');
      b4.jqObj.css('width', '265px');
      b4.jqObj.css('top', 600);
      b4.jqObj.css('left', 615);
      b4.jqObj.draggable(Global.draggableConfig);
      
      var b5 = new TextBlock({
        content : $('#block5').html()
      });
      page.append(b5.jqObj);
      b5.jqObj.css('top', 600);
      b5.jqObj.draggable(Global.draggableConfig);
      
      var b6 = new TextBlock({
        content : $('#block6').html()
      });
      page.append(b6.jqObj);
      b6.jqObj.css('top', 600);
      b6.jqObj.draggable(Global.draggableConfig);
      
      var b7 = new TextBlock({
        content : $('#block7').html()
      });
      page.append(b7.jqObj);
      b7.jqObj.css('top', 600);
      b7.jqObj.draggable(Global.draggableConfig);
      
      var b8 = new HTMLBlock({
        content : '<img src="tweet_button.png"><br><b>Tweet about this page</b>'
      });
      page.append(b8.jqObj);
      b8.jqObj.css('width', '210px');
      b8.jqObj.css('left', 615);
      b8.jqObj.draggable(Global.draggableConfig);
      
      /*
      var b9 = new HTMLBlock({
        content : '<img src="img/photos/logo.png">'
      });
      page.append(b9.jqObj);
      b9.jqObj.draggable(Global.draggableConfig);
      */

      Global.page.refreshBlocks();
    },
    draggableConfig : {
        start : function(e) {
          $('.page').addClass('show-grid');
          Global.editor.dragging = true;
//          Global.editor.dragObj = $(this).parents('.block')[0];
        },
        stop : function(e) {
          $('.page').removeClass('show-grid');
          for ( var i = 0; i < 10; i++) {
            Global.page.positionBlocks();
          }
          Global.editor.dragging = false;
//          Global.editor.dragObj = null;
        },
        drag : function(e) {
          
          
          
        },
        handle : '.handle',
        grid : [
            75, 1
        ]
    }
};

$(document).ready(function() {
  Global.init();
});