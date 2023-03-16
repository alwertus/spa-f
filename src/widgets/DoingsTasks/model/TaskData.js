import {useEffect, useState} from 'react';
import {createTask, getTaskList, removeTask, updateTask} from "../api/request";
import toast from "react-hot-toast";

export const TaskData = () => {
    const [tasks, setTasks] = useState([]);


    useEffect(() => {
        getTaskList(setTasks)
    },[])

    const taskActions = {
        createTask: (newName) => {
            createTask(newName, (createdElement) => {
                const newTasks = [...tasks]
                newTasks.push(createdElement)
                setTasks(newTasks)
                toast.success("Created")
            })
        },
        updateTask: (e) => {
            const newTasks = [...tasks]
            const updatedIndex = newTasks.findIndex(item => item['id'] === e['id'])
            newTasks[updatedIndex] = e
            setTasks(newTasks)
            updateTask(e)
        },
        deleteTask: (e) => {
            const newTasks = tasks.filter(el => el['id'] !== e['id'])
            setTasks(newTasks)
            removeTask(e)
        },
        reload: () => {
            getTaskList(setTasks)
        }
    }

    return {
        tasks,
        setTasks,
        taskActions
    };
};
