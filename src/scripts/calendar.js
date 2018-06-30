const addClasses = (el, classes) => {
  const temp = classes.trim().split(/\s*,\s*|\s+/);
  temp.forEach(className => el.classList.add(className));
};

// eslint-disable-next-line no-unused-vars
class Calendar {
  constructor(options) {
    const date = new Date();
    const defaultOptions = {
      clasess: {
        calendar: 'bw-calendar-container',
        header: 'bw-calendar-header',
        content: 'bw-calendar-content',
        button: {
          next: 'bw-calendar-button bw-calendar-button-next',
          prev: 'bw-calendar-button bw-calendar-button-prev',
        },
      },
    };

    this.date = {
      day: date.getDate(),
      month: date.getMonth(),
      year: date.getFullYear(),
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
    this.createElements();
  }

  createElements() {
    this.dom.container = document.createElement('div');
    addClasses(this.dom.container, this.options.clasess.calendar);

    this.dom.header = document.createElement('div');
    addClasses(this.dom.header, this.options.clasess.header);

    this.dom.content = document.createElement('div');
    addClasses(this.dom.content, this.options.clasess.content);

    this.dom.button.next = document.createElement('div');
    addClasses(this.dom.button.next, this.options.clasess.button.next);

    this.dom.button.prev = document.createElement('div');
    addClasses(this.dom.button.prev, this.options.clasess.button.prev);

    this.createGrid();
  }

  createGrid() {
    const currentMonthDays = new Date(this.date.year, this.date.month + 1, 0).getDate();
    let firstDay = new Date(this.date.year, this.date.month).getDay();
    const prevMonthDays = new Date(this.date.year, this.date.month, 0).getDate();

    // English calendar first day is Sunday, but in Poland its Monday :)
    if (!firstDay) {
      firstDay = 7;
    }

    const matrix = [];
    const matrixPrevMonthDays = firstDay - 1;
    const prevAndCurrentDays = matrixPrevMonthDays + currentMonthDays;
    const matrixNextMonthDays = Math.ceil(prevAndCurrentDays / 7) * 7 - prevAndCurrentDays;
    const matrixDays = prevAndCurrentDays + matrixNextMonthDays;

    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < matrixDays; i++) {
      let day = i - matrixPrevMonthDays + 1;
      let current = true;

      if (i < matrixPrevMonthDays) {
        day = prevMonthDays; // TODO
        current = false;
      } else if (i >= prevAndCurrentDays) {
        day = matrixDays - i;
        current = false;
      }

      matrix.push({
        day,
        current,
      });
    }

    console.log(matrix);
  }
}
