const body=document.body;
const nav=document.getElementById("navbar");
const progress=document.querySelector(".progress");
const menuToggle=document.getElementById("menuToggle");
const navLinks=document.getElementById("navLinks");
const themeToggle=document.getElementById("themeToggle");

window.addEventListener("scroll",()=>{
  nav.classList.toggle("scrolled",window.scrollY>20);
  const max=Math.max(1,document.documentElement.scrollHeight-window.innerHeight);
  progress.style.width=(window.scrollY/max*100)+"%";
});

menuToggle?.addEventListener("click",()=>navLinks.classList.toggle("open"));
navLinks?.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>navLinks.classList.remove("open")));

const savedTheme=localStorage.getItem("banu-theme");
if(savedTheme==="dark") body.classList.add("dark");
themeToggle.textContent=body.classList.contains("dark")?"☀":"☾";
themeToggle.addEventListener("click",()=>{
  body.classList.toggle("dark");
  const dark=body.classList.contains("dark");
  localStorage.setItem("banu-theme",dark?"dark":"light");
  themeToggle.textContent=dark?"☀":"☾";
});

const observer=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{if(entry.isIntersecting) entry.target.classList.add("visible")});
},{threshold:.1});
document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));

const filters=document.querySelectorAll(".filter");
const cards=document.querySelectorAll(".project-card");
filters.forEach(button=>{
  button.addEventListener("click",()=>{
    filters.forEach(b=>b.classList.remove("active"));
    button.classList.add("active");
    const filter=button.dataset.filter;
    cards.forEach(card=>{
      card.classList.toggle("hidden",filter!=="all" && card.dataset.category!==filter);
    });
  });
});
