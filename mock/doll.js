import { parse } from 'url';

// mock dollListDataSource
let dollListDataSource = [];
for (let i = 0; i < 46; i += 1) {
  dollListDataSource.push({
    key: i,
    disabled: false,
    user_id: "gy-" + Math.ceil(Math.random() * 100000000),
    unionid: Math.ceil(Math.random() * 100000000),
    openid: Math.ceil(Math.random() * 100000000),
    nickname: `MartinCui-${i}`,
    gender: parseInt(i / 4, 10) % 2,
    status: [0, 1, 2][i % 3],
    email: Math.ceil(Math.random() * 1000) + '@qq.com',
    medal_ids: "[\"1\",\"2\",\"3\",\"4\",\"5\",\"6\"]",
    createdAt: new Date(new Date().getTime() - 1000 * 60 * 60 * 2 * i),
  });
}

function getDollList(req, res, u) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }

  const params = parse(url, true).query;

  let dataSource = dollListDataSource;

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

function postDollList(req, res, u, b) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }

  const body = (b && b.body) || req.body;
  const { method, name, desc, key } = body;

  switch (method) {
    /* eslint no-case-declarations:0 */
    case 'delete':
      dollListDataSource = dollListDataSource.filter(item => key.indexOf(item.key) === -1);
      break;
    case 'post':
      const i = Math.ceil(Math.random() * 10000);
      dollListDataSource.unshift({
        key: i,
        user_id: "gy-" + Math.ceil(Math.random() * 100000000),
        unionid: Math.ceil(Math.random() * 100000000),
        openid: Math.ceil(Math.random() * 100000000),
        nickname: `MartinCui-${i}`,
        gender: parseInt(i / 4, 10) % 2,
        status: ['active', 'exception', 'normal'][i % 3],
        email: Math.ceil(Math.random() * 1000) + '@qq.com',
        medal_ids: "['1','2','3','4','5','6']",
        createdAt: new Date(new Date().getTime() - 1000 * 60 * 60 * 2 * i),
      });
      break;
    case 'update':
      dollListDataSource = dollListDataSource.map(item => {
        if (item.key === key) {
          Object.assign(item, { desc, name });
          return item;
        }
        return item;
      });
      break;
    default:
      break;
  }

  const result = {
    list: dollListDataSource,
    pagination: {
      total: dollListDataSource.length,
    },
  };

  return res.json(result);
}

export default {
  'GET /doll/dollList': getDollList,
  'POST /doll/dollList': postDollList,
}
