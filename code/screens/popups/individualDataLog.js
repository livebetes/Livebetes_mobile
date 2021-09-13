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
  import Icon2 from 'react-native-vector-icons/Entypo';
  import Icon from 'react-native-vector-icons/AntDesign';
import RegisterData from './registerData';


  export default class IndividualDataLog extends React.Component {
      constructor(props){
          super(props)
          this.state = {
                regestrationDate: "",
                insulineTakenBefore: null,
                sugerLevel: null,
                insulineCorrection: null,
                foodInsuline: null,
                carbsEaten: null,
                activitesDone: null
          }
      }

       toReadableDate = (date) => {
        var date = new Date(date);
        date = date.toString().split(" ")[1] + " " + date.toString().split(" ")[2] + " " + date.toString().split(" ")[3];
        return date;
    }
    
      UNSAFE_componentWillMount(){


      }

      assignDataToState = (glucoseData,index)=>{

        this.setState({
          regestrationDate: this.toReadableDate(glucoseData[index].timeStamp),
          insulineTakenBefore: parseFloat(glucoseData[index].correctionInsuline) + parseFloat(glucoseData[index].foodInsuline)
        })
          
      }

      render(){
        console.log(this.props);
          return(
            <View style={{position:'absolute',zIndex:500,elevation:400, width:'100%',height:'100%',backgroundColor:'rgba(54,54,54,0.4)',alignItems:'center',top:0,left:0}}>
                <View style={{borderWidth:2,borderColor:this.props.headerColor,backgroundColor:'white',width:'80%',height:'80%',alignSelf:'center',top:"10%",borderTopLeftRadius:10,borderTopRightRadius:10,overflow:'hidden'}}>
                <TouchableOpacity onPress={()=>this.props.close()} style={{top:5,right:10,position:'absolute',zIndex:600}}><Icon name={"closecircle"} size={24} color={'lightgray'} /></TouchableOpacity>
                <View style={{width:'100%',height:40,backgroundColor:this.props.headerColor,flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                <Icon2 name="drop" size={27} color={'lightgray'} style={{alignSelf:'center'}} />
                <Text style={{fontSize:'white',fontSize:20,color:'white'}}>Loged Data</Text>
                </View> 
                <ScrollView> 
                <View style={{flexDirection:'row',margin:10,marginBottom:5, borderWidth:1,backgroundColor:this.props.headerColor,color:'white',padding:5}}>
                  <Text style={{fontSize:20,color:'white'}}>Date: </Text>
                  <Text style={{fontSize:15,color:'white',margin:5}}>Apr Monday 2021 </Text>
                </View>
                
                <View style={{flexDirection:'row',margin:10,marginBottom:5,borderWidth:1,backgroundColor:this.props.headerColor,color:'white',padding:5}}>
                  <Text style={{fontSize:20,color:'white'}}>Insuline Taken Before:</Text>
                  <Text style={{fontSize:15,color:'white',margin:5}}>2 units </Text>
                </View>

                <View style={{flexDirection:'row',margin:10,marginBottom:5,borderWidth:1,backgroundColor:this.props.headerColor,color:'white',padding:5}}>
                  <Text style={{fontSize:20,color:'white'}}>Suger Level: </Text>
                  <Text style={{fontSize:15,color:'white',margin:5}}>{this.props.sugerLevel} </Text>
                </View>

                <View style={{flexDirection:'row',margin:10,marginBottom:5,borderWidth:1,backgroundColor:"green",color:'white',padding:5}}>
                  <Text style={{fontSize:20,color:'white'}}>Insuline Correction:</Text>
                  <Text style={{fontSize:15,color:'white',margin:5}}>2 units </Text>
                </View>
                
                <View style={{flexDirection:'row',margin:10,marginBottom:5,borderWidth:1,backgroundColor:"green",color:'white',padding:5}}>
                  <Text style={{fontSize:20,color:'white'}}>Carbs Eaten:</Text>
                  <Text style={{fontSize:15,color:'white',margin:5}}>54 carb Gram </Text>
                </View>

                <View style={{flexDirection:'row',margin:10,marginBottom:5,borderWidth:1,backgroundColor:"green",color:'white',padding:5}}>
                  <Text style={{fontSize:20,color:'white'}}>Activites Done:</Text>
                  <ScrollView horizontal={true}> 
                  <Text style={{fontSize:15,color:'white',margin:5}}>Walking,Running,working </Text>
                  </ScrollView>
                </View>
              
                </ScrollView>
                </View>

            </View>
          );
      }
  }