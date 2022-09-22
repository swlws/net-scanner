/**
 * Run multiple promise-returning & async functions with limited concurrency
 */
export default function promiseLimit(
  limit: number,
  params: any[],
  fn: (arg: any) => any
): Promise<any[]> {
  if (params.length === 0) return Promise.resolve([]);

  if (params.length < limit) {
    return Promise.all(params.map((v) => fn(v)));
  }

  let num = 0;
  const values: any[] = [];
  const data = params.map((value, index) => ({ value, index }));

  const ge = (p: any, r: any) => {
    num++;
    return fn(p.value).then((res: any) => {
      num--;
      values[p.index] = res;

      const el = data.shift();
      el ? ge(el, r) : void 0;

      num === 0 ? r(values) : void 0;
    });
  };

  return new Promise((r) => {
    for (let i = 0; i < limit; i++) {
      ge(data.shift(), r);
    }
  });
}
