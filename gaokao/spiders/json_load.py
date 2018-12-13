import json

jsonStr = '{"name":"aspiring", "age": 17, "hobby": ["money","power", "read"],"parames":{"a":1,"b":2}}'

# 将json格式的字符串转为python数据类型的对象
print(type(jsonStr))
jsonData = json.loads(jsonStr)
print(jsonData)
print(type(jsonData))
print(jsonData['hobby'])

# # 加载json文件
# path1 = r'E:\***\ddd.json'
#
# with open(path1, 'rb') as f:
#     data = json.load(f)
#     print(data)
#     # 字典类型
#     print(type(data))
