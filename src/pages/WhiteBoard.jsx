import { Slider, ToggleButton, ToggleButtonGroup } from '@mui/material';
import React from 'react';
import BrushTwoToneIcon from '@mui/icons-material/BrushTwoTone';
import FormatSizeTwoToneIcon from '@mui/icons-material/FormatSizeTwoTone';
import DeleteForeverTwoToneIcon from '@mui/icons-material/DeleteForeverTwoTone';
import Box from '@mui/material/Box';

export default function WhiteBoard() {
  const [alignment, setAlignment] = React.useState('type');
  const canvasRef = React.useRef(null);
  const [drawing, setDrawing] = React.useState(false);
  const parentRef = React.useRef(null);
  const colorInputRef = React.useRef(null);
  const [color, setColor] = React.useState('#fff');
  const [lineWidth, setLineWidth] = React.useState(2);
  const [fontSize, setFontSize] = React.useState(18);
  const [showSlider, setShowSlider] = React.useState(false);

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
    const threshold = 50;
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
    ctx.lineWidth = lineWidth;
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);

    if (y > canvas.height - threshold) {
      const oldImage = ctx.getImageData(0, 0, canvas.width, canvas.height);
      canvas.height = canvas.height + 300;
      ctx.putImageData(oldImage, 0, 0);
    }

    if (x > canvas.width - threshold) {
      const oldImage = ctx.getImageData(0, 0, canvas.width, canvas.height);
      canvas.width = canvas.width + 300;
      ctx.putImageData(oldImage, 0, 0);
    }
  };

  const handleSliderChange = (e) => {
    alignment === 'draw'
      ? setLineWidth(parseInt(e.target.value) * 2)
      : setFontSize(parseInt(e.target.value) * 2 + 14);
  };

  React.useEffect(() => {
    if (showSlider) {
      const timer = setTimeout(() => setShowSlider(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showSlider]);

  const resetPath = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.beginPath();
  };

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
        <div style={{ display: 'flex' }}>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <label htmlFor="color-picker">
              <button
                style={{
                  background: color.includes('#fff') ? '#1e3a8a' : color,
                  padding: '0 3px',
                  marginRight: '10px',
                }}
                title="Color"
                className="borderButton"
              >
                <BrushTwoToneIcon />
              </button>
            </label>
            <input
              id="color-picker"
              ref={colorInputRef}
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              style={{ position: 'absolute', opacity: 0 }}
            />
            {showSlider && (
              <Box sx={{ width: 100, height: 30, marginRight: '10px' }}>
                <Slider
                  aria-label="brushSize"
                  defaultValue={alignment === 'draw' ? lineWidth / 2 : (fontSize - 14) / 2}
                  valueLabelDisplay="auto"
                  shiftStep={1}
                  step={1}
                  marks
                  min={1}
                  max={5}
                  onChange={handleSliderChange}
                />
              </Box>
            )}
            <button
              style={{ padding: '0 3px', marginRight: '10px' }}
              title="Size"
              className="borderButton"
              onClick={() => setShowSlider((s) => !s)}
            >
              <FormatSizeTwoToneIcon />
            </button>
            <button
              style={{ padding: '0 3px' }}
              className="borderButton"
              onClick={handleClear}
              title="Clear"
            >
              <DeleteForeverTwoToneIcon />
            </button>
          </div>
        </div>
      </div>
      <div
        className="type-draw-div"
        ref={parentRef}
        style={{ overflowY: 'auto', overflowX: 'hidden' }}
      >
        {alignment === 'type' ? (
          <textarea
            id="type-area"
            className="type-area"
            placeholder="You can start typing here"
            style={{ fontSize: fontSize, color: color }}
          ></textarea>
        ) : (
          <canvas
            ref={canvasRef}
            width={400}
            height={400}
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
