export const debounce = <Func extends (...args: any[]) => any>(func: Func, wait: number) => {
  const cache = new Map();
  let timeout: ReturnType<typeof setTimeout>;

  return function (...args: any[]) {
    if (cache.has(args[0])) {
      clearTimeout(cache.get(args[0]));
      cache.delete(args[0]);
    }

    console.log('@');
    timeout = setTimeout(() => func(...args), wait);
    cache.set(args[0], timeout);
  } as Func;
};
