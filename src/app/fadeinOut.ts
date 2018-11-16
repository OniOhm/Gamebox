import { animation, trigger, transition, state, animate , style } from '@angular/animations';
import { BlockingProxy } from 'blocking-proxy';

export const fadeinOut = animation([
    state('fadeOut', style({
        opacity: 0,
        display: 'none',
        zIndex: 0
    })),
    state('fadeIn', style({
        opacity: 1,
        display: 'block',
        zIndex: 11
    })),
    animate('0.3s')
]);
