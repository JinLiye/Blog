---
title: Java笔记
published: 2026-01-16
description: ''
image: ''
tags: []
category: 'Java'
draft: true
lang: ''
---

# Java基础

## Java中的序列化和反序列化是什么？
<!-- ![序列化和反序列化](assets/knowledge/java/java-基础/序列化和反序列化.jpeg) -->

> 序列化：把内存中的一个java对象，打包转化成一串连续的字节数据（通用、与平台无关的格式）。如二进制流、JSON字符串

> 反序列化：把一串连续的字节数据，还原成内存中的一个可用的java对象

### 序列化的目的

- 持久化：把内存中的对象保存到硬盘上，方便下次使用

- 网络传输：把内存中的对象通过网络传输（RPC、Socket）到其他地方

- 缓存：序列化可以把对象压成紧凑的形式，高效的存入缓存系统，大大减少了数据库（Redis）访问的压力，提升了响应速度

### 如何实现序列化和反序列化？

- Step1：实现Serializable接口

> Serializable接口是一个空接口，没有任何方法，它的作用是标识一个类可以被序列化，它没有方法，所以实现起来非常简单，只需要在类上加上一个implements Serializable即可

```java
public class Person implements Serializable {
    
}
```

- Step2：为类添加serialVersionUID字段
```java
public class Person implements Serializable {
    private static final long serialVersionUID = 1L;
    private String name;
    private int age;

    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }

    public String getName() {
        return name;
    }

    public int getAge() {
        return age;
    }
}
```

> serialVersionUID是序列化版本号，用于标识类的版本，序列化和反序列化时，会检查serialVersionUID是否一致，如果不一致，会抛出InvalidClassException异常

- Step:3 序列化
```java
package com.kno.Serialization;

import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.nio.file.Files;
import java.nio.file.Paths;

public class APP {
    public static void main(String[] args) {
        // TODO Auto-generated method stub
        Person person = new Person("John", 30);
        // 序列化：写入到文件 person.obj
        try {
            ObjectOutputStream oos = new ObjectOutputStream(Files.newOutputStream(Paths.get("person.obj")));
            oos.writeObject(person);
            System.out.println("Serialized person object to file");

        } catch (Exception e) {
            e.printStackTrace();
        }
        // 反序列化：从文件 person.obj 读取对象
        try {
            ObjectInputStream ois = new ObjectInputStream(Files.newInputStream(Paths.get("person.obj")));
            Person deserializedPerson = (Person) ois.readObject();
            System.out.println("Deserialized person object from file: " + deserializedPerson.getName() + ", " + deserializedPerson.getAge());
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
```

### 细节
- **Java序列化不包含静态变量（static）**
    - 静态变量属于类，不属于对象，序列化的目标是“对象的状态”，不是类的结构或全局变量
- **Java序列化不包含transient修饰的变量**
- 序列化的性能考量：
    - Java 默认序列化机制较慢，尤其对于大规模分布式系统，可能会选择Protobuf、Kryo等高效的序列化框架

### 回答重点

- 怎么做：类必须实现Serializable接口
- 怎么防：敏感字段加transient关键字
- 怎么稳：显示定义serialVersionUID字段，并保证其唯一性
- 为什么对象不能直接传输？
    - 对象在VM里是"立体"的，到处都是引用关系。比如某个字段指向内存地址0x1234处的另一个对象，这地址只在当前M有效，传到网络另一端，人家的0x1234地址上根本不是同一个东西。
    - 序列化要干的活就是把这些引用关系"压扁”，把整个对象图递归地转成一段自包含的字节序列。接收端拿到后，反序列化时在自己的堆上重建整个对象图，引用关系照样能还原回来。

## Java中有哪些集合类？简要介绍
> java集合框架分两个阵营：Collection（单列集合）和Map（双列集合）

- Collection（单列集合）
    - List（有序可重复）
        - ArrayList（数组实现，随机访问快，增删慢）
        - LinkedList（链表实现，增删快，随机访问慢）
    - Set（无序不重复）
        - HashSet（基于HashMap实现，不保证有序）
        - TreeSet（基于红黑树实现，有序）
    - Queue（队列）
        - LinkedList（链表实现，FIFO）
        - PriorityQueue（基于堆实现，有序）
- Map（双列集合）
    - HashMap（基于哈希表实现，不保证有序）
    - TreeMap（基于红黑树实现，有序）
