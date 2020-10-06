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
import { DATA } from "./data.jsx";
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

const IconsList = ({navigation}) => {
  const renderIcon = ({ item }) => (
    <View style={{ display: 'flex', borderTopColor: "#232323", borderTopWidth:2, marginTop: 10 }}>
      <View style={{ display: 'flex', alignSelf: "center" }}>
      <Icons
        icon={item.icon}
        url={item.url}
        nav={navigation}
      />
      </View>
    </View>
  );
  return (
      <View>
          <FlatList
            horizontal
            data={DATA}
            renderItem={renderIcon}
            keyExtractor={(item) => item.key}
            style={styles.iconsHorList}
          />
      </View>
  )
}


function GroznyPage({ navigation }) {
  return (
    <View style={{ flex: 1,  alignItems: "center",   }}>
      <View style={{  flex: 1 }}>
         <View style={{ flex: 4, }}>
         <Text>Detail Page</Text>
         <Stream uri={GroznyStream}/>
         </View>
         <View style={{ flex: 1,  }}>
           <IconsList navigation={navigation}/>
         </View>
      </View>
    </View>
  );
}



function PutPage({ navigation }) { 
  return (
    <View style={{ flex: 1,  alignItems: "center",   }}>
    <View style={{  flex: 1 }}>
       <View style={{ flex: 4, }}>
       <Text>Detail Page</Text>
       <Stream uri={PutStream}/>
       </View>
       <View style={{ flex: 1,  }}>
         <IconsList navigation={navigation}/>
       </View>
    </View>
  </View>
   
  );
}
function VainahPage({ navigation }) {
  return (
    <View style={{ flex: 1,  alignItems: "center",   }}>
      <View style={{  flex: 1 }}>
         <View style={{ flex: 4, }}>
         <Text>Detail Page</Text>
         <Stream uri={VainahStream}/>
         </View>
         <View style={{ flex: 1,  }}>
           <IconsList navigation={navigation}/>
         </View>
      </View>
    </View>
  );
}
 

function FavoritePage({ navigation }) {

 

  const URI = '/data.js';

const getData = async () => {
  try {
    let response = await fetch(URI);
    let json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
  }
};

  const ListItem = ({item}) => {

    return (
      <View>

      <View style={{ flex: 1 }}>
          <Item
            style={{ flex: 1 }}
            title={item.title}
            icon={item.icon}
            url={item.url}
            nav={navigation}
          />
        </View>
  
        
        <Text style={styles.white}>

          {item.title},  {item.icon}  
          
  
        </Text>

      </View>
    );
  };


  const [items, setItems] = React.useState([]);
  getData().then(items => setItems(items));

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={[styles.white]}>Favorite Page11211 </Text>
      <Text style={[styles.white]}></Text>
      <Button title="Go to Home" onPress={() => navigation.navigate("Home")} />
      <Button title="Go back" onPress={() => navigation.goBack()} />


      <FlatList
        data={items}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => <ListItem item={item} />}
      />
 
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
