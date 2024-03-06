 export interface TuserData {
  _id: string;
  username: string;
  email: string;
  image: string;
}

export interface Tmessage {
  sender: Tsender;
  content: string;
  chat: Tchat;
  _id: string;
  createdAt: string;
  updatedAt: string;
}

export interface Tsender {
  _id: string;
  username: string;
  email: string;
  image: string;
}

export interface TlatestMessage{
  sender:string;
  content:string;
  chat:string;
}

export interface Tchat {
  _id: string;
  chatName: string;
  isGroupChat: boolean;
  users: TuserData[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  latestMessage: TlatestMessage;
}
