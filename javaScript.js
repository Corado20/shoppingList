'use strict';
const btnAdd = document.getElementById('btnAdd');
const btnClear = document.getElementById('btnClear');
const txtItem = document.getElementById('txtItem');
const txtFilter = document.getElementById('txtFilter');
const list = document.getElementById('list');

document.addEventListener('DOMContentLoaded', onload);
function onload() {
  btnAdd.addEventListener('click', addTask);
  btnClear.addEventListener('click', clearList);
  list.addEventListener('click', onListClick);
  txtFilter.addEventListener('keyup', onKeyUp);
}
function addTask(e) {
  if (!txtItem.value || txtItem.value == '') {
    alert('No empty loads can be added!');
    return;
  }
  addElement(txtItem.value);
  txtItem.value = null;
  txtItem.focus();
}
function addElement(value, isDone = false) {
  let el = document.createElement('li');
  el.innerHTML = `<input type="checkbox"
  ${isDone ? 'checked' : ''}><span>${value}</span><i>X</i>`;
  list.appendChild(el);
}
function clearList(e) {
  if (!confirm('Are you sure to clear the list?')) {
    return;
  }
  list.innerHTML = '';
}
function onListClick(e) {
  let tg = e.target,
    li = tg.closest('li');
  if (tg.nodeName == 'I') {
    if (!confirm('Are you sure to clear the item?')) {
      return;
    }
    li.remove();
  } else {
    const chk = li.querySelector('input[type="checkbox"]');
    chk.checked = !chk.checked;
  }
}
let time;

function onKeyUp(e) {
  clearTimeout(time);
  time = setTimeout(onFilter(e), 400);
}
function onFilter(e) {
  let filter = e.target.value.toLowerCase();
  let elements = list.querySelectorAll('li');
  elements.forEach(i => {
    const txt = i.children[1].textContent.toLowerCase();
    if (txt.indexOf(filter) > -1) {
      i.style.display = 'flex';
    } else {
      i.style.display = 'none';
    }
  });
}
