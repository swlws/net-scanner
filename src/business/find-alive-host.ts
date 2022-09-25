import verifyAliveHost from "./verify-alive-host";
import promiseLimit from "../helper/promise-limit";

const LIMIT = 100;
// const REG_IP =
//   /^(?:(?:\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.){3}(?:\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])$/;
const REG_IP = /^(?:(?:\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.){3}0$/;

/**
 * 找到子网段中存活的主机
 *
 * @param net 网段。eg：192.168.1.0
 * @param nodes 节点。eg：nodes=[1,2]，则校验192.168.10.1 192.168.10.2
 *
 * @returns
 */
export default function findNetHosts(net: string, nodes?: number[]) {
  console.log(`find all alive host in net ${net}, scanning...`);

  if (!REG_IP.test(net)) {
    throw new Error(`invalid net address ${net}, eg: 192.168.10.0`);
  }
  const pre = net.substring(0, net.lastIndexOf("."));

  if (Array.isArray(nodes)) {
    nodes = nodes.filter((v) => v >= 1 && v <= 255);
  }

  const params = Array.isArray(nodes)
    ? nodes.map((v) => `${pre}.${v}`)
    : new Array(255).fill("").map((v, i) => `${pre}.${i + 1}`);

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
