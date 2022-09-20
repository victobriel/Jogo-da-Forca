const letters = document.getElementById('letters'), keyboard = document.getElementById('keyboard'), mainBtns = document.getElementById('mainBtns'), imgDoll = document.getElementById('doll'), giveUpBtns = document.getElementById('giveupBtns'), category = document.getElementById('category'), wrongLetter = document.getElementById('wrongLetters'), head = document.getElementById('head'), newWord = document.getElementById('newWord'), newWordTxtArea = document.getElementById('newWordTxtArea'), warning = document.getElementById('warning');

let wordDrawn,
    wordDrawnList = [],
    wrongLetters = [],
    correctLetters = [],
    totalCorrectLetters,
    attempts = 6,
    gameStarted = false,
    textState;

let dictionary = [
    { name: 'JAVA', category: 'LINGUAGEM DE PROGRAMAÇÃO' },
    { name: 'PYTHON', category: 'LINGUAGEM DE PROGRAMAÇÃO' },
    { name: 'JAVASCRIPT', category: 'LINGUAGEM DE PROGRAMAÇÃO' },
    { name: 'PHP', category: 'LINGUAGEM DE PROGRAMAÇÃO' },
    { name: 'PIZZA', category: 'COMIDA'},
    { name: 'JUIZ', category: 'FUNÇÃO/EMPREGO'},
    { name: 'INTERPRETE', category: 'FUNÇÃO/EMPREGO'},
    { name: 'PERITO', category: 'FUNÇÃO/EMPREGO'},
    { name: 'JALECO', category: 'ROUPA'},
    { name: 'KIWI', category: 'FRUTA'},
    { name: 'CIRIGUELA', category: 'FRUTA'},
    { name: 'CHUVEIRO', category: 'OBJETO'},
    { name: 'CATAPORA', category: 'DOENÇA'},
    { name: 'CREPUSCULO', category: 'FILME'},
    { name: 'ONEPIECE', category: 'DESENHO/ANIME'},
    { name: 'PEDREIRO', category: 'FUNÇÃO/EMPREGO'},
    { name: 'XICARA', category: 'OBJETO'},
    { name: 'AZULEJO', category: 'OBJETO'},
    { name: 'ABRACAR', category: 'AÇÃO'},
    { name: 'OFTAMOLOGISTA', category: 'FUNÇÃO/EMPREGO'},
    { name: 'SINO', category: 'OBJETO'},
    { name: 'SAUDADE', category: 'SENTIMENTO'},
    { name: 'CORAGEM', category: 'SENTIMENTO'},
    { name: 'ARABE', category: 'IDIOMA'},
    { name: 'LITUANO', category: 'IDIOMA'},
    { name: 'AGNOSTICO', category: 'ADJETIVO'},
    { name: 'CADACO', category: 'OBJETO'},
    { name: 'AFRICA', category: 'CONTINENTE'},
    { name: 'PERTURBAR', category: 'AÇÃO'},
    { name: 'IORGUTE', category: 'COMIDA'},
    { name: 'PRODIGIO', category: 'ADJETIVO'},
    { name: 'PARQUE', category: 'LUGAR'},
    { name: 'ESPINAFRE', category: 'VEGETAL'},
    { name: 'CACTO', category: 'PLANTA'},
    { name: 'CAATINGA', category: 'REGIÃO'},
    { name: 'BASQUETE', category: 'ESPORTE'},
    { name: 'APLAUDIR', category: 'AÇÃO'},
    { name: 'BERIMBAU', category: 'OBJETO'},
    { name: 'AMENDOA', category: 'FRUTA'},
    { name: 'ANEL', category: 'OBJETO'},
    { name: 'ALURA', category: 'EMPRESA'},
    { name: 'BACIA', category: 'OBJETO'},
    { name: 'ARROZ', category: 'COMIDA'}
];

function keyboardPressed(element, key) {
    if (wrongLetters.includes(key) || correctLetters.includes(key))
        return;
    if (wordDrawn.indexOf(key) > -1) {
        element.style.background = "#00FF00";
        for (let i=0; i < wordDrawn.length; i++) {
            if (wordDrawn[i] == key) {
                wordDrawnList[i] = key;
                totalCorrectLetters++;
            }
        }
        correctLetters.push(key);
        updateLetters();
        if (totalCorrectLetters >= wordDrawn.length) {
            keyboard.classList.add('hide');
            wrongLetter.classList.add('hide');
            gameStarted = false;
            return category.innerHTML = "<span>parabéns!</span>" + "<p>Você VENCEU! :)</p>";
        }
    } else {
        wrongLetter.classList.remove('hide');
        attempts--;
        element.style.background = "#FF0000";
        imgDoll.src = "images/doll-" + (attempts * -1 + 6).toString() + ".png";
        imgDoll.style.visibility = 'visible';
        wrongLetters.push(key);
        wrongLetter.innerHTML = wrongLetter.innerHTML + "<span>" + key + "</span>";
        if (!attempts) {
            keyboard.classList.add('hide');
            gameStarted = false;
            return category.innerHTML = "<span>game over</span>" + "<p>Você perdeu! :(</p><br><p>A palavra era " + wordDrawn + "</p>";
        }
    }
    element.disabled = true;
    element.classList.add('disabledBtn');
}

function resetKeyboard() {
    let key, element;
    for (let i=65; i < 91; i++) {
        key = "Key" + String.fromCharCode(i);
        element = document.getElementById(key);
        element.style.removeProperty("background");
        element.disabled = false;
        element.classList.remove('disabledBtn');
    }
}

function updateLetters() {
    letters.innerHTML = '';
    for (let i=0; i < wordDrawn.length; i++) {
        if (wordDrawnList[i] == undefined) {
            wordDrawnList[i] = "&nbsp;"
            letters.innerHTML = letters.innerHTML + "<div class='letter'>" + wordDrawnList[i] + "</div>";
        } else
            letters.innerHTML = letters.innerHTML + "<div class='letter'>" + wordDrawnList[i] + "</div>";
    }
}

function randomWord() {
    let index = parseInt(Math.random() * dictionary.length);
    return dictionary[index];
}

function createNewGame() {
    mainBtns.classList.add('hide');
    category.classList.remove('hide');
    letters.classList.remove('hide');
    keyboard.classList.remove('hide');
    wrongLetter.innerHTML = '<p>Letras erradas: </p>';
    wrongLetter.classList.add('hide');
    newWord.classList.add('hide');
    head.classList.remove('hide');
    warning.classList.add('hide');
    wrongLetters = [];
    correctLetters = [];
    totalCorrectLetters = 0;
    wordDrawn = '';
    wordDrawnList = [];
    attempts = 6;
    gameStarted = true;
    let randWord = randomWord();
    wordDrawn = randWord.name;
    console.log("Ei hackerzão, a palavra é " + wordDrawn);
    category.innerHTML = "<span>categoria: </span>" + "<p>" + randWord.category + "</p>";
    updateLetters();
    resetKeyboard();
    imgDoll.src = "images/doll-1.png";
    imgDoll.style.visibility = 'hidden';
    giveUpBtns.classList.remove('hide');
}

function giveup() {
    gameStarted = false;
    keyboard.classList.add('hide');
    letters.classList.add('hide');
    mainBtns.classList.remove('hide');
    imgDoll.src = "images/doll-6.png";
    imgDoll.style.visibility = 'visible';
    giveUpBtns.classList.add('hide');
    category.classList.add('hide');
    wrongLetter.classList.add('hide');
    newWord.classList.add('hide');
    head.classList.remove('hide');
};

function removeAccent(text) {
    const matrizCodigo = [
        ['[ÁÀÂÃ]', 'A'],
        ['[ÉÈÊ]', 'E'],
        ['[ÍÌÎ]', 'I'],
        ['[ÓÒÔÕ]', 'O'],
        ['[ÚÙÛ]', 'U'],
        ['Ç', 'C']
    ];
    for(i=0; i < matrizCodigo.length; i++) {
        text = text.replace(new RegExp(matrizCodigo[i][0], 'gi'), matrizCodigo[i][1]);
    }
    return text;
}

function nextButtonPressed(element) {
    let regexObj = /^[a-zA-Zá-úÁ-Ú]+,\s[a-zA-Zá-úÁ-Ú]+$/g;
    if (newWordTxtArea.length < 1 || !regexObj.test(newWordTxtArea.value)){
        warning.classList.remove('hide');
        warning.innerHTML = '<i class="fa-solid fa-circle-info"></i> Utilize "nome, categoria"';
    } else {
        let result = newWordTxtArea.value.match(regexObj)[0].toUpperCase().split(", ");
        console.log(result);
        if (result[0].length > 12) {
            warning.classList.remove('hide');
            warning.innerHTML = '<i class="fa-solid fa-circle-info"></i> Não utilize mais que 12 caracteres no nome';
        } else if (result[1].length > 15) {
            warning.classList.remove('hide');
            warning.innerHTML = '<i class="fa-solid fa-circle-info"></i> Não utilize mais que 15 caracteres na categoria';
        } else {
            dictionary.push({name: removeAccent(result[0]), category: result[1]});
            createNewGame();
        }
    }
}

function backButtonPressed(){ return giveup(); }

setInterval(() => {
    if(textState)
        newWordTxtArea.placeholder = 'Digite a palavra aqui';
    else
        newWordTxtArea.placeholder = 'Digite a palavra aqui_';
    textState = !textState;
}, 400);

document.getElementById('startBtn').addEventListener('click', createNewGame);

document.getElementById('wordBtn').addEventListener('click', () => {
    mainBtns.classList.add('hide');
    head.classList.add('hide');
    newWord.classList.remove('hide');
});

window.addEventListener('keypress', (event) => {
    if (gameStarted) {
        if ((event.key.charCodeAt() >= 65 && event.key.charCodeAt() <= 90) ||
            (event.key.charCodeAt() >= 97 && event.key.charCodeAt() <= 122)){
            try {
                keyboardPressed(document.getElementById(event.code), event.key.toUpperCase());
            } catch(e) {
                if (e instanceof ReferenceError) {
                }
            }
        }
    }
});
