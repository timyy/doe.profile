doe.profile
===============
This is a pipeline profile framework, base on D3, id-edit.

基于d3,id-edit的纵断图javascript 编辑器。


*   [Overview](#overview)
    *   [Philosophy](#philosophy)
    *   [Inline HTML](#html)
    *   [Automatic Escaping for Special Characters](#autoescape)
*   [Block Elements](#block)
    *   [Paragraphs and Line Breaks](#p)
    *   [Headers](#header)
    *   [Blockquotes](#blockquote)
    *   [Lists](#list)
    *   [Code Blocks](#precode)
    *   [Horizontal Rules](#hr)
*   [Span Elements](#span)
    *   [Links](#link)
    *   [Emphasis](#em)
    *   [Code](#code)
    *   [Images](#img)
*   [Miscellaneous](#misc)
    *   [Backslash Escapes](#backslash)
    *   [Automatic Links](#autolink)


**Note:** This document is itself written using Markdown; you
can [see the source for it by adding '.text' to the URL][src].

  [src]: /projects/markdown/syntax.text

* * *

<h2 id="overview">概述</h2>

基于d3,id-edit的纵断图javascript 编辑器。尝试采用TDD编程。


* * *

<h2 id="history">History</h2>
##0.3
    想实现presets，发现不认识_，一查才知道用了一个叫Underscore库，包含在js-yaml中。
    说人话;加入js-yaml.package.json.
    2014-07-31
    其实不对，用的是    <script src='../js/lib/lodash.js'></script>库，解决了“_”
##0.2
    2014-07-27
    测试git，不错，搞定了。
##0.1
    2014-07-27
    第一个版本。采用tdd，用mocha，chai测试框架，试验成功。
    
 