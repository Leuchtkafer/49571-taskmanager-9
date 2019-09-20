const getTask = () => ({
  description: [
    `Изучить теорию`,
    `Сделать домашку`,
    `Пройти интенсив на соточку`,
  ][Math.floor(Math.random() * 3)],
  dueDate: Date.now(),
  repeatingDays: {
    'mo': true,
    'tu': false,
    'we': Boolean(Math.round(Math.random())),
    'th': true,
    'fr': true,
    'sa': false,
    'su': false,
  },
  tags: new Set([
    `homework`,
    `theory`,
    `practice`,
    `intensive`,
    `keks`,
  ]),
  color: [
    `black`,
    `yellow`,
    `blue`,
    `green`,
    `pink`][Math.floor(Math.random() * 5)],
  colors: [
    `black`,
    `yellow`,
    `blue`,
    `green`,
    `pink`],
  isFavorite: Boolean(Math.round(Math.random())),
  isArchive: Boolean(Math.round(Math.random())),
  isDate: true,
});

const filters = [
  {
    title: `all`,
    count: 0,
  },
  {
    title: `overdue`,
    count: 0,
  },
  {
    title: `today`,
    count: 0,
  },
  {
    title: `favorites`,
    count: 0,
  },
  {
    title: `repeating`,
    count: 0,
  },
  {
    title: `tags`,
    count: 0,
  },
  {
    title: `archive`,
    count: 5,
  },
];

export {getTask, filters};
