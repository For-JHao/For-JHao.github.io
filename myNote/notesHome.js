{
    //导航栏目录的展开关闭
    (function myNavClickEvent() {
        let myNav = document.getElementsByTagName('myNav');
        for (let el of myNav) {
            if (el.children.length > 1) {
                el.addEventListener('click', () => {
                    el.children[1].className = el.children[1].className === 'innerUlShow' ? 'innerUl' : 'innerUlShow'
                });
                el.children[1].addEventListener('click', function (e) {
                    e.stopPropagation()
                })
            }
        }
    })();

}
