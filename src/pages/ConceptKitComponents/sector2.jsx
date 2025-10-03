import React, { useState } from 'react';
import { FormControl, MenuItem, Select } from '@mui/material';

const Sector2 = () => {
  const [selectedSymbol, setSelectedSymbol] = useState('+');
  const [selectedCircles, setSelectedCircles] = useState([
    'c2',
    'c4',
    'c6',
    'c8',
    'c10',
    'c12',
    'c14',
    'c16',
    'c18',
    'c20',
    'c22',
    'c24',
    'c26',
  ]);

  const handleCircleClick = (removeCircle, addCircle) => {
    const temp = selectedCircles.filter((f) => f !== removeCircle);
    setSelectedCircles([...temp, addCircle]);
  };

  // Configuration for each column
  const columns = [
    { ids: ['c1', 'c2'], color: '#81c784' },
    { ids: ['c3', 'c4'], color: 'pink' },
    { ids: ['c5', 'c6'], color: '#64b5f6' },
    { ids: ['c7', 'c8'], color: '#64b5f6' },
    { ids: ['c9', 'c10'], color: '#ff8a65' },
    { ids: ['c11', 'c12'], color: '#ff8a65' },
    { ids: ['dropdown'] }, // special case for column 7
    { ids: ['c15', 'c16'], color: '#81c784' },
    { ids: ['c17', 'c18'], color: 'pink' },
    { ids: ['c19', 'c20'], color: '#64b5f6' },
    { ids: ['c21', 'c22'], color: '#64b5f6' },
    { ids: ['c23', 'c24'], color: '#ff8a65' },
    { ids: ['c25', 'c26'], color: '#ff8a65' },
  ];

  return (
    <div id="sector2">
      {columns.map((col, colIndex) => (
        <>
          {col.ids[0] === 'dropdown' ? (
            <div id="section4DropdownDiv">
              <FormControl className="selectKit">
                <Select
                  labelId="symbol-select-label"
                  id="kit-select"
                  value={selectedSymbol}
                  label="Age"
                  onChange={(e) => {
                    setSelectedSymbol(e.target.value);
                  }}
                  variant="outlined"
                >
                  <MenuItem value="+">+</MenuItem>
                  <MenuItem value="-">-</MenuItem>
                  <MenuItem value="*">*</MenuItem>
                  <MenuItem value="/">/</MenuItem>
                </Select>
              </FormControl>
            </div>
          ) : (
            <div key={colIndex} id={`column${colIndex + 1}`} className="sectorColumns">
              {col.ids[0] !== 'dropdown' &&
                col.ids.map((id, idx) => {
                  const pairedId = col.ids.length === 2 ? col.ids[1 - idx] : null;
                  return (
                    <div
                      key={id}
                      id={id}
                      role="button"
                      className="circle"
                      tabIndex={0}
                      style={{
                        backgroundColor: selectedCircles.includes(id) ? col.color : '',
                      }}
                      onClick={() => pairedId && handleCircleClick(pairedId, id)}
                      onKeyDown={(e) => {
                        if ((e.key === 'Enter' || e.key === ' ') && pairedId) {
                          handleCircleClick(pairedId, id);
                        }
                      }}
                    ></div>
                  );
                })}
            </div>
          )}
        </>
      ))}
    </div>
  );
};

export default Sector2;
