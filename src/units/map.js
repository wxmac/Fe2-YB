const map = (ak) => {
        return new Promise(function(resolve, reject) {
        var script = document.createElement('script')
        script.type = 'text/javascript'
        script.dataset.name = 'map'
        script.src = `https://api.map.baidu.com/api?v=3.0&ak=${ak}&callback=init` //callback调用init函数。
        document.head.appendChild(script)
        window.init = () => {
            resolve(BMap)
        }
        })
}
export default map(ak)