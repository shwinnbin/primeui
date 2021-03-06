/**
 * PrimeUI progressbar widget
 */
 (function (factory) {
     if (typeof define === 'function' && define.amd) {
         // AMD. Register as an anonymous module.
         define(['jquery'], factory);
     } else if (typeof module === 'object' && module.exports) {
         // Node/CommonJS
         module.exports = function( root, jQuery ) {
             factory(jQuery);
             return jQuery;
         };
     } else {
         // Browser globals
         factory(jQuery);
     }
 }(function ($) {

    $.widget("primeui.puiprogressbar", {
       
        options: {
            value: 0,
            labelTemplate: '{value}%',
            complete: null,
            showLabel: true,
            mode: 'determinate'
        },
       
        _create: function() {
            this.element.addClass('ui-progressbar ui-widget ui-widget-content ui-corner-all ' + 'ui-progressbar-' + this.options.mode)
                    .append('<div class="ui-progressbar-value ui-progressbar-value-animate ui-widget-header ui-corner-all"></div>')
                    .append('<div class="ui-progressbar-label"></div>');
            
            this.jqValue = this.element.children('.ui-progressbar-value');
            this.jqLabel = this.element.children('.ui-progressbar-label');
            
            if(this.options.value !== 0) {
                this._setValue(this.options.value, false);
            }

            this.enableARIA();
        },
        
        _setValue: function(value) {            
            if(value >= 0 && value <= 100) {
                if(value === 0) {
                    this.jqValue.hide().css('width', '0%').removeClass('ui-corner-right');

                    this.jqLabel.hide();
                }
                else {
                    this.jqValue.css('width', value + '%');

                    if(this.options.labelTemplate && this.options.showLabel) {
                        var formattedLabel = this.options.labelTemplate.replace(/{value}/gi, value);

                        this.jqLabel.html(formattedLabel).show();
                    }
                    
                    if(value === 100) {
                        this._trigger('complete');
                    }
                }

                this.options.value = value;
                this.element.attr('aria-valuenow', value);
            }
        },

        _getValue: function() {
            return this.options.value;
        },

        enableARIA: function() {
            this.element.attr('role', 'progressbar')
                    .attr('aria-valuemin', 0)
                    .attr('aria-valuenow', this.options.value)
                    .attr('aria-valuemax', 100);
        },
        
        disableAria: function() {
            this.element.removeAttr('role')
                    .removeAttr('aria-valuemin')
                    .removeAttr('aria-valuenow')
                    .removeAttr('aria-valuemax');
        },
                
        _setOption: function(key, value) {
            if(key === 'value') {
                this._setValue(value);
            }
            
            $.Widget.prototype._setOption.apply(this, arguments);
        },
        
        _destroy: function() {
            this.disableAria();
            this.element.removeClass('ui-progressbar ui-progressbar-determinate ui-progressbar-indeterminate ui-widget ui-widget-content ui-corner-all')
                    .empty();
        }
        
    });
    
}));