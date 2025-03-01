# poker-slides 实现思路

## 变换属性

CSS 的 transform 属性，可以改变元素的位置、旋转、缩放、倾斜等。
以下代码设置了 5 张扑克牌的位置属性

```css
.poker1 {
  transform: rotate(-10deg);
}
.poker2 {
  transform: rotate(-6deg) translate(35%, -12%);
}
.poker3 {
  transform: rotate(-2deg) translate(65%, -19%);
}
.poker4 {
  transform: rotate(2deg) translate(95%, -26%);
}
.poker5 {
  transform: rotate(6deg) translate(125%, -23%);
}
```

## 旋转位移

修改扑克牌的 transform 属性，即可实现扑克牌的旋转和位移。
基本实现示意代码：

```js
// transform_datas用来记录图片的位置信息
transform_datas: [
  "rotate(-10deg)",
  "rotate(-6deg) translate(35%, -12%)",
  "rotate(-2deg) translate(65%, -19%)",
  "rotate(2deg) translate(95%, -26%)",
  "rotate(6deg) translate(125%, -23%)",
];
// 获取页面上的轮播图片元素
this.poker_else = [...document.getElementsByClassName("poker")];

// 遍历所有轮播图片元素
this.poker_else.map((ele) => {
  // 获取当前轮播图片的位置索引
  let place_index = ele.place_index;
  // 位置索引自增
  place_index++;

  // 添加过渡动画
  ele.style.transition = "transform 0.2s ease";
  // 根据位置索引设置相应的位置数据
  ele.style.transform = this.transform_datas[place_index];
  // 更新当前元素的位置索引
  ele.place_index = place_index;
});
```

## 循环

**最后一位图片**回到首位
位置索引重置为 0
移除过渡动画

```js
if (place_index + 1 >= this.poker_else.length) {
  // 位置索引重置为0
  place_index = 0;

  // 移除过渡动画
  ele.style.transition = "";
}
```

## 显示更多图片

```js
// imgs存放图片数据
imgs: [],
// img_index用来记录索引，标记需要插入的图片
img_index: 0,

    // 获取所有图片信息存入imgs数组中
    for (let i = 0; i <= 9; i++) {
      let img = new Image();
      img.src = `../photos/photo (${i}).webp`;
      this.imgs.push(img);
    }
    // 初始化为第（位置数量+1）个图片
    this.img_index = this.poker_else.length;
```

循环时最后一位图片位插入新图片，并更新索引。

```js
// 切换下一位图片
ele.querySelector("img").src = this.imgs[this.img_index].src;

// 图片索引值自增指向下一个图片，用于下一次调用
this.img_index++;

// 图片索引值超出范围重置为0
if (this.img_index >= this.imgs.length) this.img_index = 0;
```
