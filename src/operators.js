import { interval, fromEvent, switchMap } from 'rxjs';
import {
    map,
    filter,
    tap,
    take,
    takeLast,
    takeWhile,
    scan,
    reduce
} from 'rxjs/operators';

fromEvent(document, 'click')
    .pipe(
        switchMap((event) => {
            return interval(500)
                .pipe(
                    tap(v => console.log('[click-tap]', v)),
                    take(5),
                    reduce((acc, v) => acc + v, 0)
                )
        })
    )
    .subscribe({
        next (v) {
            console.log('[click-next]', v);
        },
        complete () {
            console.log('[click-complete]');
        }
    });

const stream$ = interval(500)
    .pipe(
        map((v) => v ** 4),
        filter((v) => v % 2 === 0),
        takeWhile(v => v < 100),
        reduce((acc, value) => acc + value, 0)
    );

stream$.subscribe({
    next (value) {
        console.log('[next]', value);
    },
    complete () {
        console.log('[complete]')
    }
})