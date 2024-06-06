export interface IdState {
	email: string;
	error: string | null;
}

export interface PasswordState {
	isLoading: boolean;
	error: string | null;
	successMessage: string;
}

export interface PasswordPayload {
	email: string;
	name: string;
	phone: string;
	code: string;
}

export interface PasswordGetPayload {
	email: string;
	name: string;
	phone: string;
}

export interface UpdatePasswordPayload {
	email: string;
	name: string;
	phone: string;
	verificationCode: string;
	password: string;
	confirmPassword: string;
}
