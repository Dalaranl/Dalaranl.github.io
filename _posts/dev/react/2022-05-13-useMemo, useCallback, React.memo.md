---
layout: single
title:  "useMemo, useCallback, React.memo"
excerpt: "useMemo, useCallback, React.memo의 개념과 주의사항을 알아보자."
categories:
  - react
tag: [react, useMemo, useCallback, React.memo]
header:
    teaser: "/assets/thumbnail/react.png"
---
React는 state, props의 값이 바뀌거나 부모 컴포넌트가 렌더링 됐을 떄 렌더링이 발생하는 특성이 있다. 때문에 상위 컴포넌트가 렌더링 됐을 때 하위 컴포넌트도 같이 렌더링이 되는 경우가 많다. 이러한 문제를 최적화 하기위해 제공하는 기능(hooks)인 useMemo, useCallback, React.memo에 대해 알아보도록 하자. (모든 에제코드는 react doc에 있는 예제이다.)

# Memoization
> 메모이제이션(memoization)은 컴퓨터 프로그램이 동일한 계산을 반복해야 할 때, 이전에 계산한 값을 메모리에 저장함으로써 동일한 계산의 반복 수행을 제거하여 프로그램 실행 속도를 빠르게 하는 기술이다. 동적 계획법의 핵심이 되는 기술이다. - 위키백과 -

<br/>

# useMemo
```javascript
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
```

- 함수가 실행된 반환값을 메모이제이션 하고 그 값을 반환한다. 만약 의존성배열 ( [ a, b ] )값이 변경되면 새로운 반환값을 메모이제이션 한 후 반환한다.

- 주로 계산량이 많아 비용을 높을 떄 사용한다.

- useMemo에 전달된 함수는 렌더링중에 실행되기 떄문에 렌더링 중에 동작하지 않는 함수를 넣어서는 안된다.

- 의존성배열이 없다면 렌더링될 떄마다 실행된다.

<br/>

# useCallback
```javascript
const memoizedCallback = useCallback(
  () => {
    doSomething(a, b);
  },
  [a, b],
);
```

- 메모이제이션된 함수를 반환한다.
- 의존성배열값이 변경되면 함수를 재 생성한다. 즉, 함수를 재생성한다.
- 함수 인스턴스를 지속적으로 유지해야 하는 경우에 사용한다.
- 의존성 값의 배열이 콜백 인자로 전달되지는 않는다. 따라서 콜백안에서 참조되는 모든 값은 의존성배열에 나타나야한다.
- useCallback(fn, deps)은 useMemo(() => fn, deps)와 같다.

<br/>

# 공통적인 주의사항
- 어플의 근본적인 문제를 해결하기 위해 useMemo나 useCallback을 사용하면 안 되며 이는 docs에도 명시되어 있다.(최적화를 위해 사용해할 수 있을 뿐이다.)
- 이들도 일정 코스트가 있기때문에 분별없이 남발하여 사용할 경우 오히려 성능 악화를 발생시킬 수 있다.
- 의존성 배열에 들어가는 값이 너무 많을 경우 사용하지 않는 것이 좋다.

<br/>

# React.memo
```javascript
function MyComponent(props) {
  /* props를 사용하여 렌더링 */
}
function areEqual(prevProps, nextProps) {
  /*
  nextProps가 prevProps와 동일한 값을 가지면 true를 반환하고, 그렇지 않다면 false를 반환
  */
}
export default React.memo(MyComponent, areEqual);
```

- HOC(Higher Order Component)이다.
- 렌더링 결과를 memo에 메모이제이션 한 후, 렌더링 시 동일한 결과를 렌더링 할 경우 이를 재사용한다.

## 주의사항
- porps 변화에만 영향을 준다. 때문에 state, context가 변한다면 다시 렌더링 된다.
- 이는 성능 최적화를 위해 사용해야하며 렌더링 방지시 사용할 경우 버그를 유발할 수 있다.
- 메모이제이션 작업시간이 필요하기 때문에 메모이제이션 이후 자주 사용되지 않는 컴포넌트라면 오히려 성능이 낮아질 수 있다.

<br/>



