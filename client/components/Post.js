import React,  {useContext} from 'react'
import { Dimensions, StyleSheet, Text, TextInput, View, ScrollView} from 'react-native';
import { Poppins_400Regular, Poppins_400Regular_Italic, Poppins_500Medium, Poppins_700Bold, useFonts } from '@expo-google-fonts/poppins';
import { SafeAreaView } from "react-native-safe-area-context";
import AppLoading from 'expo-app-loading';
import Color from 'color';

import { ThemeContext } from '../App';



export default function Post({ textContent, date, location, campus}) {

    const theme = useContext(ThemeContext)
    const background = theme.colors[campus];
    const foreground = Color(background).darken(0.6).hex()
    const styles = createStyles(theme, Dimensions.get("window").height,Dimensions.get("window").width, background, foreground)

    let [fontsLoaded] = useFonts({
        Poppins_500Medium,
        Poppins_700Bold,
        Poppins_400Regular,
        Poppins_400Regular_Italic
    });
    if (!fontsLoaded)
        return <AppLoading />


    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.info}>
                <Text style={styles.location} >{location}</Text>
                <Text style={styles.time}>{date}</Text>
            </View>
            <View style = {styles.message}>
                <ScrollView   nestedScrollEnabled  showsVerticalScrollIndicator = {false}>
                    <Text  style={styles.messageStyle(textContent.length)}>{textContent}</Text>
                </ScrollView>
            </View>

            <View style={styles.response}>
                <TextInput
                    placeholder="Send a chat"
                    textAlign="left"
                    style={styles.responseBox}
                    selectionColor="#F17F8C"
                    placeholderTextColor = {Color(background).darken(0.3).hex()}
                />
                <Text style={styles.shadowBox}>Send a chat</Text>
            </View>
        </SafeAreaView>
    )

}


const createStyles = (theme, vh, vw, background, foreground) => ( 
     StyleSheet.create({
        container: {
            backgroundColor: background,
            flexDirection: 'column',
            height: 1.038 * vh,
            alignItems: 'stretch',
            justifyContent: 'space-between',
            paddingHorizontal: 0.05 * vw,
        },
        info: {
            fontSize: 14,
            justifyContent: "space-between",
            flexDirection: 'row',
            paddingTop: 0.04 * vh
        },
        message: {
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center'
        },
        response: {
            marginBottom: 0.08 * vw,
            marginTop: 20
        },
        messageStyle: textLength => ({
            fontFamily: 'Poppins_500Medium',
            fontSize: Math.max(-0.0566 * textLength + 39, 22),
            color: foreground,
            lineHeight: Math.max(-0.2078 * textLength + 84, 32) > 47 ? 47 : Math.max(-0.2078 * textLength + 84, 32),
            paddingTop: 10,
        }),
        time: {
            fontFamily: 'Poppins_700Bold',
            color: foreground
        },
        shadowBox: {
            backgroundColor: Color(background).darken(0.2).hex(),
            width: '100%',
            fontSize: 18,
            borderRadius: 8,
            padding: 9,
            paddingLeft: 20,
        },
        responseBox: {
            borderColor: Color(background).darken(0.2).hex(),
            borderWidth: 2,
            padding: 9,
            paddingLeft: 20,
            fontSize: 18,
            borderRadius: 10,
            width: '100%',
            color: foreground,
            backgroundColor: background,
            zIndex: 10,
            position: 'absolute',
            bottom: 3
        },

        location: {
            fontFamily: 'Poppins_400Regular',
            textTransform: 'uppercase',
            textDecorationLine: 'underline',
            color: foreground,
        },
        ctaContainer: {
            alignSelf: 'flex-end',
            top: -30,
            left: -30
        },
    })
)