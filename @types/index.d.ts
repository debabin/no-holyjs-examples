type ProfileRole = 'admin' | 'user';

interface Profile {
  avatar: string;
  email: string;
  firstName: string;
  id: number;
  lastName: string;
  login: string;
  password: string;
  phone: string;
  role: ProfileRole;
  country: {
    id: number;
    label: string;
    code: string;
  };
}

interface Otp {
  endTime: number;
  id: number;
  source: string;
  value: string;
}

interface Confirmation {
  needConfirmation: boolean;
}

interface RetryDelay {
  retryDelay: number;
}

interface GithubCard {
  description: string;
  id: number;
  image: string;
  reactions: Record<string, number>;
  title: string;
  position: {
    x: number;
    y: number;
  };
  size: {
    width: number;
    height: number;
  };
}
