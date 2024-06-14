window.addEventListener("load", solve);

function solve() {
  const gemNameInput = document.getElementById("gem-name");
  const colorInput = document.getElementById("color");
  const caratsInput = document.getElementById("carats");
  const priceInput = document.getElementById("price");
  const typeInput = document.getElementById("type");
  const addButton = document.getElementById("add-btn");

  const previewList = document.getElementById("preview-list");
  const collectionList = document.getElementById("collection");

  addButton.addEventListener('click', addButtonClickHandler);
  //here we add a validation for when the button is pressed - validation checks of empty input
  //we use a separate function for adding functionality onClick event

  function addButtonClickHandler(e) {
    //we take all input elements as a array
    const inputElements = [
      gemNameInput,
      colorInput,
      caratsInput,
      priceInput,
      typeInput,
    ];
    //we check if any of the values is empty or equal to empty string
    if (inputElements.some((element) => element.value === "")) {
      return;
    }

    //here we attach our newly created preview page
    const previewElement = createPreviewElement(
      gemNameInput.value,
      colorInput.value,
      caratsInput.value,
      priceInput.value,
      typeInput.value
    );

    //add element to preview list
    previewList.appendChild(previewElement);

    //disable add button
    e.currentTarget.setAttribute("disabled", "disabled");

    //clear inputs using the array and setting element value to empty string
    inputElements.forEach((element) => (element.value = ""));
  }

  // here we create the preview list starting from the inner elements and expanding upwards
  // Every element is being appended to its perant
  function createPreviewElement(name, color, carats, price, type) {
    //creating the elements
    const articleHeaderElement = document.createElement("h4");
    articleHeaderElement.textContent = name;

    const colorParagraphELement = document.createElement("p");
    colorParagraphELement.textContent = `Color: ${color}`;

    const caratsParagraphElement = document.createElement("p");
    caratsParagraphElement.textContent = `Carats: ${carats}`;

    const priceParagraphElement = document.createElement("p");
    priceParagraphElement.textContent = `Price: ${price}$`;

    const typeParagraphElement = document.createElement("p");
    typeParagraphElement.textContent = `Type: ${type}`;

    //appending all the above elements to the newly created article
    const articleElement = document.createElement("article");

    articleElement.appendChild(articleHeaderElement);
    articleElement.appendChild(colorParagraphELement);
    articleElement.appendChild(caratsParagraphElement);
    articleElement.appendChild(priceParagraphElement);
    articleElement.appendChild(typeParagraphElement);

    //Creating the buttons
    const saveButton = document.createElement("button");
    saveButton.classList.add("save-btn");
    saveButton.textContent = "Save to Collection";
    // Adding event listener to the editButton
    const editButton = document.createElement("button");
    editButton.classList.add("edit-btn");
    editButton.textContent = "Edit Information";

    // Adding event listener to the editButton

    const cancelButton = document.createElement("button");
    cancelButton.classList.add("cancel-btn");
    cancelButton.textContent = "Cancel";

    //creating the final list element to which we append all of the
    const liElement = document.createElement("li");
    liElement.classList.add("gem-info");
    //append all the elements to the list
    liElement.appendChild(articleElement);
    liElement.appendChild(saveButton);
    liElement.appendChild(editButton);
    liElement.appendChild(cancelButton);
    // return the list element after completion

    //ADD EVENT LISTENERS
    //EDIT BUTTON EVENTS
    editButton.addEventListener("click", (e) => {
      //load information to input fields

      gemNameInput.value = name;
      colorInput.value = color;
      caratsInput.value = carats;
      priceInput.value = price;
      typeInput.value = type;

      //removew preview element from preview - list
      e.currentTarget.parentElement.remove();

      //eneable add button
      addButton.removeAttribute("disabled");
    });

    //SAVE BUTTON
    saveButton.addEventListener("click", (e) => {
      //create el for collection

      const collectionItemParagraph = document.createElement("p");
      collectionItemParagraph.classList.add("collection-item");
      collectionItemParagraph.textContent = `${name} - Color: ${color}/ Carats: ${carats}/ Price: ${price}$/ Type: ${type}`;

      const collectionListItem = document.createElement("li");
      collectionListItem.appendChild(collectionItemParagraph);

      //add el to collection list
      collectionList.appendChild(collectionListItem);

      //remove previewEl from prewview list
      e.currentTarget.parentElement.remove();

      //enable add button
      addButton.removeAttribute("disabled");
    });

    //CANCEL BUTTON
    cancelButton.addEventListener("click", (e) => {
      // remove item from preview list
      e.currentTarget.parentElement.remove();

      // active add button
      addButton.removeAttribute("disabled");
    });

    return liElement;
  }
}
