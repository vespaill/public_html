/*******************************************************************************
**    File: example.js                                                        **
**                                                                            **
**    91.461 In-Class Exercise: #6                                            **
**                                                                            **
**    Victor M Espaillat, UMass Lowell Computer Science,                      **
**    victor_espaillat@student.uml.edu                                        **
**                                                                            **
/*******************************************************************************
**                        ADD NEW ITEM TO END OF LIST                         **
*******************************************************************************/

// Define new list element and set its text to 'cream'.
var cream_elem = document.createElement('li');
var text_node = document.createTextNode('cream');
cream_elem.appendChild(text_node);

/* Insert it before the next sibling of the last child of the unordered list.
   i.e.: insert it after the last child of the unordered list. */
var ul_elem = document.getElementsByTagName('ul')[0];
ul_elem.insertBefore(cream_elem, ul_elem.lastChild.nextSibling);


/*******************************************************************************
**                         ADD NEW ITEM START OF LIST                         **
*******************************************************************************/

// Define new list element and set its text to 'kale'.
var kale_elem = document.createElement('li');
text_node = document.createTextNode('kale');
kale_elem.appendChild(text_node);

// Insert it before the first child of the unordered list.
ul_elem.insertBefore(kale_elem, ul_elem.firstChild);


/*******************************************************************************
**                   ADD A CLASS OF COOL TO ALL LIST ITEMS                    **
*******************************************************************************/

// Grab all the list elements and the count of them.
var li_elems = document.getElementsByTagName('li');
var num_items = li_elems.length;
console.log("li_elems.length: " + num_items);

// Iterate through all the list elements and add a class of 'cool' to each.
var i;
for (i = 0; i < num_items; ++i) {
    li_elems[i].setAttribute('class', 'cool');
}


/*******************************************************************************
**               ADD NUMBER OF ITEMS IN THE LIST TO THE HEADING               **
*******************************************************************************/

// Create a span element with the number of items inside.
var span_elem = document.createElement('span');
text_node = document.createTextNode(num_items);
span_elem.appendChild(text_node);

/* Insert it into h2, but it must come after any text that may already be in
   there. */
var h2_elem = document.getElementsByTagName('h2')[0];
h2_elem.appendChild(span_elem);
console.log(h2_elem);