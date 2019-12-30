<?php
	require('config/config.php');
	require('config/db.php');

	session_start();

	session_destroy();

	header("location:index.php");
?>

<?php include('inc/header.php'); ?>
<?php include('inc/footer.php'); ?>