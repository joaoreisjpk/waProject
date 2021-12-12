import { AppBar, Link, Toolbar, Typography } from '@mui/material';
import Head from 'next/head';
import NextLink from 'next/link';

export default function Header() {
  return (
    <>
      <Head>
        <title>waProjet</title>
        <meta name='description' content='Generated by create next app' />
      </Head>
      <AppBar position="static">
        <Toolbar variant="dense">
          <NextLink href="/">
            <Link href="#" color="secondary" underline="none">
              <Typography variant='h5'>waProject</Typography>
            </Link>
          </NextLink>
        </Toolbar>
      </AppBar>
    </>
  );
}