export const validatePhone = (phone: string) => {
  const phonePattern =
    /^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\d{8}$/;
  return phonePattern.test(phone);
};

export const validateUsername = (username: string) => {
  const usernamePattern = /^[a-zA-Z0-9_-]{6,16}$/;
  return usernamePattern.test(username);
};

export const validatePassword = (password: string) => {
  const passwordPattern = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/;
  return passwordPattern.test(password);
};
