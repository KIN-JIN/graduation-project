// 业务逻辑中间件
/* 1.读取文件内容：
    获取请求路径，拼接文件路径
    读取该路径对应文件的内容
    2.设置响应体
*/
const path = require('path');
// 获取工具类
const fileUtils = require('../utils/file_utils');

module.exports = async(ctx,next) =>{
    //根据url获取文件实际路径
    const url = ctx.request.url; //      /api/seller
    
    let filePath = url.replace('/api',''); //  /seller
    
    filePath = "../data" + filePath +'.json'; // ../data/seller.json
    
    filePath = path.join(__dirname,filePath);
    // 文件读取处理异常
    try{
        // 调用工具构造函数
        // 返回的时一个对象，所以要用await修饰
        const ret = await fileUtils.getFileJsonData(filePath);

        ctx.response.body = ret;
    }catch(error){
        const errorMsg = {
            message: '读取文件内容失败，文件不存在',
            status: 404
        };
        // 转换Json对象
        ctx.response.body = JSON.stringify(errorMsg);
    }

    

    // console.log(filePath);

    await next(); // 最后一层中间，可以不设置next，一般建议配置
}