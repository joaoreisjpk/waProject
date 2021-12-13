import { Button, ButtonGroup, Grid, Link, Typography } from '@mui/material';
import NextLink from 'next/link';
import Header from '../../components/Header';

import SendIcon from '@mui/icons-material/Send';
import CancelIcon from '@mui/icons-material/Cancel';
import { useRouter } from 'next/router';

export default function Start() {
  const { push } = useRouter();
  return (
    <>
      <Header />
      <Grid
        container
        height='80vh'
        justifyItems='center'
        direction='column'
        justifyContent='center'
        alignItems='center'
      >
        {' '}
        <ButtonGroup
          sx={{
            height: 70,
          }}
          variant='contained'
        >
          <Button endIcon={<SendIcon />} sx={{width: 200}} onClick={() => push('/questions')}>
            <Typography variant='h5'>Start</Typography>
          </Button>
          <Button endIcon={<CancelIcon />} sx={{width: 200}} onClick={() => push('/')}>
            <Typography variant='h5'>Cancel</Typography>
          </Button>
        </ButtonGroup>
      </Grid>
    </>
  );
}
