import verifyAliveHost from "./verify-alive-host";
import promiseLimit from "../helper/promise-limit";

const LIMIT = 100;
const REG_IP =
  /^(?:(?:\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.){3}(?:\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])$/;

/**
 * 找到网段中存活的主机
 *
 * @param net 192.168.1.0
 * @returns
 */
export default function findAliveHost(net: string) {
  console.log("find all alive host, it maybe cost long time, scanning...");

  if (!REG_IP.test(net)) {
    throw new Error("invalid net address, eg: 192.160.10.0");
  }
  const pre = net.substring(0, net.lastIndexOf("."));

  const params = new Array(255).fill("").map((v, i) => `${pre}.${i + 1}`);

  return promiseLimit(LIMIT, params, (ip) => {
    return verifyAliveHost(ip);
  }).then((arr) => {
    const res: string[] = [];
    arr.forEach((v, i) => {
      if (v === true) res.push(params[i]);
    });
    return res;
  });
}
