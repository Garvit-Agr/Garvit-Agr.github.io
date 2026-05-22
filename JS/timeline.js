const timeline=document.getElementById("list");
let prev_li=null;

timeline.addEventListener("click", (event) => {
    let btn=event.target.closest("button");
    if (btn==null) return;

    const li=btn.parentElement;
    const expanded=(li.querySelector("div").style.maxHeight==="400px");

    if(prev_li!==null) {
        prev_li.querySelector("div").style.maxHeight="0px";
        prev_li.querySelector("button").querySelector("span:last-child").textContent="▼";
        prev_li.querySelector("button").setAttribute("aria-expanded","false");
        prev_li=null;
    }

    if (!expanded) {
        li.querySelector("div").style.maxHeight ="400px";
        li.querySelector("button").querySelector("span:last-child").textContent="▲";
        li.querySelector("button").setAttribute("aria-expanded", "true");
        prev_li=li;
    }
});





