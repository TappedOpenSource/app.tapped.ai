"use client";

import type google from "google-one-tap";
import Script from "next/script";
import type { CredentialResponse } from "google-one-tap";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { useAuth } from "@/context/auth";
import { loginWithToken } from "@/data/auth";
import { cn } from "@/lib/utils";

declare global {
  interface Window {
    google: typeof google;
  }
}

const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

export default function GoogleOneTap() {
  const router = useRouter();
  const {
    state: { authUser },
  } = useAuth();

  // generate nonce to use for google id token sign-in
  const generateNonce = async (): Promise<string[]> => {
    const nonce = btoa(String.fromCharCode(...crypto.getRandomValues(new Uint8Array(32))));
    const encoder = new TextEncoder();
    const encodedNonce = encoder.encode(nonce);
    const hashBuffer = await crypto.subtle.digest("SHA-256", encodedNonce);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashedNonce = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");

    return [nonce, hashedNonce];
  };

  const initializeGoogleOneTap = useCallback(async () => {
    if (!GOOGLE_CLIENT_ID) {
      console.error("Google Client ID not found");
      return;
    }

    const { google } = window;
    if (!google) {
      console.error("Google One Tap not loaded");
      return;
    }

    console.log("Initializing Google One Tap");
    const [, hashedNonce] = await generateNonce();
    // console.log("Nonce: ", nonce, hashedNonce);

    // check if there's already an existing user before initializing the one-tap UI
    if (authUser) {
      google.accounts.id.cancel();
      return;
    }

    google.accounts.id.initialize({
      client_id: GOOGLE_CLIENT_ID,
      callback: async (response: CredentialResponse) => {
        try {
          // send id token returned in response.credential to supabase
          loginWithToken(response.credential);

          console.log("Successfully logged in with Google One Tap");

          // redirect to protected page
          router.push("/");
        } catch (error) {
          console.error("Error logging in with Google One Tap", error);
        }
      },
      nonce: hashedNonce,
      // with chrome's removal of third-party cookiesm, we need to use FedCM instead (https://developers.google.com/identity/gsi/web/guides/fedcm-migration)
      use_fedcm_for_prompt: true,
      itp_support: true,
      // log_level: "debug",
    });
    google.accounts.id.prompt((notification) => {
      console.debug({ notification });
    }); // Display the One Tap UI
  }, [authUser, router]);

  return (
    <>
      <Script
        src="https://accounts.google.com/gsi/client"
        onLoad={() => {
          initializeGoogleOneTap();
        }}
      />
      <div id="oneTap" className={cn("fixed right-0 top-0 z-[100]", authUser ? "hidden" : "")} />
    </>
  );
}
