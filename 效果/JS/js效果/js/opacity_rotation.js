window.onload = function () {
    let img = document.getElementsByTagName("img");
    let num = 0;
    setInterval(move, 2000);
    function move() {
        num++;
        if (num >= img.length) {
            num = 0;
        }
        //opacity 0 -> 0.3 -> 1
        for (let i = 0; i < img.length; i++) {
            for (let j = 0; j < img.length; j++) {
                img[j].style.opacity = 0;
                if (num - 1 == -1) {
                    animate(img[0], {opacity: 0}, 800);
                } else {
                    animate(img[num - 1], {opacity: 0}, 800);
                }
                img[num].style.opacity =0.3;
            }
            animate(img[num], {opacity: 1}, 1000);
        }
    }
}
