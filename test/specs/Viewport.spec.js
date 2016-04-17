import { Viewport } from 'Box';

describe('Viewport', () => {

    function createFakeEl() {
        return {
            clientHeight: 100,
            offsetTop: 20,
            scrollTop: 10,
            offsetParent: {
                offsetTop: 30,
                offsetParent: null
            }
        };
    }

    function createFakeWindow() {
        return {
            innerHeight: 100,
            scrollY: 10,
            offsetTop: 0,
            offsetParent: null
        };
    }

    it('should be defined', () => {
        expect(Viewport).toBeDefined();
    });

    it('should expose DOM element', () => {
        var el = createFakeEl();
        var v = new Viewport(el);

        expect(v.el).toBe(el);
    });

    describe('should calculate size', () => {
        it('when element it HTML element', () => {
            var v = new Viewport(createFakeEl());

            expect(v.size()).toEqual({
                height: 100,
                top: 50
            });
        });

        it('when element is window', () => {
            var v = new Viewport(createFakeWindow());

            expect(v.size()).toEqual({
                height: 100,
                top: 0
            });
        });
    });

    it('should be able to reset cached size', () => {
        var v = new Viewport(createFakeEl());
        v.el.clientHeight = 200;
        v.reset();

        expect(v.size()).toEqual({
            height: 200,
            top: 50
        });
    });

    describe('should be able to return scroll top value', () => {
        it('when element is HTML element', () => {
            var v = new Viewport(createFakeEl());

            expect(v.getScrollTop()).toEqual(10);
        });

        it('when element is window', () => {
            var v = new Viewport(createFakeWindow());

            expect(v.getScrollTop()).toEqual(10);
        });
    });

});