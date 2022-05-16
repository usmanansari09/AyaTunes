import { AsyncStorage } from "react-native"

export async function storeIntoAsyncStorage(key, value, errorMessage) {
  try {
    return await AsyncStorage.setItem(key, value)
    
  } catch (error) {
    console.log('AsyncStorage Error: '+key+"-> "+errorMessage, error)
  }
}