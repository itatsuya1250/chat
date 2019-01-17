$(function () {
	var socket = io();
	var userId;

	$('form').submit(function (e) {
		e.preventDefault(); // prevents page reloading
		return false;
	});

	$('#bt_comment').on('click', function () {
		var msg = $('#comment').val();
		if (msg !== '') {
			var obj = new Object();
			obj.msg = msg;
			obj.user = userId;
			socket.emit('chat message', obj);
			$('#comment').val('');
		}
	});

	socket.on('chat message', function (obj) {
		if (obj.user === userId) {
			viewOwnMessage(obj);
		} else {
			viewOtherMessage(obj);
		}
		moveScrollEnd();
	});

	$.ajax({
		type: 'POST',
		url: 'https://itatsuya1250-chat.glitch.me',
		data: { command: 'getUserId' },
		success: function (data, textStatus) {
			if (textStatus === 'success' && data.userId !== undefined) {
				userId = data.userId;
			} else {
				alert('ユーザ名取得エラー');
			}
		},
		dataType: 'json'
	});

	$("#chat_container").resizable({
		autoHide: true,
		minHeight: $('#chat_container').height(),
		minWidth: $('#chat_container').width()
	});

	$(window).on('load resize', function () {
		var conteiner = $('#chat_container').height();
		var title = $('#chat_title').height();
		var form = $('#chat_form').height();
		$('#chat_contents').height(conteiner - (title + form) - 50);
	});

	$(window).on('load', function () {
		$('body').css('visibility', 'visible');
	});

	function escapeHTML(str) {
		return str.replace(/&/g, '&amp;')
			.replace(/</g, '&lt;')
			.replace(/>/g, '&gt;')
			.replace(/"/g, '&quot;')
			.replace(/'/g, '&#039;');
	}

	function viewOwnMessage(obj) {
		var msg = obj.msg;
		var date = obj.date !== undefined ? obj.date : '';
		var read = obj.read !== undefined ? obj.read : false;
		var tmpMsg = escapeHTML(msg).replace(/\r?\n/g, '<br>');
		var msgTag = $('<div>', { class: 'chat_right' })
			.append($('<div>', { class: 'info' })
				.append($('<div>', { class: 'read', text: read ? '既読' : '' }))
				.append($('<div>', { class: 'date', text: date })))
			.append($('<div>', { class: 'text', html: tmpMsg }));
		console.log(msgTag);
		$('#chat_contents').append(msgTag);
	}

	function viewOtherMessage(obj) {
		var msg = obj.msg;
		var user = obj.user;
		var date = obj.date !== undefined ? obj.date : '';
		var read = obj.read !== undefined ? obj.read : false;
		var tmpMsg = escapeHTML(msg).replace(/\r?\n/g, '<br>');
		var msgTag = $('<div>', { class: 'chat_left' })
			.append($('<div>', { class: 'name', text: user }))
			.append($('<div>', { class: 'text', html: tmpMsg }))
			.append($('<div>', { class: 'info' })
				.append($('<div>', { class: 'read', text: read ? '既読' : '' }))
				.append($('<div>', { class: 'date', text: date })));
		console.log(msgTag);
		$('#chat_contents').append(msgTag);
	}

	function moveScrollEnd() {
		$('#chat_contents').animate({ scrollTop: $('#chat_contents')[0].scrollHeight }, 'fast');
	}
});

