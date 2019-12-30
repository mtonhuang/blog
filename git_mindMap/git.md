### git 协同开发，需要注意的几个小点

最近两个月，负责“xxxx”小程序的相关迭代，该项目从16年开发迭代到现在，git操作十分频繁，小小总结了一下该注意的点，希望对你大大有用。

#### 切换现有分支需注意
我们都知道使用 `git checkout branch` 即可去到你想去的分支，这个情况在你当前分支没有修改代码的前提是可以行得通的，但是呢，如果一旦你修改了，`git` 会提示你并不能切换，此时我们有两种方法：

1. commit 我们的相关代码；
2. stash 暂存我们的代码。

第1种方法适用于开发完一个模块，可以提交远程仓库的情况。
第2种方法适用于开发到一半不想提交的情况，但后面在重新切回来时需要 `git stash apply` 恢复暂存区的内容。

#### 创建并且切换分支需注意

在开发过程中，往往有 n 多个分支，每个模块需求都有一个独立的分支，当我在 a 分支开发到一半时，此时有一个新的模块需求，那么我需要创建并且切换一个新分支 b 进行开发，此时要注意：

先 checkout 到 master，而后习惯的先 `git pull` 拉取 master 上最新的代码（往往会没同步到，造成后面 merge 冲突问题）再 `git checkout -b branch`。

有些同学会忽略以上操作，在 a 分支就创建并且切换一个新分支 b ，但此时 b 的代码是继承来自 a 分支，这往往不是我们想要的。 

#### commit 习惯

在各个团队内，也许并没有严格要求 commit 的 message 规范，平时你可能会这样commit：`git commit -m "哈哈哈"`。这样就造成了一个问题，我知道你这次提交是在笑，但是我并不知道你为什么笑。

当然有些团队内部也有自定义的规范，比如 `git commit -m "[fix]我这次是修改 xx bug"` ，这样也是非常好的，一目了然。下面我推荐linkxiao大佬给我的一款插件 `vsc-commitizen`。直接看操作：

安装完这个插件后，按“ctrl+shift+p”，输入“vsc-commitizen”（下次会直接出现在窗口，如下图），

![](https://act.weixin.qq.com/static/images/201912/e6c31060155fac00bafe1b8ef9906049.png)

而后，选择我们这次提交的修改类型和填写相关message即可，方便快捷。

![](https://act.weixin.qq.com/static/images/201912/8f025754852def4aa4a1eeb8eae3d596.png)

#### 合并分支需注意

在当前分支 a 开发完后，我们需要先 checkout 到 master，`git pull` 后确保拉取到 master 最新的代码之后，再切回 a 分支，如果 master 有更新，则执行 `git merge master` 合并分支，有冲突则解决冲突，之后再提交 push ，确保后续提 MR

#### 提交MR/PR需注意

打开xxx，在相应的项目仓库，选择Merge Request，选择你修改的分支，后面选择checkout的老板，提交你的MR即可。