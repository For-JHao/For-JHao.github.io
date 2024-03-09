# vscode 插件

## webpack alias别名路径跳转

path-alias: 支持路径别名补全，路径跳转

install，在setting.json中添加字段 pathAlias.aliasMap：

```js
    "pathAlias.aliasMap": {
        "@src": "${cwd}/src",//example
    },
```

note. 设置setting.json后需重启vscode
