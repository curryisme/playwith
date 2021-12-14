import vue from 'vue'
export const config = {
  baseUrl: "", //公共URL
  uploadurl: "http://localhost:3001/", //公共URL
  appid: 'wx7a7a6431a88749ff',
  // qqappid: '101772536',
  level: [
    {
      value: "4",
      label: "黄金"
    },
    {
      value: "5",
      label: "铂金"
    },
    {
      value: "6",
      label: "钻石"
    },
    {
      value: "7",
      label: " 大师"
    },
    {
      value: "8",
      label: "宗师"
    },
    {
      value: "9",
      label: "王者"
    }, {
      value: "",
      label: "不限"
    }],
  posPlayer: [
    //1 上单 2 3中路 4.AD 5辅助
    { value: "1", label: "上单" },
    { value: "2", label: "打野" },
    { value: "3", label: "中路" },
    { value: "4", label: "AD" },
    { value: "5", label: "辅助" }
  ],
};
export let tgCode = () => {
  let tgCode = localStorage.getItem('tgCode') || '';
  return tgCode;
};
export let ghCode = () => {
  let ghCode = localStorage.getItem('ghCode') || '';
  return ghCode;
};
export let hzCode = () => {
  let hzCode = localStorage.getItem('hzCode') || '';
  return hzCode;
};