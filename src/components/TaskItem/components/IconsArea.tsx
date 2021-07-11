import React from "react";
import { Image, TouchableOpacity, View } from "react-native";
import { Task } from "../../TasksList";

import trashIcon from '../../../assets/icons/trash/trash.png'
import Icon from "react-native-vector-icons/Feather";

interface IconsAreaProps {
    task: Task;
    isEditing: boolean;
    removeTask: (id: number) => void;
    handleIsEditing: () => void;
    handleCancelEdit: () => void;
  }

export function IconsArea({task, removeTask, handleIsEditing, handleCancelEdit, isEditing}:IconsAreaProps){
    return(
        <View style={{flexDirection:"row", alignItems:"center"}}>
            {
                !isEditing
                ?
                <TouchableOpacity style={{padding:8}} onPress={handleIsEditing}>
                    <Icon name="edit"></Icon>
                </TouchableOpacity>
                :
                <TouchableOpacity style={{padding:8}} onPress={handleCancelEdit}>
                    <Icon name="x"></Icon>
                </TouchableOpacity>
            }
            <View style={{width:1, height:24, backgroundColor:"#ccc", opacity:.24}}></View>
            <TouchableOpacity
                style={{ paddingHorizontal: 24, opacity: isEditing ? 0.4 : 1}}
                onPress={()=> removeTask(task.id)}
                disabled={isEditing}
            >
                <Image source={trashIcon} />
            </TouchableOpacity>
        </View>
    )
}