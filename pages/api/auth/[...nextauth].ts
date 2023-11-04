//@ts-nocheck
import NextAuth, { Awaitable, Session } from "next-auth";
import { JWT } from "next-auth/jwt";
import SpotifyProvider from "next-auth/providers/spotify";
import spotifyAPI, { LOGIN_URL } from "../../../lib/spotify";

const refreshToken = async (token: JWT) => {
  try {
    spotifyAPI.setAccessToken(token.accessToken as string);
    spotifyAPI.setRefreshToken(token.refreshToken as string);

    const { body: newToken } = await spotifyAPI.refreshAccessToken();
    //TODO: Delete this during production
    console.log("NEW TOKEN: ", newToken);
    return {
        ...token,
        accessToken: newToken.access_token,
        accessTokenExpires: Date.now() + newToken.expires_in * 1000,
        refreshToken: newToken.refresh_token ?? (token.refreshToken as string)
    }
  } catch (error) {
    console.error(error);
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
};

export default NextAuth({
  providers: [
    SpotifyProvider({
      clientId: process.env.NEXT_PUBLIC_CLIENT_ID as string,
      clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET as string,
      authorization: LOGIN_URL,
    }),
  ],
  secret: process.env.JWT_SECRET as string,
  pages: {
    signIn: "/login",
  },
  callbacks: {

    async jwt({ token, account, user }): Awaitable<JWT> {
      if (account && user) {
        return {
          ...token,
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          username: account.providerAccountId,

          accessTokenExpires: account.expires_at * 1000,
        };
      }

      if (Date.now() < (token.accessTokenExpires as unknown as number)) {
        return token;
      }

      return await refreshToken(token);
    },


    async session({session, token}) : Awaitable<Session> {
        session.user.accessToken = token.accessToken;
        session.user.refreshToken = token.refreshToken;
        session.user.username = token.username;

        return session;
    }
  },
});
