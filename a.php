<form method="post" action="a.php">
	<input type="text" name="pwd" id="pwd"/>
	<input type="submit" value="envoyer"/>
</form>
<?php
if(isset($_POST['pwd'])){
	$options = [
		'cost' => 12,
	];
	$pwd = 'manger';
	$pwd_c = '$2y$12$7.74oi2u9Um7As3acRI.guVL3Mz8.dFv3jXFR9M0Z25OxhB9XRnD2';
	$a = password_hash($_POST['pwd'], PASSWORD_BCRYPT, $options);
	$b = password_hash($pwd, PASSWORD_BCRYPT, $options);
	$c = password_verify($_POST['pwd'],$pwd_c);
	echo "<br>";
	echo $a;
	echo "<br>";
	echo $b;
	echo "<br>";
	print_r($c);
}
