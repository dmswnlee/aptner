// 목록조회
export interface Tab {
	name: string;
	label: string;
	code: string;
}

export interface Option {
	value: string;
	label: string;
}

// 상세페이지
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

export interface Notices {
	id: number;
	title: string;
	content: string;
	createdAt: string;
	updatedAt: string;
	writer: Writer;
	category: Category;
	viewCount: number;
	status: string;
}

export interface SessionData {
	user: {
		name: string;
		email: string;
	};
	accessToken: string;
}

export interface ListProps {
	data: Notices[];
	loading: boolean;
	currentPage: number;
	pinnedData: Notices[];
	total: number;
	onPageChange: (page: number) => void;
	searchQuery: string;
}
interface ApartArea {
  id: number;
  area: number;
  imagePath: string;
}

export interface Post {
	id: number;
	title: string;
	content: string;
	createdAt: string;
	writer: {
		id: number;
		name: string;
		nickname: string;
	};
	category: {
		id: number;
		type: string;
		code: string;
		name: string;
	};
	emoji: {
		emojiCount: {
			likeCount: number;
			empathyCount: number;
			funCount: number;
			amazingCount: number;
			sadCount: number;
		};
		emojiReaction: {
			reactedLike: boolean;
			reactedEmpathy: boolean;
			reactedFun: boolean;
			reactedAmazing: boolean;
			reactedSad: boolean;
		};
	};
	apartArea?: ApartArea;
}

export interface PostFileInfo {
  id: number;
  name: string;
  path: string;
  size: number;
}