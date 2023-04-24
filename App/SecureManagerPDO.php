<?php
class SecureManagerPDO extends SecureManager{

        protected $db;

        public function __construct(PDO $db){
                $this->db = $db;
        }

        protected function add(Secure $Secure){
                $requete = $this->db->prepare('INSERT INTO Secure(ipu, hash) VALUES(:ipu, :hash)');
                $requete->bindValue(':ipu',$Secure->ipu(), \PDO::PARAM_STR);
                $requete->bindValue(':hash',$Secure->hash(), \PDO::PARAM_STR);
                $requete->execute();
        }
		public function getUnique($ip)
		{ 	
			$requete = $this->db->prepare('SELECT * FROM Secure WHERE ipu = :ipu');
			$requete->bindValue(':ipu', $ip, \PDO::PARAM_STR);
			$requete->execute();

			$requete->setFetchMode(\PDO::FETCH_CLASS | \PDO::FETCH_PROPS_LATE, 'Secure');

			if ($Secure = $requete->fetch())
			{    
				$requete->closeCursor();  
				return $Secure;
			}
			return null;
		}
}
