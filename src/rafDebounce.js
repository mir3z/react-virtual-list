export default function rafDebounce(fn) {
    var rafScheduled = false;

    var fnWrapper = () => {
        fn();
        rafScheduled = false;
    };

    return {
        request() {
            if (!rafScheduled) {
                requestAnimationFrame(fnWrapper);
                rafScheduled = true;
            }
        }
    };
}