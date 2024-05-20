import { http, HttpResponse } from "msw";
import { notices } from "./data/notice";

export const handlers = [
	http.get("/api/notices", () => {
		return HttpResponse.json(notices);
	})
];
