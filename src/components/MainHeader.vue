<script setup lang="ts">

</script>

<template>
  <header class="main-header">
    <div class="main-header__content">
      <RouterLink to="/" class="logo">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
          <path fill="#34495e" d="M175 389.4l49-79.6V64c17.7 0 32-14.3 32-32s-14.3-32-32-32H160 96 32C14.3 0 0 14.3 0 32S14.3 64 32 64V352c0 53 43 96 96 96c11.2 0 22-1.9 32-5.5c0-18.7 5.2-37.1 15-53.1zM96 64h64v96H96V64z"/>
          <path fill="#41b883" d="M480 0H352 320c-17.7 0-32 14.3-32 32s14.3 32 32 32V214.9L202.3 406.2c-6.7 10.9-10.3 23.5-10.3 36.4c0 38.3 31.1 69.4 69.4 69.4H570.6c38.3 0 69.4-31.1 69.4-69.4c0-12.8-3.6-25.4-10.3-36.4L512 214.9V64c17.7 0 32-14.3 32-32s-14.3-32-32-32H480zM384 224V64h64V224c0 5.9 1.6 11.7 4.7 16.8L501.5 320h-171l48.8-79.2c3.1-5 4.7-10.8 4.7-16.8z"/>
        </svg>
      </RouterLink>
      <ul class="nav-links">
        <li class="nav-link-wrapper">
          <RouterLink class="nav-link" to="/music-bands">Музыкальные группы</RouterLink>
          <RouterLink class="nav-link" to="/music-bands/create">Создать группу</RouterLink>
        </li>
      </ul>
    </div>
  </header>
</template>

<style scoped lang="scss">
@use '@/assets/general/consts' as consts;
@use '@/assets/general/colors' as colors;
@use '@/assets/general/fonts' as fonts;
@use '@/assets/general/adaptivity' as *;

.main-header {
  position: fixed;
  display: flex;
  top: 0;
  left: 0;
  width: 100vw;
  padding: 0 consts.$page-content-padding;
  height: consts.$main-header-height;
  justify-content: center;
  background: colors.$base-05;

  &__content {
    display: flex;
    height: 100%;
    width: 100%;
    max-width: consts.$page-max-content-width;
    justify-content: space-between;

    .logo {
      display: flex;
      width: consts.$main-header-height;
      height: consts.$main-header-height;
      list-style: none;
      padding: 5px;
      margin: 0;
      justify-content: center;
    }

    .nav-links {
      display: flex;
      list-style: none;
      padding: 0;
      margin: 0;

      .nav-link-wrapper {
        margin: 0;
        height: consts.$main-header-height;

        .nav-link {
          @include fonts.font-style(18px, 400, 24px);

          display: inline-flex;
          height: 100%;
          justify-content: center;
          align-items: center;
          padding: 0 10px;
          text-decoration: none;
          color: colors.$base-12;
          transition:
            background-color .3s ease-in-out;

          @include cursor-hover-and-touch-active {
            background: colors.$blue-4;
          }

          @include cursor-active {
            background: colors.$blue-5;
          }
        }
      }
    }
  }
}
</style>
