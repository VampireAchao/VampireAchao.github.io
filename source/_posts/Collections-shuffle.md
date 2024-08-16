---
title: Collections.shuffle()
date: 2020-12-30 19:04:14
tags: java
---

> 莫等闲，白了少年头，空悲切。——岳飞

[转](https://blog.csdn.net/u011514810/article/details/51218784)

> Java.util.Collections类下有一个静态的shuffle()方法,如下：
>
> 1）static void shuffle(List<?> list)  使用默认随机源对列表进行置换，所有置换发生的可能性都是大致相等的。
>
> 2）static void shuffle(List<?> list, Random rand) 使用指定的随机源对指定列表进行置换，所有置换发生的可能性都是大致相等的，假定随机源是公平的。
>
> 通俗一点的说，就像洗牌一样，随机打乱原来的顺序。
>
> 
>
> 注意：如果给定一个整型数组，用Arrays.asList()方法将其转化为一个集合类，有两种途径：
>
> 1）用List<Integer> list=ArrayList(Arrays.asList(ia)),用shuffle()打乱不会改变底层数组的顺序。
>
> 2）用List<Integer> list=Arrays.aslist(ia),然后用shuffle()打乱会改变底层数组的顺序。代码例子如下：





```java
package ahu;



import java.util.*;



public class Modify {

	public static void main(String[] args){
		Random rand=new Random(47);
		Integer[] ia={0,1,2,3,4,5,6,7,8,9};
		List<Integer> list=new ArrayList<Integer>(Arrays.asList(ia));
		System.out.println("Before shufflig: "+list);
		Collections.shuffle(list,rand);
		System.out.println("After shuffling: "+list);
		System.out.println("array: "+Arrays.toString(ia));
		List<Integer> list1=Arrays.asList(ia);
		System.out.println("Before shuffling: "+list1);
		Collections.shuffle(list1,rand);
		System.out.println("After shuffling: "+list1);
		System.out.println("array: "+Arrays.toString(ia));
	}

}
```

> 运行结果如下：

```yaml
Before shufflig: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
After shuffling: [3, 5, 2, 0, 7, 6, 1, 4, 9, 8]
array: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
Before shuffling: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
After shuffling: [8, 0, 5, 2, 6, 1, 4, 9, 3, 7]
array: [8, 0, 5, 2, 6, 1, 4, 9, 3, 7]
```



> 在第一种情况中，Arrays.asList（）的输出被传递给了ArrayList()的构造器，这将创建一个引用ia的元素的ArrayList，因此打乱这些引用不会修改该数组。 但是，如果直接使用Arrays.asList(ia）的结果， 这种打乱就会修改ia的顺序。意识到Arrays.asList（）产生的List对象会使用底层数组作为其物理实现是很重要的。 只要你执行的操作 会修改这个List，并且你不想原来的数组被修改，那么你就应该在另一个容器中创建一个副本。