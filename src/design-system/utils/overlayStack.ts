let stack: symbol[] = [];

export function pushOverlay(id: symbol) {
  stack = [...stack.filter((s) => s !== id), id];
}

export function popOverlay(id: symbol) {
  stack = stack.filter((s) => s !== id);
}

export function isTopOverlay(id: symbol) {
  return stack[stack.length - 1] === id;
}
