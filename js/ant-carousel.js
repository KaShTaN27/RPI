function Ant(crslId) {

    let id = document.getElementById(crslId);
    if(id) {
        this.crslRoot = id
    }
    else {
        this.crslRoot = document.querySelector('.sliderCenter')
    };

    // Carousel objects
    this.crslList = this.crslRoot.querySelector('.weAreAtlT');
    this.crslElements = this.crslList.querySelectorAll('.slider-element');
    this.crslElemFirst = this.crslList.querySelector('.slider-element');
    this.leftArrow = this.crslRoot.querySelector('div.slider-button-left');
    this.rightArrow = this.crslRoot.querySelector('div.slider-button-right');

    // Initialization
    this.options = Ant.defaults;
    Ant.initialize(this)
};

Ant.defaults = {

    // Default options for the carousel
    elemVisible: 1, // Кол-во отображаемых элементов в карусели
    loop: true,     // Бесконечное зацикливание карусели
    auto: true,     // Автоматическая прокрутка
    interval: 5000, // Интервал между прокруткой элементов (мс)
    speed: 750,     // Скорость анимации (мс)
    touch: true,    // Прокрутка  прикосновением
    arrows: true,   // Прокрутка стрелками
};

Ant.initialize = function(that) {

    // Constants
    that.elemCount = that.crslElements.length; // Количество элементов
    let elemStyle = window.getComputedStyle(that.crslElemFirst);
    that.elemWidth = that.crslElemFirst.offsetWidth +  // Ширина элемента (без margin)
        parseInt(elemStyle.marginLeft) + parseInt(elemStyle.marginRight);

    // Variables
    that.currentElement = 0; that.currentOffset = 0;
    let bgTime = getTime();
    that.touchPrev = true; that.touchNext = true;

    //Functions
    function getTime() {
        return new Date().getTime();
    };
    function setAutoScroll() {
        that.autoScroll = setInterval(function() {
            let fnTime = getTime();
            if(fnTime - bgTime + 10 > that.options.interval) {
                bgTime = fnTime; that.elemNext()
            }
        }, that.options.interval)
    };

    // Start initialization
    if(that.elemCount <= that.options.elemVisible) {   // Отключить навигацию
        that.options.auto = false;
        that.leftArrow.style.display = 'none'; that.rightArrow.style.display = 'none'
    };

    if(!that.options.loop) {       // если нет цикла - уточнить количество точек
        that.leftArrow.style.opacity = '0.5';  // отключить левую стрелку
        that.touchPrev = false;
        that.options.auto = false; // отключить автопркрутку
    }
    else if(that.options.auto) {   // инициализация автопрокруки
        setAutoScroll();
        // Остановка прокрутки при наведении мыши на элемент
        that.crslList.addEventListener('mouseenter', function() {
            clearInterval(that.autoScroll)
        }, false);
        that.crslList.addEventListener('mouseleave', setAutoScroll, false)
    };

    if(that.options.arrows) {  // инициализация стрелок
        if(!that.options.loop) that.crslList.style.cssText =
            'transition:margin '+that.options.speed+'ms ease;';
        that.leftArrow.addEventListener('click', function() {
            let fnTime = getTime();
            if(fnTime - bgTime > that.options.speed) {
                bgTime = fnTime; that.elemPrev()
            }
        }, false);
        that.rightArrow.addEventListener('click', function() {
            let fnTime = getTime();
            if(fnTime - bgTime > that.options.speed) {
                bgTime = fnTime; that.elemNext()
            }
        }, false)
    }
    else {
        that.leftArrow.style.display = 'none';
        that.rightArrow.style.display = 'none'
    };
};

Ant.prototype.elemPrev = function(num) {
    num = num || 1;

    this.currentElement -= num;
    if(this.currentElement < 0) this.currentElement = this.elemCount -1;

    if(!this.options.loop) {  // сдвиг вправо без цикла
        this.currentOffset += this.elemWidth*num;
        this.crslList.style.marginLeft = this.currentOffset + 'px';
        if(this.currentElement == 0) {
            this.leftArrow.style.display = 'none'; this.touchPrev = false
        }
        this.rightArrow.style.display = 'block'; this.touchNext = true
    }
    else {                    // сдвиг вправо с циклом
        let elm, buf, this$ = this;
        for(let i=0; i<num; i++) {
            elm = this.crslList.lastElementChild;
            buf = elm.cloneNode(true);
            this.crslList.insertBefore(buf, this.crslList.firstElementChild);
            this.crslList.removeChild(elm)
        };
        this.crslList.style.marginLeft = '-' + this.elemWidth*num + 'px';
        let compStyle = window.getComputedStyle(this.crslList).marginLeft;
        this.crslList.style.cssText = 'transition:margin '+this.options.speed+'ms ease;';
        this.crslList.style.marginLeft = '0px';
        setTimeout(function() {
            this$.crslList.style.cssText = 'transition:none;'
        }, this.options.speed)
    }
};

Ant.prototype.elemNext = function(num) {
    num = num || 1;

    if(this.options.dots) this.dotOn(this.currentElement);
    this.currentElement += num;
    if(this.currentElement >= this.dotsVisible) this.currentElement = 0;
    if(this.options.dots) this.dotOff(this.currentElement);

    if(!this.options.loop) {  // сдвиг влево без цикла
        this.currentOffset -= this.elemWidth*num;
        this.crslList.style.marginLeft = this.currentOffset + 'px';
        if(this.currentElement == this.dotsVisible-1) {
            this.rightArrow.style.display = 'none'; this.touchNext = false
        }
        this.leftArrow.style.display = 'block'; this.touchPrev = true
    }
    else {                    // сдвиг влево с циклом
        let elm, buf, this$ = this;
        this.crslList.style.cssText = 'transition:margin '+this.options.speed+'ms ease;';
        this.crslList.style.marginLeft = '-' + this.elemWidth*num + 'px';
        setTimeout(function() {
            this$.crslList.style.cssText = 'transition:none;';
            for(let i=0; i<num; i++) {
                elm = this$.crslList.firstElementChild;
                buf = elm.cloneNode(true); this$.crslList.appendChild(buf);
                this$.crslList.removeChild(elm)
            };
            this$.crslList.style.marginLeft = '0px'
        }, this.options.speed)
    }
};

new Ant();