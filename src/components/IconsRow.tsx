import React, { Component } from 'react'
import { 
    Text, 
    View,
    ActivityIndicator,
    FlatList,
    TouchableOpacity, 
    Image,
 } from 'react-native'
import {mainStyles} from '../styles/style'
 
export default class IconsRow extends React.Component {
    constructor(props) {
      super(props);
      this.state = { isLoading: true }
    }
    componentDidMount() {
      return fetch('http://frostdev.ru/app/data2.json')
        .then((response) => response.json())
        .then((responseJson) => {
  
          this.setState({
            isLoading: false,
            dataSource: responseJson.data,
          }, function () {
          });
        })
        .catch((error) => {
          console.error(error);
        });
    }
    render() {
      if (this.state.isLoading) {
        return (
          <View style={{ flex: 1, padding: 20,}}>
            <ActivityIndicator />
          </View>
        )
      }
      return (
          <FlatList
            horizontal
            data={this.state.dataSource}
            renderItem={({ item }) =>
                <View style={{ borderTopColor: "#232323", borderTopWidth: 5, marginTop: 10}}>
                      <TouchableOpacity style={mainStyles.item} onPress={() => {{this.props.nav.navigate(item.url);}} }>
                        <Image style={mainStyles.icon} source={{ uri: item.icon }} />
                      </TouchableOpacity>
                </View>
            }
            keyExtractor={({ id }, index) => id}
            style={mainStyles.iconsHorList}
          />
      );
    }
  }
