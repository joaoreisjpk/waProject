import { Button, Link, Typography } from '@mui/material';
import NextLink from 'next/link';
import Header from '../../components/Header';

import SendIcon from '@mui/icons-material/Send';
import CancelIcon from '@mui/icons-material/Cancel';

export default function Start() {
  return (
    <>
      <Header />
      <NextLink href='/questions'>
        <Link color='secondary' underline='none'>
          <Button endIcon={<SendIcon />} size='large' variant='contained'>
            <Typography variant='h5'>Start</Typography>
          </Button>
        </Link>
      </NextLink>

      <NextLink href='/'>
        <Link href='#' color='secondary' underline='none'>
          <Button endIcon={<CancelIcon />} size='large' variant='contained'>
            <Typography variant='h5'>Cancel</Typography>
          </Button>
        </Link>
      </NextLink>
    </>
  );
}
