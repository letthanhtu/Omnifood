console.log("Hello world!");

//////////////////////////////////////////////
// Make mobile navigation work 
const btnNavEl = document.querySelector(".btn-mobile-nav");
const headerEl = document.querySelector(".header");

btnNavEl.addEventListener('click', function() {
  headerEl.classList.toggle("nav-open");
});


//////////////////////////////////////////////
// Smooth scrolling animation 
//https://unpkg.com/smoothscroll-polyfill@0.4.4/dist/smoothscroll.min.js
const allLinks = document.querySelectorAll('a:link');

allLinks.forEach(function (link){
  link.addEventListener("click", function(e){
    e.preventDefault();
    const href = link.getAttribute("href");
   

    // Scroll back to stop
    if(href === "#") 
      window.scrollTo({
    top: 0,
    behavior: "smooth",
    });

    // Scroll to other links 
    if ( href != "#" && href.startsWith('#')){
      const sectionEl = document.querySelector(href);
      sectionEl.scrollIntoView({behavior: "smooth"}); // 
    }

    // Close mobile naviggation
    if(link.classList.contains("main-nav-link"))
      headerEl.classList.toggle("nav-open");

  });
});



//////////////////////////////////////////////
// Sticky navigation

const sectionHeroEl = document.querySelector(".section-hero");

const obs = new IntersectionObserver(function(entries) {
  const ent = entries [0];
  console.log(ent);
  if(ent.isIntersecting === false) {
    document.body.classList.add("sticky");
  }

  if(ent.isIntersecting === true) {
    document.body.classList.remove("sticky");
  }
},

{
  root: null,
  threshold: 0,
  rootMargin: '-80px',
});
obs.observe(sectionHeroEl);


///////////////////////////////////////////////////////////
// Fixing flexbox gap property missing in some Safari versions
function checkFlexGap() {
  var flex = document.createElement("div");
  flex.style.display = "flex";
  flex.style.flexDirection = "column";
  flex.style.rowGap = "1px";

  flex.appendChild(document.createElement("div"));
  flex.appendChild(document.createElement("div"));

  document.body.appendChild(flex);
  var isSupported = flex.scrollHeight === 1;
  flex.parentNode.removeChild(flex);
  console.log(isSupported);

  if (!isSupported) document.body.classList.add("no-flexbox-gap");
}
checkFlexGap();


///////////////////////////////////////////////////////////
// IMAGE OPTIMIZATIONS (tối ưu hoá ảnh)
///////////////////////////////////////////////////////////

/* 1. Kích thước tệp hình ảnh phải luôn gấp đôi kích thước show trên màn hình 
 Vì những màn hình mật độ cao này thực sự cần hai pixel của hình ảnh để hiển thị một pixel trong thiết kế. 

2. - Kiểm tra bộ kích thước của trang -> Network -> Disable Cache -> Load lại Page
   - Thấy kích thước transfered quá lớn ví dụ 3.9 MB 
   - Giải Pháp: công cụ nén hình ảnh -> ứng dụng "squoosh" 
      +) Tải hình ảnh heroo lên -> chọn oxiPNG -> download ảnh tên file: hero-min.png -> Thay ảnh heroo trong html thấy kt nhỏ hơn
      (Nhưng cách này vẫn chưa được)
      +) Chọn WebP : kéo tới 90% -> tải ảnh xuống có tên là: heroo.webp
      (Cách này vẫn chưa thấy ảnh đc giải nén)
      +) Sử dụng HTML (rows 97): element <picture> <source /> <source /></picture>
 */
