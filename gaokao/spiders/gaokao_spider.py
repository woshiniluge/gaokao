import random

import scrapy
class gaokao(scrapy.Spider):
    name = "gaokao"
    def start_requests(self):
        headers = {
            'Referer': 'https://gkcx.eol.cn/soudaxue/queryschool.html?&page=1',
        }
        urls=[
            'https://data-gkcx.eol.cn/soudaxue/queryschool.html?messtype=jsonp&callback=jQuery183015554331275063404_1543499181341&province=&schooltype=&page=1&size=30&keyWord1=&schoolprop=&schoolflag=&schoolsort=&schoolid=&_=1543499182148'
        ]
        for url in urls:
            yield scrapy.Request(url=url,callback=self.parse,headers=headers)
    def parse(self, response):
        # file = response.url.split("/")[-1]
        
        file="school3"
        with open(file,"wb") as f:
            f.write(response.body)
        self.log("保存文件")