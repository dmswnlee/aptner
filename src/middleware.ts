import { auth } from "./auth";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
	const session = await auth();

	if (!session) {
		const url = new URL("/login", request.url);
		url.searchParams.set("message", "auth-required");
		return NextResponse.redirect(url);
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/notice", "/disclosure", "/communication", "/complaints"],
};
