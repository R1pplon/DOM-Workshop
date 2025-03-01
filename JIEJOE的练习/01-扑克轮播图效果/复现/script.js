const poker = {
  // imgs存放图片数据
  imgs: [],
  // img_index用来记录索引，标记需要插入的图片
  img_index: 0,
  // poker_else是轮播的图片数组
  poker_else: {},
  // transform_datas用来记录图片的位置信息
  transform_datas: [
    "rotate(-10deg)",
    "rotate(-6deg) translate(35%, -12%)",
    "rotate(-2deg) translate(65%, -19%)",
    "rotate(2deg) translate(95%, -26%)",
    "rotate(6deg) translate(125%, -23%)",
  ],

  // 初始化轮播图
  init() {
    // 获取所有图片信息存入imgs数组中
    for (let i = 0; i <= 9; i++) {
      let img = new Image();
      img.src = `../photos/photo (${i}).webp`;
      this.imgs.push(img);
    }

    // 获取页面上的轮播图片元素
    this.poker_else = [...document.getElementsByClassName("poker")];

    // 遍历轮播图片元素，为每个元素设置索引值,标记位置
    this.poker_else.forEach((ele, index) => {
      ele.place_index = index;
    });

    // 初始化为第（位置数量+1）个图片
    this.img_index = this.poker_else.length;
  },
  move() {
    // 遍历所有轮播图片元素
    this.poker_else.map((ele) => {
      let place_index = ele.place_index;

      // 位置索引值大于等于轮播图片数量的情况:
      // 这是最后一张图片位置
      // 索引值重置为0(回到1号位)
      // 切换图片库里的下一位图片
      // 移除过渡动画
      if (place_index + 1 >= this.poker_else.length) {
        // 重置为0
        place_index = 0;

        // 移除过渡动画
        ele.style.transition = "";

        // 切换下一位图片
        ele.querySelector("img").src = this.imgs[this.img_index].src;

        // 图片索引值自增指向下一个图片，用于下一次调用
        this.img_index++;

        // 图片索引值超出范围重置为0
        if (this.img_index >= this.imgs.length) this.img_index = 0;
      } else {
        // 位置索引自增指向下一个位置
        place_index++;

        // 添加过渡动画
        ele.style.transition = "transform 0.2s ease";
      }

      // 设置当前元素的层级
      ele.style.zIndex = place_index;

      // 根据位置索引设置相应的位置数据
      ele.style.transform = this.transform_datas[place_index];

      // 更新当前元素的位置索引
      ele.place_index = place_index;
    });
  },
};

// 初始化
poker.init();
