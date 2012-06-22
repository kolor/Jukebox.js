$(function(){
	dlg = $('#dialog').dialog({autoOpen:false});

	$("#jp").jPlayer({volume: 0.6,	swfPath: 'http://cdn.airy.me', cssSelectorAncestor: "#jp-interface"});
	
	$("#jp").bind($.jPlayer.event.ended, function(e){
		$('.tracks .active').next().click();
	});
	
	$('#player .jp-next').click(function(e){
		$('.tracks .active').next().click();
		e.preventDefault();
	});
	
	$('.menu-open').click(function(){
		$('.preferences').slideToggle('slow');
	});
	
	$('.preferences a').click(function(e){
		switch(this.rel) {
			case 'login': VK.Auth.login(null, VK.access.AUDIO); break;
			case 'logout': localStorage.setItem('user',''); location.reload(true); break;
			case 'add': addList(); break;
			case 'delete': deleteList(); break;
			case 'rename': renameList(); break;
			case 'load': loadMusic(); break;
			case 'save': saveMusic(); break;
		}
		$(this).parent().hide();
		e.preventDefault();
	});
	
	$('.list-select').click(function(){
		$('.lists').slideToggle('slow');
	});
	
	$('.lists a').live('click', function(e){
		var id = $(this).data('id');
		MB.select(id);
		$('.lists').hide();		
		e.preventDefault();			
	});
	
	$('.library .artists a').live('click', function(e){
		if ($(e.target).is('.delete')) return;
		$('.library .artists a').removeClass('active');
		$(this).addClass('active');
		$('.tracks').empty();
		var id = $(this).attr('rel');
		MB.artist = id;
		if ($(this).parent().hasClass('live'))
			LAST.getTopTracks(id);	
		else
			MB.renderTracks(id);
		e.preventDefault();
	});
	
	$('.library .artists a .delete').live('click', function(e){
		var art = $(this).parent().attr('rel');
		MB.delArtist(art);
		$(this).parent().remove();
		e.preventDefault();
	});
	
	
	
	$('.library .tools .search').click(function(e){
		var sel = $('.library .searchbox .find').val();
		if (sel != '')
			LAST.findArtists(sel);
			
		var timeout = null;
		$('.library .searchbox .find').attr('placeholder','find artist').unbind('keyup').keyup(function(event){
			clearTimeout(timeout);
			if (event.keyCode == '13')
				LAST.findArtists($(this).val());
			else
				timeout = setTimeout(LAST.findArtists, 400, $(this).val());
		});
	});
	
	$('.library .tools .similar').click(function(e){
		var sel = $('.library .searchbox .find').val();
		if (sel != '')
			LAST.findSimilar(sel);
		else {
			sel = $('.library .artists .active').attr('rel');
			$('.library .searchbox .find').attr('value', sel);
			if (sel != '')
				LAST.findSimilar(sel);
		}
		
		var timeout = null;
		$('.library .searchbox .find').attr('placeholder','find similar').unbind('keyup').keyup(function(event){
			clearTimeout(timeout);
			if (event.keyCode == '13')
				LAST.findSimilar($(this).val());
			else
				timeout = setTimeout(LAST.findSimilar, 400, $(this).val());
		});
	});
	
	$('.library .tools .save').click(function(e){
		MB.saveLocal();
	});
	
	$('.library .tools .music').click(function(e){
		MB.renderArtists(this.current);
		$('.library .searchbox .find').attr('placeholder','filter artists').unbind('keyup').keyup(function(event){
			filter($(this).val());
		});
		e.preventDefault();		
	});
	
	
	$('.actions .lastfm').click(function(e){
		var a = MB.artist;
		LAST.getTopTracks(a);
		e.preventDefault();
	});
	
	$('.actions .playlist').click(function(e){
		var a = MB.artist;
		MB.renderTracks(a);
		e.preventDefault();
	});
	
	
	
	$(".tracks a").live('click',function(e){
		if ($(e.target).is('span')) return;
		if (typeof $(this).attr('data-source') != 'undefined' && $(this).attr('data-source') != '') {
		  	if (e.altKey != true) {
				$('.tracks a').removeClass('active');
				$(this).addClass('active');
				var file = $(this).attr('data-source');
				//MB.addSource($(this).data('artist'), $(this).data('title'), $(this).data('source'), $(this).find('.info').text());
				$("#jp").jPlayer("setMedia", {mp3:file}).jPlayer("play");
				e.preventDefault();
			}
		} else {	
			DL.getFiles($(this));
			e.preventDefault();
		}
	});
	
	$('.tracks a .delete').live('click',function(e){
		var row = $(this).parent();
		MB.delTrack(row);
		if (row.hasClass('active')) row.next().click();
		row.remove();
		e.preventDefault();
	});
	
	$('.tracks a .add').live('click', function(e){
		MB.addTrack(MB.artist, $(this).parent().attr('data-title'));
		$(this).removeClass('add').text('y');
		e.preventDefault();
	});
	
	if (!localStorage.getItem('user')) {
		dlg.html('<h3>Provide your nickname</h3><input type="text"> <button class="blue">Save</button>').dialog('option',{width: 280}).dialog('open');
		dlg.find('button').click(function(){
			var nick = dlg.find('input').val().replace(/ /g,'-');
			localStorage.setItem('user',nick);
			MB.user = nick;
			dlg.dialog('close');
		});
	}
	
	// init scrollbars
	window.sbar = $('#scrollbar1');
	sbar.tinyscrollbar();
	window.lbar = $('#scrollbar2');
	lbar.tinyscrollbar();
	
	startVK();
	MB.init();

	lbar.update();
	sbar.update();
	
	if (location.hash.length > 0) {
		autosave = setInterval(function(){
			MB.saveLocal();
		}, 240000);
	}
	
	$('.library .searchbox .find').attr('placeholder','filter artists').unbind('keyup').keyup(function(event){
		filter($(this).val());
	});
	
});

function filter(arg) {
	if (arg == '')
		$('.library .artists a').show();
	else {
		$('.library .artists a').hide();
		$('.library .artists a[rel^="'+arg+'"]').show();
	}
	
	
}

function startVK() {
	VK.init({apiId:1902594, nameTransportPath: '/xd_receiver.html', status: true});
	VK.Api.call('audio.search', {q: 'spor', sort: 0, count: 10, offset: 0, v: 3, test_mode: 1}, function(r){
	if (typeof r.error != 'undefined' && r.error.error_code == 7)
		VK.Auth.login(null, VK.access.AUDIO);
	});
}

function addList() {
	dlg.html('<div id="addList"><h3>Playlist name</h3><input type="text"><div class="btns"><button class="blue">Create</button></div></div>').dialog('option', {title:"Create List", width: 300}).dialog('open');
	$('#dialog button').click(function(){
		var name = $('#dialog input').val();
		var list = MB.add(name);
		dlg.dialog('close');
	});
	
}

function deleteList() {
	if (MB.current == null) return;
	$("#dialog-confirm").html('<div id="delList">Are you sure want to delete this playlist?</div>').dialog({resizable: false,	height:120, width: 300,	modal: true,
		buttons: {
			"Delete": function() {
				$(this).dialog("close");
				MB.remove(MB.current);
			},
			Cancel: function() {
				$(this).dialog("close");
			}
		}
	});
}

function renameList() {
	dlg.html('<div id="renList"><h3>New playlist name</h3><input type="text"><div class="btns"><button class="blue">Rename</button></div></div>').dialog('option', {title:"Rename List", width: 300}).dialog('open');
	$('#dialog button').click(function(){
		var name = $('#dialog input').val();
		MB.rename(MB.current, name);
		$('.list-select').text(name);
		dlg.dialog('close');
	});
	
}

function loadMusic() {
	dlg.html('<div id="loadMusic"><h3>Select where load music from:</h3>\
					 <button class="blue" rel="server">Server</button>\
					 <button class="blue" rel="text">Text</button>\
					 <button class="blue" rel="file">File *</button>\
					 <p>* requires HTML5 File API</p></div>').dialog('option',{title:"Load Music", width: 300}).dialog('open');
	$('#dialog button').click(function(e){
		switch($(this).attr('rel')) {
			case 'file':
				dlg.html('<div id="fileUpload"><h3>Drag file into area below</h3><textarea></textarea></div>');
				$('#fileUpload textarea').bind({
					dragenter: function(){$(this).addClass('highlighted'); return false;},
					dragover: function(){return false;},
					dragleave: function(){$(this).removeClass('highlighted');	return false;}, 
					drop: function(e) {
						var dt = e.originalEvent.dataTransfer;
						if (dt.files[0].type == 'text/plain') {
							var reader = new FileReader();
							reader.onload = function(e) {
								var str = e.target.result;
								$('#fileUpload .btns').remove();
								$('#fileUpload textarea').text(str).after('<div class="btns"><button class="blue">Process</button></div>');
								$('#fileUpload button').click(function(){
									MB.loadText($('#fileUpload textarea').val());
									dlg.dialog('close');
								});
							}
							reader.readAsText(dt.files[0]);	
						}
						return false;      
					}
				});
			break;
			case 'system': break;
			case 'text':
				$('#loadMusic').html('<h3>Paste tracklist below</h3><textarea></textarea><div class="btns"><button class="blue">Process</button></div>');
				$('#loadMusic button').click(function(){
					MB.loadText($('#loadMusic textarea').val());
					dlg.dialog('close');
				});
			break;
			case 'server':
				MB.loadServer(dlg);
			break;
		}
	});
}

function saveMusic() {
	MB.saveServer();
}

function saveMusicDialog() {
	dlg.html('<div id="saveMusic"><h3>Select where to save music:</h3>\
					 <button class="blue" rel="browser">Browser *</button>\
					 <button class="blue" rel="server">Server</button>\
					 <button class="blue" rel="file">File *</button>\
					 <p>* requires HTML5 File & Offline API</p></div>').dialog('option',{title:"Save Music", width: 346}).dialog('open');
	$('#dialog button').click(function(){
		switch($(this).attr('rel')) {
			case 'file': break;
			case 'browser': MB.saveLocal(); break;
			case 'db': break;
			case 'server': MB.saveServer(); break;
		}
		dlg.dialog('close');
	});
}