<template lang="pug">
  #q-app
    q-layout
      q-page-container
        transition(name="fade", mode="out-in")
          router-view
        .footer
          .developer
            a(@click="openDeveloper")
              ="Made with "
              q-icon(name="favorite_border")
              =" by OnlyReFLeX"
</template>

<script>
  const { shell } = require('electron')
  export default {
    name: 'BlackJack',
    methods: {
      openDeveloper () {
        shell.openExternal('https://github.com/OnlyReFLeX')
      }
    }
  }
</script>

<style lang="scss">
  @import './assets/main.scss';

  body {
    background-color: rgb(1, 152, 117);
  }

  @keyframes love-animation {
    0%   {color: rgba(255, 255, 255, 0.5);}
    50%  {color: red;}
    100% {color: rgba(255, 255, 255, 0.5);}
  }
  .footer .developer {
    padding: 5px;
    a {
      cursor: pointer;
      text-decoration: none;
      color: rgba(255, 255, 255, 0.5);
      transition: color 0.5s ease;
      .q-icon {
        font-size: 18px;
        color: rgba(255, 255, 255, 0.5);
        transition: color 0.5s ease;
        animation-name: love-animation;
        animation-duration: 2s;
        animation-iteration-count: infinite;
        animation-timing-function: ease;
      }
    }
    a:hover {
      text-decoration: none;
      color: white;
      transition: color 0.5s ease;
      .q-icon {
        transition: color 0.5s ease;
        -webkit-animation: 0;
        color: red
      }
    }
  }
</style>
