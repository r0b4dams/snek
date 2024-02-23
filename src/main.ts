import "./style.css";

/**
 *
 * @param t the end time of the previous frame's rendering
 */
function main(t: DOMHighResTimeStamp) {
  window.requestAnimationFrame(main);
  console.log(t, typeof t);
}

window.requestAnimationFrame(main);
