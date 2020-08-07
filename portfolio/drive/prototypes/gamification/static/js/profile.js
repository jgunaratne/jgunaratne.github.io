

$(document).ready(function() {

  function checkAll() {

    var skillN = 0;
    var badgeN = 0;
    
    $.ajax({
        url : "/skills",
        success : function(data) {

          $('.items-container .skills').html('');

          var json = eval(data);

          for ( var i = 0; i < json.length; i++) {
            var enabled = String(json[i].enabled);
            var color = "#B3AEC2";
            
            if(enabled == "True"){ 
              color = json[i].color;
              skillN++;
            }
            var html = '<div class="circle small" style="background: ' + color + '">\
                  <div class="ring-first">\
                <div class="ring-second"></div>\
              </div>\
              <div class="icon ' + json[i].icon + '"></div>\
            </div> ';

            $('.items-container .skills').append(html);
            
          }
          
          $('.skill-count').html(skillN);
          console.log(json)

        }
    });
    
    $.ajax({
      url : "/badges",
      success : function(data) {

        $('.badges').html('');

        var json = eval(data);

        for ( var i = 0; i < json.length; i++) {
          var enabled = String(json[i].enabled);
          var color = "#B3AEC2";
          
          if(enabled == "True"){ 
            color = json[i].color;
            badgeN++;
          }
          var html = '<div class="badge" style="background: ' + color + '"></div> ';

          $('.badges').append(html);
          

        }

        $('.badge-count').html(badgeN);
        console.log(json)

      }
  });
    
    
  }

  checkAll();
  setInterval(function() {
    checkAll();
  }, 1000);

});