// 服务器的入口文件
// 1. 创建koa的实例对象
const koa = require('koa');

const app = new koa();
// 2. 绑定第一层中间件
// 获取函数
const respDurationMiddleware = require('./middleware/koa_response_duration');

app.use(respDurationMiddleware);
// 3. 绑定第二层中间件
const respHeaderMiddleware = require('./middleware/koa_response_header');

app.use(respHeaderMiddleware);
// 4. 绑定第三层中间件

const respDataMiddleware = require('./middleware/koa_response_data');

app.use(respDataMiddleware);
// 5. 监听端口号（8888）
app.listen(8888);

const websocketService = require('./service/web_socket_service')
websocketService.listen()