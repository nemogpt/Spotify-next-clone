//@ts-nocheck
import { signIn, useSession } from "next-auth/react";
import React, { useEffect } from "react";
import spotifyAPI from "../lib/spotify";

export default function useSpotify() {
  const { data: session } = useSession();
  useEffect(() => {
    if (session) {
      if (session.error === "RefreshAccessTokenError") {
        signIn();
      }

      spotifyAPI.setAccessToken(session?.user?.accessToken);
    }
  }, [session]);
  return spotifyAPI;
}
