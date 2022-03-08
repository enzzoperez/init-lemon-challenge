import 'react-native-gesture-handler';
import React, {useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {DetailScreen, HomeScreen, LoginScreen} from '../screens';
import {routes} from '../constants/routesNames';
import UserContext from '../store/UserInfoContext';
import {Button} from 'react-native-paper';
import {storage} from '../utils/storage';

const Stack = createStackNavigator();

export default function Router() {
  const {userNameToken, setUserNameToken} = useContext(UserContext);

  const signOut = () => {
    setUserNameToken();
    storage.clearAll();
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {userNameToken ? (
          <>
            <Stack.Screen
              name={routes.HOME.INITIAL}
              component={HomeScreen}
              options={{
                headerRight: () => <Button onPress={signOut}>SIGNOUT</Button>,
              }}
            />
            <Stack.Screen
              name={routes.HOME.DETAIL}
              component={DetailScreen}
              options={({route}) => ({
                title: route?.params?.item?.Country,
              })}
            />
          </>
        ) : (
          <Stack.Screen name={routes.AUTH.LOGIN} component={LoginScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
