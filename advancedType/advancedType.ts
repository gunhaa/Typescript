type Admin = {
  name: string;
  privileges: string[];
};

type Employee = {
  name: string;
  startDate: Date;
};

// interface로 해도 같은 결과를 얻을 수 있다
// interface ElevatedEmployee extends Employee, Admin {}
type ElevatedEmployee = Admin & Employee;

const e1: ElevatedEmployee = {
  name: "gunha",
  startDate: new Date(),
  privileges: ["created-server"],
};

// 교차 타입 이용
type Combinable = string | number;
type Numberic = number | boolean;

type Universal = Combinable & Numberic;

// 함수 오버로딩
// js에서는 최적화가 들어가서 온다
function add(a: number, b: number): number;
function add(a: string, b: string): string;
// 타입가드
function add(a: Combinable, b: Combinable) {
  // 해당 부분을 타입가드, 런타임에 코드가 제대로 실행되도록 한다(유니온 타입을 막아준다)
  if (typeof a === "string" || typeof b === "string") {
    return a.toString() + b.toString();
  }

  return a + b;
}

type UnknownEmployee = Employee | Admin;

function printEmployeeInformation(emp: UnknownEmployee) {
  console.log("name: " + emp.name);

  // js의 타입만 쓸 수 있다, Employee같은 것은 타입스크립트에만 존재한다
  // if(typeof emp === 'Employee'){

  // js 코드이며, 해당 코드는 필드에 있는지 확인한다
  // 다른 형식의 타입가드
  if ("privilieges" in emp) {
    console.log("privilieges: " + emp.privilieges);
  }

  if ("startDate" in emp) {
    console.log("startDate: " + emp.startDate);
  }
}

printEmployeeInformation({ name: "gunah", startDate: new Date() });

class Car {
  drive() {
    console.log("driving...");
  }
}

class Truck {
  drive() {
    console.log("driving a truck...");
  }

  loadCargo(amount: number) {
    console.log("loading cargo ..." + amount);
  }
}

type Vehicle = Car | Truck;

const v1 = new Car();
const v2 = new Truck();

function useVehicle(vehicle: Vehicle) {
  vehicle.drive();

  // 런타임에 실행되는 js
  if (vehicle instanceof Truck) {
    vehicle.loadCargo(10000);
  }
}
useVehicle(v1);
useVehicle(v2);

// 유니언에서의 타입가드
// 클래스로도 가능
interface Bird {
  // 하나를 추가시켜 타입을 가드한다
  type: "bird";
  flySpeed: number;
}

interface Horse {
  type: "horse";
  runningSpeed: number;
}

type Animal = Bird | Horse;

function moveAnimal(animal: Animal) {
  let speed;
  switch (animal.type) {
    case "bird":
      speed = animal.flySpeed;
      break;
    case "horse":
      speed = animal.runningSpeed;
      break;
  }
  console.log("moving speed: " + speed);
}

moveAnimal({ type: "bird", flySpeed: 100 });

// 형변환
// HTMLElement | null로 추론된다
// ts는 html을 읽지 않기때문에 상태를 알 수 없다
// 확정시키기 위해 형변환을 시켜줘야한다
// 첫 번째 방법
// 햇갈리니 두번째 방법 추천
// const paragraph = <HTMLInputElement> document.querySelector("blockk");
// 두 번째 방법
const paragraph = (<HTMLInputElement>(
  document.querySelector("blockk")
)) as HTMLInputElement;

// 인덱스 타입
// 유연한 객체를 만들때 필요함

// 뭐가 들어갈지 모르지만, 유연해야 할때 사용한다

interface ErrorContainer {
  // 인덱스 타입은 반드시 문자열로 된 key가 존재해야하며, value는 string이여야 한다
  [key: string]: string;
}

const errorBag: ErrorContainer = {
  email: "Not a valid email",
  1: "1은 string으로 자동 변환 될 수 있음",
};

console.log(`errorBag: `, errorBag);

// ts는 오버로딩 시키면 함수의 호출 방법을 여러개로 오버로딩 시킨다
const result = add("gunha", "hwang");
// 해당 코드는 불가능하다, ts가 number인지 string인지 모른다
// as로 확정시키는 방법도 있지만, 함수 오버로딩도 한 방법이다
result.split(" ");

// 옵셔널 체이닝

const fetchedUserData = {
  id: "u1",
  name: "Max",
  job: { title: "CEO", description: "My own company" },
};
// job을 가져오지 않을 경우는?
// ts에선 호출이 문제가 생긴다


// 같은 동작을 한다, ?를 이용한 옵셔널 체이닝은 내부적으로 if문으로 최적화 된다
// js style
console.log(fetchedUserData.job && fetchedUserData.job.title);

//ts style
console.log(fetchedUserData?.job?.title);



// null 병합, nullish 데이터 처리

const userInput = '';

// falsy 값일때 연산 시킨다
// 하지만 ''도 falsy이고 js의 falsy범위가 넓어서 때문에 원하지 않게 바뀔 수 있다
const storedData = userInput || 'DEFAULT';

// 입력한 값이 뭐든 보존시키고 싶을때, null과 undefined만 바꾸고 싶은 경우 null 연산자를 사용하면 된다
const storedDataNullish = userInput ?? 'DEFAULT';
console.log(`storedData: ${storedData}`);
console.log(`storedDataNullish: ${storedDataNullish}`);
