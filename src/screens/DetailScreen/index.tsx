import React, {FunctionComponent, memo, useEffect, useState} from 'react';
import {useRoute} from '@react-navigation/native';
import {StyleSheet, Text, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {Button, Divider, List} from 'react-native-paper';
import orderby from 'lodash.orderby';
import {useQuery} from 'react-query';
import {fetcher} from '../../utils/fetcher';
import {ENDPOINTS} from '../../constants/endpoints';
import {Root} from '../../components/ui';

interface DetailsProps {
  item?: any;
}

function DetailScreen() {
  const {params} = useRoute() || {};
  const {data, error, isLoading} = useQuery('details', () =>
    fetcher({
      endpoint: ENDPOINTS.DETAILS(params?.item?.Slug),
    }),
  );
  const [orderData, setOrderData] = useState();

  const ascOrder = orderField => {
    // const ascData = [...orderData].sort((a, b) => a?.Cases - b?.Cases);
    const ascData = orderby([...orderData], orderField, 'asc');
    setOrderData(ascData);
  };

  const descOrder = orderField => {
    // const descData = [...orderData].sort((a, b) => b?.Cases - a?.Cases);
    const descData = orderby([...orderData], orderField, 'desc');
    setOrderData(descData);
  };

  const memoized = ({item}) => <RenderDetails item={item} />;

  const RenderDetails: FunctionComponent<DetailsProps> = memo(({item}) => {
    return (
      <>
        <List.Item
          title={new Date(item?.Date).toLocaleDateString()}
          description={`Casos confirmados: ${item?.Cases}`}
        />
        <Divider style={{backgroundColor: 'black', height: 1}} />
      </>
    );
  });

  useEffect(() => {
    if (data) {
      setOrderData(data);
    }
  }, [data]);

  if (isLoading) {
    return <Text>Cargando...</Text>;
  }

  if (error) {
    return <Text>Hubo un error</Text>;
  }

  return (
    <Root>
      <View style={styles.horizontalView}>
        <Button onPress={() => ascOrder('Cases')}>Order asc by Cases</Button>
        <Button onPress={() => descOrder('Cases')}>Order desc by Cases</Button>
        <Button onPress={() => ascOrder('Date')}>Order asc by Date</Button>
        <Button onPress={() => descOrder('Date')}>Order desc by Date</Button>
      </View>
      <FlatList
        data={orderData}
        renderItem={memoized}
        initialNumToRender={10}
      />
    </Root>
  );
}

const styles = StyleSheet.create({
  horizontalView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
  },
});

export default DetailScreen;
