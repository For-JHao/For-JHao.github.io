//导航栏事件
{
    //目录开合
    (function myNavClickEvent() {
        let myNav = document.getElementsByTagName('myNav');
        let lastOpenNavDom = null
        for (let el of myNav) {
            if (el.children.length > 1) {
                el.addEventListener('click', () => {
                    el.children[1].style.display = el.children[1].style.display === 'block' ? 'none' : 'block'
                    changeArrowDir(el.children[0])
                    if (lastOpenNavDom &&
                        lastOpenNavDom !== el &&
                        lastOpenNavDom.children[1].style.display === 'block') {
                        changeArrowDir(lastOpenNavDom.children[0])
                        lastOpenNavDom.children[1].style.display = 'none'
                    }
                    lastOpenNavDom = el
                });
                el.children[1].addEventListener('click', function (e) {
                    e.stopPropagation()
                })
            }
        }
    })();

    //箭头转向
    function changeArrowDir(parentDom) {
        let childDom = parentDom.children
        for (let i = 0; i < childDom.length; i++) {
            if (childDom[i].className === 'arrowDown') {
                childDom[i].className = 'arrowUp'
            } else if (childDom[i].className === 'arrowUp') {
                childDom[i].className = 'arrowDown'
            }
        }
    }
}
