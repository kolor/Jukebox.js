<?php

call_user_func($_GET['do']);

function saveList() {
	$str = serialize($_POST);
	$name = $_POST['list_name'];
	$handle = fopen('/var/www/apps/jukbox/lists/'.$name,"w");
	if ($handle) {
		fwrite($handle, $str);
		echo 'OK';
	} else {
		echo 'FAIL';
	}
}

function getLists() {
	$lists = scandir('/var/www/apps/jukbox/lists/');
	echo json_encode($lists);
}

function loadList() {
	$id = $_POST['id'];
	$str = file_get_contents('lists/'.$id);
	echo json_encode(unserialize($str));
}



?>
