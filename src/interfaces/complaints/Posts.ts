interface Writer {
	id: number;
	name: string;
	nickname: string;
}

interface Category {
	id: number;
	type: string;
	code: string;
	name: string;
}

interface Qna {
	id: number;
	category: Category;
	content: string;
	createdAt: string;
	updatedAt: string;
	isPrivate: boolean;
	writer: Writer;
	title: string;
	viewCount: number;
	status: string;
}

interface SessionData {
	user: {
		name: string;
		email: string;
	};
	accessToken: string;
}

interface Tooltip {
	nickname: string;
	userId: number;
	postId: number;
}