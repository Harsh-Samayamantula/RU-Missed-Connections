
import { Dimensions, TextInput } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { ThemeContext } from '../App'
import { useContext, useEffect } from 'react';
import { useFonts, Poppins_400Regular } from '@expo-google-fonts/poppins';
import AppLoading from 'expo-app-loading';


export default function LocationTextInput({navigation, style, callback=()=>{},animateToRegion=()=>{}}) {
    const vw = Dimensions.get('window').width;
    const theme  = useContext(ThemeContext)
    let [fontsLoaded] = useFonts({
        Poppins_400Regular,
    });


    if (!fontsLoaded)
        return <AppLoading />
    return (
        <GooglePlacesAutocomplete
        placeholder='Search Location'
        styles={style !== undefined ? style :{
            container:{
                width: 40,
                marginHorizontal: 0.04 * vw,
            },
            textInput:{
                borderRadius: 10,
                borderWidth: 2,
                borderColor: theme.colors.faint,
                paddingLeft: 50,
                fontSize: 20,
                height: 60            
            },
            listView: {
                borderRadius: 10,
                borderWidth: 3,
                borderColor: theme.colors.faint,
                backgroundColor: 'white',

            },
            row: {
                borderRadius: 10,
                zIndex: 100
            },

            description: {
                fontFamily: 'Poppins_400Regular'
            }
        }}
        enablePoweredByContainer={false}
        fetchDetails
        onPress={(data, details ) => {
          // 'details' is provided when fetchDetails = true
        const region = {
            latitude: details.geometry.location.lat,
            longitude:details.geometry.location.lng,
        }
        callback({...data, ...details})
        animateToRegion(region);
        }}
        query={{
          key: 'GOOGLE_API_KEY',
          language: 'en',
          location: '40.501666, -74.450201',
          radius: '9000',
          strictbounds: true,
          types: 'geocode',

        }}
      />
    )

}
