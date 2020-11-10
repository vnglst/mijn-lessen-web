const rnd = () => Math.random();

export function getRnd(max: number) {
  return Math.floor(rnd() * max);
}

export function shuffle<T>(arr: T[]): T[] {
  return arr.sort(() => rnd() - 0.5);
}

export function sample<T>(arr: T[]) {
  return arr[Math.floor(rnd() * arr.length)];
}

export function deepEqual<T>(obj1: T, obj2: T) {
  return JSON.stringify(obj1) === JSON.stringify(obj2);
}

export function cloneDeep<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}
