document.addEventListener("DOMContentLoaded", (event) => {
    let input = document.getElementById("myInput");
    
    function myFunction() {
        var filter, ul, li, a, i, txtValue;
        // input = document.getElementById("myInput");
        filter = input.value.toUpperCase();
        roomWrapper = document.getElementById("myUL");
        innerWrapper = roomWrapper.getElementsByClassName("room-container");
        for (i = 0; i < innerWrapper.length; i++) {
            a = innerWrapper[i].getElementsByTagName("a")[0];
            txtValue = a.textContent || a.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                innerWrapper[i].style.display = "";
            } else {
                innerWrapper[i].style.display = "none";
            }
        }
    }


    input.addEventListener("keyup", () => {
        myFunction();
    });
}); 