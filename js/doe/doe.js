/**
 * Created by TIMYY on 2014/7/21.
 */
window.doe = function () {
};

doe.version = '0.1.0';

(function () {
    var detected = {};

    var ua = navigator.userAgent,
        msie = new RegExp('MSIE ([0-9]{1,}[\\.0-9]{0,})');

    if (msie.exec(ua) !== null) {
        var rv = parseFloat(RegExp.$1);
        detected.support = !(rv && rv < 9);
    } else {
        detected.support = true;
    }

    // Added due to incomplete svg style support.
    detected.opera = ua.indexOf('Opera') >= 0;

    detected.locale = navigator.language || navigator.userLanguage;

    detected.filedrop = (window.FileReader && 'ondrop' in window);

    function nav(x) {
        return navigator.userAgent.indexOf(x) !== -1;
    }

    if (nav('Win')) detected.os = 'win';
    else if (nav('Mac')) detected.os = 'mac';
    else if (nav('X11')) detected.os = 'linux';
    else if (nav('Linux')) detected.os = 'linux';
    else detected.os = 'win';

    doe.detect = function () {
        return detected;
    };
})();

