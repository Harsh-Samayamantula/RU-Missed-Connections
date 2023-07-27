import React, { useContext } from 'react'
import { Text, View, StyleSheet, Dimensions } from 'react-native'
import { useFonts, Poppins_800ExtraBold, Poppins_500Medium, Poppins_600SemiBold, Poppins_400Regular } from '@expo-google-fonts/poppins';
// import { useFonts, Poppins_600SemiBold } from '@expo-google-fonts/poppins'
// import { useFonts, Poppins_500Medium } from '@expo-google-fonts/poppins'
// import { useFonts, Poppins_400Regular } from '@expo-google-fonts/poppins'


import AppLoading from 'expo-app-loading';
import Button from '../components/Button'
import DesignPatternSmall from '../assets/images/design_pattern_small'
import DesignPatternBig from '../assets/images/design_pattern_big'
import { ThemeContext } from '../App'
import { SafeAreaView } from 'react-native-safe-area-context';
import NavBar from '../components/NavBar';

export default function Profile({ navigation }) {
    const theme = useContext(ThemeContext)
    const styles = createStyles(theme)

    //load and wait for fonts. 
    let [fontsLoaded] = useFonts({
        Poppins_800ExtraBold,
        Poppins_600SemiBold,
        Poppins_400Regular,
        Poppins_500Medium,
        'ITC Giovanni': require('../assets/fonts/itc_giovanni_std_book.otf')
    });

    const str = 'Harsh'
    if (!fontsLoaded)
        return <AppLoading />
    return (
        <SafeAreaView style={styles.frameContainer}>
            <DesignPatternSmall style={styles.designPattern} />
            <DesignPatternBig style={styles.designPattern} />

            <View style={styles.profileContainer}>
                <Text style={styles.h2}>Gender</Text>
                <Text style={styles.h2}>Class of 2025</Text>
                <Text style={styles.h2}>Campus</Text>
            </View>

            <View style={styles.messageContainer}>
                <Text style={styles.h3}>hello there,</Text>
                <Text numberOfLines={1} style={styles.title(str.length)}>{str}</Text>

                <View style={{
                    borderBottomColor: 'gray',
                    borderBottomWidth: 2
                }}></View>
            </View>

            <View style={styles.contactContainer}>
                <Text style={styles.h1}>email:</Text>
                <Text style={styles.h1}>phone:</Text>
                <Text style={styles.h1}>instagram:</Text>
            </View>
            <NavBar isActive={'profile'}>
            </NavBar>
        </SafeAreaView>
    )

}
const vh = Dimensions.get("window").height;
const createStyles = (theme, vh) => (StyleSheet.create({
    frameContainer: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: theme.colors.backgroundColor
    },
    profileContainer: {
        flex: 5,
        width: "80%",
        justifyContent: 'flex-end'
    },
    messageContainer: {
        // flex: 5,
        flex: 5,
        width: "80%",
        justifyContent: 'center'
    },
    contactContainer: {
        flex: 3,
        width: "80%",
        justifyContent: 'flex-start',
        marginBottom: 100
    },
    designPattern: {

        position: 'absolute',
        // left: 0,
        top: 0,
        right: 0
        // zIndex: -100
    },
    h2: {
        textAlign: 'right',
        fontFamily: 'Poppins_400Regular',
        fontSize: 23,
        color: theme.colors.subtitle,
        top: 30,
        paddingBottom: 1
    },
    h3: {
        fontFamily: 'Poppins_500Medium',
        textAlign: 'left',
        color: theme.colors.primary,
        fontSize: 20,
        // lineHeight: 25,
    },
    title: (str) => ({
        fontFamily: 'Poppins_600SemiBold',
        textAlign: 'center',
        color: theme.colors.primary,
        fontSize: 60,
        // flexGrow: true
    }),
    h1:
    {
        textAlign: 'left',
        fontFamily: 'Poppins_400Regular',
        fontSize: 21,
        color: theme.colors.primary,
        bottom: 1
    }
}))
