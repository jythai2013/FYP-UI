function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    url = url;
    name = name.replace(/[\[\]]/g, "\\$&").toString();
		//console.log(name);
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
		//console.log(results);
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

Template.courseLSPForm.onRendered(function(){
	var cLSP = getParameterByName("cLSP");
	if(cLSP.length > 0) Session.set("currentCourseIDLSPForm2", cLSP);
	var lspid = getParameterByName("LSPformID");
	Session.set("currentLSPIdLSPForm2", lspid);
	var theLSP = LSPSurvey.findOne({_id:lspid});
	cLSP = theLSP.courseId;
	if(cLSP.length > 0) Session.set("currentCourseIDLSPForm2", cLSP);
});

Template.courseLSPRatings.helpers({
	"averageRating":function(){
		//console.log(this);
		var sum = 0;
		var num = 0;
		for(i=0;i<this.options.length;i++){
			num += this.options[i];
			sum += this.options[i]*(i+1);
		}
		//console.log("sum = " + sum);
		//console.log("num = " + num);
		var res = sum/num;
		if (isNaN(res)) res = "-";
		return res;
	},
	
	"test":function(a){
		console.log(this);
		console.log(a);
		
		//calculate averageRating
		var sum = 0;
		var num = 0;
		for(i=0;i<this.options.length;i++){
			num += this.options[i];
			sum += this.options[i]*(i+1);
		}
		//console.log("sum = " + sum);
		//console.log("num = " + num);
		var avg = sum/num;
		
		
		
		var res = "";
		for(i=0;i<a.length;i++){
			if(Math.round(avg) == (i+1)){
				i=i+1;
				res += '<input type="radio" id="optradio" name="qnOptions'+this.qnID+'" value="'+i+'" checked="checked">'+i;
			} else{
				res += '<input type="radio" id="optradio" name="qnOptions'+this.qnID+'" value="'+i+'">'+i;
			}
		}
		
		return Spacebars.SafeString(res);
	},
	
	"toBeChecked":function(a){
		console.log(this);
		console.log(a);
		return true;
	}
});

Template.courseLSPForm.helpers({
	"courseLSPQns":function(){
		var courseId = Session.get("currentCourseIDLSPForm2");
		var theCourse = Courses.findOne({_id:courseId});
		var courseCode = theCourse.courseCode;
		var feedbackAnswerObj = FeedbackAnswers.findOne({assessedOn:courseCode});
		console.log(feedbackAnswerObj);
		return feedbackAnswerObj.options
	},
	
	"courseTrainers2":function(){
		// console.log(this);
		var CT = this.courseTrainers;
		var returnString = "";
		if(Array.isArray(CT)){
			CT.forEach(function(a,b,c){
				var name = Meteor.users.findOne({_id:a.trainerID}).fullName;
				returnString += name + ", "
			});
			returnString = returnString.substring(0, returnString.length - 2);
		} else if(typeof CT == "string"){
			returnString = CT
		}
		return returnString;
	},
	
	"loggedInUsersName":function(){
		return Meteor.user().fullName;
	},
	
	"courseTotalClass":function(){
		//currently returning nothing. no idea why =.=
		var courseID = Session.get("currentCourseIDLSPForm2");
		console.log(courseID);
		var theCourse = Courses.findOne({_id:courseID});
		console.log(theCourse);
		var coursecode = theCourse.courseCode;
		console.log(coursecode);
		var theCourses = Groups.find({courseCode:coursecode}).fetch();
		console.log (theCourses);
		// console.log (theCourses.count);
		var res = theCourses.count;
		if(res === undefined) res = 0;
		console.log(res);
		return res;
	},
	
	"todayDate":function(){
		var mmlookup = [];
		mmlookup.push("Jan");
		mmlookup.push("Feb");
		mmlookup.push("Mar");
		mmlookup.push("Apr");
		mmlookup.push("May");
		mmlookup.push("Jun");
		mmlookup.push("Jul");
		mmlookup.push("Aug");
		mmlookup.push("Sep");
		mmlookup.push("Oct");
		mmlookup.push("Nov");
		mmlookup.push("Dec");
		var today = new Date();
		var dd = today.getDate();
		var mm = today.getMonth()+1; //January is 0!
		var yyyy = today.getFullYear();
		var mmm = mmlookup[mm-1];

		if(dd<10) {
				dd='0'+dd
		} 

		if(mm<10) {
				mm='0'+mm
		} 

		today = dd+'-'+mmm+'-'+yyyy;
		return today;
	}
});


Template.courseLSPForm.events({
	"click #saveExportCourseLSP":function(){
		console.log(this);
		var myData = {};
		myData.courseCode													=	 this.courseCode
		myData.learningObjective               		=	 this.courseDescription
		myData.facilitatorToLearnerRatio  		   	=	 this.FLR
		myData.fees                             	=	 this.courseFees
		myData.courseName                      		=	 this.courseName
		myData.noOfHours 		                     	=	 this.courseNoOfHours
		myData.courseType                       	=	 this.courseType
		myData.trainerNames            	        	=	 this.trainerNames
		myData.assessedBy                      		=	 Meteor.user().fullName
		myData.assessmentDate  	                	=	 new Date();
		
		myData.courseGenre                     		=	 this.genre
		
		myData.totalNoOfClasses              			=	 this.totalNoOfClasses
		myData.questions													=	 this.questions
		myData.ratings														=  this.ratings
		myData.averageRating											=  this.averageRating
		myData.additionalComments              		=	 this.additionalComments
		myData.hours															=  this.hours
		myData.str																= "The following are the assessment criteria to assist in evaluating the performance of trainers. Scoring: 1-Poor 2-Fair 3-Satisfactory 4-Very Good 5-Excellent. A minimum score of 3 is required.";
		
		console.log(myData);
		
		genP(myData);
	}
});

function genP(myData){
	console.log("genP");
	console.log(myData);
	// var columns = [
  //   {title: "ID", dataKey: "id"},
  //   {title: "Name", dataKey: "name"}, 
  //   {title: "Country", dataKey: "country"}
	// ];
	var columns = [
    {title: "t1", key: "c1", dataKey: "c1"},
    {title: "t2", key: "c2", dataKey: "c2"}, 
    {title: "t3", key: "c3", dataKey: "c3"},
    {title: "t4", key: "c4", dataKey: "c4"}
	];
	var rows = [
			{"c1": "Course Code:", 					"c2": myData.courseCode, 				"c3": "Course Name:", 				"c4":myData.courseName},
			{"c1": "Course Type:", 					"c2": myData.courseType, 				"c3": "Course Genre:",			"c4":myData.courseGenre},
			{"c1": "Trainer Name(s):", 			"c2": myData.trainerNames, 			"c3": "Learning Objective:", 	"c4":myData.learningObjective},
			{"c1": "No. Of Hours:", 					"c2": myData.hours, 						"c3": "Facilitator to Learner Ratio:", "c4":myData.facilitatorToLearnerRatio},
			{"c1": "Total No. of classes:", 	"c2": myData.totalNoOfClasses, 	"c3": "Fees", 								"c4":myData.fees},
			{"c1": "Assessed by:", 					"c2": myData.assessedBy, 				"c3": "Assessment Date", 		"c4":myData.assessmentDate}
	];
	var doc = new jsPDF('p', 'pt');
	doc.autoTable(columns, rows, {
			beforePageContent: function(data) {
				console.log(data);
					doc.text("Header", 40, 30);
			},
				afterPageContent: function(data) {
				console.log(data);
					doc.text("Header", 40, 30);
			},
			createdCell: function (cell, data) {
				console.log(cell);
				console.log(data);
			},
			drawHeaderRow: function (row, data) {
				console.log(row);
				console.log(data);
			},
			drawRow: function (row, data) {
				console.log(row);
				console.log(data);
			},
			drawHeaderCell: function (cell, data) {
				console.log(cell);
				console.log(data);
			},
			drawCell: function (cell, data) {
				console.log(cell);
				console.log(data);
			}
	});
	console.log("genP 1 END");
	doc.save('table.pdf');
	
	
	
	
	
	
	
	
	var columns = ["","","",""];
	var rows = [
			["Course Code:", 					myData.courseCode, 				"Course Name:", 									myData.courseName								],
			["Course Type:", 					myData.courseType, 				"Course Genre:",									myData.courseGenre							],
			["Trainer Name(s):", 			myData.trainerNames, 			"Learning Objective:", 						myData.learningObjective				],
			["No. Of Hours:", 				myData.hours, 						"Facilitator to Learner Ratio:", 	myData.facilitatorToLearnerRatio],
			["Total No. of classes:", myData.totalNoOfClasses, 	"Fees", 													myData.fees											],
			["Assessed by:", 					myData.assessedBy, 				"Assessment Date", 								myData.assessmentDate						]
	];
	console.log("next try");

	// Only pt supported (not mm or in)
	var doc2 = new jsPDF('p', 'pt');
	doc.autoTable(columns, rows, {
			beforePageContent: function(data) {
				console.log(data);
					doc.text("Header", 40, 30);
			},
				afterPageContent: function(data) {
				console.log(data);
					doc.text("Header", 40, 30);
			},
			createdCell: function (cell, data) {
				console.log(cell);
				console.log(data);
			},
			drawHeaderRow: function (row, data) {
				console.log(row);
				console.log(data);
			},
			drawRow: function (row, data) {
				console.log(row);
				console.log(data);
			},
			drawHeaderCell: function (cell, data) {
				console.log(cell);
				console.log(data);
			},
			drawCell: function (cell, data) {
				console.log(cell);
				console.log(data);
			}
	});
	console.log("genP2 END");
	doc.save('table.pdf');
	
	
	console.log("NEXT TRY 2");
	console.log(doc);
	var res = doc.autoTableHtmlToJson(document.getElementById("dataTables-example"));
	console.log(res);
	console.log(document.getElementById("dataTables-example"));
	doc.autoTable(res.columns, res.data, {startY: 60});
	console.log(doc);
	console.log("genP3 END");
}

function genP2(options){
	
	console.log(options)
	if(options.userID == null) options.userID = "123";
	
  var doc = new jsPDF();
	doc.textAlign = function(txt, options, x, y) {
			options = options ||{};
			/* Use the options align property to specify desired text alignment
			 * Param x will be ignored if desired text alignment is 'center'.
			 * Usage of options can easily extend the function to apply different text 
			 * styles and sizes 
			*/
			if( options.align == "center" ){
					// Get current font size
					var fontSize = this.internal.getFontSize();

					// Get page width
					var pageWidth = this.internal.pageSize.width;

					// Get the actual text's width
					/* You multiply the unit width of your string by your font size and divide
					 * by the internal scale factor. The division is necessary
					 * for the case where you use units other than 'pt' in the constructor
					 * of jsPDF.
					*/
					txtWidth = this.getStringUnitWidth(txt)*fontSize/this.internal.scaleFactor;

					// Calculate text's x coordinate
					x = ( pageWidth - txtWidth ) / 2;
			}
			else if( options.align == "right" ){
					// Get current font size
					var fontSize = this.internal.getFontSize();

					// Get page width
					var pageWidth = this.internal.pageSize.width;

					// Get the actual text's width
					/* You multiply the unit width of your string by your font size and divide
					 * by the internal scale factor. The division is necessary
					 * for the case where you use units other than 'pt' in the constructor
					 * of jsPDF.
					*/
					txtWidth = this.getStringUnitWidth(txt)*fontSize/this.internal.scaleFactor;

					// Calculate text's x coordinate
					x = x = (typeof x != "undefined" ? (( pageWidth - txtWidth ) - x) : ( pageWidth - txtWidth ) );
			}

			// Draw text at x,y
			this.text(txt,x,y);
	}
	
	// doc.setTextColor(0, 255, 0);
	// doc.setFontStyle('italic');
	var imgData = 'data:image/jpg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAHUA7IDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD2OilwKO1ZFhx0oopRQMMUgpwpCKACkpQOKKBC0e1FH0oAAKXHejtRigAoFH40UAB5oooFABR360daDQAUfjSe9FACmm4zS54oGc0ANIxTCcdqmIBFRkHmgBoYj6VICCKh74p4OKAH0tIDkUuOKADvxSnpSZo5oAPpRS0Y4oATNLmkxSdfWgB1FIDRQA6igYxR+NABR0oAz9aMetAB7UopKB0oAWijiigA4paB2ooAKWkHrRQAjLleOtMAIHPWpc8cU3FADe9LRjmlxQAZoHX60UufegBDxSe9Kc49aPwoAMcUc0UUAJjnPaj3FKRQKYB9aMUUopANINN3EGpM80xqAHZox3pBmloAD0pQOaTvRQAAUvTmgUUwEo6UoFJikADrS4oooAMUEYoooATpQetKfSjAoATj1opcDvQRQAgHpTugpvNLQAdsUGj6UUAH4UuBSCl7+1AAaO1FApgFLik60p60gAUcGk6HFHOaAF7Ud6QUo9KAF5ooozQAUUUYNAB7UUUe9ACiikHel7UAFJilo/CgA60oHOe1LgYpOlAAB3FA5o60DigA74zRjtR7jiigBaSg9KTtQAvTvRRQO+aAFFAoJGBxzS45z3oAPfNLg8UnalAoAWij8KKBlCiiigApc0lKB60CFo/Wj6UYoGFHvQKKBBS9qSloAOaOtFGaAAUUUUAFFApwoAbQadSYxQMQ0hzThSEZFAhuaUU3ofanCgBw6U0gdaXtRQAwqM0bSDT+9JQAgFA570tJQAtGcGiigBaUU3OOtKDmgBcUhFKMUGgBuOaAMd6DxS8UAL0FHtSUZzQAv86X603PFKDQApxSHjijNFAAM96WkNB6UAOHWikFHOKAFoo/SigBScikooNABSYpf50tAxtA9aPrSUCFPXrQaTvzS0AFFBFFABS0n86KAClFFHFABikx60vFFACY5o96U0g5oAKKD3pB1oAd24o70UCgApaMUZoASlzRQaAEoo/GigA70Hijtx1oGKAD8aOaUUdqAEzmgnmijjHvQAfWiiigBR0opPwoHIFMBaWikHTpQAtIKD7UcdqQBRijtRQAtA60lKMUALnmik60opgHWjn8KKPpSAP60poHuaDQAnvS9aTofalFAByaUdMUg5oHXmgBaDQaMj0oAMn1oPaj8KKAClHsaO1IMZoASloGM8UuMUAHaijtSjnqKAE/CnUgxQQOtAC9eaBSdulKMUDCilzRSAoClpKOKYgpR1ppHegdaAH9KKQHiigYucUUnHNKKAD60UcdqBxQIXrS445pKUelABQe1HrRQMPWj3pe1HagQUYopaAEpDS4o/nQAxh3pB605sU3AoAUGl7Ug4o74oAD1oNITiloAM0DFFA9utAB9KKMigjnFAARSDjilo4oAcKKKPpQAhoJo4oxmgA5opfakxQAmMniigjvQRQAtKOaQdOlKKACjqaKTkUALmlJ4FJ1oxQMXryaKMUn40CFzS03vSigBfrRnijNJ2oAOnWg0UUAN70optKBzQA6gehoHpS0AJS0pFGKAE5opaDzQAlHP4UtHSgBOoooPWjtmgAxmjFF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';
	
	/*
		myData.courseCode													=	 this.courseCode
		myData.learningObjective               		=	 this.courseDescription
		myData.facilitatorToLearnerRatio  		   	=	 this.FLR
		myData.fees                             	=	 this.courseFees
		myData.courseName                      		=	 this.courseName
		myData.noOfHours 		                     	=	 this.courseNoOfHours
		myData.courseType                       	=	 this.courseType
		myData.trainerNames            	        	=	 this.trainerNames
		myData.assessedBy                      		=	 Meteor.user().fullName
		myData.assessmentDate  	                	=	 new Date();
		
		myData.courseGenre                     		=	 this.genre
		
		myData.totalNoOfClasses              			=	 this.totalNoOfClasses
		myData.questions													=	 this.questions
		myData.ratings														=  this.ratings
		myData.averageRating											=  this.averageRating
		myData.additionalComments              		=	 this.additionalComments
		myData.str																= "The following are the assessment criteria to assist in evaluating the performance of trainers. Scoring: 1-Poor 2-Fair 3-Satisfactory 4-Very Good 5-Excellent. A minimum score of 3 is required.";
	*/
	
	doc.addImage(imgData, 'JPEG', 85, 15, 40, 30);
	doc.setTextColor(78);
	doc.setFontSize(20);
	doc.textAlign("CERTIFICATE OF SUCCESSFUL COMPLETION",{align: "center"}, 20, 55);

	doc.setTextColor(100);
  doc.setFontSize(10);
	doc.textAlign("is awarded to", {align: "center"}, 100, 70);

  doc.setFontSize(16);
	doc.textAlign(options.courseCode, {align: "center"}, 105, 85);

  doc.setFontSize(12);
	doc.textAlign(options.userIDType + ": " + options.userID, {align: "center"}, 20, 95);

  doc.setFontSize(10);
	doc.textAlign('for succesful completeion of the', {align: "center"}, 20, 110);

  doc.setFontSize(16);
	doc.textAlign(options.learningObjective, {align: "center"}, 20, 130);

  doc.setFontSize(10);
	doc.textAlign('Sterling Engineering Training Hub', {align: "center"}, 20, 150);

  doc.setFontSize(10);
	doc.textAlign('21 Kranji Link, Singapore 728671', {align: "center"}, 20, 155);

  doc.setFontSize(10);
	// doc.textAlign('ISO', {align: "center"}, 20, 160);

  doc.setFontSize(10);
	// doc.textAlign('Blah', {align: "center"}, 20, 165);

  doc.setFontSize(10);
	doc.textAlign('from', {align: "center"}, 20, 170);

  doc.setFontSize(12);
	doc.textAlign(options.assessedBy + ' to ' + options.assessmentDate, {align: "center"}, 20, 190);

  doc.setFontSize(12);
	doc.textAlign('Validity: 5 Years', {align: "center"}, 20, 200);
	
  doc.setFontSize(10);
	doc.text("Director", 50, 250);
	doc.textAlign("Facilitator", {align: "right"}, 50, 250);
	
	
	// doc.output("datauri");
	doc.save('test.pdf');
}