/* global $ */
(function () {
    var _, PageManager;

    if (typeof require !== 'undefined') {
        _ = require('underscore');
    } else {
        _ = window._;
    }

    /* PageManager
     * - elSelector: selector of element to render pages into, e.g. 'body'
     * - options:
     *   - makeTitle: function for how to construct <title> for the page, receives the current pages title property/resolved method as an argument
     */

    PageManager = function (elSelector, options) {
        options = options || {};

        this.$el = $(elSelector);
        if (!this.$el.length) throw 'Page manager cannot find selector: ' + elSelector;
        this.el = this.$el[0];

        this.$body = $('body');
        this.currentPage = null;
        this.makeTitle = options.makeTitle || _.identity;
    };

    PageManager.prototype.show = function (view) {
        if (this.currentPage)
            this.hide(this.currentPage);

        this.currentPage = view;

        view.render();
        this.$el.append(view.el);

        if (view.bodyClass)
            this.$body.addClass(view.bodyClass);

        document.title = this.makeTitle(_.result(view.title));
        this.$body.scrollTop(0);

        if (view.onShow) view.onShow();
    };

    PageManager.prototype.hide = function (view) {
        if (view.bodyClass)
            this.$body.removeClass(view.bodyClass);

        if (view.onHide) view.onHide();

        view.remove();
    };

    if (typeof module !== "undefined" && module && module.exports) {
        module.exports = PageManager;
    } else {
        window.PageManager = PageManager;
    }
}());
