export function Viewport(el) {
    var size;
    this.el = el;

    var calculateSize = () => {
        return size = {
            top: calcYPos(el),
            height: el.clientHeight || el.innerHeight
        };
    };

    this.size = function () {
        return size || calculateSize();
    };

    this.getScrollTop = function () {
        var scrollTop = el.scrollTop;

        if (typeof scrollTop === 'undefined') {
            scrollTop = el.scrollY || el.pageYOffset;
        }

        return scrollTop;
    };

    this.reset = function () {
        size = null;
    };
}

export function ContentBox(el, items, itemHeight) {
    var size;
    this.el = el;

    var calculateSize = () => {
        return size = {
            top: calcYPos(this.el),
            height: items.length * itemHeight
        };
    };

    this.size = function () {
        return size || calculateSize();
    };

    this.reset = function () {
        size = null;
    };
}

function calcYPos(el) {
    if (el === window) return 0;
    var y = 0;

    while (!!el) {
        y += el.offsetTop;
        el = el.offsetParent;
    }

    return y;
}