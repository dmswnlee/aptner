import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
	interface Session {
		user: {
			id: number;
			email: string;
			nickname: string;
			status: string;
		} & DefaultSession["user"];
		accessToken: string;
	}

	interface User {
		id: number;
		email: string;
		nickname: string;
		status: string;
		token: string;
	}
}

declare module "next-auth/jwt" {
	interface JWT {
		id: number;
		email: string;
		nickname: string;
		status: string;
		accessToken: string;
	}
}
