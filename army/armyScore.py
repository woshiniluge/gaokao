# -*- coding:UTF-8 -*-
from selenium import webdriver
import pytesseract
from PIL import Image, ImageEnhance
import numpy as np
import time
import re

driver = webdriver.Chrome()
driver.get("http://211.166.76.62/2019cjfb/register/cjcx.jsp")

driver.find_element_by_id("number").send_keys("201922003584")
driver.find_element_by_id("name").send_keys("李春杰")




def shibie():
    driver.find_element_by_xpath(
        '//*[@id="PrintInfoForm"]/table[1]/tbody/tr/td/table[5]/tbody/tr/td/table[2]/tbody/tr/td[3]/table[2]/tbody/tr[2]/td/table/tbody/tr/td/table/tbody/tr[4]/td[3]/div/img').screenshot(
        'yzm.png')
    loginImg = Image.open('yzm.png').convert('RGB')
    loginImg = loginImg.convert("L")  # convert()方法传入参数L，将图片转化为灰度图像
    loginImg = np.asarray(loginImg)
    loginImg = (loginImg > 100) * 255
    loginImg = Image.fromarray(loginImg).convert('RGB')
    sharpness = ImageEnhance.Contrast(loginImg)
    loginImg = sharpness.enhance(3.0)
    loginImg = loginImg.resize((300, 100))

    loginImg = loginImg.convert('L')  # 图像加强，二值化
    loginImg = ImageEnhance.Contrast(loginImg)  # 对比度增强
    loginImg = loginImg.enhance(2.0)

    text = pytesseract.image_to_string(loginImg)
    text = re.sub("\W", "", text)
    print("得到的字符串为" + text)
    return text


text = shibie()
str=text.replace(" ","")
i = 0
while(len(str)<4 and i<3):
    print("识别出的数字不到4位,重新识别")

    str = shibie()
    i = i+1

num=(str)
# num = int(text.split('+?=')[1]) - int(text.split('+?=')[0])
print("得到的数字为"+num)

driver.find_element_by_id("yznumber").send_keys(num)
driver.find_element_by_xpath("//*[@id='PrintInfoForm']/table[1]/tbody/tr/td/table[5]/tbody/tr/td/table[2]/tbody/tr/td[3]/table[2]/tbody/tr[2]/td/table/tbody/tr/td/table/tbody/tr[5]/td[2]/img").click();


time.sleep(3)
title = driver.find_element_by_xpath("/html/body/div/table[2]/tbody/tr/td/table/tbody/tr[2]/td/div/span")
if (title == u"2019年全军面向社会公开招考文职人员统一考试成绩"):
    print("结果和预期结果匹配！")
else:
    print("跳转失败")
# GET /2019cjfb/printInfo.do?activity=cjddy&number=64F52120F00E5DDA19DED5BFFBAB8376623D6F3A42CA593D&name=BCFFDB5E7BE9D633&yznumber=9569EC5E356A8FF5 HTTP/1.1
# Host: 211.166.76.62
# 201922003584
# 李春杰
#
#
# """
# 用selenium截图，先截整个页面，然后定位验证码图片，截取出来验证码图片
# """
# # yamImg = driver.save_screenshot('yz.png')
# # codeEelement = driver.find_element_by_xpath('//*[@id="PrintInfoForm"]/table[1]/tbody/tr/td/table[5]/tbody/tr/td/table[2]/tbody/tr/td[3]/table[2]/tbody/tr[2]/td/table/tbody/tr/td/table/tbody/tr[4]/td[3]/div/img').screenshot('yzm.png')
# # print('验证码图片',codeEelement,type(codeEelement))
# # imgSize = codeEelement.size  # 获取验证码图片的大小
# # print('图片大小',imgSize,type(imgSize))
# # imgLocation = codeEelement.location  # 获取验证码元素坐标
# # print('图片位置',imgLocation,type(imgLocation))
# # rangle = (int(imgLocation['x']), int(imgLocation['y']), int(imgLocation['x'] + imgSize['width']),int(imgLocation['y'] + imgSize['height']))  # 计算验证码整体坐标
# # print(rangle)
# # print("开始转化图片")
# driver.find_element_by_xpath('//*[@id="PrintInfoForm"]/table[1]/tbody/tr/td/table[5]/tbody/tr/td/table[2]/tbody/tr/td[3]/table[2]/tbody/tr[2]/td/table/tbody/tr/td/table/tbody/tr[4]/td[3]/div/img').screenshot('yzm.png')
#
# loginImg = Image.open('yzm.png').convert('RGB')
# """
# 截取下来验证码图片，并且进行灰度转化，二值化处理
# """
# print("开始截取图片")
# # loginImg = login
# # loginImg = login.crop(rangle)  # 截取验证码图片
# #loginImg.show()
#
# print("1111")
# loginImg = loginImg.convert("L")#convert()方法传入参数L，将图片转化为灰度图像
# #loginImg.show()
# print("2222")
# loginImg = np.asarray(loginImg)
# loginImg = (loginImg > 100) * 255
# loginImg = Image.fromarray(loginImg).convert('RGB')
# sharpness = ImageEnhance.Contrast(loginImg)
# loginImg = sharpness.enhance(3.0)
# loginImg = loginImg.resize((300, 100))
# #loginImg.show()
# print("3333")
# """
# 将图片转化为文本字符串，切割之后，转化为数字进行计算
# .strip().replace(' ', '')
# """
# text = pytesseract.image_to_string(loginImg)
# print("得到的字符串为"+text)
#
# str=text.replace(" ","")
# if(len(str)<4):
#     print("识别出的数字不到4位,重新识别")
#     shibie()
#
# num=int(str)
# #num = int(text.split('+?=')[1]) - int(text.split('+?=')[0])
# print("得到的数字为"+num)
#
# driver.find_element_by_id("yznumber").send_keys(num)
# driver.find_element_by_xpath("//*[@id='PrintInfoForm']/table[1]/tbody/tr/td/table[5]/tbody/tr/td/table[2]/tbody/tr/td[3]/table[2]/tbody/tr[2]/td/table/tbody/tr/td/table/tbody/tr[5]/td[2]/img").click();
