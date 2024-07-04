export function idFromSpotifyUrl(url: string): string | null {
  const regex = /https:\/\/open\.spotify\.com\/artist\/([a-zA-Z0-9]+)/;
  const match = url.match(regex);
  if (match && match[1]) {
    return match[1];
  }

  return null;
}
