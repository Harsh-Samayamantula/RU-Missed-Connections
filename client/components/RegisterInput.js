import React, { useContext, useState } from 'react'
import { Image, StyleSheet, TextInput, TouchableHighlight, View } from "react-native";
import { Poppins_400Regular, useFonts } from '@expo-google-fonts/poppins';
import AppLoading from 'expo-app-loading';
import PasswordIcon from '../assets/images/password_icon'
import { ThemeContext } from '../App';

export default function RegisterInput({
  placeholderText,
  keyboardType,
  secureTextEntry = false,
  extraStyles,
  text = "",
  onTextChange
}) {
  const theme = useContext(ThemeContext)
  const styles = createStyles(theme)

  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
  });

  let [passwordFieldState, setPasswordFieldState] = useState(secureTextEntry)

  if (!fontsLoaded) {
    return <AppLoading />
  } else {
    return (
      <View style={[styles.container, extraStyles]}>
        <TextInput
          style={styles.input}
          placeholder={placeholderText}
          placeholderTextColor={"#D8D6D3"}
          keyboardType={keyboardType}
          selectionColor={theme.colors.faint}
          secureTextEntry={passwordFieldState}
          underlineColorAndroid="transparent"
          textAlignVertical="center"
          text={text}
          onChangeText={(text) => {
            onTextChange(text)}
          }
        />
        {secureTextEntry &&
          <TouchableHighlight
            style={styles.passwordIconTouchable}
            onPress={() => { setPasswordFieldState(!passwordFieldState) }}
            underlayColor={theme.colors.background}>
            <PasswordIcon fill={passwordFieldState ? theme.colors.faint : theme.colors.primary} />
          </TouchableHighlight>
        }
      </View>
    )
  }
}



const createStyles  = (theme)=>(  StyleSheet.create({
  container: {
    height: 53,
    width: "100%",
    borderWidth: 2,
    borderRadius: 10,
    borderColor: theme.colors.faint,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  input: {
    flex: 1,
    paddingLeft: 25,
    fontFamily: 'Poppins_400Regular',
    fontSize: 20,
  },
  passwordIconTouchable: {
    marginRight: 20,
    alignSelf: "center",
    padding: 10
  }
}));