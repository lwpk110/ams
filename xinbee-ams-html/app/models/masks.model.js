import {Post, Get} from '../utils/request.tool';
import { MASKS } from '../utils/urlconfig.tool'

export default{
    namespace: 'masks',
    state: {
        tableLoading : true,
        maskData : [],
        totalElements : 0,
        reloadRow : false
    },
    effects: {
        *searchMasks({ ...action }, {put, call}){
            yield put({type:'showTableLoading'});
            let data = action.data,
                value = yield call(Get, MASKS.MASKS_LIST, data),
                total = value.totalElements,
                result = value.data;

            yield put({type: 'setMasksData', result});
            yield put({type: 'setPageData', total});
            yield put({type:'hideTableLoading'});
        },

        *handleSend({ ...action }, {put, call}){
            let type = action.data.handleType,
                dataHandle = {
                    ids : action.data.ids
                },
                searchData = {
                    status : action.data.status,
                    page :  action.data.page
                },
                url = '',
                value = {},
                result = [],
                total = 0;

            switch(type){
                case 'reSend':
                    url = MASKS.RESEND;
                    break;

                case 'cancelSend':
                    url = MASKS.CANCELSEND;
                    break;

                default:
                    break;
            }

            yield call(Get, url, dataHandle);
            yield put({type:'showTableLoading'});
            value = yield call(Get, MASKS.MASKS_LIST, searchData);
            total = value.totalElements,
            result = value.data;
            yield put({type: 'setMasksData', result});
            yield put({type: 'setPageData', total});
            yield put({type:'hideTableLoading'});
        }
    },
    reducers: {
        showTableLoading(state){
            return { ...state,
                tableLoading : true,
            };
        },

        hideTableLoading(state){
            return { ...state,
                tableLoading : false,
            };
        },

        setMasksData(state, { result }) {
            let newResult = result;
            return { ...state,
                maskData : newResult,
            };
        },

        setPageData(state, { total }){
            let newResult = total;
            return { ...state,
                totalElements : newResult,
            };
        }
    }
}
