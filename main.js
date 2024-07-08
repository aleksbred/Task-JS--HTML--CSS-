const questions = [
	{
		question: "How many planets are in the solar system?",
		answers: ["8", "9", "10"],
		correct: [0],
		type: "single",
	},
	{
		question: "What is the freezing point of water?",
		answers: ["0", "-5", "-6"],
		correct: [0],
		type: "single",
	},
	{
		question: "What is the longest river in the world?",
		answers: ["Nile", "Amazon", "Yangtze"],
		correct: [1],
		type: "single",
	},
	{
		question: "How many chromosomes are in the human genome?",
		answers: ["42", "44", "46"],
		correct: [2],
		type: "single",
	},
	{
		question: "Which of these characters are friends with Harry Potter?",
		answers: ["Ron Weasley", "Draco Malfoy", "Hermione Granger"],
		correct: [0, 2],
		type: "multiple",
	},
	{
		question: "What is the capital of Canada?",
		answers: ["Toronto", "Ottawa", "Vancouver"],
		correct: [1],
		type: "single",
	},
	{
		question: "What is the Jewish New Year called?",
		answers: ["Hanukkah", "Yom Kippur", "Kwanzaa"],
		correct: [1],
		type: "single",
	},
];

const headerContainer = document.querySelector('#header');
const listContainer = document.querySelector('#list');
const submitBtn = document.querySelector('#submit');
const numberQuestion = document.querySelector('#numberQuestion'); 

let score = 0;
let questionIndex = 0;

clearPage();
showQuestion();
submitBtn.onclick = checkAnswer;

function clearPage(){
	headerContainer.innerHTML = '';
	listContainer.innerHTML = '';
	numberQuestion.innerHTML = '';
};

function showQuestion(){
    const numberQuestionTemplate = `<h2 class="title" id="numberQuestion">Question № %numberQuestion%/%lengthQuestions%</h2>`;
    const headerTemplate = `<h2 class="title">%title%</h2>`;
    const title = headerTemplate.replace('%title%', questions[questionIndex].question);
    const viewnumberQuestion = numberQuestionTemplate.replace('%numberQuestion%', questionIndex + 1).replace('%lengthQuestions%', questions.length);
    const answerCountMessage = questions[questionIndex].type === "multiple" ? `<p class="answer-count-message">This question has several correct answers.</p>` : '';
    
    headerContainer.innerHTML = viewnumberQuestion + title + answerCountMessage;

    for (const [index, answersText] of questions[questionIndex].answers.entries()){
        let questionTemplate;
        if (questions[questionIndex].type === "single") {
            questionTemplate = 
                `<li>
                    <label>
                        <input value="%number%" type="radio" class="answer" name="answer" />
                        <span>%answer%</span>
                    </label>
                </li>`;
        } else {
            questionTemplate = 
                `<li>
                    <label>
                        <input value="%number%" type="checkbox" class="answer" name="answer" />
                        <span>%answer%</span>
                    </label>
                </li>`;
        }

        const answerHTML = questionTemplate.replace('%answer%', answersText).replace('%number%', index);
        listContainer.innerHTML += answerHTML;
    };
};

function checkAnswer(){
	const checkedInputs = listContainer.querySelectorAll('input[type="checkbox"]:checked, input[type="radio"]:checked');

	if (checkedInputs.length === 0){
		submitBtn.blur();
		return;
	};

	const userAnswers = Array.from(checkedInputs).map(input => parseInt(input.value));
	const correctAnswers = questions[questionIndex].correct;

	Array.from(listContainer.children).forEach((li, index) => {
		const input = li.querySelector('input');
		const label = li.querySelector('label');
		if (correctAnswers.includes(index)) {
			label.classList.add('correct');
		} else {
			label.classList.add('wrong');
		}

		if (input.checked) {
			if (correctAnswers.includes(parseInt(input.value))) {
				label.classList.add('correct');
				label.classList.remove('wrong');
			} else {
				label.classList.add('wrong');
				label.classList.remove('correct');
			}
		}
	});

	if (arraysEqual(userAnswers, correctAnswers)){
		score++;
	};

	if (questionIndex !== questions.length - 1){
		questionIndex++;
		setTimeout(() => {
			clearPage();
			showQuestion();
		}, 1000);
	} else {
		setTimeout(() => {
			clearPage();
			showResults();
		}, 1000); 
	};
};

function arraysEqual(arr1, arr2){
	if (arr1.length !== arr2.length) return false;
	arr1.sort();
	arr2.sort();
	for (let i = 0; i < arr1.length; i++){
		if (arr1[i] !== arr2[i]) return false;
	}
	return true;
};

function showResults(){
	const resultsTemplate = `
			<h2 class="title">%title%</h2>
			<h3 class="summary">%message%</h3>
			<p class="result">%result%</p>
		`;
	
	const title = 'You have completed the test.';
	const message = 'To continue, click on the "Start again" button.';
	const result = `${score} из ${questions.length}`;

	const finalMessage = resultsTemplate.replace('%title%', title).replace('%message%', message).replace('%result%', result);
	headerContainer.innerHTML = finalMessage;

	submitBtn.blur();
	submitBtn.innerHTML = 'Start again';
	submitBtn.onclick = () => history.go();
};
