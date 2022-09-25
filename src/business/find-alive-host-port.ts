import promiseLimit from "../helper/promise-limit";
import verify_opened_port_list from "./verify-opened-port-list";
import port_dic from "../helper/port-dic";

const LIMIT = 100;

/**
 * 找个每个主机对应的端口列表
 *
 * @param ips
 * @returns
 */
export default function findHostPorts(ips: string[]) {
  return promiseLimit(LIMIT, ips, (ip) => {
    return verify_opened_port_list(ip, port_dic(2));
  }).then((arr) => {
    return ips.map((ip, i) => ({ ip, port: arr[i] }));
  });
}
