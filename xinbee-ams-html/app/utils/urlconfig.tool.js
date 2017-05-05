const channelUrl = "http://192.168.11.14:8091";
const reportUrl = "http://rcs.xinbee.com";
const maskUrl = "";
const mailchannel = ''


export const CHANNEL = {
    GET_ALL: 'channel/list',
    EDIT: 'channel/edit',
    GET_CHANNEL: 'channel',
}

export const REPORT = {
    STATS: 'channel/stats/report',
    STATS_TOTAL_REPORT: 'channel/stats/total',
    STATS_QUALITY_REPORT: 'channel/stats/mail/quality',
    CHANNEL_QUALITY: 'channel/quality',
}

export const MASKS = {
    MASKS_LIST: maskUrl + 'tasks',
    RESEND: maskUrl + 'tasks/resend',
    CANCELSEND: maskUrl + 'tasks/cancel',
}

export const TASKREPORTING = {
    TASK_REPORTING: 'taskreporting/{serverKey}'
}

export const BENCHMARKS = {
    QUERY: 'benchmarks',
    ADD: 'benchmarks/add',
    UPDATE: 'benchmarks/edit/{id}',
    DELETE: 'benchmarks/delete/{id}',
}

export const MARKLOG = {
    QUERY: 'marklog',
    LOG_DETAILS: 'marklog/{id}/details',
}

