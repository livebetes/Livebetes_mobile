import {
  getAllKeys,
  getData,
  addDataToLocalDataBase,
} from '../dataManagement/localDataManager';
import ChartHandler from './chartHandler';
class FirstTimeRunHandler {
  constructor(self) {
    var graphArrayD;
    var graphWidth;
    var keys = await getAllKeys();

    //get the glucose history data and then loop it
    //and then calculate the width of the graph based on the number of glucose history registred
    getData('glucoseHistory').then(data => {
      graphArrayD = ChartHandler.createAnArrayForTheGraph(JSON.parse(data));
      graphWidth = (graphArrayD.data.length / 4) * 400;

      var graphColor = (opacity = 1) => `rgba(0, 0, 0, ${opacity})`;

      //if the data is greater than 4 self will use the calculated width for the scroll bar
      if (graphArrayD.data.length > 4) {
        console.log('data edata');
        self.setState({
          graphArrayLoaded: true,
          glucoseData: data,
          graphWidth: graphWidth,
          graphArray: ChartHandler.createModleForGraph(
            graphArrayD.labels,
            graphArrayD.data,
          ),
          pieChartData: ChartHandler.creatPieDataModle(graphArrayD.data),
        });
      } else if (graphArrayD.data.length == 0) {
        //do nothing
      } else {
        self.setState({
          graphArrayLoaded: true,
          glucoseData: data,
          graphWidth: 400,
          graphArray: ChartHandler.createModleForGraph(
            graphArrayD.labels,
            graphArrayD.data,
          ),
          pieChartData: ChartHandler.creatPieDataModle(graphArrayD.data),
        });
      }
    });

    //asigning first time
    keys.forEach(key => {
      if (key == 'insulineToCarb') {
        self.setState({insulineToCarb: true});
      } else if (key == 'glucoseToInsuline') {
        self.setState({glucoseToInsuline: true});
      } else if (key == 'glucoseHistory') {
        self.setState({glucoseHistory: true});
      }
    });

    if (!self.state.insulineToCarb) {
      //assign default value if there is no given insuline to carb ratio
      var insulineToCarbTemp = {insuline: 1, carb: 5};
      insulineToCarbTemp = JSON.stringify(insulineToCarbTemp);
      addDataToLocalDataBase('insulineToCarb', insulineToCarbTemp);
    }
    if (!self.state.glucoseToInsuline) {
      var GlucoseToInsulineRatioTemp = {insuline: 1, glucose: 15};
      GlucoseToInsulineRatioTemp = JSON.stringify(GlucoseToInsulineRatioTemp);
      addDataToLocalDataBase('glucoseToInsuline', GlucoseToInsulineRatioTemp);
    }
    if (!self.state.glucoseHistory) {
      addDataToLocalDataBase('glucoseHistory', '[]');
    }
  }
}
