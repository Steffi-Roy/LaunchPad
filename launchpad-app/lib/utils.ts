/**
 * Cycles through an array of messages at a fixed interval.
 * Returns a cleanup function that stops the cycling.
 */
export function cycleMessages(
  messages: string[],
  interval: number,
  setter: (msg: string) => void
): () => void {
  if (messages.length === 0) return () => {};
  setter(messages[0]);
  let index = 0;
  const timer = setInterval(() => {
    index = (index + 1) % messages.length;
    setter(messages[index]);
  }, interval);
  return () => clearInterval(timer);
}
