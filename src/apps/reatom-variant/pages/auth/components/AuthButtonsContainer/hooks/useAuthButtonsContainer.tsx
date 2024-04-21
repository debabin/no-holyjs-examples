import axios from 'axios';

import { useProfile } from '@/utils/contexts/profile';

export const useAuthButtonsContainer = () => {
  // const router = useRouter();
  const { setProfile } = useProfile();
  const onGoogleClick = () => {
    // @ts-ignore
    const client = window?.google?.accounts?.oauth2.initTokenClient({
      client_id: '330577919686-606uq677jeq7no7dhrrkarnroecm23n5.apps.googleusercontent.com',
      scope: 'openid profile email',
      callback: (response: any) => {
        axios
          .get(
            `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${response.access_token}`,
            {
              headers: {
                Authorization: `Bearer ${response.access_token}`,
                Accept: 'application/json'
              }
            }
          )
          .then((res) => {
            console.log('@', res);
            setProfile({
              firstName: res.data.given_name,
              lastName: res.data.family_name,
              ...res.data
            });
            document.cookie = `googleAccessToken=${response.access_token}; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/`;
            // router.replace('/profile');
          })
          .catch((err) => console.log(err));
      }
    });

    client.requestAccessToken();
  };

  return {
    functions: { onGoogleClick }
  };
};
