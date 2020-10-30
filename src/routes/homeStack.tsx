export const StreamUrl = [

  fetch('http://frostdev.ru/app/data2.json')
  .then((response) => response.json())
  .then((responseJson) => {
    // console.log(responseJson.data);

    for (let id in responseJson.data) {

      console.log(responseJson.data[id].url);
      
    }
  })
  .catch((error) => {
    console.error(error);
  })

]
    
 
 