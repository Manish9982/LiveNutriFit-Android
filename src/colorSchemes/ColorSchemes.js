import { Dimensions, ToastAndroid, StyleSheet, View, TouchableOpacity, } from "react-native";
import { getDataFromLocalStorage } from "../local storage/LocalStorage";
import React, { useState } from 'react'
import SweetAlert from 'react-native-sweet-alert';
import NetInfo, { useNetInfo } from "@react-native-community/netinfo"
import { useNavigation } from "@react-navigation/native";
import { Text } from "react-native-paper";
import RNRestart from 'react-native-restart'
import AsyncStorage from "@react-native-async-storage/async-storage";
const HEIGHT = Dimensions.get('window').height
const WIDTH = Dimensions.get('window').width
export const H = Dimensions.get('window').height
export const W = Dimensions.get('window').width


//export const URL = 'https://lnf.bizhawkztest.com/public/'
export const URL = 'https://livenutrifit.com/panel/'

export const colors = {
   GREEN2: '#cded9a',
   GREEN: '#a6d957',
   ORANGE: '#e78e55',
   ORANGE2: '#f58a42',
   ORANGE3: '#faa56b',
   GREY: '#f7f7f7',
   OFFWHITE: '#f5f9fc',
   BAD_COLOR: '#ffb0bb',
   GOOD_COLOR: '#f9e69a',
   BEST_COLOR: '#ddf5b9',
   MEDAL_GOLD: '#fbc51c',
   BUTTON_ORANGE: '#f7a14e',
   FONT_BLACK: '#3f4853',
   GREEN3: '#bbf562',
   LIGHT_GREEN: '#eef8e5'
};

export const fontSizes = {
   EXTRASM: 8,
   SM: 10,
   MED: 12,
   LAR: 14,
   XL: 16,
   XXL: 18,
   XXXL: 20,
   greeting: 24,
   choiceText: 13,
};

export const fontFamily = {
   "bold": "Montserrat-SemiBold",
};




export const GetApiData = async (ApiName) => {
   //  const URL = "https://lnf.bizhawkztest.com/public/"
   const URL = "https://livenutrifit.com/panel/"
   const token = await getDataFromLocalStorage('Token')
   var myHeaders = new Headers();
   myHeaders.append("Authorization", `Bearer ${token}`);

   var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
   };
   try {
      const response = await fetch(`${URL}${ApiName}`, requestOptions)
      const result = await response.json()
      return result
   } catch (error) {
      ToastAndroid.show(`${error}`, ToastAndroid.SHORT)
      ToastAndroid.show(`${ApiName}`, ToastAndroid.SHORT)

   }

}

export const PostApiData = async (ApiName, formdata) => {
   const netinfo = await NetInfo.fetch()
   // console.log(netinfo)

   if (netinfo.isConnected) {
      //const URL = "https://lnf.bizhawkztest.com/public/"
      const URL = "https://livenutrifit.com/panel/"
      const token = await getDataFromLocalStorage('Token')
      console.log("TOKEN == ", token)
      var myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${token}`);
      var requestOptions = {
         method: 'POST',
         redirect: 'follow',
         body: formdata,
         headers: myHeaders,
      };
      try {
         console.log(`formdata of ${ApiName} ====> `, formdata)
         const response = await fetch(`${URL}${ApiName}`, requestOptions)
         const result = await response.json()
         if (result.status == '403') {
            try {
               ShortToast("Your session has expired. Logging you out now..", "error", "")
               await AsyncStorage.clear()
               RNRestart.Restart()
            } catch (e) {
               ShortToast(`${e}`, "error", "")
            }
         }
         else {
            // console.log(`result of ${ApiName} ====> `, result)
            return result
         }


      } catch (error) {
         const temp = await getDataFromLocalStorage('user_id')
         ToastAndroid.show(`${error}`, ToastAndroid.SHORT)
         ShortToast(`Message for Developer: Api That Failed: ${ApiName} for User ID:${temp}`, "error", "")
      }
   }
   else {
      ShortToast("Internet Connection Required.\n\n Make sure you are connected to internet and try again", "error", "")
   }

}

export const ShortToast = (msg, style, title) => {
   SweetAlert.showAlertWithOptions({
      title: msg,
      subTitle: '',
      confirmButtonTitle: 'OK',
      confirmButtonColor: colors.GREEN,
      otherButtonTitle: 'Cancel',
      otherButtonColor: '#dedede',
      style: style,
      cancellable: true,
   },
      callback => console.log('callback'))
}
export const GreenButton = (props) => {
   return (
      <View
         style={{
            backgroundColor: colors.GREEN,
            width: W * 0.9,
            height: H * 0.08,
            alignSelf: "center",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 8,
         }}>
         <Text style={{
            color: "white",
            fontFamily: fontFamily.bold,
            fontSize: fontSizes.XL
         }}>{props.Title}</Text>
      </View>
   )

}


export function validateEmail(email) {
   var re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
   return re.test(String(email).toLowerCase());
}

export function formatTimestamp(timestamp) {
   const date = new Date(timestamp);
   const year = date.getFullYear();
   const month = String(date.getMonth() + 1).padStart(2, '0');
   const day = String(date.getDate()).padStart(2, '0');
   const formattedDate = `${year}-${month}-${day}`;
   return formattedDate;
 } 






const styles = StyleSheet.create({
   container: {
      height: H * 0.1,
      width: W * 0.2,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'red',
      top: H * 0.5,
   },
   button: {
      margin: 10,
      paddingHorizontal: 10,
      paddingVertical: 7,
      borderRadius: 5,
      backgroundColor: "#AEDEF4",
   },
   text: {
      color: 'red',
      fontSize: 15
   }
});
