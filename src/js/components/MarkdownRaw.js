import React from 'react'


export default class MarkdownRaw extends React.Component {
  constructor() {
    super();
    this.init();
  }
  init() {
    this.state = {
      value:
      `# Structured documents\nSometimes it's useful to have different levels of headings to structure your documents.\n### This is a third-tier heading\n\nIt's very easy to make some words **bold** and other words *italic* with Markdown. You can even [link to Google!](http://google.com)\n\nSometimes you want numbered lists:\n1. One\n2. Two\n3. Three\nSometimes you want bullet points:\n\n* Start a line with a star\n* Profit!\nAlternatively,\n- Dashes work just as well\n- And if you have sub points, put two spaces before the dash or star:\n  - Like this\n  - And this\n\nIf you have inline code blocks, wrap them in backticks: \`var example = true\`.`
    };
  }
  rawMarkup() {
    let mark = new Remarkable();
    let rawMarkup = mark.render(this.state.value.toString());
    return { __html: rawMarkup };
  }
  handleChange(e) {
    this.setState({value: e.target.value});
  }
  render() {
    return (
      <div className='markup'>
        <textarea
        type='text'
        value={ this.state.value }
        onChange={ this.handleChange.bind(this) }
        />
        <div className='processed'>
          <span dangerouslySetInnerHTML={this.rawMarkup()} />
        </div>
      </div>

    )
  }
}
