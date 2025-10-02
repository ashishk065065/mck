import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import React from 'react';
import BrushTwoToneIcon from '@mui/icons-material/BrushTwoTone';

export default function WhiteBoard() {
  const [alignment, setAlignment] = React.useState('type');
  const canvasRef = React.useRef(null);
  const [drawing, setDrawing] = React.useState(false);
  const parentRef = React.useRef(null);
  const colorInputRef = React.useRef(null);
  const [color, setColor] = React.useState('#000000');

  const handleChange = (event, newAlignment) => {
    newAlignment !== null && setAlignment(newAlignment);
  };

  const handleClear = () => {
    if (alignment === 'type') {
      const textarea = document.getElementById('type-area');
      if (textarea) textarea.value = '';
    } else {
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }
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
    ctx.strokeStyle = color;
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
        <div>
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
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          {alignment === 'draw' && (
            <div>
              <button
                className="clear"
                onClick={() => colorInputRef.current && colorInputRef.current.click()}
              >
                <BrushTwoToneIcon />
              </button>
              <input
                ref={colorInputRef}
                className="color-picker"
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                title="Brush Color"
                style={{ display: 'none' }}
              />
            </div>
          )}
          <button className="clear" onClick={handleClear}>
            Clear
          </button>
        </div>
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
