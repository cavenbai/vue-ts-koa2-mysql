const read = require('./ready');
const write = require('./write');
const url = 'https://huaban.com/?page=5'; // 目标页面

(async () => {
  // 异步抓取目标页面
  const movies = await read(url);
  // 写入数据到数据库
  await write(movies);
  // 完毕后退出程序
  process.exit();
})();
