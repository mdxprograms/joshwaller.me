import { h, app } from "hyperapp";

const state = {
  activeSlide: 1,
  slides: []
};

const actions = {
  nextSlide: state => ({ slideIndex: state.slideIndex++ }),
  prevSlide: state => ({
    slideIndex: state.slideIndex > 0 ? state.slideIndex-- : 0
  })
};

const view = (state, actions) => <div>hello sandbox</div>;

if (document.getElementById("slider-app")) {
  app(state, actions, view, document.getElementById("slider-app"));
}
