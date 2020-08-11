
    let startButton = document.getElementById("start-button");
    let questionId = 0;
    let userScore = 0;
    let timeRemaining = 90;
    let startedQuiz = false;

    var timeInterval = setInterval(function() {
        if(startedQuiz) {
        let timerEl = document.getElementById("timer")
        timerEl.textContent = timeRemaining + " seconds remaining"
        if ( timeRemaining > 0) { 
        timeRemaining--;
        }
        else { clearInterval(timeInterval)}
        if (timeRemaining === 0) {
            finishQuiz()
        }
    }
    }, 1000)
    
    const questions = [
         {
            title: 'Commonly used data types DO NOT include:',
            answers: [
                {text: 'booleans', value: false },
                {text: 'strings', value: false },
                {text: 'alerts', value: true },
                {text: 'numbers', value: false }
                ]
            },

            {
                title: 'The condition within an if/else statement is enclosed within',
                answers: [
                    {text: 'quotes', value: false },
                    {text: 'curly brackets', value: true },
                    {text: 'parentheses', value: false },
                    {text: 'square brackets', value: false }
                ]
            },

            {
                title: 'Arrays in Javascript can be used to store',
                answers: [
                    {text: 'numbers and strings', value: false },
                    {text: 'other arrays', value: false },
                    {text: 'booleans', value: false },
                    {text: 'all of the above', value: true }
                ]
            },

            {
                title: 'String values must be enclosed within',
                answers: [
                    {text: 'quotations', value: true },
                    {text: 'parentheses', value: false },
                    {text: 'curly brackets', value: false },
                    {text: 'square brackets', value: false }
                ]
            }        
        ]
    
        const startQuiz = () => {
            startedQuiz = true;

            createQuestion()
        }

        const quizOver = () => {
            clearInterval(timeInterval)
            let displayAnswer = document.getElementById("displayAnswer");
            displayAnswer.textContent = "Your score is " + userScore;
            let timer = document.getElementById("timer")
            let startButton = document.getElementById("start-button")
            let question = document.getElementById("question")
            document.body.removeChild(timer)
            document.body.removeChild(startButton);
            document.body.removeChild(question)
            createInput()           
        }

        const finishQuiz = () => {
            alert("You ran out of time!")
            let displayAnswer = document.getElementById("displayAnswer");
            displayAnswer.textContent = "Your score is " + userScore;
            createInput();
        }

        const createQuestion = () => {
            if (questionId === questions.length) { 
                quizOver()              
            } else {
            const currentQuestion = questions[questionId]
            const questionText = document.getElementById("question");
            const answerText = document.getElementById("answers");
            questionText.textContent = currentQuestion.title
            const newWrapper = document.createElement("div");
            newWrapper.setAttribute("id", "buttonWrapper")
            currentQuestion.answers.forEach((answer) => {               
                const newButton = document.createElement("button");
                newButton.textContent = answer.text;
                newWrapper.appendChild(newButton);
                newButton.setAttribute("value", answer.value);
                newButton.addEventListener("click", handleAnswer);
            
            })
            answerText.appendChild(newWrapper);
        }
    }
        const handleAnswer = (event) => {
            if (event.target.value === "true") {
                alert("You got it right! On to the next one!")
                userScore++;
                console.log(userScore);
            } else {
                alert("Incorrect! We're taking 10 seconds off your time!")
                timeRemaining = timeRemaining - 10;
            }
                questionId = questionId + 1;
                removeQuestion()
                createQuestion()
        }

        const removeQuestion = () => {
            const buttonWrapper = document.getElementById("buttonWrapper");
            const answers = document.getElementById("answers");
            answers.removeChild(buttonWrapper);
        }

        const createInput = () => {
            const form1 = document.createElement("form")
            const initials = document.createElement("input")
            const formButton = document.createElement("button")
            formButton.setAttribute("type", "submit")
            formButton.textContent = "Submit"
            initials.setAttribute("id", "initials")
            formButton.addEventListener("click", handleSubmit)
            form1.appendChild(initials)
            document.body.appendChild(formButton)
            const formContainer = document.getElementById("formContainer")
            formContainer.appendChild(form1);
                     
        }

        const createLeaderboard = () => {
            let leaderboardTitle = document.getElementById("leaderboard-title")
            let leaderboard = document.getElementById("leaderboard")
            leaderboardTitle.textContent = "high scores"
            const userScores = localStorage.getItem("userScore")
            const currentList = JSON.parse(userScores);
            currentList.forEach((item) => {
                let username = document.createElement("div")
                username.textContent = item.initial + ' ' + item.score
                leaderboard.appendChild(username);
            })
        }

        const handleSubmit = (event) => {
            console.log(document.forms)
            var initials = document.getElementById("initials")
            console.log(initials.value)
            setToLocal(initials.value);
            createLeaderboard();
        }

        const setToLocal = (initials) => {    
        
        const userScores = localStorage.getItem("userScore")
              
                console.log(userScores)
                if ( userScores ) {
                    const currentList = JSON.parse(userScores);  
                    currentList.push({score: userScore, initial: initials});
                localStorage.setItem("userScore", JSON.stringify(currentList));
                } else {
                const userScoreList = []
                   
                userScoreList.push({score: userScore, initial: initials});
                localStorage.setItem("userScore", JSON.stringify(userScoreList));
                }
            }