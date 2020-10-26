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
    <HomeStack.Navigator
    headerMode="screen"
    screenOptions={{
      headerStyle: mainStyles.darkBg,
      headerTintColor: "#fff" ,
      headerTitleStyle: mainStyles.headerTitleStyle,
    }}>
      
      <HomeStack.Screen
        name="Home"
        component={HomeScreen}
        options={{title: "Grozny+"}}
      />
      <HomeStack.Screen
        name="Grozny"
        component={GroznyPage}
        options={{ title: "ЧГТРК Грозный"}} 
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
      <HomeStack.Screen
        name="tv1"
        component={tv1}
        options={{ title: "Первый канал" }}
      />
      <HomeStack.Screen
        name="russia1"
        component={russia1}
        options={{ title: "Россия 1" }}
      />
      <HomeStack.Screen
        name="ntv"
        component={ntv}
        options={{ title: "НТВ" }}
      />
      <HomeStack.Screen
        name="match"
        component={match}
        options={{ title: "Матч-ТВ" }}
      />
      <HomeStack.Screen
        name="rentv"
        component={rentv}
        options={{ title: "РЕН-ТВ" }}
      />
      <HomeStack.Screen
        name="russia24"
        component={russia24}
        options={{ title: "Россия 24" }}
      />
       <HomeStack.Screen
        name="karusel"
        component={karusel}
        options={{ title: "Карусель" }}
      />
      <HomeStack.Screen
        name="kultura"
        component={kultura}
        options={{ title: "Культура" }}
      />
      <HomeStack.Screen
        name="zvezda"
        component={zvezda}
        options={{ title: "Звезда" }}
      />
      <HomeStack.Screen
        name="tv3"
        component={tv3}
        options={{ title: "ТВ 3" }}
      />
      <HomeStack.Screen
        name="dom"
        component={dom}
        options={{ title: "Домашний" }}
      />
      <HomeStack.Screen
        name="sts"
        component={sts}
        options={{ title: "СТС" }}
      />
       <HomeStack.Screen
        name="tnt"
        component={tnt}
        options={{ title: "ТНТ" }}
      />
      <HomeStack.Screen
        name="friday"
        component={friday}
        options={{ title: "Пятница" }}
      />
      <HomeStack.Screen
        name="kanal5"
        component={kanal5}
        options={{ title: "5 Канал" }}
      />
      <HomeStack.Screen
        name="mir"
        component={mir}
        options={{ title: "МИР" }}
      />
      <HomeStack.Screen
        name="tvc"
        component={tvc}
        options={{ title: "ТВЦ" }}
      />
      <HomeStack.Screen
        name="muztv"
        component={muztv}
        options={{ title: "МУЗ-ТВ" }}
      />
      <HomeStack.Screen
        name="ufc"
        component={ufc}
        options={{ title: "UFC-ТВ" }}
      />

    </HomeStack.Navigator>
  );
}
function FavStackScreen() {
  return (
    <HomeStack.Navigator
    headerMode="screen"
    screenOptions={{
      headerStyle: mainStyles.darkBg,
      headerTintColor: "#fff" ,
      headerTitleStyle: mainStyles.headerTitleStyle,
    }}
    >
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
    <HomeStack.Navigator
    headerMode="screen"
    screenOptions={{
      headerStyle: mainStyles.darkBg,
      headerTintColor: "#fff" ,
      headerTitleStyle: mainStyles.headerTitleStyle,
    }}>
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
        <View style={{ flex: 4 }}>
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
          <Stream uri={Streams.VainahStream} />
        </View>
        <View style={{ flex: 1, }}>
          <IconsRow nav={navigation} />
        </View>
      </View>
    </View>
  );
}

function tv1({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", }}>
      <View style={{ flex: 1 }}>
        <View style={{ flex: 4, }}>
          <Stream uri={Streams.tv1} />
        </View>
        <View style={{ flex: 1, }}>
          <IconsRow nav={navigation} />
        </View>
      </View>
    </View>
  );
}

function russia1({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", }}>
      <View style={{ flex: 1 }}>
        <View style={{ flex: 4, }}>
          <Stream uri={Streams.russia1} />
        </View>
        <View style={{ flex: 1, }}>
          <IconsRow nav={navigation} />
        </View>
      </View>
    </View>
  );
}

function kultura({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", }}>
      <View style={{ flex: 1 }}>
        <View style={{ flex: 4, }}>
          <Stream uri={Streams.kultura} />
        </View>
        <View style={{ flex: 1, }}>
          <IconsRow nav={navigation} />
        </View>
      </View>
    </View>
  );
}
function russia24({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", }}>
      <View style={{ flex: 1 }}>
        <View style={{ flex: 4, }}>
          <Stream uri={Streams.russia24} />
        </View>
        <View style={{ flex: 1, }}>
          <IconsRow nav={navigation} />
        </View>
      </View>
    </View>
  );
}
function tvc({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", }}>
      <View style={{ flex: 1 }}>
        <View style={{ flex: 4, }}>
          <Stream uri={Streams.tvc} />
        </View>
        <View style={{ flex: 1, }}>
          <IconsRow nav={navigation} />
        </View>
      </View>
    </View>
  );
}
function rentv({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", }}>
      <View style={{ flex: 1 }}>
        <View style={{ flex: 4, }}>
          <Stream uri={Streams.rentv} />
        </View>
        <View style={{ flex: 1, }}>
          <IconsRow nav={navigation} />
        </View>
      </View>
    </View>
  );
}
function zvezda({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", }}>
      <View style={{ flex: 1 }}>
        <View style={{ flex: 4, }}>
          <Stream uri={Streams.zvezda} />
        </View>
        <View style={{ flex: 1, }}>
          <IconsRow nav={navigation} />
        </View>
      </View>
    </View>
  );
}
function mir({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", }}>
      <View style={{ flex: 1 }}>
        <View style={{ flex: 4, }}>
          <Stream uri={Streams.mir} />
        </View>
        <View style={{ flex: 1, }}>
          <IconsRow nav={navigation} />
        </View>
      </View>
    </View>
  );
}
function ufc({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", }}>
      <View style={{ flex: 1 }}>
        <View style={{ flex: 4, }}>
          <Stream uri={Streams.ufc} />
        </View>
        <View style={{ flex: 1, }}>
          <IconsRow nav={navigation} />
        </View>
      </View>
    </View>
  );
}
function match({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", }}>
      <View style={{ flex: 1 }}>
        <View style={{ flex: 4, }}>
          <Stream uri={Streams.match} />
        </View>
        <View style={{ flex: 1, }}>
          <IconsRow nav={navigation} />
        </View>
      </View>
    </View>
  );
}
function dom({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", }}>
      <View style={{ flex: 1 }}>
        <View style={{ flex: 4, }}>
          <Stream uri={Streams.dom} />
        </View>
        <View style={{ flex: 1, }}>
          <IconsRow nav={navigation} />
        </View>
      </View>
    </View>
  );
}
function muztv({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", }}>
      <View style={{ flex: 1 }}>
        <View style={{ flex: 4, }}>
          <Stream uri={Streams.muztv} />
        </View>
        <View style={{ flex: 1, }}>
          <IconsRow nav={navigation} />
        </View>
      </View>
    </View>
  );
}
function otr({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", }}>
      <View style={{ flex: 1 }}>
        <View style={{ flex: 4, }}>
          <Stream uri={Streams.otr} />
        </View>
        <View style={{ flex: 1, }}>
          <IconsRow nav={navigation} />
        </View>
      </View>
    </View>
  );
}
function tnt({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", }}>
      <View style={{ flex: 1 }}>
        <View style={{ flex: 4, }}>
          <Stream uri={Streams.tnt} />
        </View>
        <View style={{ flex: 1, }}>
          <IconsRow nav={navigation} />
        </View>
      </View>
    </View>
  );
}
function karusel({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", }}>
      <View style={{ flex: 1 }}>
        <View style={{ flex: 4, }}>
          <Stream uri={Streams.karusel} />
        </View>
        <View style={{ flex: 1, }}>
          <IconsRow nav={navigation} />
        </View>
      </View>
    </View>
  );
}
function friday({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", }}>
      <View style={{ flex: 1 }}>
        <View style={{ flex: 4, }}>
          <Stream uri={Streams.friday} />
        </View>
        <View style={{ flex: 1, }}>
          <IconsRow nav={navigation} />
        </View>
      </View>
    </View>
  );
}
function kanal5({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", }}>
      <View style={{ flex: 1 }}>
        <View style={{ flex: 4, }}>
          <Stream uri={Streams.kanal5} />
        </View>
        <View style={{ flex: 1, }}>
          <IconsRow nav={navigation} />
        </View>
      </View>
    </View>
  );
}
function tv3({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", }}>
      <View style={{ flex: 1 }}>
        <View style={{ flex: 4, }}>
          <Stream uri={Streams.tv3} />
        </View>
        <View style={{ flex: 1, }}>
          <IconsRow nav={navigation} />
        </View>
      </View>
    </View>
  );
}
function ntv({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", }}>
      <View style={{ flex: 1 }}>
        <View style={{ flex: 4, }}>
          <Stream uri={Streams.ntv} />
        </View>
        <View style={{ flex: 1, }}>
          <IconsRow nav={navigation} />
        </View>
      </View>
    </View>
  );
}
function sts({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", }}>
      <View style={{ flex: 1 }}>
        <View style={{ flex: 4, }}>
          <Stream uri={Streams.sts} />
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
