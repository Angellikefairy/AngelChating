<template>
  <div id="image-upload">
    <el-upload
        class="upload-demo"
        :action="uploadUrl"
        :on-progress="handleProgress"
        :on-error="handleError"
        :on-success="handleSuccess"
        :before-upload="beforeImageUpload"
        :on-exceed="handleFileLimit"
        :show-file-list="false"
        :limit="100">
        <div id="chat-image" class="icon flex center">
            <svg viewBox="0 0 24 24"><g><path d="M19.75 2H4.25C3.01 2 2 3.01 2 4.25v15.5C2 20.99 3.01 22 4.25 22h15.5c1.24 0 2.25-1.01 2.25-2.25V4.25C22 3.01 20.99 2 19.75 2zM4.25 3.5h15.5c.413 0 .75.337.75.75v9.676l-3.858-3.858c-.14-.14-.33-.22-.53-.22h-.003c-.2 0-.393.08-.532.224l-4.317 4.384-1.813-1.806c-.14-.14-.33-.22-.53-.22-.193-.03-.395.08-.535.227L3.5 17.642V4.25c0-.413.337-.75.75-.75zm-.744 16.28l5.418-5.534 6.282 6.254H4.25c-.402 0-.727-.322-.744-.72zm16.244.72h-2.42l-5.007-4.987 3.792-3.85 4.385 4.384v3.703c0 .413-.337.75-.75.75z"></path><circle cx="8.868" cy="8.309" r="1.542"></circle></g></svg>
        </div>
    </el-upload>
  </div>
</template>

<script lang="ts">
import "reflect-metadata"
import {Vue,Component,Prop} from "vue-property-decorator";
import {sendMessage} from "@/service/message.service";
import {baseUrl} from "@/config/env"

@Component
export default class ImageUpload extends Vue {
  uploadUrl: string = baseUrl + 'upload';


  handleError(err, file, fileList) {
    this.$message({
      type: 'error',
      message: '图片上传失败，请重新上传或之后再试!'
    })
  }
  handleSuccess(response, file, fileList) {
    const {data: {fileUrl: imageUrl}} = response;
    sendMessage(imageUrl,file.raw.type,this);
    this.$store.commit('setImageLoading',false);
  }
  handleFileLimit(files, fileList) {
    this.$message({
      type: 'warning',
      message: '您已经不被允许发送更多的文件'
    })
  }
  beforeImageUpload(file) {
    const imagepattern = /image\/(gif|jpeg|jpg|png|svg)/g;
    const isJPG = imagepattern.test(file.type);
    const isLt2M = file.size / 1024 / 1024 < 2;

    if (!isJPG) {
      this.$message.error('您当前只能上传图片哦');
    }
    else if (!isLt2M) {
      this.$message.error('上传图片大小不能超过 2MB!');
    }
    else {
      this.$store.commit('setImageLoading',true);
    }
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
    cursor: pointer;
}
</style>