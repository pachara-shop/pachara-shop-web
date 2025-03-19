import Cookies from 'js-cookie';

export async function createSession(key: string, accessToken: string) {
  console.log('Creating session');
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  // const isProduction = process.env.NODE_ENV === 'production';
  Cookies.set(key, accessToken, {
    // secure: isProduction,
    expires: expiresAt,
    sameSite: 'strict',
    path: '/',
  });
}

export async function deleteSession(key: string) {
  console.log('Deleting session');
  const expiresAt = new Date('01 Jan 1970 00:00:00 UTC');
  Cookies.set(key, '', {
    path: '/',
    sameSite: 'strict',
    expires: expiresAt,
  });
}

export async function getSession(key: string) {
  return await Cookies.get(key);
}
