<?php

class Bandes{
        protected $erreurs = [],
        $id,
        $nom,
        $couleur;

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
                return !((int) $this->id) ;
        }

        public function isValid(){
                return !(empty($this->nom) || empty($this->couleur));
        }

        public function setId($id){
                $this->id = (int) $id;
        }

        public function setNom($nom){
                $this->nom=$nom;
        }

        public function setCouleur($couleur){
                $this->couleur=$couleur;
        }
        
        public function erreurs(){
                return $this->erreurs;
        }

        public function id(){
                return $this->id;
        }

        public function nom(){
                return $this->nom;
        }

        public function couleur(){
                return $this->couleur;
        }
}
