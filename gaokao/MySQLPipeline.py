import pymysql.cursors


class MysqlPipeline(object):
    def __init__(self):
        #连接数据库
        self.connect = pymysql.connect(
            host='58.119.112.10',
            port=11030,
            db='gaokao',
            user='root',
            passwd='zkrtFCZ812',
            charset='utf8',
            use_unicode=True
        )
        self.cursor = self.connect.cursor()

    def process_item(self, item, spider):
        self.cursor.execute(
            """insert into hotrank(schoolid, schoolname, clicks, province ,schooltype ,schoolproperty, f985, f211, 
            schoolnature, shoufei, jianjie, schoolcode, ranking, rankingCollegetype, guanwang, other)
            value (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)""",
            (item['schoolid'], item['schoolname'], item['clicks'], item['province'], item['schooltype'],
             item['schoolproperty'], item['f985'], item['f211'], item['schoolnature'],
             item['shoufei'], item['jianjie'], item['schoolcode'], item['ranking'], item['rankingCollegetype'],
             item['guanwang'], item['other'])
        )
        self.connect.commit()
        return item

    def close_spider(self, spider):
        self.cursor.close()
        self.connect.close()
