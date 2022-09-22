// ICMP ping

import ping from "net-ping";
var session = ping.createSession();

export default function icmpPing(host: string): Promise<boolean> {
  return new Promise((resolve) => {
    session.pingHost(host, function (error: any) {
      if (error) return resolve(false);
      return resolve(true);
    });
  });
}
