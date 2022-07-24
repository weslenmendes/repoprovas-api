import { Request, Response, NextFunction } from 'express';

import userRepository from '../repositories/userRepository.js';

import * as jwtUtils from '../utils/jwtUtils.js';
import tokenSchema from '../schemas/tokenSchema.js';
import { generateError } from '../errors/errorGenerator.js';

async function tokenValidator(req: Request, res: Response, next: NextFunction) {
  const { error } = tokenSchema.validate(req.headers, {
    abortEarly: false,
  });

  if (error) {
    throw generateError({
      type: 'UnprocessableEntityError',
      message: error.details.map((detail) => detail.message).join(', '),
    });
  }

  const authorization = req.headers?.authorization;
  const token = authorization?.split(' ')[1];

  if (!token) {
    throw generateError({
      type: 'UnprocessableEntityError',
      message: 'No token provided.',
    });
  }

  const data = jwtUtils.validateToken(token);

  if (!data.userId) {
    throw generateError({
      type: 'UnprocessableEntityError',
      message: 'Invalid token.',
    });
  }

  const user = await userRepository.getUserById(+data.userId);

  if (!user) {
    throw generateError({
      type: 'NotFoundError',
      message: 'User not found.',
    });
  }

  res.locals.user = user;

  next();
}

export default tokenValidator;
