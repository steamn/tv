

import React from 'react'
import { View, Text } from 'react-native'


interface StreamUrl {
  id: number;
  url: string;
}


const StreamUrl = [

  fetch('http://frostdev.ru/app/data2.json')
  .then((response) => response.json())
  .then((responseJson) => {
    // console.log(responseJson.data);

    for (let id in responseJson.data) {

      // console.log(responseJson.data[id].url);
      return responseJson.data[id].url;
    }
  })
  .catch((error) => {
    console.error(error);
  })

]



export default function homeStack(StreamUrl : any) {
  return (
    <View>
      <Text>
        {StreamUrl}
      </Text>
    </View>
  )
}

 



    


