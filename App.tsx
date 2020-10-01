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
const PutStream = "https://live.chechensoft.ru/tvput/tvput/playlist.m3u8";
const VainahStream =
  "https://live.chechensoft.ru/vainahtv/ngrp:vaynahtv_all/playlist.m3u8";

const DATA = [
  {
    key: "1",
    title: "ЧГТРК Грозный",
    icon: require("./assets/images/grozny-icon.png"),
    url: "Grozny",
  },
  {
    key: "2",
    title: "ТРК Путь",
    icon: require("./assets/images/put-icon.png"),
    url: "Put",
  },
  {
    key: "3",
    title: "ТРК Вайнах",
    icon: require("./assets/images/vainah-icon.png"),
    url: "Vainah",
  },
  {
    key: "4",
    title: "ЧГТРК Грозный",
    icon: require("./assets/images/grozny-icon.png"),
    url: "Grozny",
  },
  {
    key: "5",
    title: "ТРК Путь",
    icon: require("./assets/images/put-icon.png"),
    url: "Put",
  },
  {
    key: "6",
    title: "ТРК Вайнах",
    icon: require("./assets/images/vainah-icon.png"),
    url: "Vainah",
  },
  {
    key: "7",
    title: "ЧГТРК Грозный",
    icon: require("./assets/images/grozny-icon.png"),
    url: "Grozny",
  },
  {
    key: "8",
    title: "ТРК Путь",
    icon: require("./assets/images/put-icon.png"),
    url: "Put",
  },
  {
    key: "9",
    title: "ТРК Вайнах",
    icon: require("./assets/images/vainah-icon.png"),
    url: "Vainah",
  },
  {
    key: "10",
    title: "ЧГТРК Грозный",
    icon: require("./assets/images/grozny-icon.png"),
    url: "Grozny",
  },
  {
    key: "11",
    title: "ТРК Путь",
    icon: require("./assets/images/put-icon.png"),
    url: "Put",
  },
  {
    key: "12",
    title: "ТРК Вайнах",
    icon: require("./assets/images/vainah-icon.png"),
    url: "Vainah",
  },
];

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

const Item = ({ title, icon, url, nav }) => (
  <View>
    <TouchableOpacity
      style={styles.item}
      onPress={() => {
        {
          nav.navigate(url);
        }
      }}
    >
      <Image style={styles.icon} source={icon} />
      <View style={{ marginLeft: 10 }}>
        <Text style={[styles.grey, styles.fs12]}>{title}</Text>
        <Text
          style={{
            fontSize: 16,
            color: "#fff",
            borderBottomColor: "#A97D3A",
            borderBottomWidth: 2,
          }}
        >
          Новости - Информационная программа{" "}
        </Text>
        <Text style={[styles.grey, styles.fs12]}>
          17:40 | Семейные ценности (образцовая се...
        </Text>
      </View>
    </TouchableOpacity>
  </View>
);

const Icons = ({ icon, url, nav }) => (
  <View>
    <TouchableOpacity
      style={styles.item}
      onPress={() => {
        {
          nav.navigate(url);
        }
      }}
    >
      <Image style={styles.icon} source={icon} />
    </TouchableOpacity>
  </View>
);

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
        options={{ title: "ЧГТРК Грозный" }}
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
  const renderItem = ({ item }) => (
    <View style={{ flex: 1 }}>
      <Item
        style={{ flex: 1 }}
        title={item.title}
        icon={item.icon}
        url={item.url}
        nav={navigation}
      />
    </View>
  );
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
          <FlatList
            style={{ flex: 1 }}
            data={DATA}
            renderItem={renderItem}
            keyExtractor={(item) => item.key}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
function GroznyPage({ navigation }) {
  const renderItem = ({ item }) => (
    <View style={{ flex: 1 }}>
      <Icons
        style={{ flex: 1 }}
        icon={item.icon}
        url={item.url}
        nav={navigation}
      />
    </View>
  );

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Detail Page</Text>
      <Video
        source={{ uri: GroznyStream }}
        rate={1.0}
        volume={1.0}
        isMuted={false}
        shouldPlay={isFocused}
        resizeMode="contain"
        useNativeControls={true}
        style={{ width: 360, height: 300 }}
      />
  
      <Button title="Go to Home" onPress={() => navigation.navigate("Home")} />
      <Button title="Go back" onPress={() => navigation.goBack()} />
      <FlatList
        horizontal
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        legacyImplementation={false}
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.key}
        style={{ width: 360, height: "100%" }}
      />
    </View>
  );
}
function PutPage({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Detail Page</Text>
      <Video
        source={{ uri: PutStream }}
        rate={1.0}
        volume={1.0}
        isMuted={false}
        resizeMode="contain"
        useNativeControls={true}
        shouldPlay={true}
        style={{ width: 360, height: 300 }}
      />
      <Button title="Go to Home" onPress={() => navigation.navigate("Home")} />
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
}
function VainahPage({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Detail Page</Text>
      <Video
        source={{ uri: VainahStream }}
        rate={1.0}
        volume={1.0}
        isMuted={false}
        resizeMode="contain"
        useNativeControls={true}
        shouldPlay={true}
        style={{ width: "100%", height: 300 }}
      />
      <Button title="Go to Home" onPress={() => navigation.navigate("Home")} />
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
}
function FavoritePage({ navigation }) {
  
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={[styles.white]}>Favorite Page11211  </Text>
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
  container: {
    alignItems: "center",
    paddingTop: 25,
  },
  center: {
    alignItems: "center",
  },
  white: {
    color: "white",
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
