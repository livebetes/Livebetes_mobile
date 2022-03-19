import React from 'react';

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
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
  } from "react-native-chart-kit";
  import Icon2 from 'react-native-vector-icons/AntDesign';
  import Icon from 'react-native-vector-icons/Fontisto';
  import {addDataToLocalDataBase,getData,getAllKeys} from '../../dataManagement/localDataManager.js';

  export default class InsulineToCarbRatio extends React.Component{
      constructor(props){
          super(props)
          this.state = {
                  carb: 0
          }
      }

      render(){
          return(
            <View style={{position:'absolute',zIndex:500,elevation:400, width:'100%',height:'100%',backgroundColor:'rgba(54,54,54,0.8)',alignItems:'center',top:0,left:0}}>
              <View style={{backgroundColor:'white',width:'80%',height:320,alignSelf:'center',top:"20%",overflow:'hidden',elevation:30}}>
              <View style={{width:'100%',height:40,backgroundColor:'green',flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                <Icon name="injection-syringe" size={30} color={'white'} style={{alignSelf:'center',padding:5}} />
                <Text style={{fontSize:'white',fontSize:20,color:'white'}}>Insuline to carb</Text>
                <TouchableOpacity onPress={()=>this.props.close()} style={{top:5,right:10,position:'absolute',zIndex:600}}>
                    <Icon2 name={"closecircle"} size={25} color={'lightgray'} />
                    </TouchableOpacity>
                </View> 
                <View style={{flexDirection:'row',height:120,margin:7,position:'relative',top:0,justifyContent:'center'}}>
                 <View style={{width:'45%',height:'95%',backgroundColor:'#1E1E1E',margin:8,flexDirection:'column',elevation:20}}>
                <Text style={{fontSize:20,textAlign:'center',color:'lightgray'}}>Insuline</Text>
                <TextInput value={JSON.stringify(this.props.insuline)} style={{color:'lightgray',borderBottomWidth:1, width:'25%',alignSelf:'center',height:50,top:5,borderBottomColor:'lightgray',textAlign:'center',fontSize:25}}></TextInput>
                 </View>
                 <View style={{width:'45%',height:'95%',backgroundColor:'#1E1E1E',margin:8,flexDirection:'column',elevation:20}}>
                <Text style={{fontSize:20,textAlign:'center',color:'lightgray'}}>Carb</Text>
                <TextInput value={JSON.stringify(this.props.carb)} 
               style={{color:'lightgray',borderBottomWidth:1, width:'25%',alignSelf:'center',height:50,top:5,borderBottomColor:'lightgray',textAlign:'center',fontSize:25}}></TextInput>
                 </View>
                </View>
               <TouchableOpacity style={{width:'91%',height:100,backgroundColor:'#1E1E1E',color:'lightgray',alignSelf:'center',top:12}}>
                   <Text style={{color:'lightgray',fontSize:30,margin:20,elevation:50, textAlign:'center'}}>CALCULATE </Text></TouchableOpacity>

               </View>
            </View>
          );
      }
  }

  // onChangeText={(text) => {this.setState({carb:text});   var registredInsulineToCarb =  {"insuline":"1","carb":text};
  //  addDataToLocalDataBase("insulineToCarb",registredInsulineToCarb)}} 