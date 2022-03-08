import React, {useContext} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import UserContext from '../../store/UserInfoContext';
import {storage} from '../../utils/storage';
import {Root} from '../../components/ui';

function LoginScreen() {
  const {setUserNameToken} = useContext(UserContext);

  const _signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const info: any = await GoogleSignin.signIn();
      setUserNameToken(info?.idToken);
      storage.set('userToken', info?.idToken);
    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        // alert('Cancel');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // alert('Signin in progress');
        // operation (f.e. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // alert('PLAY_SERVICES_NOT_AVAILABLE');
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };

  return (
    <Root style={styles.rootExtended}>
      <Text>Login Screen</Text>

      <GoogleSigninButton
        style={{width: 192, height: 48}}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={_signIn}
      />
    </Root>
  );
}

const styles = StyleSheet.create({
  rootExtended: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'pink',
  },
});

export default LoginScreen;
