<?php
require_once '../models/task.php';
class TaskController extends Task
{
    public function __construct()
    {
        parent::__construct();
    }
/**
* funcion que registrar una tareas
*/
    public function setTask($title, $description, $date, $hour)
    {
        session_start($this->nameSesion());
        //llenado de variables
        $idUser = $_SESSION["user_info"]["id"];
        $status = "pendiente";
        if ($title == "" || $date == "" || $hour == "") {
            echo $this->toJson(
                [
                    'status' => false,
                    'message' => "Los campos no pueden estar vacios",
                    'type' => 'error'
                ]
            );
            die();
        }
        $request = $this->createTask($idUser, $title, $description, $status, $date, $hour);
        if ($request > 0) {
            echo $this->toJson(
                [
                    'status' => true,
                    'message' => "Tarea registrada correctamente",
                    'type' => 'success'
                ]
            );
            die();
        }
        echo $this->toJson(
            [
                'status' => false,
                'message' => "Ocurrio un error y no logro registrar la tarea",
                'type' => 'error'
            ]
        );
        die();
    }
/**
* Funcion que obtiene las tareas
*/
    public function getTasks()
    {
        session_start($this->nameSesion());
        $idUser = $_SESSION["user_info"]["id"];
        $response = $this->selectTasks($idUser);
        if ($response) {
            echo $this->toJson(
                [
                    'status' => true,
                    'data' => $response,
                    'type' => 'success'
                ]
            );
            die();
        }
        echo $this->toJson(
            [
                'status' => false,
                'message' => "Ocurrio un error y no logro obtener las tareas",
                'type' => 'error'
            ]
        );
        die();
    }
/**
* Funcion para actualizar el estado de la tarea
*/
    public function updateStatusTask($id, $status)
    {
        if ($id == "" || $status == "") {
            echo $this->toJson(
                [
                    'status' => false,
                    'message' => "Los campos no pueden estar vacios",
                    'type' => 'error'
                ]
            );
            die();
        }
        $request = $this->updateStatus($id, $status);
        if ($request) {
            echo $this->toJson(
                [
                    'status' => true,
                    'message' => "Estado actualizado correctamente",
                    'type' => 'success'
                ]
            );
            die();

        }
        echo $this->toJson(
            [
                'status' => false,
                'message' => "Ocurrio un error y no logro actualizar el estado de la tarea",
                'type' => 'error'
            ]
        );
    }
/*
* Funcion eliminar tarea
*/
    public function deleteTasks($id) {
        if ($id == "") {
            echo $this->toJson(
                [
                    'status' => false,
                    'message' => "Los campos no pueden estar vacios",
                    'type' => 'error'
                ]
            );
            die();
        }
        $request = $this->deleteTask($id);
        if ($request) {
            echo $this->toJson(
                [
                    'status' => true,
                    'message' => "Tarea eliminada correctamente",
                    'type' => 'success'
                ]
            );
            die();
        }
    }
/*
* funcion para actualizar la tarea
*/
    public function upTask($title,  $description,  $date,  $hour)
    {
        session_start($this->nameSesion());
        //llenado de variables
        $idUser = $_SESSION["user_info"]["id"];
        $status = "pendiente";
        if ($title == "" || $date == "" || $hour == "") {
            echo $this->toJson(
                [
                    'status' => false,
                    'message' => "Los campos no pueden estar vacios",
                    'type' => 'error'
                ]
            );
            die();
        }
            $request = $this->updateTask($idUser, $title, $description, $status ,$date, $hour);
            if ($request ) {
                echo $this->toJson(
                    [
                        'status' => true,
                        'message' => "Tarea actualizada correctamente",
                        'type' => 'success'
                    ]
                );
                die();
            }
            echo $this->toJson(
                [
                    'status' => false,
                    'message' => "Ocurrio un error y no logro actualizar la tarea",
                    'type' => 'error'
                ]
            );
            die();
        }
/*
* funcion para buscar tareas con fecha
*/
    public function buscarTask($id)
    {
        session_start($this->nameSesion());
        $idUser = $_SESSION["user_info"]["id"];
        $response = $this->buscarTask($id);
        if ($response) {
            echo $this->toJson(
                [
                    'status' => true,
                    'data' => $response,
                    'type' => 'success'
                ]
            );
            die();
        }
        echo $this->toJson(
            [
                'status' => false,
                'message' => "Ocurrio un error y no logro obtener las tareas",
                'type' => 'error'
            ]
        );
        die();
    }
/**
* funcion que registrar una Comentario
*/
    public function setCom($description)
    {
        session_start($this->nameSesion());
        //llenado de variables
        $idUser = $_SESSION["user_info"]["id"];
        if ($description == "") {
            echo $this->toJson(
                [
                    'status' => false,
                    'message' => "Los campos no pueden estar vacios",
                    'type' => 'error'
                ]
            );
            die();
        }
        $request = $this->createCom($description);
        if ($request > 0) {
            echo $this->toJson(
                [
                    'status' => true,
                    'message' => "Tarea registrada correctamente",
                    'type' => 'success'
                ]
            );
            die();
        }
        echo $this->toJson(
            [
                'status' => false,
                'message' => "Ocurrio un error y no logro registrar la tarea",
                'type' => 'error'
            ]
        );
        die();
    }
/**
* Funcion que obtiene las tareas
*/
    public function getCom()
    {
        session_start($this->nameSesion());
        $idComen = $_SESSION["user_info"]["idcomentario"];
        $response = $this->selectCom($idComen);
        if ($response) {
            echo $this->toJson(
                [
                    'status' => true,
                    'data' => $response,
                    'type' => 'success'
                ]
            );
            die();
        }
        echo $this->toJson(
            [
                'status' => false,
                'message' => "Ocurrio un error y no logro obtener las tareas",
                'type' => 'error'
            ]
        );
        die();
    }
}