import * as types from "./constants"

const initialState = {
  play: "",
  playBackStatus: null,
  trackObjects: {},
  repeat: false,
  shuffle: false,
  previousTrackQue:[],
  type:"",
  apiendpoint:"",
  params:"",
  playlistId:""

}

export default function apiReducer(state = initialState, action) {
  switch (action.type) {
    case "PLAY":
      return {
        ...state,
        play: action.payload
      }
    case "PLAY_BACK_STATE":
      return {
        ...state,
        playBackStatus: action.payload
      } 
      case "GET_TRACK_OBJECT":
        return{
          ...state,
          trackObjects:action.payload
        }
        case "REPEAT_SONG":
          return{
            ...state,
            repeat:action.payload
          }
          case "GET_PREVIOUS_QUE":
            return{
              ...state,
              previousTrackQue:action.payload
            }
            case "SHUFFLE_SONG":
              return{
                ...state,
                shuffle:action.payload
              }
              case "TYPE":
                return{
                  ...state,
                  type:action.payload
                }
                case "API_END":
                  return{
                    ...state,
                    apiendpoint:action.payload
                  }
                  case "PARAMS":
                    return{
                      ...state,
                      params:action.payload
                    }
                    case "PLAYLIST_ID":
                      return{
                        ...state,
                        playlist_id:action.payload
                      }
    default:
      return state
  }
}
