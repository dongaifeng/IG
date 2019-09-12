<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <keep-alive exclude="nokeepAlive">
        <router-view />
      </keep-alive>
    </transition>
  </div>
</template>

<style lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
