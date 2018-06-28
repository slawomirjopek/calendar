const parseClassName = (className) => {
  const reqexp = new RegExp(/\s/g);
  const trimmed = className.trim();
  const test = reqexp.test(trimmed);
  return test ? trimmed.replace(/\s+/g, ' ').split(' ') : trimmed;
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

    this.dom.container.classList.add(this.options.clasess.calendar);

    this.dom.header = document.createElement('div');
    this.dom.header.classList.add(this.options.clasess.header);

    this.dom.content = document.createElement('div');
    this.dom.content.classList.add(this.options.clasess.content);

    this.dom.button.next = document.createElement('div');
    this.dom.button.next.classList.add(...parseClassName(this.options.clasess.button.next));

    this.dom.button.prev = document.createElement('div');
    this.dom.button.prev.classList.add(...parseClassName(this.options.clasess.button.prev));
  }
}
