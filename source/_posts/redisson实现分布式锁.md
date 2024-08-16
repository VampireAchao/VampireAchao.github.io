---
title: redisson实现分布式锁
date: 2021-07-02 20:01:37
tags: java
---

> 性格左右命运，气度影响格局。——余世雅博士

代码如下

```java
    public static int EXPIRE_SECONDS = 5 * 60;
    @Resource
    private RedissonClient redissonClient; 


	/**
     * 加redisson分布式锁
     *
     * @param lockName 锁名
     * @param supplier 调用方法
     * @return T
     * @author <achao1441470436@gmail.com>
     * @since 2021/7/2 17:42
     */
    @Override
    @Transactional(rollbackFor = Throwable.class, isolation = Isolation.READ_UNCOMMITTED, propagation = Propagation.REQUIRED)
    public <T> T lockByName(String lockName, Supplier<T> supplier) {
        // 获取锁
        RLock lock = redissonClient.getLock(lockName);
        // 加锁并设置失效时间
        try {
            if (lock.tryLock(EXPIRE_SECONDS, TimeUnit.SECONDS)) {
                // 执行函数获取返回值
                return supplier.get();
            }
        } catch (Exception e) {
            log.error("Something Wrong with:", e);
        } finally {
            // 释放锁
            lock.unlock();
        }
        return null;
    }
```

如何使用就不再赘述了，和我之前写的[`redis`防止缓存穿透击穿雪崩的那篇博客差不多的](https://VampireAchao.github.io/2021/06/11/redis%E7%9A%84manager%E5%B1%82%E5%BA%94%E7%94%A8/)

不过以防万一还是写一个吧哈哈

```java
        redisManager.lockByName("achao"), () -> {
            // 执行逻辑，拿到返回值，不需要返回值可以任意返回
            return "";
        });
```

在多线程场景下锁生效

如果我们需要集群下的`RedLock`

则可以如下实现

```java
    /**
     * 使用名字加一个redisson的分布式锁
     *
     * @param lockName 锁名
     * @param supplier 调用方法
     * @return T
     * @author <achao1441470436@gmail.com>
     * @since 2021/7/2 17:42
     */
    @Override
    @Transactional(rollbackFor = Throwable.class, isolation = Isolation.READ_UNCOMMITTED, propagation = Propagation.REQUIRED)
    public <T> T lockByName(String lockName, Supplier<T> supplier) {
        // 获取锁
        RLock lock = redissonClientFirst.getLock(lockName);
        RLock second = redissonClientSecond.getLock(lockName);
        RLock third = redissonClientThird.getLock(lockName);
        RedissonRedLock redissonRedLock = new RedissonRedLock(lock,second,third);
        // 加锁并设置失效时间
        try {
            if (redissonRedLock.tryLock(EXPIRE_SECONDS, TimeUnit.SECONDS)) {
                // 执行函数获取返回值
                return supplier.get();
            }
        } catch (Exception e) {
            log.error("Something Wrong with:", e);
        } finally {
            // 释放锁
            redissonRedLock.unlock();
        }
        return null;
    }
```

