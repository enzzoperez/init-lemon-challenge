import React, {Component} from 'react';
import {View, Text, Alert, Linking} from 'react-native';
import * as CONSTANTS from '../assets/constants/Constant';
import remoteConfig from '@react-native-firebase/remote-config';
import { storage } from '../../utils/storage';

export default class RemoteConfig extends Component {
  async componentDidMount() {
    await remoteConfig()
      .setDefaults({
        base_url: CONSTANTS.baseURL,
      })
      .then(() => remoteConfig().fetchAndActivate())

      .then(fetchedRemotely => {
        if (fetchedRemotely) {
          console.log(
            '+++Configs were retrieved from the backend and activated.',
          );
          console.log(fetchedRemotely);
        } else {
          console.log(
            '+++++No configs were fetched from the backend, and the local configs were already activated',
          );
        }
      });

    //Code to get All parameters from Firebase Remote config
    const parameters = remoteConfig().getAll();
    Object.entries(parameters).forEach($ => {
      const [key, entry] = $;
      console.log('--Key: ', key);
      console.log('--Source: ', entry.getSource());
      console.log('--Value: ', entry.asString());
      console.log('--------------------------------');
    });

    //Get Firebase remote config parameters by key
    const baseUrl = remoteConfig().getValue('show_screen');
    //console.log('+++++++ force update ' + is_force_update);
    //console.log('++++++baseUrl' + baseUrl.asString());
    //  console.log(parameters);

    storage.set('base_url', baseUrl.asString());
    console.log('++++++++' + baseUrl);
  }

  render() {
    return <></>;
  }
}
