/*********************************************************************************************
getMathProblem(string type, string difficulty): returns a math problem and its expected answer

accepted 'type':
	'add'
	'sub'
	
accepted 'difficulty':
	'easy'
	'hard'
	
Returns a JSON object. 

Usage:
	var math_problem = getMathProblem('add', 'easy');
	alert(math_problem.text); // Alerts the text problem
	alert(math_problem.answer); // Alerts the correct answer
**********************************************************************************************/
function getMathProblem(type, difficulty) {
	// Set some restrictions based on difficulty
	var min = 0;
	var max = 0;
	
	if (difficulty == 'easy') {
		min = 1;
		max = 9;
	} else if (difficulty == 'hard') {
		min = 10;
		max = 20;
	} else {
		console.log('getMathProblem() -- invalid difficulty');
		return false;
	}
	
	var first_num = randomIntFromInterval(min, max);
	var second_num = randomIntFromInterval(min, max);
	
	var problem = '';
	var operator = '';
	var answer = 0;
	
	if (type == 'mix') {
		var random_operator = randomIntFromInterval(1, 2);
		if (random_operator == 1) {
			type = 'add';
		} else {
			type = 'sub';
		}
	}
	
	if (type == 'add') {
		operator = '+';
		answer = first_num + second_num;
	} else if (type == 'sub') {
		if (first_num < second_num) {
			temp = first_num;
			first_num = second_num;
			second_num = temp;
			answer = second_num - first_num;
		}
		
		operator = '-';
		answer = first_num - second_num;
	} else {
		console.log('getMathProblem() -- invalid type');
		return false;
	}
	
	problem = first_num + ' ' + operator + ' ' + second_num;
	
	return {'text': problem + ' = ?', 'answer': answer, 'first_num': first_num, 'second_num': second_num, 'operator': operator};
}

function randomIntFromInterval(min, max) {
	return Math.floor(Math.random()*(max-min+1)+min);
}