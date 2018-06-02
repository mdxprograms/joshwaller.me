---
title: MobX State Tree Tutorial
date: 2018-06-01 17:00:00 +0000
categories:
- react
- mobx
- tutorial
layout: post
---

In this tutorial we are going to use the following:

* create-react-app
* mobx
* mobx-react
* mobx-state-tree
* antd

First let's make sure we have create-react-app installed (assuming you have yarn installed as well)

```bash
yarn global add create-react-app
```

After create-react-app has been installed we can now generate our project with the following:

```bash
create-react-app mobx-state-tree-todos && cd mobx-state-tree-todos
```

Our main command we will use to run the project is `yarn start`
Go ahead and run the command to view your default app now.

We can remove a few files at this point.
Remove all files in your `src` directory _except_ for `App.js`, `App.test.js` (optional), and `index.js`.

Your `index.js` file should now look like the screenshot below

![index.js](/images/mobx-state-tree-tutorial/indexjs.png)
