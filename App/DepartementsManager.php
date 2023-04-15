<?php

abstract class DepartementsManager{
        abstract protected function add(Departements $Departements);
        abstract protected function update(Departements $Departements);
        abstract public function delete($id);
        abstract public function getList($debut=-1,$limite=-1);
        abstract public function getUnique($id);
        public function save(Departements $Departements){
                if($Departements->isValid()){
                        $Departements->isNew() ? $this->add($Departements) : $this->update($Departements);
                }
                else{
                        throw new RuntimeException('Le parametre doit être valide...');
                }
        }
}
