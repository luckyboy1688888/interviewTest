async function getPage(url) {
    var response = await fetch(url);
    var data = await response.text();
    // return response.url; // debug use
    return data;
}

async function getYoutubeData(youtubeIds) {
    var promises = [];
    /*說明:
    var >> let var:函數作用域  let:區塊作用域
    使用var會使 i 超出範圍youtubeIds[i]變成undefined
    */
    for (let i = 0; i < youtubeIds.length; i++) {  //修正var >> let 
    // for (var i = 0; i < youtubeIds.length; i++) {
        var promise = new Promise(async (resolve, reject) => {
            try {
                console.log('i>>', i, youtubeIds[i]); // debug use
                var channelURL = `https://www.youtube.com/${youtubeIds[i]}`;
                var channelPage = await getPage(channelURL);

                console.log('i>>', i, youtubeIds[i]); // debug use
                var videosURL = `https://www.youtube.com/${youtubeIds[i]}/videos`;
                var videosPage = await getPage(videosURL);

                resolve({ channelPage, videosPage });
            } catch (e) {
                reject(e);
            }
        });
        promises.push(promise);
    }
    var results = await Promise.all(promises);
    return results;
}

var youtubeIds = ['@darbbq', '@oojimateru', '@homemeat_clip'];
getYoutubeData(youtubeIds);