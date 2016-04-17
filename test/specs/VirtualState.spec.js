import VirtualState from 'VirtualState';

describe('VirtualState', () => {

    function createItems(a, b) {
        var items = [];

        for (let i = a; i <= b; i++) {
            items.push({ number: i });
        }

        return items;
    }

    function createFakeViewport(top, height, scrollTop) {
        var viewport = jasmine.createSpyObj('viewport', ['size', 'getScrollTop']);
        viewport.size.and.returnValue({ top, height });
        viewport.getScrollTop.and.returnValue(scrollTop);
        return viewport;
    }

    function createFakeContentBox(top, height) {
        var contentBox = jasmine.createSpyObj('contentBox', ['size']);
        contentBox.size.and.returnValue({ top, height });
        return contentBox;
    }

    it('should be defined', () => {
        expect(VirtualState).toBeDefined();
    });

    describe('when calculating state', () => {
        it('should return default state when item height is <= 0', () => {
            var state = new VirtualState(null, null, [], 0, 0);

            expect(state.calculate()).toEqual({
                contentHeight: 0,
                topOffset: 0,
                items: []
            });
        });

        it('should calculate state when list is scrolled to the top', () => {
            var state = new VirtualState(null, null, createItems(1, 100), 20, 0);
            state.viewport = createFakeViewport(0, 100, 0);
            state.contentBox = createFakeContentBox(0, 200);

            expect(state.calculate()).toEqual({
                contentHeight: 200,
                topOffset: 0,
                items: createItems(1, 6)
            });
        });

        it('should calculate state when list is scrolled to the bottom', () => {
            var state = new VirtualState(null, null, createItems(1, 100), 20, 0);
            state.viewport = createFakeViewport(0, 100, 1900);
            state.contentBox = createFakeContentBox(0, 200);

            expect(state.calculate()).toEqual({
                contentHeight: 200,
                topOffset: 1900,
                items: createItems(96, 100)
            });
        });

        it('should include buffer size when list is scrolled to the top', () => {
            var state = new VirtualState(null, null, createItems(1, 100), 20, 3);
            state.viewport = createFakeViewport(0, 100, 0);
            state.contentBox = createFakeContentBox(0, 200);

            expect(state.calculate()).toEqual({
                contentHeight: 200,
                topOffset: 0,
                items: createItems(1, 9)
            });
        });

        it('should include buffer size when list is scrolled to the bottom', () => {
            var state = new VirtualState(null, null, createItems(1, 100), 20, 3);
            state.viewport = createFakeViewport(0, 100, 1900);
            state.contentBox = createFakeContentBox(0, 200);

            expect(state.calculate()).toEqual({
                contentHeight: 200,
                topOffset: 1840,
                items: createItems(93, 100)
            });
        });
    });
});