import React, { useContext, useEffect, useRef } from 'react'
import { useFonts, Poppins_700Bold } from '@expo-google-fonts/poppins'
import AppLoading from 'expo-app-loading'
import { View, Text, StyleSheet, Animated } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import Button from '../components/Button'
import RegisterInput from '../components/RegisterInput'
import { ThemeContext } from '../App'
import { useState } from 'react/cjs/react.development'


export default function Register({ navigation }) {
    const theme = useContext(ThemeContext)
    const styles = createStyles(theme)
    let [fontsLoaded] = useFonts({
        Poppins_700Bold,
        'ITC Giovanni': require('../assets/fonts/itc_giovanni_std_book.otf')
    })

    let [fullName, setfullName] = useState("")
    let [username, setUsername] = useState("")
    let [password, setPassword] = useState("")

    let [error, setError] = useState("")

    if (!fontsLoaded) {
        return <AppLoading />
    } else {
        return (
            <SafeAreaView style={styles.screen}>
                <View style={styles.titleAndInputs}>
                    <Text style={styles.h1}>Join the Club</Text>
                    <Text style={styles.h2}>Message others, find that one special encounter.</Text>

                    <RegisterInput
                        placeholderText="Full Name"
                        keyboardType="default"
                        extraStyles={styles.registerInput}
                        text={fullName}
                        onTextChange={setfullName}
                    />
                    <RegisterInput
                        placeholderText="Rutgers NetID"
                        keyboardType="default"
                        extraStyles={styles.registerInput}
                        text={username}
                        onTextChange={setUsername}
                    />
                    <RegisterInput
                        placeholderText="Password"
                        keyboardType="default"
                        secureTextEntry={true}
                        extraStyles={styles.registerInput}
                        text={password}
                        onTextChange={setPassword}
                    />
                    {error !== "" ? <Text style={styles.errorText}>{error}</Text> : null }

                </View>
                <View style={styles.submit}>
                    <Button
                        text="NEXT ➔"
                        priority={1}
                        onPress={() => {
                            if((fullName.split(" ").length == 2) && username !== "" && password !== "") {
                                navigation.navigate('registerFinal', {
                                    fullName: fullName,
                                    username: username,
                                    password: password
                                })
                            } else {
                            setError("Please enter all your information.")
                            }
                        }}
                        extraStyles={{ paddingVertical: 10 }}
                    />
                </View>
            </SafeAreaView>
        )
    }

}

const createStyles = (theme) => (StyleSheet.create({
    screen: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: theme.colors.background,
    },
    titleAndInputs: {
        flex: 12,
        justifyContent: "flex-end",
        width: "90%"
    },
    registerInput: {
        marginBottom: 20,
    },
    submit: {
        flex: 7,
        justifyContent: "center",
        width: "90%",
    },
    h1: {
        textAlign: 'center',
        fontSize: 40,
        fontFamily: 'Poppins_700Bold',
        color: theme.colors.primary,
    },
    h2: {
        textAlign: 'center',
        fontFamily: 'ITC Giovanni',
        fontSize: 21,
        color: '#885A60',
        bottom: 20,
        marginBottom: 30,
    },
    errorText: {
        color: theme.colors.primary,
        fontSize: 21,
    }
}))