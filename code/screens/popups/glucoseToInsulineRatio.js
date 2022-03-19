import React from 'react';

import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput
  } from 'react-native';

  import Icon2 from 'react-native-vector-icons/AntDesign';
  import Icon from 'react-native-vector-icons/FontAwesome5';
  export default class GlucoseToInsulineRatio extends React.Component{
      constructor(props){
          super(props)
          this.state = {

          }
      }

      render(){
          return(
            <View style={styles.parent}>
              {/* The parent is a semi transparent screen that takes 100% of the screen */}

              <View style={styles.firstChild}>
             
              <View style={styles.popupHeader}>
                
          
                <Icon name="syringe" size={30} color={'white'} style={{alignSelf:'center',padding:5}} />
                
                <Text style={styles.titleText}>Glucose to insuline</Text>
                
                <TouchableOpacity onPress={()=>this.props.close()} style={{top:5,right:10,position:'absolute',zIndex:600}}>
                    <Icon2 name={"closecircle"} size={25} color={'darkgray'} />
                    </TouchableOpacity>
                </View> 
                <View style={{flexDirection:'row',height:120,margin:7,position:'relative',top:0,justifyContent:'center'}}>
                 <View style={{width:'45%',height:'95%',backgroundColor:'gray',margin:8,flexDirection:'column',elevation:20}}>
                <Text style={{fontSize:20,textAlign:'center',color:'lightgray'}}>Glucose</Text>
                <TextInput style={{color:'lightgray',borderBottomWidth:1, width:'25%',alignSelf:'center',height:50,top:5,borderBottomColor:'lightgray',textAlign:'center',fontSize:25}}></TextInput>
                 </View>
                 <View style={{width:'45%',height:'95%',backgroundColor:'gray',margin:8,flexDirection:'column',elevation:20}}>
                <Text style={{fontSize:20,textAlign:'center',color:'lightgray'}}>Insuline</Text>
                <TextInput style={{color:'lightgray',borderBottomWidth:1, width:'25%',alignSelf:'center',height:50,top:5,borderBottomColor:'lightgray',textAlign:'center',fontSize:25}}></TextInput>
                 </View>
                </View>
               <TouchableOpacity style={{width:'91%',height:100,backgroundColor:'darkgray',color:'lightgray',alignSelf:'center',top:12}}>
                   <Text style={{color:'lightgray',fontSize:30,margin:20,elevation:50, textAlign:'center'}}>CALCULATE </Text></TouchableOpacity>

               </View>
            </View>
          );
      }
  }

    const styles = StyleSheet.create({
      parent:{
        position:'absolute'
        ,zIndex:500
        ,elevation:400
        , width:'100%'
        ,height:'100%'
        ,backgroundColor:'rgba(54,54,54,0.4)',alignItems:'center',top:0,left:0
      },
      firstChild:{
        backgroundColor:'white'
        ,width:'80%'
        ,height:'40%'
        ,alignSelf:'center'
        ,top:"20%"
        ,overflow:'hidden'
        ,elevation:30}
      },
      popupHeader:{
        width:'100%'
        ,height:40
        ,backgroundColor:'green'
        ,flexDirection:'row'
        ,alignItems:'center'
        ,justifyContent:'center'
      },
      titleText:{
        fontSize:'white',
        fontSize:20,
        color:'white'
      }
      
    });