export class AppLogger {
  ///================================================================== Default log
  private static defaultLog(object: any) {
    console.log(object);
  }

  ///================================================================== log
  static log(object: any) {
    this.defaultLog(object);
  }

  ///================================================================== log Color
  static logColor(object: any, color: string = 'green') {
    console.log(this.getColor(color), object, '\x1b[0m');
  }

  ///================================================================== log Color (Json)
  // static logJsonColor(object: any, color: string = 'green') {
  //   console.log(
  //     this.getColor(color),
  //     JSON.stringify(object, null, 5),
  //     '\x1b[0m',
  //   );
  // }

  ///================================================================== log Divider
  static logDivider(object: any) {
    const divider =
      '\x1B[35m════════════════════════════════════════════════════════════════════════════════════════════════';
    this.defaultLog(divider);
    this.defaultLog('\n');
    this.defaultLog(object);
    this.defaultLog('\n');
    this.defaultLog(divider);
  }

  ///================================================================== Default log
  private static getColor(color: string): string {
    const colorsMap = new Map<string, string>([
      // ----------------------- Text colors
      ['reset', '\x1B[0m'],
      ['black', '\x1B[30m'],
      ['red', '\x1B[31m'],
      ['green', '\x1B[32m'],
      ['yellow', '\x1B[33m'],
      ['blue', '\x1B[34m'],
      ['magenta', '\x1B[35m'],
      ['cyan', '\x1B[36m'],
      ['white', '\x1B[37m'],
      // ----------------------- Background colors
      ['back1', '\x1B[40m'],
      ['back2', '\x1B[41m'],
      ['back3', '\x1B[42m'],
      ['back4', '\x1B[43m'],
      ['back5', '\x1B[44m'],
      ['back6', '\x1B[45m'],
      ['back7', '\x1B[46m'],
      ['back8', '\x1B[47m'],
    ]);
    return colorsMap.get(color);
  }
}
