const Numbers = () => {
  const range = Array.from({ length: 13 }, (_, i) => i - 6);
  return (
    <div id="numbers">
      {range.map((num, idx) => (
        <div key={num} id={`column${idx + 1}`} className="numbersColumns">
          <span>{num}</span>
        </div>
      ))}
    </div>
  );
};

export default Numbers;
