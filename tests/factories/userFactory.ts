import { faker } from '@faker-js/faker';

const MIN_PASSWORD_LENGTH = 8;

export const newUser = () => {
  const EMAIL = faker.internet.email();
  const PASSWORD = faker.internet.password(MIN_PASSWORD_LENGTH);

  return {
    email: EMAIL,
    password: PASSWORD,
    confirmPassword: PASSWORD,
  };
};

export const newUserWithInvalidPassword = () => {
  const EMAIL = faker.internet.email();
  const PASSWORD = faker.internet.password(MIN_PASSWORD_LENGTH - 1);

  return {
    email: EMAIL,
    password: PASSWORD,
    confirmPassword: PASSWORD,
  };
};

export const newUserWithInvalidEmail = () => {
  const EMAIL = faker.internet.email().replace(/@/g, '');
  const PASSWORD = faker.internet.password(MIN_PASSWORD_LENGTH);

  return {
    email: EMAIL,
    password: PASSWORD,
    confirmPassword: PASSWORD,
  };
};

export const newUserWithInvalidConfirmPassword = () => {
  const EMAIL = faker.internet.email();
  const PASSWORD = faker.internet.password(MIN_PASSWORD_LENGTH);
  const CONFIRM_PASSWORD = faker.internet.password(MIN_PASSWORD_LENGTH - 1);

  return {
    email: EMAIL,
    password: PASSWORD,
    confirmPassword: CONFIRM_PASSWORD,
  };
};

export const newUserWithEmptyEmail = () => {
  const EMAIL = '';
  const PASSWORD = faker.internet.password(MIN_PASSWORD_LENGTH);

  return {
    email: EMAIL,
    password: PASSWORD,
    confirmPassword: PASSWORD,
  };
};

export const newUserWithEmptyPassword = () => {
  const EMAIL = faker.internet.email();
  const PASSWORD = '';

  return {
    email: EMAIL,
    password: PASSWORD,
    confirmPassword: PASSWORD,
  };
};

export const newUserWithoutCredentials = () => ({});

export const userWithIncorrectPassword = (correctEmail: string) => ({
  email: correctEmail,
  password: faker.internet.password(MIN_PASSWORD_LENGTH),
});

export const userWithEmailDoesNotExist = () => ({
  email: 'umusuariocomemaildesses@gmail.com',
  password: faker.internet.password(MIN_PASSWORD_LENGTH),
});
