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

const getFilterCount = () => {
  let amount = 0;
  return amount;
};

const getFilter = () => [
  {
    title: `all`,
    count: getFilterCount(),
  },
  {
    title: `overdue`,
    count: getFilterCount(),
  },
  {
    title: `today`,
    count: getFilterCount(),
  },
  {
    title: `favorites`,
    count: getFilterCount(),
  },
  {
    title: `repeating`,
    count: getFilterCount(),
  },
  {
    title: `tags`,
    count: getFilterCount(),
  },
  {
    title: `archive`,
    count: getFilterCount(),
  },
];

export {getTask, getFilter};
