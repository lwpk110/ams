import fetch from 'dva/fetch';

// 带参数的url
function param(url, params){
    let paramsArray = [];

    Object.keys(params).forEach(key => paramsArray.push(key + '=' + encodeURIComponent(params[key])));

    if (url.search(/\?/) === -1) {
        url += '?' + paramsArray.join('&')
    } else {
         url += '&' + paramsArray.join('&')
    }

    return url;
}

// POST/PUT
function change(url, data, method){
    return fetch(url, {
        credentials: "same-origin",
        headers: {
            'Content-Type': 'application/json'
        },
        method: method,
        mode: 'cors',
        body: JSON.stringify(data || {})
    })
    .then(response => response.json())
}

// GET/DELETE
function gain(url, params, method){
    if(params){
        url = param(url, params);
    }

    return fetch(url, {
        credentials: "same-origin",
        mode: 'cors',
        method: method
    })
    .then(response => response.json())
}

export function Post (url, data){
    return change(url, data, 'POST');
}

export function Put (url, data){
    return change(url, data, 'PUT');
}

export function Get(url, params){
    return gain(url, params, 'GET')
}

export function Delete (url, params){
    return gain(url, params, 'DELETE');
}
