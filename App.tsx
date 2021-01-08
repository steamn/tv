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
  Dimensions,
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
import AllChannels from './src/components/AllChannels';
import IconsRow from './src/components/IconsRow';
import {mainStyles} from './src/styles/style';
import {Streams} from './src/streams';
import {useEffect, useState} from "react";


const windowWidth = Dimensions.get('window').width;
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
  const [data, setData] = useState<any[]>([])


  const getData=()=>{
    fetch('http://frostdev.ru/app/data2.json',{
          headers : {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        }
    )
        .then(function(response){
          return response.json();
        })
        .then(function(responseData) {
          setData(responseData.data)
        });
  }

  useEffect(() => {
    getData()
    console.log(data, 'data')
  }, [])



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
      {data && data.map(item => {
        return  <HomeStack.Screen
            key={item.id}
            name={item.url}
            component={TranslationPage}
            initialParams={{ item: item }}
            options={{ title: item.title}}
        />
      })}
    </HomeStack.Navigator>
  );
}
const  TranslationPage = ({navigation, route}: {navigation: any, route: any } ) =>  {

  const item =  route.params.item
  return (
      <View style={{ flex: 1, alignItems: "center", }}>
        <View style={{ flex: 1 }}>
          <View style={{ flex: 4 }}>
            <Stream uri={item.stream} />
          </View>
          <View style={{ flex: 1}}>
            <IconsRow nav={navigation} />
          </View>
        </View>
      </View>
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

function HomeScreen({navigation}: {navigation: any}) {
  console.log(navigation)
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

export  const Stream = ({props}: {props: any}) => {
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
      style={{ width: windowWidth, height: 300 }}
    />
  )
}

function FavoritePage({navigation}: {navigation: any}) {


  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={mainStyles.textWhite}>Favorite Page122 </Text>
      <Text style={[mainStyles.white]}>
      </Text>
      <Button title="Go to Home" onPress={() => navigation.navigate("Home")} />
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
}




function MorePage({navigation}: {navigation: any}) {
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
