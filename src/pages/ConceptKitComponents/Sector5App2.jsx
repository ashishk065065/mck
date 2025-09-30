const Sector5App2 = () => {
  const columns = [
    '-x',
    '+x',
    '-ve',
    '-ve',
    '+ve',
    '+ve',
    '',
    '-x',
    '+x',
    '-ve',
    '-ve',
    '+ve',
    '+ve',
  ];

  return (
    <div id="numbers">
      {columns.map((value, idx) => (
        <div key={idx} id={`column${idx + 1}`} className="numbersColumns">
          <span>{value}</span>
        </div>
      ))}
    </div>
  );
};

export default Sector5App2;
