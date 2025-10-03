import { Autocomplete, TextField } from '@mui/material';
import { constants } from '../assets/constants.js';
import React from 'react';

export default function QuizApp() {
  const [selectedTopic, setSelectedTopic] = React.useState(null);
  const [quizStarted, setQuizStarted] = React.useState(false);

  return (
    <>
      <div className={`quizApp-header ${selectedTopic === null ? 'quizApp-header-center' : ''}`}>
        {selectedTopic === null && <h3>Choose the topic to start quiz</h3>}
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: '10px',
            justifyContent: 'space-between',
          }}
        >
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
          {quizStarted === true && (
            <button
              className="quiz-button"
              onClick={() => {
                setQuizStarted(false);
              }}
            >
              End
            </button>
          )}
        </div>
      </div>
      {selectedTopic && quizStarted === false && (
        <div className="quizApp-body">
          <button className="quiz-button" onClick={() => {}}>
            Help
          </button>
          <button
            className="quiz-button"
            onClick={() => {
              setQuizStarted(true);
            }}
          >
            Start Quiz
          </button>
        </div>
      )}
      {selectedTopic && quizStarted && <div></div>}
    </>
  );
}
