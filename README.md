# VueRouter and Parasails/Sails.js Integration
### Short tutorial on integrating VueRouter on a sails.js page 

#### Background
I had built a page a couple of months back that had tabs on it the user could toggle between the tabs by clicking on a tab. However, once the user left the page and came back, they were directed the first tab. I wanted to build this page so if the user left the page and then used the back button, they would return to the last tab they had visited.

The only way to do this was with VueRouter. I had used VueRouter on Vue projects for a single page app, however, I had not integrated it with Sails.js or Parasails.js. I did some searching and read through the parasails repo but I wasn't able to find any concrete example of integrating the VueRouter with Parasails and Sails.js. So I figured I would put one up. 

**Note:** I refactored this code quite a bit in order to make the example more explanatory. So I apologize if there are any errors from refactoring. Please let me know

#### Get the VueRouter and add it to your sails.js project
There are many ways you can get the VueRouter Component. You can download it  
