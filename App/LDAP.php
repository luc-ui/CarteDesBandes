<?php
ini_set('display_errors', 1);
ini_set('log_errors', 1);
ini_set('error_log', dirname(__file__) . '/log_error_php.txt');
ini_set('allow_url_fopen',true);

error_reporting(E_ALL & ~E_NOTICE);
date_default_timezone_set('Europe/Paris');

$ldaprdn   = 'cn=admin,dc=boquette,dc=fr';
$ldappass= 'boquette1815';



// using ldap bind

// connect to ldap server
$ldapconn = ldap_connect('ldap://10.1.0.4') or die("Could not connect to LDAP server.");

ldap_set_option($ldapconn, LDAP_OPT_PROTOCOL_VERSION, 3);
ldap_set_option($ldapconn, LDAP_OPT_REFERRALS, 0);

if ($ldapconn) {

    // binding to ldap server
    $ldapbind = ldap_bind($ldapconn, $ldaprdn, $ldappass);

	
    // verify binding
    if ($ldapbind) {
		
		$user_to_search = 'lucas.dolizy.2021';
		$other_user_to_search = 'lucas.mallevays.2022';
		$pwd_to_search = '685mw8cd';
	    $dn = 'ou=people,dc=boquette, dc=fr';
		$filter = '(|(description='.$user_to_search.')(uid='.$user_to_search.'))';
		$attri = array('Dn','uid');
		$sr = ldap_search($ldapconn,$dn,$filter,$attri);
		$info = ldap_get_entries($ldapconn, $sr);
		if($info[0]['dn']){
			//~ print_r($info);
			$dn_user = $info[0]['dn'];
			$ldapbind_user = ldap_bind($ldapconn, $dn_user, $pwd_to_search);
			//~ print_r($ldapbind_user); //if the ids are good, $ldapbind=1
			
			//add attribute departement, if doesn't exist, create one
				$dn = 'ou=people,dc=boquette, dc=fr';
				$filter = '(|(description='.$user_to_search.')(uid='.$user_to_search.'))';
				$attri = array('departmentNumber');
				$sr = ldap_search($ldapconn,$dn,$filter,$attri);
				$info = ldap_get_entries($ldapconn, $sr);
				//~ print_r($info);
				
				$dn = 'ou=people,dc=boquette, dc=fr';
				$filter = '(|(description='.$other_user_to_search.')(uid='.$other_user_to_search.'))';
				$attri = array('departmentNumber');
				$sr = ldap_search($ldapconn,$dn,$filter,$attri);
				$info = ldap_get_entries($ldapconn, $sr);
				//~ print_r($info);
				
				//~ $dn = 'ou=people,dc=boquette, dc=fr';
				//~ $info['departmentNumber']=random_int(1,95);
				//~ ldap_add($ldapconn, $dn_user, $info);
				$ldapbind = ldap_bind($ldapconn, $ldaprdn, $ldappass);
				$modifs = array('departmentNumber' => array(0=>random_int(1,95)));
				ldap_modify($ldapconn, $dn_user, $modifs);
				
				
				$dn = 'ou=people,dc=boquette, dc=fr';
				$filter = '(|(description='.$user_to_search.')(uid='.$user_to_search.'))';
				$attri = array('departmentNumber');
				$sr = ldap_search($ldapconn,$dn,$filter,$attri);
				$info = ldap_get_entries($ldapconn, $sr);
				print_r($info);
			
		}
	ldap_close($ldapconn);
    } else {
        echo "LDAP bind failed...";
    }

}

?>

