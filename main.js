const themeToggle = document.getElementById('theme-toggle');
const generateBtn = document.getElementById('generate-btn');
const copyBtn = document.getElementById('copy-btn');
const numbersDisplay = document.getElementById('lotto-numbers-display');
const body = document.body;

let currentNumbers = [];

// 1. 테마 관리
const applyTheme = (theme) => {
    body.setAttribute('data-theme', theme);
    themeToggle.checked = theme === 'light';
};

const savedTheme = localStorage.getItem('lotto_theme') || 'dark';
applyTheme(savedTheme);

themeToggle.addEventListener('change', () => {
    const newTheme = themeToggle.checked ? 'light' : 'dark';
    localStorage.setItem('lotto_theme', newTheme);
    applyTheme(newTheme);
});

// 2. 로또 번호 생성 로직
const generateLottoNumbers = () => {
    const numbers = new Set();
    while (numbers.size < 6) {
        const randomNumber = Math.floor(Math.random() * 45) + 1;
        numbers.add(randomNumber);
    }
    currentNumbers = Array.from(numbers).sort((a, b) => a - b);
};

// 3. 번호 표시 로직
const displayNumbers = () => {
    numbersDisplay.innerHTML = '';
    currentNumbers.forEach((number, index) => {
        const ball = document.createElement('div');
        ball.classList.add('lotto-ball');
        ball.textContent = number;
        ball.style.backgroundColor = getBallColor(number);
        ball.style.animationDelay = `${index * 0.08}s`;
        numbersDisplay.appendChild(ball);
    });
};

const getBallColor = (number) => {
    if (number <= 10) return '#FBC400'; // 노란색
    if (number <= 20) return '#69C8F2'; // 파란색
    if (number <= 30) return '#FF7272'; // 빨간색
    if (number <= 40) return '#AAAAAA'; // 회색
    return '#B0D840'; // 녹색
};

// 4. 이벤트 리스너
generateBtn.addEventListener('click', () => {
    generateLottoNumbers();
    displayNumbers();
    copyBtn.disabled = false;
    copyBtn.textContent = '번호 복사';
});

copyBtn.addEventListener('click', () => {
    if (currentNumbers.length === 0) return;

    const numbersString = currentNumbers.join(', ');
    navigator.clipboard.writeText(numbersString)
        .then(() => {
            copyBtn.textContent = '복사 완료!';
            setTimeout(() => {
                copyBtn.textContent = '번호 복사';
            }, 2000);
        })
        .catch(err => {
            console.error('클립보드 복사 실패:', err);
            copyBtn.textContent = '복사 실패';
        });
});