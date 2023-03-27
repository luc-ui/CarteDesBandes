<?php

abstract class BandesManager{
        abstract protected function add(Bandes $Bandes);
        abstract protected function update(Bandes $Bandes);
        abstract public function delete($id);
        abstract public function getList($debut=-1,$limite=-1);
        abstract public function getUnique($id);
        public function save(Bandes $Bandes){
                if($Bandes->isValid()){
                        $Bandes->isNew() ? $this->add($Bandes) : $this->update($Bandes);
                }
                else{
                        throw new RuntimeException('Le parametre doit être valide...');
                }
        }
}
