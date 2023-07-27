import React, { useContext } from 'react';
import { StyleSheet, TextInput, View, FlatList } from 'react-native';


import SearchSvg from '../assets/images/search_icon'
import Button from '../components/Button'
import {SafeAreaView} from 'react-native-safe-area-context'

import { ThemeContext } from '../App';
import LocationTextInput from './LocationTextInput';

export default function MapControls({animateToRegion}) {
    const theme = useContext(ThemeContext)
    const styles = createStyles(theme)
   
    let campusList = [
        {
            title: 'Livingston',
            color: theme.colors.livingston,
            region: {
                latitude: 40.520525, 
                longitude:-74.436315
            }
        },
        {
            title: 'College Ave',
            color: theme.colors.collegeAve,
            region: {
                latitude: 40.502976,
                longitude: -74.451910,
            }
        },
        {
            title: 'Cook/Douglass',
            color: theme.colors.cookDoug,
            region: {
                latitude: 40.482690, 
                longitude: -74.437395,
            }
        },
        {
            title: 'Busch',
            color: theme.colors.busch,
            region: {
                latitude: 40.521168, 
                longitude:  -74.462298,
            }
        },
    ];
    //fills up repeating information on campusList. 
    campusList = campusList.map((campus, i) => ({ ...campus, id: i, region: {...campus.region, latitudeDelta: 0.015, longitudeDelta: 0.015 } }))



    const renderItem = ({ item }) => (
        <View style={{ height: 45, marginRight: item.id === campusList[campusList.length - 1].id ? 40 : 10 }}>
            <Button
                priority={3}
                text={item.title}
                onPress = {()=> animateToRegion(item.region)}
                borderRadius={60}
                fontSize={12}
                height={30}
                shadowTint={item.color}
                shadowOffSet={3.5} />
        </View>
    );
    return (
        <SafeAreaView style={styles.controlsContainer}>
            <View style={styles.mapControlsContainer}>

                <View style={styles.searchContainer}>
                    <SearchSvg height={19} width={19} style={{ position: 'absolute', left: '7%',top: 20, zIndex: 2 }} />
                    <LocationTextInput extraStyles = {styles.textSearch} animateToRegion = {(region)=> animateToRegion({
                latitude: region.latitude, 
                longitude:  region.longitude,
                latitudeDelta: 0.002, longitudeDelta: 0.002
                    })}/>
                </View>

                <FlatList
                    data={campusList}
                    renderItem={renderItem}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={item => item.id}
                    style={styles.campusList}
                />
            </View>


        </SafeAreaView>
    )
}
const createStyles = (theme) => (StyleSheet.create({
    controlsContainer: {
        width: '100%',
        justifyContent: 'space-between',
        alignContent: 'center',
        alignItems: 'center',
        padding: 0,
        zIndex:2,
        position: "absolute",
        top:0
    },
    mapControlsContainer: {
        width: '100%',
    },
    searchContainer: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    textSearch: {
        borderColor: theme.colors.faint,
        borderWidth: 2,
        padding: 9,
        paddingLeft: 50,
        fontSize: 20,
        borderRadius: 10,
        width: '92%',
        backgroundColor: theme.colors.background,
    },
    campusList: {
        marginTop: 7,
        width: '100%',
        paddingHorizontal: '4%',
        zIndex:300
    },

    ctaContainer: {
        alignSelf: 'flex-end',
        top: -30,
        left: -30
    },
}));
