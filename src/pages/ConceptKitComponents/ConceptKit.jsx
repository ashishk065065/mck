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

export default function ConceptKit() {
  const [selectedApp, setSelectedApp] = useState('mathematical concept kit');

  return (
    <>
      <div>
        <select
          className="selectApp"
          value={selectedApp}
          onChange={(e) => setSelectedApp(e.target.value)}
        >
          <option value="mathematical concept kit">Mathematical Concept Kit</option>
          <option value="algebraic mathematical concept kit">
            Algebraic Mathematical Concept Kit
          </option>
          <option value="conversions and calculations concept kit">
            Conversions and Calculations Concept Kit
          </option>
        </select>
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
