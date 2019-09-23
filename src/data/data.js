const TOTAL_CARD_COUNT = 8;

const getTask = () => ({
  description: [
    `Изучить теорию`,
    `Сделать домашку`,
    `Пройти интенсив на соточку`,
  ][Math.floor(Math.random() * 3)],
  dueDate: Date.now() + 1 + Math.floor(Math.random() * 7) * 24 * 60 * 60 * 1000,
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
  isFavorite: Math.random() >= 0.5,
  isArchive: Math.random() >= 0.5,
  isDate: true,
});

const filterTitles = new Set([
  `All`,
  `Overdue`,
  `Today`,
  `Favorites`,
  `Repeating`,
  `Tags`,
  `Archive`
]);

const filterCount = (title, cards) => {
  let total;

  switch (title) {
    case `All`:
      total = cards.filter((element) => !element.isArchive);
      break;
    case `Overdue`:
      total = cards.filter((element) => element.dueDate < Date.now());
      break;
    case `Today`:
      total = cards.filter((element) => {
        const today = new Date().toDateString();
        return new Date(element.dueDate).toDateString() === today;
      });
      break;
    case `Favorites`:
      total = cards.filter((element) => element.isFavorite);
      break;
    case `Repeating`:
      total = cards.filter((element) => {
        const {repeatingDays} = element;
        return Object.keys(repeatingDays).some((day) => repeatingDays[day]);
      });
      break;
    case `Tags`:
      total = cards.filter((element) => Array.from(element.tags).length > 0);
      break;
    case `Archive`:
      total = cards.filter((element) => element.isArchive);
      break;
    default:
      total = [];
      break;
  }

  return total.length;
};

const getFilter = (element) => ({
  title: element,
  count: filterCount(element, allTasks)
});

const allTasks = new Array(TOTAL_CARD_COUNT).fill(``).map(getTask);

const filters = Array.from(filterTitles).map(getFilter);

export {getTask, filters, allTasks};
