---
title: SQL 执行过程
published: 2026-01-28
description: '该文档用于记录SQL 执行过程的学习分析'
image: ''
tags: ['database','mysql']
category: 'database'
draft: true
lang: ''
---
## BiliBili
<iframe width="100%" height="468" src="//player.bilibili.com/player.html?bvid=BV15z421o7Up" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"></iframe>

## 前置知识

### buffer pool
> innoDB 存储引擎的核心组件，用于缓存数据库中的数据和索引，减少对磁盘的访问次数，提升数据库的**读**性能。

![alt text](image-2.png)

- 如何解决预读失效和缓冲池污染的问题？
    - 将缓冲池分为冷热数据区域，冷数据区域用于缓存最近最少使用的数据，热数据区域用于缓存最近频繁使用的数据。
    - 必须在冷数据区域中停留一段时间（避免大量查询导致的缓冲区污染，如索引失效情况下的全表查询），确保热数据区域中的数据是最近频繁使用的。
![alt text](image-3.png)

### change buffer

