{
	"name": "Intro to JQuery",
	"author": {
		"name": "Junius Gunaratne",
		"email": "junius@google.com"
	},
	"description": "Intro to JQuery",
	"slides": [{
		"type": "main",
		"title": "JQuery Basics",
		"subtitle": "Getting started with prototyping"
	},
	{
		"type": "text",
		"title": "Prototype Fidelity",
		"content":
     "
<style>
ul ul li {
 font-size: 16pt;
 line-height: 20pt;
}
</style>
<ul>
<li>Paper prototypes<ul><li>Best for narrative, simple, staged prototypes
  <br>Example: cognitive walkthrough studies</li></ul></li>
<li>Slideware prototypes <ul><li>Best for animated, narrative, staged prototype
  <br>Example: design exploration, stakeholder buy in</li></ul></li></li>
<li>Fireworks/Axure prototypes <ul><li>Best for simple, interactive, realistic prototypes
  <br>Example: early stage usability studies</li></ul></li></li>
<li>HTML/CSS/JQuery prototypes <ul><li>Best for animated, realistic prototypes
  <br>Example: late stage usability studies</li></ul></li></li>
</ul>"}, 
  {
		"type": "list",
		"title": "What is JQuery?",
		"items": ["Created by John Resig in 2006 at BarCamp NYC", 
			"Used by 55% of top 10,000 websites", 
			"Low barrier to entry",
			"Easy to add complex functionality",
			"Concepts and syntax similar to CSS",
			"More designer friendly than alternatives like Closure and YUI"]
	},
	{
		"type": "list",
		"title": "What we prototyped with JQuery",
		"items": [
			"2 prototypers on Google Docs UX, primarily using JQuery",
			"Google Presentations, present and future", 
			"Google Spreadsheets and Gmail", 
			"Google Drive, live data from GData APIs"]
	},
    {
  		"type": "list",
  		"title": "Agenda",
  		"items": ["Basic JS and CSS Selectors", 
  			"Navigating the DOM", 
  			"Changing HTML and CSS",
  			"Events",
  			"Animation",
  			"Dynamic Content, AJAX"]
  	},
	{
      "type": "text",
      "title": "JavaScript variables",
      "content":
        "<pre>
var a = 1;<br>
var b = 'two';<br>
var c = true;<br>
var arr = ['a','b', 3];<br>
var cir = function(r) {<br>
  return 2 * Math.PI * r;<br>
}
</pre>"
    },
	{
      "type": "text",
      "title": "JavaScript objects",
      "content":
        "<pre>
var person = {<br>
  firstName : 'Junius',<br>
  lastName : 'Gunaratne'<br>
}<br>
<br>
person.firstName;<br>
person['lastName'];<br>
</pre>"
    },
	{
      "type": "text",
      "title": "JavaScript objects and functions",
      "content":
        "<pre>
var person = {<br>
  firstName : 'Junius',<br>
  lastName : 'Gunaratne',<br>
  greet : function() {<br>
    var str = 'Hello, ' + this.firstName;<br>
    alert(str);<br>
  }<br>
}<br>
<br>
person.greet();
</pre>"
    },
	{
      "type": "text",
      "title": "CSS Selectors",
      "content":
       "<pre>
#myId {<br>
  border: 1px solid blue;<br>
}<br>
<br>
.my-style {<br>
  color: red;<br>
}<br>
<br>
#myId .my-style p:first-child, li {<br>
  text-transform: uppercase;<br>
}<br>
</pre>"
    },
	{
      "type": "text",
      "title": "JQuery Selectors",
      "content":
       "
<ul class='my-list'>
  <li>Item 1</li>
  <li>Item 2</li>
  <li>Item 3</li>
</ul>
<pre>
jQuery('.my-list li');<br>
$('.my-list li');<br>
</pre>
"
    },
	{
      "type": "text",
      "title": "Create DOM Element",
      "content":
       "
<ul class='my-list2'>
  <li>Item 1</li>
  <li>Item 2</li>
  <li>Item 3</li>
</ul>
<pre>
var li = $('&lt;li>New Item&lt;/li>');<br>
$('.my-list2').append(li);<br>
$('.my-list2 li:last').remove();
</pre>
"
    },
	{
      "type": "text",
      "title": "DOM Insertion",
      "content":
       "
<ul class='my-list3'>
  <li>Item 1</li>
  <li>Item 2</li>
  <li>Item 3</li>
</ul>
<pre>
var li = $('&lt;li>New Item&lt;/li>');<br>
$('.my-list3 li:nth-child(3)').before(li);<br>
$('.my-list3 li:nth-child(3)').after(li);<br>
$('.my-list3 li:first').next();<br>
$('.my-list3 li:last').prev();<br>
$('.my-list3 li:first').siblings();<br>
$('.my-list3 li:first').closest();
</pre>
"
    },
	{
"type": "text",
"title": "DOM Traversal",
"content":
"<ul class='haystack'>
<li>Grass</li>
<li>Wheat</li>
<li>Space <span class='needle'>Needle</span></li>
</ul>
<pre>
$('.haystack li:first').parent();<br>
$('.haystack').find('.needle');<br>
$('.haystack').children();
</pre>
"
	},
	{
      "type": "text",
      "title": "Changing HTML Content",
      "content":
       "
<ul class='my-list4'>
  <li>Amazon</li>
  <li>Nile</li>
  <li>Danube</li>
</ul>
<pre>
var firstLi = $('.my-list4 li:first');<br>
<span style='text-decoration: line-through; color: red'>firstLi.innerHTML = 'Hudson';</span><br>
firstLi.html('Hudson');<br>
<br>
$('.my-list4 li').each(function() {<br>
  $(this).html($(this).html() + ' river');<br>
});
</pre>
"
    },
	{
      "type": "text",
      "title": "Changing CSS",
      "content":
       "
<ul class='my-list5'>
  <li>Amazon</li>
  <li>Nile</li>
  <li>Danube</li>
</ul>
<pre>
$('.my-list5 li:first').css('color','orange');<br>
$('.my-list5 li').css('text-shadow','2px 2px 5px rgba(0,0,0,.75)');<br>
</pre>
"
    },
	{
      "type": "text",
      "title": "Adding Classes",
      "content":
       "
<style>
.my-list6 li {
  display: inline-block;
  padding: 5px 10px;
}
.selected-li {
  background: #888;
  color: #fff;
  border-radius: 10px;
  box-shadow: 2px 2px 5px rgba(0,0,0,.5);
}
</style>
<ul class='my-list6'>
  <li>Amazon</li>
  <li>Nile</li>
  <li>Danube</li>
</ul>
<pre>
$('.my-list6 li:first').addClass('selected-li');<br>
$('.my-list6 li').click(function() {<br>
  $(this).toggleClass('selected-li')<br>
});
</pre>
"
    },
	{
      "type": "text",
      "title": "Document Ready Event",
      "content":
       "
<pre>
$(document).ready(function() {<br>
  console.log('ready!');<br>
});<br>
</pre>
"
    },
	{
      "type": "text",
      "title": "Events",
      "content":
       "
<style>
#easyButton {
  background: red;
  border: 2px solid #888;
  color: white;
  border-radius: 50px;
  display: inline-block;
  padding: 10px 20px;
  box-shadow: inset 0 0 15px rgba(255,255,255,.75);
  cursor: pointer;
}
</style>
<div id='easyButton'>Easy</div>
<pre>
document.getElementById('easyButton').onclick = function() {<br>
  this.innerHTML = 'Done';<br>
  this.style.background = 'blue';<br>
};<br>
<br>
$('#easyButton').click(function() {<br>
  $(this).html('Done').css('background','blue');<br>
});<br>
</pre>
"
    },
	{
      "type": "text",
      "title": "Multiple Events",
      "content":
       "
<style>
.ball-container {
  position: relative;
}
.ball {
  width: 100px;
  height: 100px;
  background: red;
  border-radius: 50px;
  cursor: move;
  position: absolute;
  right: 0;
  top: 0;
}
</style>
<div class='ball-container'>
<div class='ball'></div>
</div>
<pre>
var moveBall = false;<br>
$(document).mousemove(function(e) {<br>
  var ballOffset = $('.ball').parent().offset();<br>
  if (moveBall) {<br>
    var ballOffset = $('.ball').parent().offset();<br>
    $('.ball').css('left', e.pageX - ballOffset.left - 50 + 'px')<br>
      .css('top', e.pageY - ballOffset.top + - 50 + 'px');<br>
  }
});<br>
$('.ball').on({<br>
  mousedown: function(e) { moveBall = true; return false; },<br>
  mouseup : function(e) { moveBall = false; }<br>
});
</pre>
"},
{
  "type": "text",
  "title": "Focus and Keyboard Events",
  "content":
   "
<style>
.my-field {
  font-size: 36pt;
  padding: 10px 20px;
  border-radius: 50px;
}
.my-field:focus {
  outline: none;
}
.my-field.inactive {
  color: #ccc;
}
</style>
<input value='Enter a color' class='my-field inactive'>
<pre>
$('.my-field').focus(function() {<br>
  $(this).val('').removeClass('inactive');<br>
});<br>
<br>
$('.my-field').keyup(function() {<br>
  if ($(this).val() == 'cyan') {<br>
    $(this).css('background-color', 'cyan');<br>
  }<br>
});
</pre>
"
},
{
  "type": "text",
  "title": "Animation",
  "content":
   "
<style>
.ball2 {
width: 100px;
height: 100px;
background: red;
border-radius: 50px;
}
</style>
<div class='ball2'></div>
<pre>
$('.ball2').click(function() {<br>
  $(this).fadeOut();<br>
});<br>
<br>
$('.ball2').fadeIn();
</pre>
"},
{
  "type": "text",
  "title": "Controlling Animation",
  "content":
   "
<style>
.ball3 {
width: 100px;
height: 100px;
background: red;
border-radius: 50px;
}
</style>
<div class='ball3'></div>
<pre>
$('.ball3').click(function() {<br>
  $(this).fadeOut('slow', function() {<br>
    alert('Gone');<br>
  });<br>
});<br>
"},
{
  "type": "text",
  "title": "Custom Animation",
  "content":
   "
<style>
.growth {
  position: relative;
  margin: 0;
}
</style>
<h1 class='growth'>Growth</h1>
<pre>
var growth = $('.growth');<br>
growth.click(function() {<br>
  growth.animate({<br>
      opacity: 0.25,<br>
      fontSize: '48pt',<br>
    }, 1000, function() {<br>
      growth.animate({ left: '+=400' });<br>
    }<br>
  );<br>
});<br>
"},{
  "type": "text",
  "title": "Getting Content with AJAX",
  "content":
   "
<style>
.list7-container {
  position: relative;
}
.countries {
  position: absolute;
  right: 0;
  background: #EEE;
  font-size: 16px;
  width: 200px;
  padding: 10px;
  border: 1px solid #888;
  border-radius: 5px;
  line-height: 24px;
  list-style-position: inside;
}
#getCountriesBtn {
  padding: 10px;
  font-size: 16px;
}
</style>
<div class='list7-container'>
<button id='getCountriesBtn'>Get Countries</button>
<ul class='countries'>
<li>Cayman Islands</li>
</ul>
</div>
<pre>
$('#getCountriesBtn').click(function() {<br>
  $.ajax({<br>
    url: 'data.json?n=' + Math.random(),<br>
    dataType: 'json',<br>
    success: function(data) {<br>
      for (i in data.countries) {<br>
        $('.countries').append($('&lt;li>'+data.countries[i]+'&lt;/li>'));<br>
      }<br>
    }<br>
  });<br>
});<br>
</pre>
"}
	]
}
