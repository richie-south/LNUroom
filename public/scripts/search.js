'use strict';

function getInputValue(element){
  return element.value;
}

function loadNewRoom(searchString){
  const href = window.location.href;
  const regex = new RegExp('.*\/');
  const path = href.match(regex);
  window.location.href = path[0] + searchString;
}

function loadRoomIfValid(searchString){
  if(searchString !== ''){
    loadNewRoom(searchString);
  }
}

function isEnterPress(e){
  var key = e.which || e.keyCode;
  if (key === 13) { // enter
    return true;
  }
  return false;
}

function search(){
  var inputField = document.querySelector('#searchField');
  var searchButton = document.querySelector('#searchButton');

  inputField.addEventListener('keypress', function(e){
    if (isEnterPress(e)) {
      loadRoomIfValid(getInputValue(inputField));
    }
  }, false);
  searchButton.addEventListener('click', function(e){
    loadRoomIfValid(getInputValue(inputField));
  }, false);
  searchButton.addEventListener('keypress', function(e){
    if (isEnterPress(e)) {
      loadRoomIfValid(getInputValue(inputField));
    }
  }, false);
}

window.onload = search;
