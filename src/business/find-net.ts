import promiseLimit from "../helper/promise-limit";
import findAliveHost from "./find-alive-host";

const LIMIT = 100;
const REG_IP = /^(?:(?:\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.){2}0\.0$/;

/**
 * 探测子网段
 *
 * @param net 192.168.0.0
 * @param nodes 探测子网时使用的地址，缺省为[1, 255]
 * @returns 返回子网段
 */
export default function findChildNets(net: string, nodes = [1, 255]) {
  console.log(`find all child net in parent net ${net}, scanning...`);

  if (!REG_IP.test(net)) {
    throw new Error("invalid net address, eg: 192.168.0.0");
  }

  const pre = net.split(".").slice(0, 2).join(".");
  const params = new Array(255).fill("").map((v, i) => `${pre}.${i + 1}.0`);

  return promiseLimit(LIMIT, params, (ip) => {
    return findAliveHost(ip, nodes);
  }).then((arr) => {
    const res: string[] = [];
    arr.forEach((v, i) => {
      if (v.length > 0) res.push(params[i]);
    });
    return res;
  });
}
