import { Autocomplete, TextField } from '@mui/material';
import { constants } from '../assets/constants.js';
import React from 'react';

export default function QuizApp() {
  const [selectedTopic, setSelectedTopic] = React.useState(null);

  return (
    <>
      <div className="quizApp-header">
        <Autocomplete
          disablePortal
          options={constants}
          sx={{ width: 250 }}
          renderInput={(params) => <TextField {...params} label="Topic" />}
          value={selectedTopic}
          onChange={(event, newValue) => {
            setSelectedTopic(newValue?.label || null);
          }}
        />
      </div>
    </>
  );
}
