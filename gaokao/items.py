# -*- coding: utf-8 -*-

# Define here the models for your scraped items
#
# See documentation in:
# https://doc.scrapy.org/en/latest/topics/items.html

import scrapy


class hotRankItem(scrapy.Item):
    # define the fields for your item here like:
    # name = scrapy.Field()
    schoolid = scrapy.Field()
    schoolname = scrapy.Field()
    clicks = scrapy.Field()
    province = scrapy.Field()
    schooltype = scrapy.Field()
    schoolproperty = scrapy.Field()
    f985 = scrapy.Field()
    f211 = scrapy.Field()
    schoolnature = scrapy.Field()
    shoufei = scrapy.Field()
    jianjie = scrapy.Field()
    schoolcode = scrapy.Field()
    ranking = scrapy.Field()
    rankingCollegetype = scrapy.Field()
    guanwang = scrapy.Field()
    other = scrapy.Field()
    pass
