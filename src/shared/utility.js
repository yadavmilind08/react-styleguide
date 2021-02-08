//This function will return string with "/"
export const onkeyDownDate = (event) => {
    let value = event.target.value;

    if (event.keyCode !== 8) {
        if (value.length === 2 || value.length === 5) {
            value += '/';
        }
    }
    return value;
}

//This function return empty string when passed invalid dates
export const onBlurDate = (date) => {
    const date_regex = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/;

    if (date_regex.test(date)) {
        return date;
    } else {
        return '';
    }
}

//This function return string with "-"
export const onkeyDownSSN = (event) => {
    let value = event.target.value;

    if (event.keyCode !== 8) {
        if (value.length === 3 || value.length === 6) {
            value += '-';
        }
    }
    return value;
}