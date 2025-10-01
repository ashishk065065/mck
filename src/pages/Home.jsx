import React, { useState, useRef } from 'react';
import ConceptKit from './ConceptKitComponents/ConceptKit.jsx';

export default function Home() {
  const [quizWidthPercent, setQuizWidthPercent] = useState(35);
  const containerRef = useRef(null);
  const dragging = useRef(false);

  const handleMouseDown = () => {
    dragging.current = true;
    document.body.style.cursor = 'col-resize';
  };

  const handleMouseUp = () => {
    dragging.current = false;
    document.body.style.cursor = 'default';
  };

  const handleMouseMove = (e) => {
    if (dragging.current && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      let percent = ((e.clientX - rect.left) / rect.width) * 100;
      percent = Math.max(35, Math.min(percent, 100 - 35));
      setQuizWidthPercent(percent);
    }
  };

  const handleTouchStart = () => {
    dragging.current = true;
    document.body.style.cursor = 'col-resize';
  };

  const handleTouchMove = (e) => {
    if (dragging.current && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const touch = e.touches[0];
      let percent = ((touch.clientX - rect.left) / rect.width) * 100;
      percent = Math.max(35, Math.min(percent, 100 - 35));
      setQuizWidthPercent(percent);
    }
  };

  const handleTouchEnd = () => {
    dragging.current = false;
    document.body.style.cursor = 'default';
  };

  React.useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleTouchEnd);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  return (
    <div className="home-div" ref={containerRef}>
      <div className="home-quiz" style={{ width: `${quizWidthPercent}%`, minWidth: '35%' }}></div>
      <div
        id="resizer"
        role="button"
        tabIndex={0}
        style={{
          width: 5,
          cursor: 'col-resize',
          background: 'transparent',
          zIndex: 1,
        }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        onKeyDown={(e) => {
          if (e.key === 'ArrowLeft') setQuizWidthPercent((p) => Math.max(35, p - 2));
          if (e.key === 'ArrowRight') setQuizWidthPercent((p) => Math.min(65, p + 2));
        }}
      />
      <div className="home-kit" style={{ width: `${100 - quizWidthPercent}%`, minWidth: '35%' }}>
        <ConceptKit />
      </div>
    </div>
  );
}
