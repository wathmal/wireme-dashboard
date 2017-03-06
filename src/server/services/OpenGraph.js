/**
 * Created by wathmal on 3/6/17.
 */

let og= {};
class OpenGraph{

    constructor(title, image, description){
        og.title= title;
        og.image= image;
        og.description= description;
    }

    generateMeta(){

        let html ="";

        for (var key in og) {
            if (og.hasOwnProperty(key)) {
                //console.log(key + " -> " + p[key]);
                //    <meta property="og:title" content="wireme iot platform" />
                html += `<meta property="og:${key}" content="${og[key]}"> \n\t`;
            }
        }

        return html;
    }

    setKeywords(keywords){
        
    }
}

export default OpenGraph;