// TCP ping

import net from "net";

export default function tcpPing(host: string, port: number) {
  return new Promise((resolve) => {
    const socket = net.createConnection({
      host,
      port,
      // http://nodejs.cn/api/net.html#netcreateconnection
      // 如果设置，则将用于在创建套接字之后但在开始连接之前调用 socket.setTimeout(timeout)。
      timeout: 1000, // 1000ms
    });

    const end = (status: boolean) => {
      socket.destroy();
      resolve(status);
    };

    socket.on("connect", () => {
      end(true);
    });

    ["error", "timeout", "close"].forEach((type) => {
      socket.on(type, (err) => {
        end(false);
      });
    });
  });
}
