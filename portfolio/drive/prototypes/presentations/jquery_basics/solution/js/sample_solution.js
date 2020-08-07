String.prototype.trim = function() {
  return this.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
};

function isValidEmail(email) {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

function resetMsgArea() {
  setTimeout(function() {
    $('#msgArea').fadeOut('slow', function() {
      var msgArea = $('#msgArea');
      msgArea.html('');
      msgArea.show();
    });
  }, 3000);
  
  var loginPane = $('#loginPane');
  loginPane.animate({ left: '+=50' }, 100, function() {
    loginPane.animate({ left: '-=100' }, 200, function() {
      loginPane.animate({ left: '+=100' }, 200, function() {
        loginPane.animate({ left: '-=100' }, 200, function() {
          loginPane.animate({ left: '+=50' }, 100, function() {

          });
        });
      });
    });
  });
  
}

$(document).ready(function() {
  $('#msgArea').hide();
  
  $('.radio-btn').click(function() {
    $('#newUserOptions').toggle();
  });
  
	$('#signInBtn').click(function() {
			var fieldVal = $('#emailFld').val();
			var validEmail = isValidEmail(fieldVal);
			$('input').css('border', '');
			if (!validEmail) {
			  $('#msgArea').html('Please enter a valid email address.');
			  $('#emailFld').css('border', '1px solid red').focus();
			  $('#msgArea').show();
			  resetMsgArea();
			} else if ($('#passwdFld').val() == '') {
			  $('#msgArea').html('Please enter a password.');
			  $('#passwdFld').css('border', '1px solid red').focus();
			  $('#msgArea').show();
			  resetMsgArea();
			} else if ($('#passwdFld').val() != $('#passwdConfirmFld').val()) {
			  $('#msgArea').html('Passwords do not match.');
			  $('#passwdConfirmFld').css('border', '1px solid red').focus();
			  $('#msgArea').show();
			  resetMsgArea();
			} else {
			  alert('Success');
			}
	});
});