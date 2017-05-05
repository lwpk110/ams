import { Get } from '../utils/request.tool';
import { CHANNEL } from '../utils/urlconfig.tool'

export default{
    namespace: 'channel',
    state: {
        channelData: localStorage.getItem('channels'),
    },

    subscriptions: {
        setup ({dispatch}) {
            dispatch({type: 'channelSearch'})
        }
    },

    effects: {
        *channelSearch({ ...action }, {put, call}){
            let value = yield call(Get, CHANNEL.GET_CHANNEL);
            localStorage.setItem('channels',JSON.stringify(value.list));
        },

    },

}

