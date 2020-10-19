import React, { Component } from 'react'
import { 
    Text, 
    View,
    ActivityIndicator,
    FlatList,
    TouchableOpacity, 
    Image,
    StyleSheet
} from 'react-native'
 


export default class AllChannels extends Component {
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
            <View style={{ flex: 1, padding: 20 }}>
              <ActivityIndicator />
            </View>
          )
        }
        return (
          <View style={{ flex: 1, paddingTop: 20, }}>
            <FlatList
              data={this.state.dataSource}
              renderItem={({ item }) =>
                <View>
                  <TouchableOpacity
                    style={styles.item}
                    onPress={() => {
                      {
                        this.props.nav.navigate(item.url);
                      }
                    }}
                  >
                    <Image style={styles.icon} source={{ uri: item.icon }} />
                    <View style={{ marginLeft: 10 }}>
                      <Text style={[styles.grey, styles.fs12]}>{item.title}</Text>
                      <Text
                        style={{
                          fontSize: 16,
                          color: "#fff",
                          borderBottomColor: "#A97D3A",
                          borderBottomWidth: 2,
                        }}
                      >
                        Новости - Информационная программа
                      </Text>
                      <Text style={[styles.grey, styles.fs12]}>
                        17:40 | Семейные ценности (образцовая се... </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              }
              keyExtractor={({ id }, index) => id}
               
            />
          </View>
        );
      }
}



const styles = StyleSheet.create({
    test: {
      display: "flex",
    },
    iconsHorList: {
      width: 360,
      height: 100,
    },
    container: {
      alignItems: "center",
      paddingTop: 25,
    },
    center: {
      alignItems: "center",
    },
    white: {
      color: "#fff",
    },
    grey: {
      color: "#828282",
    },
    fs12: {
      fontSize: 14,
    },
    banner: {
      width: "100%",
      marginBottom: 40,
    },
    ItemContainer: {
      marginLeft: 0,
      width: "90%",
    },
    icon: {
      width: 64,
      height: 64,
    },
    list: {
      display: "flex",
    },
    item: {
      padding: 10,
      marginVertical: 4,
      display: "flex",
      flexDirection: "row",
    },
    title: {
      fontSize: 22,
    },
  });
  