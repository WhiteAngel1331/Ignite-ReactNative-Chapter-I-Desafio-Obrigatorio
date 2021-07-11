import React, { useEffect, useRef, useState } from "react";
import { View, TouchableOpacity, Image, StyleSheet, Text, TextInput, Alert} from "react-native";
import { Task } from "../TasksList";
import { CheckBox } from "./components/CheckBox";
import { IconsArea } from "./components/IconsArea";



interface TasksItemProps {
    task: Task;
    toggleTaskDone: (id: number) => void;
    removeTask: (id: number) => void;
    editTask: (id:number, newTaskTitle:string) => void;
  }

export function TaskItem({task, toggleTaskDone, removeTask, editTask} : TasksItemProps){
    
  const [isEditing, setIsEditing] = useState(false);
  const [textInputTitle, setTextInputTitle] = useState(task.title);
  const textInputRef = useRef<TextInput>(null)

  function handleEditTask(){
    Alert.alert("Editando Task", "Tem certeza que deseja editar essa Task?", [
      {
        text:"Não"
      },
      {
        text:"Sim",
        onPress:()=> editTask(task.id, textInputTitle)
      }
    ])
  }

  function handleIsEditing(){
    setIsEditing(true)
  }

  function handleCancelEditing(){
    setTextInputTitle(task.title)
    setIsEditing(false)
  }

  function handleSubmitEdit(){
    editTask(task.id, textInputTitle)
    setIsEditing(false)
  }

  useEffect(()=>{
    if(textInputRef.current){
      if(isEditing){
        textInputRef.current.focus()
      } else {
        textInputRef.current.blur()
      }
    }
  }, [isEditing])
  
  return(
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <View>
                <TouchableOpacity
                activeOpacity={0.7}
                style={styles.taskButton}
                onPress={()=>toggleTaskDone(task.id)}
                >
                    <CheckBox check={task.done}></CheckBox>

                    <TextInput
                      value={textInputTitle}
                      onChangeText={setTextInputTitle}
                      ref={textInputRef}
                      editable={isEditing}
                      onSubmitEditing={handleSubmitEdit}
                      style={!task.done ? styles.taskText : styles.taskTextDone}
                    />
                </TouchableOpacity>
            </View>
            <IconsArea
              isEditing={isEditing} 
              task={task} 
              removeTask={removeTask}
              handleCancelEdit={handleCancelEditing}
              handleIsEditing={handleIsEditing}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    taskButton: {
      flex: 1,
      paddingHorizontal: 24,
      marginBottom: 4,
      borderRadius: 4,
      flexDirection: 'row',
      alignItems: 'center'
    },
    taskText: {
      color: '#666',
      fontFamily: 'Inter-Medium'
    },
    taskTextDone: {
      color: '#1DB863',
      textDecorationLine: 'line-through',
      fontFamily: 'Inter-Medium'
    }
  })