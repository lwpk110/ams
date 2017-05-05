export const menu = [

    {
        key: 'sendreport',
        name: '发送报告',
        icon: 'link',
    },
    {
        key: 'masksmanger',
        name: '任务管理',
        icon: 'link',
    },
    {
        key: 'mailchannel',
        name: '通道管理',
        icon: 'link',
    },
    {
        key: 'taskreporting',
        name: '任务报道调度',
        icon: 'link',
    },
    {
       key: 'template',
       name: '模板管理',
       icon: 'link',
       child: [{
           key: 'benchmarks',
           name: '评分规则'
       },
           {
               key: 'marklog',
               name: '评分日志'
           }]
    },
]

