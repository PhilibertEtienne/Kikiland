
//Throttle for eventlisteners
export function throttle(cb, delay = 1000) {
  let shouldWait = false;
  let waitingArgs;
  const timeoutFunc = () => {
    if (waitingArgs == null) {
      shouldWait = false;
    } else {
      cb(...waitingArgs);
      waitingArgs = null;
      setTimeout(timeoutFunc, delay);
    }
  };

  return (...args) => {
    if (shouldWait) {
      waitingArgs = args;
      return;
    }

    cb(...args);
    shouldWait = true;
    setTimeout(timeoutFunc, delay);
  };
}

// Delete child for imageArray reset
export function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}


// CSS values selector and value getter
export let cssVariables = window.getComputedStyle(document.documentElement);

export function getCSSValue(value){
    return value = parseInt(
        cssVariables.getPropertyValue(`--${value}`)
      );
}