// 회사 내부 툴, 여러 데이터를 관리하기 위한 어플리케이션

// 추상 클래스는 인스턴스화 할 수 없으며, 상속을 위해서만 존재한다
// 추상 클래스는 상속 받은 클래스에서 반드시 구현해야한다
abstract class Department {
  // private name: string = "DEFAULT";
  // 상속 관계에서는 사용가능하다(protected)
  protected employees: string[] = [];

  static someInformation: string;

  // 접근 방법말고 readonly도 존재한다(생성 후 변경사항이 없는 필드, final)

  // 생성자에 private name:string으로 한번에 필드 선언도 가능
  constructor(private readonly id: string, public name: string) {
    // this.name = name;

    // static은 해당 방식으로 접근 불가능하다
    // console.log(this.someInformation);
    console.log(Department.someInformation);

  }

  // 상속받는 클래스에서 구현을 강제한다
  abstract describe(this: Department): void
    // 생성된 인스턴스를 참조한다
    // console.log(`Department: ${this.name}`);


  addEmployee(employee: string) {
    this.employees.push(employee);
  }

  printEmployeeInformation() {
    console.log(this.employees.length);
    console.log(this.employees);
  }

  static createEmployee(name: string) {
    return { name: name };
  }

}

class ITDepartment extends Department {
  constructor(id: string, public admins: string[]) {
    super(id, "IT");
    this.admins = admins;
  }

  describe(this: Department): void {
      console.log("ITDepartment : " + this.name);
  }
}

class AccountingDepartment extends Department {
  private lastReport: string;

  constructor(id: string, private reports: string[]) {
    super(id, "Accouting");
    this.lastReport = reports[0];
  }

  describe(this: Department): void {
      console.log("AccountingDepartment : " + this.name);
  }

  // 게터 사용법
  get mostRecentReport() {
    if (this.lastReport) {
      return this.lastReport;
    }

    throw new Error("last report empty");
  }

  set mostRecentReport(value: string) {
    if (!value) {
      throw new Error("plz pass in a valid value");
    }
    this.addReport(value);
  }

  addEmployee(employee: string) {
    if (employee === "Max") {
      return;
    }
    this.employees.push(employee);
  }

  addReport(text: string) {
    this.reports.push(text);
    this.lastReport = this.reports[this.reports.length - 1];
  }

  printReports() {
    console.log(this.reports);
  }
}

// 싱글톤 패턴, private 생성자 사용
// 인스턴스는 1개, 정적 메서드나 프로퍼티를 사용할수 없거나 사용하기 싫을때 사용

class SingletonClazz {
  private static instance: SingletonClazz;

  private constructor(){}

  static getInstance() {
    if(SingletonClazz.instance) {
      return this.instance;
    }
    this.instance = new SingletonClazz();
    return this.instance;
  }
}
// const accounting = new Department("1", "Accounting");

// accounting.addEmployee("gunha1");
// accounting.addEmployee("gunha2");
// 좋지 못한 방식이다.. 외부 접근을 막아야한다
// ts에서 private로 방어 가능
// 기본 값은 public
// accounting.employees[2] = 'gunha3';

// accounting.describe();
// accounting.printEmployeeInformation();

// this는 해당 경우 문제가 생긴다
// this는 호출자를 찾기 때문에 이 경우 this는 값을 전달받지 않아 undefined가 된다
// 이 경우 accountingCopy에서는 name 프로퍼티가 없어 문제가 발생한다
// const accountingCopy = {describe : accounting.describe}
// accountingCopy.describe();
// 타입스크립트는 파라미터에 this: Department를 추가시켜 해당 문제를 방지할 수 있다

// const sales = new Department("sales");
// sales.describe();

const itAccounting = new ITDepartment("1", ["admin"]);

itAccounting.describe();
console.log(itAccounting);

const accountingDepartment = new AccountingDepartment("3", []);
// console.log('getter: ' +accountingDepartment.mostRecentReport);

accountingDepartment.mostRecentReport = "first error";
console.log("getter: " + accountingDepartment.mostRecentReport);

accountingDepartment.addReport("Something wrong....");

accountingDepartment.addEmployee("Max");
accountingDepartment.addEmployee("Maru");

accountingDepartment.printReports();
accountingDepartment.printEmployeeInformation();
console.log("getter: " + accountingDepartment.mostRecentReport);

// static -> 인스턴스 없이 사용할 수 있는 메서드
// ex) Math.pow() 같은 메서드를 의미한다

console.log(Department.createEmployee('createdEmployeeee'))