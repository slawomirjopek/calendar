const addClasses = (el, classes) => {
  const temp = classes.trim().split(/\s*,\s*|\s+/);
  temp.forEach(className => el.classList.add(className));
};

// eslint-disable-next-line no-unused-vars
class Calendar {
  constructor(options) {
    if (!options.target || typeof options.target !== 'object') {
      throw new Error('Missing calendar container');
    }

    if (options.days && options.days.length !== 7) {
      throw new Error('Invalid days array');
    }

    const date = new Date();
    const defaultOptions = {
      clasess: {
        calendar: 'bw-calendar',
        header: 'bw-calendar__header',
        grid: {
          container: 'bw-calendar__grid',
          header: 'bw-calendar__grid-header',
          headerDay: 'bw-calendar__grid-header-day',
          currentMonth: 'bw-calendar__day--current-month',
          day: 'bw-calendar__day',
          dayContent: 'bw-calendar__day-content',
          currentDay: 'bw-calendar__day--current',
        },
        button: {
          next: 'bw-calendar__button bw-calendar__button--next',
          prev: 'bw-calendar__button bw-calendar__button--prev',
        },
      },
      days: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
      months: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ],
    };

    this.date = {
      day: date.getDate(),
      month: date.getMonth(),
      year: date.getFullYear(),
    };

    this.dom = {
      container: null,
      header: null,
      grid: null,
      button: {
        next: null,
        prev: null,
      },
    };

    this.options = Object.assign({}, defaultOptions, options);

    this.initialize();
  }

  initialize() {
    this.createElements();
    this.createGrid();
    this.render();
  }

  createElements() {
    this.dom.container = document.createElement('div');
    addClasses(this.dom.container, this.options.clasess.calendar);

    this.dom.header = document.createElement('div');
    const month = this.options.months[this.date.month];
    this.dom.header.innerHTML = `<span>${month} ${this.date.year}</span>`;
    addClasses(this.dom.header, this.options.clasess.header);

    this.dom.grid = document.createElement('div');
    addClasses(this.dom.grid, this.options.clasess.grid.container);

    this.dom.button.next = document.createElement('div');
    this.dom.button.next.innerHTML = '>';
    addClasses(this.dom.button.next, this.options.clasess.button.next);

    this.dom.button.prev = document.createElement('div');
    this.dom.button.prev.innerHTML = '<';
    addClasses(this.dom.button.prev, this.options.clasess.button.prev);

    this.dom.header.appendChild(this.dom.button.prev);
    this.dom.header.appendChild(this.dom.button.next);

    this.dom.container.appendChild(this.dom.header);
    this.dom.container.appendChild(this.dom.grid);
  }

  createMatrix() {
    // Number of days in Current Month
    const currentMonthDays = new Date(this.date.year, this.date.month + 1, 0).getDate();

    // First day of week the beginning of the month (0 - Sunday ... 6 - Saturday)
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
      let { month } = this.date;
      let current = true;

      if (i < matrixPrevMonthDays) {
        day = prevMonthDays - matrixPrevMonthDays + i + 1;
        month = this.date.month - 1;
        current = false;
      } else if (i >= prevAndCurrentDays) {
        day = i - currentMonthDays - (matrixDays - prevAndCurrentDays);
        month = this.date.month + 1;
        current = false;
      }

      matrix.push({
        day,
        month,
        current,
      });
    }

    return matrix;
  }

  createGrid() {
    const matrix = this.createMatrix();

    // Clear previous grid
    this.dom.grid.innerHTML = '';

    // Create grid header with day names
    const gridHeader = document.createElement('div');
    gridHeader.classList.add(this.options.clasess.grid.header);

    this.options.days.forEach((day) => {
      const gridHeaderDay = document.createElement('div');
      gridHeaderDay.classList.add(this.options.clasess.grid.headerDay);
      gridHeaderDay.innerHTML = day;
      gridHeader.appendChild(gridHeaderDay);
    });

    this.dom.grid.appendChild(gridHeader);

    matrix.forEach(({ day, month, current }) => {
      const gridDay = document.createElement('div');
      gridDay.classList.add(this.options.clasess.grid.day);
      gridDay.innerHTML = `<div class="${this.options.clasess.grid.dayContent}">${day}</div>`;

      // If current month
      if (current) {
        gridDay.classList.add(this.options.clasess.grid.currentMonth);
      }

      // If current day
      if (day === this.date.day && month === this.date.month) {
        gridDay.classList.add(this.options.clasess.grid.currentDay);
      }

      this.dom.grid.appendChild(gridDay);
    });
  }

  render() {
    this.options.target.appendChild(this.dom.container);
  }
}
