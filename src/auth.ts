import axios from "axios";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const {
	handlers: { GET, POST },
	signIn,
	signOut,
	auth,
} = NextAuth({
	providers: [
		Credentials({
			credentials: {
				email: { label: "Email", type: "text" },
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials) {
				console.log("Sending request to the server with:", credentials);
				try {
					const res = await axios.post(
						`${process.env.NEXT_PUBLIC_API_URL}/members/sign-in`,
						{
							email: credentials.email,
							password: credentials.password,
						},
						{
							headers: { "Content-Type": "application/json" },
						},
					);

					const user = res.data.result;
					if (user) {
						return {
							id: user.member.id,
							email: user.member.email,
							token: user.token.accessToken,
							status: user.member.status,
						};
					}
					throw new Error("Authentication failed");
				} catch (error) {
					console.error("Authentication error:", error);
					return null;
				}
			},
		}),
	],
	callbacks: {
		jwt: async ({ token, user }) => {
			if (user) {
				token.accessToken = user.token;
			}
			return token;
		},
		session: async ({ session, token }) => {
			session.accessToken = token.accessToken;
			return session;
		},
	},
	pages: {
		signIn: "/login",
	},
	secret: process.env.NEXTAUTH_SECRET,
});
