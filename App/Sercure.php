<?php

class Secure{
        protected $erreurs = [],
        $id,
        $hash,
        $ipu;

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
                return !(empty($this->ipu) || empty($this->hash));
        }

        public function setId($id){
                $this->id = (int) $id;
        }

        public function setIpu($ipu){
                $this->ipu=$ipu;
        }

        public function setHash($hash){
                $this->hash=$hash;
        }
        
        public function erreurs(){
                return $this->erreurs;
        }

        public function id(){
                return $this->id;
        }

        public function ipu(){
                return $this->ipu;
        }

        public function hash(){
                return $this->hash;
        }
}
