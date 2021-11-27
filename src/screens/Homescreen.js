import React from 'react';
import { StyleSheet, Image, View, Text, Button } from 'react-native';
import { getUsers } from '../api/users';
import { setToken } from '../api/token';
import { Card, ListItem, Icon } from 'react-native-elements'
import { Avatar, Badge, withBadge } from 'react-native-elements'

export default class HomeScreen extends React.Component {
  state = { users: [], hasLoadedUsers: false, userLoadingErrorMessage: '' };

  loadUsers() {
    this.setState({ hasLoadedUsers: false, userLoadingErrorMessage: '' });
    getUsers()
      .then((users) => { // See here
        this.setState({
          hasLoadedUsers: true,
          users,
        });
      })
      .catch(this.handleUserLoadingError);
  }

  handleUserLoadingError = (res) => {
    if (res.error === 401) {
      this.props.navigation.navigate('Login');
    } else {
      this.setState({
        hasLoadedUsers: false,
        userLoadingErrorMessage: res.message,
      });
    }
  }

  logOut = async () => {
    this.setState({ hasLoadedUsers: false, users: [] })
    await setToken('');
    this.props.navigation.navigate('HomeBuilt');
  };


  componentDidMount() {
    this.didFocusSubscription = this.props.navigation.addListener(
      'didFocus',
      () => {
        if (!this.state.hasLoadedUsers) {
          this.loadUsers();
        }
      },
    );
  }

  componentWillUnmount() {
    this.didFocusSubscription.remove();
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'left', justifyContent: 'left',backgroundColor: "#13628a"}}>
        {this.state.users.map((user) => (
          <Card>
            <Card.Title>
              <View style={{justifyContent: 'center'}}>
              <Avatar
                rounded
                source={{
                  uri: user.image,
                }}
                size="large"
                placeholderStyle={{ backgroundColor: 'transparent' }}
              />
                            <Text style={{ marginBottom: 10,margintop: 10 }}>
                <b>{user.pseudo}</b>
            </Text>
              </View> 

              </Card.Title>
            <Card.Divider />

            <Text style={{ marginBottom: 10,margintop: 10 }}>
                <b>Biographie :</b> {user.bio}
            </Text>
            <Text style={{ marginBottom: 10,margintop: 10 }}>
                <b>Ville :</b> {user.ville}
            </Text>
            <Text style={{ marginBottom: 10,margintop: 10 }}>
                <b>Pays :</b> {user.pays}
            </Text>
            <Text style={{ marginBottom: 10,margintop: 10 }}>
                <b>Age :</b> {user.age} ans
            </Text>
          </Card>
        ))}

      </View>
    );
  }
}
//<Card.Image source={{ uri: user.image }} placeholderStyle={{ backgroundColor: 'transparent' }} ></Card.Image>
///*<Button title="Déconnexion" onPress={this.logOut} />*/
const styles = StyleSheet.create({
  image: {
    height: 250,
    width: 250,

  },
  container:{
    backgroundColor: "#13628a",
  }
})