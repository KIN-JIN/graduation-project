const path = require('path')
const fileUtils = require('../utils/file_utils')
// 创建WebSocket服务端的对象
const WebSocket = require('ws')
// 绑定端口号
const wss = new WebSocket.Server({
    port: 9998
})
// 服务端开启监听
module.exports.listen = () => {
    wss.on('connection',client => {
        console.log('有客户端连接成功...')
        client.on('message',async msg => {
            console.log('客户端发送数据给服务端：' + msg)
            let payLoad = JSON.parse(msg)
            const action = payLoad.action
            if(action === 'getData'){
                let filePath = '../data/' + payLoad.chartName + '.json'
                filePath = path.join(__dirname,filePath)
                const ret = await fileUtils.getFileJsonData(filePath)
                // 增加data字段
                payLoad.data = ret
                client.send(JSON.stringify(payLoad))
            }else{
                // 原封不动地将接收的数据发给每一个处于连接状态的客户
                // wss.clients 所有客户端
                wss.clients.forEach((client) => {
                    client.send(msg)
                })
            }
            // client.send('hello socket from backed')
        })
    })
}