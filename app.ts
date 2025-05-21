// 타입 명시, 타입스크립트가 객체를 인식할 수 있도록
// 추론이 불가능하다면 유용하다
const person: {
  name: string;
  age: number;
  hobbies: string[];
  // 튜플 타입
  // n개의 요소가 있는 특별한 배열을 알린다
  // push로 들어오는 것은 타입스크립트가 막지 못해 주의가 필요하다
  role: [number, string];
} = {
  name: "gunha",
  age: 30,
  hobbies: ["sports", "cooking"],
  role: [2, 'author']
};

console.log(person.name);

// 타입스크립트가 막지 못해서 튜플 사용시 주의가 필요하다
// person.role.push(1);

for (const hobby of person.hobbies) {
  console.log(hobby);
}
