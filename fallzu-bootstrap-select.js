(function($) {
    "use strict";

    $.fn.fallzuSelectpicker = function(devOption) {
        if ($(this).is('select')) {
            $(this).after($(''));
        }

        return $(this);
    };

})(jQuery);
