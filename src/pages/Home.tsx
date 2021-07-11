import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    
    if(tasks.find(task => task.title === newTaskTitle)){
      return Alert.alert("Task com mesmo título", 
      "Você tentou adicionar uma task com o mesmo título de uma já existente, por favor, tente outra coisa",
      [
        {
          text: "Ok"
        }
      ]
      )
    }
    
    const newTask: Task = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false
    }

    setTasks([...tasks, newTask])
  }

  function handleToggleTaskDone(id: number) {
    let newTasks = tasks.map(task => {
      if(task.id !== id){
        return task;
      }else{
        task.done = !task.done;
        return task;
      }
    })

    setTasks(newTasks);
  }

  function handleRemoveTask(id: number) {
    Alert.alert("Remover Item", "Você tem certeza que deseja remover esse item?", [
      {
        text:"Não"
      },
      {
        text:"Sim",
        onPress:()=>{
          let newTasks = tasks.filter(task => task.id !== id)
          setTasks(newTasks);
        }
      }
    ])
  }

  function handleEditTask(id: number, newTaskTitle: string){
    let newTasks = tasks.map(task => {
      if(task.id !== id){
        return task;
      }else{
        task.title = newTaskTitle;
        return task;
      }
    })

    setTasks(newTasks);
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
        editTask={handleEditTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})