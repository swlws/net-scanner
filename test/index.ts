import {
  findChildNets,
  findNetHosts,
  findHostPorts,
  findAllChildNetHost,
} from "../src/index";

const log = (v: any) => console.log(JSON.stringify(v, undefined, 2));

// 探测子网段
// findChildNets("192.168.0.0").then(log);
// 探测网段下的主机
// findNetHosts("192.168.10.0").then(log);
// 探测主机上的端口
// findHostPorts(["192.168.1.1"]).then(log);
// 探测所有子网段、及网段下所有主机的开放端口
// findAllChildNetHost("192.168.0.0").then(log);
// 192.168.10.0所有存活主机的开放端口
findNetHosts("192.168.10.0").then(findHostPorts).then(log);
