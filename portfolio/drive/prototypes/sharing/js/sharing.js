window.onkeydown = function(e) {
	if (e.keyCode == 46) { // Delete key
		e.preventDefault();
	}
}

function getURLParam(name) {
	name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
	var regexS = "[\\?&]" + name + "=([^&#]*)";
	var regex = new RegExp(regexS);
	var results = regex.exec(window.location.href);
	if (results == null)
		return "";
	else
		return results[1];
}

var App = function() {
	var obj = this;
	obj.useLink = false;
	obj.contacts = [];
};

App.prototype.getContacts = function() {
	var obj = this;
	$.ajax({
		url : 'contacts.xml',
		success : function(data) {
			obj.addContacts(data);
		},
		error : function() {
			console.log('Error getting data.');
		}
	})
};

App.prototype.addContacts = function(data) {
	var obj = this;
	var xml = $(data);
	var entries = xml.find('entry');
	obj.ownerName = xml.find('author name').text();
	obj.ownerEmail = xml.find('author email').text();
	for (var i = 0; i < entries.length; i++) {
		var entry = $(entries[i]);
		var name = $(entry.find('title')).text();
		var email = entry.find('email').attr('address');
		var links = entry.find('link');
		var photoURL = '';
		// for (var j = 0; j < links.length; j++) {
		// 	var link = $(links[j]);
		// 	var rel = link.attr('rel');
		// 	if (rel == 'http://schemas.google.com/contacts/2008/rel#photo') {
		// 		photoURL = link.attr('href');
		// 		break;
		// 	}
		// }

		if (name != '' && email != '' && name != null && email != null) {
			var contact = {
				name : name,
				email : email,
				photo : photoURL
			}
			obj.contacts.push(contact);
		}

		if (name == obj.ownerName || email == obj.ownerEmail) {
			obj.ownerPhotoURL = photoURL;
		}

	}

	obj.contacts.sort(function(a, b) {
		var nameA = a.name.toLowerCase(), nameB = b.name.toLowerCase()
		if (nameA < nameB)
			return -1;
		if (nameA > nameB)
			return 1;
		return 0;
	});

	obj.renderContacts();
};

App.prototype.renderContacts = function() {
	var obj = this;
	var contactList = $('#contactList');
	for (var i = 0; i < obj.contacts.length; i++) {
		var contact = obj.contacts[i];
		var html = '<li><div class="contact-group"><div class="photo"></div><div class="name">'
				+ contact.name
				+ '</div>\
    <div class="email">'
				+ contact.email + '</div></div></li>';
		var li = $(html);
		var photo = li.find('.photo');
		(function(i, c, p) {
			setTimeout(function() {
				if (c.photo != '') {
					p.css('background-image', 'url(/getphoto?url=' + c.photo
							+ ')');
				}
			}, i * 200);
		})(i, contact, photo);
		li.data(contact);
		contactList.append(li);
	}
};

App.prototype.updateShareStatus = function() {
	var obj = this;

	function update() {
		var chips = $('.chip');
		var permissionText = ' '
				+ $('.main-input .permission-btn .acl-btn-text').text()
						.toLowerCase();

		if (obj.activePermissionBtn
				&& obj.activePermissionBtn.hasClass('gray-area-permission-btn')) {

			var linkPermission = $('.gray-area-permission-btn .acl-btn-text')
					.html().toLowerCase();
			$('.shared-with').html('Anyone with link ' + linkPermission);
		} else {
			if (chips.length == 0) {
				$('.share-people').text('');

				// $('.share-status').addClass('highlighted');
				// $('.share-status .icon').removeClass('share-link').addClass(
				// 'private');
				$('.will-be-shared').hide();
				$('.private').show();
				if (obj.statusHighlightTimeout) {
					clearTimeout(obj.statusHighlightTimeout);
				}
				obj.statusHighlightTimeout = setTimeout(function() {
					// $('.share-status').removeClass('highlighted');
				}, 5000);

				$('.main-share-btn .icon').removeClass('share-link').addClass(
						'private');
				$('#shareBtn').addClass('disabled');

				if (obj.useLink == true) {
					$('.main-share-btn .icon').addClass('share-link')
							.removeClass('private');
					$('#shareBtn').removeClass('disabled');
					$('.share-people').text('via link');
					$('.will-be-shared').show();
					$('.private').hide();
					$('.share-status .icon').addClass('share-link')
							.removeClass('private');
				}

			} else {
				$('.main-share-btn .icon').addClass('share-link').removeClass(
						'private');
				$('#shareBtn').removeClass('disabled');

				if (chips.length == 1) {
					$('.share-people').text('and 1 person' + permissionText);
				}
				if (chips.length > 1) {
					$('.share-people').text(
							'and ' + chips.length + ' people' + permissionText);
				}
			}
		}
		obj.activePermissionBtn = null;
	}

	setTimeout(function() {
		update();
	}, 100);

};

App.prototype.addChip = function(contact) {
	var obj = this;
	function chipClickHandler(e) {
		$('.chip.selected').removeClass('selected');
		$(e.currentTarget).toggleClass('selected');
		$('.contact-list-container').hide();
		if (obj.contactFocusTimeout) {
			clearTimeout(obj.contactFocusTimeout);
		}
		$('.main-input').addClass('focus');
		e.stopPropagation();
		e.preventDefault();
	}
	var html = '<div class="chip">\
		<div class="chip-photo"></div>\
        <div class="chip-name">' + contact.name + '</div>\
        <div class="chip-rem"></div>\
      </div>';
	var chip = $(html);
	chip.find('.chip-rem').on('click', function(e) {
		removeChipNow(e);
	});
	if (contact.photo != '') {
		chip.find('.chip-photo').css('background-image',
				'url(/getphoto?url=' + contact.photo + ')');
	}
	chip.click(chipClickHandler);
	chip.data(contact);
	chip.insertBefore($('#contactInput'));
	$('.main-input .permission-btn, .note, .link-note').show();
	obj.updateShareStatus();
	// $('.share-status').addClass('highlighted');
	$('.share-status .icon').addClass('share-link').removeClass('private');
	$('.will-be-shared').show();
	$('.private').hide();
	if (obj.statusHighlightTimeout) {
		clearTimeout(obj.statusHighlightTimeout);
	}
	setTimeout(function() {
		$('#doneBtnGroup').hide();
		$('#sendBtnGroup').show();
		$('.acl-btn-text').removeClass('collapse');
	}, 250);
	obj.statusHighlightTimeout = setTimeout(function() {
		$('.acl-btn-text').addClass('collapse');
	}, 2500);
	obj.updateLinkTop();
};

App.prototype.matchChip = function(str) {
	var lis = $('#contactList li');
	for (var i = 0; i < lis.length; i++) {
		var li = $(lis[i]);
		var contact = li.data();
		var name = contact.name.toLowerCase();
		if (name.indexOf(str.toLowerCase()) > -1) {
			li.show();
		} else {
			li.hide();
		}
	}

};

function removeChip(e) {
	$('.chip.selected').remove();
	app.updateLinkTop();
	app.updateShareStatus();
	if (!$('#contactInput').is(":focus")
			&& !$('#noteInput').is(":focus")) {
		$('#contactInput').focus();
		$('.main-input').addClass('focus');
		if (e) {
			e.preventDefault();
		}
		
	}
	if ($('.chip').length == 0) {
		$('.main-input .permission-btn, .note, .link-note')
				.hide();
		app.updateLinkTop();
	}
}

function removeChipNow(e) {
	$(e.currentTarget).parents('.chip').remove();
	app.updateLinkTop();
	app.updateShareStatus();
	if (!$('#contactInput').is(":focus")
			&& !$('#noteInput').is(":focus")) {
		$('#contactInput').focus();
		$('.main-input').addClass('focus');
		if (e) {
			e.preventDefault();
		}
		
	}
	if ($('.chip').length == 0) {
		$('.main-input .permission-btn, .note, .link-note')
				.hide();
		app.updateLinkTop();
	}
	setTimeout(function() {
		$('.contact-list-container').hide();
	}, 0);
}

App.prototype.addEvents = function() {
	var obj = this;

	$(document).on('click', '#contactList li', function() {
		var li = $(this);
		var contact = li.data();
		$('.contact-list-container').hide();
		$('#contactInput').val('').focus();
		setTimeout(function() {
			$('.main-input').addClass('focus');
		}, 100);
		obj.addChip(contact);
	});
	
	

	$(document).on(
			{
				click : function(e) {
					$('.chip.selected').removeClass('selected');
					$('.main-input').removeClass('focus');
				},
				keydown : function(e) {
					$('.suggested').hide();
					if (e.keyCode == 8) {
						removeChip(e);
					}
					console.log(e.keyCode);
					if (e.keyCode == 81) {
						sessionStorage.setItem('infoDialogShown', 'false');
					}
				}
			});

	$(document).on({
		click : function() {
			$('.contact-list-container').hide();
			$('.drop-menu').hide();
		}
	});

	$('.sharing-dialog').on('click', function() {

	});

	$('.main-input-container').on('click', function(e) {
		e.stopPropagation();
	});

	$('.note').on('click', function(e) {
		$('#noteInput').show();
	});

	$('#noteInput').on('click', function(e) {
		e.stopPropagation();
	});

	$('.main-input').on('click', function(e) {
		$('.contact-list-container').toggle();
		$('.main-input').addClass('focus');
		$('.input-info').hide();
		$('#contactInput').val('');
		$('.chip').removeClass('selected');
		$('#contactList li').removeClass('selected');
		$('#contactList li').show();
		obj.contactFocusTimeout = setTimeout(function() {
			$('#contactInput').focus()
		}, 100);
	});

	$('.contact-list-container').on({
		mouseover : function() {
			$('#contactList li').removeClass('selected');
		}
	});

	$('#contactInput').on({
		click : function(e) {
			$('.main-input').addClass('focus');
			
			e.stopPropagation();
		},
		mousedown : function(e) {
			$('.contact-list-container').toggle();
			$('.suggested').show();
			$('#contactList').scrollTop(0);
			$('#contactList li').show();
		},
		mouseup : function(e) {

		},
		keyup : function(e) {
			obj.matchChip($('#contactInput').val());
			$('#contactList li').removeClass('selected');
			$('#contactList li:visible:first').addClass('selected');
			if (obj.contactContainerHideTimeout) {
				clearTimeout(obj.contactContainerHideTimeout);
			}
			obj.contactContainerHideTimeout = setTimeout(function() {
				if ($('#contactList li:visible').length == 0) {
					$('.contact-list-container').hide();
				}
			}, 500);
		},
		keydown : function(e) {
			if (e.keyCode == 13) {
				var selectedLi = $('#contactList li.selected');
				var contact = selectedLi.data();
				if (contact == null) {
					var cInputVal = $('#contactInput').val();
					console.log(cInputVal);
					contact = {
						name : cInputVal,
						email : cInputVal,
						photo : ''
					}
				}
				obj.addChip(contact);
				$('.contact-list-container').hide();
				$('#contactInput').val('');
			} else if (e.keyCode == 8) {
				if ($('#contactInput').val() == '') {
					$('.chip:last').remove();
					obj.updateShareStatus();
				}
				if ($('.chip').length == 0) {
					$('.main-input .permission-btn, .note, .link-note').hide();
				}
			} else {
				$('.contact-list-container').show().scrollTop(0);
			}
			obj.updateLinkTop();
		}
	});

	$('.note').on({
		click : function() {
			$('#noteInput').focus();
		}
	});

	$('#noteInput').on({
		focus : function() {
			$('.note-info').hide();
			$('#noteInput').show();
		},
		blur : function() {
			if ($(this).val() == '') {
				$('.note-info').show();
				$('#noteInput').hide();
			}
		}
	});

	$('.permission-btn').on(
			'click',
			function(e) {
				var top = $(e.currentTarget).offset().top
						- $('.sharing-dialog').offset().top + 32;
				$('#editACL').css('top', top + 'px').toggle();

				var aclStr = $(this).find('.acl-btn-text').text().replace(
						/\s+/g, ' ');
				$('#editACL .check').removeClass('selected');
				var lis = $('#editACL li');
				for (var i = 0; i < lis.length; i++) {
					var liStr = $(lis[i]).text().replace(/\s+/g, ' ');
					if (liStr.indexOf(aclStr) != -1) {
						$(lis[i]).find('.check').addClass('selected');
					}
				}

				setTimeout(function() {
					if (obj.activePermissionBtn
							.hasClass('permission-btn-main-input')) {
						$('#reqAccessLi').hide();
					} else {
						$('#reqAccessLi').show();
					}
				}, 0);

				e.stopPropagation();
			});

	$('#permissionBtnMainInput').on('click', function() {
		obj.activePermissionBtn = $(this);
	});

	$('.drop-menu li').on('click', function(e) {
		var li = $(this);
		li.parents('.drop-menu').find('.check').removeClass('selected');
		li.find('.check').addClass('selected');
		li.parent().hide();
	});

	var aclBtnCollapseTimeout;
	var aclBtnText = $('.main-input .acl-btn-text');
	$('.permission-btn').on({
		mouseover : function() {
			if (aclBtnCollapseTimeout) {
				clearTimeout(aclBtnCollapseTimeout);
			}
			aclBtnCollapseTimeout = setTimeout(function() {
				aclBtnText.removeClass('collapse');
			}, 0);
		},
		mouseout : function() {
			if (aclBtnCollapseTimeout) {
				clearTimeout(aclBtnCollapseTimeout);
			}
			aclBtnCollapseTimeout = setTimeout(function() {
				aclBtnText.addClass('collapse');
			}, 1000);
		}
	});

	$('#editACL li').on(
			'click',
			function(e) {
				var str = $(this).text();
				var aclBtnText = obj.activePermissionBtn.find('.acl-btn-text');
				aclBtnText.text(str);
				aclBtnText.removeClass('long');
				$('#permissionBtnMainInput .icon').removeClass('edit')
						.removeClass('comment').removeClass('view');
				if (str.indexOf('Can view') != -1) {
					$('#permissionBtnMainInput .icon').addClass('view');
				} else if (str.indexOf('Can comment') != -1) {
					$('#permissionBtnMainInput .icon').addClass('comment');
					aclBtnText.addClass('long');
				} else if (str.indexOf('Can edit') != -1) {
					$('#permissionBtnMainInput .icon').addClass('edit');

				}

				aclBtnText.removeClass('collapse');
				if (aclBtnCollapseTimeout) {
					clearTimeout(aclBtnCollapseTimeout);
				}
				aclBtnCollapseTimeout = setTimeout(function() {
					aclBtnText.addClass('collapse');
				}, 1000);

				obj.updateShareStatus();
			});

	$('#shareInvokeArea, .main-share-btn').on('click', function(e) {
		$('.sharing-areas').toggle();
	});

	$('#shareBtn').on(
			'click',
			function(e) {
				if (!$(this).hasClass('disabled')) {
					$('.sharing-areas').hide();
					$('.chip').css('opacity', 0).css('width', 0).css(
							'overflow', 'hidden');
					$('.note').hide();
					obj.showSharedPeople();
					$('.shared-with').html('Shared via link and with ');

					// $('.link-control-container').removeClass('open');

					$('.notification .icon').removeClass('copy').addClass(
							'share-link2');

					var chips = $('.chip');
					var notifyStr = 'Shared with '
					if (chips.length == 1) {
						notifyStr += '1 person';
					}
					if (chips.length > 1) {
						notifyStr += chips.length + ' people';
					}
					notifyStr += ' and via the link';

					$('.notification .msg').text(notifyStr);

					setTimeout(function() {
						$('.notification').fadeIn();
					}, 500);
					setTimeout(function() {
						$('.notification').fadeOut();
					}, 2500);

				}
			});

	$('#doneBtn, #closeSharingDialog').on('click', function(e) {
		setTimeout(function() {
			$('.sharing-areas').hide();
		}, 0);
		e.stopPropagation();
	});
	
	$('#cancelBtn').on('click', function(e) {
		setTimeout(function() {
			$('.chip').addClass('selected');
			removeChip(e);
//			$('.shared-with')
//			.html(
//					'<strong>No link sharing</strong> - only invited people can access');
		}, 0);
		$('#doneBtnGroup').show();
		$('#sendBtnGroup').hide();
		e.stopPropagation();
	});
	
	

	$('#useLinkBtn').on('click', function(e) {
		if (!obj.useLink) {
			obj.showLink();
		} else {
			obj.hideLink();
		}
	});

	$('#turnLinkOff').on('click', function(e) {
		obj.useLink = false;
		obj.hideLink();
		obj.updateShareStatus();
	});

	$('.share-status').on('click', function() {
		obj.updateManageSharing();
	});

	$('.close').on('click', function() {
		$('.manage-sharing-dialog').hide();
		$('.sharing-areas').show();
		obj.updateShareStatus();
	});

	$(document).on('click', '.small-close', function() {
		var li = $(this).parents('li');
		var lis = $('.sharing-acls li');
		var n;
		for (var i = 0; i < lis.length; i++) {
			if (lis[i] == li[0]) {
				n = i - 2;
				$($('.main-input .chip')[n]).remove();
			}
		}
		li.remove();
		if ($('.main-input .chip').length == 0) {
			obj.makePrivate();
		}
	});

	$(document).on('click', '#manageSharingEditACL li', function() {
		var str = $(this).text();
		obj.activeLinkACL.find('.acl').text(str);
	});

	$(document).on(
			'click',
			'.manage-sharing-dialog li a',
			function(e) {
				var a = $(this);
				var newTop = a.offset().top
						- $('.manage-sharing-dialog').offset().top + a.height()
						+ 16;
				var newLeft = a.offset().left
						- $('.manage-sharing-dialog').offset().left - 1;
				$('#manageSharingEditACL').css('top', newTop).css('left',
						newLeft).toggle();
				obj.activeLinkACL = a;

				var aclStr = $(this).text().replace(/\s+/g, ' ');
				$('#manageSharingEditACL .check').removeClass('selected');
				var lis = $('#manageSharingEditACL li');
				for (var i = 0; i < lis.length; i++) {
					var liStr = $(lis[i]).text().replace(/\s+/g, ' ');
					if (liStr.indexOf(aclStr) != -1) {
						$(lis[i]).find('.check').addClass('selected');
					}
				}

				e.stopPropagation();
			});

	$('#manageSharingDocBtn').on('click', function() {
		$('.sharing-areas').show();
		$('.manage-sharing-dialog').hide();
		// $('.link-control-container').removeClass('open');
		obj.makePrivate();
	});

	$('.advanced.settings').on('click', function() {
		var li = $(this).parents('li');
		li.find('.gray-drop-down-icon').toggleClass('open');
		li.find('.options').toggleClass('open');
	});

	$('.link-control-container').on('click', function() {
		// $(this).toggleClass('open');

		// $('.shared-with').text('Anyone with the link can view');

	});

	$('.gray-area-permission-btn').on('click', function() {
		obj.activePermissionBtn = $(this);
	});

	$('#gotItBtn').on('click', function() {
		$('.easier-dialog').hide();
		$('.sharing-areas').show();
		
		$('.dd-topitem').removeClass('open');
		setTimeout(function() {
			$('.dd-topitem').addClass('open');
			setTimeout(function() {
				$('.dd-topitem').hide();
			}, 500);
			setTimeout(function() {
				$('.dd-topitem').show();
			}, 505);
		}, 1000);
		
	});

	$('#linkURL, .link-section').on('click', function(e) {
		e.stopPropagation();
	});

	$('.gray-link-area').on('click', function() {
		$('#linkSharingMenu').toggle();
	});

	var infoDialogShown = sessionStorage.getItem('infoDialogShown');
	if (infoDialogShown == 'true') {
		$('.easier-dialog').hide();
		$('.sharing-areas').show();
	} else {
		$('.easier-dialog').show();
	}

	$(
			'#linkSharingMenuNoLinkSharingItem, #linkSharingMenuCanViewItem, #linkSharingMenuCanCommentItem, #linkSharingMenuCanEditItem')
			.on(
					'click',
					function() {
						var str = $(this).html().replace(/\s{2,}/g, ' ')
								.replace(/^\s+|\s+$/g, '');
						$('.shared-with').html(str);
					});

	$('#linkSharingMenuNoLinkSharingItem').on('click', function() {
		$('.link-control-container').removeClass('open');
	});

	$('.copy-link').on('click', function() {
		$('.link-control-container').addClass('open');
		$('#linkURL').select();
		setTimeout(function() {
			$('.notification').fadeIn();
		}, 0);
		setTimeout(function() {
			$('.notification').fadeOut();
		}, 2000);
	});

	$('#linkSharingMenuMoreItem').on('click', function(e) {
		$('.advanced-sharing').removeClass('hide');
		$('#linkSharingMenuMoreItem').addClass('hide');
		$('#linkSharingMenu').show();
		e.stopPropagation();
	});

	$('.gray-link-area').on('click', function() {
		$('.advanced-sharing').addClass('hide');
		$('#linkSharingMenuMoreItem').removeClass('hide');
	});

	$('.advanced-sharing').on(
			'click',
			function() {
				var str = $(this).html().replace(/\s{2,}/g, ' ').replace(
						/^\s+|\s+$/g, '');
				$('.shared-with').html(str);
			});

	sessionStorage.setItem('infoDialogShown', 'true');

};

App.prototype.updateManageSharing = function() {
	var obj = this;
	// $('#linkACLText').text($('.link-section .gray-area-permission-btn
	// .acl-btn-text').text());
	$('.sharing-areas').hide();
	$('.manage-sharing-dialog').show();
	var ul = $('.manage-sharing-dialog .sharing-acls');
	$('.sharing-acls li:gt(1)').remove();

	var chips = $('.main-input .chip');
	$('#ownerTitle').text(obj.ownerName);
	$('#ownerPhoto').css('background-image',
			'url(/getphoto?url=' + obj.ownerPhotoURL + ')');

	var aclStr = $('.main-input .permission-btn .acl-btn-text').text();

	for (var i = 0; i < chips.length; i++) {
		var chip = $(chips[i]);
		var chipData = chip.data();
		var html = '<li class="person"><div class="acl-photo"></div><div class="item-content"><div class="title">'
				+ chipData.name
				+ '</div><div class="settings">'
				+ chipData.email
				+ '</div></div><a href="#"><span class="acl">Can edit</span><span class="drop-down-icon"></span></a><div class="small-close"></div></li>';
		var li = $(html);
		li.find('.acl').text(aclStr);
		if (chipData.photo != '') {
			li.find('.acl-photo').css('background-image',
					'url(/getphoto?url=' + chipData.photo + ')');
		}
		ul.append(li);
	}
};

App.prototype.makePrivate = function() {
	var obj = this;
	$('.main-input .chip').remove();
	$('.sharing-acls li:gt(1)').remove();
	$('.main-input .permission-btn, .note, .link-note').hide();

	obj.updateShareStatus();
	obj.updateLinkTop();
	$('.shared-with')
			.html(
					'<strong>No link sharing</strong> - only invited people can access');
};

App.prototype.showSharedPeople = function() {
	var isDocs = getURLParam('docs');
	var isProjector = getURLParam('projector');
	var isRight = getURLParam('showright');

	if (isRight == 'true') {
		var sharedPeopleArea = $('.shared-people-area');
		sharedPeopleArea.html('');
		var chips = $('.main-input .chip');

		for (var i = 0; i < chips.length; i++) {
			var person = $('<div class="person"></div>');
			var chipData = $(chips[i]).data();
			person.css('background-image', 'url(/getphoto?url='
					+ chipData.photo + ')');
			person.hide();
			sharedPeopleArea.append(person);
			person.fadeIn();
		}

		var icon = $('.share-status .icon').clone();
		icon.css('left', '5px');
		icon.css('top', '4px');
		var statusIcon = $('<div class="person"></div>');
		statusIcon.css('background-image', 'none');
		// statusIcon.css('background-color', '#8f8f8f');
		// statusIcon.css('-webkit-filter', 'invert(100%)');
		statusIcon.append(icon);
		sharedPeopleArea.append(statusIcon);

	}

};

App.prototype.updateLinkTop = function() {
	var sharingDialog = $('.sharing-dialog');
	var newTop = sharingDialog[0].offsetTop + sharingDialog.height() + 60;
	$('.link-area').css('top', newTop);
};

App.prototype.showLink = function() {
	var obj = this;
	obj.useLink = true;
	$('.link-area-shadow').show();
	var sharingDialog = $('.sharing-dialog');

	var firstTop = sharingDialog[0].offsetTop;
	$('.link-area').css('top', firstTop);

	var newTop = sharingDialog[0].offsetTop + sharingDialog.height() + 60;
	$('.link-area').animate({
		top : newTop,
		opacity : 1
	}, 500, function() {
		$('#linkURL').focus();
	});

	setTimeout(function() {
		$('.icon.share-link').show();
	}, 100);

	obj.updateShareStatus();
};

App.prototype.hideLink = function() {
	var obj = this;
	obj.useLink = false;
	var sharingDialog = $('.sharing-dialog');
	var newTop = sharingDialog[0].offsetTop;
	$('.link-area').animate({
		top : newTop,
		opacity : 0
	}, 500, function() {
		$('.link-area-shadow').hide();
	});

	obj.updateShareStatus();
};

App.prototype.init = function() {
	$('.contact-list-container, .main-input .permission-btn').hide();
	// $('.sharing-areas').hide();

	var isDocs = getURLParam('docs');
	if (isDocs == 'true') {
		$('.sharing-dialog').css('left', 'auto').css('right', '50px').css(
				'top', '60px');
		$('.link-area').css('left', 'auto').css('right', '50px').css('top',
				'60px');
		$('.sharing-dialog .arrow').addClass('right-arrow');
	}

	var isProjector = getURLParam('projector');
	if (isProjector == 'true') {
		$('.sharing-dialog').css('left', 'auto').css('right', '50px').css(
				'top', 'auto').css('bottom', '240px');
		$('.link-area').css('left', 'auto').css('right', '50px').css('top',
				'auto').css('bottom', '240px');
		$('.sharing-dialog .arrow').hide();
	}

	var isRight = getURLParam('showright');
	
	isRight = 'true';
	
	if (isRight == 'true') {
		$('.sharing-dialog').css('left', 'auto').css('right', '50px').css('top',
		'70px');
		$('.link-area').css('left', 'auto').css('right', '50px').css('top',
		'70px');
		$('.sharing-dialog .arrow').addClass('right-arrow');
		//$('.sharing-dialog .arrow').hide();
	}

	$('.sharing-areas').hide();
	
	setTimeout(function() {
		$('.dd-topitem').addClass('open');
		setTimeout(function() {
			$('.dd-topitem').hide();
		}, 500);
		setTimeout(function() {
			$('.dd-topitem').show();
		}, 505);
	}, 1000);

};

var app = new App();
app.getContacts();
app.init();
app.addEvents();