import { Autocomplete, TextField } from '@mui/material';
import { constants, difficulty, topicSymbols } from '../assets/constants.js';
import React, { useEffect } from 'react';
import CheckTwoToneIcon from '@mui/icons-material/CheckTwoTone';

export default function QuizApp() {
  const [selectedTopic, setSelectedTopic] = React.useState(null);
  const [selectedDifficulty, setSelectedDifficulty] = React.useState(null);
  const [quizStarted, setQuizStarted] = React.useState(false);
  const [questions, setQuestions] = React.useState([]);
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [userAnswer, setUserAnswer] = React.useState('');
  const [completed, setCompleted] = React.useState(false);
  const [shake, setShake] = React.useState(false);

  useEffect(() => {
    if (selectedTopic) {
      const operator = topicSymbols[selectedTopic];
      const sampleQuestions = Array.from({ length: 5 }, () => {
        let difficultyMultiplier;
        switch (selectedDifficulty) {
          case 'Easy':
            difficultyMultiplier = 10;
            break;
          case 'Medium':
            difficultyMultiplier = 100;
            break;
          case 'Hard':
            difficultyMultiplier = Math.floor(Math.random() * (100000 - 1000 + 1)) + 1000;
            break;
          default:
            difficultyMultiplier = 10;
        }
        const number1 = Math.floor(Math.random() * difficultyMultiplier) + 1;
        const number2 = Math.floor(Math.random() * difficultyMultiplier) + 1;
        let answer;
        if (operator === '/' && number2 === 0) {
          answer = 'undefined';
        } else {
          answer = Function(`return ${number1} ${operator} ${number2}`)();
        }
        return {
          question: `What is ${number1} ${operator} ${number2}?`,
          answer,
        };
      });
      setQuestions(sampleQuestions);
      setCurrentIndex(0);
      setUserAnswer('');
      setCompleted(false);
    }
  }, [selectedDifficulty, selectedTopic]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!questions.length) return;
    const correctAnswer = String(questions[currentIndex].answer);
    if (userAnswer.trim() === correctAnswer) {
      if (currentIndex + 1 < questions.length) {
        setCurrentIndex(currentIndex + 1);
        setUserAnswer('');
        setShake(false);
      } else {
        setCompleted(true);
        setShake(false);
      }
    } else {
      setUserAnswer('');
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  };

  return (
    <>
      <div
        className={`quizApp-header ${selectedTopic !== null && quizStarted === true ? '' : 'quizApp-header-center'}`}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: '15px',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          className={`${quizStarted === false ? 'quiz-selection' : ''}`}
        >
          {quizStarted === false && (
            <span style={{ fontSize: '18px' }}>Let&#39;s begin with choosing topic and level</span>
          )}
          <Autocomplete
            disablePortal
            options={constants}
            sx={{ width: 250 }}
            renderInput={(params) => <TextField {...params} label="Topic" />}
            value={selectedTopic}
            onChange={(event, newValue) => {
              setSelectedTopic(newValue?.label || null);
            }}
            disabled={selectedTopic !== null && quizStarted === true}
          />
          {quizStarted === true ? (
            <button
              className="quiz-button"
              onClick={() => {
                setQuizStarted(false);
                setCurrentIndex(0);
                setSelectedTopic(null);
                setUserAnswer('');
                setCompleted(false);
                setQuestions([]);
                setSelectedDifficulty(null);
              }}
            >
              End
            </button>
          ) : (
            <>
              <Autocomplete
                disablePortal
                options={difficulty}
                sx={{ width: 250 }}
                renderInput={(params) => <TextField {...params} label="Level" />}
                value={selectedDifficulty}
                onChange={(event, newValue) => {
                  setSelectedDifficulty(newValue?.label || null);
                }}
                disabled={selectedTopic !== null && quizStarted === true}
              />
              <button
                style={{ width: '50%' }}
                className="quiz-button"
                onClick={() => {
                  setQuizStarted(true);
                }}
                disabled={selectedTopic === null || selectedDifficulty === null}
              >
                Start Quiz
              </button>
            </>
          )}
        </div>
      </div>
      {selectedTopic && quizStarted && (
        <div className="quizApp-body">
          {completed ? (
            <div className="quizApp-complete">Quiz complete! Well done.</div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="quizApp-question">
                <p
                  style={{
                    marginBottom: '5px',
                    fontSize: 'large',
                  }}
                >
                  {questions[currentIndex]?.question}
                </p>
                <TextField
                  id="outlined-basic"
                  label="Answer"
                  variant="outlined"
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  className={shake ? 'shake' : ''}
                />
                <button
                  type="submit"
                  className="quiz-button"
                  style={{ marginLeft: '10px', paddingLeft: '5px', paddingRight: '5px' }}
                >
                  <CheckTwoToneIcon />
                </button>
              </div>
            </form>
          )}
        </div>
      )}
    </>
  );
}
