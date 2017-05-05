import {Post, Get} from '../utils/request.tool';
import {REPORT} from '../utils/urlconfig.tool'
import {getKeyArray, getResultArray, checkChannelCode} from '../utils/common.method.tool'

export default{
    namespace: 'report',
    state: {
        previewData: {},
        sendVolumeData: [],
        sendQualityX: [],
        mailQualityX: [],
        sendQualityData: [],
        mailQualityData: [],
        chartLoading: false,
        channelQualityData: [],
    },
    effects: {
    * previewSearch({...action
}
,
{
    put, call
}
)
{
    let data = action.data,
        channelCode = data.channelCode,
        query = (channelCode == 'all') ? {
            start: data.start,
            end: data.end,
        } : {
            start: data.start,
            end: data.end,
            channelCode: data.channelCode
        };

    let value = yield call(Get, REPORT.STATS, query),
        resultData = value.result,
        openCount = Number(resultData.uniqueOpenCount) + Number(resultData.mailClicked)
            + Number(resultData.unsubscribe) + Number(resultData.spamComplain),
        result = {
            taskCount: resultData.taskCount,
            total: resultData.total,
            openCount: openCount,
            allClicked: resultData.mailClicked,
            softBounce: resultData.softBounce,
            hardBounce: resultData.hardBounce,
            spamComplain: resultData.spamComplain,
            unsubscribe: resultData.unsubscribe,

        };
    yield put({type: 'setPreviewData', result});
}
,

*
sendVolumeSearch({...action
},
{
    put, call
}
)
{
    yield put({type: 'showChartLoading'});

    let data = action.data,
        channelCode = data.channelCode,
        query = (channelCode == 'all') ? {
            start: data.start,
            end: data.end,
        } : {
            start: data.start,
            end: data.end,
            channelCode: data.channelCode
        };
    let value = yield call(Get, REPORT.STATS_TOTAL_REPORT, query),
        keyArray = getKeyArray(value.result),
        resultArray = getResultArray(keyArray, value.result);
    let result = [{name: '', data: resultArray}]
    yield put({type: 'setSendVolumeData', result});
    yield put({type: 'hideChartLoading'});

}
,
*
channelQuality({...action
},
{
    put, call
}
)
{
    yield put({type: 'showChartLoading'});
    let data = action.data,
        channelCode = checkChannelCode(data.channelCode),
        query = {
            start: data.start,
            channels: channelCode
        };
    let value = yield call(Get, REPORT.CHANNEL_QUALITY, query),
        keyArray = getKeyArray(value.result),
        channelQuality = getResultArray(keyArray, value.result);
    // for (let i = 0, len = keyArray.length; i < len; i++) {
    //     let result = value.result[keyArray[i]],
    //         _data = [keyArray[i], result];
    //
    //     channelQuality.push(_data);
    // }
    yield put({type: 'setChannelQuality', channelQuality});
}
,

*
sendQualitySearch({...action
},
{
    put, call
}
)
{
    yield put({type: 'showChartLoading'});
    let data = action.data,
        channelCode = data.channelCode,
        query = (channelCode == 'all') ? {
            start: data.start,
            end: data.end,
        } : {
            start: data.start,
            end: data.end,
            channelCode: data.channelCode
        },
        value = yield call(Get, REPORT.STATS_QUALITY_REPORT, query);

    let keyArray = getKeyArray(value.result),
        hardBounce = [],
        softBounce = [],
        unsubscribe = [],
        spamComplain = [],
        result = [];

    for (let i = 0, len = keyArray.length; i < len; i++) {
        hardBounce.push(parseFloat(value.result[keyArray[i]].hardBounce));
        softBounce.push(parseFloat(value.result[keyArray[i]].softBounce));
        unsubscribe.push(parseFloat(value.result[keyArray[i]].unsubscribe));
        spamComplain.push(parseFloat(value.result[keyArray[i]].spamComplain));
    }

    result = [
        {
            name: '硬退',
            data: hardBounce
        }, {
            name: '软退',
            data: softBounce
        }, {
            name: '退订',
            data: unsubscribe
        }, {
            name: '投诉',
            data: spamComplain
        }
    ];

    yield put({type: 'setSendQualityX', keyArray});
    yield put({type: 'setSendQualityData', result});
    yield put({type: 'hideChartLoading'});
}
,

*
mailQualitySearch({...action
},
{
    put, call
}
)
{
    yield put({type: 'showChartLoading'});
    let data = action.data,
        channelCode = data.channelCode,
        query = (channelCode == 'all') ? {
            start: data.start,
            end: data.end,
        } : {
            start: data.start,
            end: data.end,
            channelCode: data.channelCode
        },
        value = yield call(Get, REPORT.STATS_QUALITY_REPORT, query);

    let keyArray = getKeyArray(value.result),
        uniqueOpenCount = [],
        mailClicked = [],
        result = [];


    for (let i = 0, len = keyArray.length; i < len; i++) {
        uniqueOpenCount.push(parseFloat(value.result[keyArray[i]].uniqueOpenCount));
        mailClicked.push(parseFloat(value.result[keyArray[i]].mailClicked));
    }

    result = [
        {
            name: '打开',
            data: uniqueOpenCount
        }, {
            name: '点击',
            data: mailClicked
        }
    ];

    yield put({type: 'setmailQualityX', keyArray});
    yield put({type: 'setmailQualityData', result});
    yield put({type: 'hideChartLoading'});
}
},
reducers: {
    showChartLoading(state)
    {
        return {
            ...state,
            chartLoading
    :
        true,
    }
        ;
    }
,

    hideChartLoading(state)
    {
        return {
            ...state,
            chartLoading
    :
        false,
    }
        ;
    }
,

    setChannelQuality(state, {channelQuality})
    {
        let newResult = channelQuality;
        return {
            ...state,
            channelQualityData
    :
        newResult
    }
    }
,

    setPreviewData(state, {result})
    {
        let newResult = result;
        return {
            ...state,
            previewData
    :
        newResult,
    }
        ;
    }
,

    setSendVolumeData(state, {result})
    {
        let newResult = result;
        return {
            ...state,
            sendVolumeData
    :
        newResult,
    }
        ;
    }
,

    setSendQualityX(state, {keyArray})
    {
        let newResult = keyArray;
        return {
            ...state,
            sendQualityX
    :
        newResult,
    }
        ;
    }
,

    setSendQualityData(state, {result})
    {
        let newResult = result;
        return {
            ...state,
            sendQualityData
    :
        newResult,
    }
        ;
    }
,

    setmailQualityX(state, {keyArray})
    {
        let newResult = keyArray;
        return {
            ...state,
            mailQualityX
    :
        newResult,
    }
        ;
    }
,

    setmailQualityData(state, {result})
    {
        let newResult = result;
        return {
            ...state,
            mailQualityData
    :
        newResult,
    }
        ;
    }
}
}
