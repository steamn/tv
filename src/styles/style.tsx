import {StyleSheet, Dimensions} from 'react-native'

import {colors} from './base'
const windowWidth = Dimensions.get('window').width - 40;
export const mainStyles =  StyleSheet.create({

    textWhite: {
        color: colors.white,
    },
    test: {
        display: "flex",
      },
      iconsHorList: {
        width: windowWidth,
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
      darkBg: {
        backgroundColor: "#232323",
      },
      headerTitleStyle: {
        fontWeight: "bold",
      },
      headerTintColor: {
        color: "#fff", 
      }


 
})


 
    
 