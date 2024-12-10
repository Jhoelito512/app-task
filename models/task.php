<?php
require_once 'mysql.php';
class Task extends Mysql
{
    private $id;
    private $idUser;
    private $title;
    private $description;
    private $status;
    private $date;
    private $hour;
    private $idComen;
    protected function __construct()
    {
        parent::__construct();
    }
/**
* Crear o registrar la tarea
*/
    protected function createTask($idUser, $title, $description, $status, $date, $hour)
    {
        $data = array(
            $this->idUser = $idUser,
            $this->title = $title,
            $this->description = $description,
            $this->date = $date,
            $this->hour = $hour,
            $this->status = $status,
        );
        $sql = "INSERT INTO tareas (usuario_id,titulo,descripcion,fecha,hora,estado) VALUE (?,?,?,?,?,?);";
        $response = $this->insert($sql, $data);
        return $response;
    }
/*
* Funcion para obtener las tareas
*/
    protected function selectTasks($idUser)
    {
        $sql = "SELECT * FROM tareas WHERE usuario_id = ?";
        $data = array($idUser);
        $response = $this->selectALL($sql, $data);
        return $response;
    }
/*
* Funcion para actualizar el estado de la tarea
*/
    protected function updateStatus($id, $status)
    {
        $this->id = $id;
        $this->status = $status;
        $data = array(
            $this->status,
            $this->id
        );
        $sql = "UPDATE tareas SET estado = ? WHERE id = ?";
        $response = $this->update($sql, $data);
        return $response;
    }
/*
* funcion para eliminar la tarea
*/
    protected function deleteTask($id) {
        $this->id = $id;
        $data = array(
            $this->id
        );
        $sql = "DELETE FROM tareas WHERE id = ?";
        $response = $this->delete($sql, $data);
        return $response;
    }

/*
* funcion para actualizar la tarea
*/
    protected function updateTask($idUser, $title, $description, $status ,$date, $hour) {
        $this->idUser = $idUser;
        $this->title = $title;
        $this->description = $description;
        $this->date = $date;
        $this->hour = $hour;
        $this->status = $status;
        $data = array(
            $this->idUser,
            $this->title,
            $this->description,
            $this->date,
            $this->hour,
            $this->status,
        );
        $sql = "UPDATE tareas SET usuario_id = ?, titulo = ?, descripcion = ?, fecha = ?, hora = ?, estado = ? WHERE id = ?";
        $response = $this->update($sql, $data);
        return $response;
    }
/*
* funcion para buscar por fecha
*/
    protected function buscarTask($id) {
        $this->id = $id;
        $data = array(
            $this->id
        );
        $sql = "SELECT * FROM tareas WHERE id = ?";
        $response = $this->select($sql, $data);
        return $response;
    }
/*
* Crear o registrar la tarea
*/
    protected function createCom($description)
    {
        $data = array(
            $this->description = $description,
        );
        $sql = "INSERT INTO comentario (descripcion) VALUE (?);";
        $response = $this->insert($sql, $data);
        return $response;
    }
/*
* Funcion para obtener las tareas
*/
    protected function selectCom($idComen)
    {
        $sql = "SELECT * FROM comentario WHERE idcomentario = ?";
        $data = array($idComen);
        $response = $this->selectALL($sql, $data);
        return $response;
    }
}