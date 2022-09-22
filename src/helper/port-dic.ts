import os from "os";
import path from "path";
import fse from "fs-extra";

let top20: number[];
let top200: number[];

function parsePortList(filename: string) {
  const pwd = path.resolve(__dirname, "..", "data", filename);
  const text = fse.readFileSync(pwd, { encoding: "utf8" });
  if (!text) return [];

  const arr = text.split(os.EOL);
  const res = [];
  for (let item of arr) {
    if (item.includes("-")) {
      const [s, e] = item.split("-");
      let sn = parseInt(s, 10);
      let en = parseInt(e, 10);

      while (sn <= en) {
        res.push(sn++);
      }
    } else {
      res.push(parseInt(item, 10));
    }
  }

  return res;
}

export default function portParser(type: 1 | 2) {
  if (type === 1) {
    if (top20) return top20;

    top20 = parsePortList("top-port-20.txt");
    return top20;
  } else if (type === 2) {
    if (top200) return top200;

    top200 = parsePortList("top-port-200.txt");
    return top200;
  }

  return [];
}
