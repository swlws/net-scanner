import findChildNets from "./business/find-net";
import findNetHosts from "./business/find-alive-host";
import findHostPorts from "./business/find-alive-host-port";

export { findChildNets, findNetHosts, findHostPorts };

/**
 * 找到所有子网，及每个子网下的设备、开放端口
 *
 * @param net 192.168.0.0
 * @returns
 */
export async function findAllChildNetHost(net: string) {
  const nets = await findChildNets("192.168.0.0");

  const res = [];
  for (let net of nets) {
    const hosts = await findNetHosts(net);
    const ports = await findHostPorts(hosts);

    res.push({
      net,
      host: ports,
    });
  }

  return res;
}
