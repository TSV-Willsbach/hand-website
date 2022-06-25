import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: "convert2GameTime" })
export class ConvertGameTimePipe implements PipeTransform {
  transform(value: number): String {
    let min = value / 60;
    let seconds: string;
    let minute: string;

    const sec = value % 60;
    if (sec === 0) {
      seconds = "00";
    } else {
      seconds = `${sec}`;
    }
    min = Math.floor(min);
    if (min === 0) {
      minute = "00";
    } else {
      minute = `${min}`;
    }
    minute.replace(/\s/g, "");
    seconds.replace(/\s/g, "");
    if (seconds.length === 1) {
      seconds = `0${seconds}`;
    }
    if (minute.length === 1) {
      minute = `0${minute}`;
    }
    return `${minute}:${seconds}`;
  }
}
