export interface Term {
	id: number;
	title: string;
	content: string;
	type: string;
	isRequired: boolean;
}

export interface TermsState {
	termsInfoList: Term[];
	error: string | null;
	loading: boolean;
}