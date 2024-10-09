// 안 쓸 수 있음
export interface History {
  id: number;
  fromAddress: string;
  toAddress: string;
  senderId: number;
  receipientId: number;
  blockHash: string;
  amount: string;
  serviceId: number;
  transactionId: number;
  createdAt: string;
  updatedAt: string;
}

// 안 쓸 수 있음
export interface PaymentResponse {
  histories: History[];
  amount: number;
}

export interface PaymentRegistrationStatus {
  userId: number;
  address: string;
  hasKey: boolean;
}

export interface PaymentCreateProps {
  privateKey: string;
  address: string;
}
