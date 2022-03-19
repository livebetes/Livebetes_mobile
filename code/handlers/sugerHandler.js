class SugerHandler {
  function;
  isActivityDone(activites, activity) {
    activites.forEach(activ => {
      if (activity == activ) {
        this.setState({walking: 'green'});
      }
    });
    return 'lightgray';
  }

  function;
  addActivity(self, activity) {
    if (activity == 'Walking') {
      self.setState({walking: !self.state.walking});
    } else if (activity == 'Run') {
      self.setState({running: !self.state.running});
    } else if (activity == 'Bus') {
      self.setState({takeabus: !self.state.takeabus});
    } else if (activity == 'Bike') {
      self.setState({bike: !self.state.bike});
    } else if (activity == 'Sleep') {
      self.setState({sleep: !self.state.sleep});
    }
  }

  function;
  glucoseHistoryData(self) {
    var glucoseHistory = {
      timeStamp: new Date(),
      bloodGlucoseLevel: self.state.glucoseLevel,
      foodInCarbs: self.state.foodInCarbs,
      foodInsuline: self.state.insuline.foodInCarbs,
      correctionInsuline: self.state.insuline.correctionInsuline,
      activitesDone: {
        walk: self.state.walking,
        run: self.state.running,
        bus: self.state.takeabus,
        bike: self.state.bike,
        sleep: self.state.sleep,
      },
      activitesToBeDone: {},
      predictionOfBloodGlucose: 0,
      carbsNeededToJustifyActivity: 0,
    };

    return glucoseHistory;
  }
}
