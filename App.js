import React, {Component} from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {
  AppRegistry,
  View,
  Linking,
  Text,
  TouchableOpacity,
  Alert,
  Button,
  StyleSheet,
  TextInput,
} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import QRScreen from './QRScreen';

const HomeScreen = ({navigation}) => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
      }}>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => navigation.navigate('Create')}>
        <Text style={styles.textbtn}>Create</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => navigation.navigate('Scan')}>
        <Text style={styles.textbtn}>Scan</Text>
      </TouchableOpacity>
    </View>
  );
};

const ScanScreen = ({navigation}) => {
  ifScaned = (e) => {
    Linking.openURL(e.data).catch((err) => Alert.alert('QR Code Text', e.data));
  };
  return (
    <View style={styles.container}>
      <QRCodeScanner
        containerStyle={{backgroundColor: '#fff', marginBottom: '35%'}}
        onRead={this.ifScaned}
        reactivate={true}
        permissionDialogMessage="Need Permission To Access Camera"
        reactivateTimeout={10}
        showMarker={true}
        markerStyle={{borderColor: '#fff', borderRadius: 10}}
        bottomContent={
          <TouchableOpacity>
            <Text style={{fontSize: 21, color: '#fff'}}>Scan QR Code</Text>
          </TouchableOpacity>
        }
      />
    </View>
  );
};

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#0b63dc',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
            textAlign: 'center',
          },
        }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Create" component={QRScreen} />
        <Stack.Screen name="Scan" component={ScanScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn: {
    width: '95%',
    marginBottom: 20,
    elevation: 8,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: '#0b63dc',
  },
  textbtn: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    alignSelf: 'center',
    textTransform: 'uppercase',
  },
});

export default App;
