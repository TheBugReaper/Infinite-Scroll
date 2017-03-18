/**
 * Created by linjunru on 2017/3/18.
 */
/*Compatibility Settings*/
window.addEventListener = (window.addEventListener) ? window.addEventListener : window.attachEvent;
addEventListener = addEventListener ? addEventListener : attachEvent;

adding = false;     //to ensure the page only load once after an event is emitted

/**
 * Add EventListener to the mousewhieel event of the document.
 * Use
 * <code> window.pageYOffset + window.innerHeight > document.body.offsetHeight <code>
 * to judge whether it is the right time to add new items.
 */
function addInfiniteScrollControl(){
    window.addEventListener("mousewheel", function(e){
        var event = e ? e : window.e;
        if (window.pageYOffset + window.innerHeight > document.body.offsetHeight){
            if (event.wheelDelta < 0){
                //Add contents
                if(!adding){
                    adding = true;
                    var classes = document.getElementById("preload-block").classList;
                    classes.remove("still");
                    classes.add("active");
                    setTimeout(function(){
                        for (var i =0; i<20; i++){
                            addItem();
                        }
                        adding = false;
                        var classes = document.getElementById("preload-block").classList;
                        classes.remove("active");
                        classes.add("still");
                    }, 3000);
                }
            }
        }
    })
}

/**
 * Add an new item to the waterfall structure.
 * The new item will be added to the shortest column measured by scrollheight.
 */
function addItem(){
    var cols = document.getElementsByClassName("waterfall-col");
    var newItem = createItem();
    var i, min = cols[0].scrollHeight, index = 0;
    for (i=1; i<cols.length; i++){
        if (cols[i].scrollHeight < min){
            index = i;
            min =cols[i].scrollHeight;
        }
    }
    cols[index].appendChild(newItem);
}

/**
 * Create an new Item, the pic will be selected randomly.
 * @returns {HTMLElement}
 */
function createItem(){
    var num = Math.random() * 17 + 1;
    num = Math.floor(num);
    var src = "img/" + num + ".jpg";
    var itemBlock = document.createElement("div");
    itemBlock.classList.add("item-block");
    var itemTitle = document.createElement("div");
    itemTitle.classList.add("item-title");
    var itemImg = document.createElement("div");
    itemImg.classList.add("item-img");
    var img = document.createElement("img");
    img.src = src;
    itemImg.appendChild(img);
    var itemIntro = document.createElement("div");
    itemIntro.classList.add("item-intro");
    itemBlock.appendChild(itemTitle);
    itemBlock.appendChild(itemImg);
    itemBlock.appendChild(itemIntro);
    return itemBlock;
}

addInfiniteScrollControl();
