parasails.registerPage('tabpage', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {
    tab1Data: [],
    tab2Data: [],
    tab3Data: [],
    tab4Data: [],
    tab1Page: 1,
    tab2Page: 1,
    tab3Page: 1,
    tab4Page: 1,
    searchWait: false,
    authorized: false,
    displayAuthorizedModal: false,
  },

  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
  beforeMount: function() {
    // Attach any initial data from the server.
    _.extend(this, SAILS_LOCALS);
    if (SAILS_LOCALS.hasOwnProperty("authorized")) {
      this.authorized = SAILS_LOCALS.authorized;
    }
    if (SAILS_LOCALS.hasOwnProperty("tab1Data")) {
      this.tab1Data = this.parseDates(SAILS_LOCALS.tab1Data);
    }
    if (SAILS_LOCALS.hasOwnProperty("tab2Data")) {
      this.tab2Data = this.parseDates(SAILS_LOCALS.tab2Data);
    }
    if (SAILS_LOCALS.hasOwnProperty("tab3Data")) {
      this.tab3Data = this.parseDates(SAILS_LOCALS.tab3Data);
    }
    if (SAILS_LOCALS.hasOwnProperty("tab4Data")) {
      this.tab4Data = this.parseDates(SAILS_LOCALS.tab4Data);
    }
    const routes= [
      {
        path: "/mine/:page?",
        name: "tab1",
        component: Vue.options.components.tab,
        props: { list: this.tab1Data, authorized: this.authorized, seemore: this.seeMore, save: this.save, schedule: this.schedule, openmodal: this.openAuthorizedModal, pagecount: this.getPageCount(this.tab1Data), title: "Tab 1 title", getpageddata: this.getPageData }
      },
      {
        path: "/saved/:page?",
        name: "tab2",
        component: Vue.options.components.tab,
        props: { list: this.tab1Data, authorized: this.authorized, public: true, seemore: this.seeMore, save: this.save, schedule: this.schedule,  openmodal: this.openAuthorizedModal, pagecount: this.getPageCount(this.tab2Data), title: "Tab 2 title", getpageddata: this.getPageData }
      },
      {
        path: "/recent/:page?",
        name: "tab3",
        component: Vue.options.components.tab,
        props: { list: this.tab1Data, authorized: this.authorized, public: true, seemore: this.seeMore, save: this.save, schedule: this.schedule,  openmodal: this.openAuthorizedModal, pagecount: this.getPageCount(this.tab3Data), title: "Tab 3 title", getpageddata: this.getPageData }
      },
      {
        path: "/search/:page?",
        name: "tab4",
        component: Vue.options.components.tab,
        props: { list: this.tab1Data, authorized: this.authorized, public: true, seemore: this.seeMore, save: this.save, schedule: this.schedule,  openmodal: this.openAuthorizedModal, pagecount: this.getPageCount(this.tab4Data), title: "Tab 4 title", getpageddata: this.getPageData, sendsearch: this.sendSearch}
      }
    ];
    this.$router.addRoutes(routes);
  },
  router: new VueRouter({
    mode: 'history',
    base: '/tab-page/'
  }),

  //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
  methods: {
    seeMore: async function(workoutId) {
      // method to retrive more data
    },
    updateLocals: function(workout) {
      // method to update data on parent
    },
    getPageCount: function(list) {
      // return total pages for each tab
    },
    getPageData: function(list, page) {
      // get data by page
    },
    updateSearch: function() {
      // search function
    },
    sendSearch: async function(searchTerm) {
      // search data retrival
    },
    save: async function(id, action) {
      // add item to tab2Data
    },
    schedule: async function(selectedDate, workout) {
      // add a data to an item for scheduling purposes
    },
    closeAuthorizedModal: function() {
      this.displayAuthorizedModal = false;
    },
    openAuthorizedModal: function() {
      this.displayAuthorizedModal = true;
    }
  }
});
