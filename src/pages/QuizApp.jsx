import { Autocomplete, FormControl, FormControlLabel, RadioGroup, TextField } from '@mui/material';
import Radio from '@mui/material/Radio';
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
      {selectedTopic && quizStarted && (
        <div style={{ marginTop: '20px' }}>
          <FormControl>
            <span style={{ fontSize: '20px' }}>1111 + 2222</span>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue=""
              name="radio-buttons-group"
            >
              <FormControlLabel value="3333" control={<Radio />} label="3333" />
              <FormControlLabel value="4444" control={<Radio />} label="4444" />
              <FormControlLabel value="5555" control={<Radio />} label="5555" />
              <FormControlLabel value="1111" control={<Radio />} label="1111" />
            </RadioGroup>
          </FormControl>
        </div>
      )}
    </>
  );
}
