import LsInstagramBot from '../src/bot'
// import LsInstagramBot from '../dist/bot';
// const LsInstagramBot = require('../dist/bot.js')
;(async () => {
  var bot = new LsInstagramBot({
    botName: 'linkstarry',
    isDevelopment: true,
    logScreenshot: true,
    log: true,
    storagePath: './storage/'
  })
  await bot.start()
  await bot.account.login({
    uname: 'amir.sedaporian',
    password: 'amir.rgst123456@'
  })

  //-- load and follow page
  await bot.page.Follow('ted')

  //-- ReviewHome
  await bot.account.reviewHome({
    postReviewCount: 10,
    onPostReview: async (targetPost: any) => {
      // console.log('Post Review ...', targetPost.caption);
      await targetPost.comment('Hello... ' + targetPost.owner)
    }
  })

  //-- Comment
  let targetPost = await bot.post.loadPostByUrl('https://www.instagram.com/p/CVTtCZotdJX/')
  await targetPost.like()
  await targetPost.comment("Hi i'm linkstarry...")

  //-- EditProfile
  await bot.account.editProfile({
    uname: 'uname',
    name: 'name',
    family: 'family',
    gender: 'male',
    mail: 'mail@gmail.com',
    bio: 'the user bio...',
    avatarPath: './storage/profile-pic2.jpg'
  })

  //-- Create Post
  await bot.account.createPost({
    imagePath: './storage/post-pic222.jpg',
    caption: 'first post ...',
    location: 'turkey'
  })
})()
