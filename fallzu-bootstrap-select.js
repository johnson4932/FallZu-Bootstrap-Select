(function($) {
    "use strict";

    $.fn.fallzuSelectpicker = function(devOption) {
        var skinRender = function(el, name, template) {
            el.after(
                '<div class="btn-group fallzu-select-dropdown" data-name="' + name + '">' +
                    '<button class="btn btn-default dropdown-toggle" type="button" data-toggle="dropdown">' +
                        '<span class="fallzu-select-text pull-left">未指定</span>' +
                        '<span class="caret pull-right"></span>' +
                    '</button>' +
                    '<ul class="dropdown-menu" role="menu">' + template + '</ul>' +
                '</div>'
            );
        };

        var templateRender = function(el, labelStr, hrStr, isGroup) {
            var labelStr = (labelStr === undefined) ? ('') : (labelStr);
            var hrStr = (hrStr === undefined) ? ('') : (hrStr);
            var subtext = (el.data('subtext') === undefined)
                          ? ('')
                          : (' <small class="muted text-muted">' + el.data('subtext') + '</small>');
            var subtextAttr = (el.data('subtext') === undefined)
                              ? ('')
                              : ('data-subtext="' + el.data('subtext') + '"');
            var group = (isGroup === true) ? ('opt') : ('');

            var template =
                '<li class="fallzu-select-li">' +
                    labelStr +
                    '<a class="fallzu-select-option ' + group + '" data-val="' + el.val() + '" ' + subtextAttr + ' href="#">' +
                        el.text() + subtext +
                    '</a>' +
                    hrStr +
                '</li>';
            return template;
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

                                template += templateRender(option, labelStr, hrStr, true);
                            });
                        });
                    } else {
                        template += templateRender(rootOption);
                    }

                });

                skinRender(el, elName, template);
                el.hide();

                // Binding event
                var dropdownDiv = el.next('.fallzu-select-dropdown[data-name=' + elName + ']').first();

                // Option Click
                dropdownDiv.find('.fallzu-select-option').on('click', function(e) {
                    e.preventDefault();
                    var value = $(this).data('val');
                    // Without children element
                    var text = $(this).clone().children().remove().end().text();
                    var subtext = $(this).data('subtext');
                    var subtextStr = (subtext === undefined)
                                    ? ('')
                                    : (' <small class="muted text-muted">' + subtext + '</small>');

                    dropdownDiv.find('.fallzu-select-text').html(text + subtextStr);
                    el.find('option[value=' + value + ']').prop('selected', true);
                });
            }
        });
    };
})(jQuery);
