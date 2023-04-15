<?php
class DBFactory{
	public static function getMysqlConnexionWithPDO(){
		$db = new PDO('mysql:host=10.1.0.15;dbname=carteBandes','nodejs','boquette1815');
		$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
		return $db;
	}
}
