<?php

class User{
        protected $erreurs = [],
        $id,
        $ip_u,
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
                return !(empty($this->ip_u) || empty($this->id_dep));
        }

        public function setId($id){
                $this->id = (int) $id;
        }

        public function setIp_u($ip_u){
                $this->ip_u=$ip_u;
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

        public function ip_u(){
                return $this->ip_u;
        }

        public function id_dep(){
                return $this->id_dep;
        }
}
