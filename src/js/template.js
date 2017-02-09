export default class Template {
  constructor() {
    this.interpolate = /{{([\s\S]+?)}}/g;
    this.compiled = '';
  }

  compile(template, data) {
    this.compiled = template.replace(this.interpolate,
      (match, token) => data[token.trim()]
    );

    return this;
  }

  render(el) {
    if (el) {
      el.innerHTML = this.compiled;
    }
  }
}
