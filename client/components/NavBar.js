import { useRoute } from '@react-navigation/native';
import React, { useContext, useState } from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';


import { ThemeContext } from '../App';
import FeedSvg from '../assets/images/nav_feed_icon';
import MapSvg from '../assets/images/nav_map_icon';
import ProfileSvg from '../assets/images/nav_profile_icon';


export default function NavBar({ }) {
    const theme = useContext(ThemeContext)
    const styles = createStyles(theme)

    const isActive = useRoute().name;
    const navigation = useNavigation();



    const navOptions = [
        {
            route: 'feed',
            icon: FeedSvg,
        },
        {
            route: 'map',
            icon: MapSvg,
        },
        {
            route: 'profile',
            icon: ProfileSvg,
        },

    ]
    return (

        <View style={styles.navContainer}>
            {navOptions.map(({ route, icon }, i) =>
                <Pressable key={i} style={styles.navOption} onPress={() => navigation.navigate(route)}>
                    {icon({ color: isActive == route ? theme.colors.primary : theme.colors.foreground })}
                    <Text style={isActive == route ? { ...styles.navButton, color: theme.colors.primary } : styles.navButton}>
                        {route}
                    </Text>
                </Pressable>
            )}

        </View>
    )
}



const createStyles = theme => (

    StyleSheet.create({
        navContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            height: 60,
            paddingHorizontal: '15%',
            backgroundColor: theme.colors.background,
            borderColor: theme.colors.faint,
            borderTopEndRadius: 10,
            borderTopStartRadius: 10,
            borderTopWidth: 2,
            borderLeftWidth: 2,
            borderRightWidth: 2,
            zIndex: 2,
            position: "absolute",
            bottom: 0
        },
        navOption: {
            flex: 0,
            alignItems: 'center',
            justifyContent: 'flex-end',
            padding: 10,
        },
        navButton: {
            fontSize: 12,
            color: theme.colors.foreground
        }

    })
)