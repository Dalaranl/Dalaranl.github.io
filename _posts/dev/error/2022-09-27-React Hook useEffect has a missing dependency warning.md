---
layout: single
title:  "React Hook useEffect has a missing dependency warning 해결법"
excerpt: "useEffect dependency 관련 경고 해결법"

categories:
  - error
tag: [useEffect, warning, dependency]
header:
    teaser: ""
---

지뢰찾기 토이프로젝트를 진행하면서 useEffect dependency 관련 경고가 발행했다. 이러한 경고가 발생하는 이유와 해결법에 대해 기록한다.

# 1. 문제 발생
```javascript
useEffect(() => {
    if (flagPosition.length === props.countOfMine) {
      isClearGame();
    }
}, [flagPosition]);

const clearGame = () => {
  props.setIsStart(false);
  props.setIsClear();
};

const isClearGame = () => {
  let count = 0;
  flagPosition.map((el) => {
    if (field[el[0]][el[1]].value === MINE) count++;
  });
  if (count === props.countOfMine) {
    clearGame();
  }
};
```
위의 코드는 지뢰찾기에서 지뢰를 찾았을 때(우클릭으로 깃발을 새웠을 때) 게임 클리어를 판별하기 위한 함수이다. 이 때 flagPosition이 갱신될 때 판별을 하기 위해 useEffect를 사용하였는데 해당 코드에서 dependency 관련 경고가 발생하였다.
![dependency warning](/assets/images/2022-09-27/dependency_warning.png)

# 2. 발생 이유
위의 경고메세지를 보면 dependency에 isClearGame을 포함시키거나 삭제하라고 써져있다. 이는 성능 문제와 연관이 있다. useEffect는 기본적으로 렌더링이 될 때마다 실행된다. 때문에 10번 렌더링이 발생한다면 useEffect 또한 10번 실행되는 것이다. 이러한 문제를 막기 위해 dependency([]) 안에 어떠한 값을 넣으면 랜더링이 발생했을 때, 해당 값에 변화가 있는지 판단하여 useEffect를 실행하게 된다. 

## 왜 isClearGame을 dependency에 넣지 않았는가?
나는 dependency에 값을 넣는 이유는 해당값의 변화를 감지하여 useEffect를 실행시킨다고 알고 있었기 때문이다. 즉, flagPosition이 변경됐을 때만 useEffect를 실행시키기위해 flagPosition만 추가한 것이다. 하지만 dependency는 해당값을 기준으로 useEffect를 실행시키게 하는것이 아니라 useEffect는 기본적으로 실행 되지만 dependency를 줌으로써 렌더링이 되었을 때 실행할지 말지 판단요소를 주는 역할을 하는 것이다.

# 3. 해결 과정
## dependency에 추가
```javascript
  useEffect(() => {
    if (flagPosition.length === props.countOfMine) {
      isClearGame();
    }
  }, [flagPosition, props.countOfMine, isClearGame]);

  const clearGame = () => {
    props.setIsStart(false);
    props.setIsClear();
  };

  function isClearGame() {
    let count = 0;
    flagPosition.map((el) => {
      if (field[el[0]][el[1]].value === MINE) count++;
    });
    if (count === props.countOfMine) {
      clearGame();
    }
  }
```
위 처럼 코드를 수정했을 때 isClearGame 함수에서 이러한 경고창이 뜬다. '해당 함수는 useEffect의 dependency로 렌더링 될 때 마다 만들어 진다.' 때문에 이를 해결하기 위해 useCallback()을 사용하자.

## useCallback으로 변경
```javascript
  const clearGame = () => {
    props.setIsStart(false);
    props.setIsClear();
  };

  const isClearGame = useCallback(() => {
    let count = 0;
    flagPosition.map((el) => {
      if (field[el[0]][el[1]].value === MINE) count++;
    });
    if (count === props.countOfMine) {
      clearGame();
    }
  }, [field, flagPosition, props.countOfMine, clearGame]);

  // game clear event
  useEffect(() => {
    if (flagPosition.length === props.countOfMine) {
      isClearGame();
    }
  }, [flagPosition, props.countOfMine, isClearGame]);
```
useCallback은 함수 표현식이기 때문에 hosting이 되지 않는다. 때문에 useEffect를 아래로 내려주었다. 위처럼 수정했을 경우 clearGame 또한 useCallback의 dependency에 속해있기 때문에 useCallback을 사용하라는 경고가 뜬다. 해당 함수 또한 useCallback으로 바꾸어도 되지만 불필요하게 나눈 함수라 판단되어 합쳐버렸다.

# 해결 완료 코드
```javascript
  const clearGame = useCallback(() => {
    let count = 0;
    flagPosition.map(el => (
      field[el[0]][el[1]].value === MINE count++;
    ));

    if (count === props.countOfMine) {
      props.setIsStart(false);
      props.setIsClear();
    }
  }, [field, flagPosition, props]);

  // game clear event
  useEffect(() => {
    if (flagPosition.length === props.countOfMine) {
      clearGame();
    }
  }, [flagPosition, props.countOfMine, clearGame]);
```