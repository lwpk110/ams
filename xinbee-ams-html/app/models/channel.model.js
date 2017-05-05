import {Post, Get} from '../utils/request.tool';
import {CHANNEL} from '../utils/urlconfig.tool'

export  default {
    namespace: 'mailchannel',
    state: {
        tableLoading: true,
        mailChannelData: [],
        modalVisible: false,
        currentItem: {},
    },
    effects: {
        *searchMailChannel({...action}, {put, call}){
            yield put({type: 'showTableLoading'});
            let value = yield call(Get, CHANNEL.GET_ALL),
                result = value;

            yield put({type: 'setMailChannelData', result});
            yield put({type: 'hideTableLoading'});
        },
        *edit({...action}, {put, call}){
            let data = action.data
            let value = yield call(Post, CHANNEL.EDIT, data)
            yield put({type: 'searchMailChannel', data});
        },
        *onEditItem({...action}, {put, call}){
            let data = action.data;
            yield put({type: 'showModal', data});
        },
        *clearEditItem({...action}, {put, call}){
            yield put({type: 'hideModal'})
        }


    },
    reducers: {
        showTableLoading(state){
            return {
                ...state,
                tableLoading: true,
            };
        },

        hideTableLoading(state){
            return {
                ...state,
                tableLoading: false,
            };
        },

        setMailChannelData(state, {result}){
            let newResult = result;
            return {
                ...state,
                mailChannelData: newResult
            }
        },

        showModal (state, {data}) {
            let item = data;
            return {...state, currentItem: item, modalVisible: true}
        },
        hideModal (state) {
            return {...state, currentItem: {}, modalVisible: false}
        }

    }
}

