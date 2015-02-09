module.exports = {
  rules: {
    heading: /(#+)(.*)/,
    link: /\[([^\[]+)\]\(([^\)]+)\)/,
    bold: /(\*\*|__)(.*?)\1/,
    emphasis: /(\*|_)(.*?)\1/,
    list: /\n\*(.*)/,
    whitespace: /\s+/,
    other: /\S+/
  }
}
