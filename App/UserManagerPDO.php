<?php
class UserManagerPDO extends UserManager{

        protected $db;

        public function __construct(PDO $db){
                $this->db = $db;
        }

        protected function add(User $User){
                $requete = $this->db->prepare('INSERT INTO User(ip_u, id_dep) VALUES(:ip_u, :id_dep)');
                $requete->bindValue(':ip_u',$User->ip_u());
                $requete->bindValue(':id_dep',$User->id_dep());
                $requete->execute();
        }
		protected function update(User $User){
                $requete = $this->db->prepare('UPDATE User SET ip_u = :ip_u, id_dep = :id_dep WHERE ip_u = :ip_u');
				$requete->bindValue(':ip_u',$User->ip_u());
                $requete->bindValue(':id_dep',$User->id_dep());
                $requete->execute();
        }
        public function delete($ip){
				$requete = $this->db->prepare('DELETE FROM User WHERE ip_u = :ip_u');
				$requete->bindValue(':ip_u',$ip);
                $requete->execute();
        }
        public function getList($debut=-1,$limite=-1){
                if($debut=!-1 && $limite!=-1){
                        $requete = $this->db->prepare('SELECT * FROM User ORDER BY id DESC LIMIT :limit OFFSET :offset');
                        $requete->bindValue(':limit', (int) $limite);
                        $requete->bindValue(':offset', (int) $debut);
                }else {
                        $requete = $this->db->prepare('SELECT * FROM User ORDER BY id DESC');
                }
                $requete->execute();
                $requete->setFetchMode(PDO::FETCH_CLASS | PDO::FETCH_PROPS_LATE, 'User');
                $liste = $requete->fetchAll();
                $requete->closeCursor();
                return $liste;

        }
		public function getUnique($ip)
		{ 	
			$requete = $this->db->prepare('SELECT * FROM User WHERE ip_u = :ip_u');
			$requete->bindValue(':ip_u', $ip, \PDO::PARAM_STR);
			$requete->execute();

			$requete->setFetchMode(\PDO::FETCH_CLASS | \PDO::FETCH_PROPS_LATE, 'User');

			if ($User = $requete->fetch())
			{    
				$requete->closeCursor();  
				return $User;
			}
			return null;
		}
}
