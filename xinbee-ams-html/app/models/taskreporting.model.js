import {Post, Get} from '../utils/request.tool';
import { TASKREPORTING } from '../utils/urlconfig.tool'

export default{
    namespace: 'taskreporting',
    state: {
        taskReportingData: [{name: 'FOCUS_SEND'}, {name: 'WEB_POWER'}]
    },
    effects: {
        *action({payload}, {put, call}){
            let data = payload.name,
            value = yield call(Post, TASKREPORTING.TASK_REPORTING.replace('{serverKey}', data), data)
        }
    }
}
