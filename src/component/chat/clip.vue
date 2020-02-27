<template>
    <div class='clip'>
        <i class="el-icon-scissors" @click="startClip"></i>
    </div>
</template>

<script lang='ts'>
import 'reflect-metadata'
import {Vue,Component,Watch} from 'vue-property-decorator';
import kscreenshot from 'kscreenshot';
import {uploadFile} from "@/api/api";
import {sendMessage} from "@/service/message.service";


function dataURLtoFile(dataurl, filename) {
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while(n--){
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, {type:mime});
}

@Component
export default class Clip extends Vue {
    ks: any = {};
    clipCanvas: HTMLCanvasElement | null = null;
    mounted() {
        this.clipCanvas = (document.getElementById('clipCanvas') as HTMLCanvasElement | null);
    }

    created() {
        this.ks = new kscreenshot(
            {
                key: 65,
                //needDownload: true,
                endCB: async (v) => {
                    const imageFile = dataURLtoFile(v,'1.png');
                    let formData = new window.FormData(); 
                    formData.append("file", imageFile);
                    this.$store.commit('setImageLoading',true);
                    const response = await uploadFile(formData);
                    this.$store.commit('setImageLoading',false);
                    if(response.data) {
                        const {data: {fileUrl: imageUrl,fileType}} = response;
                        sendMessage(imageUrl,fileType,this);
                    }
                },
                cancelCB: () => {
                    
                }
            }
        )
    }

    startClip() {
        this.ks.startScreenShot();
    }


}
</script>

<style scoped>
.clip i {
    color: rgba(29,161,242,0.9);
    font-size: 21px;
    font-weight: 600;
    cursor: pointer;
}
</style>