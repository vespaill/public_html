/*******************************************************************************
**    File: main.js                                                           **
**                                                                            **
**    91.461 Assignment: Creating Your First Web Page                         **
**                                                                            **
**    Victor M Espaillat, UMass Lowell Computer Science,                      **
**    victor_espaillat@student.uml.edu                                        **
*******************************************************************************/

var debugging = false;

var content = {
    intro : {
        index: "Welcome, my name is Victor M. Espaillat. I&rsquo;m a computer science major at UMass Lowell, and I am also passionate about strength training and nutrition.",
        gui1: "Here we have my assignments from COMP.4610: <i>&ldquo;Graphical User Interface Programming I.&rdquo;</i>",
        proj: "These are two collaborative projects from my project sequence.<br>The first from COMP.4110: <i>&ldquo;Software Engineering I,&rdquo;</i><br>the second from COMP.4120: <i>&ldquo;Software Engineering II.&rdquo;</i>"
    },

    main : {
        index: "<div id='interests'><h2>interests.</h2><a href='#' onclick='return!1'><article><img src='media/images/cacao.jpg' alt='cacao'><p>Nutrition</p></article></a><a href='#' onclick='return!1'><article><img src='media/images/desktop.jpg' alt='desktop'><p>PC Gaming</p></article></a><a href='#' onclick='return!1'><article><img src='media/images/darksouls.jpg' alt='darksouls'><p>Soulsbornekiro</p></article></a><a href='#' onclick='return!1'><article><img src='media/images/deadlift.png' alt='deadlift'><p>Strength Training</p></article></a></div>",
        gui1: "<div class='list'><ol><li>Setting Up to Take This Course</li><li>Creating Your First Web Page</li><a href='assignments/3/index.html'><li>Style a Site with External CSS</li></a><li>Styling Your First Web Page With CSS</li><li>Intro to GitHub</li><a href='assignments/6/index.html'><li>Interactive Dynamic Table</li></a></ol></div><div class='intro border-bottom border-top'><p>And here we have my in-class exersices.</p></div><div class='list'><ol><a href='in_class_exercises/6/example.html'><li value='6'>Modifying DOM elements</li></a></ol></div>",
        proj: "<div class='list'><ol><a href='https://mmarkman.github.io/comp-4110-js-game/'><li>Birthday Bash</li></a><a href='https://mmarkman.github.io/teds-trip/'><li>Ted&rsquo;s Trip</li></a></ol></div>"
    }
}

function getTarget(e) {
    if (!e) {                                       // If there is no event object
        e = window.event;                           // Use old IE event object
    }
    return e.target || e.srcElement;                // Get the target of event
}

function updateCurrent(el_ul, target) {
    for (var i = 0; i < el_ul.children.length; ++i) {
        if (el_ul.children[i].firstChild.hasAttribute('class'))
            el_ul.children[i].firstChild.removeAttribute('class');
    }
    target.setAttribute('class', 'current');
}

function updateContent(e) {
    var elIntro = document.getElementsByClassName('intro')[0];
    var elMain = document.getElementById('main');

    var target;
    if (e.target) {
        target = getTarget(e);                      // Get <a>
    } else {
        target = e;
    }
    var targetText = target.textContent;            // Get <a> text content
    var el_ul = target.parentNode.parentNode;       // Get <ul>

    if (debugging) {
        console.log(target);
        console.log(target.textContent);
        console.log(el_ul.children);
    }

    switch (targetText) {
        case 'home.':
            updateCurrent(el_ul, target);
            elIntro.innerHTML = '<p>' + content.intro.index + '</p>';
            elMain.innerHTML = content.main.index;
            break;

        case 'class.':
            updateCurrent(el_ul, target);
            target.className = 'current';
            elIntro.innerHTML = '<p>' + content.intro.gui1 + '</p>';
            elMain.innerHTML = content.main.gui1;
            break;

        case 'projects.':
            updateCurrent(el_ul, target);
            target.className = 'current';
            elIntro.innerHTML = '<p>' + content.intro.proj + '</p>';
            elMain.innerHTML = content.main.proj;
            break;
    }

    // Prevent the link from taking you elsewhere
    if (e.preventDefault) {                         // If preventDefault() works
        e.preventDefault();                         // Use preventDefault()
    } else {                                        // Otherwise
        e.returnValue = false;                      // Use old IE version
    }
}

var el_body = document.getElementById('page');
if (debugging) console.log('el_body: ');
if (debugging) console.log(el_body);

var el_first_nav_el = document.getElementById('navbar').firstChild.nextSibling.firstChild;
if (debugging) console.log('el_first_nav_el ');
if (debugging) console.log(el_first_nav_el);

function howdy() {
    console.log('Howdy');
}

window.addEventListener('load', function() {
    updateContent(el_first_nav_el);
}, false);



// Set up event listeners to call updateContent() on click
var el = document.getElementById('navbar');         // Get navbar list
el.addEventListener('click', function(e) {      // Add listener on click
    updateContent(e);                           // It calls updateContent()
}, false);                                      // Use bubbling phase for flow
