export const singleQuestionTemplate = 
    `<li>
        <label>
            <input value="%number%" type="radio" class="answer" name="answer" />
            <span>%answer%</span>
        </label>
    </li>`;

export const multipleQuestionTemplate = 
    `<li>
        <label>
            <input value="%number%" type="checkbox" class="answer" name="answer" />
            <span>%answer%</span>
        </label>
    </li>`;
