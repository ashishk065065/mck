import { useState } from 'react';

const Sector4 = () => {
  const circles = [
    { column1: ['c9', 'c10', 'c11', 'c12', 'c13', 'c14', 'c15', 'c16'] },
    { column2: ['c9', 'c10', 'c11', 'c12', 'c13', 'c14', 'c15', 'c16'] },
    { column3: ['c9', 'c10', 'c11', 'c12', 'c13', 'c14', 'c15', 'c16'] },
    { column4: ['c9', 'c10', 'c11', 'c12', 'c13', 'c14', 'c15', 'c16'] },
    { column5: ['c9', 'c10', 'c11', 'c12', 'c13', 'c14', 'c15', 'c16'] },
    { column6: ['c9', 'c10', 'c11', 'c12', 'c13', 'c14', 'c15', 'c16'] },
    { column7: ['c9', 'c10', 'c11', 'c12', 'c13', 'c14', 'c15', 'c16'] },
    { column8: ['c9', 'c10', 'c11', 'c12', 'c13', 'c14', 'c15', 'c16'] },
    { column9: ['c9', 'c10', 'c11', 'c12', 'c13', 'c14', 'c15', 'c16'] },
    { column10: ['c9', 'c10', 'c11', 'c12', 'c13', 'c14', 'c15', 'c16'] },
    { column11: ['c9', 'c10', 'c11', 'c12', 'c13', 'c14', 'c15', 'c16'] },
    { column12: ['c9', 'c10', 'c11', 'c12', 'c13', 'c14', 'c15', 'c16'] },
    { column13: ['c9', 'c10', 'c11', 'c12', 'c13', 'c14', 'c15', 'c16'] },
  ];
  const columnColors = [
    '#81c784',
    'pink',
    '#64b5f6',
    '#64b5f6',
    '#ff8a65',
    '#ff8a65',
    '',
    '#81c784',
    'pink',
    '#64b5f6',
    '#64b5f6',
    '#ff8a65',
    '#ff8a65',
  ];
  const [selectedCircles, setSelectedCircles] = useState(circles);

  const getColumnKey = (idx) => `column${idx + 1}`;

  const handleCircleClick = (colIdx, clickedCircle) => {
    const circleNum = parseInt(clickedCircle.replace('c', ''));
    let newColumn = [];
    if (clickedCircle === 'c9') {
      newColumn = ['c9', 'c10', 'c11', 'c12', 'c13', 'c14', 'c15', 'c16'];
    } else {
      let mappedNum = circleNum;
      if (circleNum >= 9 && circleNum <= 16) {
        mappedNum = circleNum - 9;
      }
      if (mappedNum >= 1 && mappedNum <= 8) {
        for (let i = 1; i <= mappedNum; i++) {
          newColumn.push(`c${i}`);
        }
        for (let i = 16; i >= 9 && newColumn.length < 8; i--) {
          const c = `c${i}`;
          if (!newColumn.includes(c)) {
            newColumn.push(c);
          }
        }
      } else {
        return;
      }
      if (newColumn.length > 8) {
        newColumn = newColumn.slice(0, 8);
      }
    }
    setSelectedCircles((prev) => {
      const updated = [...prev];
      const colKey = getColumnKey(colIdx);
      updated[colIdx] = { [colKey]: newColumn };
      return updated;
    });
  };

  return (
    <div id="sector4">
      {selectedCircles.map((col, colIdx) => {
        if (colIdx === 6) {
          return (
            <div id="section4DropdownDiv" key="dropdown-col">
              <select id="section4Dropdown" className="gridSelectApp">
                <option>=</option>
                <option>&lt;</option>
                <option>&gt;</option>
                <option>!=</option>
                <option>.</option>
              </select>
            </div>
          );
        } else {
          const colKey = getColumnKey(colIdx);
          return (
            <div key={colKey} id={colKey} className="sectorColumns">
              {[...Array(16)].map((_, i) => {
                const circleId = `c${i + 1}`;
                return (
                  <div
                    key={circleId}
                    id={circleId}
                    className="circle"
                    role="button"
                    tabIndex={0}
                    style={{
                      backgroundColor: col[colKey].includes(circleId) ? columnColors[colIdx] : '',
                    }}
                    onClick={() => handleCircleClick(colIdx, circleId)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        handleCircleClick(colIdx, circleId);
                      }
                    }}
                  ></div>
                );
              })}
            </div>
          );
        }
      })}
    </div>
  );
};

export default Sector4;
