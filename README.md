# ls-instagram-api

NodeJS Instagram API.it's like bot that simulate main instagram action like login, register, post, story, like, follow and etc.

This bot makes a full simulation to do not detect by instagram as robot. it uses [Playwright](https://playwright.dev/docs/library) under the hood for simulation.

This instgram bot consists of these below method:

- Account
  - register
  - login
  - edit profile
  - review home post
  - add new post
  - add new story
- Page
  - follow
  - get page info
- Post
  - like
  - comment

---

# Examples

_Note for JavaScript users:_
As of Node v.13.5.0, there isn't support for ESModules and the 'import'-syntax.
So you have to read the imports in the examples like this:

`import A from 'b'` ➡ `const { A } = require('b').default`

```typescript
import LsInstagramBot from 'ls-instagram-api'
// or
const lsInstagramBot = require('ls-instagram-api').default

;(async () => {
  //-1) Setup individual bot for a acoount
  var bot = new LsInstagramBot({
    botName: 'linkstarry',
    isDevelopment: true,
    logScreenshot: true, //-** for PRODUCTION enviroments or non GUI os , you should set this options `true`
    log: true
  })
  await bot.start()

  //-2) Login acoount into created bot
  await bot.account.login({
    uname: 'username',
    password: 'pass'
  })

  //-3) and now your bot at your services sir!

  //-- Review Home post
  await bot.account.reviewHome({
    postReviewCount: 10,
    onPostReview: async targetPost => {
      // console.log('Post Review ...', targetPost);
      await targetPost.comment('Hello... ' + targetPost.owner)
    }
  })

  //-- load  and follow page
  await bot.page.Follow('meta')

  //-- Comment & like
  let targetPost = await bot.post.loadPostByUrl('https://www.instagram.com/p/CVTtCZotdJX/')
  await targetPost.like()
  await targetPost.comment('Hi friend...')
})()
```

# Install

Playwright requires Node.js version **12** or above

### Mac and Windows

Requires 10.14 (Mojave) or above.

1. First you should install [Playwright](https://playwright.dev/docs/library)

```sh
npm i -D playwright
```

2. and then install the package from npm

```
npm install ls-instagram-api
```

### Install and run in Linux

##### using Docker

We offer using a official [Playwright Docker image](https://hub.docker.com/_/microsoft-playwright)

```sh
docker pull mcr.microsoft.com/playwright
```

and in your _Dockerfile_

```Containerfile
FROM mcr.microsoft.com/playwright:bionic
...
npm install ls-instagram-api
```

##### or Install dependencies

If you don't want use Docker, depending on your Linux distribution, you might need to install additional dependencies to run the bots.see [playwright install](https://playwright.dev/docs/library#linux)

```sh
npx playwright install --with-deps chromium
npm install ls-instagram-api
```
