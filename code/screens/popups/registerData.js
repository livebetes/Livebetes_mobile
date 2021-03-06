import React from 'react';

import {Text, View, TouchableOpacity, TextInput} from 'react-native';

import Icon2 from 'react-native-vector-icons/Entypo';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon3 from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {AsyncStorage} from 'react-native';
import {calculateInsuline} from '../../calculation/simpleCalculation.js';
import {
  addDataToLocalDataBase,
  getData,
} from '../../dataManagement/localDataManager.js';
export default class RegisterData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      foodTextInputBorder: 'lightgray',
      bloodGlucoseBorder: 'lightgray',
      activity: [],
      walking: false,
      running: false,
      takeabus: false,
      bike: false,
      sleep: false,
      insuline: {foodInsuline: 0, correctionInsuline: 0},
      foodInsuline: 0,
      glucoseLevel: 0,
      correctionInsuline: 0,
      carbsTaken: 0,
      glucoseHistory: [],
    };
  }

  // glucoseHistory = [
  //   {"timeStamp":new Date() ,
  //   "bloodGlucoseLevel":100,
  //   "foodInCarbs":100,
  //   "foodInsuline":100,
  //   "correctionInsuline":100,
  //   "activitesDone":["walking"],
  //   "activitesToBeDone":["walking"],
  //   "predictionOfBloodGlucose":180,
  //   "carbsNeededToJustifyActivity": 10
  //   }
  // ]

  addToArray = (prevArray, newData) => {
    var newArray = [...prevArray, newData];

    //  prevArray.push(newData)
    this.setState({glucoseHistory: newArray});
    return JSON.stringify(newArray);
  };
  async UNSAFE_componentWillMount() {
    var glucoseHistory = await getData('glucoseHistory');
    glucoseHistory = JSON.parse(glucoseHistory);
    this.setState({glucoseHistory: glucoseHistory});
  }

  render() {
    return (
      <View
        style={{
          position: 'absolute',
          zIndex: 500,
          elevation: 400,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(54,54,54,0.8)',
          alignItems: 'center',
          top: 0,
          left: 0,
        }}>
        <View
          style={{
            backgroundColor: 'white',
            width: '80%',
            height: 550,
            alignSelf: 'center',
            top: '10%',
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            overflow: 'hidden',
          }}>
          <TouchableOpacity
            onPress={() => this.props.close()}
            style={{top: 5, right: 10, position: 'absolute', zIndex: 600}}>
            <Icon3 name={'closecircle'} size={23} color={'lightgray'} />
          </TouchableOpacity>
          <View
            style={{
              width: '100%',
              height: 40,
              backgroundColor: 'green',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Icon2
              name="drop"
              size={27}
              color={'lightgray'}
              style={{alignSelf: 'center'}}
            />
            <Text style={{fontSize: 'white', fontSize: 20, color: 'white'}}>
              Log your progress
            </Text>
          </View>
          <View
            style={{
              borderRadius: 10,
              flexDirection: 'row',
              backgroundColor: 'lightgray',
              alignSelf: 'center',
              margin: 10,
              width: '90%',
              borderColor: this.state.foodTextInputBorder,
              borderWidth: 2,
            }}>
            <Icon
              name={'food'}
              size={40}
              color={
                this.state.foodTextInputBorder == 'brown' ? 'brown' : 'gray'
              }
            />
            <TextInput
              keyboardType="numeric"
              onChangeText={text => {
                this.setState({carbsTaken: text}),
                  this.setState({
                    insuline: calculateInsuline(
                      this.state.glucoseLevel,
                      text,
                      {
                        walk: this.state.walking,
                        run: this.state.running,
                        bus: this.state.takeabus,
                        bike: this.state.bike,
                        sleep: this.state.sleep,
                      },
                      this.props.insulineToCarbRatio,
                      this.props.GlucoseToCarbRatio,
                    ),
                  });
              }}
              onFocus={() => {
                this.setState({foodTextInputBorder: 'brown'});
              }}
              onBlur={() => {
                this.setState({foodTextInputBorder: 'lightgray'});
              }}
              style={{width: '80%'}}>
              {' '}
            </TextInput>
          </View>
          <View
            style={{
              borderRadius: 10,
              flexDirection: 'row',
              backgroundColor: 'lightgray',
              alignSelf: 'center',
              margin: 10,
              width: '90%',
              borderColor: this.state.bloodGlucoseBorder,
              borderWidth: 2,
            }}>
            <Icon2
              name={'drop'}
              size={40}
              color={this.state.bloodGlucoseBorder == 'red' ? 'red' : 'gray'}
              style={{alignSelf: 'center'}}
            />
            <TextInput
              keyboardType="numeric"
              onChangeText={text => {
                this.setState({glucoseLevel: text}),
                  this.setState({
                    insuline: calculateInsuline(
                      text,
                      this.state.carbsTaken,
                      {
                        walk: this.state.walking,
                        run: this.state.running,
                        bus: this.state.takeabus,
                        bike: this.state.bike,
                        sleep: this.state.sleep,
                      },
                      this.props.insulineToCarbRatio,
                      this.props.GlucoseToCarbRatio,
                    ),
                  });
              }}
              onFocus={() => {
                this.setState({bloodGlucoseBorder: 'red'});
              }}
              onBlur={() => {
                this.setState({bloodGlucoseBorder: 'lightgray'});
              }}
              style={{width: '80%'}}>
              {' '}
            </TextInput>
          </View>
          <View
            style={{
              width: '90%',
              flexDirection: 'row',
              margin: 15,
              backgroundColor: 'white',
            }}>
            <TouchableOpacity
              onPress={() => {
                SugerHandler.addActivity(self, 'Walking'),
                  this.setState({
                    insuline: calculateInsuline(
                      this.state.glucoseLevel,
                      this.state.carbsTaken,
                      {
                        walk: !this.state.walking,
                        run: this.state.running,
                        bus: this.state.takeabus,
                        bike: this.state.bike,
                        sleep: this.state.sleep,
                      },
                      this.props.insulineToCarbRatio,
                      this.props.GlucoseToCarbRatio,
                    ),
                  });
              }}>
              <FontAwesome5
                name={'walking'}
                size={20}
                color={this.state.walking ? 'white' : 'black'}
                style={{
                  margin: 5,
                  backgroundColor: this.state.walking ? 'green' : 'lightgray',
                  borderWidth: 1,
                  borderColor: 'black',
                  padding: 15,
                  borderRadius: 10,
                }}
              />
              <Text style={{fontSize: 10, textAlign: 'center', color: 'black'}}>
                Walk
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                SugerHandler.addActivity(self, 'Run'),
                  this.setState({
                    insuline: calculateInsuline(
                      this.state.glucoseLevel,
                      this.state.carbsTaken,
                      {
                        walk: this.state.walking,
                        run: !this.state.running,
                        bus: this.state.takeabus,
                        bike: this.state.bike,
                        sleep: this.state.sleep,
                      },
                      this.props.insulineToCarbRatio,
                      this.props.GlucoseToCarbRatio,
                    ),
                  });
              }}>
              <FontAwesome5
                name={'running'}
                size={20}
                color={this.state.running ? 'white' : 'black'}
                style={{
                  margin: 5,
                  backgroundColor: this.state.running ? 'green' : 'lightgray',
                  borderWidth: 1,
                  borderColor: 'black',
                  padding: 15,
                  borderRadius: 10,
                }}
              />
              <Text style={{fontSize: 10, textAlign: 'center', color: 'black'}}>
                Run
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                SugerHandler.addActivity(self, 'Bus'),
                  this.setState({
                    insuline: calculateInsuline(
                      this.state.glucoseLevel,
                      this.state.carbsTaken,
                      {
                        walk: this.state.walking,
                        run: this.state.running,
                        bus: !this.state.takeabus,
                        bike: this.state.bike,
                        sleep: this.state.sleep,
                      },
                      this.props.insulineToCarbRatio,
                      this.props.GlucoseToCarbRatio,
                    ),
                  });
              }}>
              <FontAwesome5
                name={'bus'}
                size={20}
                color={this.state.takeabus ? 'white' : 'black'}
                style={{
                  margin: 5,
                  backgroundColor: this.state.takeabus ? 'green' : 'lightgray',
                  borderWidth: 1,
                  borderColor: 'black',
                  padding: 15,
                  borderRadius: 10,
                }}
              />
              <Text style={{fontSize: 10, textAlign: 'center', color: 'black'}}>
                Take a Bus
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                SugerHandler.addActivity(self, 'Bike'),
                  this.setState({
                    insuline: calculateInsuline(
                      this.state.glucoseLevel,
                      this.state.carbsTaken,
                      {
                        walk: this.state.walking,
                        run: this.state.running,
                        bus: this.state.takeabus,
                        bike: !this.state.bike,
                        sleep: this.state.sleep,
                      },
                      this.props.insulineToCarbRatio,
                      this.props.GlucoseToCarbRatio,
                    ),
                  });
              }}>
              <Icon
                name={'bike'}
                size={20}
                color={this.state.bike ? 'white' : 'black'}
                style={{
                  margin: 5,
                  backgroundColor: this.state.bike ? 'green' : 'lightgray',
                  borderWidth: 1,
                  borderColor: 'black',
                  padding: 15,
                  borderRadius: 10,
                }}
              />
              <Text style={{fontSize: 10, textAlign: 'center', color: 'black'}}>
                Bike
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                SugerHandler.addActivity(self, 'Sleep'),
                  this.setState({
                    insuline: calculateInsuline(
                      this.state.glucoseLevel,
                      this.state.carbsTaken,
                      {
                        walk: this.state.walking,
                        run: this.state.running,
                        bus: this.state.takeabus,
                        bike: this.state.bike,
                        sleep: !this.state.sleep,
                      },
                      this.props.insulineToCarbRatio,
                      this.props.GlucoseToCarbRatio,
                    ),
                  });
              }}>
              <Icon
                name={'sleep'}
                size={20}
                color={this.state.sleep ? 'white' : 'black'}
                style={{
                  margin: 5,
                  backgroundColor: this.state.sleep ? 'green' : 'lightgray',
                  borderWidth: 1,
                  borderColor: 'black',
                  padding: 15,
                  borderRadius: 10,
                }}
              />
              <Text style={{fontSize: 10, textAlign: 'center', color: 'black'}}>
                Sleep
              </Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              width: '90%',
              borderRadius: 10,
              flexDirection: 'row',
              margin: 15,
              backgroundColor: 'lightgray',
              padding: 10,
            }}>
            <Text style={{fontSize: 20}}>
              {'Food Insuline: ' + this.state.insuline.foodInsuline}
            </Text>
          </View>
          <View
            style={{
              borderRadius: 10,
              width: '90%',
              flexDirection: 'row',
              margin: 15,
              backgroundColor: 'lightgray',
              padding: 10,
              top: 0,
            }}>
            <Text style={{fontSize: 20}}>
              {'Correction Insuline: ' + this.state.insuline.correctionInsuline}
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => {
              console.log('........: ', this.state.glucoseHistory),
                addDataToLocalDataBase(
                  'glucoseHistory',
                  this.addToArray(
                    this.state.glucoseHistory,
                    SugerHandler.glucoseHistoryData(this),
                  ),
                ),
                this.props.updateGraph(),
                this.props.close();
            }}
            style={{
              borderRadius: 10,
              width: '90%',
              margin: 15,
              backgroundColor: 'green',
              alignItems: 'center',
              padding: 10,
              top: 0,
            }}>
            <Text style={{fontSize: 20, textAlign: 'center', color: 'white'}}>
              {'Log Data'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
