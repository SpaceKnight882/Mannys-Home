export const spotifyConfig = {
  clientId: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID || '',
  redirectUri: process.env.NEXT_PUBLIC_SPOTIFY_REDIRECT_URI || 'http://localhost:3000/music',
  scopes: ['streaming', 'user-read-email', 'user-read-private', 'user-modify-playback-state', 'user-read-playback-state']
};

export function createPkcePair() {
  const verifier = [...crypto.getRandomValues(new Uint8Array(64))].map((x) => x.toString(16).padStart(2, '0')).join('');
  return crypto.subtle.digest('SHA-256', new TextEncoder().encode(verifier)).then((buf) => {
    const challenge = btoa(String.fromCharCode(...new Uint8Array(buf))).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
    return { verifier, challenge };
  });
}
