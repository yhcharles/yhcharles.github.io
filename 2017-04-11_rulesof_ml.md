# 2017-04-11 rules_of_ml

《[Rules of Machine Learning: Best Practices for ML Engineering](https://www.google.com/search?q=Rules+of+Machine+Learning+google)》笔记

# Rules of Machine Learning: Best Practices for ML Engineering

## Terminology

- **Instance**
- **Label**
- **Feature**
- **Feature Column** Googlen内部术语，指一组相关的feature。在VW系统（Yahoo/Microsoft）中被称为"namespace"，或field
- **Example** 一条instance（包括feature）以及label
- **Model**
- **Metric**
- **Objective** 算法优化的目标
- **Pipeline**

## Overview

你将会遇到的多数问题，其实都是engineering工程问题。即使你有最优秀的ML专家，你最大的收获也将来自好的feature，而不是好的算法。因此，最好的方案或者步骤是：

1. 确保你的pipeline是可靠的，从头到尾
2. objective是合理的
3. 用最简单的方法，加入一些常识性的feature
4. 确保你的pipeline仍然是可靠的

这样简单的方案通常能在很长时间够用了，直到你确定没法再继续改进了，才去尝试新的trick。

该文档分为如下几个部分：

1. 帮助你了解什么时候适合在系统中引入ML
2. 如何发布第一个pipeline
3. 如何迭代，添加新的feature，如何评估model，以及training-serving skew
4. 当遇到瓶颈时怎么办
5. 最后列出一些其他的相关工作，以及本文档中举例时提到的一些系统的背景

## Before Machine Learning

**Rule #1: Don't be afraid to launch a product without machine learning**

用heuristic的方法也能达到一定效果。等积累一定数据量之后，再上ML。

**Rule #2: First, design and implement metrics.**

从现有系统中获取量化的指标，帮助你理解这个系统，并且也为将来ML做好准备。

**Rule #3: Choose machine learning over a complex heuristic.**

简单的heuristic方法通常能解决问题，但随着不断改进，会变得越来越难维护。当积累了一定数据，和对问题本身有足够经验后，就可以考虑转向ML了。ML会更容易维护。

## ML Phase I: Your First Pipeline

首要问题还是工程问题，先重点建设pipeline。如果没有可靠的pipeline，你将无法知道你的算法究竟在干什么，一切都是空中楼阁。

**Rule #4: Keep the first model simple and get the infrastructure right.**

一般情况下，第一个上线的ML model带来的提升最明显，所以不要想搞得太花哨。你遇到更多的是架构上的问题：

1. 如何得到/生成训练数据
2. 评价“好”与“坏”的标准是什么
3. 如何把模型集成到系统中。是用模型进行线上预测，还是离线做预测，将结果缓存后，提供线上查询。例如，你可以对网页进行离线分类，但如果是在线聊天的内容，就需要在线分类。

选择简单的feature：

1. 确保通过pipeline进入训练算法的feature是正确的
2. 模型学出的权重是合理的
3. feature正确的进入了你的模型

做好这几点，其实你就完成了大部分工作了。第一个上线的模型，可以作为后续的baseline。

**Rule #5: Test the infrastructure independently from the machine learning.**

确保架构是容易被测试的。离线训练、在线服务等，每个模块可以分开进行测试。

**Rule #6: Be careful about dropped data when copying pipelines.**

创建数据获取的pipeline时，通常会重复利用一些已有的pipeline，即使这些旧的pipeline是为其它目的创建的。这时候就需要考虑到旧的pipeline创建时所刻意忽略掉的信息，它们可能对于新pipeline是有意义的。

**Rule #7: Turn heuristics into features, or handle them externallly.**

通常，引入ML所要解决的问题并非新问题，所以很可能系统中已经有一些heuristic的方法，也许对应为若干rules。它们都可以加以利用：

1. **用heuristic的规则对数据进行预处理** 例如垃圾邮件的黑名单
2. **创建对应的feature**
3. **挖掘一下heuristic规则的数据源**
4. **修改label**

### Monitoring

监控，创建良好的告警机制，以及对应情况下的处理办法。另外，弄个dashboard。

**Rule #8: Know the freshness requirements of your systems.**

了解时效性对你的影响有多大。例如假设一天不更新模型，会减少多少收入？如果是一个星期、一个月或者更久？这可以帮助你确定，监控的优先级，或者一旦问题出现，其紧急程度如何。另外需要注意，时效性是会变化的，比如模型中添加了新feature。

**Rule #9: Detect problems before exporting models.**

通常ML都会有一个步骤是将训练好的模型发布到线上。在发布之前对模型做一些检查是有必要的，因为有问题的模型一旦发布，就会对用户造成实际影响。

**Rule #10: Watch for silent failures.**

在ML系统中，silent failure的问题会比其他类型的系统中更普遍。例如一个数据源出问题，数据库没有更新，这时训练程序也许不会报错，但模型效果会慢慢衰减。所以最好通过一些统计量来监控数据源，并且偶尔进行人工检查，这样可以减少这类问题的发生。

**Rule #11: Give feature column owners and documentation.**

如果系统很庞大，其中有很多feature column，那么最好对每个feature column有详细的描述：它的来源是什么，期望它对效果有什么帮助。

### Your First Objective

你的系统也许有很多需要关心的metric，但通常情况下你的算法只有一个object作为优化目标。

**Rule #12: Don't overthink which objective you choose to directly optimize.**

不要过于纠结应该把哪个指标作为直接的优化目标。在前期阶段，你可能会发现很多指标都会变好，即使它们不是你直接优化的目标。但是，如果你发现这个直接优化目标提升了，但你仍然觉得不发布这个版本，那就是该重新调整目标的时候了。

**Rule #13: Choose a simple, observable and attributable metric for your first objective.**

objective不好确定，不同的人有不同的看法。选择的标准应该是，objective应该容易量化，并且能够代表最终的目标。

**Rule #14: Starting with an interpretable model makes debugging easier.**

例如linear regression, logistic regression给出的预测概率，相对于直接优化分类准确率或者排序性能，前者要容易得多。

**Rule #15: Seperate Spam Filtering and Quality Ranking in a Policy Layer.**

Spam filter是“是”与“非”的问题，Quality ranking是“谁更好”的问题。问题的本质决定了两者通常需要不同的处理方案。

## ML Phase II: Feature Engineering

在第一阶段的工作中，你会建立起完整的系统，并且有完善的测试（包括单元测试、系统测试），还有各种指标上报、数据收集，以及线上服务等。现在，开始第二阶段。

在第二阶段中，会加入很多feature，各项指标会继续得到优化，会有很多次发布，会用到很多数据和工程师，构建起一个相当好的ML系统。

**Rule #16: Plan to launch and iterate.**

显然，你会不停的发布新模型。因此，每当你有新的发布时，要考虑由此带来的复杂性是否会对以后的发布造成影响。通常，要发布新模型的理由几种基本原因：

1. 有新feature
2. 调整regularization或者对已有的feature进行新的组合
3. 调整objective

当构建模型时，考虑一下是否容易新加或者删除或者组合feature，是否很容易复制一份pipeline并验证其正确性，是否能够支持多份pipeline并行运行。

**Rule #17: Start with directly observed and reported features as opposed to learned features.**

从直接观察到的feature开始，而经过学习得到的feature。所谓“经过学习得到的feature”包括非来自其它外部系统的feature（如非监督聚类的结果）或者来自学习器自己（如factored model或者deep model）。

如果你使用了外部系统的feature，请记住外部系统有自己的objective。外部系统的objective和你当前的objective可能是有很弱的相关性。如果只是利用外部系统输出结果的一个快照，那么可能会随时间慢慢过时。即使你跟随外部系统更新你的feature，那么它们的含义也可能发生变化。总是，如果要使用外部系统的feature，需要特别小心。

factored model和deep model的主要问题是他们是非凸的。可能带来优化上的问题。建议不采用deep feature，先得到一个baseline。以后再尝试其他复杂的路子。

**Rule #18: Explore with features of content that generalize across contexts.**

**Rule #19: Use very specific features when you can.**

当有足够的数据时，从大量的简单feature中学习，比从少数几个复杂feature中学习，要更容易。比如文档ID和query，虽然泛化性能较差，但他们能帮助你在head query上取得和label一致的排序结果。

**Rule #20: Combine and modify existing features to create new feature in human-understandable ways.**

通过合并、修改已有feature来创建新feature。

连续型feature离散化，例如划分为几个区间。

不同feature column之间进行交叉组合。这可能得到非常大的特征空间，因此也需要相应量级的数据来支撑，否则容易过拟合。

**Rule #21: The number of feature weights you can learn in a linear model is roughly proportional to the amount of data you have.**

一个线性模型中，能学出来的feature数量与数据量大小基本是成比例的。

1. 1000个样本，大概能支撑十几个feature
2. 如果有100万样本，大概能支撑几百至几千feature
3. 如果有10亿甚至更多，大概能支撑千万feature

**Rule #22: Clean up features you are no longer using.**

系统中无用的feature将会成为技术债。

在考虑保留或添加哪些feature时，注意该feature的覆盖率。覆盖率太低的feature，效果有限。但是也有例外，如果一个feature只有1%的覆盖率，但是90%含有该feature的样本都是正例，那这个feature就很好。

### Human Analysis of the System

**Rule #23: You are not a typical end user.**

**Rule #24: Measure the delta between models.**

**Rule #25: When choosing models, utilitarian performance trumps preditive power.**

有时候，你的模型尝试预测的目标，和你的系统真正要优化的目标并不一致。例如你希望更好的对广告进行排序，而模型实际预测的是点击率。当目标不一致的时候，可能使得模型优化的收效甚微。如果这种情况出现，就要重新考虑模型的优化目标了。

**Rule #26: Look for patterns in the measured errors, and create new features.**

**Rule #27: Try to quantify observed undesirable behavior.**

measure first, optimize second

**Rule #28: Be aware that identical short-term behavior does not imply identical long-term behavior.**

### Training-Serving Skew

离线训练和在线服务所表现出来的效果有时会有偏差，可能是由于：

- 离线训练和在线服务处理数据的pipeline不一致
- 训练和服务是的数据发生了改变
- 模型和算法形成了反馈循环

我们在Google观察到这种偏差对效果造成的负面影响。最好的办法是明确的监控它，从而使得系统和数据的变化不会引起相关问题。

**Rule #29: The best way to make sure that you train like you serve is to save the set of features used at serving time, and then pipe those features to a log to use them at training time.**

确保训练和服务时所用的数据一致，最好的办法就是在服务时将feature写到log中，然后在训练时使用它们。如果你无法对所有example打log，也可以只记录一小部分，这样就能在训练时验证一致性。

**Rule #30: Importance weight sampled data, don't arbitrarily drop it!**

**Rule #31: Beware that if you join data from a table at training and serving time, the data in the table may change.**

**Rule #32: Re-use code between your training pipeline and your serving pipeline whenever possible.**

**Rule #33: If you produce a model based on the data until January 5th, test the model on the data from January 6th and later.**

**Rule #34: In binary classification for filtering (such as spam detection or determining interesting e-mails), make small short-term sacrifices in performace for very clean data.**

牺牲短期的性能，以换取干净的数据。

**Rule #35: Beware of the inherent skew in ranking problems.**

当更换模型时，也会影响到将来的数据，也就是你的算法将要用于训练的数据。

**Rule #36: Avoid feedback loops with positional features.**

用positional feature来分离出positional bias。

并且不要将positional feature与其他feature做cross，因为positional feature只在训练时出现，serving时将会被统一设置为某个缺省值。另外，在计算最终score时，可以设计成positional相关的score与其他score加和得到最终score。

**Rule #37: Measure Training/Serving Skew.**

training/serving skew可以分成几部分：

1. training data和holdout data上的performance差异，这是无法避免的，但不总是坏事
2. holdout data和"next-day" data之间的performance差异，这也是无法避免的。你应当调整regularization，以最大化"next-day" performance
3. "next-day" data和live data之间的差异。如果是一个一模一样的example，training和serving应该给出相同的结果。如果存在不一致，表明可能有工程实现上的错误。

## ML Phase III: Slowed Growth, Optimization Refinement, and Complex Models

随着工作的进行，会逐渐有些迹象表明第二阶段进入尾声。比如，你会发现每个月得到的改进逐渐减小；你会不得不在不同的指标之间做取舍：有些指标上升，有些指标下降。此时事情开始变得有趣和复杂。

**Rule #38: Don't waste time on new features if unaligned objectives have become the issue.**

**Rule #39: Launch decisions are a proxy for long-term product goals.**

**Rule #40: Keep ensembles simple.**

**Rule #41: When performance plateaus, look for qualitatively new sources of information to add rather than refining existing singnals.**

**Rule #42: Don't expect diversity, personalization, or relevance to be as correlated with popularity as you think they are.**

**Rule #43: Your friends tend to be the same across different products. Your interests tent not to be.**



















