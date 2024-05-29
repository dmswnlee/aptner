import { http, HttpResponse } from "msw";
import { notices } from "./data/notice";
import { termsInfoList } from "./data/terms";
import { disclosures } from "./data/disclosure";
import { communications } from "./data/communication";
import { registrations } from "./data/signup";
import { RegistrationData } from "@/interfaces/RegistrationData";

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
	
	http.get("/api/communications/search", ({ request }) => {
		// 요청 URL에서 쿼리 파라미터를 가져오기 위해 URL 객체를 생성합니다.
		const url = new URL(request.url);
		const query = url.searchParams.get("query");
		const option = url.searchParams.get("option");
		
		// 초기 데이터를 communications 배열로 설정합니다.
		let filteredData = communications;
	
		// query와 option이 있는 경우 필터링을 수행합니다.
		if (query && option) {
			switch (option) {
				case "title":
					// 제목에 query가 포함된 항목을 필터링합니다.
					filteredData = communications.filter(item => item.title.includes(query));
					break;
					case "author":
					// 작성자에 query가 포함된 항목을 필터링합니다.
					filteredData = communications.filter(item => item.author.includes(query));
					break;
				// case "content":
				// 	// 내용에 query가 포함된 항목을 필터링합니다.
				// 	filteredData = communications.filter(item => item.content.includes(query));
				// 	break;
				// case "title_content":
				// 	// 제목 또는 내용에 query가 포함된 항목을 필터링합니다.
				// 	filteredData = communications.filter(item => item.title.includes(query) || item.content.includes(query));
				// 	break;
				default:
					break;
			}
		}
	
		// 필터링된 데이터를 JSON 형식으로 응답합니다.
		return HttpResponse.json(filteredData);
	}),
	

  http.post("/api/members/sign-up", async ({ request }) => {
    const requestData = await request.json();
    registrations.push(requestData as RegistrationData);
    return new Response(null, { status: 200 });
  })
];
