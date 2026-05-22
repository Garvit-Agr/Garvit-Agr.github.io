const filter_list=document.querySelector(".filter-list");
const clr_btn=document.getElementById("clrBtn");
const proj_box=document.querySelectorAll(".project-box");
const no_match=document.getElementById("noMatch");

let active_tag=[];

function applyFilter() {
    filter_list.querySelectorAll("button").forEach(btn => {
        const tag=btn.textContent.trim().toLowerCase();
        btn.setAttribute("aria-pressed", active_tag.includes(tag).toString());
    });


    let count=0;

    proj_box.forEach(card => {
        let cardTags=[];
        let listItems=card.querySelectorAll("ul li");

        for (let i=0;i<listItems.length;i++) {
            cardTags.push(listItems[i].textContent.trim().toLowerCase());
        }

        let matches=true; 
        if (active_tag.length > 0) {
            for (let i=0;i<active_tag.length;i++) {
                if (!cardTags.includes(active_tag[i])) {
                    matches=false;
                    break;
                }
            }
        }

        card.style.display=matches ? "" : "none";
        if (matches) count++;
    });

    no_match.style.display = (count===0) ? "block" : "none";
};

function updateURL() {
    const url=new URL(window.location);
    if (active_tag.length===0) {
        url.searchParams.delete("tags");
    } else {
        url.searchParams.set("tags", active_tag.join(","));
    }
    window.history.pushState({ tags: active_tag }, "", url);
};

filter_list.addEventListener("click", (event) => {
    const btn=event.target.closest("button");
    if (!btn) return;

    const tag=btn.textContent.trim().toLowerCase();
    
    if (active_tag.includes(tag)) {
        active_tag=active_tag.filter(t => t!==tag);
    } else {
        active_tag.push(tag);
    }

    applyFilter();
    updateURL();
});

clr_btn.addEventListener("click", () => {
    active_tag=[];

    applyFilter();
    updateURL();
});

window.addEventListener("popstate", (event) => {
    if (event.state && event.state.tags) {
        active_tag=event.state.tags;
    } else {
        active_tag=[];
    }

    applyFilter();
});

const initial_tags=new URLSearchParams(window.location.search).get("tags");
if (initial_tags) {
    active_tag=initial_tags.split(",");
    active_tag=active_tag.filter(t => t.trim()!=="");
}

applyFilter();






