<?php
class BandesManagerPDO extends BandesManager{

        protected $db;

        public function __construct(PDO $db){
                $this->db = $db;
        }

        protected function add(Bandes $Bandes){
                $requete = $this->db->prepare('INSERT INTO Bandes(nom, couleur) VALUES(:nom, :couleur)');
                $requete->bindValue(':nom',$Bandes->nom());
                $requete->bindValue(':couleur',$Bandes->couleur());
                $requete->execute();
        }

        protected function update(Bandes $Bandes){
                $requete = $this->db->prepare('UPDATE Bandes SET nom = :nom, couleur = :couleur WHERE id = :id');
                $requete->bindValue(':nom',$Bandes->nom());
                $requete->bindValue(':couleur',$Bandes->couleur());
                $requete->bindValue(':id',$Bandes->id());
                $requete->execute();
        }
        public function delete($id){
                $this->db->query('DELETE FROM Bandes WHERE id = '.(int) $id);
        }

        public function getList($debut=-1,$limite=-1){
                if($debut=!-1 && $limite!=-1){
                        $requete = $this->db->prepare('SELECT * FROM Bandes ORDER BY id DESC LIMIT :limit OFFSET :offset');
                        $requete->bindValue(':limit', (int) $limite);
                        $requete->bindValue(':offset', (int) $debut);
                }else {
                        $requete = $this->db->prepare('SELECT * FROM Bandes ORDER BY id DESC');
                }
                $requete->execute();
                $requete->setFetchMode(PDO::FETCH_CLASS | PDO::FETCH_PROPS_LATE, 'Bandes');
                $liste = $requete->fetchAll();
                $requete->closeCursor();
                return $liste;

        }
		public function getUnique($id)
		{ 	
			$requete = $this->db->prepare('SELECT * FROM Bandes WHERE id = :id');
			$requete->bindValue(':id', (int) $id, \PDO::PARAM_INT);
			$requete->execute();

			$requete->setFetchMode(\PDO::FETCH_CLASS | \PDO::FETCH_PROPS_LATE, 'Bandes');

			if ($Bandes = $requete->fetch())
			{    
				$requete->closeCursor();  
				return $Bandes;
			}
			return null;
		}
}
