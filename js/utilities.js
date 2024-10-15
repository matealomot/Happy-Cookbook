function isHrefLink(str) {
  let hrefRegex = /^(http:\/\/|https:\/\/)[\w\-]+(\.[\w\-]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?$/;
  return hrefRegex.test(str);
};

function createInputField(type, placeholder, id, display = null) {
  const input = document.createElement('input');
  input.setAttribute('type', `${type}`);
  input.setAttribute('placeholder', `${placeholder}`);
  input.setAttribute('id', `${id}`);
  input.style.display = display;
  return input;
};

function createButtonElement(id, innerText, className, callback = null, display = null) {
  const button = document.createElement('button');
  button.setAttribute('type', 'button');
  button.setAttribute('id', `${id}`);
  button.innerText = `${innerText}`;
  
  if(Array.isArray(className)) {
    className.forEach(className => button.classList.add(className));
  } 
  else {
    button.classList.add(className);
  };

  button.addEventListener('click', callback);
  button.style.display = display;
  return button;
};

function createDomElement(elementType, id, className = '', content = '', display = null, callback = null) {
  const element = document.createElement(elementType);
  if(elementType === 'img') {
    element.setAttribute('alt', '');
  };
  element.setAttribute('id', id);
  element.classList.add(className);
  element.innerText = content;
  element.style.display = display;
  element.addEventListener('click', callback);
  return element;
};

export {createInputField, createButtonElement, createDomElement, isHrefLink};