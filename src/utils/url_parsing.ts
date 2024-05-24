/* eslint-disable sonarjs/no-identical-functions */
export function getFacebookHandle(formHandle: string | null | undefined): string | null {
  if (!formHandle) {
    return null;
  }

  if (!formHandle.startsWith("https://")) {
    return formHandle.trim().replace("@", "");
  }

  const parsedUrl = new URL(formHandle);
  const pathnameParts = parsedUrl.pathname.split("/");

  // Facebook profile URLs usually have the username as the second part of the pathname
  const handle = pathnameParts[1];
  const username = handle.replace("@", "");

  return username || null; // Return the username or null if not found
}

export function getInstagramHandle(formHandle: string | null | undefined): string | null {
  if (!formHandle) {
    return null;
  }

  if (!formHandle.startsWith("https://")) {
    return formHandle.trim().replace("@", "");
  }

  const parsedUrl = new URL(formHandle);
  const pathnameParts = parsedUrl.pathname.split("/");
  const handle = pathnameParts[1];
  const username = handle.replace("@", "");

  return username || null;
}

export function getTiktokHandle(formHandle: string | null | undefined): string | null {
  if (!formHandle) {
    return null;
  }

  if (!formHandle.startsWith("https://")) {
    return formHandle.trim().replace("@", "");
  }

  const parsedUrl = new URL(formHandle);
  const pathnameParts = parsedUrl.pathname.split("/");
  const handle = pathnameParts[1];
  const username = handle.replace("@", "");

  return username || null;
}

export function getTwitterHandle(formHandle: string | null | undefined): string | null {
  if (!formHandle) {
    return null;
  }

  if (!formHandle.startsWith("https://")) {
    return formHandle.trim().replace("@", "");
  }

  const parsedUrl = new URL(formHandle);
  const pathnameParts = parsedUrl.pathname.split("/");
  const handle = pathnameParts[1];
  const username = handle.replace("@", "");

  return username || null;
}
