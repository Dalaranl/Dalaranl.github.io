---
defaults:
  # _posts
  - scope:
      path: ""
      type: posts
    values:
      layout: single
      title:  "Custom Data Attributes"
      categories: css
      tag: [data-*, css]
      toc: true
      author_profile: true
      read_time: true
      comments: true
      share: true
      related: true
---
&nbsp;&nbsp;최근 프로그래머스 과제 테스트에서 고양이 사진 검색 사이트 과제구현을 해보았다. 해당 과제의 내용중에는 다크모드 구현이 있는데 이 때 알게 된 것이 Custom Data Attributes(data-*)이다. 나는 이 기능을 이용하여 data-theme 이라는 속성을 생성하였으며 이를 감지하여 css가 변경되는 코드를 만들어 과제를 해결하였다.

# data-*

&nbsp;&nbsp;MDN에 data-*은 이렇게 정의 되어 있다.
> data-* 전역 특성은 사용자 지정 데이터 특성(custom data attributes)이라는 특성 클래스를 형성함으로써 임의의 데이터를 스크립트로 HTML과 DOM 사이에서 교환할 수 있는 방법입니다.

element에 "data-"로 시작하는 속성을 주게 되면 해당 속성 안에 원하는 값을 저장할 수 있다.

``` javascript
<div class="example" data-theme="dark">
    custom data attributes
</div>
<script>
    console.log(
        document.querySelector(".example").dataset.theme)
    // dark
</script>
```

위와 같이 'data-theme'라는 커스텀 속성에 "dark"라는 값을 할당할 수 있는 것이다.
이처럼 커스텀 속성을 부여해 두면 dataset 프로퍼티를 이용하여 해당 속성에 접근할 수 있다.

만약 "data-hellow-world" 와 같이 여러 단어가 구성돼 있다면 dataset으로 접근 시 카멜케이스로 변경하여 접근해야 한다.<br/>
ex) dataset.hellowWorld

# 적용 코드
먼저 js에서 $target (html의 <div id="App">)을 잡은 후 theme라는 변수에 matchMedia를 통해 "dark" 혹은 "light"를 할당한 후 이를 setAttribute를 통해 $target에 속성값을 주었다.

```html
// App.js
class App {
  state = {
    ...
    theme: window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light",
    ...
  };

  constructor($target) {
    this.$target = $target;

    this.changeTheme = new ChangeTheme({
      $target,
      theme: this.state.theme,
      onClick: (nowTheme) => {
        if (nowTheme === "dark") {
          this.setState({ theme: "light" });
        } else {
          this.setState({ theme: "dark" });
        }
        this.changeTheme.render();
      },
    });
    ...
  }
}

// ChangeTheme.js
class ChangeTheme {
  constructor({ $target, theme, onClick }) {
    this.$target = $target;
    this.theme = theme;
    $target.setAttribute("data-theme", theme);
    const $changeTheme = document.createElement("button");
    this.$changeTheme = $changeTheme;
    this.$changeTheme.className = "ChangeTheme";
    this.$changeTheme.textContent = "테마 변경";
    
    $target.appendChild(this.$changeTheme);

    $changeTheme.addEventListener("click", () => {
      onClick(this.theme);
    });
  }

  setState(nextData) {
    this.theme = nextData;
  }

  render() {
    this.$target.setAttribute("data-theme", this.theme);
  }
}
```

버튼을 누르면 App에서 theme 값을 바꿔주며 setAttribute로 바뀐 값을 적용시켜 주고 있다.

```css
:root {
  --font-color: #000;
  --bg-color: #fff;
  --border-color: #000;
}

[data-theme="dark"] {
  --font-color: #fff;
  --bg-color: #000;
  --border-color: #fff;
}
```

이처럼 data-theme의 속성값을 변경해주면 css에서 이를 감지해 root에 선언된 변수값을 변하게 하였다. 테마에 따라 변경해줄 css에 해당 변수값을 적용시키면 간단한 다크모드를 만들 수 있다.

이상으로 결과화면과 함께 포스팅을 마치겠다.

![](/assets//images/2022-04-25/%EB%8B%A4%ED%81%AC%EB%AA%A8%EB%93%9C.gif)
