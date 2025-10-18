let score = 0;

const scenarios = [
    {
        scenario: "You receive an email with an attachment claiming to be an important document from your bank. What do you do?",
        choices: ["Open the attachment", "Check if the email address looks suspicious", "Forward the email to your friends"],
        correctChoice: 1
    },
    {
        scenario: "Your computer has been running slower than usual, and you notice a pop-up ad that keeps appearing. What do you do?",
        choices: ["Click the ad to see what it's about", "Ignore it and continue working", "Run a virus scan"],
        correctChoice: 2
    },
    {
        scenario: "Your colleague asks for your login credentials over email to help resolve an issue. What do you do?",
        choices: ["Share the login details", "Call your colleague to verify the request", "Ignore the email"],
        correctChoice: 1
    }
];

let currentScenario = 0;

function displayScenario() {
    const scenario = scenarios[currentScenario];
    document.getElementById('scenario').textContent = scenario.scenario;
    document.getElementById('choice1').textContent = scenario.choices[0];
    document.getElementById('choice2').textContent = scenario.choices[1];
    document.getElementById('choice3').textContent = scenario.choices[2];
    document.getElementById('feedback').textContent = '';
}

function checkAnswer(choice) {
    const scenario = scenarios[currentScenario];
    if (choice === scenario.correctChoice) {
        score++;
        document.getElementById('feedback').textContent = "Correct! Well done.";
    } else {
        document.getElementById('feedback').textContent = "Oops! That's not the best choice.";
    }
    document.getElementById('score').textContent = score;

    currentScenario++;
    if (currentScenario < scenarios.length) {
        setTimeout(displayScenario, 1000);
    } else {
        setTimeout(() => alert("Game Over! Your final score is " + score), 1000);
    }
}

document.getElementById('choice1').addEventListener('click', () => checkAnswer(0));
document.getElementById('choice2').addEventListener('click', () => checkAnswer(1));
document.getElementById('choice3').addEventListener('click', () => checkAnswer(2));

displayScenario();
