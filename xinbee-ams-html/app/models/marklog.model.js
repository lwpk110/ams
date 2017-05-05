import {Post, Get, Put, Delete} from '../utils/request.tool';
import {MARKLOG} from '../utils/urlconfig.tool'

export default {
    namespace: 'marklog',
    state: {
        tableLoading: true,
        markLogData: [],
        totalElements: 0,
        logDetails: [],
        mailTemplate: {}
    },
    effects: {
        *query({...action}, {put, call}){
            yield put({type: 'showTableLoading'});
            let data = action.data;
            let value = yield call(Get, MARKLOG.QUERY, data),
                result = value.data.map((item, i) => {
                    return {
                        id:item.id,
                        invokeDate: item.templateScoreSummary.invokeDate,
                        title: item.templateScoreSummary.template.subject,
                        score: item.score,
                        consumeTime: item.templateScoreSummary.consumeTime,
                        invokeStatus: item.templateScoreSummary.invokeStatus,
                        platformCode: item.templateScoreSummary.platformCode,
                        taskId: (item.mailDeliveryTaskTemplate)?item.mailDeliveryTaskTemplate.taskId:'',
                        template:item.templateScoreSummary.template,
                        source:item.templateScoreSummary.source
                    }
                }),
                template = value.totalElements;
            let total = value.totalElements;
            yield put({type: 'hideTableLoading'});
            yield put({type: 'setMarkLogData', result});
            yield put({type: 'setPageData', total});
            yield put({type: 'setMailTemplate', template})
        },
        *searchDetails({...action}, {put, call}){
            let data = action.data,
                value = yield call(Get, MARKLOG.LOG_DETAILS.replace("{id}", data)),
                result = value.map((item, i) => {
                    return {
                        key:item.code,
                        explainChinese: item.templateScoreBenchmark.explainChinese,
                        score: item.templateScoreBenchmark.score,

                    }
                });
            yield put({type: 'setLogDetails', result})
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
        setMailTemplate(state, {template}){
            const newResult = template;
            return {
                ...state,
                mailTemplate: newResult
            }
        },
        setPageData(state, {total}){
            let newResult = total;
            return {
                ...state,
                totalElements: newResult,
            };
        },
        setMarkLogData(state, {result}){
            let newResult = result;
            return {
                ...state,
                markLogData: newResult
            }
        },
        setLogDetails(state, {result}){
            let newResult = result;
            return {
                ...state,
                logDetails: newResult,
            }
        }
    }
}
