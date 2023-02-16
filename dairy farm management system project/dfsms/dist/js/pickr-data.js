/* Pikr Init*/
"use strict";
const pickr = Pickr.create({
    el: '.color-picker',
	default: '#f68daf',
	position: 'left',
    components: {
		preview: true,
        opacity: true,
        hue: true,
		interaction: {
            hex: true,
            rgba: true,
            hsva: true,
            input: true,
            clear: true,
            save: true
        }
    }
});