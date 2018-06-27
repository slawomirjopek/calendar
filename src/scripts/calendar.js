// eslint-disable-next-line no-unused-vars
class Calendar {
  constructor(options) {
    const {
      getDate,
      getMonth,
      getFullYear,
    } = new Date();

    const defaultOptions = {};

    this.date = {
      day: getDate,
      month: getMonth,
      year: getFullYear,
    };

    this.dom = {
      container: null,
      header: null,
      content: null,
      button: {
        next: null,
        prev: null,
      },
    };

    this.options = Object.assign({}, defaultOptions, options);

    this.initialize();
  }

  initialize() {
    console.log(this);
  }
}

// eslint-disable-next-line no-undef
window.bwCalendar = new Calendar();
