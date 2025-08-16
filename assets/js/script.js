// tocの読み込み
const ulTag = document.createElement("ul");
const anchors = document.querySelectorAll("[data-name]");
anchors.forEach(anchor => {
    let newA = document.createElement("a");
    newA.textContent = anchor.dataset.name;
    newA.addEventListener("click", (e) => {
        e.preventDefault();
        document.getElementById(anchor.id).scrollIntoView({ behavior: "smooth", block: "start" });
    })
    let newLi = document.createElement("li");
    newLi.appendChild(newA);
    ulTag.appendChild(newLi);
})

const tocContents = ulTag;

document.getElementById("toc").innerHTML = "";
document.getElementById("toc").appendChild(tocContents);


// ハンバーガーメニュー
const navi = document.getElementById('navi');
const toc = document.getElementById('toc');
const overlay = document.getElementById('overlay');

document.getElementById('menuBtn').addEventListener('click', () => {
    navi.classList.toggle('open');
    if (navi.classList.contains('open')) {
        overlay.classList.add('show');
    } else {
        overlay.classList.remove('show');
    }
});

document.getElementById('tocBtn').addEventListener('click', () => {
    toc.classList.toggle('open');
    if (toc.classList.contains('open')) {
        overlay.classList.add('show');
    } else {
        overlay.classList.remove('show');
    }
});

overlay.addEventListener('click', () => {
    navi.classList.remove('open');
    toc.classList.remove('open');
    overlay.classList.remove('show');
});