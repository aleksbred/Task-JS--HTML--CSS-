export const headerContainer = document.querySelector('#header');
export const listContainer = document.querySelector('#list');
export const submitBtn = document.querySelector('#submit');
export const numberQuestion = document.querySelector('#numberQuestion');

export const numberQuestionTemplate = `<h2 class="title" id="numberQuestion">Question № %numberQuestion%/%lengthQuestions%</h2>`;
export const headerTemplate = `<h2 class="title">%title%</h2>`;
export const answerCountMessage = (type) => type === "multiple" ? `<p class="answer-count-message">This question has several correct answers.</p>` : '';