// 타입을 명시할 필요가 없다면 타입스크립트의 추론에 맡기는 것도 좋다
function add(n1: number, n2: number): number {
  return n1 + n2;
}

// js에는 void타입이 없지만, 타입스크립트에는 void가 존재한다
// 이 함수에는 반환 값이 없다는 것을 의미한다
// void는 기술적으로 undefined를 반환한다
// return; 시키며 반환형이 undefined인 것과 기술적으로 동일하다
function printResult(num: number): void {
  console.log("Result: " + num);
}

printResult(add(5, 12));

let someValue: undefined;

// 함수의 타입을 지정할수 있다
// Function 타입 사용
// let combineValues: Function;
// arrow function으로도 사용이 가능하다
// 매개변수, 반환형을 표현할 수 있다
let combineValues: (a: number, b: number) => number;

// 콜백 사용법
function addAndHandle(n1: number, n2:number, cb: (num: number) => void) {
    const result = n1 + n2;
    cb(result);
}

combineValues = add;
// combineValues = 5;

console.log('combine..'+combineValues(8, 8));


addAndHandle(10,20, (result) => {
    console.log(result);
});