---
layout: single
title:  "React-Native installation"
excerpt: "React-Native cli를 설치하고 android studio, Xcode와 연동해보자."

categories:
  - React-Native
tag: [react-native]
header:
    teaser: ""
---

# React-Native
>React Native는 React 와 앱 플랫폼의 기본 기능을 사용하여 Android 및 iOS 애플리케이션을 빌드하기 위한 오픈 소스 프레임워크입니다 . React Native를 사용하면 JavaScript를 사용하여 플랫폼의 API에 액세스할 수 있을 뿐만 아니라 React 구성 요소를 사용하여 UI의 모양과 동작을 설명할 수 있습니다. 재사용 가능하고 중첩 가능한 코드 번들입니다. -React Native-

## Pros
  ### 1. 러닝 커브
  JavaScript 기반이기 때문에 JS를 사용하는 Front-end, Back-end 개발자라면 다른 언어를 학습하지 않아도 된다.

  ### 2. 컴포넌트 기반 (재사용성)
  React에서 파생되었기 때문에 Component 기반으로 구성된다. 때문에 생산성과 재사용성에서 메리트를 갖는다.

  ### 3. 멀티 플랫폼
  하나의 코드로 iOS, Andriod 둘 다 배포가 가능하다. (단, iOS의 경우 mac 에서만 가능하다.)

## Cons
  ### 1. 성능
  Hybrid App 이기 때문에 Native 개발 방식(kotlin, swift)에 비해 성능이 떨어진다.

  ### 2. 오픈 소스
  오픈 소스인 만킴 업데이트가 자주 되며, 그에 따른 버그 또한 동반될 수 있다.

<br/>

# Installation
## NVM
nodejs를 효율적으로 관리하기 위해 NVM(Node Version Manager)을 설치한 후 NVM을 통해 node를 설치한다. 작업은 터미널에서 진행된다.

-- NVM git : <https://github.com/nvm-sh/nvm>

1. nvm 설치
```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
```

2. 프로필 파일 설정 (~/.bash_profile, ~/.zshrc, ~/.profile, ~/.bashrc) editor는 vi, vim, nano 중 편한걸로 사용하면 된다.
ex)&nbsp;vi ~/.zshrc
```
export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
```

3. 프로필 파일 적용
```
source (프로필 파일) 
// ex) source ~/.zshrc
```

4. node 설치
```
nvm install (node version)
// ex) nvm install 16.15.0
```

5. 설치 node가 여러개인 경우 version 선택 (하나라면 생략 가능)
```
nvm use (node version)
// ex) nvm install 16.15.0
```

6. 설치 버전 확인
npm은 node 설치시 자동으로 설치된다.
```
node -v
npm --version
```

<br/>

## Android Studio
-- site : https://developer.android.com/studio?gclid=Cj0KCQjwmuiTBhDoARIsAPiv6L96YmsgQaA6C0sw7QrkwrWR7cOENZuCZNNmzC8NhfdFaad-PClQpoIaAsDJEALw_wcB&gclsrc=aw.ds

1. 해당 링크에서 Download Andriod Studio 클릭 후 설치

2. More Actions - SDK Manager 설정
Show Package Details 클릭 한 후 필요한 SDK를 설치한다. (최신 버전이나 React-Native doc에서 추천하는 SKD를 설치한다.)

<img src="/assets/images/2022-05-11/SDK_Manager.png" />

3. More Atcions - Virture Device Manager 설정
- create device 클릭 후 원하는 device를 정한 후 Next
- target을 설치한 SDK로 설정한 후 Next
<img src="/assets/images/2022-05-11/AVD_Setting.png" />
- AVM Name 및 필요 설정 후 Finish
<img src="/assets/images/2022-05-11/AVD_Finish.png" />

4. 환경 변수 프로필 파일에 설정  (~/.bash_profile, ~/.zshrc, ~/.profile, ~/.bashrc) editor는 vi, vim, nano 중 편한걸로 사용하면 된다.
ex)&nbsp;vi ~/.zshrc
```
export ANDROID_SDK_ROOT=/Users/dalaran/Library/Android/sdk
export PATH=$PATH:$ANDROID_SDK_ROOT/emulator
export PATH=$PATH:$ANDROID_SDK_ROOT/platform-tools
```

이 때 ANDROID_SDK_ROOT 가 Android SDK Location 경로와 같아야한다.
<img src="/assets/images/2022-05-11/SDK_Location.png" />

5. 변경사항 적용
```
source ~/.zshrc
```

6. adb로 적용 확인
```
 ✘ Dalaran ✨   ~/Desktop/blog/dalaranl.github.io   master ±  adb
Android Debug Bridge version 1.0.41
Version 33.0.1-8253317
Installed as /Users/dalaran/Library/Android/sdk/platform-tools/adb
```

<br/>

## Oracle Java
--site : https://www.oracle.com/java/technologies/downloads/

해당 링크에서 JAVA SE 다운로드.

- version 확인
```
java --version
```

- 설치 파일 위치
```
/Library/Java/JavaVirtualMachines/
```

<br/>

## Xcode
1. AppStore에서 Xcode 검색 후 설치
2. Xcode 설정
Xcode - Preferences - Location - Command Line Tools 선택
<img src="/assets/images/2022-05-11/Xcode.png" />

<br/>

## CocoaPod
Object-C 혹은 Swift로 개발된 오픈 라이브러리를 간편하게 확장 시키게 도와주는 iOS용 프로그램이다.

!! 설치 전 OS 버전과 Xcode 버전을 확인 후 이와 호환되는 cocoapods 버전을 설치한다.

1. gem을 이용하여 설치
```
sudo gem install cocoapods

// 특정 version을 설치하고 싶을 때
sudo gem install cocoapods -v (version)
```

2. version 확인
```
pod --version
```

<br/>

## React-Native CLi
1. 설치
```
npm install -g react-native-cli
// -g 는 Global 옵션이다.
```

<br/>

# 프로젝트 생성
프로젝트를 생성할 폴더 위치에서 시작
```
react-native init (프로젝트 명)

// version 지정

react-native init --version (version) (프로젝트 명)
```

# 연동 확인
## iOS
yarn을 이용하여 구동한다.
```
1. yarn install

2. cd ./ios

3. pod install

4. yarn ios
```

만약 build error가 발생할 경우 검색으로 해결한다.

### command
- command + R
  : 코드를 적용시키기 위해 화면을 Refresh 한다.

- command + D - Disable Fast Refresh
  : Refresh를 자동으로 해준다.





