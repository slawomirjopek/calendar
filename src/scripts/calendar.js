const addClasses = (el, classes) => {
  const temp = classes.trim().split(/\s*,\s*|\s+/);
  temp.forEach(className => el.classList.add(className));
};

const TYPES = {
  EVENT: {
    CLICK: 'click',
  },
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
        header: {
          container: 'bw-calendar__header',
          date: 'bw-calendar__header-date',
        },
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
      grid: {
        day: null,
        month: date.getMonth(),
        year: date.getFullYear(),
      },
      selected: {
        day: date.getDate(),
        month: date.getMonth(),
        year: date.getFullYear(),
      },
    };

    this.dom = {
      container: null,
      header: {
        container: null,
        date: null,
      },
      grid: null,
      button: {
        next: null,
        prev: null,
      },
      currentDay: null,
    };

    this.options = Object.assign({}, defaultOptions, options);

    this.initialize();
  }

  initialize() {
    this.createElements();
    this.createGrid();
    this.attachEvents();
    this.render();
    this.onLoad();
  }

  createElements() {
    this.dom.container = document.createElement('div');
    addClasses(this.dom.container, this.options.clasess.calendar);

    this.dom.header.container = document.createElement('div');
    addClasses(this.dom.header.container, this.options.clasess.header.container);
    this.dom.header.date = document.createElement('span');
    this.dom.header.date.classList.add(this.options.clasess.header.date);
    this.updateHeader();

    this.dom.grid = document.createElement('div');
    addClasses(this.dom.grid, this.options.clasess.grid.container);

    this.dom.button.next = document.createElement('div');
    this.dom.button.next.innerHTML = '>';
    addClasses(this.dom.button.next, this.options.clasess.button.next);

    this.dom.button.prev = document.createElement('div');
    this.dom.button.prev.innerHTML = '<';
    addClasses(this.dom.button.prev, this.options.clasess.button.prev);

    this.dom.header.container.appendChild(this.dom.header.date);
    this.dom.header.container.appendChild(this.dom.button.prev);
    this.dom.header.container.appendChild(this.dom.button.next);

    this.dom.container.appendChild(this.dom.header.container);
    this.dom.container.appendChild(this.dom.grid);
  }

  createMatrix() {
    // Number of days in Current Month
    const currentMonthDays = new Date(this.date.grid.year, this.date.grid.month + 1, 0).getDate();

    // First day of week the beginning of the month (0 - Sunday ... 6 - Saturday)
    let firstDay = new Date(this.date.grid.year, this.date.grid.month).getDay();
    const prevMonthDays = new Date(this.date.grid.year, this.date.grid.month, 0).getDate();

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
      let { month, year } = this.date.grid;
      let current = true;

      // If outside current month
      // before
      if (i < matrixPrevMonthDays) {
        day = prevMonthDays - matrixPrevMonthDays + i + 1;
        month = month === 0 ? 11 : this.date.grid.month - 1;
        year = month === 11 ? year - 1 : year;
        current = false;
      // after
      } else if (i >= prevAndCurrentDays) {
        day = i + 1 - matrixPrevMonthDays - currentMonthDays;
        month = month === 11 ? 0 : this.date.grid.month + 1;
        year = month === 0 ? year + 1 : year;
        current = false;
      }

      matrix.push({
        day,
        month,
        year,
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

    matrix.forEach(({
      day, month, year, current,
    }) => {
      const gridDay = document.createElement('div');
      const gridDayContent = document.createElement('div');

      gridDayContent.classList.add(this.options.clasess.grid.dayContent);
      gridDayContent.dataset.day = day;
      gridDayContent.dataset.month = month;
      gridDayContent.dataset.year = year;
      gridDayContent.innerHTML = day;

      gridDay.classList.add(this.options.clasess.grid.day);
      gridDay.appendChild(gridDayContent);

      // If current month
      if (current) {
        gridDay.classList.add(this.options.clasess.grid.currentMonth);
      }

      // If current day
      if (
        day === this.date.selected.day
        && month === this.date.selected.month
        && year === this.date.selected.year
      ) {
        this.setCurrentDayElement(gridDay);
      }

      this.dom.grid.appendChild(gridDay);
    });
  }

  updateHeader() {
    const month = this.options.months[this.date.grid.month];
    this.dom.header.date.innerHTML = `<span>${month} ${this.date.grid.year}</span>`;
  }

  setCurrentDayElement(element) {
    const { currentDay } = this.options.clasess.grid;

    if (this.dom.currentDay) {
      this.dom.currentDay.classList.remove(currentDay);
    }

    this.dom.currentDay = element;
    this.dom.currentDay.classList.add(currentDay);
  }

  onLoad() {
    const { onLoad } = this.options;

    console.log('%c# BlueWolf Calendar loaded! #', 'color: blue');

    if (onLoad && typeof onLoad === 'function') {
      onLoad(this);
    }
  }

  onSelect(cb, e) {
    e.stopPropagation();

    // Only day content (excluding day names)
    if (e.target && e.target.classList.contains(this.options.clasess.grid.dayContent)) {
      // Update selected date
      const {
        day,
        month,
        year,
      } = e.target.dataset;

      // @TODO year
      this.date.selected = {
        day: parseInt(day, 10),
        month: parseInt(month, 10),
        year: parseInt(year, 10),
      };

      // Add/remove selected class
      this.setCurrentDayElement(e.target.parentNode);

      // Execute user callback
      if (cb && typeof cb === 'function') {
        cb(this);
      }
    }
  }

  prev(cb) {
    if (this.date.grid.month !== 0) {
      this.date.grid.month = this.date.grid.month - 1;
    } else {
      this.date.grid.month = 11;
      this.date.grid.year = this.date.grid.year - 1;
    }

    this.updateHeader();
    this.createGrid();

    if (cb && typeof cb === 'function') {
      cb(this);
    }
  }

  next(cb) {
    if (this.date.grid.month !== 11) {
      this.date.grid.month = this.date.grid.month + 1;
    } else {
      this.date.grid.month = 0;
      this.date.grid.year = this.date.grid.year + 1;
    }

    this.updateHeader();
    this.createGrid();

    if (cb && typeof cb === 'function') {
      cb(this);
    }
  }

  attachEvents() {
    this.dom.button.prev.addEventListener(
      TYPES.EVENT.CLICK,
      this.prev.bind(this, this.options.onGridChange),
    );
    this.dom.button.next.addEventListener(
      TYPES.EVENT.CLICK,
      this.next.bind(this, this.options.onGridChange),
    );
    // Event delegation
    this.dom.grid.addEventListener(
      TYPES.EVENT.CLICK,
      this.onSelect.bind(this, this.options.onSelect),
    );
  }

  render() {
    this.options.target.appendChild(this.dom.container);
  }
}
