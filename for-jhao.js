function stopEvenBub(id){
    document.getElementById(id).click(event=>{event.stopPropagation()})
}
function stopTest(e){
    console.log(e)
}
