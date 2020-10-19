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

import AllChannels from './src/components/AllChannels'
import IconsRow from './src/components/IconsRow'
import {mainStyles} from './src/styles/style'
import {Streams} from './src/streams'

 
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
          style={mainStyles.banner}
          source={require("./assets/images/banner.png")}
        />
        <Text style={mainStyles.textWhite}>Все телеканалы</Text>
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

 
function GroznyPage({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", }}>
      <View style={{ flex: 1 }}>
        <View style={{ flex: 4, }}>
          <Text>Detail Page</Text>
          <Stream uri={Streams.GroznyStream} />
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
          <Stream uri={Streams.PutStream} />
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
          <Stream uri={Streams.VainahStream} />
        </View>
        <View style={{ flex: 1, }}>
          <IconsRow nav={navigation} />
        </View>
      </View>
    </View>
  );
}

 

function FavoritePage({ navigation }) {

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={mainStyles.textWhite}>Favorite Page11211 </Text>
      <Text style={[mainStyles.white]}></Text>
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

 
export default App;
