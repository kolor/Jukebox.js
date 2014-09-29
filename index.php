<!doctype html>
<html>
<head>
	<meta name="google-site-verification" content="KQXrCf2Y3jmhqDlbH0xQ7MK6xoI5y80qnMAtNsR1MyY" />
	<link rel="stylesheet" href="http://cdn.apps.dj/reset.css">
	<link rel="stylesheet" href="http://cdn.apps.dj/jgrowl.css">
	<link rel="stylesheet" href="assets/jplayer/jplayer.css">
	<link rel="stylesheet" href="assets/ui/ui.css">
	<link rel="stylesheet" href="assets/structure.css">
	<link rel="stylesheet" href="assets/widgets.css">
	<link rel="shortcut icon" href="assets/img/favicon.png"/> 
	<title>Music Box</title>
	<script src="http://cdn.apps.dj/jquery.js"></script>
	<script src="http://cdn.apps.dj/jgrowl.js"></script>
	<script src="http://cdn.apps.dj/tinyscrollbar.js"></script>
	<script src="http://vkontakte.ru/js/api/openapi.js"></script>
	<script src="assets/php.js"></script>
	<script src="assets/jplayer/jplayer.js"></script>
	<script src="assets/ui/ui.js"></script>
</head>

<body>
	<div id="header" class="wrap">
		<div class="list-select">Select List</div>
		<div class="lists"></div>
		<div class="menu-open">Operations</div>
		<div class="preferences">
			<a href="#" rel="login">Login</a>
			<a href="#" rel="logout">Logout</a>
			<a href="#" rel="add">Create</a>
			<a href="#" rel="delete">Delete</a>
			<a href="#" rel="rename">Rename</a>
			<a href="#" rel="load">Load</a>
			<a href="#" rel="save">Save</a>			
		</div>
	</div>
	
	<div id="container" class="wrap">
		<div id="player">
			<div id="jp"></div>
			<div class="jp-player">
				<div id="jp-interface">
					<ul class="jp-controls">
						<li><a href="#" class="jp-play" tabindex="1">play</a></li>
						<li><a href="#" class="jp-pause" tabindex="1">pause</a></li>
						<li><a href="#" class="jp-stop" tabindex="1">stop</a></li>
						<li><a href="#" class="jp-next" tabindex="1">stop</a></li>
						<li><a href="#" class="jp-mute" tabindex="1">min volume</a></li>
						<li><a href="#" class="jp-unmute" tabindex="1">max volume</a></li>
					</ul>
					<div class="jp-current-time"></div>
					<div class="jp-progress">
						<div id="jplayer_load_bar" class="jp-seek-bar">
							<div id="jplayer_play_bar" class="jp-play-bar"></div>
						</div>
					</div>
					<div class="jp-duration"></div>
					<div id="jplayer_volume_bar" class="jp-volume-bar">
						<div id="jplayer_volume_bar_value" class="jp-volume-bar-value"></div>
					</div>
				</div>
			</div>
		</div>
		
		<div id="playlist" class="hide">
			<div class="library">
				<div class="tools"><span class="music" title="Music library">E</span><span class="search" title="Find artists">f</span><span class="similar" title="Similar artists">u</span><span class="save" title="Save playlist">d</span></div>
				<div class="searchbox">
					<input type="text" placeholder="filter artists" class="find">
				</div>
				<div id="scrollbar2">
					<div class="scrollbar disable"><div class="track"><div class="thumb"><div class="end"></div></div></div></div>
					<div class="viewport">
						<div class="overview">
							<div class="artists"></div>
						</div>					
					</div>
				</div>
			</div>
			
			<div class="actions"><span class="lastfm" title="Last.fm tracks">,</span><span class="playlist" title="Playlist tracks">.</span></div>
			
			<div id="scrollbar1">
				<div class="scrollbar disable"><div class="track"><div class="thumb"><div class="end"></div></div></div></div>
				<div class="viewport">
					<div class="overview">
						<div class="tracks"></div>									 
					</div>
				</div>
			</div>		
			
		</div>
	
	</div>
<div class="hide">
	<div id="dialog"></div>
	<div id="dialog-confirm"></div>
	<iframe id="downloader"></iframe>
</div>
<script src="assets/helpers.js"></script>
<script src="assets/classes.js"></script>
<script src="assets/interface.js"></script>
</body>
</html>