var app = require('koa')();
var router = require('koa-router')();

// router.get('/', function *(next) {
//     this.body = 'hello koa !'
// });
//
// router.get('/api', function *(next) {
//     this.body = 'test data'
// });

// home - advertisement
var homeAdData = require('./home/ad.js')
router.get('/api/homead', function *(next) {
  console.log('home - Ads')
  this.body = homeAdData
});

//home -favorite listen
var homeListData = require('./home/list')
router.get('/api/homelist/:city/:page', function *(next) {
  console.log('home - Maybe you like - list')
  // parameters
  const params = this.params
  const paramsCity = params.city
  const paramsPage = params.page

  console.log('The current city: ' + paramsCity + ', the current page: ' + paramsPage)
  this.body = homeListData
});

//Search list - three parameters
var searchListData = require('./search/list.js')
router.get('/api/search/:page/:city/:category/:keyword', function *(next) {
  console.log('Search - the search result')

  const params = this.params
  const paramsPage = params.page
  const paramsCity = params.city
  const paramsCategory = params.category
  const paramsKeyword = params.keyword

  console.log('The current page: ' + paramsPage
  + ', the current city: ' + paramsCity + ', the category: '
  + paramsCategory + ', the keyword: ' + paramsKeyword)

  this.body = searchListData

});
//Search list - two parameters
router.get('/api/search/:page/:city/:category/', function *(next) {
  console.log('Search - the search result')

  const params = this.params
  const paramsPage = params.page
  const paramsCity = params.city
  const paramsCategory = params.category

  console.log('The current page: ' + paramsPage
  + ', the current city: ' + paramsCity + ', the category: '
  + paramsCategory)

  this.body = searchListData

})

// Detail - business info
var detailInfo = require('./detail/info.js')
router.get('/api/detail/info/:id', function *(next) {
    console.log('Detail-business info')

    const params = this.params
    const id = params.id

    console.log('Business id: ' + id)

    this.body = detailInfo
})
// Detail - user reviews
var detailComment = require('./detail/comment.js')
router.get('/api/detail/comment/:page/:id', function *(next) {
    console.log('Detail-user reviews')

    const params = this.params
    const page = params.page
    const id = params.id

    console.log('Business id: ' + id + ', the current page: ' + page)

    this.body = detailComment
})

// order list
var orderList = require('./orderlist/orderList')
router.get('/api/orderlist/:username', function *(next) {
  console.log('Order list')

  const params = this.params
  const username = params.username
  console.log('Username: ' + username)

  this.body = orderList
})

//post comment
router.post('/api/submitComment', function *(next) {
  console.log('Submit a comment')

  this.body = {
    errno: 0,
    msg: 'ok'
  }
})

app.use(router.routes())
   .use(router.allowedMethods());

app.listen(3000);
