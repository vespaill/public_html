/**
 * File: main.js
 * 91.461 Assignment: Creating Your First Web Page
 *
 * Victor M Espaillat, UMass Lowell Computer Science
 * victor_espaillat@student.uml.edu
 */

var debugging = false;

/**
 * page content
 */
var content = {
    intro: {
        'home.':
            'Welcome, my name is Victor M. Espaillat. I&rsquo;m a computer science major at UMass Lowell, and I am also passionate about strength training and nutrition.',
        'class.':
            'Here we have my assignments from COMP.4610: <i>&ldquo;Graphical User Interface Programming I.&rdquo;</i>',
        'projects.':
            'These are two collaborative projects from my project sequence.<br>The first from COMP.4110: <i>&ldquo;Software Engineering I,&rdquo;</i><br>the second from COMP.4120: <i>&ldquo;Software Engineering II.&rdquo;</i>'
    },
    main: {
        'home.':
            '<div id="interests"><h2>interests.</h2><article><img src="assets/images/vegetables.jpg" alt="cacao"><p>Nutrition</p></article><a class="content-link" target="_blank" href="./strengthTraining.html"><article><img src="assets/images/deadlift.png" alt="deadlift"><p>Strength Training</p></article></a><article><img src="assets/images/desktop.jpg" alt="desktop"><p>Gaming</p></article><a class="content-link" target="_blank" href="https://en.wikipedia.org/wiki/Hidetaka_Miyazaki#Works"><article><img src="assets/images/darksouls.jpg" alt="darksouls"><p>Hidetaka Miyazaki&rsquo;s Works 2009 – present</p></article></a></div>',
        'class.':
            '<div class="list"><ol><a href="GUI1/assignments/1/index.html" target="_blank"><li>Setting Up to Take This Course</li></a><a href="GUI1/assignments/2/index.html" target="_blank"><li>Creating Your First Web Page</li></a><a href="GUI1/assignments/3/index.html" target="_blank"><li>Style a Site with External CSS</li></a><a href="GUI1/assignments/4/index.html" target="_blank"><li>Styling Your First Web Page With CSS</li></a><a href="GUI1/assignments/5/HW5.pdf" target="_blank"><li>Intro to GitHub</li></a><a href="GUI1/assignments/6/index.html" target="_blank"><li>Interactive Dynamic Table styled with Boostrap</li></a><a href="GUI1/assignments/7/index.html" target="_blank"><li>Using the jQuery Validation Plugin with Your Dynamic Table</li></a><a href="GUI1/assignments/8/index.html" target="_blank"><li>Using the jQuery UI Slider and Tab Widgets</li></a><a href="GUI1/assignments/9/index.html" target="_blank"><li>Implementing a Bit of Scrabble with Drag-and-Drop</li></a></ol></div><div class="intro border-bottom border-top"><p>And here we have my in-class exersices.</p></div><div class="list"><ol><a href="GUI1/in_class_exercises/1/InClass_Clean_leture4_based.html" target="_blank"><li>Embedded/Internal CSS</li></a><a href="GUI1/in_class_exercises/2/example.html" target="_blank"><li>CSS Boxes</li></a><a href="GUI1/in_class_exercises/3/Exercise.html" target="_blank"><li>Bootstrap</li></a><li class="royalBlueBold">JavaScript</li><ul><a href="GUI1/in_class_exercises/4/example1_source/add-content.html" target="_blank"><li>Time Sensitive Greeting</li></a><a href="GUI1/in_class_exercises/4/example2_source/example.html" target="_blank"><li>Tiled Sign Cost Calculation</li></a></ul><a href="GUI1/in_class_exercises/5/string-object.html" target="_blank"><li>String Objects</li></a><a href="GUI1/in_class_exercises/6/example.html" target="_blank"><li>Modifying DOM elements</li></a></ol></div>',
        'projects.':
            '<div class="list"><ol><a href="https://vespaill.github.io/birthday-bash/"><li>Birthday Bash</li></a><a href="https://vespaill.github.io/teds-trip/"><li>Ted&rsquo;s Trip</li></a></ol></div>'
    }
};


/**
 * Removes every class from every anchor element residing in parent.
 * Assigns class 'current' to target element.
 * @param {*} parent A <ul> element,
 * @param {*} target An <a> element
 */
function updateCurNavItem(parent, target) {
    if (debugging) {
        if (parent.nodeName != 'UL' || target.nodeName != 'A') {
            console.log('updateCurrent: ');
            console.log('INVALID DOCUMENT OBJECTS!');
        }
    }

    /*  Remove class from every navbar link. */
    for (var i = 0; i < parent.children.length; ++i) {
        if (parent.children[i].firstChild.hasAttribute('class'))
            parent.children[i].firstChild.removeAttribute('class');
    }

    /* Add an attribute of class with value of 'current' to our target navbar
       link. Our CSS will then highlight this navbar link. */
    target.setAttribute('class', 'current');
}


/**
 * Updates the intro and main divs according to the given navbar link element,
 * assumed to be the target of the given event e.
 * @param {*} e event, or event target
 */
function updateContent(e) {
    var elIntro = document.getElementsByClassName('intro')[0];
    var elMain = document.getElementById('main');

    var target;
    if (e.target) {
        target = e.target;     /* Get <a> */
    } else if (e.srcElement) {
        target = e.srcElement; /* IE fallback */
    } else {
        target = e;            /* Assume e is already equal to target element */
    }

    var targetText = target.textContent;      /* Get <a> text content */
    var el_ul = target.parentNode.parentNode; /* Get <ul> */

    if (debugging) {
        console.log('updateContent: ');
        console.log('target: ');
        console.log(target);
        console.log('target.textContent: ');
        console.log(target.textContent);
        console.log('el_ul.children: ');
        console.log(el_ul.children);
    }

    /* Update content based on clicked navbar item. */
    if (content.intro[targetText]) { /* If the content is valid */

        if (debugging) console.log('Valid nav element');

        updateCurNavItem(el_ul, target);

        /*  */
        elIntro.innerHTML = '<p>' + content.intro[targetText] + '</p>';
        elMain.innerHTML = content.main[targetText];
    }

    /* Prevent the link from taking you elsewhere */
    if (e.preventDefault) {
        /* If preventDefault() works */
        e.preventDefault(); /* Use preventDefault() */
    } else {
        e.returnValue = false; /* Use old IE version */
    }
}


/**
 * Selects the first navbar link (the home link) and updates the page
 * accordingly.
 *
 * Sets up event listener for the navbar. Based on the specific navbar link that
 * has been clicked, the page is updated accordingly.
 */
function setup() {
    /* Get the first navbar link. */
    var el_first_nav_el_link = document.getElementById('navbar')
        .firstChild
        .nextSibling
        .firstChild;

    updateContent(el_first_nav_el_link);

    if (debugging) {
        console.log('el_first_nav_el_link: ');
        console.log(el_first_nav_el_link);
    }

    var el = document.getElementById('navbar');
    el.addEventListener('click', function (e) {
        updateContent(e);
    }, false );
}


/**
 * Initialize the page to start on the 'home.' page.
 */
window.addEventListener(
    'load',
    function () {
        setup();
    },
    false
);
