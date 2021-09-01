position();
function position() {
    let container = document.getElementById('container');
    let images = document.getElementsByTagName('img');

    let heightArr = [];

    let windowWidth = window.innerWidth;
    let imgWidth = images[0].offsetWidth;
    let num = Math.floor(windowWidth / imgWidth);
    
    container.style.width = num * imgWidth + "px";
  
    for (let i = 0; i < num; i++) {
        let height = images[i].offsetHeight;
        heightArr.push(height);
        images[i].style.position = "absolute";
        images[i].style.left = i * imgWidth + "px";
        images[i].style.top = 0;
    }

    for (let i = num; i < images.length; i++) {
        let height = images[i].offsetHeight;
        let minHeight = Math.min.apply(window, heightArr);
        let heightIndex = heightArr.indexOf(minHeight);
        images[i].style.position = "absolute";
        images[i].style.left = heightIndex * imgWidth + "px";
        images[i].style.top = minHeight + "px";
        heightArr[heightIndex] += height;
    }
}

window.onscroll = function () {
    let container = document.getElementById('container');
    let windowHeight = window.innerHeight;
    let documentHeight = $(document).height();
    let scrolltop = document.body.scrollTop;
    if (documentHeight - 100 <= windowHeight + scrolltop) {
        for (let i = 1; i < 11; i++) {
            let img = document.createElement('img');
            img.src = `images/${i}.jpg`;
            container.appendChild(img);
        }
        position();
    }
};

window.onresize = function () {
    position();
};