import NextAuth, { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    {
      id: "anilist",
      name: "AniList",
      type: "oauth",
      authorization: {
        url: "https://anilist.co/api/v2/oauth/authorize",
        params: { scope: "" },
      },
      token: "https://anilist.co/api/v2/oauth/token",
      userinfo: {
        async request({ tokens }) {
          const response = await fetch("https://graphql.anilist.co", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${tokens.access_token}`,
            },
            body: JSON.stringify({
              query: `
                query {
                  Viewer {
                    id
                    name
                    avatar {
                      large
                    }
                  }
                }
              `,
            }),
          });
          const data = await response.json();
          return data.data.Viewer;
        },
      },
      profile(profile) {
        return {
          id: profile.id.toString(),
          name: profile.name,
          image: profile.avatar.large,
        };
      },
      clientId: process.env.NEXT_PUBLIC_ANILIST_CLIENT_ID as string,
      clientSecret: process.env.ANILIST_CLIENT_SECRET as string,
    },
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      // @ts-ignore
      session.accessToken = token.accessToken;
      return session;
    },
  },
  debug: true,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
