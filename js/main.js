import { headerContainer, listContainer, submitBtn, numberQuestion, numberQuestionTemplate, headerTemplate, answerCountMessage } from './const.js';
import { singleQuestionTemplate, multipleQuestionTemplate } from './template.js';
import { questions } from './questions.js';

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
    const title = headerTemplate.replace('%title%', questions[questionIndex].question);
    const viewnumberQuestion = numberQuestionTemplate.replace('%numberQuestion%', questionIndex + 1).replace('%lengthQuestions%', questions.length);
    const type = questions[questionIndex].type;
    const message = answerCountMessage(type);
    
    headerContainer.innerHTML = viewnumberQuestion + title + message;

    const questionTemplate = type === "single" ? singleQuestionTemplate : multipleQuestionTemplate;

    listContainer.innerHTML = '';

    for (const [index, answerText] of questions[questionIndex].answers.entries()){
        const answerHTML = questionTemplate.replace('%answer%', answerText).replace('%number%', index);
        listContainer.innerHTML += answerHTML;
    };
};

function checkAnswer(){
    const checkedInputs = listContainer.querySelectorAll('input[type="checkbox"]:checked, input[type="radio"]:checked');

    if (checkedInputs.length === 0){
        submitBtn.blur();
        return;
    };

    const userAnswers = Array.from(checkedInputs).map(input => input.value);

    const correctAnswers = Array.isArray(questions[questionIndex].correct) ? questions[questionIndex].correct.map(String) : [String(questions[questionIndex].correct)];

    Array.from(listContainer.children).forEach((li, index) => {
        const input = li.querySelector('input');
        const label = li.querySelector('label');

        const isUserAnswer = input.checked;
        const isCorrectAnswer = correctAnswers.includes(input.value);

        if (isUserAnswer) {
            if (isCorrectAnswer) {
                label.classList.add('correct');
                label.classList.remove('wrong');
            } else {
                label.classList.add('wrong');
                label.classList.remove('correct');
            }
        } else {
            label.classList.remove('correct', 'wrong');
            if (isCorrectAnswer) {
                label.classList.add('correct');
            };
        };
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