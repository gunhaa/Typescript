// 제네릭
// js에는 없고 ts에만 존재한다

// string[] 처럼 해당 방식으로도 사용 가능하다
const names: Array<string | number> = [];

const promise: Promise<string> = new Promise((resolve, reject) => {
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
function merge<T extends object, U extends object>(objA: T, objB: U) {
  return Object.assign(objA, objB);
}

const mergeObj = merge<object, object>({ name: "gunha" }, { age: 10 });
console.log(mergeObj);

// 이 경우 접근 불가
// mergeObj.name
// 제네릭 써서 극복가능

interface Lengthy {
  length: number;
}

function countAndDescribe<T extends Lengthy>(element: T): [T, string] {
  let descriptionText = "Got no value.";
  if (element.length === 1) {
    descriptionText = "Got 1 element";
  } else if (element.length > 1) {
    descriptionText = "Got " + element.length + " elements.";
  }
  return [element, descriptionText];
}

class Temp implements Lengthy {
  length = 100;
}

console.log(countAndDescribe("gdgd"));
console.log(countAndDescribe(["cookies", "hobbies"]));
console.log(countAndDescribe(new Temp()));

// 제약 조건
// keyof로 특정 객체의 key여부를 제약할 수 있다
function extractAndConvert<T extends object, U extends keyof T>(
  obj: T,
  key: U
) {
  return "Value: " + obj[key];
}

console.log(extractAndConvert({ name: "gg" }, "name"));

// 원시값만을 강제한다
class DataStorage<T extends string | boolean | number> {
  private data: T[] = [];

  addItem(item: T) {
    this.data.push(item);
  }

  removeItem(item: T) {
    this.data.splice(this.data.indexOf(item), 1);
  }

  getItems() {
    return [...this.data];
  }
}

const textStorage = new DataStorage<string>();
textStorage.addItem('gunha');
textStorage.addItem('max');
console.log(textStorage.getItems());
textStorage.removeItem('max');
console.log(textStorage.getItems());


// const objStorage = new DataStorage<object>();

// objStorage.addItem({name : 'gunha'});
// objStorage.addItem({name : 'max'});
// console.log(objStorage.getItems());

// 해당 방법은 통하지않는다,
// index로 찾는 경우 참조값이 전달 되는 것이기 때문에
// index가 -1이 된다
// this.data.splice(this.data.indexOf(item), 1); 의 로직은 마지막 값을 제거하게 된다
// 같은 포인터를 넘기던가, 원시값을 강제하는것이 맞다
// objStorage.removeItem({name : 'gunha'});
// console.log(objStorage.getItems());


interface CourseGoal {
  title: string;
  description: string;
  completeUntil: Date;
}

function createCourseGoal(title: string, description: string, date: Date): CourseGoal {
                // Partial<목표> 목표로 반횐 될 것이라고 알린다
  let courseGoal: Partial<CourseGoal> = {};
  courseGoal.title = title;
  courseGoal.description = description;
  courseGoal.completeUntil = date;
  // 해당 방식으로 assertion 해야한다
  return courseGoal as CourseGoal;
  // return {title: title, description: description, completeUntil: date};
}

// Readonly를 통해 readonly를 강제 할 수 있다
// 객체에도 사용 가능하다
// 객체의 프로퍼티를 바꾸거나 추가하는 것을 막는다
const arr: Readonly<string[]> = ['max' , 'sports'];
// arr.push('maru');