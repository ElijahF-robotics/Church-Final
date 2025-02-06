// Custom code for mobile
let mobileCode = "<img id=\"image\" src=\"img/FlameInCircle.png\" class=\"flameImage\">\n" +
                        "<div class=\"HSection spaceAround\" style=\"flex-direction: row;\">\n" +
                        "    <a id=\"button1\"><button class=\"custom-button\">Watch Now</button></a>\n" +
                        "    <a id=\"button2\" href=\"give.html\"><button class=\"custom-button\">Give</button></a>\n" +
                        "</div>"

// Custom code for desktop
let desktopCode = "<img id=\"image\" src=\"img/FlameInCircle.png\" class=\"flameImage\">\n" +
                         "<a id=\"button1\"><button class=\"custom-button\">Watch Now</button></a>\n" +
                         "<a id=\"button2\" href=\"give.html\"><button class=\"custom-button\">Give</button></a>"

// If on mobile
if (/Mobi|Android/i.test(navigator.userAgent)) {
    document.getElementById("doubleButton").innterHTML = mobileCode
} else {    // Else if on desktop
    document.getElementById("doubleButton").innerHTML = desktopCode;
}