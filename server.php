<?php

call_user_func($_GET['do']);

function saveList() {
	$str = serialize($_POST);
	$name = $_POST['list_name'];
	$handle = fopen('/home/kolor/public_html/apps/jukebox/lists/'.$name,"w");
	if ($handle) {
		fwrite($handle, $str);
		echo 'OK';
	}
}

function getLists() {
	$lists = scandir('/home/kolor/public_html/apps/jukebox/lists/');
	echo json_encode($lists);
}

function loadList() {
	$id = $_POST['id'];
	$str = file_get_contents('lists/'.$id);
	echo json_encode(unserialize($str));
}



?>