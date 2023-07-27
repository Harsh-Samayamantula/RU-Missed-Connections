import React, { cloneElement, useContext } from 'react'
import { StyleSheet, Pressable, Text, View } from 'react-native'
import { ThemeContext } from '../App';

export default function IconButton({icon, buttonDimensions, extraStyles, priority=1, onPress= ()=>{} }) {
    
    const theme = useContext(ThemeContext)
    const styles = createStyles(theme, buttonDimensions, priority)

    return (
        <Pressable onPress={()=>onPress()}>
           <View style={[styles.topView, extraStyles]}>
                {icon}
           </View>
           <View style={[styles.shadowView, extraStyles]} >
                {icon}
           </View>
        </Pressable>
    )
}



const createStyles = (theme, buttonDimensions, priority) => {
    const themes = {
        1: {
            primary: theme.colors.primary,
            primaryDark: theme.colors.primaryDark,
            shadowY: 6.5
        },
        2: {
            primary: theme.colors.background,
            primaryDark: theme.colors.primaryLight,
            stroke: theme.colors.faint,
            shadowY: 2.5
        },
        
    }
    const buttonTheme = themes[priority] ;
    const borderRadius = 10
    
    return ( StyleSheet.create({
    topView:{
        backgroundColor: buttonTheme.primary,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: borderRadius,
        height: buttonDimensions[1],
        width: buttonDimensions[0],
        borderWidth: buttonTheme.stroke? 2 : 0,
        borderColor: buttonTheme.stroke
    },
    shadowView: {
        position: 'absolute',
        top: buttonTheme.shadowY,
        width: '100%',
        zIndex: -10,
        borderRadius: borderRadius,
        backgroundColor: buttonTheme.primaryDark,
        height: buttonDimensions[1],
        width: buttonDimensions[0],
    }

}))}