( () => {
    // ES 6 arrow function
    var pcells = document.querySelectorAll("td:last-child");
    // Variabeln pcells är en array med de sista cellerna i varje rad
    // Loopa igenom denna array
    for (var pc of pcells ) {
        // pc är en enskild cell i listan
        // sp är cellen före, semantikpoängen
        var sp = pc.previousElementSibling;
        // vp är cellen före sp, valideringspoängen
        var vp = sp.previousElementSibling;
        // Summera värdet matematiskt
        // De extra plustecknen förhindrar att "7" + "8" = "78"
        // utan att det blir 7 + 8 = 15
        // Lagra summan som text i cellen pc
        pc.innerText = +vp.innerText + +sp.innerText;
    }
})(); // Self executing function
