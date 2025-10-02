import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import React from 'react';

export default function WhiteBoard() {
  const [alignment, setAlignment] = React.useState('type');
  const canvasRef = React.useRef(null);
  const [drawing, setDrawing] = React.useState(false);
  const parentRef = React.useRef(null);

  const handleChange = (event, newAlignment) => {
    newAlignment !== null && setAlignment(newAlignment);
  };

  const handleClear = () => {
    const textarea = document.getElementById('type-area');
    if (textarea) textarea.value = '';
  };

  const startDrawing = (e) => {
    setDrawing(true);
    draw(e);
  };
  const endDrawing = () => {
    setDrawing(false);
  };
  const draw = (e) => {
    if (!drawing) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let x, y;
    if (e.touches) {
      const rect = canvas.getBoundingClientRect();
      x = e.touches[0].clientX - rect.left;
      y = e.touches[0].clientY - rect.top;
    } else {
      x = e.nativeEvent.offsetX;
      y = e.nativeEvent.offsetY;
    }
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const resetPath = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.beginPath();
  };

  React.useEffect(() => {
    if (canvasRef.current && parentRef.current) {
      const { offsetWidth, offsetHeight } = parentRef.current;
      canvasRef.current.width = offsetWidth - 10;
      canvasRef.current.height = offsetHeight - 10;
    }
  }, [alignment, parentRef?.current?.offsetWidth, parentRef?.current?.offsetHeight]);

  return (
    <>
      <div className="whiteBoard--button-header">
        <ToggleButtonGroup
          color="primary"
          value={alignment}
          exclusive
          onChange={handleChange}
          aria-label="Platform"
        >
          <ToggleButton value="type">Type</ToggleButton>
          <ToggleButton value="draw">Draw</ToggleButton>
        </ToggleButtonGroup>
        {alignment === 'type' && (
          <button className="clear" onClick={handleClear}>
            Clear
          </button>
        )}
      </div>
      <div className="type-draw-div" ref={parentRef}>
        {alignment === 'type' ? (
          <textarea
            id="type-area"
            className="type-area"
            placeholder="You can start typing here"
          ></textarea>
        ) : (
          <canvas
            ref={canvasRef}
            style={{
              touchAction: 'none',
              borderBottomRightRadius: '20px',
              borderBottomLeftRadius: '20px',
            }}
            onMouseDown={startDrawing}
            onMouseUp={() => {
              endDrawing();
              resetPath();
            }}
            onMouseOut={() => {
              endDrawing();
              resetPath();
            }}
            onBlur={resetPath}
            onMouseMove={draw}
            onTouchStart={startDrawing}
            onTouchEnd={() => {
              endDrawing();
              resetPath();
            }}
            onTouchCancel={() => {
              endDrawing();
              resetPath();
            }}
            onTouchMove={draw}
          />
        )}
      </div>
    </>
  );
}
