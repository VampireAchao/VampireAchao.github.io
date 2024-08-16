---
title: html构建桌面端应用框架tauri
date: 2024-08-07 11:38:22
tags: 前端
---

> 即使通过自己的努力知道一半真理，也比人云亦云地知道全部真理还要好些。——罗曼·罗兰

分享一个用`html`、`css`、`javascript`构建桌面端应用的另一个框架

https://tauri.app/

https://github.com/tauri-apps/tauri

和 `Electron` 的主要区别是它更快，而且是用`Rust`编写，前端是用 [`TAO`](https://click.convertkit-mail4.com/n4up276pwwcvh87xlvgf6h6g4rgggsl/n2hohqu303n7epb6/aHR0cHM6Ly9naXRodWIuY29tL3RhdXJpLWFwcHMvdGFv) 和 [`WRY`](https://click.convertkit-mail4.com/n4up276pwwcvh87xlvgf6h6g4rgggsl/48hvh7ur8r0xkdhx/aHR0cHM6Ly9naXRodWIuY29tL3RhdXJpLWFwcHMvd3J5)，更加轻量

，内存占用更小，不嵌入`Chromium`，但是需要你会一点点`Rust`，这对我来说不是事儿，我早就在`2022-02-01`开始`rust`的简单入门

[rust安装](https://vampireachao.github.io/2022/02/01/rust%E5%AE%89%E8%A3%85/)

[安装vscode的rust插件](https://vampireachao.github.io/2022/02/02/%E5%AE%89%E8%A3%85vscode%E7%9A%84rust%E6%8F%92%E4%BB%B6/)

[使用cargo创建rust程序并运行](https://vampireachao.github.io/2022/02/03/%E4%BD%BF%E7%94%A8cargo%E5%88%9B%E5%BB%BArust%E7%A8%8B%E5%BA%8F%E5%B9%B6%E8%BF%90%E8%A1%8C/)

创建项目非常简单！

```bash
# 下载、创建项目工程
GithubIireAchao:simple-tauri achao$ sh <(curl https://create.tauri.app/sh)
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100 16121  100 16121    0     0  15113      0  0:00:01  0:00:01 --:--:-- 15122
info: downloading create-tauri-app
✔ Project name · tauri-app
✔ Choose which language to use for your frontend · TypeScript / JavaScript - (pnpm, yarn, npm, bun)
✔ Choose your package manager · pnpm
✔ Choose your UI template · Vue - (https://vuejs.org/)
✔ Choose your UI flavor · TypeScript

Template created!

Your system is missing dependencies (or they do not exist in $PATH):
╭──────┬───────────────────────────────────────────────────────────────────╮
│ Rust │ Visit https://www.rust-lang.org/learn/get-started#installing-rust │
╰──────┴───────────────────────────────────────────────────────────────────╯

Make sure you have installed the prerequisites for your OS: https://tauri.app/v1/guides/getting-started/prerequisites, then run:
  cd tauri-app
  pnpm install
  pnpm tauri dev

# 进入目录
GithubIireAchao:simple-tauri achao$ cd tauri-app/
# 下载前端依赖
GithubIireAchao:tauri-app achao$ npm i pnpm

added 53 packages, and audited 54 packages in 33s

8 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
GithubIireAchao:tauri-app achao$ pnpm i
 WARN  Moving @tauri-apps/cli that was installed by a different package manager to "node_modules/.ignored"
 WARN  Moving @vitejs/plugin-vue that was installed by a different package manager to "node_modules/.ignored"
 WARN  Moving typescript that was installed by a different package manager to "node_modules/.ignored"
 WARN  Moving vite that was installed by a different package manager to "node_modules/.ignored"
 WARN  Moving vue-tsc that was installed by a different package manager to "node_modules/.ignored"
 WARN  3 other warnings

   ╭─────────────────────────────────────────────────────────────────╮
   │                                                                 │
   │                Update available! 8.7.5 → 9.7.0.                 │
   │   Changelog: https://github.com/pnpm/pnpm/releases/tag/v9.7.0   │
   │                Run "pnpm add -g pnpm" to update.                │
   │                                                                 │
   │     Follow @pnpmjs for updates: https://twitter.com/pnpmjs      │
   │                                                                 │
   ╰─────────────────────────────────────────────────────────────────╯

Progress: resolved 47, reused 2, downloaded 16, added 0
Downloading mirrors.cloud.tencent.com/@tauri-apps/cli-darwin-arm64/1.6.0: 0.00 BProgress: resolved 55, reused 2, downloaded 19, added 0arwin-arm64/1.6.0: 15.78 Downloading mirrors.cloud.tencent.com/@tauri-apps/cli-darwin-arm64/1.6.0: 7.46 MB/7.46 MB, done
Packages: +53
+++++++++++++++++++++++++++++++++++++++++++++++++++++
Progress: resolved 99, reused 8, downloaded 45, added 53, done
node_modules/.pnpm/esbuild@0.21.5/node_modules/esbuild: Running postinstall scrinode_modules/.pnpm/esbuild@0.21.5/node_modules/esbuild: Running postinstall script, done in 39ms

dependencies:
+ @tauri-apps/api 1.6.0
+ pnpm 9.7.0
+ vue 3.4.36

devDependencies:
+ @tauri-apps/cli 1.6.0
+ @vitejs/plugin-vue 5.1.2
+ typescript 5.5.4
+ vite 5.3.5
+ vue-tsc 2.0.29

Done in 8.2s
GithubIireAchao:tauri-app achao$ pnpm tauri dev

> tauri-app@0.0.0 tauri /Users/achao/IdeaProjects/simple-tauri/tauri-app
> tauri "dev"

       Error failed to get cargo metadata: No such file or directory (os error 2)
 ELIFECYCLE  Command failed with exit code 1.
 # 发现没有安装rust和cargo，执行命令安装
GithubIireAchao:tauri-app achao$ curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
info: downloading installer

Welcome to Rust!

This will download and install the official compiler for the Rust
programming language, and its package manager, Cargo.

Rustup metadata and toolchains will be installed into the Rustup
home directory, located at:

  /Users/achao/.rustup

This can be modified with the RUSTUP_HOME environment variable.

The Cargo home directory is located at:

  /Users/achao/.cargo

This can be modified with the CARGO_HOME environment variable.

The cargo, rustc, rustup and other commands will be added to
Cargo's bin directory, located at:

  /Users/achao/.cargo/bin

This path will then be added to your PATH environment variable by
modifying the profile files located at:

  /Users/achao/.profile
  /Users/achao/.bash_profile
  /Users/achao/.bashrc
  /Users/achao/.zshenv

You can uninstall at any time with rustup self uninstall and
these changes will be reverted.

Current installation options:


   default host triple: aarch64-apple-darwin
     default toolchain: stable (default)
               profile: default
  modify PATH variable: yes

1) Proceed with standard installation (default - just press enter)
2) Customize installation
3) Cancel installation
>

info: profile set to 'default'
info: default host triple is aarch64-apple-darwin
info: syncing channel updates for 'stable-aarch64-apple-darwin'

info: latest update on 2024-07-25, rust version 1.80.0 (051478957 2024-07-21)
info: downloading component 'cargo'
  6.4 MiB /   6.4 MiB (100 %) 169.6 KiB/s in 26s ETA:  0s 
info: downloading component 'clippy'
  2.3 MiB /   2.3 MiB (100 %) 278.4 KiB/s in  9s ETA:  0s
info: downloading component 'rust-docs'
 15.7 MiB /  15.7 MiB (100 %) 422.4 KiB/s in 55s ETA:  0s    
info: downloading component 'rust-std'
 24.8 MiB /  24.8 MiB (100 %) 394.8 KiB/s in  1m 28s ETA:  0s
info: downloading component 'rustc'
 51.2 MiB /  51.2 MiB (100 %) 174.7 KiB/s in  3m 29s ETA:  0s    
info: downloading component 'rustfmt'
  1.7 MiB /   1.7 MiB (100 %) 243.2 KiB/s in  7s ETA:  0s
info: installing component 'cargo'
info: installing component 'clippy'
info: installing component 'rust-docs'
 15.7 MiB /  15.7 MiB (100 %)   4.1 MiB/s in  2s ETA:  0s
info: installing component 'rust-std'
 24.8 MiB /  24.8 MiB (100 %)  21.7 MiB/s in  1s ETA:  0s
info: installing component 'rustc'
 51.2 MiB /  51.2 MiB (100 %)  23.6 MiB/s in  2s ETA:  0s
info: installing component 'rustfmt'
info: default toolchain set to 'stable-aarch64-apple-darwin'

  stable-aarch64-apple-darwin installed - rustc 1.80.0 (051478957 2024-07-21)


Rust is installed now. Great!

To get started you may need to restart your current shell.
This would reload your PATH environment variable to include
Cargo's bin directory ($HOME/.cargo/bin).

To configure your current shell, you need to source
the corresponding env file under $HOME/.cargo.

This is usually done by running one of the following (note the leading DOT):
. "$HOME/.cargo/env"            # For sh/bash/zsh/ash/dash/pdksh
source "$HOME/.cargo/env.fish"  # For fish
GithubIireAchao:tauri-app achao$ 
GithubIireAchao:tauri-app achao$ rustc --version
-bash: rustc: command not found
GithubIireAchao:tauri-app achao$ sudo vim ~/.bash_profile
Password:
# 配置rust环境变量
GithubIireAchao:tauri-app achao$ echo 'export PATH="$HOME/.cargo/bin:$PATH"' >> ~/.bash_profile
GithubIireAchao:tauri-app achao$ source ~/.bash_profile
GithubIireAchao:tauri-app achao$ rustc --version
rustc 1.80.0 (051478957 2024-07-21)
# 启动项目
GithubIireAchao:tauri-app achao$ pnpm tauri dev

> tauri-app@0.0.0 tauri /Users/achao/IdeaProjects/simple-tauri/tauri-app
> tauri "dev"

     Running BeforeDevCommand (`pnpm dev`)

> tauri-app@0.0.0 dev /Users/achao/IdeaProjects/simple-tauri/tauri-app
> vite


  VITE v5.3.5  ready in 138 ms

  ➜  Local:   http://localhost:1420/
  ➜  Network: use --host to expose
        Info Watching /Users/achao/IdeaProjects/simple-tauri/tauri-app/src-tauri for changes...
    Updating crates.io index
     Locking 378 packages to latest compatible versions
      Adding addr2line v0.22.0 (latest: v0.24.1)
      Adding atk v0.15.1 (latest: v0.18.0)
      Adding atk-sys v0.15.1 (latest: v0.18.0)
      Adding base64 v0.13.1 (latest: v0.22.1)
      Adding base64 v0.21.7 (latest: v0.22.1)
      Adding bitflags v1.3.2 (latest: v2.6.0)
      Adding brotli v3.5.0 (latest: v6.0.0)
      Adding brotli-decompressor v2.5.1 (latest: v4.0.1)
      Adding cairo-rs v0.15.12 (latest: v0.20.0)
      Adding cairo-sys-rs v0.15.1 (latest: v0.20.0)
      Adding cargo_toml v0.15.3 (latest: v0.20.4)
      Adding cfb v0.7.3 (latest: v0.10.0)
      Adding cfg-expr v0.9.1 (latest: v0.16.0)
      Adding cfg-expr v0.15.8 (latest: v0.16.0)
      Adding cocoa v0.24.1 (latest: v0.25.0)
      Adding convert_case v0.4.0 (latest: v0.6.0)
      Adding core-graphics v0.22.3 (latest: v0.23.2)
      Adding cssparser v0.27.2 (latest: v0.34.0)
      Adding foreign-types v0.3.2 (latest: v0.5.0)
      Adding foreign-types-shared v0.1.1 (latest: v0.3.1)
      Adding gdk v0.15.4 (latest: v0.18.0)
      Adding gdk-pixbuf v0.15.11 (latest: v0.20.0)
      Adding gdk-pixbuf-sys v0.15.10 (latest: v0.20.0)
      Adding gdk-sys v0.15.1 (latest: v0.18.0)
      Adding gdkwayland-sys v0.15.3 (latest: v0.18.0)
      Adding gdkx11-sys v0.15.1 (latest: v0.18.0)
      Adding generator v0.7.5 (latest: v0.8.2)
      Adding generic-array v0.14.7 (latest: v1.1.0)
      Adding getrandom v0.1.16 (latest: v0.2.15)
      Adding gimli v0.29.0 (latest: v0.31.0)
      Adding gio v0.15.12 (latest: v0.20.0)
      Adding gio-sys v0.15.10 (latest: v0.20.0)
      Adding glib v0.15.12 (latest: v0.20.0)
      Adding glib-macros v0.15.13 (latest: v0.20.0)
      Adding glib-sys v0.15.10 (latest: v0.20.0)
      Adding gobject-sys v0.15.10 (latest: v0.20.0)
      Adding gtk v0.15.5 (latest: v0.18.1)
      Adding gtk-sys v0.15.3 (latest: v0.18.0)
      Adding gtk3-macros v0.15.6 (latest: v0.18.0)
      Adding hashbrown v0.12.3 (latest: v0.14.5)
      Adding heck v0.3.3 (latest: v0.5.0)
      Adding heck v0.4.1 (latest: v0.5.0)
      Adding html5ever v0.26.0 (latest: v0.27.0)
      Adding http v0.2.12 (latest: v1.1.0)
      Adding idna v0.5.0 (latest: v1.0.2)
      Adding image v0.24.9 (latest: v0.25.2)
      Adding indexmap v1.9.3 (latest: v2.3.0)
      Adding infer v0.13.0 (latest: v0.16.0)
      Adding itoa v0.4.8 (latest: v1.0.11)
      Adding javascriptcore-rs v0.16.0 (latest: v1.1.2)
      Adding javascriptcore-rs-sys v0.4.0 (latest: v1.1.1)
      Adding jni v0.20.0 (latest: v0.21.1)
      Adding jni-sys v0.3.0 (latest: v0.4.0)
      Adding json-patch v1.4.0 (latest: v2.0.0)
      Adding linux-raw-sys v0.4.14 (latest: v0.6.4)
      Adding loom v0.5.6 (latest: v0.7.2)
      Adding malloc_buf v0.0.6 (latest: v1.0.0)
      Adding markup5ever v0.11.0 (latest: v0.12.1)
      Adding matchers v0.1.0 (latest: v0.2.0)
      Adding ndk v0.6.0 (latest: v0.9.0)
      Adding ndk-sys v0.3.0 (latest: v0.6.0+11769913)
      Adding nu-ansi-term v0.46.0 (latest: v0.50.1)
      Adding num_enum v0.5.11 (latest: v0.7.3)
      Adding num_enum_derive v0.5.11 (latest: v0.7.3)
      Adding open v3.2.0 (latest: v5.3.0)
      Adding pango v0.15.10 (latest: v0.20.0)
      Adding pango-sys v0.15.10 (latest: v0.20.0)
      Adding phf v0.8.0 (latest: v0.11.2)
      Adding phf v0.10.1 (latest: v0.11.2)
      Adding phf_codegen v0.8.0 (latest: v0.11.2)
      Adding phf_codegen v0.10.0 (latest: v0.11.2)
      Adding phf_generator v0.8.0 (latest: v0.11.2)
      Adding phf_generator v0.10.0 (latest: v0.11.2)
      Adding phf_macros v0.8.0 (latest: v0.11.2)
      Adding phf_shared v0.8.0 (latest: v0.11.2)
      Adding phf_shared v0.10.0 (latest: v0.11.2)
      Adding proc-macro-crate v1.3.1 (latest: v3.1.0)
      Adding quick-xml v0.32.0 (latest: v0.36.1)
      Adding rand v0.7.3 (latest: v0.8.5)
      Adding rand_chacha v0.2.2 (latest: v0.3.1)
      Adding rand_core v0.5.1 (latest: v0.6.4)
      Adding rand_hc v0.2.0 (latest: v0.3.2)
      Adding rand_pcg v0.2.1 (latest: v0.3.1)
      Adding raw-window-handle v0.5.2 (latest: v0.6.2)
      Adding redox_syscall v0.4.1 (latest: v0.5.3)
      Adding regex-automata v0.1.10 (latest: v0.4.7)
      Adding regex-syntax v0.6.29 (latest: v0.8.4)
      Adding selectors v0.22.0 (latest: v0.25.0)
      Adding serialize-to-javascript v0.1.1 (latest: v0.1.2)
      Adding serialize-to-javascript-impl v0.1.1 (latest: v0.1.2)
      Adding servo_arc v0.1.1 (latest: v0.3.0)
      Adding siphasher v0.3.11 (latest: v1.0.1)
      Adding state v0.5.3 (latest: v0.6.0)
      Adding syn v1.0.109 (latest: v2.0.72)
      Adding system-deps v5.0.0 (latest: v7.0.1)
      Adding system-deps v6.2.2 (latest: v7.0.1)
      Adding tao v0.16.9 (latest: v0.28.1)
      Adding toml v0.5.11 (latest: v0.8.19)
      Adding toml v0.7.8 (latest: v0.8.19)
      Adding toml_edit v0.19.15 (latest: v0.22.20)
      Adding version-compare v0.0.11 (latest: v0.2.0)
      Adding wasi v0.9.0+wasi-snapshot-preview1 (latest: v0.13.1+wasi-0.2.0)
      Adding wasi v0.11.0+wasi-snapshot-preview1 (latest: v0.13.1+wasi-0.2.0)
      Adding webkit2gtk v0.18.2 (latest: v2.0.1)
      Adding webkit2gtk-sys v0.18.0 (latest: v2.0.1)
      Adding webview2-com v0.19.1 (latest: v0.32.0)
      Adding webview2-com-macros v0.6.0 (latest: v0.8.0)
      Adding webview2-com-sys v0.19.0 (latest: v0.32.0)
      Adding windows v0.39.0 (latest: v0.58.0)
      Adding windows v0.48.0 (latest: v0.58.0)
      Adding windows-bindgen v0.39.0 (latest: v0.58.0)
      Adding windows-core v0.52.0 (latest: v0.58.0)
      Adding windows-implement v0.39.0 (latest: v0.58.0)
      Adding windows-metadata v0.39.0 (latest: v0.58.0)
      Adding windows-sys v0.42.0 (latest: v0.59.0)
      Adding windows-sys v0.48.0 (latest: v0.59.0)
      Adding windows-sys v0.52.0 (latest: v0.59.0)
      Adding windows-targets v0.48.5 (latest: v0.52.6)
      Adding windows-tokens v0.39.0 (latest: v0.48.0)
      Adding windows_aarch64_gnullvm v0.42.2 (latest: v0.52.6)
      Adding windows_aarch64_gnullvm v0.48.5 (latest: v0.52.6)
      Adding windows_aarch64_msvc v0.39.0 (latest: v0.52.6)
      Adding windows_aarch64_msvc v0.42.2 (latest: v0.52.6)
      Adding windows_aarch64_msvc v0.48.5 (latest: v0.52.6)
      Adding windows_i686_gnu v0.39.0 (latest: v0.52.6)
      Adding windows_i686_gnu v0.42.2 (latest: v0.52.6)
      Adding windows_i686_gnu v0.48.5 (latest: v0.52.6)
      Adding windows_i686_msvc v0.39.0 (latest: v0.52.6)
      Adding windows_i686_msvc v0.42.2 (latest: v0.52.6)
      Adding windows_i686_msvc v0.48.5 (latest: v0.52.6)
      Adding windows_x86_64_gnu v0.39.0 (latest: v0.52.6)
      Adding windows_x86_64_gnu v0.42.2 (latest: v0.52.6)
      Adding windows_x86_64_gnu v0.48.5 (latest: v0.52.6)
      Adding windows_x86_64_gnullvm v0.42.2 (latest: v0.52.6)
      Adding windows_x86_64_gnullvm v0.48.5 (latest: v0.52.6)
      Adding windows_x86_64_msvc v0.39.0 (latest: v0.52.6)
      Adding windows_x86_64_msvc v0.42.2 (latest: v0.52.6)
      Adding windows_x86_64_msvc v0.48.5 (latest: v0.52.6)
      Adding winnow v0.5.40 (latest: v0.6.18)
      Adding wry v0.24.10 (latest: v0.41.0)
  Downloaded equivalent v1.0.1
  Downloaded malloc_buf v0.0.6
  Downloaded darling_macro v0.20.10
  Downloaded http-range v0.1.5
  Downloaded mac v0.1.1
  Downloaded fxhash v0.2.1
  Downloaded foreign-types v0.3.2
  Downloaded cssparser-macros v0.6.1
  Downloaded alloc-no-stdlib v2.0.4
  Downloaded adler v1.0.2
  Downloaded block v0.1.6
  Downloaded instant v0.1.13
  Downloaded alloc-stdlib v0.2.2
  Downloaded foreign-types-shared v0.1.1
  Downloaded objc_exception v0.1.2
  Downloaded matches v0.1.10
  Downloaded core-graphics-types v0.1.3
  Downloaded pin-utils v0.1.0
  Downloaded itoa v1.0.11
  Downloaded phf_macros v0.8.0
  Downloaded filetime v0.2.23
  Downloaded phf v0.8.0
  Downloaded pathdiff v0.2.1
  Downloaded futures-task v0.3.30
  Downloaded fastrand v2.1.0
  Downloaded infer v0.13.0
  Downloaded heck v0.5.0
  Downloaded string_cache_codegen v0.5.2
  Downloaded phf_codegen v0.10.0
  Downloaded form_urlencoded v1.2.1
  Downloaded glob v0.3.1
  Downloaded embed-resource v2.4.3
  Downloaded ident_case v1.0.1
  Downloaded futures-core v0.3.30
  Downloaded dtoa-short v0.3.5
  Downloaded lazy_static v1.5.0
  Downloaded core-graphics v0.22.3
  Downloaded crypto-common v0.1.6
  Downloaded cpufeatures v0.2.12
  Downloaded cocoa-foundation v0.1.2
  Downloaded dispatch v0.2.0
  Downloaded dirs-next v2.0.0
  Downloaded phf_generator v0.10.0
  Downloaded byteorder v1.5.0
  Downloaded block-buffer v0.10.4
  Downloaded autocfg v1.3.0
  Downloaded json-patch v1.4.0
  Downloaded convert_case v0.4.0
  Downloaded phf_shared v0.8.0
  Downloaded serialize-to-javascript-impl v0.1.1
  Downloaded phf_shared v0.10.0
  Downloaded objc_id v0.1.1
  Downloaded num-conv v0.1.0
  Downloaded siphasher v0.3.11
  Downloaded precomputed-hash v0.1.1
  Downloaded phf_macros v0.11.2
  Downloaded phf_codegen v0.8.0
  Downloaded phf v0.10.1
  Downloaded new_debug_unreachable v1.0.6
  Downloaded thin-slice v0.1.1
  Downloaded xattr v1.3.1
  Downloaded utf-8 v0.7.6
  Downloaded walkdir v2.5.0
  Downloaded tinyvec_macros v0.1.1
  Downloaded embed_plist v1.2.2
  Downloaded dunce v1.0.5
  Downloaded ppv-lite86 v0.2.20
  Downloaded thiserror v1.0.63
  Downloaded proc-macro-hack v0.5.20+deprecated
  Downloaded time-macros v0.2.18
  Downloaded tauri-winres v0.1.1
  Downloaded tendril v0.4.3
  Downloaded hashbrown v0.12.3
  Downloaded time-core v0.1.2
  Downloaded rand_pcg v0.2.1
  Downloaded rand_chacha v0.2.2
  Downloaded http v0.2.12
  Downloaded tauri-runtime v0.14.4
  Downloaded flate2 v1.0.31
  Downloaded serde_spanned v0.6.7
  Downloaded same-file v1.0.6
  Downloaded toml_datetime v0.6.8
  Downloaded tauri-utils v1.6.0
  Downloaded tar v0.4.41
  Downloaded phf v0.11.2
  Downloaded indexmap v2.3.0
  Downloaded thiserror-impl v1.0.63
  Downloaded tinyvec v1.8.0
  Downloaded log v0.4.22
  Downloaded kuchikiki v0.8.2
  Downloaded objc v0.2.7
  Downloaded indexmap v1.9.3
  Downloaded ignore v0.4.22
  Downloaded phf_generator v0.8.0
  Downloaded open v3.2.0
  Downloaded ico v0.3.0
  Downloaded html5ever v0.26.0
  Downloaded scopeguard v1.2.0
  Downloaded phf_generator v0.11.2
  Downloaded rustc_version v0.4.0
  Downloaded derive_more v0.99.18
  Downloaded darling_core v0.20.10
  Downloaded raw-window-handle v0.5.2
  Downloaded slab v0.4.9
  Downloaded powerfmt v0.2.0
  Downloaded serde_repr v0.1.19
  Downloaded cssparser v0.27.2
  Downloaded rand_chacha v0.3.1
  Downloaded strsim v0.11.1
  Downloaded rand_core v0.6.4
  Downloaded stable_deref_trait v1.2.0
  Downloaded servo_arc v0.1.1
  Downloaded aho-corasick v1.1.3
  Downloaded futures-util v0.3.30
  Downloaded serialize-to-javascript v0.1.1
  Downloaded time v0.3.36
  Downloaded tauri-macros v1.4.5
  Downloaded once_cell v1.19.0
  Downloaded zerocopy-derive v0.7.35
  Downloaded tauri-codegen v1.4.4
  Downloaded simd-adler32 v0.3.7
  Downloaded chrono v0.4.38
  Downloaded brotli-decompressor v2.5.1
  Downloaded version_check v0.9.5
  Downloaded hashbrown v0.14.5
  Downloaded crossbeam-utils v0.8.20
  Downloaded crossbeam-epoch v0.9.18
  Downloaded crossbeam-channel v0.5.13
  Downloaded cfb v0.7.3
  Downloaded cc v1.1.7
  Downloaded bytes v1.7.1
  Downloaded bitflags v2.6.0
  Downloaded base64 v0.22.1
  Downloaded state v0.5.3
  Downloaded idna v0.5.0
  Downloaded sha2 v0.10.8
  Downloaded tauri v1.7.1
  Downloaded smallvec v1.13.2
  Downloaded syn v1.0.109
  Downloaded percent-encoding v2.3.1
  Downloaded markup5ever v0.11.0
  Downloaded serde_with_macros v3.9.0
  Downloaded base64 v0.21.7
  Downloaded anyhow v1.0.86
  Downloaded parking_lot_core v0.9.10
  Downloaded pin-project-lite v0.2.14
  Downloaded tempfile v3.12.0
  Downloaded num-traits v0.2.19
  Downloaded miniz_oxide v0.7.4
  Downloaded string_cache v0.8.7
  Downloaded semver v1.0.23
  Downloaded quote v1.0.36
  Downloaded syn v2.0.72
  Downloaded parking_lot v0.12.3
  Downloaded toml v0.7.8
  Downloaded bstr v1.10.0
  Downloaded unicode-ident v1.0.12
  Downloaded typenum v1.17.0
  Downloaded toml v0.8.19
  Downloaded phf_shared v0.11.2
  Downloaded uuid v1.10.0
  Downloaded cocoa v0.24.1
  Downloaded dtoa v1.0.9
  Downloaded dirs-sys-next v0.1.2
  Downloaded digest v0.10.7
  Downloaded deranged v0.3.11
  Downloaded darling v0.20.10
  Downloaded ctor v0.2.8
  Downloaded crossbeam-deque v0.8.5
  Downloaded crc32fast v1.4.2
  Downloaded core-foundation-sys v0.8.6
  Downloaded core-foundation v0.9.4
  Downloaded cfg-if v1.0.0
  Downloaded cargo_toml v0.15.3
  Downloaded proc-macro2 v1.0.86
  Downloaded bitflags v1.3.2
  Downloaded tauri-build v1.5.3
  Downloaded rand_core v0.5.1
  Downloaded nodrop v0.1.14
  Downloaded lock_api v0.4.12
  Downloaded itoa v0.4.8
  Downloaded ryu v1.0.18
  Downloaded iana-time-zone v0.1.60
  Downloaded hex v0.4.3
  Downloaded globset v0.4.14
  Downloaded getrandom v0.2.15
  Downloaded getrandom v0.1.16
  Downloaded generic-array v0.14.7
  Downloaded futures-macro v0.3.30
  Downloaded futf v0.1.5
  Downloaded fnv v1.0.7
  Downloaded fdeflate v0.3.4
  Downloaded errno v0.3.9
  Downloaded selectors v0.22.0
  Downloaded unicode-bidi v0.3.15
  Downloaded serde_derive v1.0.204
  Downloaded tokio v1.39.2
  Downloaded libc v0.2.155
  Downloaded tauri-runtime-wry v0.14.9
  Downloaded url v2.5.2
  Downloaded rand v0.8.5
  Downloaded toml_edit v0.19.15
  Downloaded serde v1.0.204
  Downloaded memchr v2.7.4
  Downloaded png v0.17.13
  Downloaded plist v1.7.0
  Downloaded toml_edit v0.22.20
  Downloaded rand v0.7.3
  Downloaded wry v0.24.10
  Downloaded unicode-normalization v0.1.23
  Downloaded serde_json v1.0.122
  Downloaded zerocopy v0.7.35
  Downloaded serde_with v3.9.0
  Downloaded encoding_rs v0.8.34
  Downloaded brotli v3.5.0
  Downloaded quick-xml v0.32.0
  Downloaded winnow v0.6.18
  Downloaded winnow v0.5.40
  Downloaded regex v1.10.6
  Downloaded regex-syntax v0.8.4
  Downloaded rustix v0.38.34
  Downloaded tao v0.16.9
  Downloaded regex-automata v0.4.7
  Downloaded 223 crates (17.3 MB) in 6.11s (largest was `tao` at 2.4 MB)
   Compiling proc-macro2 v1.0.86
   Compiling unicode-ident v1.0.12
   Compiling cfg-if v1.0.0
   Compiling libc v0.2.155
   Compiling byteorder v1.5.0
   Compiling serde v1.0.204
   Compiling siphasher v0.3.11
   Compiling autocfg v1.3.0
   Compiling memchr v2.7.4
   Compiling syn v1.0.109
   Compiling getrandom v0.1.16
   Compiling smallvec v1.13.2
   Compiling parking_lot_core v0.9.10
   Compiling phf_shared v0.10.0
   Compiling once_cell v1.19.0
   Compiling equivalent v1.0.1
   Compiling hashbrown v0.14.5
   Compiling log v0.4.22
   Compiling lock_api v0.4.12
   Compiling fnv v1.0.7
   Compiling bitflags v1.3.2
   Compiling phf_shared v0.8.0
   Compiling new_debug_unreachable v1.0.6
   Compiling precomputed-hash v0.1.1
   Compiling itoa v1.0.11
   Compiling cc v1.1.7
   Compiling proc-macro-hack v0.5.20+deprecated
   Compiling mac v0.1.1
   Compiling futf v0.1.5
   Compiling utf-8 v0.7.6
   Compiling indexmap v2.3.0
   Compiling tendril v0.4.3
   Compiling phf v0.10.1
   Compiling ryu v1.0.18
   Compiling strsim v0.11.1
   Compiling thiserror v1.0.63
   Compiling dtoa v1.0.9
   Compiling ident_case v1.0.1
   Compiling tinyvec_macros v0.1.1
   Compiling dtoa-short v0.3.5
   Compiling tinyvec v1.8.0
   Compiling indexmap v1.9.3
   Compiling matches v0.1.10
   Compiling stable_deref_trait v1.2.0
   Compiling nodrop v0.1.14
   Compiling itoa v0.4.8
   Compiling convert_case v0.4.0
   Compiling servo_arc v0.1.1
   Compiling unicode-normalization v0.1.23
   Compiling fxhash v0.2.1
   Compiling phf_shared v0.11.2
   Compiling thin-slice v0.1.1
   Compiling percent-encoding v2.3.1
   Compiling alloc-no-stdlib v2.0.4
   Compiling hashbrown v0.12.3
   Compiling unicode-bidi v0.3.15
   Compiling scopeguard v1.2.0
   Compiling idna v0.5.0
   Compiling alloc-stdlib v0.2.2
   Compiling form_urlencoded v1.2.1
   Compiling semver v1.0.23
   Compiling same-file v1.0.6
   Compiling brotli-decompressor v2.5.1
   Compiling simd-adler32 v0.3.7
   Compiling objc_exception v0.1.2
   Compiling version_check v0.9.5
   Compiling walkdir v2.5.0
   Compiling typenum v1.17.0
   Compiling adler v1.0.2
   Compiling getrandom v0.2.15
   Compiling dunce v1.0.5
   Compiling glob v0.3.1
   Compiling rand_core v0.6.4
   Compiling rand_core v0.5.1
   Compiling quote v1.0.36
   Compiling crossbeam-utils v0.8.20
   Compiling rand_pcg v0.2.1
   Compiling syn v2.0.72
   Compiling parking_lot v0.12.3
   Compiling serde_json v1.0.122
   Compiling brotli v3.5.0
   Compiling generic-array v0.14.7
   Compiling uuid v1.10.0
   Compiling miniz_oxide v0.7.4
   Compiling crc32fast v1.4.2
   Compiling core-foundation-sys v0.8.6
   Compiling regex-syntax v0.8.4
   Compiling cfb v0.7.3
   Compiling malloc_buf v0.0.6
   Compiling core-foundation v0.9.4
   Compiling flate2 v1.0.31
   Compiling fdeflate v0.3.4
   Compiling infer v0.13.0
   Compiling core-graphics-types v0.1.3
   Compiling png v0.17.13
   Compiling winnow v0.5.40
   Compiling winnow v0.6.18
   Compiling foreign-types-shared v0.1.1
   Compiling heck v0.5.0
   Compiling foreign-types v0.3.2
   Compiling anyhow v1.0.86
   Compiling rustix v0.38.34
   Compiling objc v0.2.7
   Compiling bytes v1.7.1
   Compiling block v0.1.6
   Compiling powerfmt v0.2.0
   Compiling cocoa-foundation v0.1.2
   Compiling deranged v0.3.11
   Compiling core-graphics v0.22.3
   Compiling block-buffer v0.10.4
   Compiling darling_core v0.20.10
   Compiling crypto-common v0.1.6
   Compiling errno v0.3.9
   Compiling rustc_version v0.4.0
   Compiling tao v0.16.9
   Compiling aho-corasick v1.1.3
   Compiling bitflags v2.6.0
   Compiling raw-window-handle v0.5.2
   Compiling time-core v0.1.2
   Compiling num-conv v0.1.0
   Compiling time v0.3.36
   Compiling digest v0.10.7
   Compiling cocoa v0.24.1
   Compiling regex-automata v0.4.7
   Compiling http v0.2.12
   Compiling crossbeam-channel v0.5.13
   Compiling cpufeatures v0.2.12
   Compiling dirs-sys-next v0.1.2
   Compiling zerocopy-derive v0.7.35
   Compiling serde_derive v1.0.204
   Compiling cssparser-macros v0.6.1
   Compiling thiserror-impl v1.0.63
   Compiling html5ever v0.26.0
   Compiling cssparser v0.27.2
   Compiling darling_macro v0.20.10
   Compiling derive_more v0.99.18
   Compiling ctor v0.2.8
   Compiling zerocopy v0.7.35
   Compiling darling v0.20.10
   Compiling quick-xml v0.32.0
   Compiling serde_with_macros v3.9.0
   Compiling slab v0.4.9
   Compiling instant v0.1.13
   Compiling ppv-lite86 v0.2.20
   Compiling tauri-runtime v0.14.4
   Compiling lazy_static v1.5.0
   Compiling wry v0.24.10
   Compiling rand_chacha v0.3.1
   Compiling rand_chacha v0.2.2
   Compiling rand v0.8.5
   Compiling rand v0.7.3
   Compiling dispatch v0.2.0
   Compiling base64 v0.22.1
   Compiling regex v1.10.6
   Compiling dirs-next v2.0.0
   Compiling sha2 v0.10.8
   Compiling ico v0.3.0
   Compiling objc_id v0.1.1
   Compiling phf_generator v0.10.0
   Compiling phf_generator v0.11.2
   Compiling crossbeam-epoch v0.9.18
   Compiling phf_codegen v0.10.0
   Compiling phf_generator v0.8.0
   Compiling string_cache_codegen v0.5.2
   Compiling phf_macros v0.11.2
   Compiling phf_codegen v0.8.0
   Compiling bstr v1.10.0
   Compiling tauri-runtime-wry v0.14.9
   Compiling phf_macros v0.8.0
   Compiling selectors v0.22.0
   Compiling base64 v0.21.7
   Compiling http-range v0.1.5
   Compiling pin-project-lite v0.2.14
   Compiling crossbeam-deque v0.8.5
   Compiling markup5ever v0.11.0
   Compiling globset v0.4.14
   Compiling serialize-to-javascript-impl v0.1.1
   Compiling futures-macro v0.3.30
   Compiling xattr v1.3.1
   Compiling tauri v1.7.1
   Compiling phf v0.11.2
   Compiling filetime v0.2.23
   Compiling futures-core v0.3.30
   Compiling pin-utils v0.1.0
   Compiling fastrand v2.1.0
   Compiling futures-task v0.3.30
   Compiling pathdiff v0.2.1
   Compiling phf v0.8.0
   Compiling open v3.2.0
   Compiling tar v0.4.41
   Compiling ignore v0.4.22
   Compiling tempfile v3.12.0
   Compiling tokio v1.39.2
   Compiling serde_repr v0.1.19
   Compiling encoding_rs v0.8.34
   Compiling futures-util v0.3.30
   Compiling embed_plist v1.2.2
   Compiling state v0.5.3
   Compiling url v2.5.2
   Compiling serde_with v3.9.0
   Compiling serde_spanned v0.6.7
   Compiling string_cache v0.8.7
   Compiling toml_datetime v0.6.8
   Compiling plist v1.7.0
   Compiling toml_edit v0.19.15
   Compiling toml_edit v0.22.20
   Compiling json-patch v1.4.0
   Compiling serialize-to-javascript v0.1.1
   Compiling kuchikiki v0.8.2
   Compiling toml v0.7.8
   Compiling toml v0.8.19
   Compiling tauri-utils v1.6.0
   Compiling embed-resource v2.4.3
   Compiling cargo_toml v0.15.3
   Compiling tauri-winres v0.1.1
   Compiling tauri-build v1.5.3
   Compiling tauri-codegen v1.4.4
   Compiling tauri-macros v1.4.5
   Compiling tauri-app v0.0.0 (/Users/achao/IdeaProjects/simple-tauri/tauri-app/src-tauri)
    Finished `dev` profile [unoptimized + debuginfo] target(s) in 40.87s
```

运行效果如下

![](/imgs/oss/blog-img/2024-08-07-12-11-14-image.png)
