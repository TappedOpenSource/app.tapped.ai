export const sanitizeUsername = (artistName: string) => {
  // Convert name to lowercase
  let username = artistName.trim().toLowerCase();

  // Replace spaces with a hyphen
  username = username.replace(/\s+/g, "_");

  // Remove disallowed characters (only keep letters, numbers, hyphens, and underscores)
  username = username.replace(/[^a-z0-9_]/g, "");

  return username;
};
