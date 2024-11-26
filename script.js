document.addEventListener('DOMContentLoaded', () => {
    let timerInterval;
    let isRunning = false;
    let timeLeftInSeconds = 0;
    
    const minutesInput = document.getElementById('minutes');
    const secondsInput = document.getElementById('seconds');
    const timerDisplay = document.getElementById('timer-display');
    const startBtn = document.getElementById('start-btn');
    const pauseBtn = document.getElementById('pause-btn');
    const resetBtn = document.getElementById('reset-btn');
    
    startBtn.addEventListener('click', () => {
        if (!isRunning) {
            const minutes = parseInt(minutesInput.value) || 0;
            const seconds = parseInt(secondsInput.value) || 0;
            timeLeftInSeconds = minutes * 60 + seconds;
            
            updateDisplay(timeLeftInSeconds);
            
            timerInterval = setInterval(() => {
                timeLeftInSeconds--;
                updateDisplay(timeLeftInSeconds);

                if (timeLeftInSeconds <= 0) {
                    clearInterval(timerInterval);
                    timerInterval = null;
                    isRunning = false;
                    startBtn.disabled = false;
                    pauseBtn.disabled = true;
                }
            }, 1000);
            
            isRunning = true;
            startBtn.disabled = true;
            pauseBtn.disabled = false;
        }
    });

    pauseBtn.addEventListener('click', () => {
        clearInterval(timerInterval);
        timerInterval = null;
        isRunning = false;
        startBtn.disabled = false;
        pauseBtn.disabled = true;
    });
    resetBtn.addEventListener('click', () => {
        clearInterval(timerInterval);
        timerInterval = null;
        isRunning = false;
        startBtn.disabled = false;
        pauseBtn.disabled = true;
        updateDisplay(0);
    });
    function updateDisplay(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        timerDisplay.textContent = `${formatTime(minutes)}:${formatTime(remainingSeconds)}`;
    }
    function formatTime(time) {
        return time < 10 ? `0${time}` : time;
    }
});
