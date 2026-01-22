---
title: Mysql_索引
published: 2026-01-16
description: '该文档用于记录Mysql 索引的学习过程，源码分析'
image: ''
tags: [database,mysql,index]
category: 'database'
draft: true
lang: ''
---

## 什么是索引？
> 一种帮助Mysql提高查询效率的数据结构

索引的优缺点：
- 优点：
  - 提高查询效率
- 缺点：
  - 占用额外的磁盘空间
  - 增加插入、更新和删除操作的成本（需要对索引进行维护）

## 索引的分类
- a.主键索引
  - 设置主键后会自动创建的索引（聚簇索引）
- b.单值索引（单列索引、普通索引）
  - 给表中的某个字段单独加一个索引（可有多个）


- c.唯一索引
  - 给表中的某个字段单独加一个索引（可有多个），索引值必须唯一（不允许重复），但允许有空值（NULL）。
  - InnoDB存储引擎中允许多个NULL，NULL代表未知，NULL！=NULL（与其他任何值都不相等）。

- d.组合索引
  - 给表中的多个字段组合起来加一个索引（只能有一个），用于提高多字段查询的效率。
- e.全文索引
  - 给表中的某个字段单独加一个索引（只能有一个），用于全文搜索。用于CHAR、VARCHAR、TEXT类型的字段。

  
## 索引的创建
- a.主键索引
  - 创建表时设置主键，会自动创建主键索引。
- b.单值索引
  - 建表时建立索引：
    ```sql
    CREATE TABLE table_name (
      column_name data_type primary key,
      INDEX index_name (column_name)
    );
    ```
  - 使用CREATE INDEX语句创建单值索引。
    ```sql
    CREATE INDEX index_name ON table_name (column_name);
    ```
- c.唯一索引
  - 建表时建立索引：
    ```sql
    CREATE TABLE table_name (
      column_name data_type unique,
      INDEX index_name (column_name)
    );
    ```
  - 使用CREATE UNIQUE INDEX语句创建唯一索引：
    ```sql
    CREATE UNIQUE INDEX index_name ON table_name (column_name);
    ```
- d.组合索引
  - 使用CREATE INDEX语句创建组合索引。
  - 左前缀索引：
    - 最佳左前缀原则
    - mysql引擎为了更好的利用索引，会动态调整查询字段顺序以利用索引
    ![alt text](image.png)

- e.全文索引
  - 使用CREATE FULLTEXT INDEX语句创建全文索引。

## 索引的底层原理（B+树）

