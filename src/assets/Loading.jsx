import * as React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const symbols = ['+', '-', '*', '/'];

function CircularProgressWithSymbolLabel(props) {
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography
          variant="h5"
          component="div"
          sx={{ color: 'white', fontSize: '3rem' }}
        >
          {props.symbol}
        </Typography>
      </Box>
    </Box>
  );
}

export default function Loading() {
  const [stage, setStage] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setStage((prevStage) => (prevStage >= 3 ? 0 : prevStage + 1));
    }, 200);
    return () => {
      clearInterval(timer);
    };
  }, []);

  const progress = ((stage + 1) / 4) * 50;
  const symbol = symbols[stage];

  return <CircularProgressWithSymbolLabel value={progress} symbol={symbol} />;
}