import Joi from 'joi';

import { regex } from '../utils/constantsUtils.js';
import { ISchema } from '../interfaces/schemaInterface.js';

const messages = {
  email: 'Email is required.',
  emailPattern: 'This email is not valid.',
  password: 'Password is required.',
  passwordPattern:
    'The password must be at least 6 to 30 characters long, and may contain only lowercase letters, uppercase letters and numbers.',
  passwordConfirmation: 'The password confirmation must be the same as the password.',
  passwordConfirmationRequired: 'The password confirmation is required.',
};

export const signUpSchema: ISchema = {
  schema: Joi.object().keys({
    email: Joi.string().email().pattern(regex.EMAIL).required().messages({
      'string.notEmpty': messages.email,
      'string.email': messages.emailPattern,
      'string.pattern.base': messages.emailPattern,
    }),
    password: Joi.string().pattern(regex.PASSWORD).required().messages({
      'string.notEmpty': messages.password,
      'string.pattern.base': messages.passwordPattern,
    }),
    confirmPassword: Joi.string().valid(Joi.ref('password')).required().messages({
      'any.only': messages.passwordConfirmation,
      'any.required': messages.passwordConfirmationRequired,
    }),
  }),
  local: 'body',
};

export const signInSchema: ISchema = {
  schema: Joi.object().keys({
    email: Joi.string().email().pattern(regex.EMAIL).required().messages({
      'string.notEmpty': messages.email,
      'string.email': messages.emailPattern,
      'string.pattern.base': messages.emailPattern,
    }),
    password: Joi.string().pattern(regex.PASSWORD).required().messages({
      'string.notEmpty': messages.password,
      'string.pattern.base': messages.passwordPattern,
    }),
  }),
  local: 'body',
};
