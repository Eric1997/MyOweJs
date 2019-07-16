/**
 * nodejs 爬取 豆瓣top250的电影
 */

const cheerio=require('cheerio');
const http=require('http');
const iconv=require('iconv-lite');
const https = require('https');
var  titles=[];
var index=0;
var count=0;
var url='';
function getMovies(url,i){
	count=25*i;
	url=`https://movie.douban.com/top250?start=${count}&filter=`;
	console.log(count);
	console.log(`我正在爬取第${i+1}页的数据`);
	console.log(url);
	https.get(url,function(res){
	var chunks=[];
	res.on('data',function(chunk){
		chunks.push(chunk);
	});
	res.on('end',function(){
		let html=Buffer.concat(chunks);
		var $=cheerio.load(html,{decodeEntities:false});
		$('.grid_view .info .title:nth-of-type(1)').each((index,element)=>{
			$element=$(element);
			titles.push($element.text());
		})
	})
	if(i<5){
		getMovies(url,++index);
	}else{
		console.log(titles);
		console.log('获取完毕');
	}
})
}
getMovies(url,index);