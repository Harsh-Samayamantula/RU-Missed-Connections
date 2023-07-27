import React, { useContext} from 'react';
import { Dimensions, StyleSheet,View, FlatList } from 'react-native';
import { Poppins_400Regular, Poppins_400Regular_Italic, Poppins_500Medium, useFonts } from '@expo-google-fonts/poppins';
import AppLoading from 'expo-app-loading';
import IconButton from '../components/IconButton';
import { ThemeContext } from '../App';

import Post from "../components/Post"
import axios from 'axios';

export default function PostsFeedFullScreen({ navigation }) {

    const theme = useContext(ThemeContext)
    const styles = createStyles(theme)
    let [fontsLoaded] = useFonts({
        Poppins_500Medium,
        Poppins_400Regular,
        Poppins_400Regular_Italic
    });
    if (!fontsLoaded) return <AppLoading />



    /**
     * Generate mock post data. In the future this should fetch the backend for a list of relevant posts depending on the original post that the user clicked.
     */


    const posts = [
        {key: 0, campus: 'livingston',location: 'Livingston Student Center', date: 'Yesterday',textContent:"We met Wednesday morning at the train station!!! You're a sophomore, bio major but thinking about going into education and I'm a freshman poli sci major! You had a mask on that said Rogan upside down with I think an alien? You were trying to go to the airport. You were so frickn nice and our conversation actually stopped me from having an anxiety attack. The train came and I was so worried about getting on I didn't get to say goodbye, I thought you were also boarding but I lost sight of you 41) I never got your name and I regret it es 0-4 pls hmu you seemed so cool"}, 
        {key: 1, campus: 'collegeAve',location: 'College Avenue Student Center', date: 'Dec 16',textContent: "To the guy with brown fluffy hair who dropped a bowl at Brower on 11/15, the bowl was LOUD, you look really cute though so I hope you're single 👀"},
        {key: 2,campus: 'cookDoug',location: 'douglass Student Center', date: 'Two days ago',textContent: "to the Asian girl with the black mas who was on the REXB in the morning, I regret not going up to talk to you when the bus driver left and we were pretty musch the  last two on the bus. But anyways hmu cuz ur pretty cute 😉"},
        {key: 3,campus: 'busch',location: 'Werblin Recreation Center, Sonny A.', date: 'Feb 14', textContent: "Met a super awesome guy in science class... hmu"},
        {key: 4,campus: 'busch',location: 'Busch Student Center', date: '2:30pm', textContent: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusantium quidem provident accusamus tenetur delectus soluta perferendis odit sit. Assumenda et distinctio ducimus, voluptatibus enim quo repudiandae saepe dolorum. Odit, maiores?Zepi dolor sit, amet consectetur adipisicing elit. Accusantium quidem provident accusamus tenetur delectus soluta perferendis odit sit. Assumenda et distinctio ducimus, voluptatibus enim quo repudiandae saepe dolorum. Odit?Zepi dolor sit, amet consectetur adipisicing elit. Accusantium quidem provident accusamus tenetur delectus soluta perferendis odit sit. Assumenda et distinctio ducimus, voluptatibus enim quo repudiandae saepe dolorum. OditZepi dolor sit, amet consectetur adipisicing elit. Accusantium quidem provident accusamus tenetur delectus soluta perferendis odit sit. Assumenda et distinctio ducimus, voluptatibus enim quo repudiandae saepe dolorum. Odit"}
    ]

    const campuses = ["livingston","busch","cookDoug","collegeAve"]
    axios.get("http://172.31.52.254:3000/api/posts")
    .then(resp => resp.data)
    .then(data => {
        for (let i = 0; data[i]; i++){
            console.log(data[i])
            posts[posts.length] = {
                key: posts.length,
                campus: (data[i].campus > -1 ? campuses[data[i].campus] : "busch"),
                location: data[i].location,
                textContent: data[i].content
            }
        }
    })

    return (
         
            <FlatList 
                data = {posts}
                pagingEnabled
                renderItem = {({item, index}) => <Post key = {index} campus = {item.campus} location = {item.location} date = {item.date} textContent = {item.textContent}/>}
                showsVerticalScrollIndicator = {false}
                decelerationRate= "normal"
                disableIntervalMomentum
                 
            />


        // <> 
        //     <PostFullScreen textContent= "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusantium quidem provident accusamus tenetur delectus soluta perferendis odit sit. Assumenda et distinctio ducimus, voluptatibus enim quo repudiandae saepe dolorum. Odit, maiores?Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusantium quidem provident accusamus tenetur delectus soluta perferendis odit sit. Assumenda et distinctio ducimus, voluptatibus enim quo repudiandae saepe dolorum. Odit, maiores?" />
        // </>
    )
}


const createStyles = (theme) => (
    StyleSheet.create({    })
)