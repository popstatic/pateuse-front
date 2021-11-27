import React, { useState } from 'react';
import { ImageBackground, Image, StyleSheet, View, Text, Button } from 'react-native';
import { login } from '../api/authentication';
import { setToken } from '../api/token';
import EmailForm from '../forms/Emailform';
import InputScrollView from 'react-native-input-scroll-view';
import { Card, ListItem, Icon } from 'react-native-elements'

const LoginScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
        <Image
          style={styles.tinyLogo}
          source={require('../../assets/logo-forty.png')}
        />
      <Card style={styles.cardlogin}>
        <Card.Title>Identification</Card.Title>
        <Card.Divider />
        <EmailForm
          buttonText="Go"
          onSubmit={login}
          onAuthentication={() => navigation.navigate('HomeTopics')}
        >
        </EmailForm>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: 'center'
  },
  image: {
    flex: 1,
    justifyContent: "center"
  },
  text: {
    color: "white",
    fontSize: 42,
    lineHeight: 84,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#000000c0"
  },
  cardlogin:{
    flexGrow: 0,
    flexShrink: 1,
  },
  tinyLogo: {
    justifyContent: "center",
    width: 150,
    height: 150,
    marginTop:75,
    marginBottom:75
  }
});


export default LoginScreen;