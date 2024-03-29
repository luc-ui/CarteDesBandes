<?php
class DepartementsManagerPDO extends DepartementsManager{

        protected $db;

        public function __construct(PDO $db){
                $this->db = $db;
        }

        protected function add(Departements $Departements){
                $requete = $this->db->prepare('INSERT INTO Departements(id_bande, id_dep) VALUES(:id_bande, :id_dep)');
                $requete->bindValue(':id_bande',$Departements->id_bande(), \PDO::PARAM_INT);
                $requete->bindValue(':id_dep',$Departements->id_dep(), \PDO::PARAM_INT);
                $requete->execute();
        }

        protected function update(Departements $Departements){
                $requete = $this->db->prepare('UPDATE Departements SET id_bande = :id_bande, id_dep = :id_dep WHERE id = :id');
                $requete->bindValue(':id_bande',$Departements->id_bande(), \PDO::PARAM_INT);
                $requete->bindValue(':id_dep',$Departements->id_dep(), \PDO::PARAM_INT);
                $requete->bindValue(':id',$Departements->id(), \PDO::PARAM_INT);
                $requete->execute();
        }
        public function delete($id){
				$requete = $this->db->prepare('DELETE FROM Departements WHERE id_dep = :id');
				$requete->bindValue(':id', $id, \PDO::PARAM_INT);
                $requete->execute();
        }
        public function delete_bande($id){
				$requete = $this->db->prepare('DELETE FROM Departements WHERE id_bande =  :id');
                $requete->bindValue(':id', $id, \PDO::PARAM_INT);
                $requete->execute();
        }

        public function getList($debut=-1,$limite=-1){
                if($debut=!-1 && $limite!=-1){
                        $requete = $this->db->prepare('SELECT * FROM Departements ORDER BY id DESC LIMIT :limit OFFSET :offset');
                        $requete->bindValue(':limit', (int) $limite, \PDO::PARAM_INT);
                        $requete->bindValue(':offset', (int) $debut, \PDO::PARAM_INT);
                }else {
                        $requete = $this->db->prepare('SELECT * FROM Departements ORDER BY id DESC');
                }
                $requete->execute();
                $requete->setFetchMode(PDO::FETCH_CLASS | PDO::FETCH_PROPS_LATE, 'Departements');
                $liste = $requete->fetchAll();
                $requete->closeCursor();
                return $liste;

        }
		public function getUnique($id)
		{ 	
			$requete = $this->db->prepare('SELECT * FROM Departements WHERE id = :id');
			$requete->bindValue(':id', (int) $id, \PDO::PARAM_INT);
			$requete->execute();

			$requete->setFetchMode(\PDO::FETCH_CLASS | \PDO::FETCH_PROPS_LATE, 'Departements');

			if ($Departements = $requete->fetch())
			{    
				$requete->closeCursor();  
				return $Departements;
			}
			return null;
		}
}
