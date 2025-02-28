// 故障文字特效
const faulttext = {
  player: {},
  texts: {},

  // 初始化
  init() {
    // 获取所有带有故障特效的元素
    this.texts = document.querySelectorAll(".faulttext");
  },

  fault() {
    // 清除定时器
    clearInterval(this.player);
    setTimeout(() => {
      clearInterval(this.player);

      // 遍历所有带有故障特效的元素 清除样式
      this.texts.forEach((text) => {
        text.classList.remove("faulttext_fault"); // 移除特效类
        text.style.transform = ""; // 重置位移
        text.style.clipPath = ""; // 重置裁剪区域
      });
    }, 500);
    // 每30毫秒执行一次故障效果
    this.player = setInterval(() => {
      this.texts.forEach((text) => {
        // 给每个字添加故障特效
        text.classList.add("faulttext_fault");

        // 随机位置，改变text的transform属性
        // ``反引号 + ${}：在字符串中插入变量，对应x,y的值
        // translate(x,y)
        // 实现+-30%变换位置
        text.style.transform = `translate(${Math.random() * 60 - 30}%,${
          Math.random() * 60 - 30
        }%)`;

        // 接下来随机生成一个矩形显示视窗，实现破碎效果
        let x = Math.random() * 100;
        let y = Math.random() * 100;
        let h = Math.random() * 50 + 50;
        let w = Math.random() * 40 + 10;
        text.style.clipPath = `polygon(${x}% ${y}%, ${x + w}% ${y}%, ${
          x + w
        }% ${y + h}%, ${x}% ${y + h}%)`;
      });
    }, 30);
  },
};

faulttext.init();
