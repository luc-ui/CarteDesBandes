<?php

abstract class UserManager{
        abstract protected function add(user $user);
        abstract public function getList($debut=-1,$limite=-1);
        abstract public function getUnique($ip);
        abstract public function delete($ip);
        public function save(User $user){
                if($user->isValid()){
                        $user->isNew() ? $this->add($user) : $this->update($user);
                }
                else{
                        throw new RuntimeException('Le parametre doit être valide...');
                }
        }
}
