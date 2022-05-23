var store = [{
        "title": "Custom Data Attributes",
        "excerpt":"  최근 프로그래머스 과제 테스트에서 고양이 사진 검색 사이트 과제구현을 해보았다. 해당 과제의 내용중에는 다크모드 구현이 있는데 이 때 알게 된 것이 Custom Data Attributes(data-*)이다. 나는 이 기능을 이용하여 data-theme 이라는 속성을 생성하였으며 이를 감지하여 css가 변경되는 코드를 만들어 과제를 해결하였다. data-*   MDN에 data-*은 이렇게 정의 되어 있다. data-* 전역 특성은...","categories": ["html","css"],
        "tags": ["data-*","html","css"],
        "url": "/html/css/Custom-Data-Attributes/",
        "teaser": "/assets//images/2022-04-25/%EB%8B%A4%ED%81%AC%EB%AA%A8%EB%93%9C.gif"
      },{
        "title": "typeof와 Data type",
        "excerpt":"JavaScript에는 ‘typeof’라는 연산자가 있다. 이는 자료형을 문자열로 반환해주는 연산자로 코드를 만들 때 종종 사용하게 된다. 하지만 이 연산자를 쓸 때 가끔 생각과는 다른 결과가 종종 나오기도 한다. 이는 Data type과 연관이 있는데 어떠한 경우에 이런 현상이 나타나는지 왜 이런 현상이 발생하는지에 대해 포스팅 하려한다. typeof typeof 연산자는 피연산자의 평가 전...","categories": ["javascript"],
        "tags": ["JavaScript","연산자","typeof","Data type","원시값","Primitive type","Reference type"],
        "url": "/javascript/typeof/",
        "teaser": "/assets/thumbnail/javascript.png"
      },{
        "title": "객체 지향 프로그래밍",
        "excerpt":"  흔히 JavaScript에 대해 설명하라 하면 자주 등장하는 단어가 객체 지향 언어이다. 이외에도 프로그래밍을 하다보면 객체 지향 프로그래밍이라는 단어를 종종 듣게된다. 이번 포스팅에서는 객체 지향 프로그래밍이 무엇인지, JavaScript가 왜 객체지향 언어라 할 수 있는지에 대해 정리해 보려한다. 객체지향 프로그래밍이란 객체 지향 프로그래밍(영어: Object-Oriented Programming, OOP)은 컴퓨터 프로그래밍의 패러다임 중 하나이다. 객체...","categories": ["javascript"],
        "tags": ["JavaScript","OOP","객체지향"],
        "url": "/javascript/oop/",
        "teaser": "/assets/thumbnail/javascript.png"
      },{
        "title": "Class와 Function",
        "excerpt":"React에 관한 코드를 검색을 하면 나오는 글들 중 서로다른 형태의 코드를 본적이 있을것이다. 바로 Class를 사용한 방법과 function을 사용한 방법의 형태이다. 과거에는 함수형보다 클래스형 으로 코드를 많이 구현했지만 오늘날에는 점점 함수형으로 변하는 추세에 있다. 두 방식의 차이점에는 어떤 것이 있으며 왜 함수형으로 변화하게 되었는지 이번글에 포스팅하려 한다. 차이점 1. rendering...","categories": ["react"],
        "tags": ["react","class","function"],
        "url": "/react/class-and-function/",
        "teaser": "/assets/thumbnail/javascript.png"
      },{
        "title": "상태관리 라이브러리의 장단점 정리",
        "excerpt":"React로 개발을 하다보면 props를 많이 사용하게 된다. 하지만 이 과정에서 구조상 props가 너무 깊게 내려간다거나 같은 하나의 데이터를 여러 컴포넌트에서 공통적으로 사용해야 하는 경우가 발생한다. 이 경우 상태 관리를 이용하여 이를 해결할 수 있는데, 상황에 따라 혹은 선호도에 따라 선택할 수 있는 라이브러리가 많다. 이번 포스팅에서는 상태관리 툴에 약간의 장단점과...","categories": ["react"],
        "tags": ["react","redux","mobx","context","recoil"],
        "url": "/react/redux-mobx-context/",
        "teaser": "/assets/thumbnail/react.png"
      },{
        "title": "React-Native installation",
        "excerpt":"React-Native React Native는 React 와 앱 플랫폼의 기본 기능을 사용하여 Android 및 iOS 애플리케이션을 빌드하기 위한 오픈 소스 프레임워크입니다 . React Native를 사용하면 JavaScript를 사용하여 플랫폼의 API에 액세스할 수 있을 뿐만 아니라 React 구성 요소를 사용하여 UI의 모양과 동작을 설명할 수 있습니다. 재사용 가능하고 중첩 가능한 코드 번들입니다. -React Native-...","categories": ["react-native"],
        "tags": ["react-native"],
        "url": "/react-native/react-native-intallation/",
        "teaser": ""
      },{
        "title": "useMemo, useCallback, React.memo",
        "excerpt":"React는 state, props의 값이 바뀌거나 부모 컴포넌트가 렌더링 됐을 떄 렌더링이 발생하는 특성이 있다. 때문에 상위 컴포넌트가 렌더링 됐을 때 하위 컴포넌트도 같이 렌더링이 되는 경우가 많다. 이러한 문제를 최적화 하기위해 제공하는 기능(hooks)인 useMemo, useCallback, React.memo에 대해 알아보도록 하자. (모든 에제코드는 react doc에 있는 예제이다.) Memoization 메모이제이션(memoization)은 컴퓨터 프로그램이 동일한...","categories": ["react"],
        "tags": ["react","useMemo","useCallback","React.memo"],
        "url": "/react/useMemo,-useCallback,-React.memo/",
        "teaser": "/assets/thumbnail/react.png"
      },{
        "title": "var로 알아보는 Hoisting, TDZ",
        "excerpt":"Var var는 변수(var, let, const)들 중 하나로 초기 자바스크립트에서 많이 사용되던 변수이다. 요즘에는 거의 사용하지 않지만 과거의 프로젝트일 경우 충분히 만날 수 있으며, let과 const와는 다른 특성이 있기 때문에 var를 let, const로 변환하는 과정에서 예상치 못한 오류를 만날 수 있다. 블록 스코프 var는 블록 스코프가 없다. 때문에 var로 선언한 변수의...","categories": ["javascript"],
        "tags": ["JavaScript","var","hoisting","TDZ"],
        "url": "/javascript/var-hosting-TDZ/",
        "teaser": ""
      },{
        "title": "브라우저의 동작 과정과 Virtual Dom",
        "excerpt":"React는 여러 가지 특징을 가지고 있다. 오늘은 그 특징 중 하나인 VDOM(Virtual DOM)에 관해 포스팅하려 한다. VDOM을 알기 위해서는 브라우저의 동작 과정을 알아야 할 필요가 있기 때문에 이에 대해 간단하게 알아보고 VDOM으로 넘어가 보려 한다. Browser의 동작 과정 렌더링 엔진 요청 받은 내용을 브라우저 화면에 표시한다. 기본적으로 렌더링 엔진은 HTML...","categories": ["react"],
        "tags": ["React","Browser-Workflow","Virtual DOM","VDOM"],
        "url": "/react/virtual-dom/",
        "teaser": "/assets/thumbnail/react.png"
      }]
