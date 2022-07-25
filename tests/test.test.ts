import supertest from 'supertest';

import app from '../src/app.js';
import prisma from '../src/config/database.js';
import * as testFactory from './factories/testFactory.js';
import * as userFactory from './factories/userFactory.js';
import { signUp, signIn } from './utils/authUtils.js';

const userDefault = userFactory.newUserDefault();
let TOKEN = null;

beforeAll(async () => {
  await prisma.$connect();
  await prisma.$executeRaw`TRUNCATE TABLE tests;`;

  await signUp(userDefault);
});

describe('POST tests/create', () => {
  it('should be able to create a new test', async () => {
    delete userDefault.confirmPassword;

    TOKEN = await signIn(userDefault);

    const test = testFactory.newTest();

    const response = await supertest(app).post('/tests/create').send(test).set('Authorization', `Bearer ${TOKEN}`);

    const testExistsInDB = await prisma.test.findFirst({ where: { name: test.name } });

    expect(response.status).toBe(201);
    expect(testExistsInDB).not.toBeNull();
  });

  it('should not be able to create a new test with invalid data', async () => {
    const test = testFactory.newTestWithInvalidName();

    const response = await supertest(app).post('/tests/create').send(test).set('Authorization', `Bearer ${TOKEN}`);

    const testExistsInDB = await prisma.test.findFirst({ where: { name: test.name } });

    expect(response.status).toBe(422);
    expect(testExistsInDB).toBeNull();
  });

  it('should not be able to create a new test without token', async () => {
    const test = testFactory.newTest();

    const response = await supertest(app).post('/tests/create').send(test).set('Authorization', '');

    expect(response.status).toBe(422);
  });

  it('should not be able to create a new test without body', async () => {
    const response = await supertest(app).post('/tests/create').set('Authorization', `Bearer ${TOKEN}`);

    expect(response.status).toBe(422);
  });

  it('should not be able to create a new test with invalid name', async () => {
    const test = testFactory.newTestWithInvalidName();

    const response = await supertest(app).post('/tests/create').send(test).set('Authorization', `Bearer ${TOKEN}`);

    expect(response.status).toBe(422);
  });
});

describe('GET /test/view', () => {
  it('should be able to view all tests by discipline', async () => {
    const response = await supertest(app).get('/tests/view?orderBy=discipline').set('Authorization', `Bearer ${TOKEN}`);

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBe(6);
  });

  it('should be able to view all tests by teacher', async () => {
    const response = await supertest(app).get('/tests/view?orderBy=teacher').set('Authorization', `Bearer ${TOKEN}`);

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBe(6);
  });

  it('should not be able to view all tests by discipline without no token', async () => {
    const response = await supertest(app).get('/tests/view?orderBy=discipline').set('Authorization', '');

    expect(response.status).toBe(422);
  });

  it('should not be able to view all tests by teacher without no token', async () => {
    const response = await supertest(app).get('/tests/view?orderBy=teacher').set('Authorization', '');

    expect(response.status).toBe(422);
  });

  it('should not be able to view all tests by another key', async () => {
    const response = await supertest(app).get('/tests/view?orderBy=term').set('Authorization', `Bearer ${TOKEN}`);

    expect(response.status).toBe(422);
  });
});

afterAll(async () => {
  await prisma.$disconnect();
});
