<?php

class Departements{
        protected $erreurs = [],
        $id,
        $id_bande,
        $id_dep;

        public function __construct($valeurs=[]){
                if(!empty($valeurs)){
                        $this->hydrate($valeurs);
                }
        }

        public function hydrate($donnees){
                foreach ($donnees as $attribut => $valeur){
                        $methode = 'set'.ucfirst($attribut);
                        if (is_callable([$this, $methode])){
                                $this->$methode($valeur);
                        }
                }
        }

        public function isNew(){
                return !((int) $this->id);
        }

        public function isValid(){
                return !(empty($this->id_bande));
        }

        public function setId($id){
                $this->id = (int) $id;
        }

        public function setId_bande($id_bande){
                $this->id_bande=$id_bande;
        }

        public function setId_dep($id_dep){
                $this->id_dep=$id_dep;
        }

        public function erreurs(){
                return $this->erreurs;
        }

        public function id(){
                return $this->id;
        }

        public function id_bande(){
                return $this->id_bande;
        }

        public function id_dep(){
                return $this->id_dep;
        }

}
