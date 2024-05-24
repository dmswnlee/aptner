export interface RegistrationData {
  email: string;
  name: string;
  nickname: string;
  password: string;
  phone: string;
  gender: string;
  apartment: {
      code: string;
      apartDetailInfo: {
          dong: number;
          ho: number;
      };
  };
  termsAgreements: Array<{ termsId: number; isAgreed: boolean }>;
}
