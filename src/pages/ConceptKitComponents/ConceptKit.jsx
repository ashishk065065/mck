import React, { useState } from 'react';
import './ConceptKit.css';
import Sector1 from './sector1.jsx';
import Numbers from './numbers.jsx';
import Sector2 from './sector2.jsx';
import Sector3 from './sector3.jsx';
import Sector3App2 from './sector3App2.jsx';
import Sector4App3 from './sector4App3.jsx';
import Sector5App2 from './Sector5App2.jsx';
import Sector4 from './sector4.jsx';
import { FormControl, MenuItem, Select } from '@mui/material';

export default function ConceptKit() {
  const [selectedApp, setSelectedApp] = useState('mathematical concept kit');

  const handleChange = (event) => {
    setSelectedApp(event.target.value);
  };

  return (
    <>
      <div style={{ width: '400px' }}>
        <FormControl fullWidth className="selectKit">
          <Select
            labelId="demo-simple-select-label"
            id="kit-select"
            value={selectedApp}
            label="Age"
            onChange={handleChange}
            variant="outlined"
          >
            <MenuItem value="mathematical concept kit">Mathematical Concept Kit</MenuItem>
            <MenuItem value="algebraic mathematical concept kit">
              Algebraic Mathematical Concept Kit
            </MenuItem>
            <MenuItem value="conversions and calculations concept kit">
              Conversions and Calculations Concept Kit
            </MenuItem>
          </Select>
        </FormControl>
      </div>
      <div className="innovationDiv" style={{ transform: `scale(0.9)` }}>
        <Sector1 />
        <Numbers />
        <Sector2 />
        {selectedApp === 'mathematical concept kit' ? <Sector3 /> : <Sector3App2 />}
        {selectedApp === 'conversions and calculations concept kit' && <Sector4App3 />}
        <Sector4 />
        {selectedApp === 'algebraic mathematical concept kit' && <Sector5App2 />}
      </div>
    </>
  );
}
