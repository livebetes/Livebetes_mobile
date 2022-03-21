import DateHandler from './dateHandler';
export default class ChartHandler {
  function;
  configureChart() {
    return {
      backgroundGradientFrom: 'gray',
      backgroundGradientFromOpacity: 1,
      backgroundGradientTo: 'black',
      backgroundGradientToOpacity: 1,
      color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
      strokeWidth: 2, // optional, default 3
      barPercentage: 0.5,
      useShadowColorFromDataset: false, // optional
      propsForDots: {
        r: '10',
        strokeWidth: '2',
        stroke: '#ffa726',
      },
    };
  }

  function;
  createModleForGraph(labels, data) {
    var newData = [];
    var newLabels = [];
    data.forEach(data => {
      newData = [...newData, parseInt(data)];
    });

    labels.forEach(labels => {
      newLabels = [...newLabels, DateHandler.toHumanDate(labels)];
    });
    datas = {
      labels: newLabels,
      datasets: [
        {
          data: newData,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // optional
          strokeWidth: 10, // optional
        },
      ],
      legend: ['Glucose History'], // optional
    };

    return datas;
  }

  function;
  creatPieDataModle(datas) {
    var heighCount = 0;
    var normalCount = 0;
    var lowCount = 0;
    datas.forEach(data => {
      data = parseInt(data);
      if (data >= 181) {
        heighCount++;
      } else if (data <= 180 && data >= 80) {
        normalCount++;
      } else if (data < 80) {
        lowCount++;
      }
    });

    var pieData = [
      {
        name: 'heigh',
        population: heighCount,
        color: 'red',
        legendFontColor: 'gray',
        legendFontSize: 15,
      },
      {
        name: 'low',
        population: lowCount,
        color: 'blue',
        legendFontColor: 'gray',
        legendFontSize: 15,
      },
      {
        name: 'normal',
        population: normalCount,
        color: 'green',
        legendFontColor: 'gray',
        legendFontSize: 15,
      },
    ];

    return pieData;
  }

  function;
  createAnArrayForTheGraph(glucoseHistory) {
    var data = [];
    var date = [];
    glucoseHistory.forEach((recored, index) => {
      (data[index] = recored.bloodGlucoseLevel),
        (date[index] = recored.timeStamp);
    });
    return {data: data, labels: date};
  }

  function;
  updateGraph(self) {
    getData('glucoseHistory').then(data => {
      var graphArrayD = ChartHandler.createAnArrayForTheGraph(JSON.parse(data));
      var graphWidth = (graphArrayD.data.length / 4) * 400;
      var graphColor = (opacity = 1) => `rgba(0, 0, 0, ${opacity})`;

      if (graphArrayD.data.length > 4) {
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
  }
}

// pieData = [
//   {
//     name: "heigh",
//     population: 10,
//     color: "red",
//     legendFontColor: "gray",
//     legendFontSize: 15
//   },
//   {
//     name: "low",
//     population: 20,
//     color: "blue",
//     legendFontColor: "gray",
//     legendFontSize: 15
//   },
//   {
//     name: "normal",
//     population: 30,
//     color: "green",
//     legendFontColor: "gray",
//     legendFontSize: 15
//   }
// ]

//insulineToCarb
//glucoseToCarb
//glucoseHistory
//predictionOfBloodGlucose

/*
glucoseHistory = [
  {timeStamp:null ,
  bloodGlucoseLevel:null,
  foodInCarbs:null,
  foodInsuline:nulll,
  correctionInsuline:null,
  activitesDone:[""],
  activitesToBeDone:[""],
  predictionOfBloodGlucose:null,
  carbsNeededToJustifyActivity: 
  }
]

    */

// data = {
//   labels: [
//     '6:00am',
//     '12:00 pm',
//     '6:00 pm',
//     '12:00 am',
//     '6:00 am',
//     '12:00 pm',
//   ],
//   datasets: [
//     {
//       data: [90, 45, 88, 400, 209, 103],
//       color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // optional
//       strokeWidth: 10, // optional
//     },
//   ],
//   legend: ['Glucose History'], // optional
// };
