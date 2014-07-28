(function($) {
    "use strict";

    $.fn.fallzuSelectpicker = function(devOption) {
        var root = $(this);
        var render = function (template) {
            root.after(
                '<div class="dropdown">' +
                    '<button class="btn btn-default dropdown-toggle" type="button" data-toggle="dropdown">' +
                        '<span class="pull-left">未指定</span>' +
                        '<span class="caret"></span>' +
                    '</button>' +
                    '<ul class="dropdown-menu" role="menu">' + template + '</ul>' +
                '</div>'
            );
        };

        // Check select element
        if ($(this).is('select')) {
            var template = '';
            $(this).children().each(function() {
                var rootOption = $(this);

                // Check isGroup
                if (rootOption.is('optgroup')) {
                    // Coming soon
                } else {
                    template += '<li><a href="#">' + rootOption.text() + '</a></li>';
                }

            });

            render(template);
        }

        return $(this);
    };
})(jQuery);
