import React from 'react';
import { Router as DefaultRouter, Route, Switch } from 'react-router-dom';
import dynamic from 'umi/dynamic';
import renderRoutes from 'umi/_renderRoutes';
import RendererWrapper0 from '/opt/app/appservice/js-WfeAppGuoYuGame/src/pages/.umi/LocaleWrapper.jsx'

let Router = require('dva/router').routerRedux.ConnectedRouter;

let routes = [
  {
    "path": "/user",
    "redirect": "/user/login",
    "exact": true
  },
  {
    "path": "/form/step-form",
    "name": "stepform",
    "redirect": "/form/step-form/info",
    "exact": true
  },
  {
    "path": "/account/center",
    "redirect": "/account/center/articles",
    "exact": true
  },
  {
    "path": "/account/settings",
    "redirect": "/account/settings/base",
    "exact": true
  },
  {
    "path": "/",
    "redirect": "/dashboard/analysis",
    "exact": true
  },
  {
    "path": "/user",
    "component": dynamic({ loader: () => import('../../layouts/UserLayout'), loading: require('/opt/app/appservice/js-WfeAppGuoYuGame/src/components/PageLoading/index').default  }),
    "routes": [
      {
        "path": "/user/login",
        "component": dynamic({ loader: () => import('../User/Login'), loading: require('/opt/app/appservice/js-WfeAppGuoYuGame/src/components/PageLoading/index').default  }),
        "exact": true
      },
      {
        "path": "/user/register",
        "component": dynamic({ loader: () => import('../User/Register'), loading: require('/opt/app/appservice/js-WfeAppGuoYuGame/src/components/PageLoading/index').default  }),
        "exact": true
      },
      {
        "path": "/user/register-result",
        "component": dynamic({ loader: () => import('../User/RegisterResult'), loading: require('/opt/app/appservice/js-WfeAppGuoYuGame/src/components/PageLoading/index').default  }),
        "exact": true
      },
      {
        "component": () => React.createElement(require('/opt/app/appservice/js-WfeAppGuoYuGame/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
      }
    ]
  },
  {
    "path": "/",
    "component": dynamic({ loader: () => import('../../layouts/BasicLayout'), loading: require('/opt/app/appservice/js-WfeAppGuoYuGame/src/components/PageLoading/index').default  }),
    "Routes": [require('../Authorized').default],
    "routes": [
      {
        "path": "/dashboard",
        "name": "dashboard",
        "icon": "dashboard",
        "routes": [
          {
            "path": "/dashboard/analysis",
            "name": "analysis",
            "component": dynamic({ loader: () => import('../Dashboard/Analysis'), loading: require('/opt/app/appservice/js-WfeAppGuoYuGame/src/components/PageLoading/index').default  }),
            "exact": true
          },
          {
            "path": "/dashboard/monitor",
            "name": "monitor",
            "component": dynamic({ loader: () => import('../Dashboard/Monitor'), loading: require('/opt/app/appservice/js-WfeAppGuoYuGame/src/components/PageLoading/index').default  }),
            "exact": true
          },
          {
            "path": "/dashboard/workplace",
            "name": "workplace",
            "component": dynamic({ loader: () => import('../Dashboard/Workplace'), loading: require('/opt/app/appservice/js-WfeAppGuoYuGame/src/components/PageLoading/index').default  }),
            "exact": true
          },
          {
            "component": () => React.createElement(require('/opt/app/appservice/js-WfeAppGuoYuGame/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
          }
        ]
      },
      {
        "path": "/form",
        "icon": "form",
        "name": "form",
        "routes": [
          {
            "path": "/form/basic-form",
            "name": "basicform",
            "component": dynamic({ loader: () => import('../Forms/BasicForm'), loading: require('/opt/app/appservice/js-WfeAppGuoYuGame/src/components/PageLoading/index').default  }),
            "exact": true
          },
          {
            "path": "/form/step-form",
            "name": "stepform",
            "component": dynamic({ loader: () => import('../Forms/StepForm'), loading: require('/opt/app/appservice/js-WfeAppGuoYuGame/src/components/PageLoading/index').default  }),
            "hideChildrenInMenu": true,
            "routes": [
              {
                "path": "/form/step-form/info",
                "name": "info",
                "component": dynamic({ loader: () => import('../Forms/StepForm/Step1'), loading: require('/opt/app/appservice/js-WfeAppGuoYuGame/src/components/PageLoading/index').default  }),
                "exact": true
              },
              {
                "path": "/form/step-form/confirm",
                "name": "confirm",
                "component": dynamic({ loader: () => import('../Forms/StepForm/Step2'), loading: require('/opt/app/appservice/js-WfeAppGuoYuGame/src/components/PageLoading/index').default  }),
                "exact": true
              },
              {
                "path": "/form/step-form/result",
                "name": "result",
                "component": dynamic({ loader: () => import('../Forms/StepForm/Step3'), loading: require('/opt/app/appservice/js-WfeAppGuoYuGame/src/components/PageLoading/index').default  }),
                "exact": true
              },
              {
                "component": () => React.createElement(require('/opt/app/appservice/js-WfeAppGuoYuGame/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
              }
            ]
          },
          {
            "path": "/form/advanced-form",
            "name": "advancedform",
            "component": dynamic({ loader: () => import('../Forms/AdvancedForm'), loading: require('/opt/app/appservice/js-WfeAppGuoYuGame/src/components/PageLoading/index').default  }),
            "exact": true
          },
          {
            "component": () => React.createElement(require('/opt/app/appservice/js-WfeAppGuoYuGame/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
          }
        ]
      },
      {
        "path": "/list",
        "icon": "table",
        "name": "list",
        "routes": [
          {
            "path": "/list/table-list",
            "name": "searchtable",
            "component": dynamic({ loader: () => import('../List/TableList'), loading: require('/opt/app/appservice/js-WfeAppGuoYuGame/src/components/PageLoading/index').default  }),
            "exact": true
          },
          {
            "path": "/list/basic-list",
            "name": "basiclist",
            "component": dynamic({ loader: () => import('../List/BasicList'), loading: require('/opt/app/appservice/js-WfeAppGuoYuGame/src/components/PageLoading/index').default  }),
            "exact": true
          },
          {
            "path": "/list/card-list",
            "name": "cardlist",
            "component": dynamic({ loader: () => import('../List/CardList'), loading: require('/opt/app/appservice/js-WfeAppGuoYuGame/src/components/PageLoading/index').default  }),
            "exact": true
          },
          {
            "path": "/list/search",
            "name": "searchlist",
            "component": dynamic({ loader: () => import('../List/List'), loading: require('/opt/app/appservice/js-WfeAppGuoYuGame/src/components/PageLoading/index').default  }),
            "routes": [
              {
                "path": "/list/search/articles",
                "name": "articles",
                "component": dynamic({ loader: () => import('../List/Articles'), loading: require('/opt/app/appservice/js-WfeAppGuoYuGame/src/components/PageLoading/index').default  }),
                "exact": true
              },
              {
                "path": "/list/search/projects",
                "name": "projects",
                "component": dynamic({ loader: () => import('../List/Projects'), loading: require('/opt/app/appservice/js-WfeAppGuoYuGame/src/components/PageLoading/index').default  }),
                "exact": true
              },
              {
                "path": "/list/search/applications",
                "name": "applications",
                "component": dynamic({ loader: () => import('../List/Applications'), loading: require('/opt/app/appservice/js-WfeAppGuoYuGame/src/components/PageLoading/index').default  }),
                "exact": true
              },
              {
                "component": () => React.createElement(require('/opt/app/appservice/js-WfeAppGuoYuGame/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
              }
            ]
          },
          {
            "component": () => React.createElement(require('/opt/app/appservice/js-WfeAppGuoYuGame/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
          }
        ]
      },
      {
        "path": "/profile",
        "name": "profile",
        "icon": "profile",
        "routes": [
          {
            "path": "/profile/basic",
            "name": "basic",
            "component": dynamic({ loader: () => import('../Profile/BasicProfile'), loading: require('/opt/app/appservice/js-WfeAppGuoYuGame/src/components/PageLoading/index').default  }),
            "exact": true
          },
          {
            "path": "/profile/advanced",
            "name": "advanced",
            "component": dynamic({ loader: () => import('../Profile/AdvancedProfile'), loading: require('/opt/app/appservice/js-WfeAppGuoYuGame/src/components/PageLoading/index').default  }),
            "exact": true
          },
          {
            "component": () => React.createElement(require('/opt/app/appservice/js-WfeAppGuoYuGame/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
          }
        ]
      },
      {
        "name": "result",
        "icon": "check-circle-o",
        "path": "/result",
        "routes": [
          {
            "path": "/result/success",
            "name": "success",
            "component": dynamic({ loader: () => import('../Result/Success'), loading: require('/opt/app/appservice/js-WfeAppGuoYuGame/src/components/PageLoading/index').default  }),
            "exact": true
          },
          {
            "path": "/result/fail",
            "name": "fail",
            "component": dynamic({ loader: () => import('../Result/Error'), loading: require('/opt/app/appservice/js-WfeAppGuoYuGame/src/components/PageLoading/index').default  }),
            "exact": true
          },
          {
            "component": () => React.createElement(require('/opt/app/appservice/js-WfeAppGuoYuGame/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
          }
        ]
      },
      {
        "name": "exception",
        "icon": "warning",
        "path": "/exception",
        "routes": [
          {
            "path": "/exception/403",
            "name": "not-permission",
            "component": dynamic({ loader: () => import('../Exception/403'), loading: require('/opt/app/appservice/js-WfeAppGuoYuGame/src/components/PageLoading/index').default  }),
            "exact": true
          },
          {
            "path": "/exception/404",
            "name": "not-find",
            "component": dynamic({ loader: () => import('../Exception/404'), loading: require('/opt/app/appservice/js-WfeAppGuoYuGame/src/components/PageLoading/index').default  }),
            "exact": true
          },
          {
            "path": "/exception/500",
            "name": "server-error",
            "component": dynamic({ loader: () => import('../Exception/500'), loading: require('/opt/app/appservice/js-WfeAppGuoYuGame/src/components/PageLoading/index').default  }),
            "exact": true
          },
          {
            "path": "/exception/trigger",
            "name": "trigger",
            "hideInMenu": true,
            "component": dynamic({ loader: () => import('../Exception/TriggerException'), loading: require('/opt/app/appservice/js-WfeAppGuoYuGame/src/components/PageLoading/index').default  }),
            "exact": true
          },
          {
            "component": () => React.createElement(require('/opt/app/appservice/js-WfeAppGuoYuGame/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
          }
        ]
      },
      {
        "name": "account",
        "icon": "user",
        "path": "/account",
        "routes": [
          {
            "path": "/account/center",
            "name": "center",
            "component": dynamic({ loader: () => import('../Account/Center/Center'), loading: require('/opt/app/appservice/js-WfeAppGuoYuGame/src/components/PageLoading/index').default  }),
            "routes": [
              {
                "path": "/account/center/articles",
                "component": dynamic({ loader: () => import('../Account/Center/Articles'), loading: require('/opt/app/appservice/js-WfeAppGuoYuGame/src/components/PageLoading/index').default  }),
                "exact": true
              },
              {
                "path": "/account/center/applications",
                "component": dynamic({ loader: () => import('../Account/Center/Applications'), loading: require('/opt/app/appservice/js-WfeAppGuoYuGame/src/components/PageLoading/index').default  }),
                "exact": true
              },
              {
                "path": "/account/center/projects",
                "component": dynamic({ loader: () => import('../Account/Center/Projects'), loading: require('/opt/app/appservice/js-WfeAppGuoYuGame/src/components/PageLoading/index').default  }),
                "exact": true
              },
              {
                "component": () => React.createElement(require('/opt/app/appservice/js-WfeAppGuoYuGame/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
              }
            ]
          },
          {
            "path": "/account/settings",
            "name": "settings",
            "component": dynamic({ loader: () => import('../Account/Settings/Info'), loading: require('/opt/app/appservice/js-WfeAppGuoYuGame/src/components/PageLoading/index').default  }),
            "routes": [
              {
                "path": "/account/settings/base",
                "component": dynamic({ loader: () => import('../Account/Settings/BaseView'), loading: require('/opt/app/appservice/js-WfeAppGuoYuGame/src/components/PageLoading/index').default  }),
                "exact": true
              },
              {
                "path": "/account/settings/security",
                "component": dynamic({ loader: () => import('../Account/Settings/SecurityView'), loading: require('/opt/app/appservice/js-WfeAppGuoYuGame/src/components/PageLoading/index').default  }),
                "exact": true
              },
              {
                "path": "/account/settings/binding",
                "component": dynamic({ loader: () => import('../Account/Settings/BindingView'), loading: require('/opt/app/appservice/js-WfeAppGuoYuGame/src/components/PageLoading/index').default  }),
                "exact": true
              },
              {
                "path": "/account/settings/notification",
                "component": dynamic({ loader: () => import('../Account/Settings/NotificationView'), loading: require('/opt/app/appservice/js-WfeAppGuoYuGame/src/components/PageLoading/index').default  }),
                "exact": true
              },
              {
                "component": () => React.createElement(require('/opt/app/appservice/js-WfeAppGuoYuGame/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
              }
            ]
          },
          {
            "component": () => React.createElement(require('/opt/app/appservice/js-WfeAppGuoYuGame/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
          }
        ]
      },
      {
        "path": "/member",
        "name": "member",
        "icon": "team",
        "routes": [
          {
            "path": "/member/index",
            "name": "index",
            "component": dynamic({ loader: () => import('../Member/MemberList'), loading: require('/opt/app/appservice/js-WfeAppGuoYuGame/src/components/PageLoading/index').default  }),
            "exact": true
          },
          {
            "component": () => React.createElement(require('/opt/app/appservice/js-WfeAppGuoYuGame/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
          }
        ]
      },
      {
        "path": "/gamebox",
        "name": "gamebox",
        "icon": "google",
        "routes": [
          {
            "path": "/gamebox/tag",
            "name": "tag",
            "component": dynamic({ loader: () => import('../Gamebox/Tag'), loading: require('/opt/app/appservice/js-WfeAppGuoYuGame/src/components/PageLoading/index').default  }),
            "exact": true
          },
          {
            "path": "/gamebox/game",
            "name": "game",
            "component": dynamic({ loader: () => import('../Gamebox/Game'), loading: require('/opt/app/appservice/js-WfeAppGuoYuGame/src/components/PageLoading/index').default  }),
            "exact": true
          },
          {
            "path": "/gamebox/medal",
            "name": "medal",
            "component": dynamic({ loader: () => import('../Gamebox/Medal'), loading: require('/opt/app/appservice/js-WfeAppGuoYuGame/src/components/PageLoading/index').default  }),
            "exact": true
          },
          {
            "path": "/gamebox/doll",
            "name": "doll",
            "component": dynamic({ loader: () => import('../Gamebox/Doll'), loading: require('/opt/app/appservice/js-WfeAppGuoYuGame/src/components/PageLoading/index').default  }),
            "exact": true
          },
          {
            "component": () => React.createElement(require('/opt/app/appservice/js-WfeAppGuoYuGame/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
          }
        ]
      },
      {
        "component": dynamic({ loader: () => import('../404'), loading: require('/opt/app/appservice/js-WfeAppGuoYuGame/src/components/PageLoading/index').default  }),
        "exact": true
      },
      {
        "component": () => React.createElement(require('/opt/app/appservice/js-WfeAppGuoYuGame/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
      }
    ]
  },
  {
    "component": () => React.createElement(require('/opt/app/appservice/js-WfeAppGuoYuGame/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true })
  }
];

export default function() {
  return (
<RendererWrapper0>
          <Router history={window.g_history}>
      { renderRoutes(routes, {}) }
    </Router>
        </RendererWrapper0>
  );
}
