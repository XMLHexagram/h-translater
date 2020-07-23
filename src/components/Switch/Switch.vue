<template>
  <div>
    <label class="label">
      <div class="toggle">
        <input
          class="toggle-state"
          type="checkbox"
          name="check"
          value="check"
        />
        <div class="indicator"></div>
      </div>
      <!-- <div class="label-text">no more emails plz</div> -->
    </label>
  </div>
</template>

<script>
export default {
  name: 'HexSwitch'
}
</script>

<style scoped>
/* body {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  font-family: 'IBM Plex Sans Condensed', sans-serif;
  font-weight: 300;
  background-color: #ecf0f3;
} */

.label {
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  color: #394a56;
}

.label-text {
  margin-left: 16px;
}

.toggle {
  isolation: isolate;
  position: relative;
  height: 20px;
  width: 40px;
  border-radius: 15px;
  overflow: hidden;
  background-color: #3498db;
  /* box-shadow: -8px -4px 8px 0px #ffffff, 8px 4px 12px 0px #d1d9e6,
    4px 4px 4px 0px #d1d9e6 inset, -4px -4px 4px 0px #ffffff inset; */
}

.toggle-state {
  display: none;
}

.indicator {
  height: 100%;
  width: 200%;
  background: #ecf0f3;
  border-radius: 15px;
  transform: translate3d(-75%, 0, 0);
  transition: transform 0.4s;
  /* transition: transform 0.4s cubic-bezier(0.85, 0.05, 0.18, 1.35); */
  /* box-shadow: -8px -4px 8px 0px #ffffff, 8px 4px 12px 0px #d1d9e6; */
}

.toggle-state:checked ~ .indicator {
  transform: translate3d(25%, 0, 0);
}
</style>
