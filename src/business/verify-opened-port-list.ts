import promise_limit from "../helper/promise-limit";
import tcp_ping from "../lib/tcp-ping";

const LIMIT = 100;
const MIN_PORT = 1;
const MAX_PORT = 65535;

/**
 * 输入待校验的端口数组
 *
 * @param ip
 * @param ports
 * @returns 返回开放的端口
 */
export default async function verifyOpenedPortList(
  ip: string,
  ports: number[]
) {
  const params = [...ports].filter((v) => {
    return v >= MIN_PORT && v <= MAX_PORT;
  });

  return promise_limit(LIMIT, params, async (port) => {
    return tcp_ping(ip, port);
  }).then((arr) => {
    const res: number[] = [];
    arr.forEach((v, i) => {
      if (v === true) res.push(params[i]);
    });
    return res;
  });
}
