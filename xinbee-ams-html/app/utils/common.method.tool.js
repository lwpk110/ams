export function getKeyArray(object) {
    let keyArray = [];

    for (var key in object) {//遍历 obj
        keyArray.push(key);//存入数组
    }
    return keyArray
}

export function getResultArray(keyArray, value) {
    let resultArray = [];
    for (let i = 0, length = keyArray.length; i < length; i++) {
        let data = [keyArray[i], value[keyArray[i]]];
        resultArray.push(data);
    }
    return resultArray;
}

export function checkChannelCode(code) {
    if (code == 'all') {
        let channelCode = [],
            channels=JSON.parse(localStorage.getItem('channels'));
        for (let i = 0, len = channels.length; i < len; i++) {
            channelCode.push(channels[i].channelCode);
        }
        return channelCode;
    } else{
        return code
    }


}

