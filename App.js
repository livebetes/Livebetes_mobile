/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React from 'react';
 import type {Node} from 'react';
 import {
   ImageBackground,
   SafeAreaView,
   ScrollView,
   StatusBar,
   StyleSheet,
   Text,
   useColorScheme,
   View,
   TouchableOpacity,
   Image,
   TextInput
 } from 'react-native';
 import {
   Colors,
   DebugInstructions,
   Header,
   LearnMoreLinks,
   ReloadInstructions,
 } from 'react-native/Libraries/NewAppScreen';
import Everything from './code/navigation.js';
import PushNotification from 'react-native-push-notification';


export default class Alls extends React.Component{
 
    componentWillMount(){
      // this.createChannels()
    }
    
     createChannels = () => { 
      PushNotification.createChannel({
        channelId: 'test-channel',
        channelName: ' test channel 2'
    
      })
    }
   render(){
   return(
  
  <Everything/>
 
   
   );
   }
 }

 
 
 const styles = StyleSheet.create({
   footer:{
     width: "100%",
     height: 50,
     backgroundColor:'lightgray',
     position:'absolute',
     bottom:0,
     margin:0,
     marginTop:-50,
     justifyContent:'center',
     flexDirection:'row',
   },
   allBody:{
     flex:1,
     width:"100%",
     justifyContent:'center'
   },
   middleBody:{
     width:"100%",
     height:"90%",
     backgroundColor:"white",
    zIndex:50,
     padding:0,
     position:"relative",
     top:0,
   },
   bigButton:{
     borderColor:'black',
     padding:20,
     width:"90%",
     height:200,
     margin:20, 
     borderRadius:15,
     marginBottom:5,
     borderColor:"black",
     backgroundColor:"gray",
   },
   header:{
     width:'100%',
     flexDirection: 'row',
     justifyContent: 'center',
     alignItems: 'center',
     height:70,
     position:'absolute',
     top:0,
     zIndex:1,
     elevation:1,
     backgroundColor: '#00000000'
     
   },
   labelForBigButton:{
     fontSize:28,
     color:"black",
     fontWeight:"700",
   },
   searchBar:{
     flex:1,
     paddingTop: 10,
     paddingRight: 10,
     paddingBottom: 10,
     paddingLeft: 5,
     backgroundColor: 'lightgray',
     color: '#424242',
     borderRadius:25,
     margin:10,
     position:'relative',
     zIndex:1,
     elevation:3,
    
   }
 
 });
 
 
 