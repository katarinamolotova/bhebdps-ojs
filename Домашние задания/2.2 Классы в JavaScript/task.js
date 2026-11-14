class PrintEditionItem {
  constructor(name, releaseDate, pagesCount) {
    this.name = name;
    this.releaseDate = releaseDate;
    this.pagesCount = pagesCount;
    this.state = 100;
    this.type = null;
  }

  set state(value) {
    this._state = Math.min(100, Math.max(0, value));
  }

  get state() {
    return this._state;
  }

  fix() {
    this.state *= 1.5;
  }
}

class Magazine extends PrintEditionItem {
  constructor(name, releaseDate, pagesCount) {
    super(name, releaseDate, pagesCount);
    this.type = 'magazine';
  }
}

class Book extends PrintEditionItem {
  constructor(author, name, releaseDate, pagesCount) {
    super(name, releaseDate, pagesCount);
    this.author = author;
    this.type = 'book';
  }
}

class NovelBook extends Book {
  constructor(author, name, releaseDate, pagesCount) {
    super(author, name, releaseDate, pagesCount);
    this.type = 'novel';
  }
}

class FantasticBook extends Book {
  constructor(author, name, releaseDate, pagesCount) {
    super(author, name, releaseDate, pagesCount);
    this.type = 'fantastic';
  }
}

class DetectiveBook extends Book {
  constructor(author, name, releaseDate, pagesCount) {
    super(author, name, releaseDate, pagesCount);
    this.type = 'detective';
  }
}

class Library {
  constructor(name) {
    this.name = name;
    this.books = [];
  }

  addBook(book) {
    if (book.state > 30) {
      this.books.push(book);
    }
  }

  findBookBy(type, value) {
    return this.books.find((book) => book[type] === value) || null;
  }

  giveBookByName(bookName) {
    const index = this.books.findIndex((book) => book.name === bookName);
    if (index === -1) {
      return null;
    }

    return this.books.splice(index, 1)[0];
  }
}

class Student {
  constructor(name) {
    this.name = name;
    this.marks = {};
  }

  addMark(mark, subject) {
    if (!Number.isInteger(mark) || mark < 2 || mark > 5) {
      return;
    }

    if (!Object.prototype.hasOwnProperty.call(this.marks, subject)) {
      this.marks = { ...this.marks, [subject]: [] };
    }

    this.marks[subject].push(mark);
  }

  getAverageBySubject(subject) {
    if (!Object.prototype.hasOwnProperty.call(this.marks, subject)) {
      return 0;
    }

    const marks = this.marks[subject];
    const sum = marks.reduce((total, mark) => total + mark, 0);
    return sum / marks.length;
  }

  getAverage() {
    const subjects = Object.keys(this.marks);
    if (subjects.length === 0) {
      return 0;
    }

    const sum = subjects.reduce((total, subject) => {
      return total + this.getAverageBySubject(subject);
    }, 0);
    return sum / subjects.length;
  }
}

// Сценарий выдачи, восстановления и возврата книги из задания №2.
{
  const library = new Library('Районная библиотека');
  library.addBook(new NovelBook('Герман Гессе', 'Демиан', 1919, 176));
  library.addBook(new FantasticBook('Аркадий и Борис Стругацкие', 'Пикник на обочине', 1972, 168));
  library.addBook(new Magazine('Мурзилка', 1924, 60));

  const bookFrom1919 = library.findBookBy('releaseDate', 1919);
  console.log('Книга 1919 года:', bookFrom1919.name);

  const borrowedBook = library.giveBookByName(bookFrom1919.name);
  borrowedBook.state = 25;
  console.log('Состояние повреждённой книги:', borrowedBook.state);

  borrowedBook.fix();
  console.log('Состояние восстановленной книги:', borrowedBook.state);

  library.addBook(borrowedBook);
  console.log('Книга возвращена в библиотеку:', library.books.includes(borrowedBook));
}
