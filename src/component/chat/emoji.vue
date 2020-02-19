<template>
  <div id="default-emoji">
    <div class="wrapper">

      <emoji-picker @emoji="append" :search="search">
        <div
          class="emoji-invoker"
          slot="emoji-invoker"
          slot-scope="{ events: { click: clickEvent } }"
          @click.stop="clickEvent"
        >
            <svg slot="suffix" viewBox="0 0 24 24"><g><path d="M12 22.75C6.072 22.75 1.25 17.928 1.25 12S6.072 1.25 12 1.25 22.75 6.072 22.75 12 17.928 22.75 12 22.75zm0-20C6.9 2.75 2.75 6.9 2.75 12S6.9 21.25 12 21.25s9.25-4.15 9.25-9.25S17.1 2.75 12 2.75z"></path><path d="M12 17.115c-1.892 0-3.633-.95-4.656-2.544-.224-.348-.123-.81.226-1.035.348-.226.812-.124 1.036.226.747 1.162 2.016 1.855 3.395 1.855s2.648-.693 3.396-1.854c.224-.35.688-.45 1.036-.225.35.224.45.688.226 1.036-1.025 1.594-2.766 2.545-4.658 2.545z"></path><circle cx="14.738" cy="9.458" r="1.478"></circle><circle cx="9.262" cy="9.458" r="1.478"></circle></g></svg>  
        </div>
        <div slot="emoji-picker" slot-scope="{ emojis, insert, display }">
          <div class="emoji-picker" :style="{ top: display.y + 'px', left: display.x + 'px' }">
            <div class="emoji-picker__search">
              <input type="text" v-model="search" v-focus />
            </div>
            <div>
              <div v-for="(emojiGroup, category) in emojis" :key="category">
                <h5>{{ category }}</h5>
                <div class="emojis">
                  <span
                    v-for="(emoji, emojiName) in emojiGroup"
                    :key="emojiName"
                    @click="insert({emoji,emojiName})"
                    :title="emojiName"
                  >{{ emoji }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </emoji-picker>
    </div>
  </div>
</template>

<script lang="ts">
import EmojiPicker from "vue-emoji-picker";
import { Vue, Component, Prop } from "vue-property-decorator";

@Component({
  components: {
    EmojiPicker
  },
  directives: {
    focus: {
      inserted(el) {
        el.focus();
      }
    }
  }
})
export default class DefaultEmoji extends Vue {
  @Prop() input: string = "";
  search: string = "";


  append(emoji) {
    let inputMessage = this.input;
    inputMessage += `#{${emoji.emojiName}}`;
    this.$emit('update:input',inputMessage);
  }
}
</script>

<style scoped>
svg {
    height: 1.5em;
    flex-shrink: 0;
    color: rgba(29,161,242,1.00);
    fill: currentcolor;
    user-select: none;
    vertical-align: text-bottom;
    position: relative;
}


.emoji-invoker {
  position: absolute;
  top: 0.3rem;
  right: 0.1rem;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.2s;
}
.emoji-invoker:hover {
  transform: scale(1.1);
}


.emoji-picker {
  margin-left: 100px;
  margin-top: -400px;
  z-index: 1;
  font-family: Montserrat;
  border: 1px solid #ccc;
  width: 15rem;
  height: 20rem;
  overflow: scroll;
  padding: 1rem;
  box-sizing: border-box;
  border-radius: 0.5rem;
  background: #fff;
  box-shadow: 1px 1px 8px #c7dbe6;
}
.emoji-picker__search {
  display: flex;
}
.emoji-picker__search > input {
  flex: 1;
  border-radius: 10rem;
  border: 1px solid #ccc;
  padding: 0.5rem 1rem;
  outline: none;
}
.emoji-picker h5 {
  margin-bottom: 0;
  color: #b1b1b1;
  text-transform: uppercase;
  font-size: 0.8rem;
  cursor: default;
}
.emoji-picker .emojis {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.emoji-picker .emojis:after {
  content: "";
  flex: auto;
}
.emoji-picker .emojis span {
  padding: 0.2rem;
  cursor: pointer;
  border-radius: 5px;
}
.emoji-picker .emojis span:hover {
  background: #ececec;
  cursor: pointer;
}
</style>