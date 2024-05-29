export interface VerificationState {
	phoneNumber: string;
	verificationCode: string;
	expiredAt: string | null;
	isVerified: boolean;
	isLoading: boolean;
	error: string | null;
	isExpired: boolean;
}

export interface SendVerificationPayload {
	phoneNumber: string;
}

export interface VerifyCodePayload {
	phoneNumber: string;
	code: string;
	isVerified?: boolean;
}