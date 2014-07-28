(function($) {
    "use strict";

    $.fn.fallzuSelectpicker = function(devOption) {
        var el = $(this);
        var render = function(name, template) {
            el.after(
                '<div class="dropdown fallzu-select-dropdown" data-name="' + name + '">' +
                    '<button class="btn btn-default dropdown-toggle" type="button" data-toggle="dropdown">' +
                        '<span class="fallzu-select-text pull-left">未指定</span>' +
                        '<span class="caret"></span>' +
                    '</button>' +
                    '<ul class="dropdown-menu" role="menu">' + template + '</ul>' +
                '</div>'
            );
        };

        // Check select element
        var elName = el.attr('name');
        if (el.is('select') && elName != undefined) {
            var template = '';
            el.children().each(function() {
                var rootOption = $(this);

                // Check isGroup
                if (rootOption.is('optgroup')) {
                    // Coming soon
                } else {
                    template +=
                        '<li class="fallzu-select-li">' +
                            '<a class="fallzu-select-option" data-val="' + rootOption.val() + '" href="#">' +
                                rootOption.text() +
                            '</a>' +
                        '</li>';
                }

            });

            render(elName, template);
            el.hide();

            // Binding event
            var dropdownDiv = el.next('.fallzu-select-dropdown[data-name=' + elName + ']').first();
            dropdownDiv.find('.fallzu-select-option').on('click', function(e) {
                e.preventDefault();
                var value = $(this).data('val');
                var text = $(this).text();

                dropdownDiv.find('.fallzu-select-text').text(text);
                el.find('option[value=' + value + ']').prop('selected', true);
            });
        }

        return el;
    };
})(jQuery);
