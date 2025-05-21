// 타입 명시, 타입스크립트가 객체를 인식할 수 있도록
var person = {
    name: "gunha",
    age: 30,
    hobbies: ["sports", "cooking"],
};
console.log(person.name);
for (var _i = 0, _a = person.hobbies; _i < _a.length; _i++) {
    var hobby = _a[_i];
    console.log(hobby);
}
