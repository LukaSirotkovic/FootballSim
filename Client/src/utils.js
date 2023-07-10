export const addErrorIntoField = (errors) => errors ? { error: true } : { error: false };
export const pawdRegExp = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/;