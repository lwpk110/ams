import {Post, Get, Put, Delete} from '../utils/request.tool';
import {BENCHMARKS} from '../utils/urlconfig.tool'

export default {
    namespace: 'benchmarks',
    state: {
        tableLoading: true,
        benchMarksData: [],
        modalVisible: false,
        totalElements: 0
    },
    effects: {
        *query({...action}, {put, call}){
            yield put({type: 'showTableLoading'});
            let data = action.data;
            let value = yield call(Get, BENCHMARKS.QUERY, data),
                result = value.data;
            let total = value.totalElements;
            yield put({type: 'hideTableLoading'});
            yield put({type: 'setBenchMarksData', result});
            yield put({type: 'setPageData', total});
        },
        *create({...action}, {put, call}){
            let object = action.data.object,
                data = action.data.param,
                value = yield call(Post, BENCHMARKS.ADD, object);
            if (value.success === 'true') {
                yield put({type: 'query', data});
            }
        },
        *update({...action}, {put, call}){
            let object = action.data.object,
                id = object.id,
                data = action.data.param,
                value = yield call(Post, BENCHMARKS.UPDATE.replace("{id}", id), object);
            if (value.success === 'true') {
                yield put({type: 'query', data});
            }
        },

        *deleteItem({...action}, {put, call}){
            let id = action.data.itemId,
                data = action.data.param,
                value = yield call(Post, BENCHMARKS.DELETE.replace("{id}", id));
            if (value.success === 'true') {
                yield put({type: 'query', data});
            }
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
        setPageData(state, {total}){
            let newResult = total;
            return {
                ...state,
                totalElements: newResult,
            };
        },
        setBenchMarksData(state, {result}){
            let newResult = result;
            return {
                ...state,
                benchMarksData: newResult
            }
        }
    }
}
