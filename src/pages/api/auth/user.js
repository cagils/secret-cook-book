import { supabase } from '../../../lib/supabase';

export default async function getUser(req, res) {
  // POST:
  //   supabase.auth.api.setAuthCookie(req, res);
  // DELETE:
  //   res.setHeader('Set-Cookie', 'sb:token=deleted; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT');
  //   res.send({});

  if (req.method === 'GET') {
    const user = supabase.auth.user();
    res.status(200).json({ user: user });
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).json({
      message: `Method ${req.method} not allowed`,
    });
  }
}
