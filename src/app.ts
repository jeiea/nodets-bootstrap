import { promises as fs } from "fs";
import * as rp from "request-promise-native";

function padZero(str: any, len: number): string {
  str = String(str);
  const pad = len - str.length;
  return pad > 0 ? "0".repeat(pad) + str : str;
}

function toExcelDateTime(now: Date): string {
  const year = padZero(now.getFullYear(), 4);
  const month = padZero(now.getMonth() + 1, 2);
  const day = padZero(now.getDate(), 2);
  const hour = padZero(now.getHours(), 2);
  const minute = padZero(now.getMinutes(), 2);
  const second = padZero(now.getSeconds(), 2);
  const date = `${year}-${month}-${day}`;
  const time = `${hour}:${minute}:${second}`;
  const row = `${date} ${time}`;
  return row;
}

function formatRow(span: string): string {
  const counter = span[1].replace(",", "");
  const n = Number.parseInt(counter, 10);
  const row = `${toExcelDateTime(new Date())},${n}\n`;
  return row;
}

async function main(): Promise<void> {
  const html = await rp.get("https://www1.president.go.kr/petitions/579682");
  const span = html.match(/<span class="counter">([\d,]+)<\/span>/);
  if (!span) {
    return;
  }
  await fs.appendFile("data.csv", formatRow(span));
}

if (require.main === module) {
  main();
}
