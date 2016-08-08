import React from "react";
import ReactDOM from "react-dom";

import App from "./components/App";

const app = document.getElementById('app');
ReactDOM.render(<App />, app);


//--------------------------
// Menu
//--------------------------
(function() {
var menu = {
  cacheDom: function() {
    this.$click = $('.hambclicker');
    this.$menuIcon = $('#hambmenu');
    this.$menu = $('.menu');
  },
  init: function() {
    this.cacheDom();
    this.bindEvents();
  },
  bindEvents: function() {
    this.$click.on('click', this.isOpen.bind(this));
  },
  isOpen: function() {
    this.$menuIcon.toggleClass('open');
    this.$menu.toggleClass("isopen");
    }
  };
  menu.init();
})();
