<?php
    class BusinessException extends Exception {
        public function __construct(string $message = "")
        {
            return parent::__construct($message);
        }
    }
?>