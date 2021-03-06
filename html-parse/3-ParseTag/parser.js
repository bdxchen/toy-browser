const EOF =Symbol('EOF')

function data (c) {
  if (c == '<') {
    return tagOpen
  } else if (c == EOF) {
    return
  } else {
    return data
  }
}

function tagOpen (c) {
  if (c == '/') {
    return endTagOpen
  } else if (c.match(/^[a-zA-Z$]/)) {
    return tagName(c)
  } else {
    return
  }
}

function endTagOpen (c) {
  if (c.match(/^[a-zA-Z$]/)) {
    currentToken = {
      type: 'endTag',
      tagName: ''
    }
    return tagName(c)
  } else if (c == '>') {

  } else if (c == EOF) {
    
  } else {

  }
}

function beforeAttributeName (c) {
  if (c.match(/^[\t\n\f ]$/)) {
    return beforeAttributeName
  } else if (c == '>') {
    return data
  } else if (c == '=') {
    return beforeAttributeName
  } else {
    return beforeAttributeName
  }
}

function selfClosingStartTag () {
  if (c == '>') {
    currentToken.isSelfClosing = true
    return data
  } else if (c == 'EOF') {

  } else {
    
  }
}

module.exports.parseHtml = function parseHtml (html) {
  let state = data
  for (let c of html) {
    state = state(c)
  }
  state = state(EOF)
}