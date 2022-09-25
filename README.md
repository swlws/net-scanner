# 简单网路扫描器

开发意图：检查自己的路由器是否有其它设备在接入。

## 一、API

### findChildNets(net: string, nodes = [1, 255])

找到当前网络中所有的子网（仅支持 IPv4）.

### findNetHosts(net: string, nodes?: number[])

找到子网段中存活的主机

### findHostPorts(ips: string[])

找个每个主机对应的端口列表

### findAllChildNetHost(net: string)

找到所有子网，及每个子网下的设备、开放端口

## 二、节点存活

校验节点是否存活的方式，先使用`icmp ping`, 能 ping 通则节点存活；否则执行`tcp ping`，任意端口能够 ping 通则节点存活。

---

## 免责声明

本项目仅用于学习、研究使用，请勿将本项目的任何内容用于商业或非法目的，否则后果自负。
