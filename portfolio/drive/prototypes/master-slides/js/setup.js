Punch.prototype.setupDemoMaterial = function() {

  var obj = this;

  layout0 = new Layout({
    punch : obj,
    name : 'Title'
  });
  layout0.render();

  layout1 = new Layout({
    punch : obj,
    name : 'Title and Body'
  });
  layout1.render();

  var layout2 = new Layout({
    punch : obj,
    name : 'Title and Two Columns'
  });
  layout2.render();

  var layout3 = new Layout({
    punch : obj,
    name : 'Blank'
  });
  layout3.render();
  
  
  

  slide0 = new Slide({
    punch : obj,
    layout : layout0,
    slideN : 0
  });
  obj.activeSlide = slide0;
  slide0.render();

  var slide1 = new Slide({
    punch : obj,
    layout : layout1,
    slideN : 1
  });
  slide1.render();

  var slide2 = new Slide({
    punch : obj,
    layout : layout1,
    slideN : 2
  });
  slide2.render();

  var slide3 = new Slide({
    punch : obj,
    layout : layout2
  });
  slide3.render();

  var slide4 = new Slide({
    punch : obj,
    layout : layout1
  });
  slide4.render();

  var slide5 = new Slide({
    punch : obj,
    layout : layout1
  });
  slide5.render();

  var master = new Master({
    punch : obj
  });
  master.render();

  var c1 = new Circle({
    punch : obj,
    top : 500,
    left : 400,
    width : 200,
    height : 100,
    color : 'red',
    strokeWidth : 2
  });

  var c2 = new Circle({
    punch : obj,
    top : 200,
    left : 200,
    width : 100,
    height : 100,
    color : 'orange',
    strokeWidth : 2
  });

  var c3 = new Circle({
    punch : obj,
    top : 300,
    left : 500,
    width : 150,
    height : 100,
    color : 'green',
    strokeWidth : 4
  });

  var largeColorRect = new Rect({
    punch : obj,
    top : 60,
    left : 30,
    width : 800,
    height : 400,
    color : '#2f85e2',
    strokeWidth : 0
  });

  var largeColorText = new TextPlaceholder({
    punch : obj,
    top : 300,
    left : 80,
    width : 700,
    height : 100,
    size : 48,
    bold : true,
    color : '#D4E7FA',
    defaultText : 'Click to add title'
  });

  var largeColorSubtitle = new TextPlaceholder({
    punch : obj,
    top : 470,
    left : 80,
    width : 700,
    height : 100,
    size : 24,
    bold : false,
    color : '#2871C0',
    defaultText : 'Click to add subtitle'
  });

  var bulletListText = new TextPlaceholder(
      {
        punch : obj,
        top : 200,
        left : 80,
        width : 700,
        height : 400,
        size : 24,
        bold : false,
        color : '#666',
        defaultText : '<ul><li>List item 1</li><li>List item 2</li><li>List item 3</li></ul>'
      });

  var bulletListTextCol1 = new TextPlaceholder(
      {
        punch : obj,
        top : 200,
        left : 60,
        width : 350,
        height : 400,
        size : 24,
        bold : false,
        color : '#666',
        defaultText : '<ul><li>List item 1</li><li>List item 2</li><li>List item 3</li></ul>'
      });

  var bulletListTextCol2 = new TextPlaceholder(
      {
        punch : obj,
        top : 200,
        left : 450,
        width : 350,
        height : 400,
        size : 24,
        bold : false,
        color : '#666',
        defaultText : '<ul><li>List item 4</li><li>List item 5</li><li>List item 6</li></ul>'
      });

  var smallColorRect = new Rect({
    punch : obj,
    top : 60,
    left : 30,
    width : 800,
    height : 100,
    color : '#2f85e2',
    strokeWidth : 0
  });

  var smallColorText = new TextPlaceholder({
    punch : obj,
    top : 80,
    left : 80,
    width : 700,
    height : 100,
    size : 36,
    color : '#D4E7FA',
    defaultText : 'Click to add title'
  });

  var smallColorRect2 = new Rect({
    punch : obj,
    top : 60,
    left : 30,
    width : 800,
    height : 100,
    color : '#2f85e2',
    strokeWidth : 0
  });

  var smallColorText2 = new TextPlaceholder({
    punch : obj,
    top : 80,
    left : 80,
    width : 700,
    height : 100,
    size : 36,
    color : '#D4E7FA',
    defaultText : 'Click to add title'
  });

  var r2 = new Rect({
    punch : obj,
    top : 500,
    left : 100,
    width : 600,
    height : 100,
    color : 'yellow',
    strokeWidth : 1
  });

  var r3 = new Rect({
    punch : obj,
    top : 320,
    left : 200,
    width : 500,
    height : 50,
    color : 'purple',
    strokeWidth : 1
  });

  var img1 = new Image({
    punch : obj,
    top : 600,
    left : 80,
    width : 284,
    height : 24
  });

  var img2 = new Image({
    punch : obj,
    top : 220,
    left : 80,
    width : 545,
    height : 339
  });
  var imgHTML = '<div style="position: absolute; background: url(img/chart.png) no-repeat center; background-size: 100% 100%; width: 100%; height: 100%"></div>';

  img2.setContent(imgHTML);

  // master.add(c1, $($('.slide-area .master')[0]));
  // master.add(img1, $($('.slide-area .master')[0]));

  layout0.add(largeColorRect, $($('.slide-area .layout')[0]));
  layout0.add(largeColorText, $($('.slide-area .layout')[0]));
  layout0.add(largeColorSubtitle, $($('.slide-area .layout')[0]));

  // layout1.add(smallColorRect, $($('.slide-area .layout')[1]));
  // layout1.add(smallColorText, $($('.slide-area .layout')[1]));
  layout1.add(bulletListText, $($('.slide-area .layout')[1]));

  layout1.add(smallColorRect, $($('.slide-area .layout')[1]));
  layout1.add(smallColorText, $($('.slide-area .layout')[1]));

  layout2.add(smallColorRect2, $($('.slide-area .layout')[2]));
  layout2.add(smallColorText2, $($('.slide-area .layout')[2]));
  layout2.add(bulletListTextCol1, $($('.slide-area .layout')[2]));
  layout2.add(bulletListTextCol2, $($('.slide-area .layout')[2]));

  bulletListTextCol1.jqObj.attr('id', 'bulletListTextCol1');

  // layout2.add(r3, $($('.slide-area .layout')[2]));

  // slide0.add(largeColorSubtitle, $($('.slide-area .slide')[0]));
  // slide0.add(c2, $($('.slide-area .slide')[0]));
  slide0.add(img1, $($('.slide-area .slide')[0]));

  slide5.add(img2, $($('.slide-area .slide')[5]));

  var largeColorTextDup = obj.duplicateBox(largeColorText);
  slide0.add(largeColorTextDup, slide0.jqObj);
  largeColorTextDup.jqObj.data().left = 80;
  largeColorTextDup.jqObj.data().linkedParent = largeColorText;
  largeColorTextDup.linkedParent = largeColorText;
  largeColorTextDup.jqObj.data().setText('Quarterly Report');

  var largeColorSubtitleDup = obj.duplicateBox(largeColorSubtitle);
  slide0.add(largeColorSubtitleDup, slide0.jqObj);
  largeColorSubtitleDup.jqObj.data().left = 80;
  largeColorSubtitleDup.jqObj.data().linkedParent = largeColorSubtitle;
  largeColorSubtitleDup.linkedParent = largeColorSubtitle;
  largeColorSubtitleDup.jqObj.data().setText('2012 Q4 Report');

  // var smallColorTextDup1 = obj.duplicateBox(smallColorText);
  // slide1.add(smallColorTextDup1, slide1.jqObj);
  // smallColorTextDup1.jqObj.data().left = 80;
  // smallColorTextDup1.jqObj.data().linkedParent = smallColorText;
  // smallColorTextDup1.jqObj.data().setText('Q3 Goals');

  var bulletListTextDup1 = obj.duplicateBox(bulletListText);
  slide1.add(bulletListTextDup1, slide1.jqObj);
  bulletListTextDup1.jqObj.data().left = 80;
  bulletListTextDup1.jqObj.data().linkedParent = bulletListText;
  bulletListTextDup1.linkedParent = bulletListText;
  bulletListTextDup1.jqObj
      .data()
      .setText(
          '<ul><li>Increase salesforce by 5 +1<ul><li><font style="font-size: 20pt">Hired 6 new sales people</font></li></ul></li><li>Decrease shrinkage -1<ul><li><font style="font-size: 20pt">No updates</font></li></ul></li><li>Staff re-organization +1<ul><li><font style="font-size: 20pt">Staff re-org to take place in January</font></li></ul></li><li>New office location<ul><li><font style="font-size: 20pt">Found a new location</font></li></ul></li></ul>');

  // var smallColorTextDup2 = obj.duplicateBox(smallColorText);
  // slide2.add(smallColorTextDup2, slide2.jqObj);
  // smallColorTextDup2.jqObj.data().left = 80;
  // smallColorTextDup2.jqObj.data().linkedParent = smallColorText;
  // smallColorTextDup2.jqObj.data().setText('Increase sales force');

  var bulletListTextDup2 = obj.duplicateBox(bulletListText);
  slide2.add(bulletListTextDup2, slide2.jqObj);
  bulletListTextDup2.jqObj.data().left = 80;
  bulletListTextDup2.jqObj.data().linkedParent = bulletListText;
  bulletListTextDup2.linkedParent = bulletListText;
  bulletListTextDup2.jqObj
      .data()
      .setText(
          '<ul><li><strong>6 new hires!</strong></li><li>Allison Brannigan</li><li>Joe Manning</li><li>Steven McBride</li><li>Brian Johns</li></ul>');

  var bulletListTextDup3 = obj.duplicateBox(bulletListText);
  slide4.add(bulletListTextDup3, slide4.jqObj);
  bulletListTextDup3.jqObj.data().left = 80;
  bulletListTextDup3.jqObj.data().linkedParent = bulletListText;
  bulletListTextDup3.linkedParent = bulletListText;
  bulletListTextDup3.jqObj
      .data()
      .setText(
          '<ul><li>No progress was made</li><li>Plans to tackle this is in Q4</li><li>New hires to free up time</li><li>New process in place</li></ul>');

  var bulletListTextCol1Dup1 = obj.duplicateBox(bulletListTextCol1);
  slide3.add(bulletListTextCol1Dup1, slide3.jqObj);
  bulletListTextCol1Dup1.jqObj.data().left = 80;
  // bulletListTextCol1Dup1.linkedParent = bulletListTextCol1;
  bulletListTextCol1Dup1.jqObj.attr('id', 'bulletListTextCol1Dup1');

  bulletListTextCol1Dup1.jqObj.data(bulletListTextCol1Dup1);

  bulletListTextCol1Dup1.jqObj.data().linkedParent = bulletListTextCol1;
  bulletListTextCol1Dup1.linkedParent = bulletListTextCol1;
  bulletListTextCol1Dup1.jqObj
      .data()
      .setText(
          '<ul><li><strong>Management team</strong></li><li>Justin Cooper</li><li>Allison Barker</li><li>Brian James</li><li>Maxwell McSwain</li></li></ul>');

  var bulletListTextCol2Dup1 = obj.duplicateBox(bulletListTextCol2);
  slide3.add(bulletListTextCol2Dup1, slide3.jqObj);
  bulletListTextCol2Dup1.jqObj.data().left = 440;
  // bulletListTextCol2Dup1.linkedParent = bulletListTextCol2;
  bulletListTextCol2Dup1.jqObj.data().linkedParent = bulletListTextCol2;
  bulletListTextCol2Dup1.linkedParent = bulletListTextCol2;
  bulletListTextCol2Dup1.jqObj
      .data()
      .setText(
          '<ul><li><strong>Sales team</strong><li>John James</li><li>Allison Brannigan</li><li>Mark Walter</li><li>Fred Hamish</li></li></ul>');

  // var smallColorTextDup3 = obj.duplicateBox(smallColorText);
  // slide3.add(smallColorTextDup3, slide3.jqObj);
  // smallColorTextDup3.jqObj.data().left = 80;
  // smallColorTextDup3.jqObj.data().linkedParent = smallColorText;
  // smallColorTextDup3.jqObj.data().setText('Staff re-organization');

  // var smallColorTextDup4 = obj.duplicateBox(smallColorText);
  // slide4.add(smallColorTextDup4, slide4.jqObj);
  // smallColorTextDup4.jqObj.data().left = 80;
  // smallColorTextDup4.jqObj.data().linkedParent = smallColorText;
  // smallColorTextDup4.jqObj.data().setText('Decrease shrinkage');

  // var smallColorTextDup5 = obj.duplicateBox(smallColorText);
  // slide5.add(smallColorTextDup5, slide5.jqObj);
  // smallColorTextDup5.jqObj.data().left = 80;
  // smallColorTextDup5.jqObj.data().linkedParent = smallColorText;
  // smallColorTextDup5.jqObj.data().setText('Yearly spending');

  // slide1.add(c3, $($('.slide-area .slide')[1]));
  // slide2.add(r2, $($('.slide-area .slide')[2]));

  obj.defaultLayout = layout1;

  // setTimeout(function() {
  // obj.updateUIComponents();
  // }, 0);

};