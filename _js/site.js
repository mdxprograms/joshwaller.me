const site = {};

site.sidenav = {
  el: document.querySelector(".sidebar"),
  init: function() {
    const profileImg = document.createElement("img");
    this.addProfileImage(profileImg);
  },
  imageTilt: "right",
  addProfileImage: function(img) {
    img.setAttribute(
      "src",
      "https://avatars3.githubusercontent.com/u/1900735?s=460&v=4"
    );
    img.setAttribute(
      "style",
      `
      border-radius: 50%;
      box-shadow: 0 0 1rem #333;
      right: 2rem;
      position: absolute;
      top: 18rem;
      transition: all 500ms ease-in-out;
      transform: rotateZ(-15deg);
      width: 4rem;
    `
    );

    let self = this;

    img.addEventListener("mouseenter", function(e) {
      if (self.imageTilt === "right") {
        e.target.style.transform = "rotateZ(15deg)";
        self.imageTilt = "left";
      } else {
        e.target.style.transform = "rotateZ(-360deg)";
        self.imageTilt = "right";
      }
    });

    this.el.append(img);
  }
};

document.addEventListener("DOMContentLoaded", function() {
  site.sidenav.init();
});
