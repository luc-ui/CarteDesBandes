<?php

abstract class SecureManager{
        abstract protected function add(secure $secure);
        abstract public function getUnique($ip);
        public function save(secure $secure){
                if($secure->isValid()){
                        $secure->isNew() ? $this->add($secure) : '';
                }
                else{
                        throw new RuntimeException('Le parametre doit être valide...');
                }
        }
}
