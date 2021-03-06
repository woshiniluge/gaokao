import json

import pymysql
import scrapy
import requests
headers = {
    'Referer': 'https://gkcx.eol.cn/soudaxue/queryschool.html',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.87 Safari/537.36'}
def get_urls():
    url = 'https://data-gkcx.eol.cn/soudaxue/querySpecialtyScore.html?messtype=json&page=1&size=10'
    # 请求头部
   # 发送HTTP请求
    req = requests.get(url, headers=headers)
    # 解析网页
    sites = json.loads(req.text)
    # 获取数据条数
    counts= int(sites['totalRecord']['num'])
    urls = []
    # 计算如果每页有30条数据，总共需要爬多少页
    pages=counts//10+1
    for page in range(pages):
        # 将新生成的分页拼装成url后加入到urls中
        urls.append(newurl(url,page+1))
    return urls
#拼装url
def newurl(strs,page):
    str = strs.split("&")
    res = "page=%d" % page
    newurl = str[0] + "&" + res + "&" + str[2]
    return newurl

# 使用scrapy框架爬取
class bookSpider(scrapy.Spider):
    name = 'yibumajor'  # 爬虫名称
    def start_requests(self):
        for url in get_urls():
            yield scrapy.Request(url=url, callback=self.parse, headers=headers)
    def parse(self, response):
        connection = pymysql.connect("localhost", "root", "123456", "dblogin")
        cursor = connection.cursor()
        sites = json.loads(response.body)
        schools = sites['school']
        for school in schools:
            try:
                sql = "insert into `school_major` (`schoolid`,`schoolname`,`specialtyname`,`localprovince`," \
                      "`studenttype`,`year`,`batch`,`var`,`max`,`min`," \
                      "`url`) values " \
                      "('%d','%s','%s','%s','%s'," \
                      "'%d','%s','%s','%s','%s','%s')" \
                      % (
                      int(school['schoolid']), school['schoolname'], school['specialtyname'], school['localprovince'],
                      school['studenttype'], int(school['year']), school['batch'], school['var'],
                      school['max'], school['min'], school['url'])
                cursor.execute(sql)
                connection.commit()
            except pymysql.Error as e:
                file = "error-major.sql"
                with open(file, "a+") as f:
                    f.write(sql+"\n")
                self.log("保存出错文件")
                self.log(e)
        connection.close()
