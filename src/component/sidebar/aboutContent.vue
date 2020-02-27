<template>
  <div id="about-content">
      <el-dialog title="关于" :visible.sync="visible" @close="onClose">
        <el-collapse v-model="activeName" accordion>
            <el-collapse-item title="关于项目" name="1">
                <p><strong>该项目原型为fiora项目，一个出色的使用react,koa与mongodb编写的在线聊天应用</strong></p>
                <P>本项目充分参考了fiora项目的原型与设计，但使用了与原型项目完全不同的技术栈。因此，
                    这仍旧是一个90%~95%的代码为独立编写的项目。
                </P>
                <el-link type="info" href="https://fiora.suisuijiang.com/">fiora在线地址</el-link>
                <el-link style="margin-left: 20px;" type="info" href="https://github.com/yinxin630/fiora">fiora项目源码</el-link>
            </el-collapse-item>
            <el-collapse-item title="关于技术栈" name="2">
                <h4>前端技术栈</h4>
                <p>前端项目采用 Vue, Vuex, Vue Router 以及出色的UI框架 element-ui 进行编写</p>
                <h4>后端技术栈</h4>
                <p>后端项目使用 Nest.js, TypeORM, Socket.IO 以及 TypeScript 进行编写</p>
            </el-collapse-item>
            <el-collapse-item title="关于功能" name="3">
                <p>
                    由于时间有限，该项目仅实现了如您当前所见的基本功能。包括聊天应用应具备的基本功能：
                    <ul>
                        <li>群聊，私聊</li>
                        <li>消息列表，好友列表</li>
                        <li>添加好友，创建群组</li>
                        <li>默认表情，图片与文件的发送</li>
                    </ul>
                    另外，还有一些使用Html5的有趣的API实现的功能：
                    <ul>
                        <li>桌面消息通知（通过Notification进行实现）</li>
                        <li>Web截图（通过Canvas进行实现，但是由于Canvas.getImageData会获取页面隐藏信息，因此，截图效果并不理想）</li>
                    </ul>
                </p>
            </el-collapse-item>
            <el-collapse-item title="关于快捷键" name="4">
                <p>
                    以下可用快捷键
                    <ul>
                        <li>Enter: 发送消息（在输入框为聚焦状态下）</li>
                        <li>Alt + q/Q: 退出登录</li>
                        <li>Alt + A: 截图</li>
                        <li>Esc: 退出截屏；退出表情选取；</li>
                    </ul>
                </p>
            </el-collapse-item>
        </el-collapse>
      </el-dialog>
  </div>
</template>

<script lang="ts">
import "reflect-metadata";
import {Vue,Component,Prop} from "vue-property-decorator";

@Component
export default class AboutContent extends Vue {
    activeName: string = '1'; 
    @Prop() visible!: boolean;

    onClose() {
        this.$emit('update:visible',this.visible);
    }
}
</script>

<style>
.el-dialog__headerbtn .el-dialog__close {
    color: #909399 !important;
}
</style>