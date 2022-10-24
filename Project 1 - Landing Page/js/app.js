
let sections = document.querySelectorAll('.section');
let links;

document.getElementById("container").addEventListener("wheel", onScrollWheel);
let upBtn = document.getElementById("upBtn");

function loadNavbar() {
    createNavbar();
    setLinks();
    assignClassesToAnchorElements();
}

function createNavbar() {
    let navbar = document.getElementById("navbar");
    let ul = document.createElement("ul");
    //This ul is reveresed becase of float right property in css
    for (let i = sections.length; i > 0; i--) {
        let li = document.createElement('li');
        let anchorElement = document.createElement("a");
        let hrefOfA = `#section${i}`;
        let innerAnchor = `Section ${i}`
        anchorElement.innerHTML = (innerAnchor);
        anchorElement.href = hrefOfA;
        anchorElement.classList.add("links");
        li.appendChild(anchorElement);
        ul.appendChild(li);
    }
    navbar.appendChild(ul);
}

function setLinks() {
    links = document.querySelectorAll('.links');
}

window.onscroll = function () { scrollFunction() };

function scrollFunction() {
    let height = window.scrollY;
    if (document.body.scrollTop > 20 || height > 4000) {
        upBtn.style.display = "block";
    } else {
        upBtn.style.display = "none";
    }
}

function assignClassesToAnchorElements() {
    for (let i = 0; i < links.length; i++) {
        links[i].addEventListener("click", function (event) {
            activeLink(this);
            event.preventDefault(); 
        });
        
    }
}

function activeLink(li) {
    removeActiveLinks();
    li.classList.add('active');
    const href = li.getAttribute("href");
    let section = document.querySelector(`#${href.split("#")[1]}`);
    let navbarHeader = 60;
    let sectionPosition =section.getBoundingClientRect().top; 
    let offsetTop = sectionPosition + window.scrollY - navbarHeader; 
    section.scrollIntoView({
        top:offsetTop,
        behavior:"smooth"
    });
    
}


function onScrollWheel() {
    sections.forEach(section => {
        let top = window.scrollY;
        //60 is the height of the navbar
        let offset = section.offsetTop - 60;
        let height = section.offsetHeight;
        let id = section.getAttribute('id');

        if (top >= offset && top < offset + height) {
            const target = document.querySelector(`[href='#${id}']`);
            activeLink(target);
        }
        //when it hits top page active links will be removed
        else if (top <= 250)
            removeActiveLinks()
    })

}

function removeActiveLinks() {
    let currentLink = document.getElementsByClassName("active");
    if (currentLink.length > 0)
        currentLink[0].className = currentLink[0].className.replace("active", "");
}

function toUpFunction() {
    removeActiveLinks();
    document.documentElement.scrollIntoView({
        top:0,
        behavior:"smooth"
    }) 
}
