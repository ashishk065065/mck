import React, { useState, useRef } from 'react';
import ConceptKit from './ConceptKitComponents/ConceptKit.jsx';
import WhiteBoard from './WhiteBoard.jsx';
import QuizApp from './QuizApp.jsx';

export default function Home({ selectedMenuItem, setSelectedMenuItem }) {
  const [quizWidthPercent, setQuizWidthPercent] = useState(35);
  const [verticalPercent, setVerticalPercent] = useState(35);
  const containerRef = useRef(null);
  const dragging = useRef(false);
  const verticalDragging = useRef(false);

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

  const handleVerticalMouseDown = () => {
    verticalDragging.current = true;
    document.body.style.cursor = 'row-resize';
  };

  const handleVerticalMouseUp = () => {
    verticalDragging.current = false;
    document.body.style.cursor = 'default';
  };

  const handleVerticalMouseMove = (e) => {
    if (verticalDragging.current && containerRef.current) {
      const quizDiv = containerRef.current.querySelector('.home-quiz');
      const rect = quizDiv.getBoundingClientRect();
      let percent = ((e.clientY - rect.top) / rect.height) * 100;
      percent = Math.max(20, Math.min(percent, 80));
      setVerticalPercent(percent);
    }
  };

  const handleVerticalTouchMove = (e) => {
    if (verticalDragging.current && containerRef.current) {
      const quizDiv = containerRef.current.querySelector('.home-quiz');
      const rect = quizDiv.getBoundingClientRect();
      const touch = e.touches[0];
      let percent = ((touch.clientY - rect.top) / rect.height) * 100;
      percent = Math.max(20, Math.min(percent, 80));
      setVerticalPercent(percent);
    }
  };

  const handleVerticalTouchStart = () => {
    verticalDragging.current = true;
    document.body.style.cursor = 'row-resize';
  };

  const handleVerticalTouchEnd = () => {
    verticalDragging.current = false;
    document.body.style.cursor = 'default';
  };

  React.useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleTouchEnd);
    window.addEventListener('mousemove', handleVerticalMouseMove);
    window.addEventListener('mouseup', handleVerticalMouseUp);
    window.addEventListener('touchmove', handleVerticalTouchMove);
    window.addEventListener('touchend', handleVerticalTouchEnd);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('mousemove', handleVerticalMouseMove);
      window.removeEventListener('mouseup', handleVerticalMouseUp);
      window.removeEventListener('touchmove', handleVerticalTouchMove);
      window.removeEventListener('touchend', handleVerticalTouchEnd);
    };
  }, []);

  return (
    <div className="home-div" ref={containerRef}>
      <div
        className="home-quiz"
        style={{
          width: `${quizWidthPercent}%`,
          minWidth: '35%',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
        }}
      >
        <div className="quiz" style={{ height: `${verticalPercent}%`, minHeight: '20%' }}>
          <QuizApp />
        </div>
        <div
          className="vertical-resizer"
          role="button"
          tabIndex={0}
          style={{
            height: 5,
            cursor: 'row-resize',
            background: 'transparent',
            zIndex: 1,
          }}
          onMouseDown={handleVerticalMouseDown}
          onTouchStart={handleVerticalTouchStart}
          onKeyDown={(e) => {
            if (e.key === 'ArrowUp') setVerticalPercent((p) => Math.max(20, p - 2));
            if (e.key === 'ArrowDown') setVerticalPercent((p) => Math.min(80, p + 2));
          }}
        />
        <div
          className="whiteBoard"
          style={{ height: `${100 - verticalPercent}%`, minHeight: '20%' }}
        >
          <WhiteBoard />
        </div>
      </div>
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
        <ConceptKit selectedMenuItem={selectedMenuItem} setSelectedMenuItem={setSelectedMenuItem} />
      </div>
    </div>
  );
}
