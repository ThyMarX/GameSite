<?php
	require('config/config.php');
    require('config/db.php');

    session_start();

	$extraInfo = "";

	if (isset($_SESSION['adgangInfo'])) {
        $extraInfo = '
            <label for="firstname">Firstname</label>
            <input type="text" name="firstname" id="firstname">
            <label for="lastname">Lastname</label>
            <input type="text" name="lastname" id="lastname">
            <label for="email">Email</label>
            <input type="email" name="email" id="email">
            <label for="streetname">Streetname</label>
            <input type="text" name="streetname" id="streetname">
            <label for="postalcode">Postalcode</label>
            <input type="text" name="postalcode" id="postalcode">
            <label for="city">City</label>
            <input type="text" name="city" id="city">
            <button name="btn">Register</button>';
	} else {
        $extraInfo = "Fuck af!";
        header('location:register.php');
    }
    
    if(isset($_POST['btn'])){
        $username = $_SESSION['username'];
        $password = $_SESSION['password'];
        $firstname = mysqli_real_escape_string($conn, $_POST ['firstname']);
        $lastname = mysqli_real_escape_string($conn, $_POST ['lastname']);
        $email = mysqli_real_escape_string($conn, $_POST ['email']);
        $streetname = mysqli_real_escape_string($conn, $_POST ['streetname']);
        $postalcode = mysqli_real_escape_string($conn, $_POST ['postalcode']);
        $city = mysqli_real_escape_string($conn, $_POST ['city']);

        $sql = "INSERT INTO users(username, password, firstname, lastname, email, streetname, postalcode, city) values('$username', '$password', '$firstname', '$lastname', '$email', '$streetname', '$postalcode', '$city')";
        $result = mysqli_query($conn, $sql) or die ("Query virker overhovedt ikke!");
        
        /*
        $alertMessage = "Your account was successfully created";
        echo $alert;
        */
        
        header('location:login.php');
    }

?>

<?php include('inc/header.php'); ?>
	<div class="container">
    	<h1>Extra information</h1>
        
        <form method="POST" onSubmit="return updateform();" id="updateform">
            <?= $extraInfo ?>
        </form>
	</div>
<?php include('inc/footer.php'); ?>