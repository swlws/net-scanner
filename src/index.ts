import findAliveHost from "../src/business/find-alive-host";
import findAliveHostPort from "../src/business/find-alive-host-port";

/**
 * 找到某个网段中的所有设备、及其开放端口
 *
 * @param net
 * @returns
 */
export default function lookup(net: string) {
  return findAliveHost(net).then(findAliveHostPort);
}
