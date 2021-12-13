import { Button, Link, Typography } from '@mui/material';
import NextLink from 'next/link';
import Header from '../../components/Header';
import { useQuestions } from '../../context/useQuestions';

import SendIcon from '@mui/icons-material/Send';
import CancelIcon from '@mui/icons-material/Cancel';

export default function Start() {
  return (
    <>
      <Header />
      <Button
        endIcon={<SendIcon />}
        size='large'
        variant='contained'
      >
        <NextLink href='/questions'>
          <Link color='secondary' underline='none'>
            <Typography variant='h5'>Start</Typography>
          </Link>
        </NextLink>
      </Button>

      <Button endIcon={<CancelIcon />} size='large' variant='contained'>
        <NextLink href='/'>
          <Link href='#' color='secondary' underline='none'>
            <Typography variant='h5'>Cancel</Typography>
          </Link>
        </NextLink>
      </Button>
    </>
  );
}
