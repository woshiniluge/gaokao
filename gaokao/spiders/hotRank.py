# -*- coding: utf-8 -*-
import json
from gaokao.items import hotRankItem
import scrapy
from selenium import webdriver



class HotrankSpider(scrapy.Spider):
    name = "hotRank"

    headers = {
        'Referer': 'https://gkcx.eol.cn/soudaxue/queryschool.html',
        'Content-Type': 'application/json',
    }

    def start_requests(self):

        start_urls = ['https://data-gkcx.eol.cn/soudaxue/queryschool.html?messtype=json&page=1&size=2843']

        yield scrapy.Request(url=start_urls[0], callback=self.parse, headers=self.headers)

    def parse(self, response):
        # 解析数据
        items = json.loads(response.body_as_unicode())

        hotrankitem = hotRankItem()
        school_list = items['school']
        for school in school_list:
            hotrankitem['schoolid'] = school['schoolid']
            hotrankitem['schoolname'] = school['schoolname']
            hotrankitem['clicks'] = school['clicks']
            hotrankitem['province'] = school['province']
            hotrankitem['schooltype'] = school['schooltype']
            hotrankitem['schoolproperty'] = school['schoolproperty']
            hotrankitem['f985'] = school['f985']
            hotrankitem['f211'] = school['f211']
            hotrankitem['schoolnature'] = school['schoolnature']
            hotrankitem['shoufei'] = school['shoufei']
            hotrankitem['jianjie'] = school['jianjie']
            hotrankitem['schoolcode'] = school['schoolcode']
            hotrankitem['ranking'] = school['ranking']
            hotrankitem['rankingCollegetype'] = school['rankingCollegetype']
            hotrankitem['guanwang'] = school['guanwang']
            hotrankitem['other'] = school['firstrate']

            yield hotrankitem

        # 请求下一页的链接
        url = response.url
        print(url)
        str = response.url.split("&")
        page = int(str[1].split("=")[1])

        if page <= 95:
            #nextpage = page + 1
            nextpage = "&page=%d&" % (page+1)
            newurl = str[0]+nextpage + str[2]
            yield scrapy.Request(url=newurl, callback=self.parse, headers=self.headers)

        # rank_url = self.generate_request(response)
        #
        # yield scrapy.Request(url=rank_url, callback=self.parse_rank, dont_filter=True)
        #
        # beijing = response.xpath('//*[@id="seachtab"]/tbody/tr[50]/td[1]/a').extract()
        # print("!!!!!!!!!!!!!!!!!")
        # print(beijing)
        # print("#################")
        # pass

    # def parse_rank(self, response):
    #     para_dict = OrderedDict()
    #     para_dict['messtype'] = 'jsonp'
    #     para_dict['callback'] = 'jQuery18309260168495344718_1544596860026'
    #     para_dict['province'] = ''
    #     para_dict['schooltype='] = ''
    #     para_dict['page'] = '1'
    #     para_dict['size'] = '30'
    #     para_dict['keyWord1'] = ''
    #     para_dict['schoolprop'] = ''
    #     para_dict['schoolflag'] = ''
    #     para_dict['schoolsort'] = ''
    #     para_dict['schoolid'] = ''
    #     para_dict['_'] = '1544596861875'
    #
    #     para_query = urllib.quote(urllib.u)






