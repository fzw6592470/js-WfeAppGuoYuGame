import { parse } from 'url';

// mock gameListDataSource
let gameListDataSource = [{
  key: "haishenlaile0905",
  disabled: false,
  name: "海神来了",
  short_name: "海神来了",
  display:"1",
  appid: "wxb1ec91b2c145b507",
  description: "升级版捕鱼，根本停不下来",
  seq: "1",
  icon: "https://www.guoyugame.com/cdn/icon_haishen.png",
  image: "https://baidu.com/bdimg/2.png",
  recommend: "1",
  local: "1",
  new_shelves: "1",
  medal_ids: "",
  pay_number: "",
  player_number: "",
  history_player_number: "",
  share_des: "[\"我刚才一步小心扑了一只海神，换了亿万财宝\",\"化身海神，捉鲲抓龙，无所不能！\",\"都什么年代了，现在都流行下海捉龙而且是纯金的！\"]",
  share_img: "[\"https://www.guoyugame.com/cdn/haishen_share01.jpg\",\"https://www.guoyugame.com/cdn/haishen_share02.jpg\",\"https://www.guoyugame.com/cdn/haishen_share03.jpg\"]",
  share_number: "",
  qrcode: "",
  type: "2",
  create_time: "2018-09-03 20:40:05",
  update_time: "2018-09-03 20:41:17",
  keywords: "捕鱼",
},{
  key: "jizhanxingqiu0904",
  disabled: false,
  name: "激战星球",
  short_name: "激战星球",
  display: "1",
  appid: "wx6e9ffcf6a656a555",
  description: "激战星球",
  seq: "3",
  icon: "https://www.guoyugame.com/cdn/icon_jzxq.png",
  image: "https://www.guoyugame.com/cdn/recommend.png",
  recommend: "1",
  local: "1",
  new_shelves: "1",
  medal_ids: "",
  pay_number: "",
  player_number: "",
  history_player_number: "",
  share_des: "",
  share_img: "",
  share_number: "",
  qrcode: "",
  type: "3",
  create_time: "2018-09-08 20:00:23",
  update_time: "",
  keywords: "枪械",
},{
  key: "mengjidazuozhan0905",
  disabled: false,
  name: "萌鸡大作战",
  short_name: "萌鸡大作战",
  display: "1",
  appid: "wxf76feec03720c978",
  description: "老鹰吃小鸡，小鸡吃糖果",
  seq: "2",
  icon: "https://www.guoyugame.com/cdn/icon_mengji.png",
  image: "https://baidu.com/bdimg/2.png",
  recommend: "1",
  local: "1",
  new_shelves: "1",
  medal_ids: "",
  pay_number: "",
  player_number: "",
  history_player_number: "",
  share_des: "[\"这里的小鸡捉老鹰，不信你来试试？\",\"这么可爱的小萌鸡，尽然化身为战斗鸡，他在保护谁！\",\"童年游戏，经典还原\"]",
  share_img: "[\"https://www.guoyugame.com/cdn/mengji_share01.jpg\",\"https://www.guoyugame.com/cdn/mengji_share02.jpg\",\"https://www.guoyugame.com/cdn/mengji_share03.jpg\"]",
  share_number: "",
  qrcode: "",
  type: "2",
  create_time: "2018-09-06 17:08:52",
  update_time: "",
  keywords: "贪吃蛇",
},{
  key: "qiangshou470904",
  disabled: false,
  name: "枪手47",
  short_name: "枪手47",
  display: "1",
  appid: "wxaa7e3cf1e3a95cdf",
  description: "枪手47",
  seq: "4",
  icon: "https://www.guoyugame.com/cdn/icon_mengji.png",
  image: "",
  recommend: "1",
  local: "1",
  new_shelves: "1",
  medal_ids: "",
  pay_number: "",
  player_number: "",
  history_player_number: "",
  share_des: "",
  share_img: "",
  share_number: "",
  qrcode: "",
  type: "3",
  create_time: "2018-09-08 20:01:09",
  update_time: "",
  keywords: "星球",
},{
  key: "qiumingshanpiaoyi0905",
  disabled: false,
  name: "秋名山漂移",
  short_name: "秋名山漂移",
  display: "1",
  appid: "wx19522df7228f9c4f",
  description: "经典赛车游戏，刺激你的感官",
  seq: "5",
  icon: "https://www.guoyugame.com/cdn/icon_jzxq.png",
  image: "",
  recommend: "1",
  local: "1",
  new_shelves: "1",
  medal_ids: "",
  pay_number: "",
  player_number: "",
  history_player_number: "",
  share_des: "",
  share_img: "",
  share_number: "",
  qrcode: "",
  type: "3",
  create_time: "2018-09-08 20:01:57",
  update_time: "",
  keywords: "赛车",
}];

function getGameList(req, res, u) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }

  const params = parse(url, true).query;

  let dataSource = gameListDataSource;

  if (params.sorter) {
    const s = params.sorter.split('_');
    dataSource = dataSource.sort((prev, next) => {
      if (s[1] === 'descend') {
        return next[s[0]] - prev[s[0]];
      }
      return prev[s[0]] - next[s[0]];
    });
  }

  if (params.status) {
    const status = params.status.split(',');
    let filterDataSource = [];
    status.forEach(s => {
      filterDataSource = filterDataSource.concat(
        dataSource.filter(data => parseInt(data.status, 10) === parseInt(s[0], 10))
      );
    });
    dataSource = filterDataSource;
  }

  if (params.name) {
    dataSource = dataSource.filter(data => data.name.indexOf(params.name) > -1);
  }

  let pageSize = 10;
  if (params.pageSize) {
    pageSize = params.pageSize * 1;
  }

  const result = {
    list: dataSource,
    pagination: {
      total: dataSource.length,
      pageSize,
      current: parseInt(params.currentPage, 10) || 1,
    },
  };
  console.log(result);

  return res.json(result);
}

function postGameList(req, res, u, b) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }

  const body = (b && b.body) || req.body;
  const { method, key, id, name, short_name, appid, description, icon, image, recommend, local, new_shelves, medal_ids, medal_rules, share_des, share_img, qrcode, type, keywords, display } = body;
  console.log("id:"+id+"name:"+name+"short_name:"+short_name+"appid:"+appid+"description:"+description+"icon:"+icon+"image:"+image+"recommend:"+recommend+"local:"+local+"new_shelves:"+new_shelves+"medal_ids:"+medal_ids+"medal_rules:"+ medal_rules+"share_des:"+share_des+"share_img:"+share_img+"qrcode:"+qrcode+"type:"+type+"keywords:"+keywords+"display:"+display);

  switch (method) {
    /* eslint no-case-declarations:0 */
    case 'delete':
      gameListDataSource = gameListDataSource.filter(item => key.indexOf(item.key) === -1);
      break;
    case 'post':
      gameListDataSource.unshift({
        key: id,
        disabled: false,
        name: name,
        short_name: short_name,
        display: display,
        appid: appid,
        description: description,
        seq: "",
        icon: icon,
        image: icon,
        recommend: recommend,
        local: local,
        new_shelves: new_shelves,
        medal_ids: medal_ids,
        pay_number: "",
        player_number: "",
        history_player_number: "",
        share_des: JSON.stringify(share_des.split(",")),
        share_img: JSON.stringify(share_img.split(",")),
        share_number: "",
        qrcode: qrcode,
        type: type,
        create_time: new Date(new Date().getTime()),
        keywords: keywords
      });
      break;
    case 'update':
      gameListDataSource = gameListDataSource.map(item => {
        if (item.key === id) {
          const update_time= new Date(new Date().getTime());
          Object.assign(item, { name, short_name, appid, description, icon, image, recommend, local, new_shelves, medal_ids, medal_rules, share_des, share_img, qrcode, type, keywords, display, update_time });
          return item;
        }
        return item;
      });
      break;
    default:
      break;
  }

  const result = {
    list: gameListDataSource,
    pagination: {
      total: gameListDataSource.length,
    },
  };

  return res.json(result);
}

export default {
  'GET /game/gameList': getGameList,
  'POST /game/gameList': postGameList,
}
