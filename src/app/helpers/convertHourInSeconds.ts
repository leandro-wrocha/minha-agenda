export function convertHourInSeconds(hour: string) {
  let seconds = Number(
    hour.replace("h", "").replace("m", "").replace(" ", "").trim(),
  );

  return seconds;
}
