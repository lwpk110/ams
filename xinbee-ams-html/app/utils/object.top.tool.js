export function Top(top, data){
    let objLen = Object.getOwnPropertyNames(data).length,
        topSum = 0,
        total = 0,
        i = 0,
        topNum = (objLen > top ) ? top : objLen, // get top (? : number) 
        item = [],
        result = [];

    if(!objLen){
        result = [];
    }else{
        for(let key in data){
            if(i < topNum){
                topSum += data[key];
                item = [key, data[key]];
                result.push(item)
            }
            total += data[key];
            i++
        }
        result.push(['其他', total-topSum]);
    }

    return result;
}