(function($) {
    "use strict";

    $.fn.fallzuSelectpicker = function(devOption) {
        var render = function(el, name, template) {
            el.after(
                '<div class="dropdown fallzu-select-dropdown" data-name="' + name + '">' +
                    '<button class="btn btn-default dropdown-toggle" type="button" data-toggle="dropdown">' +
                        '<span class="fallzu-select-text pull-left">未指定</span>' +
                        '<span class="caret pull-right"></span>' +
                    '</button>' +
                    '<ul class="dropdown-menu" role="menu">' + template + '</ul>' +
                '</div>'
            );
        };

        $(this).each(function() {
            var el = $(this);

            // Check select element
            var elName = el.attr('name');
            if (el.is('select') && elName != undefined) {
                var template = '';
                var seletLength = el.children().length;
                el.children().each(function(optionIndex) {
                    var rootOption = $(this);

                    // Check isGroup
                    if (rootOption.is('optgroup')) {
                        rootOption.each(function() {
                            var optionGroup = $(this);
                            var label = optionGroup.attr('label');
                            var length = optionGroup.children().length;

                            optionGroup.children().each(function(index) {
                                var option = $(this);
                                // Label
                                var labelStr = (index === 0) ? ('<dt><span>' + label + '</span></dt>') : ('');
                                // hr line
                                var hrStr = (index === length - 1 && optionIndex != seletLength - 1)
                                            ? ('<div class="div-contain"><div class="divider"></div></div>')
                                            : ('');

                                template +=
                                    '<li class="fallzu-select-li">' +
                                        labelStr +
                                        '<a class="fallzu-select-option" data-val="' + option.val() + '" href="#">' +
                                            option.text() +
                                        '</a>' +
                                        hrStr +
                                    '</li>';
                            });
                        });
                    } else {
                        template +=
                            '<li class="fallzu-select-li">' +
                                '<a class="fallzu-select-option" data-val="' + rootOption.val() + '" href="#">' +
                                    rootOption.text() +
                                '</a>' +
                            '</li>';
                    }

                });

                render(el, elName, template);
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
        });
    };
})(jQuery);
