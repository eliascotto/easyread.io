// https://www.the-art-of-web.com/javascript/search-highlight/

class Highlight {
  constructor(element=document.body, className='mark', tag='SPAN') {
    this.targetNode = element;
    this.className = className;
    this.tag = tag || 'SPAN';
    this.skipTags = new RegExp('^(?:' + this.tag + '|SCRIPT|FORM|SPAN)$');
    this.matchRegExp = '';
    this.openLeft = false;
    this.openRight = false;

    // characters to strip from start and end of the input string
    this.endRegExp = new RegExp('^[^\\w]+|[^\\w]+$', 'g');

    // characters used to break up the input string into words
    this.breakRegExp = new RegExp('[^\\w\'-]+', 'g');
  }
  

  setEndRegExp(regex) {
    this.endRegExp = regex;
    return this.endRegExp;
  }

  setBreakRegExp(regex) {
    this.breakRegExp = regex;
    return this.breakRegExp;
  }

  setMatchType(type) {
    switch(type) {
      case 'left':
        this.openLeft = false;
        this.openRight = true;
        break;

      case 'right':
        this.openLeft = true;
        this.openRight = false;
        break;

      case 'open':
        this.openLeft = this.openRight = true;
        break;

      default:
        this.openLeft = this.openRight = false;

    }
  }

  setRegex(input) {
    input = input.replace(this.endRegExp, '');
    input = input.replace(this.breakRegExp, '|');
    input = input.replace(/^\||\|$/g, '');

    if (input) {
      let re = '(' + input + ')';
      if (!this.openLeft) {
        re = '\\b' + re;
      }
      if (!this.openRight) {
        re = re + '\\b';
      }
      this.matchRegExp = new RegExp(re, 'i');
      return this.matchRegExp;
    }

    return false;
  }

  getRegex() {
    const retval = matchRegExp.toString();
    retval = retval.replace(/(^\/(\\b)?|\(|\)|(\\b)?\/i$)/g, '');
    retval = retval.replace(/\|/g, ' ');
    return retval;
  }

  // recursively apply word highlighting
  highlightWord(node) {
    if (node === undefined || !node) {
      return;
    }
    if (!this.matchRegExp) {
      return;
    }
    if (this.skipTags.test(node.nodeName)) {
      return;
    }

    if (node.hasChildNodes()) {
      for(let i = 0; i < node.childNodes.length; i++) {
        this.highlightWord(node.childNodes[i]);
      }
    }

    if (node.nodeType == 3) { // NODE_TEXT
      const nv = node.nodeValue
      const regs = this.matchRegExp.exec(nv);
      if (nv && regs) {
        const match = document.createElement(this.tag);
        match.className = this.className;
        match.appendChild(document.createTextNode(regs[0]));

        const after = node.splitText(regs.index);
        after.nodeValue = after.nodeValue.substring(regs[0].length);
        node.parentNode.insertBefore(match, after);
      }
    };
  }

  // remove highlighting
  remove() {
    const arr = document.getElementsByClassName(this.className);
    let el;
    while(arr.length && (el = arr[0])) {
      const parent = el.parentNode;
      parent.replaceChild(el.firstChild, el);
      parent.normalize();
    }
  }

  // start highlighting at target node
  apply(input) {
    this.remove();
    if (input === undefined || !(input = input.replace(/(^\s+|\s+$)/g, ''))) {
      return;
    }
    if (this.setRegex(input)) {
      this.highlightWord(this.targetNode);
    }
    return this.matchRegExp;
  }
}

export default Highlight;
