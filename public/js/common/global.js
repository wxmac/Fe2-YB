
window.global == null && (window.global = {});
/**
 * 警告框
 * @param {string} str -- 显示的文字
 * @param {boolean} autoHide -- 是否消失
 * @param {number} duration -- 延时消失时间
 * @returns {{show: show, hide: hide}}
 */

const showMsg = function(str, autoHide, duration) {
    let $mask = $('#j_alert_mask');
    let $el = $('#j_alert_el');
    if (!$mask.length) {
        $mask = $('<div id="j_alert_mask" class="alert_mask"></div>');
        $('body').append($mask);
    }
    if (!$el.length) {
        $el = $('<div id="j_alert_el" class="alert_container"></div>');
        $('body').append($el);
    }
    $el.html(str);
    show();

    function show() {
        $el.show();
        $mask.show();
        if (autoHide) {
        setTimeout(() => {
            hide();
        }, duration || 2000);
        }
    }
    function hide() {
        $el.hide();
        $mask.hide();
    }
    return {
        el: $el,
        show,
        hide
    }
}
window.global.showMsg = showMsg;