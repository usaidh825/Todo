import React from 'react';
import { StyleSheet, View, Button, TouchableOpacity, Dimensions, ScrollView, Animated, AlertIOS, FlatList, Platform } from 'react-native';
import { Container, Header, Title, Content, Icon, button, Card, CardItem, Text, Body, Left, Right, IconNB, Footer } from "native-base";
import { MaterialIcons, MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons'
import moment from 'moment';
import prompt from 'react-native-prompt-android';
import Expo from 'expo';

const SCREEN_HEIGHT = Dimensions.get('window').height;



export default class Todo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      data: [
        'Java', 'Python', 'Javascript'
      ],
      loading: false
    }
    this.add = this.add.bind(this);
    this.remove = this.remove.bind(this);
    this.showForm = this.showForm.bind(this);
  }

  async componentWillMount() {
    await Expo.Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      Ionicons: require("native-base/Fonts/Ionicons.ttf")
    });
    this.setState({ loading: true });
  }

  add = (text) => {

    let notEmpty = text.trim().length > 0;

    if (notEmpty) {

      this.setState(
        prevState => {
          let { data } = prevState;
          return {
            data: data.concat(text),
            text: ""
          };
        }
      );
    }
  }

  remove = (i) => {

    this.setState(
      prevState => {
        let data = prevState.data.slice();

        data.splice(i, 1);

        return { data };
      }
    );

  }

  // updateState = 
  showForm = () => {
    
    if (Platform.OS == 'android') {
  
      prompt(
        'Enter Text',
        'Todo List: ',

        [
          { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
          { text: 'OK', onPress: text => this.add(text) },
        ],
        {
          type: 'secure-text',
          cancelable: false,
          defaultValue: 'test',
          placeholder: 'placeholder'
        }
      );
    }

    else {
      AlertIOS.prompt(
        'Enter  Text',
        null,
        text => this.add(text)
      );
    }

  }



  render() {
   
    if (!this.state.loading) {
      return <Expo.AppLoading />
    }

    return (
      <Container style={{}}>
        <Header>
          <Left>
            <Title>{moment().format('MMMM Do YYYY')}</Title>
          </Left>
          <Body>

          </Body>
          <Right>
            <Body>
              <Title>{moment().format('dddd')}</Title>
            </Body>
          </Right>
        </Header>
        <Content>

          <FlatList
            data={this.state.data}
            renderItem={({ item, index }) =>


              <Card key={index}>
                <CardItem key={index} style={{ height: 50 }}>
                  <Body>
                    <Text>
                      {item}
                    </Text>
                  </Body>
                  <Right>
                    <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', padding: 5, borderRadius: 5, borderColor: '#32CD32' }}
                      onPress={() => this.remove(index)}>
                      <FontAwesome name="minus" size={10} color='#32CD32' />
                    </TouchableOpacity>
                  </Right>
                </CardItem>
              </Card>

            }
            keyExtractor={item => item.toString()}

          />


        </Content>
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <TouchableOpacity style={{ backgroundColor: '#32CD32', alignItems: 'center', justifyContent: 'center', padding: 20, borderRadius: 100 }}
            onPress={() => this.showForm()}>
            <FontAwesome name="plus" size={20} />

          </TouchableOpacity>
        </View >
      </Container>

    );
  }
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});