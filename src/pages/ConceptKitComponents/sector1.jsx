import { useState } from 'react';

const Sector1 = () => {
  const [selectedCircles, setSelectedCircles] = useState([
    'c2',
    'c4',
    'c6',
    'c8',
    'c10',
    'c12',
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

  const columns = [
    { ids: ['c1', 'c2'], color: '#81c784' },
    { ids: ['c3', 'c4'], color: 'pink' },
    { ids: ['c5', 'c6'], color: '#64b5f6' },
    { ids: ['c7', 'c8'], color: '#64b5f6' },
    { ids: ['c9', 'c10'], color: '#ff8a65' },
    { ids: ['c11', 'c12'], color: '#ff8a65' },
    { ids: ['c13'], color: null }, // single circle
    { ids: ['c15', 'c16'], color: '#81c784' },
    { ids: ['c17', 'c18'], color: 'pink' },
    { ids: ['c19', 'c20'], color: '#64b5f6' },
    { ids: ['c21', 'c22'], color: '#64b5f6' },
    { ids: ['c23', 'c24'], color: '#ff8a65' },
    { ids: ['c25', 'c26'], color: '#ff8a65' },
  ];

  return (
    <div id="sector1">
      {columns.map((col, colIndex) => (
        <div key={colIndex} id={`column${colIndex + 1}`} className="sectorColumns">
          {col.ids.map((id, idx) => {
            const pairedId = col.ids.length === 2 ? col.ids[1 - idx] : null;
            return (
              <div
                key={id}
                id={id}
                className="circle"
                role="button"
                tabIndex={0}
                style={{
                  backgroundColor: selectedCircles.includes(id) ? col.color : '',
                  marginTop: id === 'c13' ? '15px' : undefined,
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
      ))}
    </div>
  );
};

export default Sector1;
