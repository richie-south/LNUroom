'use strict';

function search(){
  return new Vue({
    el: '#searchHolder',
    data: {
      searchString: ''
    },
    methods: {
      doSearch: function(){
        if(this.$data.searchString === ''){
          return;
        }
        const href = window.location.href;
        const regex = new RegExp('.*\/');
        const path = href.match(regex);
        window.location.href = path[0] + this.$data.searchString;
      }
    }
  });
}

window.onload = search;
