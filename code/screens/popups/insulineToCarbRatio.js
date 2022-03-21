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
            <View style={styles.parent}>

              <View style={styles.firstChild}>

              {/* popupHeader starts here  */}
              <View style={styles.popupHeader}>

                <Icon name="injection-syringe" size={30} color={'white'} style={{alignSelf:'center',padding:5}} />
                <Text style={styles.titleText}>Insuline to carb</Text>
                
                {/* closing button starts here  */}
                <TouchableOpacity onPress={()=>this.props.close()} style={styles.closeButton}>
                    <Icon2 name={"closecircle"} size={25} color={'lightgray'} />
                    </TouchableOpacity>
                    {/* closing button ends here  */}
                    
                </View>
                {/* popupHeader ends here  */}


                <View style={styles.textWrapperParent}>
                
                {/* this shows amoutn of insuline with in the ratio of insuline to carb  */}
                 <View style={styles.textWrapperFirstChild}>
                <Text style={styles.wrappedText}>Insuline</Text>
                <TextInput value={JSON.stringify(this.props.insuline)} style={styles.wrappedTextInput}></TextInput>
                 </View>
                {/* insuline indicator ends here  */}

                  {/* this shows amount of carb with in the ratio of insuline to carb  */}
                 <View style={styles.textWrapperFirstChild}>
                <Text style={styles.wrappedText}>Carb</Text>
                <TextInput value={JSON.stringify(this.props.carb)} 
               style={styles.wrappedTextInput}></TextInput>
                 </View>
                {/* carb indicator ends here  */}

                </View>

                {/* this button will calclulate the insuilne to carb ratio based on users data  */}
               <TouchableOpacity style={styles.calculateButton}>
                   <Text style={styles.calculateButtonText}>CALCULATE </Text></TouchableOpacity>
               </View>
               
            </View>
          );
      }
  }

  // onChangeText={(text) => {this.setState({carb:text});   var registredInsulineToCarb =  {"insuline":"1","carb":text};
  //  addDataToLocalDataBase("insulineToCarb",registredInsulineToCarb)}} 

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
      ,elevation:30
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
    },
    closeButton:{
      top:5
      ,right:10
      ,position:'absolute'
      ,zIndex:600
    },
    textWrapperParent:{
      flexDirection:'row'
      ,height:120
      ,margin:7
      ,position:'relative'
      ,top:0
      ,justifyContent:'center'
    },
    textWrapperFirstChild:{
      width:'45%'
      ,height:'95%'
      ,backgroundColor:'gray'
      ,margin:8
      ,flexDirection:'column'
      ,elevation:20
    },
    wrappedText:{
      fontSize:20
      ,textAlign:'center'
      ,color:'lightgray'
    },
    wrappedTextInput:{
      color:'lightgray'
      ,borderBottomWidth:1
      , width:'25%'
      ,alignSelf:'center'
      ,height:50
      ,top:5
      ,borderBottomColor:'lightgray'
      ,textAlign:'center'
      ,fontSize:25
    },
    calculateButton:{
      width:'91%'
      ,height:100
      ,backgroundColor:'darkgray'
      ,color:'lightgray'
      ,alignSelf:'center'
      ,top:12
    },
    calculateButtonText:{
      color:'lightgray'
      ,fontSize:30
      ,margin:20
      ,elevation:50
      , textAlign:'center'
    }

  });