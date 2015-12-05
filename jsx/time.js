module.exports = () => {
  'use stict';
  const currentTime = new Date();
  let output;
  let diem = 'AM';
  let h = currentTime.getHours();
  let m = currentTime.getMinutes();
  let s = currentTime.getSeconds();

  if (h === 0) {
    h = 12;
  }else if (h > 12) {
    h = h - 12;
    diem = 'PM';
  }

  if (m < 10) {
    m = '0' + m;
  }
  if (s < 10) {
    s = '0' + s;
  }
  output = {
    hours: h,
    minutes: m,
    seconds: s,
    diem
  };
  return output;
};