var canUseLenis = true


function compare(pageName) {
    String(pageName)
    console.log('Comparing page:', pageName);
    var compareSeventh = document.querySelector(".compareSeventh");
    console.log(compareSeventh)
    var compareEighth = document.querySelector(".compareEighth");
    console.log(compareEighth)
    // https://stackoverflow.com/questions/7312553/change-image-source-with-javascript
    compareSeventh.src = `img/${pageName}_seventh.jpeg`
    compareEighth.src = `img/${pageName}_eighth.jpeg`
}