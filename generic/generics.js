"use strict";
// 제네릭
// js에는 없고 ts에만 존재한다
// string[] 처럼 해당 방식으로도 사용 가능하다
const names = [];
const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("this is done!");
    }, 2000);
});
promise.then((data) => {
    // string이여서 사용할 수 있다
    // 작업을 더 유연하게 할 수 있다
    data.split(" ");
});
// 제네릭 타입에 제약을 정하기 위해선, extends 예약어를 이용한다
// class의 extends와 같지만, 전혀 다른 기능을 하는 예약어 이다
// 제네릭의 extends는 제약을 건다(Constraint)
function merge(objA, objB) {
    return Object.assign(objA, objB);
}
const mergeObj = merge({ name: "gunha" }, { age: 10 });
console.log(mergeObj);
function countAndDescribe(element) {
    let descriptionText = "Got no value.";
    if (element.length === 1) {
        descriptionText = "Got 1 element";
    }
    else if (element.length > 1) {
        descriptionText = "Got " + element.length + " elements.";
    }
    return [element, descriptionText];
}
class Temp {
    constructor() {
        this.length = 100;
    }
}
console.log(countAndDescribe("gdgd"));
console.log(countAndDescribe(["cookies", "hobbies"]));
console.log(countAndDescribe(new Temp()));
// 제약 조건
// keyof로 특정 객체의 key여부를 제약할 수 있다
function extractAndConvert(obj, key) {
    return "Value: " + obj[key];
}
console.log(extractAndConvert({ name: "gg" }, "name"));
// 원시값만을 강제한다
class DataStorage {
    constructor() {
        this.data = [];
    }
    addItem(item) {
        this.data.push(item);
    }
    removeItem(item) {
        this.data.splice(this.data.indexOf(item), 1);
    }
    getItems() {
        return [...this.data];
    }
}
const textStorage = new DataStorage();
textStorage.addItem('gunha');
textStorage.addItem('max');
console.log(textStorage.getItems());
textStorage.removeItem('max');
console.log(textStorage.getItems());
function createCourseGoal(title, description, date) {
    // Partial<목표> 목표로 반횐 될 것이라고 알린다
    let courseGoal = {};
    courseGoal.title = title;
    courseGoal.description = description;
    courseGoal.completeUntil = date;
    // 해당 방식으로 assertion 해야한다
    return courseGoal;
    // return {title: title, description: description, completeUntil: date};
}
// Readonly를 통해 readonly를 강제 할 수 있다
// 객체에도 사용 가능하다
// 객체의 프로퍼티를 바꾸거나 추가하는 것을 막는다
const arr = ['max', 'sports'];
// arr.push('maru');
