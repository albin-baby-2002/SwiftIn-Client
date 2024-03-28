 export interface TChatUserData {
  _id: string;
  username: string;
  email: string;
  image: string;
}

export interface TMessageData {
  sender: TSender;
  content: string;
  chat: TChatData;
  _id: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface TSender {
  _id: string;
  username: string;
  email: string;
  image: string;
}

export interface TLatestMessageData{
  sender:string;
  content:string;
  chat:string;
}

export interface TChatData {
  _id: string;
  chatName: string;
  isGroupChat: boolean;
  users: TChatUserData[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  latestMessage: TLatestMessageData;
}
