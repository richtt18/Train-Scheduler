

// Initialize Firebase
var config = {
	apiKey: "AIzaSyDIj5jrvAoPkw5wQnvsEbJwKhO-qTNgqpY",
	authDomain: "richtt18trainfire.firebaseapp.com",
	databaseURL: "https://richtt18trainfire.firebaseio.com",
	projectId: "richtt18trainfire",
	storageBucket: "richtt18trainfire.appspot.com",
	messagingSenderId: "118196749843"
};
	  	
firebase.initializeApp(config);

var database = firebase.database();

// Button for adding train
$("#add-train-btn").on("click", function(event) {
	event.preventDefault();

// Grabs user input
var trainName = $("#train-name-input").val().trim();
var trainDestination = $("#train-destination-input").val().trim();
var trainTime = moment($("#train-time-input").val().trim(), "HH:MM").format('X');
var trainFrequency = $("#train-frequency-input").val().trim();

 // Creates local "temporary" object for holding train data
  var newTrain = {
    name: trainName,
    destination: trainDestination,
    time: trainTime,
    frequency: trainFrequency,
  };

  // Uploads train data to the database
  database.ref().push(newTrain);

  // Logs everything to console
  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.time);
  console.log(newTrain.frequency);


 // Alert
  alert("Train successfully added");

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#train-destination-input").val("");
  $("#train-time-input").val("");
  $("#train-frequency-input").val("");


});


database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var trainDestination = childSnapshot.val().destination;
  var trainTime = childSnapshot.val().time;
  var trainFrequency = childSnapshot.val().frequency;

  // Train Info
  console.log(trainName);
  console.log(trainDestination);
  console.log(trainTime);
  console.log(trainFrequency);

  
  var trainTimePretty = moment.unix(trainTime).format("");


  // Add each train's data into the table
  $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" +
  trainTimePretty + "</td><td>" + trainFrequency + "</td></tr>" );
});
