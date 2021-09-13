



export const calculateInsuline = (glucoseLevel,carbsTaken,activitiesToDo,insulineToCarbRatio,glucoseToCarbRatio) => {
        // foodInsuline = (carbsTaken * insulineToCarbRatio.insuline) / (insulineToCarbRatio.carb * )
        // 1 = 10
        // insu     = carb 
        // 1 * carb / insuline * 10 
       var foodInsuline = insulineToCarbRatio.insuline * carbsTaken / insulineToCarbRatio.carb;

       var correctionInsuline  =  glucoseToCarbRatio.insuline * glucoseLevel / glucoseToCarbRatio.glucose;
       if(glucoseLevel >= 80 && glucoseLevel <= 110){
        correctionInsuline  =  0;

       }else if(glucoseLevel < 80){
        correctionInsuline = 0;
       }else{
        glucoseLevel = glucoseLevel - 110;
        correctionInsuline  =  glucoseToCarbRatio.insuline * glucoseLevel / glucoseToCarbRatio.glucose;
               
       }
       if(carbsTaken > 0){
               if(foodInsuline > 0){
                          
                    activitiesToDo.run == true ? foodInsuline >= 2? foodInsuline -= 2 : correctionInsuline >=2 ? correctionInsuline -= 2 : "" :"" ;
                    activitiesToDo.walk == true ? foodInsuline >= 1? foodInsuline-- :correctionInsuline >=1 ? correctionInsuline--: "" : "";
                    activitiesToDo.bus == true ? foodInsuline >= 1? foodInsuline-- :correctionInsuline >=1 ? correctionInsuline--: "" : "";
                    activitiesToDo.bike == true ? foodInsuline >= 2? foodInsuline -= 2 : correctionInsuline >=2 ? correctionInsuline -= 2 : "" :"" ;
                    activitiesToDo.sleep == true ? foodInsuline >= 1? foodInsuline-- :correctionInsuline >=1 ? correctionInsuline--: "" : "";
                    }            
        }
        


       return {"correctionInsuline": removeRepeatingDecimal(correctionInsuline),
                "foodInsuline": removeRepeatingDecimal(foodInsuline),
                "carbsNeededToJustifyActivity": removeRepeatingDecimal(foodInsuline) };
        

}

const removeRepeatingDecimal = (insulineLevel) => {
       
        return insulineLevel.toFixed(1);
}