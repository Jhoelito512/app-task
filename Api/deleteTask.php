<?php
if (!$_POST) {
    echo "Metodo no econtrado";
    exit();
}
require_once '../controllers/taskController.php';
$objTask = new TaskController();
$id = $_POST['id'];
$objTask->deleteTasks($id);