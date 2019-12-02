var today = new Date();
var hourNow = today.getHours();
var greeting;

if (hourNow >= 0 && hourNow < 12)
    greeting = 'Morning';
else if (hourNow >= 12 && hourNow < 18)
    greeting = 'Afternoon';
else if (hourNow >= 18 && hourNow < 24)
    greeting = 'Evening';
else
    greeting = 'Welcome';

document.write('<h3>' + greeting + '</h3>');
