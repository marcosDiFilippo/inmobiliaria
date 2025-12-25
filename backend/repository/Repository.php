<?php
    include_once("../model/Database.php");
    abstract class Repository {
        abstract public function getData();
    }
?>