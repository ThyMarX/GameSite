<?php
	require('config/config.php');
	require('config/db.php');

	session_start();

	$connection = false;

	if (isset($_SESSION['adgangSpil'])) {
		$connection = true;
	} else {
		$connection = false;
	}
?>


<?php include('inc/header.php'); ?>
	<div class="container">
		<?php if ($connection = true){
			echo '
				<center>
					<canvas id="canvas" width="500" height="500"></canvas> <br>
					<select name="lvl" id="lvl">
						<option value="1">1</option>
						<option value="2">2</option>
					</select>
					<button id="create">Create map</button> <br>
					<button id="reset">Reset</button>
					<div> Score =  </div> <div id=score>1000</div>

				</center>';
		} else {
			echo "Du er ikke logget ind din";
		}?>
	</div>
<?php include('inc/footer.php'); ?>