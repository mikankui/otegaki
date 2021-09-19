<template>
  <v-app>
    <wel-app-bar
      :menus="menus"
      :img-height="imgHeight"
    />
    <!-- 追加 -->
    <div class=topBox>
      <!--
      <nuxt-img 
        id="scroll-top"
        src="/top2.jpg"
        sizes="sm:99vw md:99vw lg:99vw"
          />
          -->
      <v-img
        id="scroll-top"
        dark
        src="top2.jpg"
        gradient="to top right, rgba(255, 182, 193,.3), rgba(255, 192, 203,.6)"
        :height="imgHeight"
      >
        <v-row
          align="center"
          justify="center"
          class="topBoxRow"
        >
          <v-col>
            <h1 class="welTitle">
              Otegaki
            </h1>
            <h4
              class="welSubtitle"
            >
              温もりを、筆先に込めて
            </h4>
          </v-col>
        </v-row>
      </v-img>
    </div>
    <!-- ここまで -->

    <!--メニュー-->
    <v-sheet>
      <v-container
        fluid
        :style="{ maxWidth: '1280px' }"
      >
        <v-row
          v-for="(menu, i) in menus"
          :key="`menu-${i}`"
        >

          <!-- 追加 -->
          <v-col
            :id="menu.title"
            cols="12"
          >
            <v-card flat>
              <v-card-title class="justify-center display-1">
                {{ $t(`menus.${menu.title}`) }}
              </v-card-title>
              <v-card-text class="text-center">
                {{ menu.subtitle }}
              </v-card-text>
            </v-card>
          </v-col>
          <!-- ここまで -->

          <v-col cols="12">
            <div :is="`wel-${menu.title}`" />
          </v-col>
        </v-row>
      </v-container>
    </v-sheet>

    <bef-login-footer /> <!-- 追加 -->

  </v-app>
</template>

<script>

export default {
  components: {
    welAppBar: () => import('@/components/welcome/welAppBar'),
    welAbout: () => import('~/components/welcome/welAbout'),
    welProducts: () => import('~/components/welcome/welProducts'),
    welPrice: () => import('~/components/welcome/welPrice'),
    welContact: () => import('~/components/welcome/welContact'),
    welCompany: () => import('~/components/welcome/welCompany'),
    befLoginFooter: () => import('~/components/beforeLogin/befLoginFooter'),
  },
  data () {
    return {
      imgHeight: 800, // 追加
      menus: [
        { title: 'about', subtitle: 'このサイトはブログ"独学プログラマ"で公開されているチュートリアルのデモアプリケーションです' },
        { title: 'products', subtitle: '他にはない優れた機能の数々' },
        { title: 'price', subtitle: '会社の成長に合わせた3つのプラン' },
        { title: 'contact', subtitle: 'お気軽にご連絡を' },
        { title: 'company', subtitle: '私たちの会社' }
      ]
    }
  }
}
</script>
<style>

/** 
 * アイキャッチ画像用
*/
.topBox {
  position: relative;/*相対配置*/
  display: flex;
  width:"100vw";
  justify-content: center;
  align-items: center;
  text-align: center;
}

.topBoxRow {
  position: absolute;/*絶対配置*/
  top: 50%;
  left: 50%;
  -ms-transform: translate(-50%,-50%);
  -webkit-transform: translate(-50%,-50%);
  transform: translate(-50%,-50%);
  margin:0;
  padding:0;
  }

.topBox v-img {
    width: 100vw;
  }

/** 
 * タイトル
*/
.welTitle {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; /* 1 */
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #a0a0a0;
  letter-spacing: .2em;
}

.welSubtitle {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; /* 1 */
  display: block;
  font-weight: 50;
  font-size: 20px;
  color: #b1b1b1;
  letter-spacing: .2em;
}

</style>