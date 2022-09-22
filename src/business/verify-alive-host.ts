import icmp_ping from "../lib/icmp-ping";
import verify_opened_port_list from "./verify-opened-port-list";
import port_dic from "../helper/port-dic";

export default async function verifyAliveHost(ip: string) {
  const flag = await icmp_ping(ip);
  if (flag) return true;

  const res = await verify_opened_port_list(ip, port_dic(1));
  if (res.length > 0) return true;
  return false;
}
