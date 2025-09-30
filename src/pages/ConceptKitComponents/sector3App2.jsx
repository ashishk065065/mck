import { useState } from 'react';

const Sector3App2 = () => {
  const [selectedCircles1, setSelectedCircles1] = useState(['c13']);
  const [selectedCircles2, setSelectedCircles2] = useState(['c14']);

  const handleCircleClick = (clickedCircle) => {
    const circleNum = parseInt(clickedCircle.replace('c', ''), 10);

    if (clickedCircle === 'c13') {
      setSelectedCircles1(['c13']);
    } else if (clickedCircle === 'c14') {
      setSelectedCircles2(['c14']);
    } else if (circleNum > 0 && circleNum <= 6) {
      setSelectedCircles1([`c${circleNum}`]);
    } else if (circleNum > 6 && circleNum <= 12) {
      setSelectedCircles2([`c${circleNum}`]);
    } else {
      setSelectedCircles1([]);
      setSelectedCircles2([]);
    }
  };

  // Column configuration
  const columns = [
    { ids: ['c1'], color: 'red', group: 1 },
    { ids: ['c2'], color: 'red', group: 1 },
    { ids: ['c3'], color: 'red', group: 1 },
    { ids: ['c4'], color: 'red', group: 1 },
    { ids: ['c5'], color: 'red', group: 1 },
    { ids: ['c6'], color: 'red', group: 1 },
    { ids: ['c13', 'c14'], colors: ['red', 'yellow'], groups: [1, 2] }, // ✅ both in same box
    { ids: ['c7'], color: 'yellow', group: 2 },
    { ids: ['c8'], color: 'yellow', group: 2 },
    { ids: ['c9'], color: 'yellow', group: 2 },
    { ids: ['c10'], color: 'yellow', group: 2 },
    { ids: ['c11'], color: 'yellow', group: 2 },
    { ids: ['c12'], color: 'yellow', group: 2 },
  ];

  return (
    <div id="sector3">
      {columns.map((col, colIndex) => (
        <div key={colIndex} id={`column${colIndex + 1}`} className="sector3Columns">
          {col.ids.map((id, idx) => {
            const color = col.colors?.[idx] || col.color || '';
            const group = col.groups?.[idx] || col.group;
            const isSelected =
              group === 1 ? selectedCircles1.includes(id) : selectedCircles2.includes(id);

            return (
              <div
                key={id}
                id={id}
                className="circle"
                role="button"
                tabIndex={0}
                style={{ backgroundColor: isSelected ? color : '' }}
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

export default Sector3App2;
