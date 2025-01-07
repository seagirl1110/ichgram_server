interface IRegisterBody {
  fullName: string;
  userName: string;
  email: string;
  password: string;
}

interface ILoginBody {
  email: string;
  password: string;
}

export { IRegisterBody, ILoginBody };
