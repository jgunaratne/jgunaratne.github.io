$(document).ready(function() {

  function checkSkills() {
    $.ajax({
        url : "/skills",
        success : function(data) {

          $('.tasks').html('');

          var json = eval(data);

          for ( var i = 0; i < json.length; i++) {
            var enabled = String(json[i].enabled);
            var color = "#B3AEC2";
            
            if(enabled == "True"){ 
              color = json[i].color;
            }
            
            var html = '<a href="/skill_info/'+json[i].name+'"><div class="circle" style="background: ' + color + '">\
              <div class="ring-first">\
                <div class="ring-second"></div>\
              </div>\
              <div class="icon ' + json[i].icon + '" style="background: ' + color + '></div>\
              <div class="circle-desc" style="color: ' + color + '">' + json[i].name + '</div>\
            </div></a>';

            $('.tasks').append(html);

          }

          console.log(json)

        }
    });
  }

  checkSkills();
  setInterval(function() {
    checkSkills();
  }, 1000);

});