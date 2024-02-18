type ProfileRole = 'admin' | 'user';

interface Profile {
  id: number;
  email: string;
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

interface Confirmation {
  needConfirmation: boolean;
}

interface RetryDelay {
  retryDelay: number;
}
