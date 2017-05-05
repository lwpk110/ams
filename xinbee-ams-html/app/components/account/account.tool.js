export function getAccountInfo(info) { // get account info
        let options = [{
                value : 'all',
                name : '所有通道'
            }];

        for(let i=0, len = info.length; i<len; i++){
            let item = {
                    value : String(info[i].channelCode),
                    name : info[i].name

                };
            options.push(item);
        }

        return options;
}
