"use strict";

const heartItem = document.querySelector(".heart-item");
const wishList = document.querySelector(".wish-list");
const heartButtons = document.querySelectorAll(".heart-btn");
const wishProducts = document.querySelector(".heart-item");
const emptyList = document.querySelector(".empty-list");
const productsArr = document.querySelectorAll(".card--product");
const blogArr = document.querySelectorAll(".blog-grid .card");
const categoryRightArrow = document.querySelector(".right-arrow");
const categoryLeftArrow = document.querySelector(".left-arrow");
const blogRightArrow = document.querySelector(".latest-blog .right-arrow");
const blogLeftArrow = document.querySelector(".latest-blog .left-arrow");
const arrUp = document.querySelector(".arrow-up");
const header = document.querySelector("header");
const section = document.querySelector(".content");

const n = productsArr.length;
const n1 = blogArr.length;
let counted = 0;

heartButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    btn.classList.toggle("active");
    const icon = btn.querySelector(".icon");
    const element = btn.closest(".card").querySelector("h3");
    const html = `<p class>${element.textContent}</p>`;
    if (btn.classList.contains("active")) {
      counted = counted + 1;
      wishProducts.dataset.count = counted;
      icon.style.color = "red";
      wishList.insertAdjacentHTML("beforeend", html);
    } else {
      const children = wishList.querySelectorAll("p");
      for (let child of children) {
        if (child.textContent == element.textContent) {
          child.innerHTML = "";
          break;
        }
      }
      counted = counted - 1;
      wishProducts.dataset.count = counted;
      icon.style.color = "black";
    }
  });
});

heartItem.addEventListener("click", () => {
  wishList.classList.toggle("active");
  if (wishList.classList.contains("active")) {
    const len = wishList.querySelectorAll("h1,p:not(:empty)").length;
    wishList.style.height = `${len * 31.2}px`;
    wishList.style.width = "15rem";
  } else {
    wishList.style.height = 0;
    wishList.style.width = 0;
  }
});

if (window.matchMedia("(max-width: 592px)").matches) {
  let slideLeft = 0;
  let slideRight = 2;
  let slideLeft1 = 0; // left slider for blog section
  let slideRight1 = 2; // right slider for blog section

  // Positioning second and third post
  for (let i = 0; i < 2; i++) {
    blogArr[n1 - 2 + i].classList.add("blog-card-float-2");
    blogArr[n1 - 2 + i].style.transform = `translateX(calc(${
      i * 100 + 100
    }% + ${i + 1}rem))`;
  }

  // Positioning last two categories cards on the right side
  for (let i = 0; i < 2; i++) {
    productsArr[n - 2 + i].classList.add("card--float-2");
    productsArr[n - 2 + i].style.transform = `translateX(calc(${
      i * 100 + 400
    }% + ${4 + i}rem))`;
  }
  categoryLeftArrow.addEventListener("click", () => {
    if (slideLeft > 0) {
      move(productsArr, 1, 1);
      slideLeft -= 1;
      slideRight += 1;
    }
  });
  categoryRightArrow.addEventListener("click", () => {
    if (slideRight > 0) {
      move(productsArr, -1, 1);
      slideLeft += 1;
      slideRight -= 1;
    }
  });
  blogLeftArrow.addEventListener("click", () => {
    if (slideLeft1 > 0) {
      move(blogArr, 1, 1);
      slideLeft1 -= 1;
      slideRight1 += 1;
    }
  });
  blogRightArrow.addEventListener("click", () => {
    if (slideRight1 > 0) {
      move(blogArr, -1, 1);
      slideLeft1 += 1;
      slideRight1 -= 1;
    }
  });
} else if (window.matchMedia("(max-width: 800px)").matches) {
  let slideLeft = 0;
  let slideRight = 2;
  let slideLeft1 = 0;
  let slideRight1 = 1;

  // Positioning third blog post on the right side
  blogArr[n1 - 1].classList.add("blog-card-float");
  blogArr[n1 - 1].style.transform = "translateX(calc(200% + 8rem))";

  // Positioning last two categories cards on the right side
  for (let i = 0; i < 2; i++) {
    productsArr[n - 2 + i].classList.add("card--float");
    productsArr[n - 2 + i].style.transform = `translateX(calc(${
      i * 100 + 400
    }% + ${i * 4 + 16}rem))`;
  }

  categoryLeftArrow.addEventListener("click", () => {
    if (slideLeft > 0) {
      move(productsArr, 1, 4);
      slideLeft -= 1;
      slideRight += 1;
    }
  });
  categoryRightArrow.addEventListener("click", () => {
    if (slideRight > 0) {
      move(productsArr, -1, 4);
      slideLeft += 1;
      slideRight -= 1;
    }
  });
  blogLeftArrow.addEventListener("click", () => {
    if (slideLeft1 > 0) {
      move(blogArr, 1, 4);
      slideLeft1 -= 1;
      slideRight1 += 1;
    }
  });
  blogRightArrow.addEventListener("click", () => {
    if (slideRight1 > 0) {
      move(blogArr, -1, 4);
      slideLeft1 += 1;
      slideRight1 -= 1;
    }
  });
}

const move = function (arr, ind, gap) {
  arr.forEach((el) => {
    el.style.transform += `translateX(calc(${ind * 100}% + ${ind * gap}rem))`;
  });
};

// Smooth slide animation using intersectionObserver()

const slideUp = function (entries) {
  const [entrie] = entries;

  if (entrie.isIntersecting) {
    arrUp.classList.remove("opacity");
  } else {
    arrUp.classList.add("opacity");
  }
};

const sectionObserver = new IntersectionObserver(slideUp, {
  root: null,
  threshold: 0.1,
});

sectionObserver.observe(section);

arrUp.addEventListener("click", function () {
  header.scrollIntoView({ behavior: "smooth" });
  this.classList.remove("opacity");
});
