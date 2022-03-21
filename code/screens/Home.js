import React from 'react';

import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {LineChart, PieChart} from 'react-native-chart-kit';
import {Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/Entypo';

import RegisterData from './popups/registerData.js';
const screenWidth = Dimensions.get('window').width;
import IndividualDataLog from './popups/individualDataLog.js';
import InsulineToCarbRatio from './popups/insulineToCarbRatio.js';
import GlucoseToInsulineRatio from './popups/glucoseToInsulineRatio.js';
import {
  addDataToLocalDataBase,
  getData,
  getAllKeys,
} from '../dataManagement/localDataManager.js';
// import PushNotification, {Importance} from 'react-native-push-notification';
import PushNotification from 'react-native-push-notification';

import {createIconSetFromFontello} from 'react-native-vector-icons';
import ChartHandler from '../handlers/chartHandler.js';
export default class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      glucoseHistory: false,
      glucoseHistoryData: [],
      glucoseToCarb: false,
      insulineToCarb: false,
      registerData: false,
      displayIndividualDataLog: false,
      insulineToCarbRatio: false,
      GlucoseToCarbRatio: false,
      glucoseToInsuline: false,
      sugerLevel: null,
      glucoseData: [],
      insulineToCarbRatioData: {insuline: '1', carb: '10'},
      glucoseToInsulineRatioData: {insuline: '1', glucose: 30},
      graphArray: [],
      graphArrayLoaded: false,
      graphWidth: 400,
      sugerDataIndex: 0,
      pieChartData: null,
    };
  }

  //when the app opens
  async UNSAFE_componentWillMount() {
    // Hanle the db for first time run
    initRun = new FirstTimeRunHandler();
    var graphArrayD = initRun.graphArrayD;
    var graphWidth = initRun.graphWidth;

    var registredInsulineToCarb = await getData('insulineToCarb');
    registredInsulineToCarb = JSON.parse(registredInsulineToCarb);
    this.setState({insulineToCarbRatioData: registredInsulineToCarb});

    var registredGlucoseToInsuline = await getData('glucoseToInsuline');
    registredGlucoseToInsuline = JSON.parse(registredGlucoseToInsuline);
    this.setState({glucoseToInsulineRatioData: registredGlucoseToInsuline});

    var glucoseHistory = await getData('glucoseHistory');
    glucoseHistory = JSON.parse(glucoseHistory);
    this.setState({glucoseHistoryData: glucoseHistory});
  }

  //1E1E1E

  fetchMoreDataAboutRecored = (recoredIndex, glucoseHistory) => {
    return glucoseHistory[recoredIndex];
  };

  closePopup = popUpName => {
    if (popUpName == 'InsulineToCarbRatio') {
      this.setState({insulineToCarbRatio: false});
    } else if (popUpName == 'IndividualDataLog') {
      this.setState({displayIndividualDataLog: false});
    } else if (popUpName == 'RegisterData') {
      this.setState({registerData: false});
    } else if (popUpName == 'GlucoseToCarbRatio') {
      this.setState({GlucoseToCarbRatio: false});
    }
  };

  closePopupIndividual = () => {
    this.setState({displayIndividualDataLog: false});
  };

  // Handlers doing there job

  handleNotification = () => {
    PushNotification.localNotification({
      channelId: 'test-channel',
      title: 'Insuline Reminder',
      message: "Don't forget to take insuline",
      vibrate: true, // (optional) default: true
      vibration: 300,
      visibility: 'public',
      color: 'red',
    });
  };

  render() {
    return (
      <View style={styles.all}>
        {/* this is a popup to register data  */}
        {this.state.registerData && (
          <RegisterData
            updateGraph={() => {
              ChartHandler.updateGraph(this);
            }}
            glucoseHistory={this.state.glucoseHistoryData}
            insulineToCarbRatio={this.state.insulineToCarbRatioData}
            GlucoseToCarbRatio={this.state.glucoseToInsulineRatioData}
            close={() => {
              this.closePopup('RegisterData');
            }}
          />
        )}

        {/* this is a popup to show log for an individual data loged  */}
        {this.state.displayIndividualDataLog && (
          <IndividualDataLog
            headerColor={this.state.individualDataLogHeaderColor}
            glucoseData={this.state.glucoseData}
            index={this.state.sugerDataIndex}
            sugerLevel={this.state.sugerLevel}
            close={() => {
              this.closePopup('IndividualDataLog');
            }}
          />
        )}

        {/* this is a popup to show insuline to carb ratio  */}
        {this.state.insulineToCarbRatio && (
          <InsulineToCarbRatio
            insuline={this.state.insulineToCarbRatioData.insuline}
            carb={this.state.insulineToCarbRatioData.carb}
            close={() => {
              this.closePopup('InsulineToCarbRatio');
            }}
          />
        )}

        {/* This is a popup to show insuline to carb ratio  */}
        {this.state.GlucoseToCarbRatio && (
          <GlucoseToInsulineRatio
            close={() => {
              this.closePopup('GlucoseToCarbRatio');
            }}
          />
        )}

        {/* this is a floating button to get to the registration popup  */}
        <TouchableOpacity
          onPress={() => {
            this.handleNotification(), this.setState({registerData: true});
          }}
          style={styles.hoveringButton}>
          <Icon2
            name="drop"
            size={30}
            color={'red'}
            style={{alignSelf: 'center'}}
          />
        </TouchableOpacity>
        {/* floating button ends here  */}

        {/* Main screen begins here  */}
        <ScrollView
          style={styles.parentScrollView}
          contentContainerStyle={{alignItems: 'center'}}>
          <View
            style={{
              flexDirection: 'row',
              height: 220,
              justifyContent: 'center',
              flexWrap: 'wrap',
              width: '100%',
            }}>
            {/* this displays insuline to carb ratio 
              and it also acts like a button for displying the popup */}
            <TouchableOpacity
              onPress={() => {
                this.setState({insulineToCarbRatio: true});
              }}
              style={styles.displayBox}>
              <View>
                <Text style={styles.footerText}>Insuline To Carb Ratio</Text>
                <Text style={styles.middleText}>
                  {this.state.insulineToCarbRatioData.carb +
                    '/' +
                    this.state.insulineToCarbRatioData.insuline}
                </Text>
                <Text
                  style={{fontSize: 10, color: 'gray', textAlign: 'center'}}>
                  carb gram / insuline unit
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.setState({GlucoseToCarbRatio: true});
              }}
              style={styles.displayBox}>
              <View>
                <Text style={styles.footerText}>Glucose To Insuline Ratio</Text>
                <Text style={styles.middleText}>
                  {this.state.glucoseToInsulineRatioData.glucose +
                    '/' +
                    this.state.glucoseToInsulineRatioData.insuline}
                </Text>
                <Text
                  style={{fontSize: 10, color: 'gray', textAlign: 'center'}}>
                  mg/dl / insuline unit
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.lineChartWrapper}>
            <ScrollView
              horizontal={true}
              ref={ref => {
                this.scrollView = ref;
              }}
              onContentSizeChange={() =>
                this.scrollView.scrollToEnd({animated: true})
              }>
              {console.log(
                'GRAPHQLDATA: ',
                JSON.stringify(this.state.graphArray),
              )}
              {this.state.graphArrayLoaded ? (
                <LineChart
                  data={this.state.graphArray}
                  width={this.state.graphWidth}
                  height={256}
                  verticalLabelRotation={30}
                  getDotColor={(dataPoint, dataPointIndex) => {
                    if (dataPoint >= 189) {
                      return 'red';
                    } else if (dataPoint <= 70) {
                      return 'blue';
                    } else {
                      return 'green';
                    }
                  }}
                  onDataPointClick={value => {
                    var dotColor = '';
                    dotColor = ColorHandler.selectHeaderColor(
                      value.dataset.data[value.index],
                    );
                    this.setState({
                      displayIndividualDataLog: true,
                      individualDataLogHeaderColor: dotColor,
                      sugerDataIndex: value.index,
                      sugerLevel: value.dataset.data[value.index],
                    });
                  }}
                  chartConfig={ChartHandler.configureChart}
                  fromZero={true}
                  bezier
                />
              ) : (
                <View
                  style={{
                    justifyContent: 'center',
                    width: screenWidth,
                    alignItems: 'center',
                  }}>
                  <ActivityIndicator
                    size="large"
                    color="green"
                    style={{justifyContent: 'center', alignSelf: 'center'}}
                  />
                </View>
              )}
            </ScrollView>
            <View style={styles.bulletIcon}>
              <Icon
                name="dot-circle-o"
                size={20}
                color="blue"
                style={{borderRadius: 2, borderColor: 'black'}}
              />
              <Text style={styles.bullet}>Low range of Glucose</Text>
            </View>
            <View style={styles.bulletIcon}>
              <Icon
                name="dot-circle-o"
                size={20}
                color="green"
                style={{borderRadius: 2, borderColor: 'black'}}
              />
              <Text style={styles.bullet}>Normal range of Glucose</Text>
            </View>
            <View style={styles.bulletIcon}>
              <Icon
                name="dot-circle-o"
                size={20}
                color="yellow"
                style={{borderRadius: 2, borderColor: 'black'}}
              />
              <Text style={styles.bullet}>Heigh range of Glucose</Text>
            </View>
            <View style={styles.bulletIcon}>
              <Icon
                name="dot-circle-o"
                size={20}
                color="red"
                style={{borderRadius: 2, borderColor: 'black'}}
              />
              <Text style={styles.bullet}>
                Extermily Heigh range of Glucose
              </Text>
            </View>
          </View>
          <View style={styles.pieCHartPrentWrapper}>
            <View style={style.pieChartHeader}>
              <Text style={{color: 'white', textAlign: 'center'}}>
                Prediction of blood sugar now
              </Text>
            </View>
            <Text style={styles.glucosePredictuionText}>180</Text>
          </View>
          <View style={styles.pieChartWrapper}>
            {this.state.graphArrayLoaded && (
              <PieChart
                data={this.state.pieChartData}
                width={screenWidth * 0.95}
                height={200}
                chartConfig={this.chartConfig}
                accessor={'population'}
                backgroundColor={'transparent'}
                paddingLeft={'15'}
                absolute
              />
            )}
          </View>
          <View style={{height: 100}}></View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  all: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
  },
  hoveringButton: {
    position: 'absolute',
    justifyContent: 'center',
    bottom: 40,
    right: 40,
    width: 60,
    height: 60,
    backgroundColor: 'green',
    borderRadius: 30,
    zIndex: 200,
    borderWidth: 2,
    borderColor: 'black',
  },
  parentScrollView: {
    position: 'relative',
    top: 0,
    left: 0,
    width: '100%',
  },
  displayBox: {
    width: '46%',
    height: 200,
    backgroundColor: '#1E1E1E',
    margin: 5,
    elevation: 100,
    borderRadius: 10,
    overflow: 'hidden',
  },
  footerText: {
    fontSize: 13,
    textAlign: 'center',
    color: '#1E1E1E',
    backgroundColor: 'green',
  },
  middleText: {
    fontSize: 60,
    margin: 20,
    fontWeight: '100',
    color: 'gray',
    textAlign: 'center',
  },
  lineChartWrapper: {
    width: '95%',
    height: 450,
    elevation: 10,
    backgroundColor: '#1E1E1E',
    marginTop: -5,
    borderRadius: 10,
    overflow: 'hidden',
  },
  bullet: {
    fontSize: 15,
    margin: 5,
    marginTop: 0,
    color: 'gray',
  },
  pieChartWrapper: {
    width: '95%',
    height: 200,
    backgroundColor: '#1E1E1E',
    borderWidth: 3,
    borderColor: 'green',
    borderRadius: 10,
  },
  glucosePredictuionText: {
    fontSize: 60,
    margin: 20,
    fontWeight: '100',
    color: 'darkgray',
    textAlign: 'center',
  },
  pieChartHeader: {
    position: 'relative',
    top: 0,
    width: '100%',
    height: 20,
    backgroundColor: 'green',
  },
  pieCHartPrentWrapper: {
    width: '100%',
    height: 150,
    backgroundColor: '#1E1E1E',
    width: '95%',
    margin: 10,
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'green',
  },
  bulletIcon: {margin: 5, flexDirection: 'row', width: '100%'},
});
