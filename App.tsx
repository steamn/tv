import * as React from "react";
import { FlatList, StyleSheet, View, Text, Button, Image,TouchableOpacity   } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Video } from "expo-av";

const GroznyStream =
  "https://edge2-tv-ll.facecast.io/evacoder_hls_hi/UUMLQVAYVlZyH14GRENQVV0G/2/720-3.m3u8";
const PutStream = "https://live.chechensoft.ru/tvput/tvput/playlist.m3u8";
const VainahStream =
  "https://live.chechensoft.ru/vainahtv/ngrp:vaynahtv_all/playlist.m3u8";









function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Home Screen</Text>
      <Button
        title="ЧГТРК Грозный"
        onPress={() => navigation.navigate("Grozny")}
      />
      <Text> _________________</Text>
      <Button title="ТРК Путь" onPress={() => navigation.navigate("Put")} />
      <Text> _________________</Text>
      <Button
        title="ТРК Vainah"
        onPress={() => navigation.navigate("Vainah")}
      />
      <Image source={require("./assets/images/grozny-small-logo.png")} />
      <FlatList
        data={[
          { iconUrl: "./assets/images/grozny-small-logo.png", key2: "33333", key3: "333323" },
          { key: "Dan" },
          { key: "Dominic" },
          { key: "Jackson" },

        ]}
        renderItem={({ item }) => 
      <Text style={styles.item}>{item.key} {item.key2  } {item.iconUrl}</Text>
      
      
      }
      />
    </View>
  );
}
function GroznyPage({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Detail Page</Text>
      <Video
        source={{ uri: GroznyStream }}
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
        style={{ width: 360, height: 300 }}
      />
      <Button title="Go to Home" onPress={() => navigation.navigate("Home")} />
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
}

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: "My home",
            headerStyle: {
              backgroundColor: "#f4511e",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
        />
        <Stack.Screen
          name="Grozny"
          component={GroznyPage}
          options={{ title: "ЧГТРК Грозный" }}
        />
        <Stack.Screen
          name="Put"
          component={PutPage}
          options={{ title: "ТРК Путь" }}
        />
        <Stack.Screen
          name="Vainah"
          component={VainahPage}
          options={{ title: "Вайнах" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});







export default App;
