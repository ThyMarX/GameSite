<?php 
	require('config/config.php');
	require('config/db.php');

    $output = "";

    if(isset($_POST['btn'])){
        $password = mysqli_real_escape_string($conn, $_POST ['password']);
        $username = mysqli_real_escape_string($conn, $_POST ['username']);

        $salt = "sdf1829yoi dy8t34 ou98erjiguweif09df" . $password . "s8f sd98798s7d9c709sa7d0f an9dfn8c7sd9";
        $hashed = hash("sha512", $salt);

        // Create Query 
        $sql = "SELECT * FROM users WHERE username = '$username' AND password = '$password'";

        // Get Result
        $result = mysqli_query($conn, $sql) or die ("Query virker ikke!: " . $sql);

        if (mysqli_num_rows($result) == 1){
            session_start();

            $_SESSION['adgangSpil'] = "adgangSpil";

            header("location:games.php");

            $output = "Du er logget ind";
        } else {
            $output = "Login fejlede, forkert login eller password";
        }
    }
?>


<?php include('inc/header.php'); ?>
	<div class="container">
    	<h1>Login</h1>
        
        <form method="POST">
            <label for="username">Username</label>
            <input type="text" name="username">
            <label for="password">Password</label>
            <input type="text" name="password">
            <button type="submit" name="btn">Log in</button>
        </form>

        <h3><?= $output;?></h3> <!-- "?=" er det samme som "?php echo"  -->
	</div>
<?php include('inc/footer.php'); ?>