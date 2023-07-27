import React, { useContext } from 'react'
import { StyleSheet, Text } from 'react-native'
import { useFonts, Poppins_400Regular } from '@expo-google-fonts/poppins';
import AppLoading from 'expo-app-loading';
import { ThemeContext } from '../App'
import OutlinedWidget from './OutlinedButton';

export default function Button({text, priority=1, onPress, fontSize, shadowTint, height, width, paddingHorizontal=25, borderRadius, shadowOffSet, extraStyles={}, }) {
    const theme  = useContext(ThemeContext)
    const {styles, buttonTheme} = createStyles(theme, fontSize, priority, paddingHorizontal)
    let [fontsLoaded] = useFonts({
        Poppins_400Regular,
    });

    if (!fontsLoaded)
        return <AppLoading />
    return (
        <OutlinedWidget 
        topTint={buttonTheme.primary} 
        shadowTint={shadowTint || buttonTheme.primaryDark} 
        width={width || "100%"} 
        height={height || 47} 
        onPress={onPress} 
        borderColor={buttonTheme.stroke}
        borderRadius={borderRadius}
        extraStyles={extraStyles}
        shadowOffSet={priority === 1 ? shadowOffSet : 3}
        >
           <Text style={styles.buttonText}>{text}</Text>
        </OutlinedWidget>
    )
}

const createStyles  = (theme, fontSize, priority, paddingHorizontal) => { 
    const themes = {
        1: {
            primary: theme.colors.primary,
            primaryDark: theme.colors.primaryDark,
            secondary: '#ECECEC',
        },
        2: {
            primary: theme.colors.background,
            primaryDark: theme.colors.faint,
            secondary: theme.colors.primaryLight,
            stroke: theme.colors.faint,
        },
        3: {
            primary: theme.colors.background,
            primaryDark: theme.colors.faint,
            secondary: '#404040',
            stroke: theme.colors.faint,
        }
    }
    const buttonTheme = themes[priority];
    const styles = StyleSheet.create({
        buttonText: {
            color: buttonTheme.secondary,
            padding: buttonTheme.paddingVertical,
            paddingHorizontal: paddingHorizontal ,
            fontFamily: "Poppins_400Regular",
            fontSize: fontSize || 18,     
            top: 1.2
        }
    })
    return {styles, buttonTheme}
}