

const TimeData = () => {
    var currentDate = new Date();

    // Extract individual components
    var hours = currentDate.getHours();
    var minutes = currentDate.getMinutes();
    var seconds = currentDate.getSeconds();
    var day = currentDate.getDate();
    var month = currentDate.getMonth() + 1; // Months are zero-based
    var year = currentDate.getFullYear();
    
    // Add leading zero if needed
    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    day = day < 10 ? "0" + day : day;
    month = month < 10 ? "0" + month : month;
    
    // Create the formatted string
    var formattedDateTime = hours + ":" + minutes + ":" + seconds + " " + day + "/" + month + "/" + year;

    return formattedDateTime;
    
    // Log the result to the console
    // console.log("Formatted Date and Time: " + formattedDateTime);
};

export default TimeData;