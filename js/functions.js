import {createInputField, createButtonElement, createDomElement, isHrefLink} from './utilities.js';

function insertHeader(element) {
  fetch('../pages/components/header.html')
  .then(response => response.text())
  .then(html => {
    element.innerHTML = html;
  })
  .catch(err => console.log(err));
};

function addIngredientToList(input,list) {
	let ingredient = input;
	let list_item = '';
	if(ingredient.value != "") list_item = `<li>${ingredient.value}</li>`;
	list.innerHTML += list_item;
	ingredient.value = "";
};

function addToArray(element, array) {
  for(let i = 0; i < element.length; i++) {
    array.push(element[i].innerText);
  };
};

function addToList(list) {
  const newItem = document.createElement('li');
  newItem.setAttribute('contenteditable', true);
  newItem.classList.add('editable');
  list.appendChild(newItem);
};

function deleteListItem() {
  const confirmation = confirm("Are you sure you want to delete this item?");
  if(confirmation) {
    this.remove();
  };
};

function handleImageClick() {
  const confirmation = confirm("Are you sure you want to delete this image?");
  if(confirmation) {
    this.src = '../assets/images/no-drink.png';
  };
};

function makeContentEditable(childrenList, value, isEditable) {
  for(let i = 0; i < childrenList.length; i++) {
    if(childrenList[i].tagName.toLowerCase() === 'img') {
      const imageInput = childrenList[i].nextElementSibling;
      if(isEditable) {
        imageInput.style.display = 'block';
        childrenList[i].classList.add('editable');
        childrenList[i].addEventListener('click', handleImageClick);
      }
      else {
        imageInput.style.display = 'none';
        childrenList[i].removeEventListener('click', handleImageClick);
        childrenList[i].classList.remove('editable');
      };
    };

		if(childrenList[i].tagName.toLowerCase() === 'ul') {
			const listOfItems = childrenList[i].children;
			for(let j = 0; j < listOfItems.length; j++) {
				listOfItems[j].setAttribute('contenteditable', value);
        if(isEditable) {
          listOfItems[j].classList.add('editable');
          listOfItems[j].addEventListener('dblclick', deleteListItem)
        }
        else {
          listOfItems[j].classList.remove('editable');
          listOfItems[j].removeEventListener('dblclick', deleteListItem)
        };
			};
      const addButton = childrenList[i].nextElementSibling;
      if (addButton && addButton.classList.contains('addListItem')) {
        addButton.style.display = isEditable ? 'block' : 'none';
      }
		};

		if(childrenList[i].tagName.toLowerCase() === 'h2') {
			childrenList[i].setAttribute('contenteditable', value);
      if(isEditable) {
        childrenList[i].classList.add('editable');
      }
      else {
        childrenList[i].classList.remove('editable');
      };
		};

    if(childrenList[i].tagName.toLowerCase() === 'p') {
      if(isEditable) {
        childrenList[i].style.display = 'block';
      }
      else {
        childrenList[i].style.display = 'none';
      };
    };
	};
};

function createRecipeCard(id, name, listofingredients, listOfInstructions, imageURL, deleteFunction, editFunction) {

  const recipeCard = createDomElement('div',`child-card-${id}`,'recipe--card');

  const image = createDomElement('img',`image_${id}`,'recipe--image');
  image.setAttribute('alt', name);
  const checkImageUrl = isHrefLink(imageURL);
  if(!checkImageUrl) {
    image.setAttribute('src', "../assets/images/no-drink.png");
  }
  else {
    image.setAttribute('src', imageURL);
  };
  recipeCard.appendChild(image);

  const imageInput = createInputField('text','Insert new img url...',`input_${id}`,'none');
  recipeCard.appendChild(imageInput);

  const recipeName = createDomElement('h2',`recipe_name_${id}`,'recipe--name',name);
  recipeCard.appendChild(recipeName);

  const infoAboutDeletingListItems = createDomElement(
    'p',
    `information_${id}`,
    'deletion_instruction_tooltip',
    '* Click on the image to delete it \n* Double click on any item in the list to delete it',
    'none'
  );
  recipeCard.appendChild(infoAboutDeletingListItems);

  const ingredientsTitle = createDomElement('h4',`ingredientsTitle_${id}`,'ingredientsTitle','Ingredients');
  recipeCard.appendChild(ingredientsTitle);

  const ingredientList = createDomElement('ul',`ingredient_list_${id}`,'ingredient--list');
  recipeCard.appendChild(ingredientList);

  const addIngredientButton = createButtonElement(`addIngredient_${id}`,'+','addListItem',() => addToList(ingredientList),'none');
  recipeCard.appendChild(addIngredientButton);
	
  const instructionsTitle = createDomElement('h4',`instructionsTitle_${id}`,'instructionsTitle','Instructions');
  recipeCard.appendChild(instructionsTitle);
  listofingredients.forEach(item => {
    const ingredient = document.createElement('li');
    ingredient.innerText = item;
    ingredientList.appendChild(ingredient);
  });

  const instructionList = createDomElement('ul',`instructions_list_${id}`,'instruction--list');
  recipeCard.appendChild(instructionList);
  listOfInstructions.forEach(item => {
    const instruction = document.createElement('li');
    instruction.innerText = item;
    instructionList.appendChild(instruction);
  });

  const addInstructionButton = createButtonElement(`addInstruction_${id}`,'+','addListItem',() => addToList(instructionList),'none');
  recipeCard.appendChild(addInstructionButton);

  const buttonsWrapper = createDomElement('div',`button_wrapper_${id}`,'recipe-card-buttons',);
  recipeCard.appendChild(buttonsWrapper);

  const editRecipeButton = createButtonElement(`edit_button_${id}`,'Edit','recipe_management_buttons',editFunction);
  const confirmChangesButton = createButtonElement(`save-changes-for-${id}`,'Save Changes',['recipe_management_buttons', 'hidden']);
  const deleteRecipeButton = createButtonElement(`delete_button_${id}`,'Delete','recipe_management_buttons',deleteFunction);
  buttonsWrapper.appendChild(editRecipeButton);
  buttonsWrapper.appendChild(confirmChangesButton);
  buttonsWrapper.appendChild(deleteRecipeButton);

  const data = new Set();
  const keywords = ["chicken", "pork", "beef", "tomato", "rice", "potato", "eggs"];
  const title = recipeName.innerText.toLowerCase().split(" ");
  const ingredients = [];
      
  for(let i = 0; i < title.length; i++) {
    for(let k = 0; k < keywords.length; k++) {
      if(title[i] === keywords[k]) {
        data.add(keywords[k]);
      };
    };
  };

  for(let i = 0; i < ingredientList.children.length; i++) {
    ingredients.push(ingredientList.children[i].innerText);
  };

  const list_data = ingredients.join().split(" ");
  for(let i = 0; i < list_data.length; i++) {
    for(let k = 0; k < keywords.length; k++) {
      if(list_data[i].toLowerCase().includes(keywords[k])) {
        data.add(keywords[k]);
      };
    };
  };
  
  const dataset = Array.from(data);
  recipeCard.setAttribute('data-keywords', JSON.stringify(dataset));
	
  return {recipeCard, dataset};
};

function createClosedRecipeCard(id, name, imageURL, parent , callback, dataAttribute, difficultyAttribute, flavorAttribute, consistencyAttribute) {
  const closedRecipeCard = document.createElement('div');
  closedRecipeCard.classList.add('closed--recipe--card');
  closedRecipeCard.setAttribute('id', id);

  const image = createDomElement('img', `closed_card_image_${id}`, 'recipe--image');
  image.setAttribute('alt', `image of ${name}`);
  const checkImageUrl = isHrefLink(imageURL);
  if(!checkImageUrl) {
    image.setAttribute('src', "../assets/images/no-drink.png");
  }
  else {
    image.setAttribute('src', imageURL);
  };
  closedRecipeCard.appendChild(image);

  const recipeName = createDomElement('h4', `closed_card_name_${id}`, 'recipe--name', name);
  closedRecipeCard.appendChild(recipeName);

  const expandCard = createButtonElement(`closed_recipe_expand_${id}`, 'Expand', 'recipe_management_buttons');
  closedRecipeCard.appendChild(expandCard);

  const modal = createDomElement('div', `myModal_${id}`, 'closedModal');
  const modalContent = createDomElement('div', `openCard_${id}`, 'modal-content');
  const closeButton = createDomElement('span', `closeModal_${id}`, 'close', 'X');
  modalContent.appendChild(closeButton);
  modal.appendChild(modalContent);
  
  expandCard.addEventListener('click', () => {
    if(modal.classList.contains('closedModal')) {
      modal.classList.remove('closedModal');
      modal.classList.add('modal');
      modalContent.appendChild(callback);
    };
  });

  closeButton.addEventListener('click', () => {
    modal.classList.remove('modal');
    modal.classList.add('closedModal');
  });


  closedRecipeCard.appendChild(modal);
	closedRecipeCard.setAttribute('data-keywords', JSON.stringify(dataAttribute));
  closedRecipeCard.setAttribute('data-difficulty', JSON.stringify(difficultyAttribute));
  closedRecipeCard.setAttribute('data-flavor', JSON.stringify(flavorAttribute));
  closedRecipeCard.setAttribute('data-consistency', JSON.stringify(consistencyAttribute));

  parent.appendChild(closedRecipeCard);
};

export {insertHeader, addIngredientToList, createRecipeCard, createClosedRecipeCard, makeContentEditable, addToArray};