# Module

## namespace

- 해당 방식으로 내보낼 수 있다
- 같은 네임스페이스를 쓴다면 같은 곳에 소속된다
- js에 없는, ts에만 있는 개념이다
  - 객체로 만들어서 최적화한다
- `outFile` 옵션을 켜야한다
  - module 설정 amd, system 필요
- `///` 의 ts 구문을 이용해서 가져온다

```typescript
namespace Namespace {
  // ...
  export interface Sample1 {}

  export interface Sample2 {}
}
```

## es6 module

- namespace를 이용한 방법은 파일에 의존하는거라 위험하다(변경, 삭제 위험)
- 모든 브라우저에서 지원한다
- 동일한 모듈을 여러 곳에서 import하더라도, 실제 모듈의 실행 코드는 한 번만 실행되며 그 결과는 캐싱되어 모든 import에 공유된다.

```javascript
import { 가져와야할것 } from './상대경로';

export 내보낼것
```
