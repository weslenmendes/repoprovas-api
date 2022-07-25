import Joi from 'joi';

import { ISchema } from '../interfaces/schemaInterface.js';
import { regex } from '../utils/constantsUtils.js';

export const testSchema: ISchema = {
  schema: Joi.object().keys({
    name: Joi.string().min(3).pattern(regex.NAME).required().messages({
      'string.empty': '"name" is required.',
      'string.required': '"name" is required.',
      'string.min': '"name" must be at least 3 characters.',
      'string.pattern.base': '"name" must be a valid name with letters, accents and numbers.',
    }),
    pdfUrl: Joi.string().uri().required().messages({
      'string.empty': '"pdfUrl" is required.',
      'string.required': '"pdfUrl" is required.',
    }),
    category: Joi.string().required().messages({
      'string.empty': '"category" is required.',
      'string.required': '"category" is required.',
    }),
    discipline: Joi.string().required().messages({
      'string.empty': '"discipline" is required.',
      'string.required': '"discipline" is required.',
    }),
    teacher: Joi.string().required().messages({
      'string.empty': '"teacher" is required.',
      'string.required': '"teacher" is required.',
    }),
  }),
  local: 'body',
};

export const testQuerySchema: ISchema = {
  schema: Joi.object().keys({
    orderBy: Joi.string().valid('discipline', 'teacher').required().messages({
      'string.empty': '"orderBy" is required.',
      'string.required': '"orderBy" is required.',
      'string.valid': '"orderBy" must be "discipline" or "teacher".',
    }),
  }),
  local: 'query',
};
