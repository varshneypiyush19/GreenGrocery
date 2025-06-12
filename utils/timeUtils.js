export const isStoreOpen = (from, to) => {
  const now = new Date();
  const nowMinutes = now.getHours() * 60 + now.getMinutes();

  const [fromHours, fromMinutes] = from.split(":").map(Number);
  const [toHours, toMinutes] = to.split(":").map(Number);

  const fromTotal = fromHours * 60 + fromMinutes;
  const toTotal = toHours * 60 + toMinutes;

  if (fromTotal < toTotal) {
    return nowMinutes >= fromTotal && nowMinutes <= toTotal;
  } else {
    // Store is open overnight
    return nowMinutes >= fromTotal || nowMinutes <= toTotal;
  }
};
