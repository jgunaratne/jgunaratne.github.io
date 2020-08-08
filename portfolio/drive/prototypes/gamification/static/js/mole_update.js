$(document).ready(function() {

  function checkLast() {
    $.ajax({
        url : "/lastitem",
        success : function(data) {

          var json = eval(data);

          $('.badge-name').html(json[0].name);

          if (json[0].type == 'badge') {
            $('#earnedItemBadge').show();
            $('#earnedItemSkill').hide();
            $('#earnedBadgeTitle').show();
            $('#earnedSkillTitle').hide();
            $('#badgeReason').show();
            $('#skillReason').hide();
          } else {
            $('#earnedItemBadge').hide();
            $('#earnedItemSkill').show();
            $('#earnedBadgeTitle').hide();
            $('#earnedSkillTitle').show();
            $('#badgeReason').hide();
            $('#skillReason').show();
            // force update?
            $('#earnedItemSkill .icon').addClass(json[0].icon);
          }

          console.log(json)
        }
    });
  }

  checkLast();
  setInterval(function() {
    checkLast();
  }, 1000);

});