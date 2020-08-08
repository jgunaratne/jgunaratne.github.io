$(document).ready(function() {

  function checkBadges() {
    $.ajax({
        url : "/badges",
        success : function(data) {

          $('.badge-list').html('');

          var json = eval(data);

          for ( var i = 0; i < json.length; i++) {
            // enabled or not?
            var enabled = String(json[i].enabled);
            var color = "#B3AEC2";
            
            if(enabled == "True"){ 
              color = json[i].color;
            }
            
            var badgeHTML = '<li>\
            <a href="/badge_info/' + json[i].name + '"><div class="badge" style="background: '+ color +'"></div>\
            <div class="badge-desc">\
              <h4>' + json[i].name + '</h4>\
              <p>\
                You need <strong>' + json[i].skills + ' skills</strong> to earn this badge\
              </p>\
            </div></a>\
          </li>';

            $('.badge-list').append(badgeHTML);

          }

          console.log(json)
        }
    });
  }

  checkBadges();
  setInterval(function() {
    checkBadges();
  }, 1000);

});