type ProfileRole = 'admin' | 'user';

interface Profile {
  id: number;
  email: string;
  avatar: string;
  login: string;
  password: string;
  firstName: string;
  lastName: string;
  role: ProfileRole;
  country: {
    id: number;
    label: string;
    code: string;
  };
}

interface Otp {
  id: number;
  source: string;
  value: string;
  endTime: number;
}

interface Confirmation {
  needConfirmation: boolean;
}

interface RetryDelay {
  retryDelay: number;
}

interface FigmaCard {
  id: number;
  position: {
    x: number;
    y: number;
  };
  size: {
    width: number;
    height: number;
  };
  title: string;
  description: string;
  image: string;
  reactions: Record<string, number>;
}
