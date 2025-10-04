import { Modal } from '@mui/material';
import Box from '@mui/material/Box';
import React from 'react';
import BackspaceIcon from '@mui/icons-material/Backspace';

export default function Calculator({ isCalculatorOpen, setIsCalculatorOpen }) {
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '35%',
    height: '60%',
    bgcolor: '#1e3a8a',
    border: '1px solid #1e3a8a',
    borderRadius: '20px',
    boxShadow: 24,
    p: 4,
    paddingTop: '20px',
  };

  const [inputValue, setInputValue] = React.useState('0');
  const [firstValue, setFirstValue] = React.useState(null);
  const [operator, setOperator] = React.useState(null);
  const [waitingForSecondValue, setWaitingForSecondValue] = React.useState(false);
  const [secondValue, setSecondValue] = React.useState(null);

  React.useEffect(() => {
    if (waitingForSecondValue === true && operator && firstValue !== null) {
      setSecondValue(parseFloat(inputValue));
    }
  }, [inputValue, waitingForSecondValue, operator, firstValue]);

  const compute = () => {
    if (firstValue !== null && operator && secondValue !== null) {
      let result;
      switch (operator) {
        case '+':
          result = firstValue + secondValue;
          break;
        case '-':
          result = firstValue - secondValue;
          break;
        case '*':
          result = firstValue * secondValue;
          break;
        case '/':
          result = firstValue / secondValue;
          break;
        default:
          return;
      }
      setInputValue(String(result));
      setFirstValue(null);
      setSecondValue(null);
      setOperator(null);
      setWaitingForSecondValue(false);
    }
  };

  const sanitizeInputValue = (value) => {
    if (value.length > 1 && value[0] === '0' && value[1] !== '.') {
      return value.replace(/^0+/, '');
    }
    return value;
  };

  const handleInput = (val) => {
    setInputValue((prev) =>
      sanitizeInputValue(prev === '0' ? val : sanitizeInputValue(prev + val))
    );
  };

  return (
    <>
      <Modal id="calculator" open={isCalculatorOpen} onClose={() => setIsCalculatorOpen(false)}>
        <Box sx={style}>
          <div
            style={{
              display: 'flex',
              height: '100%',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <span style={{ fontSize: '20px' }}>Calculator</span>
            <div
              style={{
                flex: 1,
                width: '100%',
                height: '100%',
                marginTop: '20px',
                border: '1px solid #ccc',
                borderRadius: '10px',
              }}
            >
              <div style={{ width: '100%', height: '20%', borderBottom: '1px solid #ccc' }}>
                <input
                  type="text"
                  readOnly
                  style={{
                    width: '100%',
                    height: '100%',
                    fontSize: '24px',
                    textAlign: 'right',
                    border: 'none',
                    paddingRight: '10px',
                    boxSizing: 'border-box',
                    borderRadius: '10px 10px 0 0',
                    backgroundColor: '#a3bcff',
                    color: '#1e3a8a',
                  }}
                  value={inputValue}
                />
              </div>
              <div style={{ width: '100%', height: '80%' }}>
                <div className="calculator-row">
                  <button
                    className="calculator-cell"
                    onClick={() => {
                      setInputValue('0');
                    }}
                  >
                    Clear
                  </button>
                  <button
                    className="calculator-cell"
                    onClick={() => {
                      let newValue = inputValue.slice(0, -1);
                      if (newValue === '' || newValue === '-') {
                        newValue = '0';
                      }
                      setInputValue(sanitizeInputValue(newValue));
                    }}
                  >
                    <BackspaceIcon />
                  </button>
                  <button className="calculator-cell">%</button>
                  <button
                    className="calculator-cell rb"
                    onClick={() => {
                      setFirstValue(parseFloat(inputValue));
                      setOperator('/');
                      setWaitingForSecondValue(true);
                      setInputValue('0');
                    }}
                  >
                    /
                  </button>
                </div>
                <div className="calculator-row">
                  <button className="calculator-cell" onClick={() => handleInput('1')}>
                    1
                  </button>
                  <button className="calculator-cell" onClick={() => handleInput('2')}>
                    2
                  </button>
                  <button className="calculator-cell" onClick={() => handleInput('3')}>
                    3
                  </button>
                  <button
                    className="calculator-cell rb"
                    onClick={() => {
                      setFirstValue(parseFloat(inputValue));
                      setOperator('*');
                      setWaitingForSecondValue(true);
                      setInputValue('0');
                    }}
                  >
                    *
                  </button>
                </div>
                <div className="calculator-row">
                  <button className="calculator-cell" onClick={() => handleInput('4')}>
                    4
                  </button>
                  <button className="calculator-cell" onClick={() => handleInput('5')}>
                    5
                  </button>
                  <button className="calculator-cell" onClick={() => handleInput('6')}>
                    6
                  </button>
                  <button
                    className="calculator-cell rb"
                    onClick={() => {
                      setFirstValue(parseFloat(inputValue));
                      setOperator('-');
                      setWaitingForSecondValue(true);
                      setInputValue('0');
                    }}
                  >
                    -
                  </button>
                </div>
                <div className="calculator-row">
                  <button className="calculator-cell" onClick={() => handleInput('7')}>
                    7
                  </button>
                  <button className="calculator-cell" onClick={() => handleInput('8')}>
                    8
                  </button>
                  <button className="calculator-cell" onClick={() => handleInput('9')}>
                    9
                  </button>
                  <button
                    className="calculator-cell rb"
                    onClick={() => {
                      setFirstValue(parseFloat(inputValue));
                      setOperator('+');
                      setWaitingForSecondValue(true);
                      setInputValue('0');
                    }}
                  >
                    +
                  </button>
                </div>
                <div className="calculator-row lr">
                  <button
                    className="calculator-cell"
                    onClick={() => {
                      if (inputValue !== '0') {
                        if (inputValue.startsWith('-')) {
                          setInputValue(inputValue.slice(1));
                        } else {
                          setInputValue('-' + inputValue);
                        }
                      }
                    }}
                  >
                    +/-
                  </button>
                  <button className="calculator-cell" onClick={() => handleInput('0')}>
                    0
                  </button>
                  <button
                    className="calculator-cell"
                    onClick={() => {
                      if (!inputValue.includes('.')) {
                        handleInput('.');
                      }
                    }}
                  >
                    .
                  </button>
                  <button className="calculator-cell rb" onClick={compute}>
                    =
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </>
  );
}
