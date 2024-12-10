<?php
if (!$_POST) {
    echo "Metodo no econtrado";
    exit();
}
require_once '../controllers/taskController.php';
$objTask = new TaskController();
$description = $_POST['task-description'];
$objTask->setCom($description);