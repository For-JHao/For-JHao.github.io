# index.html
## 伪元素+背景虚化下的额外空白
在使用伪元素body::before设置背景，以便进行背景模糊的情况下，如果页面内容超出body的范围，拉动滚动条下滑，多出body的背景会出现空白。
临时解决方案：
直接在body上设置背景则不会出现这种情况，但这样则无法进行背景模糊，因为会将子元素一起模糊掉。
折中方案：在body设置好背景，通过伪元素继承背景进行模糊，由body覆盖多余空白部分（但该部分仍是清晰的）。

body背景的覆盖
body的背景设置不受body高度的影响，会覆盖整个浏览器渲染区域。

## 未解决问题
### 实现背景固定在视口淡入
背景固定在视口需要在body上设置background-attachment：fixed；
淡入通过opacity；
body使用opacity，会导致全局淡入；
伪元素淡入，则无法固定背景；
如果采用上述折中方案，等于没淡化；

### header目录：Dom添加背景色下透明度的错误
通过dom操作div style切换样式，给div添加background-color，给同样的参数，包括颜色及透明度。Dom响应用户点击事件给元素style添加background-color，展示的透明度效果，和页面其他部分（相同参数）初次渲染的透明度不同。
同时，因为是通过dom style设置的行内样式，优先级更高，会导致css 的hover失效；
解决方案：
1.	通过操作增删同一个class修改样式，不会有相同参数渲染不同的情况，但hover的效果会覆盖class；
2.	使用style，每次切换样式时把多余的行内样式清空，且行内样式优先级比hover高（不会被hover覆盖）。如，使background-color=null，使其继承父级css而不是手动设置相同颜色;
