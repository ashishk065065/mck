const Sector4App3 = () => {
  const exponents = Array.from({ length: 13 }, (_, i) => i - 6);
  return (
    <div id="numbers">
      {exponents.map((exp, idx) => {
        let content;
        if (exp === 0) {
          content = <span>1</span>;
        } else if (exp === 1) {
          content = <span>10</span>;
        } else {
          content = (
            <span>
              10
              <span style={{ verticalAlign: 'super', fontSize: '0.7em', marginLeft: '2px' }}>
                {exp}
              </span>
            </span>
          );
        }
        return (
          <div key={exp} id={`column${idx + 1}`} className="numbersColumns">
            {content}
          </div>
        );
      })}
    </div>
  );
};

export default Sector4App3;
