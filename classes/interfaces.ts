// 객체의 구조를 정한다
// 하지만 값을 할당하지는 않는다
// interface Person {
//     name: string;
//     age: number;

//     greet(phrase: string): void;
// }

// interface와 같은 기능을 한다
// 요즘 TypeScript 트렌드는 type 위주로 많이 사용하되,
// 라이브러리 확장성, OOP적 구조가 필요한 곳에서는 interface를 선택하는 식이다.
type Person = {
  readonly name: string;
  age: number;

  greet(phrase: string): void;
};

// ts는 다중 구현이 가능하다
// interface의 extends가 가능하다
interface Greetable {
  // private public은 설정 불가하지만 readonly는 가능하다, 단 한번만 설정 가능
  // 타입도 사용 가능
  readonly name: string;

  greet(phrase: string): void;
}

interface A {
  a: string;
}
interface B {
  b: number;
}
interface C extends A, B {
  c: boolean;
}

const obj: C = {
  a: "hello",
  b: 123,
  c: true,
};

// 해당 타입과같이 인터페이스도 똑같이 구현 가능하다
type AddFn = (a: number, b: number) => number;

let add: AddFn;

add = (n1: number, n2: number) => {
  return n1 + n2;
};

// 두가지 방법 모두 사용 가능
interface IAddFn {
  (a: number, b: number): number;
}

let iAdd: IAddFn;

iAdd = (n1: number, n2: number) => {
  return n1 + n2;
};

let user1: Person;

interface INamed {
    name: string;
    // 있을수도, 없을수도를 표현하는 것이 ?이다
    // 생성자, 필드 등 다양한 곳에서 활용할 수 있다
    company?:string;
}

// interface의 구현
user1 = {
  name: "gunha",
  age: 10,
  greet(pharse: string) {
    console.log(pharse + " " + this.name);
  },
};

console.log(user1.greet("hi there- i am "));

// ts가 컴파일하는 js의 인터페이스
// js의 버전에 따라 다르지만, 생성자 함수를 사용하거나, 아예 작성되지 않는다
// 인터페이스는 변환되지 않는다(js는 인터페이스가 없으므로, 컴파일 타임에만 사용된다, 즉 개발 전용 기능이다, 즉 런타임에는 아예 적용되지 않는다)