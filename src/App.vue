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
</style>
