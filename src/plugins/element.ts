import Vue from 'vue'
import { 
    Button, 
    Input, 
    Message, 
    Avatar, 
    Dialog, 
    Tooltip, 
    Collapse, 
    CollapseItem,
    Link,
    Upload,
    Image,
    Loading,
    Switch,
    Popconfirm,
    MessageBox,
    Badge
} from 'element-ui'

Vue.use(Button);
Vue.use(Input);
Vue.use(Avatar);
Vue.use(Dialog);
Vue.use(Tooltip);
Vue.use(Collapse);
Vue.use(CollapseItem);
Vue.use(Link);
Vue.use(Upload);
Vue.use(Image);
Vue.use(Switch);
Vue.use(Popconfirm);
Vue.use(Badge);

Vue.use(Loading.directive);


Vue.prototype.$message = Message;
Vue.prototype.$loading = Loading.service;
Vue.prototype.$alert = MessageBox.alert;

