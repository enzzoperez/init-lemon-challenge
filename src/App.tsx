import React, {useEffect, useMemo, useState} from 'react';
import {SafeAreaView} from 'react-native';
import {Provider as PaperProvider} from 'react-native-paper';
import Router from './navigation';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import UserContext from './store/UserInfoContext';
import {QueryClient, QueryClientProvider} from 'react-query';
import {storage} from './utils/storage';

const queryClient = new QueryClient();

const App = () => {
  const [userNameToken, setUserNameToken] = useState();
  const value = useMemo(
    () => ({userNameToken, setUserNameToken}),
    [userNameToken],
  );

  useEffect(() => {
    GoogleSignin.configure({
      scopes: ['email'], // what API you want to access on behalf of the user, default is email and profile
      webClientId:
        '460638062299-s4s72iejmjli8ja6q8urafb35600g21t.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
      offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
    });
  }, []);

  useEffect(() => {
    const userToken = storage.getString('userToken');
    if (userToken) {
      setUserNameToken(userToken);
    }
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <QueryClientProvider client={queryClient}>
        <UserContext.Provider value={value}>
          <PaperProvider>
            <Router />
          </PaperProvider>
        </UserContext.Provider>
      </QueryClientProvider>
    </SafeAreaView>
  );
};

export default App;
