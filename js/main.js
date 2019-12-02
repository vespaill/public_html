/*******************************************************************************
**    File: main.js                                                           **
**                                                                            **
**    91.461 Assignment: Creating Your First Web Page                         **
**                                                                            **
**    Victor M Espaillat, UMass Lowell Computer Science,                      **
**    victor_espaillat@student.uml.edu                                        **
*******************************************************************************/

var debugging = false;

// To hold the multiple pages' content.
var content = {
    intro : {
        'home.'     : "Welcome, my name is Victor M. Espaillat. I&rsquo;m a computer science major at UMass Lowell, and I am also passionate about strength training and nutrition.",
        'class.'    : "Here we have my assignments from COMP.4610: <i>&ldquo;Graphical User Interface Programming I.&rdquo;</i>",
        'projects.' : "These are two collaborative projects from my project sequence.<br>The first from COMP.4110: <i>&ldquo;Software Engineering I,&rdquo;</i><br>the second from COMP.4120: <i>&ldquo;Software Engineering II.&rdquo;</i>"
    },
    main : {
        'home.'     : "<div id='interests'><h2>interests.</h2><a href='#' onclick='return!1'><article><img src='media/images/cacao.jpg' alt='cacao'><p>Nutrition</p></article></a><a href='#' onclick='return!1'><article><img src='media/images/desktop.jpg' alt='desktop'><p>PC Gaming</p></article></a><a href='#' onclick='return!1'><article><img src='media/images/darksouls.jpg' alt='darksouls'><p>Soulsbornekiro</p></article></a><a href='#' onclick='return!1'><article><img src='media/images/deadlift.png' alt='deadlift'><p>Strength Training</p></article></a></div>",
        'class.'    : "<div class='list'><ol><li>Setting Up to Take This Course</li><li>Creating Your First Web Page</li><a href='assignments/3/index.html'><li>Style a Site with External CSS</li></a><li>Styling Your First Web Page With CSS</li><li>Intro to GitHub</li><a href='assignments/6/index.html'><li>Interactive Dynamic Table</li></a><a href='assignments/7/index.html'><li>Using the jQuery Validation Plugin with Your Dynamic Table</li></a></ol></div><div class='intro border-bottom border-top'><p>And here we have my in-class exersices.</p></div><div class='list'><ol><a href='in_class_exercises/6/example.html'><li value='6'>Modifying DOM elements</li></a></ol></div>",
       'projects.' : "<div class='list'><ol><a href='https://mmarkman.github.io/comp-4110-js-game/'><li>Birthday Bash</li></a><a href='https://mmarkman.github.io/teds-trip/'><li>Ted&rsquo;s Trip</li></a></ol></div>"
    }
}

/*******************************************************************************
**    Input:                                                                  **
**         el_ul: an <ul> element,                                            **
**        target: an <a> element                                              **
**                                                                            **
**    Output:                                                                 **
**        The class of every <a> within each <li> in el_ul will be removed.   **
**        The target <a> element will be given a class of 'current.'          **
*******************************************************************************/
function updateCurrent(el_ul, target) {
    if (debugging) {
        if (el_ul.nodeName != 'UL' || target.nodeName != 'A') {
            console.log('updateCurrent: ');
            console.log('INVALID DOCUMENT OBJECTS!');
        }
    }
    // Remove class from every navbar link.
    for (var i = 0; i < el_ul.children.length; ++i) {
        if (el_ul.children[i].firstChild.hasAttribute('class'))
            el_ul.children[i].firstChild.removeAttribute('class');
    }
    /* Add an attribute of class with value of 'current' to our target navbar
       link. Our CSS will then highlight this navbar link. */
    target.setAttribute('class', 'current');
}

/*******************************************************************************
**    Input:                                                                  **
**        e: event, or event target                                           **
**                                                                            **
**    Output:                                                                 **
**        The intro and main divs will be updated according to the given      **
**        navbar link element, assumed to be the target of the given event    **
**        e.                                                                  **
*******************************************************************************/
function updateContent(e) {
    var elIntro = document.getElementsByClassName('intro')[0];
    var elMain = document.getElementById('main');

    var target;
    if (e.target) {
        target = e.target;                          // Get <a>
    } else if (e.srcElement) {
        target = e.srcElement;                      // IE fallback
    } else {
        target = e;                                 // Assume e is already equal
    }                                               // to the target element

    var targetText = target.textContent;            // Get <a> text content
    var el_ul = target.parentNode.parentNode;       // Get <ul>

    if (debugging) {
        console.log('updateContent: ');
        console.log('target: ');
        console.log(target);
        console.log('target.textContent: ');
        console.log(target.textContent);
        console.log('el_ul.children: ');
        console.log(el_ul.children);
    }

    // Update content based on clicked navbar item.
    if (content.intro[targetText]) {                // If the content is valid
        if (debugging) console.log('Valid nav element');
        updateCurrent(el_ul, target);
        elIntro.innerHTML = '<p>' + content.intro[targetText] + '</p>';
        elMain.innerHTML = content.main[targetText];
    }

    // Prevent the link from taking you elsewhere
    if (e.preventDefault) {                         // If preventDefault() works
        e.preventDefault();                         // Use preventDefault()
    } else {                                        // Otherwise
        e.returnValue = false;                      // Use old IE version
    }
}

/*******************************************************************************
**    Selects the first navbar link (the home link) and updates the page      **
**    accordingly.                                                            **
**                                                                            **
**    Sets up event listener for the navbar. Based on the specific navbar     **
**    link that has been clicked, the page is updated accordingly.            **
*******************************************************************************/
function setup() {
    // Get the first navbar link.
    var el_first_nav_el_link
        = document.getElementById('navbar').firstChild.nextSibling.firstChild;
    updateContent(el_first_nav_el_link);

    if (debugging) {
        console.log('el_first_nav_el_link: ');
        console.log(el_first_nav_el_link);
    }

    // Set up event listener to call updateContent() on click
    var el = document.getElementById('navbar'); // Get navbar list
    el.addEventListener('click', function(e) {  // Add listener on click
        updateContent(e);                       // It calls updateContent()
    }, false);                                  // Use bubbling phase for flow
}/********************************* End setup *********************************/

// Initialize the page to start on the 'home.' page.
window.addEventListener('load', function() {
    setup();
}, false);