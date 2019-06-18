import pymysql.cursors


class SchoolPipeline(object):
    def __init__(self):
        #连接数据库
        self.connect = pymysql.connect(
            host='localhost',
            port=3306,
            db='gaokao',
            user='root',
            passwd='123456',
            charset='utf8',
            use_unicode=True
        )
        self.cursor = self.connect.cursor()

    def process_item(self, item, spider):
        self.cursor.execute(
            """insert into school_score(schoolid, schoolname, localprovince, province ,studenttype ,year, batch, var, 
            max, min, fencha, provincescore, url)
            value (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)""",
            (item['schoolid'], item['schoolname'], item['localprovince'], item['province'], item['schooltype'],
             item['year'], item['batch'], item['var'], item['max'],
             item['min'], item['fencha'], item['provincescore'], item['url'])
        )
        self.connect.commit()
        return item

    def close_spider(self, spider):
        self.cursor.close()
        self.connect.close()
