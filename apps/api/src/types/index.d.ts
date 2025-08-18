export interface CreateVendor {
  email: string;
  phoneNumber: string;
  accountNumber: string;
  bankCode: string;
  name: string;
  telegramChatId: number;
  logoImageUrl: string;
}

export interface ResponseInterface {
  apiVersion: string;
  data: any;
  message: string;
  success: boolean;
}
