export const required = (value: string) => value.trim() !== '';

export const length = (config: { min?: number, max?: number }) => (value: any) => {
    let isValid = true;
    if (config.min) {
        isValid = isValid && value.trim().length >= config.min;
    }
    if (config.max) {
        isValid = isValid && value.trim().length <= config.max;
    }
    return isValid;
};

export const email = (value: string) =>
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(
        value
    );