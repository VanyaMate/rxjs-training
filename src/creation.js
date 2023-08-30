import {
    of,
    from,
    Observable,
    formEvent,
    fromEvent,
    range,
    timer,
    interval
} from 'rxjs';
import { scan, map } from "rxjs/operators";

/*
 const stream$ = of(1, 2, 3, 4);
 stream$.subscribe(value => console.log(value));
 */

/*
 const arrs$ = from([ 1, 2, 3, 4 ]).pipe(scan((acc, v) => acc.concat(v), []));
 arrs$.subscribe(value => console.log(value));
 */


/*
 const stream$ = new Observable((observer) => {
 observer.next('First value');

 setTimeout(() => {
 observer.next('After 1000');
 }, 1000);

 setTimeout(() => {
 observer.error('[ERROR] After 2000');
 }, 2000);

 setTimeout(() => {
 observer.next('After 3000');
 }, 3000)
 })

 stream$.subscribe(
 {
 next (val) {
 console.log('[next]', val);
 },
 error (err) {
 console.log('[error]', err);
 },
 complete () {
 console.log('[complete]');
 }
 }
 )*/

/*
 const canvas      = document.querySelector('canvas');
 const clearButton = document.querySelector('#clear');
 */

/*
 fromEvent(canvas, 'mousemove')
 .pipe(
 map((e) => ({
 x  : e.offsetX,
 y  : e.offsetY,
 ctx: e.target.getContext('2d')
 }))
 )
 .subscribe((event) => {
 event.ctx.fillRect(event.x, event.y, 2, 2);
 })

 const clear$ = fromEvent(clearButton, 'click');
 clear$.subscribe((next) => {
 canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
 })*/


const sub = interval(1000).subscribe(v => console.log(v))

timer(4000).subscribe(() => {
    console.log('unsub');
    sub.unsubscribe();
})

range(42, 10).subscribe((value) => {
    console.log(value)
})