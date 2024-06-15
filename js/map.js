const storeList = document.getElementById('store-list');

function init(geoList) {
    for (let i = 0; i < geoList.length; i++) {
        const dom = document.getElementById('map' + i);
        const center = new qq.maps.LatLng(geoList[i].geo[0], geoList[i].geo[1]);
        const map = new qq.maps.Map(dom, {
            center,
            zoom: 18,
            draggable: true,
            scrollwheel: true,
        });

        const marker = new qq.maps.Marker({
            position: center,
            map,
            title: geoList[i].name,
            animation: qq.maps.MarkerAnimation.BOUNCE,
            clickable: true,
        })
    }
}

fetch('./data/geo.json').then(res => res.json()).then(data => {
    const geoList = data;
    storeList.innerHTML = geoList.map((item, index) => {
        return `<div class="store">
        <div class="image">
            <div id="map${index}"></div>
        </div>
        <div class="text">
            <h4>${item.name}</h4>
            <p>地址：${item.address}</p>
            <p>电话：<a href="tel:${item.phone}">${item.phone}</a></p>
            <p>营业时间：${item.time}</p>
        </div>
    </div>`
    }).join('')
    init(geoList)
})
