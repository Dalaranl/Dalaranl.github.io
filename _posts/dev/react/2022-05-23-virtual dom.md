---
layout: single
title:  "브라우저의 동작 과정과 Virtual Dom"
excerpt: "브라우저의 동작원리를 알아보고 가상 Dom이 무엇을 하는지 알아보자."
categories:
  - react
tag: [React, Browser-Workflow, Virtual DOM, VDOM]
header:
    teaser: "/assets/images/2022-05-23/browserWorkflow.png"
---

React는 여러 가지 특징을 가지고 있다. 오늘은 그 특징 중 하나인 VDOM(Virtual DOM)에 관해 포스팅하려 한다. VDOM을 알기 위해서는 브라우저의 동작 과정을 알아야 할 필요가 있기 때문에 이에 대해 간단하게 알아보고 VDOM으로 넘어가 보려 한다.

# Browser의 동작 과정

<br />

## 렌더링 엔진
요청 받은 내용을 브라우저 화면에 표시한다. 기본적으로 렌더링 엔진은 HTML 및 XML 문서와 이미지를 표시할 수 있다. 각 브라우저는 서로다른 렌더링 엔진을 사용한다.
- Internet Explorer : Trident
- Firefox : Gecko
- Safari, Chrome : Webkit

<br />

## 렌더링 과정

![](/assets/images/2022-05-23/browserWorkflow.png)

* 파싱(parsing) : 코드를 브라우저가 이해할 수 있도록 변환하는 것

### 1. HTML 파싱, DOM 트리 생성
브라우저가 서버에서 HTML 문서를 받으면 렌더링 엔진이 이를 파싱하고 Node로 이루어진 DOM 트리를 생성한다.

### 2. CSS 파싱, 렌더트리 생성
CSS를 파싱하여 CSSOM(CSS Object Model)을 생성하고 해당 스타일 정보를 이용하여 렌더트리를 생성한다.

### 3. Layout(reflow)
각 노드들에게 좌표를 전달하여 화면상 어디에 배치될 지 결정된다.

### 4. Painting
각 노드를 거치면서 paint() 메소드를 호출한다.

<br/>

# VDOM(Virtual DOM)

<br />

## VDOM 이란?
VDOM은 가상의 DOM을 메모리에 저장하고 ReactDOM과 같은 라이브러리에 의해 실제 DOM과 동기화하는 프로그래밍 개념이다.

만약 화면을 구성하는 요소가 변화했을 때, 이를 바로 DOM에 동기화하는 것이 아니라 메모리에 저장된 VDOM에 먼저 적용을 시킨다. 그 후 실제 DOM과 비교해 변화한 부분을 확인 하고 해당 부분만 렌더링시켜 DOM에 적용시키는 것이다.

## VDOM을 사용하는 이유
VDOM을 사용하는 이유로는 렌더링 최적화에 있다. 근래에는 MPA(Multi Page Application)보다 SPA(Single Page Application)로 많이 개발한다. SPA는 필요 리소스를 한 번에 다운로드 받은 후 새로운 페이지를 요청 할 시 변경되는 부분만 렌더링하는 특징이 있다. 이러한 과정에서 필연적으로 DOM조작이 많이 이루어 지게 된다. VDOM은 이러한 과정을 먼저 처리하고 최종적인 결과를 DOM에 전달함으로써 연산량을 줄여주고 성능을 개선해 준다.

즉, VDOM은 여러 번 해야하는 DOM 작업을 내부적으로 연산하여 딱 1번만 하게 해주는 것이다.

# 요약
VDOM은 SPA로 넘어가는 과정에서 여러 번 발생되는 DOM 작업을 메모리에 저장된 가상 DOM에서 연산을 미리 함으로서 DOM조작을 한번만 하게 도와준다.

참고:
https://velopert.com/3236
https://woong-jae.com/web/210821-how-does-browser-work
https://jongminfire.dev/spa-single-page-application-%EB%9E%80