parasails.registerComponent('tab', {
      props: ['list','authorized','seemore','save','schedule','openmodal','pagecount','title', 'getpageddata','sendsearch'],
      beforeMount: function() {
        this.setupPagination();
      },
      watch: {
        '$route' (to, from) {
          this.setupPagination();
        }
      },
      beforeUpdate: function() {
        this.visible = this.list;
      },
      data: function() {
        return {
          visible: [],
          activepage: 1,
          size: 20,
          next: null,
          prev: null,
          searchwait: false,
          searchterm: ""
        }
      },
      computed: {
        paginated: function() {
          return this.getpageddata(this.visible, this.activepage);
        }
      },
      methods: {
        setupPagination: function() {
          this.activepage = (this.$route.params.page) ? this.$route.params.page : 1;
          const next = this.getPage(this.activepage, "+");
          const prev = this.getPage(this.activepage, "-");
          if (next !== null && next <= this.pagecount) {
            this.next = this.getPagination(next, this.$route);
          } else {
            this.next = null;
          }
          if (prev !== null && prev > 0) {
            this.prev = this.getPagination(prev, this.$route);
          } else {
            this.prev = null;
          }
          this.visible = this.getpageddata(this.list, this.activepage);
        },
        getPagination: function(page, route) {
          // return urls for next and prev buttons
          const path = route.path;
          const param = route.params.page;
          const reg = route.matched[0].regex;
          if (typeof param == 'undefined') {
            return path + "/" + page;
          }
          return path.replace(param, page);;
        },
        getPage: function(page, sign) {
          // handling param passed from router
          let pg = parseInt(page);
          if (!isNaN(pg)) {
            if (sign == "-") {
              return pg-=1;
            } else {
              return pg+=1;
            }
          }
          return null;
        }
      },
      template: `
      <div class="container mb-3">
      <h1 class="mt-5">{{title}}</h1>
      <div v-if="sendsearch">
        <form>
          <div class="row">
            <div class="col-sm-8 mt-2">
              <input class="form-control" type="search" v-model="searchterm" placeholder="Search"/>
            </div>
            <div class="col-sm-4 mt-2">
              <button class="btn-primary btn w-100" type="submit" @click.prevent="sendSearch()" >Search</button>
            </div>
          </div>
          </form>
          <div v-if="searchwait" class="wait info text-center my-5">
            <span class="dot one"></span><span class="dot two"></span><span class="dot three"></span>
          </div>
          <div v-else class="no-results text-center my-2">
              <p class="small grey">{{list.length}} Results</p>
          </div>
        </div>
        <div v-for="item in visible">Do something with your list of data {{item.name}} </div>
        <div class="container text-center my-3" v-if="pagecount > 1">
          <router-link v-if="prev !== null && activepage > 0" class="btn btn-outline-light" v-bind:to="prev" append>Previous</router-link>
          <router-link v-if="next !== null && activepage < pagecount" class="btn btn-outline-light" v-bind:to="next" append>Next</router-link>
        </div>
      </div>
      `
  });
