
<div class="overlay">
  <div class="window">
    <slot></slot>
  </div>
</div>

<style>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
}
.window {
  min-width: 320px;
  min-height: 240px;
  background: whitesmoke;
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  align-content: space-between;
  justify-content: space-between;
  box-shadow: 4px 4px 4px rgba(1, 1, 1, .3);
}
</style>