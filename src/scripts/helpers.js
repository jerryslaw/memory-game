export const parseTimeToHumanValues = time => {
    let minutes = time.getMinutes();
    let seconds = time.getSeconds();

    minutes = minutes.toString().length < 2 ? `0${minutes}` : minutes;
    seconds = seconds.toString().length < 2 ? `0${seconds}` : seconds;

    return `${minutes}:${seconds}`;
};

export const dispatchEvent = eventName => document.body.dispatchEvent(new Event(eventName));