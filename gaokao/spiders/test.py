a=int("2843")
b=30
c=a//b+1
url="https://data-gkcx.eol.cn/soudaxue/queryschool.html?messtype=json&page=1&size=30"
for i in range(c):
    page = i + 2
    str = url.split("&")
    page = int(str[1].split("=")[1])
    print(page)
    res = "page=%d" % page
    newurl=str[0]+"&"+res+"&"+str[2]
    print(newurl)