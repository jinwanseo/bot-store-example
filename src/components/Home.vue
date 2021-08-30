<template>
  <v-container>
      <v-row>
          <!-- Component Title -->
          <v-col cols="12" class="comunity--cols">
               <v-toolbar
                flat
                color="deep-purple accent-4"
                dark
                >
                    <h3 class="pa-2">커뮤니티 관리</h3>
               </v-toolbar>
          </v-col>

          <!-- 상단 옵션 입력 영역 -->
          <v-col cols="12" class="comunity--cols">
              <v-container>
                  <!--커뮤니티 관리-->
                  <div class="container--first">
                      <!-- 검색기간 Title-->
                      <div class="first--title">
                          <h4>검색기간</h4>
                      </div>
                      <!-- 검색기간 Content -->
                      <div class="first--content">
                        <div class="content--date">
                            <!-- 작성일시 -->
                            <div class="date--select">
                                <v-select
                                    v-model="contents.date.selected"
                                    :items="contents.date.items"
                                    single-line
                                    dense
                                    outlined
                                ></v-select>
                            </div>
                            <!-- 시작 && 종료 일시  -->
                            <div class="date--duration">
                                <!--시작일시-->
                                <div class="duration--start">
                                    <v-menu
                                        v-model="contents.date.startMenu"
                                        :close-on-content-click="false"
                                        :nudge-right="40"
                                        transition="scale-transition"
                                        offset-y
                                        min-width="auto"
                                    >
                                        <template v-slot:activator="{ on, attrs }">
                                        <v-text-field
                                            v-model="contents.date.start"
                                            label="시작날짜"
                                            readonly
                                            v-bind="attrs"
                                            v-on="on"
                                            outlined
                                            dense
                                        ></v-text-field>
                                        </template>
                                        <v-date-picker
                                            v-model="contents.date.start"
                                            @input="contents.date.startMenu = false"
                                        ></v-date-picker>
                                    </v-menu>
                                </div>
                                <!--종료일시-->
                                <div class="duration--end">
                                    <v-menu
                                        v-model="contents.date.endMenu"
                                        :close-on-content-click="false"
                                        :nudge-right="40"
                                        transition="scale-transition"
                                        offset-y
                                        min-width="auto"
                                    >
                                        <template v-slot:activator="{ on, attrs }">
                                        <v-text-field
                                            v-model="contents.date.end"
                                            label="종료날짜"
                                            readonly
                                            v-bind="attrs"
                                            v-on="on"
                                            outlined
                                            dense
                                        ></v-text-field>
                                        </template>
                                        <v-date-picker
                                            v-model="contents.date.end"
                                            @input="contents.date.endMenu = false"
                                        ></v-date-picker>
                                    </v-menu>
                                </div>
                            </div>
                        </div>
                      </div>
                  </div>

                <!--노출 여부-->
                  <div class="container--second">
                      <!-- 노출여부 Title -->
                      <div class="second--title">
                          <h4>노출여부</h4>
                      </div>
                      <!-- 노출여부 Content -->
                      <div class="second--content">
                          <div class="content--update">
                              <!-- 노출 Select -->
                              <div class="update--select">
                                <v-select
                                    v-model="contents.upload.selected"
                                    :items="contents.upload.items"
                                    single-line
                                    dense
                                    outlined
                                ></v-select>
                              </div>
                          </div>
                      </div>
                  </div>

                  <!--검색어 관련-->
                  <div class="container--third">
                      <!-- 검색어 Title -->
                      <div class="third--title">
                          <h4>검색어</h4>
                      </div>
                      <!-- 검색어 Content -->
                      <div class="third--content">
                          <div class="content--search">
                            <!-- 검색어 Select -->
                            <div class="search--select">
                                <v-select
                                    v-model="contents.search.selected"
                                    :items="contents.search.items"
                                    single-line
                                    outlined
                                    dense
                                ></v-select>
                            </div>
                            <!-- 검색어 input -->
                            <div class="search--content">
                                <v-text-field class="search--text" v-model="contents.search.str" dense label="검색어 입력" />
                            </div>
                          </div>
                      </div>
                  </div>
              </v-container>
          </v-col>

          <!-- 글목록 테이블 -->
          <v-col cols="12" class="comunity--cols">
              <template>
                <v-data-table
                    :headers="contents.board.headers"
                    :items="contents.board.list"
                    :items-per-page="5"
                    class="elevation-1"
                    @click:row="linkToDetail"
                ></v-data-table>
               </template>
          </v-col>
      </v-row>
  </v-container>
</template>

<script>
export default {
    name : 'Home',
    data (){
        return {
            //UI 관련 JSON DATA
            contents : {
                //검색 기간 관련 DATA
                date : {
                    selected: '작성일시',
                    items: ['작성일시', '수정일시'],
                    start: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
                    end: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
                    startMenu: false,
                    endMenu : false,
                },
                //노출 여부 관련 DATA
                upload : {
                    selected : '노출',
                    items : ['노출','비노출'],
                },
                //검색어 관련 DATA
                search : {
                    selected : '제목',
                    items : ['제목', '작성자'],
                    str : '',
                },
                //테이블 관련 DATA
                board : {
                    headers: [
                        { text: '#', value: 'id', align: 'end', sortable: true, width: '5%'},
                        { text: 'title', value: 'title',sortable : false,  width: '55%'},
                        { text: 'date', value: 'date',sortable : false,  width: '15%'},
                        { text: 'user', value: 'user',sortable : true,  width: '10%'},
                        { text: 'reply', value: 'reply',sortable : false,  width: '5%'},
                        { text: 'likes', value: 'likes',sortable : false,  width: '5%'},
                        { text: 'views', value: 'views',sortable : false,  width: '5%'},
                    ],
                    list: [
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
                    ],
                }
            },
        }
    },
    methods : {
        clickRowTest(desc){
            console.log(desc.title,desc.user,desc.views,desc.date)
        },
        linkToDetail(e){
           this.$router.push({name : 'detailPage', params : {pageId : e.id}});
        }
    }
}
</script>


<style scoped>
    .v-text-field__details{
        display : none !important;
    }

    .comunity--cols {
        padding : 5px;
    }

    /* Container */
    .container--first, .container--second, .container--third {
        display : flex;
        flex-direction: column;
    }

    /* Container > Contents */
    .content--date, .content--update, .content--search {
        display : flex;
        flex-direction: row;
        flex-wrap: wrap;
    }

    /* Container > Contents > Select Bar */
    .date--select, .update--select, .search--select { 
        max-width: 250px;
        margin-right : 15px;
    }

    /* Container > Contents > Right Area */
    .date--duration {
        display : flex;
        flex-direction : row;
    }

    .date--duration > .duration--start {
        margin-right : 15px;
    }

    .search--text {
        width : 427px !important;
    }

    /* 반응형 */
    @media screen and (max-width : 650px) {
        .container {
            padding : 0px 10px !important;
        }
    }
    @media screen and (max-width : 450px) {
        .container {
            padding : 0px 5px !important;
        }
        .date--select, .update--select, .search--select {
            flex-direction: column;
        }
        .date--select, .update--select, .search--select { 
            margin-right : 0;
        }
        .date--duration {
            flex-direction: column;
        }
        .search--text {
            width : inherit !important;
        }
    }
</style>