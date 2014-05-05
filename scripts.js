function dataLoaded(BIRDKILLINGS) {

	console.log(BIRDKILLINGS);
	console.log("First viz has loaded");
	//Create a loop that is a short cut straight to what we want to chart. First
	//start by creating a variable. We want to work with results (and from that, we want to plot count.)
	var myBirdKillingsData = BIRDKILLINGS.results;

	//Create an empty data array myDataArray in which to push all of my new data when I make an array of an array.
	var myBirdKillingsArray = [];

	//Add the headers of the dataArray so that I know what I am working with. In the case of Birdstrikes, I am working with
	//Data and Number of Birdstrikes
	var headerBirdKillingsArray = ["Date",  "Killings at Newark","Killings at JFK", "Killings at LGA", "Killings at Stewart", "Killings at Teterboro"];

	//Push the headers to myDataArray. So now the first "row" so to speak will be the headers Date and Number of Birdstrikes
	myBirdKillingsArray.push(headerBirdKillingsArray);

	//Now I create a loop that is an ARRAY of an ARRAY so that the google visualization will be able to read my data.
	//I have to specify the starting point, or the parameters of the for loop as well as the length of the loop and the
	//number of times to iterate. Then I create an object to work with in the loop and set my MENTIONS.results iterated
	//through this loop to the new variable currObj. Then I have to go into the attributes of each result of my json, and
	//pull out the date and the count of mentions. And then I push that to the empty (all but the headers) array I have
	//above. This will iterate until there are no more results in my json to go through and then it will stop.
	for (var i = 0; i < myBirdKillingsData.length; i++) {

		//You want to get whats in the observations based on its INDEX. Created reference to current object in list.
		var currObj = myBirdKillingsData[i];

		//Now create an array IN an array by taking each value from month and count and pushing to the array shell
		var currArray = [currObj.Date, currObj.EWR, currObj.JFK, currObj.LGA, currObj.SWF, currObj.TEB];

		//Pushing to the array shell above so that you're making into the larger array.
		myBirdKillingsArray.push(currArray);
	}
	//Just checing to see if myDataArray works!
	console.log(myBirdKillingsArray);

	//Now I feed data to visualization library. Whoot almost there!
	var data = google.visualization.arrayToDataTable(myBirdKillingsArray);

	//Create options object to add fanciness to the chart, like a title.
	var chartOptions = {
		title : "Number of Birdstrikes Date to Date"
	};

	//Now I tell it to create a line chart and give it a div that matches the index.html, meaning I should now go back and create
	//that div in my index.
	var myBirdKillingsChart = new google.visualization.LineChart(document.getElementById('myBirdKillingsChartDiv'));
	//Telling it to draw it using my data and using my options! Finished! So exciting!
	myBirdKillingsChart.draw(data, chartOptions);

}

function dataLoaded2(BIRDTYPES) {

	console.log("Second viz has loaded");
	console.log(BIRDTYPES);

	//Create a loop that is a short cut straight to what we want to chart. First
	//start by creating a variable. We want to work with results (and from that, we want to plot count.)
	var myBirdTypesData = BIRDTYPES.results;

	//Create an empty data array myDataArray in which to push all of my new data when I make an array of an array.
	var myBirdTypesArray = [];

	//Add the headers of the dataArray so that I know what I am working with. In the case of Birdstrikes, I am working with
	//Data and Number of Birdstrikes
	var headerBirdTypesArray = ["Bird Type", "Birds Killed in 2012", "Birds Killed in 2013"];

	//Push the headers to myDataArray. So now the first "row" so to speak will be the headers Date and Number of Birdstrikes
	myBirdTypesArray.push(headerBirdTypesArray);

	//Now I create a loop that is an ARRAY of an ARRAY so that the google visualization will be able to read my data.
	//I have to specify the starting point, or the parameters of the for loop as well as the length of the loop and the
	//number of times to iterate. Then I create an object to work with in the loop and set my MENTIONS.results iterated
	//through this loop to the new variable currObj. Then I have to go into the attributes of each result of my json, and
	//pull out the date and the count of mentions. And then I push that to the empty (all but the headers) array I have
	//above. This will iterate until there are no more results in my json to go through and then it will stop.
	for (var i = 0; i < myBirdTypesData.length; i++) {

		//You want to get whats in the observations based on its INDEX. Created reference to current object in list.
		var currObj = myBirdTypesData[i];

		//Now create an array IN an array by taking each value from month and count and pushing to the array shell
		var currArray = [currObj.birdType, currObj.numberKilled2012, currObj.numberKilled2013];

		//Pushing to the array shell above so that you're making into the larger array.
		myBirdTypesArray.push(currArray);
	}
	//Just checing to see if myDataArray works!
	console.log(myBirdTypesArray);

	//Now I feed data to visualization library. Whoot almost there!
	var data2 = google.visualization.arrayToDataTable(myBirdTypesArray);

	//Create options object to add fanciness to the chart, like a title.
	var chartOptions2 = {
		title : "Types of Birds Killed in 2012 and 2013"
	};

	//Now I tell it to create a line chart and give it a div that matches the index.html, meaning I should now go back and create
	//that div in my index.
	var myBirdKillingsChart2 = new google.visualization.ColumnChart(document.getElementById("ChartDiv2"));
	//Telling it to draw it using my data and using my options! Finished! So exciting!
	myBirdKillingsChart2.draw(data2, chartOptions2);

}

//Adding the googleLoaded function. This function will go and get my data and eventually display it on the page! :-)
function googleLoaded() {
	console.log("Google has loaded");

	//Time to load data with get function. This will tell my page to go and get this data set and use the function
	//dataLoaded to render it.
	$.get("daily_bird_kill_airport.json", dataLoaded, "json");

}

function googleLoaded2() {
	console.log("Google has loaded");

	//Time to load data with get function. This will tell my page to go and get this data set and use the function
	//dataLoaded to render it.
	$.get("types_birds_killings_fullyear.json", dataLoaded2, "json");

}


//Adding my new function pageLoaded and console logging to make sure that the pageLoaded function activates on
//document ready. This will eventually load my google visualization.
function pageLoaded() {

	//console log checks to make sure that page loaded works.
	console.log("Got to page loaded.");

	//Load the google visualization library with the callback googleLoaded. This will tell the browser to load the function
	//googleLoaded. This is using the google visualization script to work. But now I have to make sure that I have
	//my function googleLoaded working.
	google.load("visualization", "1", {
		packages : ["corechart"],
		callback : "googleLoaded"
	});
	google.load("visualization", "1", {
		packages : ["corechart"],
		callback : "googleLoaded2"
	});
}

//Adding my document ready to activate my pageLoaded function (which will activate the visualization).
$(document).ready(pageLoaded);

//Putting an end page console log just for double checking things.
console.log("This is the end page console log. Just for double checking things."); 