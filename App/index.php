<?php

ini_set('display_errors', 1);
ini_set('log_errors', 1);
//~ ini_set('error_log', dirname(__file__) . '/log_error_php.txt');
ini_set('allow_url_fopen',true);

error_reporting(E_ALL & ~E_NOTICE);

require 'autoload.php';
$db = DBFactory::getMysqlConnexionWithPDO();

if (!empty($_SERVER['HTTP_CLIENT_IP']))$ip = $_SERVER['HTTP_CLIENT_IP'];
elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR']))$ip = $_SERVER['HTTP_X_FORWARDED_FOR'];
else $ip = $_SERVER['REMOTE_ADDR'];
$u=utf8_encode($_SERVER['HTTP_USER_AGENT']);


if(isset($_GET['u']) xor isset($_GET['un'])){
	$manager = new UserManagerPDO($db);
}elseif(isset($_GET['b'])){
	$manager = new BandesManagerPDO($db);
}elseif(isset($_GET['d'])){
	$manager = new DepartementsManagerPDO($db);
}
if(isset($_GET['m'])){
	$d = $manager->getUnique((int) $_GET['m']);
	if(isset($_GET['un'])){
		$d = $manager->getUnique($ip.$u);
	}
}
if(isset($_GET['s'])){
	$manager->delete((int) $_GET['s']);
	if(isset($_GET['un'])){
		$manager->delete($ip.$u);
	}
}

//~ session_start();
//~ $token = bin2hex(random_bytes(32));
//~ $_SESSION["token"] = $token;

//~ if (!isset($_POST["token"]) || !hash_equals($_SESSION["token"], $_POST["token"])) {
		//~ header('Location: https://boquette.fr');
		//~ exit;
//~ }

function cors() {
    
    // Allow from any origin
    echo $_SERVER['HTTP_ORIGIN'];
    if (isset($_SERVER['HTTP_ORIGIN'])) {
        // Decide if the origin in $_SERVER['HTTP_ORIGIN'] is one
        // you want to allow, and if so:
        header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
        header('Access-Control-Allow-Credentials: true');
        header('Access-Control-Max-Age: 86400');    // cache for 1 day
    }
    
    // Access-Control headers are received during OPTIONS requests
    if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
        
        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
            // may also be using PUT, PATCH, HEAD etc
            header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
        
        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
            header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");
    
        exit(0);
    }
    
    echo "You have CORS!";
}

cors();
echo  "<br>";
echo  "<br>";
foreach($GLOBALS as $g=>$w){
	print_r($g);
	echo  "<br>";
	print_r($w);
	echo  "<br>";
	echo  "<br>";
}
foreach($_SERVER as $s=>$a){
	echo $s;
	echo  "<br>";
	echo $a;
	echo  "<br>";
	echo  "<br>";
}
//~ header("Content-Type: application/json");
$str_json = json_decode(file_get_contents('php://input'),True);

if(isset($str_json)){
	if(isset($_GET['un'])){
        $d = new User([
			'ip_u' => $ip.$u,
			'id_dep' => $str_json['id_dep']
        ]);
	}
	elseif(isset($_GET['b'])){
        $d = new Bandes([
			'nom' => $str_json['nom'],
			'couleur' => $str_json['couleur']
        ]);
	}
	elseif(isset($_GET['d'])){
        $d = new Departements([
			'id_bande' => $str_json['id_bande'],
			'id_dep' => $str_json['id_dep']
        ]);
	}
	if(isset($_GET['m'])){
			$d->setId($_GET['m']);
	}
	if($d->isValid()){
			$manager->save($d);
	}
}
$liste = $manager->getList();
if($liste!=[]){
	$l=[];
	$i=0;
	foreach($liste as $d){
		if(isset($_GET['u'])){
			$l[$i]=['id_dep'=>(int) $d->id_dep()];
		}
		elseif(isset($_GET['b'])){
			$l[$i]=['nom'=>$d->nom(),'couleur'=>$d->couleur(),'id'=>(int) $d->id()];
		}
		elseif(isset($_GET['d'])){
			$l[$i]=['id_dep'=>(int) $d->id_dep(),'id_bande'=>(int) $d->id_bande()];
		}                
		$i++;
	}
	if(isset($_GET['un'])){
		$d=$manager->getUnique($ip.$u);
		if($d){
			$l=['id_dep'=>(int) $d->id_dep()];
		}
	}
	echo json_encode($l);
}
