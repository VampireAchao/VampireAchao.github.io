---
title: 使用cargo创建rust程序并运行
date: 2022-02-03 14:41:02
tags: rust
---

> 如果问我思念多重，不重的，像一座秋山的落叶。——简媜

我们按照[文档](https://book.rust.team/first-try/cargo.html)在路径中打开命令行终端

```shell
cargo new world_hello
```

![image-20220203144619645](/imgs/oss/picGo/image-20220203144619645.png)

我们现在就可以运行了

```shell
cd .\world_hello\
cargo run
```

可以看到输出了`Hello， world`

![image-20220203144724874](/imgs/oss/picGo/image-20220203144724874.png)

我们用`vscode`打开

可以对我们的代码进行少许更改，然后再次运行

```rust
fn main() {
    println!("world， Hello!");
}
```

![image-20220203145149446](/imgs/oss/picGo/image-20220203145149446.png)

再次运行

```shell
cargo run
```

可以看到我们的修改生效

![image-20220203145218047](/imgs/oss/picGo/image-20220203145218047.png)