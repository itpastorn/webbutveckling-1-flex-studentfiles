( () => {
    // ES 6 arrow function
    var pcells = document.querySelectorAll("td:last-child");
    for (var pc of pcells ) {
        var sp = pc.previousElementSibling;
        var vp = sp.previousElementSibling;
        pc.innerHTML = +vp.innerText + +sp.innerText;
    }
})(); // Self executing function
