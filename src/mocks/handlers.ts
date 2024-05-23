import { http, HttpResponse } from "msw";
import { notices } from "./data/notice";
import { termsInfoList } from "./data/terms";
import { disclosures } from "./data/disclosure";
import { communications } from "./data/communication";
import { registration } from './data/signup';

// 핸들러 배열을 정의합니다.
export const handlers = [
    // /api/notices 엔드포인트에 대한 GET 요청 핸들러입니다.
    http.get("/api/notices", () => {
        // 공지사항 데이터를 JSON 형식으로 응답합니다.
        return HttpResponse.json(notices);
    }),
    // /api/terms 엔드포인트에 대한 GET 요청 핸들러입니다.
    http.get("/api/terms", () => {
        // 이용약관 정보 데이터를 JSON 형식으로 응답합니다.
        return HttpResponse.json(termsInfoList);
    }),
    // /api/disclosures 엔드포인트에 대한 GET 요청 핸들러입니다.
    http.get("/api/disclosures", () => {
        // 공개 정보 데이터를 JSON 형식으로 응답합니다.
        return HttpResponse.json(disclosures);
    }),
    // /api/communications 엔드포인트에 대한 GET 요청 핸들러입니다.
    http.get("/api/communications", () => {
        // 공개 정보 데이터를 JSON 형식으로 응답합니다.
        return HttpResponse.json(communications);
    }),    
    // 회원가입 등록 로직 추가 예정
    // http.post("/api/members/sign-up", async ({ request }) => {
    //     const signup = await request.json();
    //     registration.push(signup);
    //     return new Response(null, { status: 200 });
    // }),
];
