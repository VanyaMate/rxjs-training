import { Subject, BehaviorSubject, ReplaySubject } from 'rxjs';

document.addEventListener('click', () => {

    const stream$ = new ReplaySubject(2);

    stream$.next('1');
    stream$.next({});
    stream$.next(null);


    stream$.subscribe((value) => {
        console.log('[v]', value);
    })

})