# -*- coding: utf-8 -*-
import json
from gaokao.items import schoolScoreItem
import scrapy



class HotrankSpider(scrapy.Spider):
    name = "score2"
    headers = {
        'Referer': 'https://gkcx.eol.cn/soudaxue/queryschool.html',
        'Content-Type': 'application/json',
    }

    def start_requests(self):

        start_urls = ['https://data-gkcx.eol.cn/soudaxue/queryProvinceScore.html?messtype=json&page=1&size=10']

        yield scrapy.Request(url=start_urls[0], callback=self.parse, headers=self.headers)

    def parse(self, response):
        # 解析数据
        items = json.loads(response.body_as_unicode())

        schoolitem = schoolScoreItem()
        school_list = items['school']
        for school in school_list:
            schoolitem['schoolid'] = school['schoolid']
            schoolitem['schoolname'] = school['schoolname']
            schoolitem['localprovince'] = school['localprovince']
            schoolitem['province'] = school['province']
            schoolitem['studenttype'] = school['studenttype']
            schoolitem['year'] = school['schoolproperty']
            schoolitem['batch'] = school['batch']
            schoolitem['var'] = school['var']
            schoolitem['max'] = school['max']
            schoolitem['min'] = school['min']
            schoolitem['fencha'] = school['fencha']
            schoolitem['provincescore'] = school['provincescore']
            schoolitem['url'] = school['url']
            yield schoolitem

        # 请求下一页的链接
        url = response.url
        str = response.url.split("&")
        page = int(str[1].split("=")[1])

        if page <= 13436:
            #nextpage = page + 1
            nextpage = "&page=%d&" % (page+1)
            newurl = str[0]+nextpage + str[2]
            yield scrapy.Request(url=newurl, callback=self.parse, headers=self.headers)



