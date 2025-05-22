"use strict";
// 객체의 구조를 정한다
// 하지만 값을 할당하지는 않는다
// interface Person {
//     name: string;
//     age: number;
const obj = {
    a: "hello",
    b: 123,
    c: true,
};
let add;
add = (n1, n2) => {
    return n1 + n2;
};
let iAdd;
iAdd = (n1, n2) => {
    return n1 + n2;
};
let user1;
// interface의 구현
user1 = {
    name: "gunha",
    age: 10,
    greet(pharse) {
        console.log(pharse + " " + this.name);
    },
};
console.log(user1.greet("hi there- i am "));
// ts가 컴파일하는 js의 인터페이스
// js의 버전에 따라 다르지만, 생성자 함수를 사용하거나, 아예 작성되지 않는다
// 인터페이스는 변환되지 않는다(js는 인터페이스가 없으므로, 컴파일 타임에만 사용된다, 즉 개발 전용 기능이다, 즉 런타임에는 아예 적용되지 않는다)
