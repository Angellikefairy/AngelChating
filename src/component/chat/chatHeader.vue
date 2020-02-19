<template>
    <div id="chatHeader">
        <div id="chat-name">
            <p>{{chatName}}</p>
        </div>
        <div id="chat-setting" v-show="svgDisplay">
            <svg viewBox="0 0 24 24"><g><path d="M12 18.042c-.553 0-1-.447-1-1v-5.5c0-.553.447-1 1-1s1 .447 1 1v5.5c0 .553-.447 1-1 1z"></path><circle cx="12" cy="8.042" r="1.25"></circle><path d="M12 22.75C6.072 22.75 1.25 17.928 1.25 12S6.072 1.25 12 1.25 22.75 6.072 22.75 12 17.928 22.75 12 22.75zm0-20C6.9 2.75 2.75 6.9 2.75 12S6.9 21.25 12 21.25s9.25-4.15 9.25-9.25S17.1 2.75 12 2.75z"></path></g></svg>
        </div>
    </div>
</template>

<script lang="ts">
import "reflect-metadata";
import {Vue,Component,Prop} from "vue-property-decorator";

@Component
export default class ChatHeader extends Vue {
    @Prop() name: string | undefined;
    @Prop() display: boolean | undefined;

    get chatName(): string {
        if(this.name) return this.name;
        const focusTargetId = this.$store.state.focusTargetId;
        const dialogList = this.$store.state.dialogList;
        for(let dialog of dialogList) {
            if(dialog.dialogTargetId === focusTargetId) {
                return dialog.dialogTargetName;
            }
        }
        return '';
    }

    get svgDisplay() {
        const display = this.display;
        if(display === undefined) {
            return true;
        }
        else return display;
    }
}
</script>

<style scoped>
#chatHeader {
    height: 70px;
    border-bottom: 1px solid rgba(208, 208, 208, 0.6);
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    padding: 0 18px;
}
#chat-name p {
    font-weight: 800;
    font-size: 19px;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Ubuntu, "Helvetica Neue", sans-serif;
    cursor: default;
}
</style>