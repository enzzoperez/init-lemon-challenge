import React from 'react';
import {Text, FlatList} from 'react-native';
import {ActivityIndicator, Colors, Divider, List} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {routes} from '../../constants/routesNames';
import {useQuery} from 'react-query';
import {fetcher} from '../../utils/fetcher';
import {ENDPOINTS} from '../../constants/endpoints';
import {Root} from '../../components/ui';

function HomeScreen() {
  const navigation = useNavigation();
  const {isLoading, error, data} = useQuery('getCountries', () =>
    fetcher({
      endpoint: ENDPOINTS.COUNTRIES,
    }),
  );

  const renderCountry = ({item}) => {
    return (
      <>
        <List.Item
          title={`${item?.Country} - ${item?.ISO2}`}
          onPress={() => navigation.navigate(routes.HOME.DETAIL, {item})}
        />
        <Divider style={{backgroundColor: 'black', height: 1}} />
      </>
    );
  };

  if (isLoading) {
    return <ActivityIndicator animating={true} color={Colors.red800} />;
  }

  if (error) {
    return <Text>Ocurrio un error</Text>;
  }

  return (
    <Root>
      <FlatList data={data} renderItem={renderCountry} />
    </Root>
  );
}

export default HomeScreen;
