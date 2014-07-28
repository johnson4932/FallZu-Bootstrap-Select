(function($) {
    "use strict";

    $.fn.fallzuSelectpicker = function(devOption) {
        var el = $(this);
        var render = function (template) {
            el.after(
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
        if (el.is('select')) {
            var template = '';
            el.children().each(function() {
                var rootOption = $(this);

                // Check isGroup
                if (rootOption.is('optgroup')) {
                    // Coming soon
                } else {
                    template +=
                        '<li class="fallzu-select-li">' +
                            '<a class="fallzu-select-option" href="#">' + rootOption.text() + '</a>' +
                        '</li>';
                }

            });

            render(template);
            el.hide();
        }

        return el;
    };
})(jQuery);
