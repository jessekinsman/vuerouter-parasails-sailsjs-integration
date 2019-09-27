# VueRouter and Parasails/Sails.js Integration
## Short tutorial on integrating VueRouter on a sails.js page 

### Background
I had built a page a couple of months back that had tabs on it the user could toggle between the tabs by clicking on a tab. However, once the user left the page and came back, they were directed the first tab. I wanted to build this page so if the user left the page and then used the back button, they would return to the last tab they had visited.

The only way to do this was with VueRouter. I had used VueRouter on Vue projects for a single page app, however, I had not integrated it with [Sails.js](https://sailsjs.com/) or [Parasails.js](https://github.com/mikermcneil/parasails). I did some searching and read through the parasails repo but I wasn't able to find any concrete example of integrating the VueRouter with Parasails and Sails.js. So I figured I would put one up. 

**Note:** I refactored this code quite a bit in order to make the example more explanatory. So I apologize if there are any errors from refactoring. Please let me know

### Get the VueRouter and add it to your sails.js project
There are many ways you can get the VueRouter Component. You can download it here [VueRouter](https://unpkg.com/vue-router@2.0.0/dist/vue-router.js) or you can use NPM
`npm install vue-router`
If you use NPM, you can find the VueRouter file node_modules directory
`/node_modules/vue-router/dist/vue-router.min.js`

Once you have the file, copy it and place it in your dependencies directory
`/assets/dependencies/`

Grunt will add this to your project and make it available on the next build. You may have to edit your /tasks/pipeline.js file to get it injected after vue.js and before parasails.js. 

This is how I set mine up (this file isn't in the repo):
```
  'dependencies/vue.js',
  'dependencies/vue-router.min.js',
  'dependencies/**/*.js',
```
There are other ways to set this up but this is how I did it.

## Initialize the VueRouter and pass your routes
You can see this in the file in assets/js/pages/tabpage.page.js

I initialize the router as the page is registered
```
  router: new VueRouter({
    mode: 'history',
    base: '/tab-page/'
  }),
  ```
I did not add the routes when the VueRouter was instantiated since I planned on passing static props to my component. My props are not assigned the data they need until the beforeMount lifecycle hook. That is where I added the routes
```
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
```
You could pass routes to the router when it is initialized if you did not want to pass static props.

The component part of the routes object is a little tricky. You have to pass the component as a reference from the "Vue" object. Vue has a list of all the components registered in the global Vue variable. 
`component: Vue.options.components.tab,
`
In this instance, the component I want to use is called "tab."

The other piece is referencing the router that was just initialized so we can add routes to it. 
`this.$router.addRoutes(routes);`

## Adding the router markup to the view
You can see how I did this in the file /views/pages/tabpage.ejs

Essentially the tab links at the top of the page use the 
`<router-link to="/">Tab</router-link>`
Nothing really that tricky there.

However, as I noted in the file, the link that is selected (has a match) will have the class "router-link-active" added to the anchor tab. This is handy for styling the selected tab. 

Lastly in the view, you set where you want the component to be rendered using the following markup
`<router-view></router-view>`

###The tab component
Nothing particularly complex about this. My example uses a dynamic route to pass a param for pagination (tab/2, tab/3) etc. This is for paginating through the data list. 

Couple of gothas in router rendered component
###Watch:
The component is not automatically re-rendered when the dynamic part of the route changes. You have to watch for the change.
```
      watch: {
        '$route' (to, from) {
          this.setupPagination();
        }
      },
```
###Getting the current route
In your component, you can reference the route params using:
`this.$route.params`

Or for the path
`this.$route.path`

Note: I removed some of the pagination code for this example as it was not relevant. Don't follow this as an example on how to implement pagination. It won't work.

##That is all. File a pull request if you see any problems or issues.




