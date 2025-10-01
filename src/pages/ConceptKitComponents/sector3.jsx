import { useState } from 'react';

const Sector3 = () => {
  const [selectedCircles, setSelectedCircles] = useState(['c13', 'c14']);

  const handleCircleClick = (clickedCircle) => {
    if (clickedCircle === 'c13' || clickedCircle === 'c14') {
      setSelectedCircles(['c13', 'c14']);
    } else {
      const circleNum = parseInt(clickedCircle.replace('c', ''), 10);
      setSelectedCircles([clickedCircle, `c${13 - circleNum}`]);
    }
  };

  const columns = [
    { ids: ['c1'], color: 'red' },
    { ids: ['c2'], color: 'red' },
    { ids: ['c3'], color: 'red' },
    { ids: ['c4'], color: 'red' },
    { ids: ['c5'], color: 'red' },
    { ids: ['c6'], color: 'red' },
    { ids: ['c13', 'c14'], colors: ['red', 'yellow'] },
    { ids: ['c7'], color: 'yellow' },
    { ids: ['c8'], color: 'yellow' },
    { ids: ['c9'], color: 'yellow' },
    { ids: ['c10'], color: 'yellow' },
    { ids: ['c11'], color: 'yellow' },
    { ids: ['c12'], color: 'yellow' },
  ];

  return (
    <div id="sector3">
      {columns.map((col, colIndex) => (
        <div key={colIndex} id={`column${colIndex + 1}`} className="sector3Columns">
          {col.ids.map((id, idx) => {
            const color = col.colors?.[idx] || col.color || '';
            return (
              <div
                key={id}
                id={id}
                className="circle"
                role="button"
                tabIndex={0}
                style={{
                  backgroundColor: selectedCircles.includes(id) ? color : '',
                }}
                onClick={() => handleCircleClick(id)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    handleCircleClick(id);
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

export default Sector3;
