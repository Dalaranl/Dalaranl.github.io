---
layout: single
title:  "Next.js .env undefined error (with Firebase) 기록"
excerpt: "Next.js에서 환경변수를 설정했지만 값이 undefined로 읽어지지 않았다. 이에대한 해결법을 기록한다."

categories:
  - error
tag: [환경변수, env, undefined]
header:
    teaser: ""
---

최근 개인 프로젝트로 진행했던 프로젝트에서 Firebase와 openApi와 관련된 에러가 발생했다. 기존에 구동을 확인했던 코드에 문제가 생긴 것이었다. 결론부터 말하자면 이는 env와 관련된 에러였다. 때문에 발생한 문제와 해결방법을 순차적으로 기록한 후 결론을 정리하려한다.

# 1. env의 부재
문제가 발생한 부분은 Giphy openApi와 사용자의 클립 기록을 firebase를 통해 기록하는 부분이었다. 발생 원인은 api와 firebase의 key 값을 환경변수로 관리하였는데 이를 읽지 못해 발생한 문제였다. 나는 과거 local에 있는 프로젝트 폴더가 꼬여서 삭제하고 git에서 다시 받은적이 있다. 문제는 gitignore 파일에 .env가 포함되어 있기 때문에 git에는 .env가 존재하지 않는 것이었다. 때문에 다시 .env 파일을 생성한 후 환경변수를 설정해 주었다.
<br/>

# 2. Firebase 경로 문제
위의 방법으로 환경변수를 재 설정하니 Giphy api는 다시 정상적으로 작동하였다. 하지만 문제는 유저 기록을 남기는 코드 중 firebase 관련 코드였다. 원인을 알 수 없는 400(Bad request)에러가 계속 발생하였기 때문이다. 
<img with="500px" src="/assets/images/2022-09-19/env,경로문제.png" href="env,경로문제"/>

해당 문제의 원인은 import 경로에 있었다. 나의 기존코드는 아래와 같았다.
```javascript
import { getFirestore, collection, addDoc, doc, getDocs, getDoc } from "firebase/firestore/lite";
import { firebaseApp } from "../../../pages/_app";
```
하지만 에러확인 후 docs에서 확인한 import 경로는 아래와 같았다.
```javascript
import { getFirestore, collection, addDoc, doc, getDocs, getDoc } from "firebase/firestore";
import { firebaseApp } from "../../../pages/_app";
```
정말 간단한 문제였다. 하지만 경로 보다는 해당 함수 사용에 문제가 있는 것으로 판단했었기 때문에 (addDoc, etc...) 찾아내기까지 꽤 시간이 걸렸다. 버전이 수정될 떄 경로또한 수정될 수 있기 때문에 해당 부분 먼저 확인하고 넘어간다면 좀 더 빠른 문제해결이 가능하지 않았을까 생각한다.
<br/>

# 3. Firebase .env와 관련된 offline 문제
firebase의 import 경로를 수정하고 보니 이번에는 offline 관련 문제가 발생하였다. (가장 아래 error)
<img with="500px" src="/assets/images/2022-09-19/offline 문제.png" href="offline 문제"/>
해당문제에 대해 구글링을 하던 중 Stack Overflow에서 같은 문제를 발견하였다. 해당 답글에는 firebase key 값이 잘못됐을 경우 해당 에러가 발생할 수 있다 적혀있었다. 하지만 firebase에서 확인한 키값과 환경변수로 적용한 key 값은 같은 값이었다.

좌절 한 후 서칭을 더 하다보니 Stack Overflow에서 재밌는 글을 발견하였다. 자신도 같은 오류를 격었는데 알고보니 firebaseConfig의 값이 undefined로 읽히고 있었다는 것이었다. 이 글을 보고 나는 바로 console.log로 확은을 해 보았다.

**나의 firebaseConfig**
```javascript
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_APIKEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTHDOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECTID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGINGSENDERID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APPID,
};
```

**나의 .env**
```javascript
NEXT_PUBLIC_GIPHY_KEY=생략
NEXT_PUBLIC_FIREBASE_APIKEY=생략
NEXT_PUBLIC_FIREBASE_AUTHDOMAIN=생략
NEXT_PUBLIC_FIREBASE_PROJECTID=생략
NEXT_PUBLIC_FIREBASE_STORAGEBUCKET=생략
NEXT_PUBLIC_FIREBASE_MESSAGINGSENDERID=생략
NEXT_PUBLIC_FIREBASE_APPID=생략
```

**오류**
<img with="500px" src="/assets/images/2022-09-19/env undefine 문제.png" href="env undefine 문제"/>

확인한 결과 firebaseConfig가 undefined로 읽히고 있었다. 이러니 당연히 에러가 나지.. 하지만 문제는 내 env 설정에 딱히 문제가 없었다는 것이었다. 때문에 'Next.js env undefined'로 검색한 결과 Stack Overflow에서 같은 문제를 발견할 수 있었다. 해당 글의 답글에는 env 설정 순서에 대한 답글이 있었다.

1. env 파일을 만들어라.
2. 모든 환경변수에 NEXT_PUBLIC prefix를 추가해라
3. prefix process.env와 함께 사용해라(ex. process.env.NEXT_PUBLIC_TEST)
4. 서버 구동을 멈추고 재구동 하라.

해당글에서 내가 빼먹은 것이라고는 서버 재구동 말고는 없었다. 서버 구동을 멈추고 yarn dev를 한 결과 환경변수가 재대로 읽히면서 오류가 해결되는 것을 확인할 수 있었다.
<br/>

# 4. 결국 env 문제였다.
위의 2번을 확인하면 나는 Firebase의 400에러를 해결하기 위해 import 경로를 수정하였다. 하지만 3번까지 해결한 후 다시 경로를 기존 경로로 변경해보니 별 문제 없이 구동되었다. doc를 찾아보니 기존 경로는 firebase lite 버전으로 가벼운 독립형 REST 전용 firebase sdk 였다. 결국 근본적인 문제해결과는 상관없는 문제였던 것이다. 
<br/>

# 결론
결과적으로 이번 에러의 문제는 전적으로 환경변수의 문제였다. 나는 giphy openApi를 수정하기 위해 해당 키값만 환경변수로 추가하고 서버를 실행하였다. 이후 서버를 실행한 상태에서 firebase 키값을 환경변수에 추가했기 때문에 이를 읽지 못하고 undefined가 나오는 문제가 발생한 것이다. 즉, env를 설정할때는 서버를 끈 상태에서 설정하는것이 좋으며, 혹 서버를 연 상태로 추가했을 경우 반드시 재구동 후 테스트하는 습관을 가져야 할 것 같다.

# 요약
1. .env 파일은 보통 git에 안올라가게 설정한다.(gitignore) 때문에 git에서 다시 받을 때는 백업 후 추가하는 과정이 필요하다.
2. 서버를 구동시키고 env에 환경변수를 추가할 경우 이를 읽지 못한다. 때문에 서버를 재구동 하거나 끈 상태에서 env를 설정하도록 하자.