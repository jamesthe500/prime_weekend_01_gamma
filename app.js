$(document).ready(function(){
//establishing variables. values stores the current employee object. 
//allEmployeeNums[] stores and keeps all employee numbers so duplicates can be avoided.
//allSalaries holds all salaries for the purpose of finding the total.
	var values = {};
	var allEmployeeNums = [0];
	var allSalaries = [0];
	var totalSalaries = 0;
	var employeeIndex = [];
	var j = 0;

//puts the salary result on the index.html
$(".displaySalaries").html("Total salaries= " + totalSalaries);

//adding employees via the form.
	$("#employeeEntry").submit(function(event){
		event.preventDefault();		
		var $inputs = $("#employeeEntry :input");

//populates the object
		$inputs.each(function(){
			values[this.name] = $(this).val();
		});
	
		addToList(values.firstname, values.lastname, values.empnum, values.jobtitle, values.lastreview, values.salary);

//resets fields for next entry
		$("#employeeEntry").each(function() {
			this.reset();
		})
	});

//random button functionality. Makes salary a multiple of 100. 	
	$("#randomEmployee").on('click', function(event){
		event.preventDefault();
		var fNames = ["Jim", "Mikel", "Josh", "Suren", "PR", "Matt", "Brandon", "Bob", "Eric", "Huck", "Cat", "Cena", "Corina", "Lisa", "Maria", "Sarah", "Skyler", "Cassey", "Alice", "Jane", "Henrietta", "Samantha"];
		var lNames = ["Peters", "Hicks", "Mayo", "Brock", "Stafki", "Daniels", "Anderson"];
		var jobTitles = ["Lackie", "Systems Analyst", "Custodian", "CEO", "Dev"];
		values.firstname = fNames[randomNumber(0, fNames.length-1)];
		values.lastname = lNames[randomNumber(0, lNames.length-1)];
		values.empnum = chooseEmpNum(randomNumber(1000, 9999));
		values.jobtitle = jobTitles[randomNumber(0, jobTitles.length-1)];
		values.lastreview = randomNumber(1, 5);
		values.salary = randomNumber(200, 2000) * 100;
		addToList(values.firstname, values.lastname, values.empnum, values.jobtitle, values.lastreview, values.salary);;
		});

//alphabetizes employees via the index array with subarrays.
	$("#abEmployees").on('click', function(){
		var i = 0;
		while (i < employeeIndex.length-1){
			if (employeeIndex[i][0] < employeeIndex[i+1][0]){
				i++
			} else {
				employeeIndex.splice(i, 0, employeeIndex[i+1]);
				employeeIndex.splice(i+2, 1);
				i = 0;
			}	
			};
		$("#employeeChart tbody").empty();
		for (var i = 0; i<employeeIndex.length; i++){
			$("#employeeChart tbody").append(employeeIndex[i][1]);
		}
		});

//delete employee button functionality. 
//Goes up to the tr containing the button deletes it.
	$('#employeeChart').on('click', '.delEmployee', function(){
		totalSalaries = totalSalaries - (parseInt($(this).closest("tr").find(".salary").html()));
		$(".displaySalaries").html("Total salaries= " + totalSalaries);
		//console.log($(this).closest("tr").html());
		var employeeIndexFlat = [].concat.apply([],employeeIndex);
		employeeIndex.splice((employeeIndexFlat.indexOf($(this).data("rowNumber"))+1)/3-1, 1);
		console.log(employeeIndex);
		(this).closest("tr").remove();
	})

//used to add to the list whether random or actual. Makes sure all salaries are pure.
function addToList(first, last, num, title, review, salary){
	var revNum = "rev" + values.lastreview;
	var rowID = (values.lastname).toLowerCase() + (values.firstname).toLowerCase() + values.empnum;
	
	if(isNaN(values.salary)){
		alert("Please enter only numbers in the salary field.");
	} else if (values.salary == "") {
		alert("Please enter a number in the salary field.");
	} else {			
		allSalaries.push(values.salary); 
		var rowHTML = '<tr class="aRow" data-row-number="' + j + '"><td class="firstName">' + first + '</td><td class="lastName">' + last + '</td><td>' + num + '</td><td>' + title +  '</td><td class="' + revNum + '">' + review + '</td><td class="salary">' + salary + '</td><td class="hiddenColumn"><input type="button" class="delEmployee" data-row-number="' + j + '" value="DEL"></td></tr>'
		$("#employeeChart tbody").prepend(rowHTML);
		allEmployeeNums.push(values.empnum);
		employeeIndex.push([rowID, rowHTML, j]);
		calcTotalSalaries();
		j++
	}
}

//random number generator borrowed from recent code.
	function randomNumber(min, max) {
		return Math.floor(Math.random() * (1 + max - min) + min);
	}

// a function to insure against duplicate employee numbers when using the random button.
	function chooseEmpNum(num){
		var position = allEmployeeNums.indexOf(num);
		var employeeNumber = randomNumber(1000, 9999);
		for (var i =0; i < allEmployeeNums.length; i++){
			if (allEmployeeNums[i] == employeeNumber){
				employeeNumber = randomNumber(1000, 9999);
				chooseEmpNum;
			} else {
				return employeeNumber;
			}
		}
	}

//this function calculates the total employee salaries value and updates the variable.
	function calcTotalSalaries(){
		totalSalaries = parseInt(totalSalaries) + parseInt(allSalaries[allSalaries.length-1]);
		$(".displaySalaries").html("Total salaries= " + totalSalaries);
	}

});

//Delete needs to remove from employee

/* wishlist:
make is so a suggested emp number is present on load and after insertion.
make the delete rid allEmployeeNums of that empnum.
animate deletions and abs.

*/

//Mystery below. why can't I use a variable to traverse? tried it 100 ways, wouldn't work. Changing it to straight text does work. :(
			//console.log($('".' + employeeIndex[0] + '"').html());