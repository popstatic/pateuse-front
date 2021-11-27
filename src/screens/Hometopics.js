import React from 'react';
import { StyleSheet, Image, View, Text, Button } from 'react-native';
import { getUsers } from '../api/users';
import { setToken } from '../api/token';
import { Card, ListItem, Icon } from 'react-native-elements'
import { Avatar, Badge, withBadge } from 'react-native-elements'
import { getTopics } from '../api/topics';

export default class TopicScreen extends React.Component {
  state = { topics: [], hasLoadedTopics: false, topicsLoadingErrorMessage: '' };

  loadTopics() {
    this.setState({ hasLoadedUsers: false, userLoadingErrorMessage: '' });
    getTopics()
      .then((topics) => { // See here
        this.setState({
          hasLoadedTopics: true,
          topics,
        });
      })
      .catch(this.handleTopicsLoadingError);
  }

  handleTopicsLoadingError = (res) => {
    if (res.error === 401) {
      this.props.navigation.navigate('Login');
    } else {
      this.setState({
        hasLoadedTopics: false,
        topicLoadingErrorMessage: res.message,
      });
    }
  }

  logOut = async () => {
    this.setState({ hasLoadedTopics: false, topics: [] })
    await setToken('');
    this.props.navigation.navigate('Loginscreen');
  };


  componentDidMount() {
    this.didFocusSubscription = this.props.navigation.addListener(
      'didFocus',
      () => {
        if (!this.state.hasLoadedTopics) {
          this.loadTopics();
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
        {this.state.topics.map((topic) => (
          <Card>
            <Card.Title>
              <View style={{justifyContent: 'center'}}>
              <Avatar
                rounded
                source={{
                  uri: topic.creator.image,
                }}
                size="large"
                placeholderStyle={{ backgroundColor: 'transparent' }}
              />
                            <Text style={{ marginBottom: 10,margintop: 10 }}>
                <b>{topic.creator.pseudo}</b>
            </Text>
              </View> 

              </Card.Title>
            <Card.Divider />

            <Text style={{ marginBottom: 10,margintop: 10 }}>
                
            </Text>
            <Text style={{ marginBottom: 10,margintop: 10 }}>
                <b>{topic.sujet}</b> <br />
                {topic.contenu}
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