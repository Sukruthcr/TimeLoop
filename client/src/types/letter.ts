export interface Letter {
  id: string;
  email: string;
  subject: string;
  message: string;
  deliveryDate: string;
  isPublic: boolean;
  sent: boolean;
  createdAt: string;
}

export interface CreateLetterDto {
  email: string;
  subject: string;
  message: string;
  deliveryDate: string;
  isPublic: boolean;
} 