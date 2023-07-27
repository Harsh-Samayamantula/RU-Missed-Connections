import React from 'react'
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

export default function OutlinedWidget({
    children,
    topTint,
    shadowTint,
    width,
    height,
    borderColor,
    extraStyles,
    borderRadius = 10,
    shadowOffSet = 6.5,
    onPress
}) {
    const styles = StyleSheet.create({
        topView: {
            backgroundColor: topTint,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: borderRadius,
            borderWidth: 2,
            borderColor: borderColor || topTint,
            width: width,
            height: height
        },
        shadowView: {
            position: 'absolute',
            top: shadowOffSet,
            width: width,
            height: height,
            zIndex: -1,
            borderRadius: borderRadius,
            backgroundColor: shadowTint
        }
    })

    let inner = (
        <>
            <View style={styles.topView}>
                {children}
            </View>

            {shadowTint && <Text style={styles.shadowView} />}
        </>
    );

    return (
        <View style={extraStyles}>
            {onPress 
                ?  <Pressable onPress={onPress}>{inner}</Pressable>
                : inner
            }
        </View>
    )
}

