import supertest from 'supertest';

import app from '../../src/app.js';

interface ICreadentials {
  email: string;
  password: string;
  confirmPassword?: string;
}

export async function signUp(credentials: ICreadentials) {
  return supertest(app).post('/sign-up').send(credentials);
}

export async function signIn(credentials: ICreadentials) {
  const response = await supertest(app).post('/sign-in').send(credentials);

  return response.body.token;
}
