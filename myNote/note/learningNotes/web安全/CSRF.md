# CSRF（Cross-Site Request Forgery）

跨站请求伪造；

通过一些手段，获取浏览器存储的用户身份标识等信息，从而能够伪装用户发起服务器请求；

比如，用户同时访问了目标网站a和攻击者的陷阱网站b，b通过js在用户电脑操作上发起对a的http请求，由于用户已经登录了a（假设身份验证信息已经存储在了a域名下的cookie里），对a的请求全都会带上，a的服务器会以为是用户发起的请求而执行操作。以此，攻击者就冒充用户发起了一次对a的请求。

同源策略无法防止csrf，因为同源策略是浏览器拦截响应数据，而不会限制发起请求；所以即使a,b跨域，但csrf对服务器的攻击仍然有效；



**防范**:

1. 服务器验证请求头Referer，判断发起请求的**来源地址**是否可信；

> 这种方式并不可靠；攻击者可以直接修改请求包的Referer，同时也不能阻挡同域的攻击；

2. 使用cookie 新属性SameSite，可限制跨站的请求带上cookie；

> 能有效抵御CSRF，但不支持子域，子域需要用户重新登录

3. 将身份标识（Token）绑定到页面所有自身的get和post请求上，让后续所有请求，包括标签链接地址、表单请求都带上该token进行验证；这样攻击者虽然可以伪造请求，但没办法伪造token值。

4. 使用web storage取代cookie存储用户信息

> 方法3，4都基于浏览器对js的同源保护，不能被XSS攻击！



> 参考
> 
> OWASP https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html
> 
> 美团技术团队 https://tech.meituan.com/2018/10/11/fe-security-csrf.html
> 
> MDN SameSite https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Set-Cookie/SameSite
