# Grid布局

一种基于单元格划分的二维布局方式；

与flex布局相同，grid布局只对容器container和项目item生效，项目只包含container的**顶层子元素**；

## 容器属性（container）

**display**：指定容器布局

- grid;
- inline-grid;



### 划分

**grid-template-columns**

**grid-template-rows**

- 可使用绝对数值或百分比；
- 关键字**fr** (fraction)：按比例划分 1fr 2fr;
- 关键字**auto**：浏览器决定
- 函数minmax(min，max)：参数可以为数值或fr
- 函数repeat(a，b)：
  - a:重复的次数；或关键字auto-fill（自动填充满）
  - b:需要重复的值；

```css
.container {
grid-template-columns: 1fr 1fr minmax(100px, 1fr);
grid-template-columns: 100px auto 100px;
grid-template-columns: repeat(auto-fill, 100px);
```

**grid-template-areas**：划分区域

- 同样命名的区域会合并为一个区域；
- 不需要使用的区域使用点 ‘.‘ 占位；
- 区域命名的同时会自动命名起始网格线 “区域名-start","区域名-end"

```css
.container {
  display: grid;
  grid-template-columns: 100px 100px 100px;
  grid-template-rows: 100px 100px 100px;
  grid-template-areas: 'a b c'
                       'd . f'
                       'g g g';
}
```



### 布局位置

指定**整个接受划分的区域**在父容器container里的位置

（按划分方式，container不一定被完全占用）：

**justify-content**：水平方向，左中右

**align-content**：垂直方向，上中下

**place-content**：合写，align justify

- start
- center
- end
- stretch：拉伸，占满整个单元格（区域），默认值



指定**每个item**，在**每个划分出来的单元格**里的位置

**justify-items **

**align-items**

**place-items**

属性值同上



### 其他

指定行列间距

**row-gap**：行距

**column-gap**：列距

**gap**：合写，行列间距



指定item放置顺序

**grid-auto-flow**

- row：先行后列（默认）；
- column：先列后行；



## 项目属性（item）

### 指定item放置位置：

**grid-column-start；  grid-column-end； grid-row-start ；grid-row-end**

合写：

**grid-column**；

**grid-row**；

star-line / end-line

- 数子；第一条线为1，最后一条线为（column数+1）
- 线名
- span（跨越网格数）



指定区域

**grid-area**;



指定当前**单个item**，在当前单元格布局位置

**justify-self **

**align-self**

**place-self **

