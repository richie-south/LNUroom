'use strict';

/**
 * [gets the filed value]
 * @param  {[Node]} element [element to get value from]
 * @return {[String]}         [Value of element]
 */
function getInputValue(element){
  return element.value;
}

/**
 * [loads new sub url in current window]
 * @param  {[String]} searchString [part of url to load]
 */
function loadNewRoom(searchString){
  const href = window.location.href;
  const regex = new RegExp('.*\/');
  const path = href.match(regex);
  window.location.href = path[0] + searchString;
}

/**
 * [checks if string is valid]
 * @param  {[string]} searchString []
 */
function loadRoomIfValid(searchString){
  if(searchString !== ''){
    loadNewRoom(searchString);
  }
}

/**
 * [Checks if enter press]
 * @param  {[object]}  e [event from DOM]
 * @return {Boolean}   [enter or not]
 */
function isEnterPress(e){
  var key = e.which || e.keyCode;
  return key === 13; // is enter
}

/**
 * [Handels events on elements]
 */
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
