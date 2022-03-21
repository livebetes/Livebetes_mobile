class ColorHandler{
    
    function 
    selectHeaderColor(sugerLevel) {
        if(sugerLevel < 70){
            return "blue";
          }else if(sugerLevel >= 70 && sugerLevel <= 170){
            return "green";
          }else if(sugerLevel > 170){
            return "red";
          }
          return "red";
    }
}