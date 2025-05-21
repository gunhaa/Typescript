
// unknown 은 값을 모를때 사용한다
// 어떤 값을 넣어도 컴파일을 통과한다, any와 비슷하면서 다르다

let userInput: unknown;
let userName: string;

// 해당 경우는 컴파일이 통과되지 않는다, any와 가장 다른 점이다
// any보다 더 제한적이다
// userName = userInput;

if (typeof userInput === 'string'){
    userName = userInput;
}

// 이 함수는 절대 아무것도 반환하지 않는다고 명시한다 -> never
// while(true)의 무한루프도 해당 경우이다
// while(true) 루프, 에러의 throw에 사용되는 타입이다
function generateError(message: string, code: number): never{
    throw {message: message, errorCode: code};
}

const result = generateError('error occured!', 500);

// undefined가 출력되지 않는다
// 에러가 throw 되면 스크립트 실행을 취소한다
// try - catch로 묶을 수 있지만, 본질적으로 절대 값을 생성하지 않는다
// 반환값이 never이 된다
console.log(result);