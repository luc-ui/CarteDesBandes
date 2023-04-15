
<?php

$user   = 'cn=admin,dc=boquette,dc=fr';
$passwd = 'boquette1815';

$ds = ldap_connect('ldap://10.1.0.4');

if ($ds) {
    $r = ldap_bind_ext($ds, $user, $passwd, [['oid' => LDAP_CONTROL_PASSWORDPOLICYREQUEST]]);

    if (ldap_parse_result($ds, $r, $errcode, $matcheddn, $errmsg, $referrals, $ctrls)) {
        if ($errcode != 0) {
            die("Error: $errmsg ($errcode)");
        }
        if (isset($ctrls[LDAP_CONTROL_PASSWORDPOLICYRESPONSE])) {
            $value = $ctrls[LDAP_CONTROL_PASSWORDPOLICYRESPONSE]['value'];
            echo "Expires in: ".$value['expire']." seconds\n";
            echo "Number of auth left: ".$value['grace']."\n";
            if (isset($value['error'])) {
                echo "Policy error code: ".$value['error'];
            }
        }
    }
} else {
    die("Unable to connect to LDAP server");
}
?>

