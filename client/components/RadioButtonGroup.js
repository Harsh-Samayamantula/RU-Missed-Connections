import React, { useContext } from 'react';
import { Pressable, StyleSheet, View, Text } from 'react-native'
import { Poppins_400Regular, useFonts } from "@expo-google-fonts/poppins"
import AppLoading from 'expo-app-loading';
import { ThemeContext } from '../App';


export default function RadioButtonGroup({selectedOptionValue,options, onPress, extraRadioStyles, extraRadioFillStyles}) {
    const theme = useContext(ThemeContext)
    const styles = createStyles(theme, extraRadioStyles, extraRadioFillStyles)

    let [fontsLoaded] = useFonts({
        Poppins_400Regular
    })

    const RadioButton = ({label, value, style, selected = true}) =>( 
        <Pressable  onPress={()=>onPress({label,value})} style= {styles.radioContainer}> 
            <View  style= {styles.radio(selected)}>
                {selected && 
                <View style = {styles.radioFill(selected)}/> }
            </View>
            <Text style = {styles.radioLabel(selected)}>{label}</Text>
        </Pressable>
    )
    
    if (!fontsLoaded)
        return <AppLoading />
    return options.map( ({value, label}, i) => (
        <RadioButton value = {value} label = {label} key = {i} selected ={selectedOptionValue === value} />
    )) 
}


const createStyles = (theme, extraRadioStyles, extraRadioFillStyles) => StyleSheet.create({
    radioContainer:{
        flexDirection: "row",
        padding: 5,
        alignItems: 'center'
    },
    radio: selected => ({
        height: 20,
        width: 20,
        borderRadius: 10,
        borderWidth: 3,
        borderColor: selected ? theme.colors.primaryExtraLight: theme.colors.faint,
        alignItems: 'center',
        justifyContent: 'center',
        ...extraRadioStyles
    }),
    radioFill: selected =>({
        height: 10,
        width: 10,
        borderRadius: 5,
        backgroundColor: selected ? theme.colors.primaryLight: theme.colors.faint,
        ...extraRadioFillStyles
    }),
    radioLabel: selected => ({
        marginLeft: 10,
        fontSize: 18,
        fontFamily: 'Poppins_400Regular',
        color: selected ? theme.colors.foreground : theme.colors.faint
    })
})
