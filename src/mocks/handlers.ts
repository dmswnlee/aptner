import { http, HttpResponse } from 'msw'
import ResponseUser from './data/ResponseUser';

export const handlers = [
  http.get("/api/user", () => {
		return HttpResponse.json(ResponseUser);
	}),
]

