import supertest from 'supertest';

import app from '../src/app.js';
import prisma from '../src/config/database.js';
import * as userFactory from './factories/userFactory.js';

beforeAll(async () => {
  await prisma.$connect();
  await prisma.$executeRaw`TRUNCATE TABLE users;`;
});

const user = userFactory.newUser();

describe('POST /sign-up', () => {
  it('should be able to sign up a new user', async () => {
    const response = await supertest(app).post('/sign-up').send(user);

    const userExistsInDB = await prisma.user.findUnique({ where: { email: user.email } });

    expect(response.status).toBe(201);
    expect(userExistsInDB).not.toBeNull();
  });

  it('should not be able to sign up a new user with an email existing', async () => {
    const response = await supertest(app).post('/sign-up').send(user);

    expect(response.status).toBe(400);
  });

  it('should not be able to sign up a new user with an invalid email', async () => {
    const userInvalid = userFactory.newUserWithInvalidEmail();

    const response = await supertest(app).post('/sign-up').send(userInvalid);

    const userExistsInDB = await prisma.user.findUnique({ where: { email: userInvalid.email } });

    expect(response.status).toBe(422);
    expect(userExistsInDB).toBeNull();
  });

  it('should not be able to sign up a new user with an invalid password', async () => {
    const userInvalid = userFactory.newUserWithInvalidPassword();

    const response = await supertest(app).post('/sign-up').send(userInvalid);

    const userExistsInDB = await prisma.user.findUnique({ where: { email: userInvalid.email } });

    expect(response.status).toBe(422);
    expect(userExistsInDB).toBeNull();
  });

  it('should not be able to sign up a new user with an invalid confirm password', async () => {
    const userInvalid = userFactory.newUserWithInvalidConfirmPassword();

    const response = await supertest(app).post('/sign-up').send(userInvalid);

    const userExistsInDB = await prisma.user.findUnique({ where: { email: userInvalid.email } });

    expect(response.status).toBe(422);
    expect(userExistsInDB).toBeNull();
  });

  it('should not be able to sign up a new user without credentials', async () => {
    const userInvalid = userFactory.newUserWithoutCredentials();

    const response = await supertest(app).post('/sign-up').send(userInvalid);

    expect(response.status).toBe(422);
  });
});

describe('POST /sign-in', () => {
  it('should be able to sign in a user', async () => {
    delete user.confirmPassword;

    const response = await supertest(app).post('/sign-in').send(user);

    expect(response.status).toBe(200);
    expect(response.body.token).not.toBeNull();
  });

  it('should not be able to sign in a user with an invalid email', async () => {
    const userInvalid = userFactory.newUserWithInvalidEmail();

    const response = await supertest(app).post('/sign-in').send(userInvalid);

    expect(response.status).toBe(422);
  });

  it('should not be able to sign in a user with an invalid password', async () => {
    const userInvalid = userFactory.newUserWithInvalidPassword();

    const response = await supertest(app).post('/sign-in').send(userInvalid);

    expect(response.status).toBe(422);
  });

  it('should not be able to sign in a user with incorrect password', async () => {
    const userInvalid = userFactory.userWithIncorrectPassword(user.email);

    const response = await supertest(app).post('/sign-in').send(userInvalid);

    expect(response.status).toBe(422);
  });

  it('should not be able to sign in a user with email does not exist', async () => {
    const userInvalid = userFactory.userWithEmailDoesNotExist();

    const response = await supertest(app).post('/sign-in').send(userInvalid);

    expect(response.status).toBe(404);
  });
});

afterAll(async () => {
  await prisma.$disconnect();
});
