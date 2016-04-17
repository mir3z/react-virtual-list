import { ContentBox } from 'Box';

describe('ContentBox', () => {

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

    it('should be defined', () => {
        expect(ContentBox).toBeDefined();
    });

    it('should expose DOM element', () => {
        var el = createFakeEl();
        var cb = new ContentBox(el);

        expect(cb.el).toBe(el);
    });

    it('should calculate size', () => {
        var cb = new ContentBox(createFakeEl(), [1, 2, 3], 5);

        expect(cb.size()).toEqual({
            height: 15,
            top: 50
        });
    });

    it('should be able to reset cached size', () => {
        var cb = new ContentBox(createFakeEl(), [1, 2, 3], 5);
        cb.el.offsetTop = 10;
        cb.reset();

        expect(cb.size()).toEqual({
            height: 15,
            top: 40
        });
    });
});