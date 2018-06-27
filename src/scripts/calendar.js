// eslint-disable-next-line no-unused-vars
class Calendar {
  constructor() {
    const {
      getDate,
      getMonth,
      getFullYear,
    } = new Date();

    this.date = {
      day: getDate,
      month: getMonth,
      year: getFullYear,
    };
  }
}
