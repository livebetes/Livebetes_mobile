class DateHandler{

    function 
    toHumanDate(date) {
        var date = new Date(date);
        date = date.toString().split(" ")[1] + " " + date.toString().split(" ")[2] + " " + date.toString().split(" ")[3];
        return date;
    }
}