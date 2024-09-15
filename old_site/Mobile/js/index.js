(function () {
  // 节流阀
  function throttle(fn, delay) {
    let throttleTimer = null;
    return (params) => {
      if (!throttleTimer) {
        throttleTimer = setTimeout(() => {
          throttleTimer = null;
        }, delay);
        return fn(params);
      }
    };
  }
  window.addEventListener("DOMContentLoaded", () => {
    const headerNavList = document.querySelector(".header-nav-list");
    const headerSlider = document.querySelector(".header-slider");
    // 顶部导航的小滑块
    headerNavList.addEventListener(
      "click",
      (e) => {
        const target = e?.target.parentNode || window.event.target.parentNode;
        if (target.tagName === "LI") {
          headerSlider.style.left = `${
            (target.offsetLeft / document.documentElement.clientWidth) * 10
          }rem`;
          headerSlider.style.width = `${
            (target.offsetWidth / document.documentElement.clientWidth) * 10
          }rem`;
          headerNavList
            .querySelector(".activated-header-nav")
            ?.classList.remove("activated-header-nav");
          target.classList.add("activated-header-nav");
        }
      },
      { passive: true }
    );
    // 顶部导航的菜单
    const headerMenu = document.querySelector(".menu-btn");
    const menuWrapper = document.querySelector(".menu-wrapper");
    const menuMask = document.querySelector(".menu-mask");
    const menuList = document.querySelector(".menu");
    let menuVisible = false;
    headerMenu.addEventListener("touchstart", () => {
      menuVisible = !menuVisible;
      if (!menuVisible) {
        menuList.classList.remove("display-menu");
        menuMask.classList.remove("display-menu-mask");
      } else {
        menuWrapper.style.display = "block";
        requestAnimationFrame(() => {
          menuMask.classList.add("display-menu-mask");
        });
      }
    });
    menuMask.addEventListener("transitionend", () => {
      if (menuVisible) {
        menuList.classList.add("display-menu");
      } else {
        menuWrapper.style.display = "none";
      }
    });
    // 处理菜单点击
    menuList.addEventListener("touchstart", (e) => {
      const target = e.target || window.event.target;
      if (target.tagName === "IMG") {
        e.stopPropagation();
      }
    });
    // 点击其他地方关闭菜单
    menuWrapper.addEventListener("touchstart", () => {
      menuVisible = false;
      menuMask.classList.remove("display-menu-mask");
      menuList.classList.remove("display-menu");
    });
    // 防止透过mask对下方元素进行滚动
    menuWrapper.addEventListener(
      "touchmove",
      (e) => {
        e.preventDefault();
      },
      { passive: false }
    );

    // 轮播图
    const carouselList = document.querySelector(".carousel-list");
    let carouselIndex = -1;
    let carouselLength = 0;
    let carouselTimer = null;

    // 轮播效果实现
    const itemWidth = 9.241;
    let onTransition = false;
    // 判断是否进入上/下一轮循环
    function justifyPos() {
      carouselList.classList.remove("carousel-trans");
      if (carouselIndex === 0) {
        carouselIndex = carouselLength - 2;
      } else if (carouselIndex >= carouselLength - 1) {
        carouselIndex = 1;
      }
      carouselList.style.transform = `translateX(-${
        carouselIndex * itemWidth
      }rem)`;
      onTransition = false;
    }
    const transCarouselList = throttle((direction) => {
      if (carouselLength === 0) return;
      else {
        carouselIndex =
          (carouselIndex + carouselLength + direction) % carouselLength;
        carouselList.classList.add("carousel-trans");
        if (
          carouselList.style.transform ===
          `translateX(${-carouselIndex * itemWidth}rem)`
        ) {
          justifyPos();
        } else {
          onTransition = true;
          carouselList.style.transform = `translateX(-${
            carouselIndex * itemWidth
          }rem)`;
        }
      }
    }, 500);
    carouselList.addEventListener("transitionend", justifyPos);
    // 轮播图定时器
    function startCaruselTimer() {
      clearInterval(carouselTimer);
      carouselTimer = setInterval(() => {
        transCarouselList(1);
      }, 5000);
    }
    $.getJSON("./assets/json/posts.json", (data) => {
      // 加载轮播图
      data.forEach((item) => {
        const li = document.createElement("li");
        li.className = "carousel-list-item";
        li.innerHTML = `<img src="${item.src}" alt="" />`;
        carouselList.appendChild(li);
      });
      if (data.length === 0) return;
      else carouselLength = data.length + 2;
      carouselList.appendChild(carouselList.children[0].cloneNode(true));
      carouselList.insertBefore(
        carouselList.children[carouselList.children.length - 2].cloneNode(true),
        carouselList.children[0]
      );
      carouselList.style.transform = `translateX(-${itemWidth}rem)`;
      carouselIndex = 1;
      startCaruselTimer();
      // 滑动轮播图
      let startX = 0;
      // 开始滑动
      carouselList.addEventListener(
        "touchstart",
        (e) => {
          if (onTransition) return;
          clearInterval(carouselTimer);
          startX = e.changedTouches[0].clientX;
        },
        { passive: true }
      );
      carouselList.addEventListener(
        "touchmove",
        (e) => {
          if (onTransition) return;
          const deltaX = startX - e.changedTouches[0].clientX;
          let offset = (deltaX / document.documentElement.clientWidth) * 10;
          offset = Math.max(
            Math.min((carouselLength - carouselIndex - 1) * itemWidth, offset),
            -carouselIndex * itemWidth
          );
          carouselList.style.transform = `translateX(-${
            carouselIndex * itemWidth + offset
          }rem)`;
        },
        { passive: true }
      );
      // 结束滑动
      carouselList.addEventListener(
        "touchend",
        (e) => {
          if (onTransition) return;
          let indexOffset = Math.round(
            (((startX - e.changedTouches[0].clientX) /
              document.documentElement.clientWidth) *
              10) /
              itemWidth
          );
          indexOffset = Math.min(
            Math.max(-carouselIndex, indexOffset),
            carouselLength - carouselIndex - 1
          );
          transCarouselList(indexOffset);
          startCaruselTimer();
        },
        { passive: true }
      );
    });
  });
})();
