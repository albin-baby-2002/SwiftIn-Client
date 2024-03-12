export interface THostData {
    _id: string,
     listings: number,
     username: string,
     email: string,
     blocked: boolean,
     joinedDate: string
}

export interface THostDataResp {
  hosts: THostData[];
  totalPages: number;
}