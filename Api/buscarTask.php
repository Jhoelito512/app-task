<?php

require_once '../controllers/taskController.php';
$objTask = new TaskController();
$objTask->buscarTask($_GET["title"], $_GET["date"]);
