const itemTemplate = document.getElementById("todo-list-item-template");
const listElement = document.getElementById("todo-list");
const editForm = document.getElementById("edit-form");

let id = 0;
function* makeId() {
  while (true) {
    yield id++;
  }
}

const idGenerator = makeId();

editForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(editForm);
  const data = Object.fromEntries(formData.entries());
  let listItem;
  if (editForm.dataset.mode === "create") {
    if (data.title) {
      listItem = itemTemplate.content.cloneNode(true);
      listItem
        .querySelector(".todo-item")
        .setAttribute("id", `itemid-${idGenerator.next().value}`);
      listItem.querySelector(".title").innerText = data.title;
      listItem.querySelector(".desc").innerText = data.desc;
      listElement.append(listItem);
    }
  } else if (editForm.dataset.mode === "edit") {
    listItem = listElement.querySelector(`#${editForm.dataset.editId}`);
    listItem.querySelector(".title").innerText = data.title;
    listItem.querySelector(".desc").innerText = data.desc;
  }
  editForm.reset();
  editForm.dataset.modeb = "create";
  editForm.dataset.editId = "";
});

function editItem(element) {
  editForm.dataset.modeb = "edit";
  editForm.dataset.editId = element.id;
  editForm.querySelector("[name=title]").value =
    element.querySelector(".title").innerText;
  editForm.querySelector("[name=desc]").value =
    element.querySelector(".desc").innerText;
}

function deleteItem(element) {
  element.remove();
}

function toggleItemCompletion(element) {
  element.classList.toggle("completed");
}

listElement.addEventListener("click", (event) => {
  const item = event.target.closest(".todo-item");
  switch (event.target.dataset.action) {
    case "edit":
      editItem(item);
    case "delete":
      deleteItem(item);
    case "complete":
      toggleItemCompletion(item);
    default:
      return;
  }
});
