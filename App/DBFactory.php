<?php
class DBFactory{
	public static function getMysqlConnexionWithPDO(){
		$db = new PDO('mysql:host=*host*;dbname=*dbname*','*user*','*pwd*');
		$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
		return $db;
	}
}
