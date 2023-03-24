/* // 引入ws模块：
import Ws from 'ws';

// 导出websocket服务配置：
export const websocket = () => {
  // 创建websocket服务：
  const wsServe = new Ws.Server({
    // 必须配置ip地址，否则上线后连接不上
    host: 'localhost',
    port: 5173,
  });
  // 监听客户端连接：
  wsServe.on('connection', (client) => {
    console.log('有客户端接入了');
    // 监听客户端有消息发送过来：
    client.on('message', async (msg) => {
      console.log('有客户端消息发送过来了');
      console.log(msg);
      const request = JSON.parse(msg);
      try {
        client.send(JSON.stringify(request));
      } catch (err) {
        client.send(JSON.stringify({ cod: 404, msg: '获取数据失败' }));
      }

      // wsServe.clients中存所有当前连接的客户端，可以用来做广播
      wsServe.clients.forEach((itemClient) => {
        itemClient.send('发送数据到当前已连接的所有websocket客户端');
      });
    });
  });
};
 */
