/* eslint-disable @next/next/no-server-import-in-page */
import { NextResponse } from 'next/server';
import { supabase } from './supabase';

export const withAuth = (handler) => {
  return async (req, res) => {
    let authResult = await getUser(req);
    //console.log(req, undefined, 2);
    if (authResult.error) {
      console.log(
        'Authorization error, redirecting to login page',
        authResult.error
      );
      return res.status(401).json({
        message: 'Not authenticated.',
        return: encodeURIComponent(req.url),
      });
      //return NextResponse.redirect(`/?ret=${encodeURIComponent(req.nextUrl.pathname)}`);
    } else if (!authResult.user) {
      console.log('No auth user, redirecting');
      return res.status(401).json({
        message: 'Not authenticated.',
        return: encodeURIComponent(req.url),
      });
      //return NextResponse.redirect(`/?ret=${encodeURIComponent(req.nextUrl.pathname)}`);
    } else {
      console.log('User is found', authResult.user);
      //return NextResponse.next();
    }

    return handler(req, res);
  };
};

async function getUser(req) {
  let token = req.cookies['sb:token'];
  if (!token) {
    return {
      user: null,
      data: null,
      error: 'There is no supabase token in request cookies',
    };
  }
  let authRequestResult = await fetch(
    `${process.env.NEXT_PUBLIC_SUPABASE_URL}/auth/v1/user`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        APIKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
      },
    }
  );

  let result = await authRequestResult.json();
  console.log('Supabase auth result', result);
  if (authRequestResult.status != 200) {
    return {
      user: null,
      data: null,
      error: `Supabase auth returned ${authRequestResult.status}. See logs for details`,
    };
  } else if (result.aud === 'authenticated') {
    return {
      user: result,
      data: result,
      error: null,
    };
  }
}
