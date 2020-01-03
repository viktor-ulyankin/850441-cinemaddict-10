export default class Comments {
  constructor(data) {
    this.id = data[`id`];
    this.author = data[`author`] || ``;
    this.emotion = data[`emotion`] || null;
    this.comment = data[`comment`] || ``;
    this.date = data[`date`] ? new Date(data[`date`]) : null;
  }

  toRAW() {
    return {
      'id': this.id,
      'author': this.author,
      'emotion': this.emotion,
      'comment': this.comment,
      'date': this.date ? this.date.toISOString() : null,
    };
  }

  static parseComment(data) {
    return new Comments(data);
  }

  static parseComments(data) {
    return data.map(Comments.parseComment);
  }
}
