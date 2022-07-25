import { faker } from '@faker-js/faker';

export const newTest = () => ({
  name: 'Teste sobre Inteligência Emocional..',
  pdfUrl: 'http://tijucas.sc.gov.br/conteudo/noticias/4374/a-sutil-arte-de-ligar-o-foda-se-mark-manson.pdf',
  category: 'Projeto',
  discipline: '3',
  teacher: '1',
});

export const newTestWithInvalidName = () => ({
  name: '',
  pdfUrl: faker.image.animals(),
  category: 'Projeto',
  discipline: '3',
  teacher: '1',
});
