$(document).ready(function(){
	var values = {};
	$("#employeeEntry").submit(function(event){
		event.preventDefault();
		
		var $inputs = $("#employeeEntry :input");
		
		$inputs.each(function(){
			values[this.name] = $(this).val();
		});

		console.log(values);
		console.log(values.firstname);
		
		addToList(values.firstname, values.lastname, values.empnum, values.jobtitle, values.lastreview, values.salary);

		$("#employeeEntry").each(function() {
			this.reset();
		})

	});
	
	$("#randomEmployee").on('click', function(event){
		event.preventDefault();
		var fNames = ["Jim", "Mikel", "Josh", "Suren", "PR", "Matt", "Brandon", "Bob", "Eric", "Huck", "Cat", "Cena", "Corina", "Lisa", "Maria", "Sarah", "Skyler", "Cassey", "Alice", "Jane", "Henrietta", "Samantha"];
		var lNames = ["Peters", "Hicks", "Mayo", "Brock", "Stafki", "Daniels", "Anderson"];
		var jobTitles = ["Lackie", "Systems Analyst", "Custodial", "CEO", "Dev"];
		values.firstname = fNames[randomNumber(0, fNames.length-1)];
		values.lastname = lNames[randomNumber(0, lNames.length-1)];
		values.empnum = randomNumber(1000, 9999);
		values.jobtitle = jobTitles[randomNumber(0, jobTitles.length-1)];
		values.lastreview = randomNumber(1, 5);
		values.salary = randomNumber(20000, 200000);

		addToList(values.firstname, values.lastname, values.empnum, values.jobtitle, values.lastreview, values.salary);;
		
				console.log(values);
		console.log(values.firstname);

		});

	function addToList(first, last, num, title, review, salary){
		var revNum = "rev" + values.lastreview;
		$("#employeeChart").prepend("<div class='employee' id='" + values.empnum + "'><p>" + first + "</p><p>" + last + "</p><p>" + num + "</p><p>" + title +  "</p><p class= '" + revNum + "'>" + review + "</p><p>" + salary + "  " + "<input type='button' class='delEmployee' value='DEL'></div><br>");
	}

	$('#employeeChart').on('click', '.delEmployee', function(){
		(this).closest("div").remove();
		$(this).closest;
	})

	function randomNumber(min, max) {
		return Math.floor(Math.random() * (1 + max - min) + min);
	}


});