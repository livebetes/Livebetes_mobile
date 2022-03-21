import React from 'react';
import { AsyncStorage } from 'react-native';

export const addDataToLocalDataBase = async (key,data) =>{
    try {
      await AsyncStorage.setItem(
        key,
        data
      );
    }catch(error){

    }
  }

 export const getData = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        // We have data!!
     return value;
      }
    } catch (error) {
      // Error retrieving data
    }
  };

  export const getAllKeys =async() =>{
  const keys = await AsyncStorage.getAllKeys();
    return keys;
  }