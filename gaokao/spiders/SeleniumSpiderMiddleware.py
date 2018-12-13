from scrapy import signals
from selenium import webdriver
from scrapy.http.response.html import HtmlResponse
from scrapy.http.response import Response


class SeleniumSpiderMiddleware(object):
    # 调用浏览器然后再执行JS代码
    def __init__(self):
        self.driver = webdriver.PhantomJS()

    def process_request(self, request, spider):
        # 当引擎从调度器中取出request进行请求 发送给下载器之前
        # 会先执行当前爬虫的中间件，在中间件中使用selenium
        # 请求这个request，拿到动态网站的数据
        # 然后将请求返回给spider爬虫对象
        if spider.name == 'tb':
            # 使用爬虫文件的url地址
            spider.driver.get(request.url)
            for x in range(1, 12, 2):
                i = float(x) / 11
                js = 'document.body.scrollTop=document.body.scrollHeight * %f' % i
                spider.driver.execute_script(js)
            # 设置响应信息 响应的url为请求的url 响应的网页内容为请求网页的源码，响应的编码为utf-8
            # 请求的信息为获取的请求信息
            response = HtmlResponse(url=request.url, body=spider.driver.page_source,
                                    encoding='utf-8', request=request)
            # 这个地方只能返回response对象
            # 如果返回了response对象，那么可以直接跳过下载中间件
            # 将response的值 传递给引擎，引擎又传递给 spider进行分析
            return response
