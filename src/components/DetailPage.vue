<template>
  <v-container>
      <v-row>
          <v-col cols="2" class="purple"></v-col>
          <v-col cols="10" class="secondary"></v-col>
      </v-row>
      <v-btn class="pa-1 primary" @click="$router.go(-1)">뒤로가기</v-btn>
  </v-container>
</template>

<script>
export default {
    name : 'DetailPage',
    data(){
        return {
            pageId : null,
            board : [],
        }
    },
    created(){
        this.pageId = this.$route.params.pageId;
        //테이블 관련 DATA (서버에서 Fetch 했다고 가정)
        this.board = [
                        {
                            id: 0,
                            title: 'TEST Title1',
                            date: '2021-08-27',
                            user: 'dev00',
                            reply: 0,
                            likes: 5,
                            views : 10
                        },
                        {
                            id: 1,
                            title: 'TEST Title2',
                            date: '2021-08-27',
                            user: 'dev01',
                            reply: 0,
                            likes: 5,
                            views : 10
                        },
                        {
                            id: 2,
                            title: 'TEST Title3',
                            date: '2021-08-27',
                            user: 'dev02',
                            reply: 0,
                            likes: 5,
                            views : 10
                        },
                    ];
    }
}
</script>

<style>

</style>