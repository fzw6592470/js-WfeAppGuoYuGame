import { parse } from 'url';

// mock tagListDataSource
let tagListDataSource = [{
  key: "1",
  disabled: false,
  name: "热门游戏",
  seq: "1",
  game_ids: "huojian1010917,yufuyefengkuang0911,qiumingshanpiaoyi0905,haishenlaile0905,qiangshou470904,jizhanxingqiu0904,eluosifangkuai0915,liubianxing0915",
  display_number: "4",
  display: 1,
  create_time: "2018-09-22 19:40:46",
  update_time: null,
  vaild_time: "2061-12-01 19:53:08",
},{
  key: "2",
  disabled: false,
  name: "最新上架",
  seq: "7",
  game_ids: "huojian1010917,eluosifangkuai0915,zhongqiuheka0914,zuijiuhaidao0915",
  display_number: "4",
  display: 1,
  create_time: "2018-09-22 19:40:49",
  update_time: null,
  vaild_time: "2061-12-01 19:53:08",
},{
  key: "3",
  disabled: false,
  name: "蹲坑必备",
  seq: "3",
  game_ids: "eluosifangkuai0915,jizhanxingqiu0904,liubianxing0915,huojian1010917",
  display_number: "4",
  display: 1,
  create_time: "2018-09-25 20:42:44",
  update_time: null,
  vaild_time: "2018-10-09 20:46:45",
},{
  key: "4",
  disabled: false,
  name: "旅行必备",
  seq: "6",
  game_ids: "qiumingshanpiaoyi0905,yufuyefengkuang0911,qiangshou470904",
  display_number: "4",
  display: 1,
  create_time: "2018-09-25 21:05:58",
  update_time: null,
  vaild_time: "2018-10-09 20:46:35",
},{
  key: "5",
  disabled: false,
  name: "解压必备",
  seq: "5",
  game_ids: "eluosifangkuai0915,haishenlaile0905,jizhanxingqiu0904,liubianxing0915",
  display_number: "4",
  display: 1,
  create_time: "2018-09-25 21:05:55",
  update_time: null,
  vaild_time: "2018-10-09 21:05:32",
},{
  key: "9",
  disabled: false,
  name: "所有游戏",
  seq: "10000",
  game_ids: "",
  display_number: "4",
  display: 1,
  create_time: "2018-09-22 19:40:52",
  update_time: null,
  vaild_time: "2061-12-01 19:53:08",
}];

function getBoxTagList(req, res, u) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }

  const params = parse(url, true).query;

  let dataSource = tagListDataSource;

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

function postBoxTagList(req, res, u, b) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }

  const body = (b && b.body) || req.body;
  const { method, key, id, name, seq, display_number, display, vaild_time, game_ids } = body;
  console.log("key:" + key +"id:"+id+"name:"+name+"seq:"+seq+"display_number:"+display_number+"display:"+display+"vaild_time:"+vaild_time+"game_ids:"+game_ids);

  switch (method) {
    /* eslint no-case-declarations:0 */
    case 'delete':
      tagListDataSource = tagListDataSource.filter(item => key.indexOf(item.key) === -1);
      break;
    case 'post':
      tagListDataSource.unshift({
        key: tagListDataSource.length + 1,
        disabled: false,
        name: name,
        seq: seq,
        game_ids: game_ids,
        display_number: display_number,
        display: display,
        update_time: null,
        vaild_time: vaild_time,
        create_time: new Date(new Date().getTime()),
      });
      break;
    case 'update':
      tagListDataSource = tagListDataSource.map(item => {
        if (item.key === key) {
          const update_time= new Date(new Date().getTime());
          Object.assign(item, { name, seq, display_number, display, vaild_time, game_ids, update_time });
          return item;
        }
        return item;
      });
      break;
    default:
      break;
  }

  const result = {
    list: tagListDataSource,
    pagination: {
      total: tagListDataSource.length,
    },
  };

  return res.json(result);
}

export default {
  'GET /box/boxTagList': getBoxTagList,
  'POST /box/boxTagList': postBoxTagList,
}
