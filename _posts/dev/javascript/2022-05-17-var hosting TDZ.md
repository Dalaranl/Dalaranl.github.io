---
layout: single
title:  "var로 알아보는 Hoisting, TDZ"
excerpt: "let, const, var의 차이점은 뭘까? 차이점을 알아보며 Hoisting, TDZ에 관해 알아보자."
categories:
  - javascript
tag: [JavaScript, var, hoisting, TDZ]
header:
    teaser: "/assets/thumbnail/javascript.png"
---

# Var
var는 변수(var, let, const)들 중 하나로 초기 자바스크립트에서 많이 사용되던 변수이다. 요즘에는 거의 사용하지 않지만 과거의 프로젝트일 경우 충분히 만날 수 있으며, let과 const와는 다른 특성이 있기 때문에 var를 let, const로 변환하는 과정에서 예상치 못한 오류를 만날 수 있다.

<br/>

## 블록 스코프
var는 블록 스코프가 없다. 때문에 var로 선언한 변수의 스코프는 함수 스코프 이거나 전역 스코프이다.

```javascript
if (true) {
  var a = "var";
}

console.log(a); // "var"

if (true) {
  let a = "let";

  console.log(a) // "let"
}

console.log(a); // a is not defined
```

위의 코드를 보면 let은 if문 안에서만 접근이 가능하다. if문 밖에서 접근하면 오류가 발생하는 것을 볼 수 있다. 하지만 var는 블록 스코프가 없기때문에 해당 코드에서는 전역 스코프를 갖게되고 if문 밖에서도 접근에 가능해지는 것이다. 이는 for 문에서도 같게 동작한다.

```javascript
for (var i = 0; i < 10; i++) {
  // ...
}

console.log(i); // 10
```

하지만 함수안에 선언된 var라면 함수 스코프를 갖게 때문에 함수 밖에서는 접근이 불가능하다. (안에서는 위의 조건(if, for)을 같게 적용받는다. )

```javascript
function testVar() {
  if (true) {
    var block = "Var";
  }

  console.log(block); // "Var"
}

testVar();
console.log(block); // block is not defined
```

<br/>

## 중복 선언
만약 cat 이라는 이름의 변수를 let으로 중복 선언 했다 가정하자. 이 때 우리는 에러가 발생하는 것을 확인 할 수 있다.

```javascript
let cat = "레그돌";
let cat = "먼치킨"; 
// Error: Identifier 'cat' has already been declared.
```

하지만 var의 경우 오류가 발생하지 않으며 이전 선언된 변수가 무시되며 다시 선언 된다.

```javascript
var cat = "레그돌";
var cat = "먼치킨";
var cat = "러시안 블루"

console.log(cat) // "러시안 블루"
```

<br/>

## 선언 전 사용
var가 함수 안에 선언 되었다면 이는 함수가 시작 될 때 처리된다. 만약 전역에서 var를 선언했다면 이는 Javascript가 시작 될 떄 처리된다. 이와 같은 특징 때문에 아래의 3 코드는 모두 같게 동작된다.

``` javascript
function test1() {
  var cat;
  cat = "레그돌";

  console.log(cat)
}

test1()

function test2() {
  cat = "레그돌";

  console.log(cat)

  var cat;
}

test2()

function test3() {
  cat = "레그돌";

  if (true) {
    var cat;
  }

  console.log(cat)
}

test3()
```

위의 test2를 보면 var cat의 선언이 제일 끝에 되어있지만 에러가 발생하지 않는다. 이는 변수 선언이 함수의 시작과 동시에 이루어지기에 함수의 최상위로 끌어올려지는 것이다. 이러한 현상을 '호이스팅(Hoisting)'이라 한다.

<br/>
<br/>

# Hoisting
> JavaScript에서 호이스팅(hoisting)이란, 인터프리터가 변수와 함수의 메모리 공간을 선언 전에 미리 할당하는 것을 의미합니다. - MDN -

var 의 호이스팅은 위에 설명돼있기 떄문에 여기에서는 함수 Hoisting만 다루겠다.

<br/>

## 함수 호이스팅
함수의 호이스팅의 경우 함수가 함수 표현식인지 함수 선언식인지에 따라 결과가 다르다.
### 함수 선언식
```javascript
function hoisting() {
  hello()
  
  function hello() {
    console.log("hello") // hello
  }
}

hoisting()
```
함수 선언식의 경우 정상적으로 호이스팅이 발생하는 것을 확인 할 수 있다.

### 함수 표현식
```javascript
function hoisting() {
  hello() // hello is not a function
   
  var hello = function() {
    console.log("hello")
  }
}

hoisting()
```

함수 표현식의 경우 var를 사용했을 var에 대한 호이스팅은 발생하지만 함수 호출은 안 된다. 이는 var가 호이스팅 될 때 "undefined"로 초기화 되기 때문이다. (화살표 함수도 같은 현상이 발생한다.)

<br/>

## import
import 역시 호이스팅이 되기때문에 에러가 발생하지 않는다.
```javascript
hellow();
import { hellow } from './hellow';
```

<br/>

## let, const
위에서 호이스팅을 설명할 때 var만 예시로 들고 let과 const는 예시를 들지 않았다. 그러면 let과 const는 호이스팅이 되지 않는 것일까? 아래의 코드를 보자.

```javascript
cat1 = "레그돌";
let cat1;
// ReferenceError: Cannot access 'cat1' before initialization

cat2;
const cat2 = "먼치킨";
// ReferenceError: cat2 is not defined
```

let과 const는 위와 같이 ReferenceError가 발생하는 것을 볼 수 있다. 이러한 에러 때문에 let과 const는 호이스팅이 안 된다 라고 생각할 수 있지만 이는 잘못된 생각이다. let과 const는 호이스팅이 된다. 하지만 TDZ에 의해 접근이 금지되기 때문에 ReferenceError가 발생하는 것이다.

<br/>
<br/>

# TDZ(Temporal Dead Zone)
TDZ(Temporal Dead Zone)는 일시적인 사각지대를 뜻한다. 이에 대해 알아보기 위해서는 변수 선언의 3단계에 대해 먼저 알아보자.

<br/>

## 변수 선언의 3단계
변수선언은 선언(Declaration phase), 초기화(Initialization phase), 할당(Assignment phase)으로 이루어 진다.
### 1. 선언(Declaration phase)
변수를 실행 컨텍스트의 변수 객체에 등록하는 단계이다.

### 2. 초기화(Initialization phase)
실행 컨텍스트의 변수를 위해 메모리를 할당하는 과정으로 메모리가 만들어지면 처음에는 "undefined"가 할당된다.

### 3. 할당(Assignment phase)
사용자가 undefined로 초기화된 메모리의 다른 값을 할당하는 단계이다.

<br/>

## var와 let, const의 차이
var는 실행 컨텍스트에 변수가 등록되는 것과 동시에 undefined로 초기화되며 메모리가 할당된다. 즉, 선언과 초기화가 동시에 일어난다. 하지만 let과 const는 실행 컨텍스트에 변수가 등록은 되지만 TDZ에 의해 메모리 할당이 되지 않는다.(선언과 초기화가 분리되어 진행된다.) 때문에 var, let, const 모두 호이스팅은 되지만 var는 "undefined"로 let과 cosnt는 ReferenceError가 발생하게 되는 것이다.

<br/>

## Class
class또한 TDZ의 영향을 받는다. 때문에 아래와 같이 호이스팅을 해도 TDZ에 의해 ReferenceError가 발생하게 된다.
```javascript
const myName = new Name("dalaran"); // ReferenceError

class Name {
  constructor(name) {
    this.name = name;
  }
}
```

만약 부모 클래스를 상속받았을 경우 super()를 호출 하기 전까지 this는 TDZ에 바인딩 되어 있다. 때문에 super()가 호출 되기 전에는 this를 사용할 수 없다. 

```javascript
class Name {
  constructor(name) {
    this.name = name;
  }
}

class Job extends Name{
  constructor(name, job) {
    this.job = job;
    super(name);
  }
}

const introduce = new Job("dalaran", "front-end"); 
// ReferenceError
```

```javascript
class Name {
  constructor(name) {
    this.name = name;
  }
}

class Job extends Name{
  constructor(name, job) {
    super(name);
    this.job = job;
  }
}

const introduce = new Job("dalaran", "front-end"); 
console.log(introduce)

// 출력
Job {
  name: 'dalaran',
  job: 'front-end',
  __proto__: { constructor: ƒ Job() }
}
```

<br/>

## 함수의 매개변수
```javascript
const name = "dalaran";

function hello(name = name) {
  console.log(`Hello ${name}`)
}

hello() //ReferenceError
```
함수의 매개변수는 전역 스코프와 함수 스코프의 중간 스코프에 위치한다. 위의 코드에서 hello의 매개변수 name은 자기 자신을 참조하는데 전역변수의 name보다 같은 스코프에 있는 name을 먼저 참조하게 된다. 때문에 TDZ에 영향을 받는 매개변수는 ReferenceError를 발생시키게 된다.

```javascript
const myName = "dalaran";

function hello(name = myName) {
  console.log(`Hello ${name}`)
}

hello() // "Hello dalaran"
```

<br/>
<br/>

# 정리
- var는 블록 스코프가 없기때문에 전역 스코프 혹은 함수 스코프이다.
- var는 중복 선언을 할 경우 에러를 발생시키지 않으며 마지막에 선언된 값을 갖게된다.
- 호이스팅은 var, let, const 등 다 발생한다. 이때 발생하는 ReferenceError는 TDZ에 의한 에러이다.
- TDZ(Temporal Dead Zone)는 let, const, class, super(), 함수 매개변수에 영향을 준다.