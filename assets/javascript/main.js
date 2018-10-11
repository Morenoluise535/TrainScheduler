$( document ).ready(function() {

    var config = {
        apiKey: "AIzaSyBc42U2yJ0yRIp5KnYRBrtslMilGIc7QE0",
        authDomain: "homeworkweek7-4f727.firebaseapp.com",
        databaseURL: "https://homeworkweek7-4f727.firebaseio.com",
        projectId: "homeworkweek7-4f727",
        storageBucket: "homeworkweek7-4f727.appspot.com",
        messagingSenderId: "362423862501"
      };
      firebase.initializeApp(config);



        var trainName = "";
        var destination = "";
        var fTrainTime = "";
        var frequency = "";
        var nextArrival = "";
        var minutesAway = "";

        $("#submit-btn").on("click", function(event){
            debugger
        event.preventDefault();

        trainName = $("#name-train").val().trim();
        destination = $("#destination").val().trim();
        fTrainTime = $("#first-train").val().trim();
        frequency = $("#frequency").val().trim();

        $("#name-train").val("");
        $("#destination").val("");
        $("#first-train").val("");
        $("#frequency").val("");

        database.ref().push({
            trainName: trainName,
            destination: destination,
            fTrainTime: fTrainTime,
            frequency: frequency,
            dateAdded: firebase.database.ServerValue.TIMESTAMP
        });

        });

        dataRef.ref().on("child_added", function(childSnapshot) {
        var currentTime = moment().format("HH:mm");
        var startTime = childSnapshot.val().fTrainTime;

        var splitting = startTime.split(":");
        var newtime = (parseInt(splitting[0])*60) + parseInt(splitting[1]);
        var splitCurrent = currentTime.split(":");
        var newCurrentTime = (parseInt(splitCurrent[0])*60) + parseInt(splitCurrent[1]);
        var dif = newCurrentTime - newtime;
        var freq = parseInt(childSnapshot.val().frequency);
        var roundup = Math.ceil(dif/freq);
        var numTrain = dif/freq;
        var nextTrain = newtime +(roundup*freq);
        var timeLeft = Math.round((roundup - numTrain)*freq);
        var minNextTrain = nextTrain % 60;
        var hrNextTrain = nextTrain/60;
        var nextArrival = moment.utc().hours(hrNextTrain).minutes(minNextTrain).format("HH:mm");


        var tableRow = $("<tr>");
        tableRow.attr("data-key", childSnapshot.key);
        var tableName = $("<td>"+childSnapshot.val().trainName+"</td>");
        var tableDesination = $("<td>"+childSnapshot.val().destinationName+"</td>");
        var tableFrequency = $("<td>"+childSnapshot.val().frequency+"</td>");
        var tableNextArrival = $("<td>"+nextArrival+"</td>");
        var tableMinAway = $("<td>"+timeLeft+"</td>");
        tableRow.append(tableName,tableDesination,tableFrequency,tableNextArrival,tableMinAway);
        $("tbody").append(tableRow);

            })
})