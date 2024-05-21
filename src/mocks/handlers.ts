import { http, HttpResponse } from "msw";
import { notices } from "./data/notice";
import { termsInfoList } from "./data/terms"
import { registration } from './data/signup';

export const handlers = [
	http.get("/api/notices", () => {
		return HttpResponse.json(notices);
	}),
	http.get("/api/terms", () => {
		return HttpResponse.json(termsInfoList)
	}),
	// TODO: 회원가입 등록 로직 추가 예정
	// http.post("/api/members/sign-up", async ({ request }) => {
  //   const signup = await request.json();
  //   registration.push(signup);
  //   return new Response(null, { status: 200 });
  // }),
];
