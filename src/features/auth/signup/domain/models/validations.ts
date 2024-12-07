export const passwordValidationRules = [
    {
      required: true,
      message: 'Please input your password!',
    },
    {
      min: 6,
      message: 'Password must be at least 6 characters long!',
    },
    {
      pattern: /[A-Z]/,
      message: 'Password must contain at least one uppercase letter!',
    },
    {
      pattern: /[!@#$%^&*(),.?":{}|<>]/,
      message: 'Password must contain at least one special character!',
    },
  ];