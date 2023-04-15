<?php
/**
 * Always have documentation here
 */
class ActiveDirectoryUser {
    private $connection;
    private $username;
    private $password;
    private $ldap_db = "censored";
    private $ldap_connection;

    /**
     * Always have documentation 
     * @param $username string
     * @param $password string
     */
    public function __construct($username, $password) {
      $this->username = $username;
      $this->password = $password;
    }

    /**
     * Always have documentation
     */
    public function __destruct(){
        ldap_close($this->ldap_connection);
    }

    /**
     * Always have documentation 
     * @param $username string
     * @param $password string
     */

    public function connect() {
        $this->ldap_connection = ldap_connect($this->ldap_db);

        if ($bind = ldap_bind($this->ldap_connection, $this->username, $this->password)) {
            return True
        } else {
            throw new Exception("Invalid login.");
        }
    }

    /**
     * Always have documentation
     */
    public function getName(){
        ldap_set_option($this->ldap_connection, LDAP_OPT_PROTOCOL_VERSION, 3);
        ldap_set_option($this->ldap_connection, LDAP_OPT_REFERRALS, 0);

        $bind = ldap_bind($this->ldap_connection, $this->username, $this->password);

        # Will trim domain and slash from username 
        $person = substr($this->username, strpos($this->username, "\\") + 1,
                         strlen($this->username) - strpos($this->username,"\\"));

        $filter="(sAMAccountName=" . $person.")";

        $sr = ldap_search($this->ldap_connection, $this->ldap_db, $filter, ['cn']);
        $info = ldap_get_entries($ldap, $sr);

        $returnData = [];
        for ($i = 0; $i < $info["count"]; $i++) {
            $returnData[] = $info[$i]["cn"][0];
        }

        return $returnData;
    }
}
$ActiveDirectoryUser = new ActiveDirectoryUser($_POST['username'], $_POST['password']);
try{
    $ActiveDirectoryUser->connect();
} catch (Exception $e){
    # Do header redirect here
}
$user = $ActiveDirectoryUser->getName();
