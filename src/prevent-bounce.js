class PreventBounce {
    constructor() {
        this.$el = null;
        this.startDragPosY = 0;

        this.handleTouchStart = this.handleTouchStart.bind(this);
        this.handleTouchMove = this.handleTouchMove.bind(this);
        this.handleTouchEnd = this.handleTouchEnd.bind(this);
    }

    attach(element) {
        this.$el = element || document;

        // iOS 11 version issue.
        const eventOption = {passive: false};
        this.$el.addEventListener('touchstart', this.handleTouchStart, eventOption);
        this.$el.addEventListener('touchmove', this.handleTouchMove, eventOption);
        this.$el.addEventListener('touchend', this.handleTouchEnd, eventOption);
        this.$el.addEventListener('touchcancel', this.handleTouchEnd, eventOption);
    }

    remove() {
        if (this.$el) {
            const eventOption = {passive: false};
            this.$el.removeEventListener('touchstart', this.handleTouchStart, eventOption);
            this.$el.removeEventListener('touchmove', this.handleTouchMove, eventOption);
            this.$el.removeEventListener('touchend', this.handleTouchEnd, eventOption);
            this.$el.removeEventListener('touchcancel', this.handleTouchEnd, eventOption);
        }
    }

    handleTouchStart(e) {
        this.startDragPosX = this.getTouchPositionX(e);
        this.startDragPosY = this.getTouchPositionY(e);
    }

    handleTouchMove(e) {
        const deltaX = this.getTouchPositionX(e) - this.startDragPosX;
        const deltaY = this.getTouchPositionY(e) - this.startDragPosY;
        const scrollTop = this.$el.scrollTop || window.scrollY;

        if (scrollTop < 1 && deltaY > 0 && Math.abs(this.getAngle(deltaX, deltaY)) > 45) {
            e.preventDefault();
        }
    }

    handleTouchEnd() {
        this.startDragPosX = 0;
        this.startDragPosY = 0;
    }

    getTouchPositionX(e) {
        return e.changedTouches ? e.changedTouches[0].pageX : e.pageX;
    }

    getTouchPositionY(e) {
        return e.changedTouches ? e.changedTouches[0].pageY : e.pageY;
    }

    getAngle(deltaX, deltaY) {
        return Math.atan(deltaY / deltaX) * 180 / Math.PI;
    }
}

// Do not use export 'default keyword'
// transform-es2015-modules-umd doesn't trans file the keyword.
// -> module.exports -> window.PreventDefault
// -> export default -> window.PreventDefault.default
module.exports = PreventBounce;