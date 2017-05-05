
// month
export function monthInit() { // month init
    let now = new Date(),
        fullYear = now.getFullYear(),
        mth = now.getMonth()+1,
        initData = {};

    initData.defaultValue = fullYear + '-' + mth;
    initData.startDate = (fullYear-1) + '-' + '01';
    initData.endDate = initData.defaultValue;

    return initData;
}

export function getMonthRange(UTC) { // get month range
    let startUTC = UTC,
        year = startUTC.getFullYear(),
        mth = startUTC.getMonth(),
        dates = new Date(year, mth+1, 0).getDate(),
        searchDateRange = {};

        searchDateRange.start = year + '-'
                + (((mth+1)>=10) ? (mth+1) : ('0' + (mth+1) ))
                + '-01'
                + "T00:00:00Z";
        searchDateRange.end =year + '-'
                + (((mth+1)>=10) ? (mth+1) : ('0' + (mth+1) )) + '-'
                + dates + "T23:59:59Z";

        return searchDateRange;
}
