import { Component } from 'react';
import dva from 'dva';
import createLoading from 'dva-loading';

let app = dva({
  history: window.g_history,
  
});

window.g_app = app;
app.use(createLoading());

app.model({ namespace: 'doll', ...(require('/opt/app/appservice/js-WfeAppGuoYuGame/src/models/doll.js').default) });
app.model({ namespace: 'game', ...(require('/opt/app/appservice/js-WfeAppGuoYuGame/src/models/game.js').default) });
app.model({ namespace: 'global', ...(require('/opt/app/appservice/js-WfeAppGuoYuGame/src/models/global.js').default) });
app.model({ namespace: 'list', ...(require('/opt/app/appservice/js-WfeAppGuoYuGame/src/models/list.js').default) });
app.model({ namespace: 'medal', ...(require('/opt/app/appservice/js-WfeAppGuoYuGame/src/models/medal.js').default) });
app.model({ namespace: 'memberList', ...(require('/opt/app/appservice/js-WfeAppGuoYuGame/src/models/memberList.js').default) });
app.model({ namespace: 'project', ...(require('/opt/app/appservice/js-WfeAppGuoYuGame/src/models/project.js').default) });
app.model({ namespace: 'setting', ...(require('/opt/app/appservice/js-WfeAppGuoYuGame/src/models/setting.js').default) });
app.model({ namespace: 'user', ...(require('/opt/app/appservice/js-WfeAppGuoYuGame/src/models/user.js').default) });
app.model({ namespace: 'login', ...(require('/opt/app/appservice/js-WfeAppGuoYuGame/src/pages/User/models/login.js').default) });
app.model({ namespace: 'register', ...(require('/opt/app/appservice/js-WfeAppGuoYuGame/src/pages/User/models/register.js').default) });
app.model({ namespace: 'activities', ...(require('/opt/app/appservice/js-WfeAppGuoYuGame/src/pages/Dashboard/models/activities.js').default) });
app.model({ namespace: 'chart', ...(require('/opt/app/appservice/js-WfeAppGuoYuGame/src/pages/Dashboard/models/chart.js').default) });
app.model({ namespace: 'monitor', ...(require('/opt/app/appservice/js-WfeAppGuoYuGame/src/pages/Dashboard/models/monitor.js').default) });
app.model({ namespace: 'form', ...(require('/opt/app/appservice/js-WfeAppGuoYuGame/src/pages/Forms/models/form.js').default) });
app.model({ namespace: 'rule', ...(require('/opt/app/appservice/js-WfeAppGuoYuGame/src/pages/List/models/rule.js').default) });
app.model({ namespace: 'profile', ...(require('/opt/app/appservice/js-WfeAppGuoYuGame/src/pages/Profile/models/profile.js').default) });
app.model({ namespace: 'error', ...(require('/opt/app/appservice/js-WfeAppGuoYuGame/src/pages/Exception/models/error.js').default) });
app.model({ namespace: 'geographic', ...(require('/opt/app/appservice/js-WfeAppGuoYuGame/src/pages/Account/Settings/models/geographic.js').default) });

class DvaContainer extends Component {
  render() {
    app.router(() => this.props.children);
    return app.start()();
  }
}

export default DvaContainer;
