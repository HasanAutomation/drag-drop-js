const draggableList = document.getElementById('draggable-list');

const richestPeople = [
  'Jeff Bezos',
  'Bill Gates',
  'Mark Zuckerbarg',
  'Warren buffet',
  'Larry Page',
  'Sergery brin',
  'Mukesh Ambani',
  'Elon Musk',
  'Jack Ma',
  'Joe Biden',
];

const listItems = [];

createList();

let dragStartIndex;

function createList() {
  [...richestPeople]
    .map(a => ({ value: a, sort: Math.random() }))
    .sort(function (a, b) {
      return a.sort - b.sort;
    })
    .map(a => a.value)
    .forEach((person, index) => {
      const listItem = document.createElement('li');
      listItem.setAttribute('data-index', index);
      listItem.innerHTML = `<span class="number">${index + 1}</span>
        <div class="draggable" draggable="true">
        <p class="person-name">${person}</p>
        </div>
        `;
      listItems.push(listItem);
      draggableList.appendChild(listItem);
    });
  addEventListeners();
}

function dragStart() {
  dragStartIndex = +this.closest('li').getAttribute('data-index');
}

function dragOver(e) {
  e.preventDefault();
}

function dragDrop() {
  const dragEndIndex = +this.getAttribute('data-index');
  swapItems(dragStartIndex, dragEndIndex);
  this.classList.remove('over');
}
function dragEnter() {
  this.classList.add('over');
}
function dragLeave() {
  this.classList.remove('over');
}

function swapItems(from, to) {
  const itemOne = listItems[from].querySelector('.draggable');
  const itemTwo = listItems[to].querySelector('.draggable');

  listItems[from].appendChild(itemTwo);
  listItems[to].appendChild(itemOne);
}

function addEventListeners() {
  const draggables = document.querySelectorAll('.draggable');
  const dragListItems = document.querySelectorAll('.draggable-list li');

  draggables.forEach(draggable => {
    draggable.addEventListener('dragstart', dragStart);
  });
  dragListItems.forEach(item => {
    item.addEventListener('dragover', dragOver);
    item.addEventListener('drop', dragDrop);
    item.addEventListener('dragenter', dragEnter);
    item.addEventListener('dragleave', dragLeave);
  });
}
