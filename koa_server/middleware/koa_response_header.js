// 第二层中间件
module.exports = async(ctx,next) => {
    // 获取mine类型
    const contentType = 'application/json; charset=utf-8';

    // 设置第二层中间件的响应头
    ctx.set('Content-Type',contentType);
    // 同源策略 解决跨域问题
    ctx.set("Access-Control-Allow-Origin","*");
    ctx.set("Access-Control-Allow-Methods","OPIONS,GET,PUT,POST,DELETE");

    await next();
}