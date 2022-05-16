
import { Alert } from 'react-native';
const handler = async (req: Promise, throwError = false) => {
    const response = await req;
    if (res.status === 200 || res.status === 201) return res.json()
    if (res.status > 201 && res.status < 300) return res;
    if (throwError) throw res
    try {
        const error = await res.json()
        Alert.alert('Error', error.detail)
    } catch {
        Alert.alert('Error', 'There was an error, please try again later!')
    }
}

export function useApi(token: string) {

    const headers = {
        Authorization: 'Token ' + token,
        'Content-Type': 'application/json',
      }

    return {
        // createPlayList: ()
    }
}