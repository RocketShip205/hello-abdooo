
export interface BirthdayData {
  name: string;
  age: string;
  hobby: string;
}

export interface GeneratedMessage {
  id: string;
  text: string;
  sources: Array<{ title: string; uri: string }>;
  timestamp: Date;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
