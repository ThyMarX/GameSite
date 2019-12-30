<?php
	require('config/config.php');
    require('config/db.php');

    $systemMessage = "";

    $issame = false;
    $isunique = true; 
    
    if(isset($_POST['btn'])){ 
        $username = mysqli_real_escape_string($conn, $_POST ['username']);
        $password1 = mysqli_real_escape_string($conn, $_POST ['password1']);
        $password2 = mysqli_real_escape_string($conn, $_POST ['password2']);

        if ($password1 == $password2){
            $issame = true;
        } else {
            print_r("The passwords must match");
        }

        $sql = "SELECT * FROM users WHERE username = '$username'";
        $result = mysqli_query($conn, $sql) or die ("Query virker slet ikke!: " . $sql);

        if(mysqli_num_rows($result)){
            $isunique = false;
            $systemMessage = "Your username is already in use";
        }
        
        if ($issame == true AND $isunique == true){
            /*
            $salt = "sdf1829yoi dy8t34 ou98erjiguweif09df" . $password1 . "s8f sd98798s7d9c709sa7d0f an9dfn8c7sd9";
            $hashed = hash("sha512", $salt);
            */

            session_start();
            $_SESSION['username'] = $username;
            $_SESSION['password'] = /*$hashed*/ $password1;
            $_SESSION['adgangInfo'] = "adgangInfo";
            header('location:profile.php');
        }
    }
?>

<?php include('inc/header.php'); ?>
	<div class="container">
    	<h1>Register</h1>

        <!-- <form  onSubmit="return checkform();" id="checkform"> -->
        <form method="POST" onSubmit="return checkform();" id="checkform">
            <label for="username">Username</label>
            <input type="text" name="username" id="username">
            <label for="password">Password</label>
            <input type="password" name="password1" id="password1">
            <label for="password">Repeat Password</label>
            <input type="password" name="password2" id="password2">
            <button type="submit" name="btn">Next</button>
        </form>
    
        <h3 id="systemMessage">
            <?= $systemMessage ?>
        </h3>
	</div>
<?php include('inc/footer.php'); ?>