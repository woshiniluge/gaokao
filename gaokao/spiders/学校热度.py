import json

import pymysql
import scrapy

# 爬取高考学校热度排名
class gaokao(scrapy.Spider):
    name = "gaokaojson"
    def start_requests(self):
        headers = {
            'Referer': 'https://gkcx.eol.cn/soudaxue/queryschool.html',
        }
        urls = [
            'https://data-gkcx.eol.cn/soudaxue/queryschool.html?messtype=json&page=1&size=30'
            # 'https://data-gkcx.eol.cn/soudaxue/queryschool.html?messtype=jsonp&callback=jQuery183015554331275063404_1543499181341&province=&schooltype=&page=1&size=30&keyWord1=&schoolprop=&schoolflag=&schoolsort=&schoolid=&_=1543499182148'
        ]
        for url in urls:
            yield scrapy.Request(url=url, callback=self.parse, headers=headers)

    def parse(self, response):
        headers = {
            'Referer': 'https://gkcx.eol.cn/soudaxue/queryschool.html',
        }
        str = response.url.split("&")
        page = int(str[1].split("=")[1])
        sites=json.loads(response.body)
        connection = pymysql.connect("localhost", "root", "123456", "dblogin")
        cursor = connection.cursor()
        schools=sites['school']
        for school in schools:
            sql = "insert into `school_ranking` (`schoolid`,`schoolname`,`clicks`,`monthclicks`," \
                  "`weekclicks`,`province`,`schooltype`,`schoolproperty`,`f985`,`f211`" \
                  ",`level`,`schoolnature`,`shoufei`,`jianjie`,`schoolcode`,`ranking`,`rankingCollegetype`,`guanwang`) values " \
                  "('%d','%s','%d','%d','%d'," \
                  "'%s','%s','%s','%d','%d','%s','%s','%s','%s','%s','%d','%d','%s')"\
                  % (int(school['schoolid']), school['schoolname'], int(school['clicks']), int(school['monthclicks']), int(school['weekclicks']),
                     school['province'],school['schooltype'], school['schoolproperty'], int(school['f985']), int(school['f211']),
                     school['level'], school['schoolnature'], school['shoufei'], school['jianjie'], school['schoolcode'],
                     int(school['ranking']), int(school['rankingCollegetype']),school['guanwang'])
            cursor.execute(sql)
            connection.commit()
        # self.log("插入成功")
        connection.close()
        a=int(sites['totalRecord']['num'])
        if(page==1):
            b = 30
            c = a // b + 1
            for i in range(c):
                page = i + 2
                res = "page=%d" % page
                newurl = str[0] + "&" + res + "&" + str[2]
                yield scrapy.Request(url=newurl, callback=self.parse, headers=headers)
        self.log("总共有%s条数据"%a)