import { sempty, snode, Stream } from "../include/stream.js";

export type Series = Stream<number>;

export function addSeries(s: Series, t: Series): Series {
  return s.isEmpty() && t.isEmpty()
    ? sempty()
    : s.isEmpty()
    ? t
    : t.isEmpty()
    ? s
    : snode(s.head() + t.head(), () => addSeries(s.tail(), t.tail()));
}

export function prodSeries(s: Series, t: Series): Series {
  const h = s.head() * t.head();
  const tl = () =>
    addSeries(
      t.tail().map(x => x * s.head()),
      prodSeries(s.tail(), t)
    );
  return snode(h, tl);
}

export function derivSeries(s: Series): Series {
  const h = s.head();
  const t = s.tail();

  if (t.isEmpty()) {
    return sempty();
  }

  const followingCoeff = t.head();
  const followingStream = derivSeries(t);

  return snode(h * 1, () => snode(followingCoeff * 2, () => followingStream));
}

export function coeff(s: Series, n: number): number[] {
  if (s.isEmpty()) {
    return [];
  }

  const result: number[] = [];

  for (let i = 0; i <= n && !s.isEmpty(); i++) {
    result.push(s.head());
    s = s.tail();
  }

  return result;
}

export function evalSeries(s: Series, n: number): (x: number) => number {
  const c = coeff(s, n);
  return (x: number) => {
    let total = 0;
    let expPower = 1;
    for (let i = 0; i <= n; i++) {
      total += c[i] * expPower;
      expPower *= x;
    }
    return total;
  };
}

export function applySeries(f: (c: number) => number, v: number): Series {
  return snode(v, () => applySeries(f, f(v)));
}

export function expSeries(): Series {
  function term(n: number): number {
    return 1 / factorial(n);
  }

  function factorial(n: number): number {
    if (n === 0) {
      return 1;
    } else {
      return n * factorial(n - 1);
    }
  }

  return applySeries(term, 1);
}

export function recurSeries(coef: number[], init: number[]): Series {
  const h = init[0];
  const t = () => recurSeries(coef, [...init.slice(1), coef.reduce((acc, cur, i) => acc + cur * init[i], 0)]);
  return snode(h, t);
}
