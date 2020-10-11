import * as React from "react";
import {
  SafeAreaView,
  FlatList,
  StyleSheet,
  View,
  Text,
  Button,
  Image,
  StatusBar,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import {
  NavigationContainer,
  useNavigation,
  DefaultTheme,
  DarkTheme,
  useIsFocused,

} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";
import { Video } from "expo-av";

const GroznyStream =
  "https://edge2-tv-ll.facecast.io/evacoder_hls_hi/UUMLQVAYVlZyH14GRENQVV0G/2/720-3.m3u8";
const PutStream = "http://dmitry-tv.my1.ru/his/02/CH_NATGEOHD.m3u8";
const VainahStream =
  "https://live.chechensoft.ru/vainahtv/ngrp:vaynahtv_all/playlist.m3u8";


// Путь https://live.chechensoft.ru/tvput/tvput/playlist.m3u8



const MyTheme = {
  dark: false,
  colors: {
    primary: "rgb(255, 45, 85)",
    background: "#000",
    card: "rgb(255, 255, 255)",
    text: "rgb(28, 28, 30)",
    border: "rgb(199, 199, 204)",
    notification: "rgb(255, 69, 58)",
  },
};

const HomeStack = createStackNavigator();
function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: "Grozny+",
          headerStyle: {
            backgroundColor: "#232323",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />

      <HomeStack.Screen
        name="Grozny"
        component={GroznyPage}
        options={{ title: "ЧГТРК Грозный",
          headerStyle: {
            backgroundColor: "#232323",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }} 
        />
      <HomeStack.Screen
        name="Put"
        component={PutPage}
        options={{ title: "ТРК Путь" }}
      />
      <HomeStack.Screen
        name="Vainah"
        component={VainahPage}
        options={{ title: "Вайнах" }}
      />
    </HomeStack.Navigator>
  );
}
function FavStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Favorite"
        component={FavoritePage}
        options={{ title: "Favorite" }}
      />
    </HomeStack.Navigator>
  );
}
function MoreStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="More"
        component={MorePage}
        options={{ title: "More" }}
      />
    </HomeStack.Navigator>
  );
}

function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" backgroundColor="#121212" />
      <View style={{ flex: 1 }}>
        <Image
          style={styles.banner}
          source={require("./assets/images/banner.png")}
        />
        <Text style={[styles.white]}>Все телеканалы</Text>

        <View style={{ flex: 1 }}>
          <AllChannels nav={navigation} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const Stream = (props) => {
  const isFocused = useIsFocused();
  return (
    <Video
      source={{ uri: props.uri }}
      rate={1.0}
      volume={1.0}
      isMuted={false}
      resizeMode="contain"
      useNativeControls={true}
      shouldPlay={isFocused}
      style={{ width: 360, height: 300 }}
    />
  )
}

export class IconsRow extends React.Component {

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
        <FlatList
          horizontal
          data={this.state.dataSource}
          renderItem={({ item }) =>
              <View style={{ display: 'flex', borderTopColor: "#232323", borderTopWidth: 2, marginTop: 10 }}>
                <View style={{ display: 'flex', alignSelf: "center" }}>
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
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
          }
          keyExtractor={({ id }, index) => id}
          style={styles.iconsHorList}
        />
    );
  }
}

function GroznyPage({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", }}>
      <View style={{ flex: 1 }}>
        <View style={{ flex: 4, }}>
          <Text>Detail Page</Text>
          <Stream uri={GroznyStream} />
        </View>
        <View style={{ flex: 1, }}>
          <IconsRow nav={navigation} />
        </View>
      </View>
    </View>
  );
}

function PutPage({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", }}>
      <View style={{ flex: 1 }}>
        <View style={{ flex: 4, }}>
          <Text>Detail Page</Text>
          <Stream uri={PutStream} />
        </View>
        <View style={{ flex: 1, }}>
          <IconsRow nav={navigation} />
        </View>
      </View>
    </View>

  );
}
function VainahPage({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", }}>
      <View style={{ flex: 1 }}>
        <View style={{ flex: 4, }}>
          <Text>Detail Page</Text>
          <Stream uri={VainahStream} />
        </View>
        <View style={{ flex: 1, }}>
          <IconsRow nav={navigation} />
        </View>
      </View>
    </View>
  );
}

export class AllChannels extends React.Component {

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
                    17:40 | Семейные ценности (образцовая се...
</Text>
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

function FavoritePage({ navigation }) {

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={[styles.white]}>Favorite Page11211 </Text>
      <Text style={[styles.white]}></Text>
      <Button title="Go to Home" onPress={() => navigation.navigate("Home")} />
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
}




























function MorePage({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>More Page</Text>

      <Button title="Go to Home" onPress={() => navigation.navigate("Home")} />
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
}
const Tab = createBottomTabNavigator();

function App() {
  return (
    <NavigationContainer theme={MyTheme}>
      <Tab.Navigator
        tabBarOptions={{
          activeTintColor: "#fff",
          activeBackgroundColor: "#121212",
          inactiveBackgroundColor: "#121212",
          inactiveTintColor: "#ddd",
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeStackScreen}
          options={{
            tabBarLabel: "ТВ-каналы",
            tabBarIcon: () => <Feather name="tv" color={"#A97D3A"} size={32} />,
          }}
        />
        <Tab.Screen
          name="Favorite"
          component={FavStackScreen}
          options={{
            tabBarIcon: () => <Feather name="heart" color={"#ddd"} size={32} />,
          }}
        />
        <Tab.Screen
          name="More"
          component={MoreStackScreen}
          options={{
            tabBarIcon: () => <Feather name="menu" color={"#ddd"} size={32} />,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
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

export default App;
