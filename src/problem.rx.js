import { interval } from 'rxjs';
import { filter, map, take, scan } from 'rxjs/operators';

const btn     = document.getElementById('interval')
const rxjsBtn = document.getElementById('rxjs')
const display = document.querySelector('#problem .result')

const people = [
    { name: 'Vladilen', age: 25 },
    { name: 'Elena', age: 17 },
    { name: 'Ivan', age: 18 },
    { name: 'Ned', age: null },
    { name: 'Igor', age: 14 },
    { name: 'Lisa', age: 32 },
    { name: 'Undefi', age: null },
    { name: 'Irina', age: 23 },
    { name: 'Oleg', age: 20 }
];


const getter = function* (array) {
    for (let i = 0; i < array.length; i++) {
        yield array[i];
    }
}

const getterWithFilter = function* (array, filter) {
    for (let i = 0; i < array.length; i++) {
        const item = array[i];
        if (!filter(item)) {
            continue;
        }
        yield item;
    }
}

const getterCanDrink = function (peoples) {
    let counter = 0;
    return getterWithFilter(peoples, (person) => !!person.age && person.age >= 18 && (++counter <= 2));
}

const createPersonItem = function (personInfo) {
    const item     = document.createElement('div');
    item.innerText = `Name: ${ personInfo.name }, age: ${ personInfo.age }`;
    return item;
}

const createPersonInfoCard = function (personInfo) {
    const item     = document.createElement('div');
    item.innerHTML = `<div style='color: red'>[CARD]</div>Name: ${ personInfo.name }, age: ${ personInfo.age }`;
    return item;
}

const addToContainerWithInterval = function (getter, container, template, ms) {
    return new Promise((resolve) => {
        const interval = setInterval(() => {
            const item = getter.next().value;
            if (item) {
                container.insertAdjacentElement('beforeend', template(item));
            } else {
                clearInterval(interval);
                resolve();
            }
        }, ms)
    })
}

const addToContainerWithPreInterval = function (getter, container, template, ms) {
    return new Promise((resolve) => {
        let item       = getter.next().value;
        const interval = item && setInterval(() => {
            container.insertAdjacentElement('beforeend', template(item));
            if (!(item = getter.next().value)) {
                clearInterval(interval);
                resolve();
            }
        }, ms)
    })
}

const onButtonClick = function (e) {
    e.target.disabled = true;

    Promise.all([
        addToContainerWithPreInterval(getterCanDrink(people), display, createPersonItem, 1000),
        addToContainerWithPreInterval(getterWithFilter(people, (item) => !!item.age), display2, createPersonInfoCard, 1500),
    ]).then(() => e.target.disabled = false)
}

const onRxJsButtonClick = function (e) {
    e.target.disabled = true;
    interval(1000)
        .pipe(
            take(people.length),
            filter((index) => people[index].age >= 18),
            map((index) => people[index].name),
            scan((acc, value) => acc.concat(value), [])
        )
        .subscribe((response) => {
            display.textContent = response.join(' ');
        }, null, () => {
            e.target.disabled = false;
        });
}

btn.addEventListener('click', onButtonClick);

rxjsBtn.addEventListener('click', onRxJsButtonClick)


