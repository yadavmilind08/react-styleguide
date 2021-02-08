export class EventKeys {
  static isDelete = (event) => {
    return event.keyCode === 46;
  };

  static isUp = (event) => {
    return event.keyCode === 38;
  };

  static isDown = (event) => {
    return event.keyCode === 40;
  };

  static isEscape = (event) => {
    return event.keyCode === 27;
  };

  static isEnter = (event) => {
    return event.keyCode === 13;
  };

  static isTab = (event) => {
    return event.keyCode === 9;
  };

  static isAltS = (event) => {
    return event.altKey && event.keyCode === 83;
  };

  static isAltB = (event) => {
    return event.altKey && event.keyCode === 66;
  };
}
