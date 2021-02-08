export const disableBackspaceBrowserBack = () => {
  document.onkeydown = function (event) {
    if (!event) {
      /* This will happen in IE */
      event = window.event;
    }

    const element = event.target || event.srcElement;

    const isBackspace = () => {
      return event.keyCode == 8;
    };

    const isDatePicker = () => {
      return (
        event.target.parentElement &&
        event.target.parentElement.classList &&
        event.target.parentElement.classList.value == "ant-picker-input"
      );
    };

    const isTextarea = () => {
      return element.tagName == "TEXTAREA";
    };

    const isInput = () => {
      return element.tagName == "INPUT";
    };

    const stopPropagation = () => {
      if (navigator.userAgent.toLowerCase().indexOf("msie") == -1) {
        event.stopPropagation();
      } else {
        alert("prevented");
        event.returnValue = false;
      }

      return false;
    };

    if (isBackspace()) {
      if (isDatePicker() && !event.target.value) {
        return stopPropagation();
      }

      if (!isTextarea() && !isInput()) {
        return stopPropagation();
      }
    }
  };
};
