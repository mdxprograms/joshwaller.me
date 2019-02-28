import { h, app } from "hyperapp";

const state = {

};

const actions = {

};

const view = (state, actions) => (
  <div>hello sandbox</div>
);

if (document.getElementById("sandbox-app")) {
  app(state, actions, view, document.getElementById("sandbox-app"));
}