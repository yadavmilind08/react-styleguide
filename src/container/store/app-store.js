import { observable } from 'mobx';

export const appStore = observable({
    count: 0
})

appStore.increment = function () {
    this.count++;
}

appStore.decrement = function () {
    this.count--;
}