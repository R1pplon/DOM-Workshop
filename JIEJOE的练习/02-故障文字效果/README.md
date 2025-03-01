# faulttext 实现思路

## 颜色分离

伪类`after/before`实现
**mix-blend-mode**实现颜色混合
**transform**实现位移

```css
.faulttext_fault::after,
.faulttext_fault::before {
  content: "CONTEXT";
  position: absolute;
  left: 0;
  top: 0;
  mix-blend-mode: screen;
}
.faulttext_fault::after {
  color: #ff0000;
  transform: translateX(2%);
}
.faulttext_fault::before {
  color: #0000ff;
  transform: translateX(-2%);
}
```

## 图像抖动

修改**transform**属性，给入随机值

```js
text.style.transform = `translate(${Math.random() * 60 - 30}%,${ Math.random() * 60 - 30 }%)`;
```

## 错位图块

修改**clipPath**属性，给入随机值

```js
let x = Math.random() * 100;
let y = Math.random() * 100;
let h = Math.random() * 50 + 50;
let w = Math.random() * 40 + 10;
text.style.clipPath = `polygon(${x}% ${y}%, ${x + w}% ${y}%, ${x + w}% ${ y + h }%, ${x}% ${y + h}%)`;
```
