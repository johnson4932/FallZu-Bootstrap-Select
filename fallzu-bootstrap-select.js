(function($) {
    "use strict";

    var defaultOptions = {
        defaultText: 'Please Select...'
    };
    $.fn.fallzuSelectpicker = function(devOptions) {
        var options = $.extend(defaultOptions, devOptions);
        var skinRender = function(el, name, template) {
            el.after(
                '<div class="btn-group fallzu-select-dropdown" data-name="' + name + '">' +
                    '<button class="btn btn-default dropdown-toggle" type="button" data-toggle="dropdown">' +
                        '<span class="fallzu-select-text pull-left">' + options.defaultText + '</span>' +
                        '<span class="caret pull-right"></span>' +
                    '</button>' +
                    '<ul class="dropdown-menu" role="menu">' + template + '</ul>' +
                '</div>'
            );
        };

        var templateRender = function(el, labelStr, hrStr, isGroup) {
            var labelStr = labelStr || '';
            var hrStr = hrStr || '';
            var subtext = (el.data('subtext') === undefined)
                          ? ('')
                          : (' <small class="muted text-muted">' + el.data('subtext') + '</small>');
            var subtextAttr = (el.data('subtext') === undefined)
                              ? ('')
                              : ('data-subtext="' + el.data('subtext') + '"');
            var group = (isGroup === true) ? ('opt') : ('');
            var activeText = '<i class="glyphicon glyphicon-ok fallzu-option-ok pull-right"></i>';
            var imgText = (el.data('img') === undefined)
                          ? (undefined)
                          : ('<img class="fallzu-option-img pull-right" src="' + el.data('img') + '" alt="" >');
            var rightText = imgText || activeText;

            var template =
                '<li class="fallzu-select-li">' +
                    labelStr +
                    '<a class="fallzu-select-option ' + group + '" data-val="' + el.val() + '" ' + subtextAttr + ' href="#">' +
                        '<span class="fallzu-option-text pull-left">' + el.text() + subtext + '</span>' +
                        rightText +
                    '</a>' +
                    hrStr +
                '</li>';
            return template;
        };

        $(this).each(function() {
            var el = $(this);

            // Reset
            el.find('option:selected').prop('', false);

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
                    var ul = $(this).parents('ul');
                    var value = $(this).data('val');
                    var originalOption = el.find('option[value=' + value + ']');
                    // Without children element
                    var text = $(this).find('.fallzu-option-text').clone().children().remove().end().text();
                    var subtext = $(this).data('subtext');
                    var subtextStr = (subtext === undefined)
                                    ? ('')
                                    : (' <small class="muted text-muted">' + subtext + '</small>');

                    // Multiple
                    if (el.prop('multiple')) {
                        var isSelect = originalOption.prop('selected');

                        if (isSelect) {
                            $(this).removeClass('fallzu-option-active');
                            originalOption.prop('selected', false);
                        } else {
                            $(this).addClass('fallzu-option-active');
                            originalOption.prop('selected', true);
                        }

                        var textArr = [];
                        el.find('option:selected').each(function() {
                            textArr.push($(this).text());
                        });

                        var title = (textArr.length == 0) ? (options.defaultText) : (textArr.join());

                        dropdownDiv.find('.fallzu-select-text').html(title);
                        return false;
                    } else {
                        originalOption.prop('selected', true);
                        ul.find('.fallzu-option-active').removeClass('fallzu-option-active');
                        $(this).addClass('fallzu-option-active');
                        dropdownDiv.find('.fallzu-select-text').html(text + subtextStr);
                        originalOption.prop('selected', true);
                    }
                });
            }
        });
    };
})(jQuery);
