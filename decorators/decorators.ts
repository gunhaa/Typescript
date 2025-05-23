// decorator는 사용을 위해서
//    "target": "es6",\
//    "experimentalDecorators": true,
// 설정을 필수로 요구한다

// 데코레이터는 결국 함수이다
// 데코레이터는 관습적으로 첫문자를 대문자로 사용한다
// function Logger(constructor: Function) {
//   console.log("logging...");
//   console.log(constructor);
// }

// 데코레이터 팩토리 사용
// 데코레이터 함수에 함수를 전달해주면 데코레이터 함수가 실행하는 것이 기본 구조이다
function Logger(logString: string) {
  return function (constructor: Function) {
    console.log(logString);
    console.log(constructor);
  };
}

function WithTemplate(template: string, hookId: string) {
  return <T extends { new (..._: any[]): { name: string } }>(
    originalConstructor: T
  ) => {
    // const hookEl = document.getElementById(hookId);
    // const p = new originalConstructor();
    // if (hookEl) {
    //   hookEl.innerHTML = template;
    //   // hookEl.querySelector('h1')!.textContent = p.name;
    // }

    // 원본 함수의 프로퍼티를 잃지 않기 위해 상속을 사용해야 한다
    return class extends originalConstructor {
      constructor(..._: any[]) {
        super();
        // 이러면 생성될 때만 DOM이 새롭게 로딩된다
        // 생성자에 기능을 추가한다
        const hookEl = document.getElementById(hookId);
        const p = new originalConstructor();
        if (hookEl) {
          hookEl.innerHTML = template;
          hookEl.querySelector("h1")!.textContent = p.name;
        }
      }
    };
  };
}

// @ 는 타입스크립트가 보고 인식할수있는 특별한 식별자이다
// 반환된 내부 함수는 클래스 생성자가 정의될 때 실행된다.
// 즉, 인스턴스가 생성될 때가 아니라, 클래스가 정의되는 시점에 실행된다.
// @Logger("logfactory doing...")
@Logger("loging - 2")
@WithTemplate("<h1> My Person Object </h1>", "app")
// 밑의 것 부터 실행된다, 상향식임
// 데코레이터 팩토리의 경우 위에있는 것 부터 실행됨
class Person {
  name = "Max";

  constructor() {
    console.log("createing person obj....");
  }
}

// 인스턴스가 생성되도록 변환
// const person = new Person();
// console.log(person);
//----------------------

// 필드 데코레이터, 인수 2개
function Log(target: any, propertyName: string | Symbol) {
  // 이곳을 만난 순간 실행된다
  console.log("property decorator");
  console.log(target, propertyName);
}

// 접근자 데코레이터, 인수3개
// PropertyDescriptor를 이용해 반환할 수 있다
function Log2(
  target: any,
  name: string,
  descriptor: PropertyDescriptor
): PropertyDescriptor {
  console.log("accessor decorator");
  console.log(target);
  console.log(name);
  console.log(descriptor);

  return {};
}

// 메서드 데코레이터
// PropertyDescriptor를 이용해 반환할 수 있다
const Log3 = (
  target: any,
  name: string | Symbol,
  descriptor: PropertyDescriptor
) => {
  console.log("method decorator");
  console.log(target);
  console.log(name);
  console.log(descriptor);
};

// 파라미터 데코레이터
const Log4 = (target: any, name: string | Symbol, position: number) => {
  console.log("param decorator");
  console.log(target);
  console.log(name);
  // 0부터 시작하는 파라미터 index
  console.log(position);
};
class Product {
  //해당 데코레이터는 클래스 정의가 등록되는 순간에 실행된다
  @Log
  private _title: string;

  private _price: number;

  @Log2
  set price(val: number) {
    if (val > 0) {
      this._price = val;
    } else {
      throw new Error("invalid price");
    }
  }

  constructor(t: string, p: number) {
    this._price = p;
    this._title = t;
  }

  @Log3
  getPriceWithTax(@Log4 tax: number) {
    return this._price + tax;
  }
}

// 데코레이터는 메서드를 호출할때 사용되는 것이 아니고, 클래스가 정의 될때 사용된다
// 이 것이 데코레이터의 목적이다
// 데코레이터는 클래스가 정의 될때나 메서드 등이 등록될 때 실행되는 함수 일 뿐이다

// Autobind 구현

const Autobind = (
  _: any,
  _2: string | Symbol,
  descriptor: PropertyDescriptor
) => {
  // 메서드는 결국 함수를 값으로 갖는 프로퍼티이다
  const originalMethod = descriptor.value;
  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    enumerable: false,
    // 게터는 언제나 자신의 객체 내에서 실행되게 된다
    get() {
      const boundFn = originalMethod.bind(this);
      return boundFn;
    },
  };
  return adjDescriptor;
};

class Printer {
  message = "this printer work";

  @Autobind
  showMessage() {
    console.log(this.message);
  }
}

const printer = new Printer();
const button = document.querySelector("button")!;

button.addEventListener("click", printer.showMessage);

// 유효성 검증 예제

interface ValidatorConfig {
  [property: string]: {
    [validatableProp: string]: string[]; // ['required', 'positive'...]
  };
}

const registedValidators: ValidatorConfig = {};

function Required1(target: any, propName: string) {
  // name은 constructor에 모두 있고, 이 경우 Course를 반환 한다
  registedValidators[target.constructor.name] = {
    ...registedValidators[target.constructor.name],
    [propName]: ["required"],
  };
}

function PositiveNumber(target: any, propName: string) {
  // name은 constructor에 모두 있고, 이 경우 Course를 반환 한다
  registedValidators[target.constructor.name] = {
    ...registedValidators[target.constructor.name],
    [propName]: ["positive"],
  };
}

function validate(obj: any) {
  const objValidatorConfig = registedValidators[obj.constructor.name];
  if (!objValidatorConfig) {
    return true;
  }

  let isValid = true;
  for (const prop in objValidatorConfig) {
    for (const validator of objValidatorConfig[prop]) {
      switch (validator) {
        case "required":
          isValid = isValid && !!obj[prop];
          break;
        case "positive":
          isValid = isValid && obj[prop] > 0;
          break;
      }
    }
  }
  return isValid;
}
class Course {
  @Required1
  title: string;

  @PositiveNumber
  price: number;

  constructor(t: string, p: number) {
    this.title = t;
    this.price = p;
  }
}

const courseForm = document.querySelector("form")!;
courseForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const titleEl = document.getElementById("title") as HTMLInputElement;
  const priceEl = document.getElementById("price") as HTMLInputElement;

  const title = titleEl.value;
  const price = +priceEl.value;

  const createdCource = new Course(title, price);

  if (validate(createdCource)) {
    console.log(createdCource);
  } else {
    alert("xxx");
  }
});
