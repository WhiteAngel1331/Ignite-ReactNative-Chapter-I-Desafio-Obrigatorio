import React from "react";
import { View, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Feather";

type CheckBoxProps = {check: boolean;}

export function CheckBox({check}:CheckBoxProps){
    return(
        <View style={!check ? styles.taskMarker : styles.taskMarkerDone}>
            { 
                check
                && 
                <Icon name="check" size={12} color="#FFF"/>            
            }
        </View>
    )
}

const styles = StyleSheet.create({
    taskMarker: {
      height: 16,
      width: 16,
      borderRadius: 4,
      borderWidth: 1,
      borderColor: '#B2B2B2',
      marginRight: 15,
      alignItems: 'center',
      justifyContent: 'center'
    },
    taskMarkerDone: {
      height: 16,
      width: 16,
      borderRadius: 4,
      backgroundColor: '#1DB863',
      marginRight: 15,
      alignItems: 'center',
      justifyContent: 'center'
    }
  })