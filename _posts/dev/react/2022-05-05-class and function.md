---
layout: single
title:  "Class와 Function"
excerpt: "Class와 Function의 차이점을 알아보고 클래스형에서 함수형으로 변화하게된 이유를 살펴보자."

categories:
  - react
tag: [react, class, function]
header:
    teaser: "/assets/thumbnail/javascript.png"
---

React에 관한 코드를 검색을 하면 나오는 글들 중 서로다른 형태의 코드를 본적이 있을것이다. 바로 Class를 사용한 방법과 function을 사용한 방법의 형태이다. 과거에는 함수형보다 클래스형 으로 코드를 많이 구현했지만 오늘날에는 점점 함수형으로 변하는 추세에 있다. 두 방식의 차이점에는 어떤 것이 있으며 왜 함수형으로 변화하게 되었는지 이번글에 포스팅하려 한다.

<br/>

# 차이점
## 1. rendering
두 방식의 가장 명확한 차이점은 구문에 있다. 
### Class
'Class'는 React.Component 렌더링 메서드가 있는 확장된 JavaScript 클래스이다. 때문에 Class형으로 코드를 만들 때는 만드시 'Component'를 상속받아야 한다.
```javascript
import React, { Component } from "react";

class Example extends Component {
 render() {
   return <h1>Hello, world</h1>;
 }
}
```

### Function
'Function'은 JSX를 반환하는 일반 JavaScript 함수이다.
```javascript
import React from "react";

function Example() {
 return <h1>Hello, world</h1>;
}
```
<br/>

## 2. Props 
### Class
클래스형은 component를 상속받기 떄문에 this.props로 접근해야 한다.
```javascript
import React, { Component } from "react";

class Example extends Component {
 render() {
   const { name } = this.props;
   return <h1>{name}</h1>;
 }
}
```

### function
함수형은 함수의 인자로 prop를 받는다. 이 떄 구조분해 할당이 가능하다.
```javascript
import React from "react";

// props
function Example(props) {
 return <h1>{props.name}</h1>;
}

// 구조분해
function Example({ name }) {
 return <h1>{name}</h1>;
}
```
<br/>

## 3. State
### Class
class에 constructor()를 생성한 후 그 안에 this.state를 선언하여 사용한다. state 값을 변경할 떄는 setState()를 사용해야 한다. 이 때 만약 super(props)를 호출하지 않는다면 this.props가 생성자에 정의되자 않아 버그가 발생할 수 있다.
```javascript
class ClassComponent extends React.Component {
 constructor(props) {
   super(props);
   this.state = {
     count: 0
   };
 }

 render() {
   return (
     <div>
       <p>count: {this.state.count} times</p>
       <button onClick={() => this.setState({ count: this.state.count + 1 })}>
         Click
       </button>
     </div>
   );
 }
}
```

### function
react에서 제공하는 Hook 중 하나인 useState를 사용한다. 배열을 구조화 하여 사용하며 JavaScript가 허용하는 모든 유형을 초기값으로 사용할 수 있다. (null, string, object...)
```javascript
const FunctionalComponent = () => {
 const [count, setCount] = React.useState(0);

 return (
   <div>
     <p>count: {count}</p>
     <button onClick={() => setCount(count + 1)}>Click</button>
   </div>
 );
};
```
<br/>

## 4. Life Cycle
### Class
상속받은 Component에서 생명주기 메소드를 재정의 하여 사용한다. 

```javascript
class ClassComponent extends React.Component {
 componentDidMount() {
   // 첫 렌더링이 완료된 직후
 }

 componentWillUnmount() {
   // 마운트 해제시
 }

 render() {
   return <h1>Hello, World</h1>;
 }
}
```

### Function
React에서 제공하는 Hook 중 하나인 useEffect를 사용한다. 의존성 배열 [ ]의 유무, return 등을 이용하여 class의 생명주기를 구현할 수 있다.
```javascript
const FunctionalComponent = () => {
 React.useEffect(() => {
   // compoenetDidMount
 }, []);

React.useEffect(() => {
   return () => {
     //componentWillUnmount
   };
 }, []);

 return <h1>Hello, World</h1>;
};
```

<br/>

# 마무리
위에 정리한 것 처럼 클래스형과 함수형은 여러 차이점이 있다. 여기서 차이점의 공통점을 보자면 함수형에서는 Hook을 사용하지 않으면 class와 같이 사용하기가 힘든 경우가 있다는 것이다(state, life cycle). React의 Hooks는 처음부터 있던 것이 아니다. 때문에 Hooks가 제공되지 않을 때는 함수형으로 구현할 수 없던 것들이 Hooks이 제공됨으로서 구현 가능하게 되었다. React에서 Hook사용을 권장하기도 하지만 복잡하게 구현되는 Class를 보다 쉽고 깔끔하게 구현하기 좋은 함수형이 유지보수 측면에서도 메리트가 있기에 요즘 더 선호되는 것이 아닌가라는 생각이 든다.