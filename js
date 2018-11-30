
//分页数据
    	function SplitPage(totalRecordS,page,size){
        var totalPage = totalRecordS % size == 0 ? totalRecordS / size : Math.ceil(totalRecordS / size);
        var beginPage = (page - 5) > 0 ? (page - 5) : 1;
        var endPage = (page - 0 + 4) < totalPage ? (page - 0 + 4) : totalPage;
        var betweenPage = endPage - beginPage + 1;
        var ul = '<ul><li>首页</li><li>上一页</li>';
        $('.school-num').html(totalRecordS);
        $('.totalpage').html(totalPage);
        if(10>betweenPage){
          if(totalPage>10){
            if((page-0+9)>totalPage) {
              beginPage = endPage-9;
              }
            if((page-9)<1){
              endPage=beginPage-0+9;
              }
            } else {
              beginPage=1;
              endPage=totalPage;
               }
        }
        if(beginPage<=0){
          eginPage=1;
        }
        for(var i=beginPage;i<=endPage;i++){
          if(i==page){
                      ul+='<li class="liactive">'+i+'</li>';
                  }else{
                      ul+='<li>'+i+'</li>';
                  }
                }
          ul += '<li>下一页</li><li>末页</li></ul>';
          $('.lin-searchtabl-footer').append(ul);
          sessionStorage.setItem('total',totalPage);

          // 显示已经选中的单选按钮
          var schoolName = $.cookie('schoolName');//localStorage.getItem('schoolName');
          if(schoolName){
            schoolName = schoolName.split(',');
            var schoolNum = $('.lin-sechple-table tbody').find('tr').length;
            for(var m = 0;m < schoolNum;m++){
              var schoolTr = $('.lin-sechple-table tbody').find('tr');
              var schoolA  = schoolTr.eq(m).find('a').html();
              if(schoolA){
                if(schoolA.indexOf('getJsXml') > -1){
                  schoolA  = schoolTr.eq(m).find('font').html();
                }else if(schoolA.indexOf('...') > -1){
                  schoolA  = schoolTr.eq(m).find('a').attr('title');
                }
              }
              for(var n = 0;n < schoolName.length;n++){
                if(schoolA == schoolName[n]){
                  $('.lin-sechple-table tbody').find('tr').eq(m).find('input').prop('checked',true);
                }
              }
            }

          }
   	var height;
        if($('table').length>0){
            height  = $('table').height();
        }
        console.log(height);
        $(window).scroll(function() {
            var l = true;
            scrollSlide(l,height);
        });
 function scrollSlide(l,height) {
  var scrolltop = $(window).scrollTop() + 130 + 'px';
  var scrolltop2 = $(window).scrollTop() + 570 + 'px';
  var scrolla=$(window).scrollTop();
  $('.comparebox').animate({
        'top': scrolltop
  }, 55);
  if($(".lin-searchtabl-ratio").length >0){
    var top = $(".lin-searchtabl-ratio").offset().top;
    var dis = parseInt(top) - parseInt(scrolla) -500;
    var Wwidth = $(document.body).width();
    var parentTop = $('.lin-searchtabl-ratio').parent().position().top;
    var fixTop = parentTop+57;
    var newleft2 = (Wwidth - 1000)/2 + 750;
    var moveTop = scrolla - parentTop + 100;
    var moveBot = height-93+'px';
    moveBot = String(moveBot);
    var parentBot = parentTop+height-93;
    var h = $('.lin-searchtabl-ratio').position().top;
    var radioBot = height - 93;
    if(scrolla>parentTop){
	if(h > radioBot){
		l=false;
		$('.lin-searchtabl-ratio').css('position', 'absolute').css('top',moveBot);

	}else{
		if(moveTop<radioBot){
			$('.lin-searchtabl-ratio').animate({
        	'top': moveTop
    		}, 55);
		}
	}

    }
    if(l && dis<=0)
    {
     // $('.lin-searchtabl-ratio').css('position', 'absolute').css('left', newleft2).css('top',0);
     $('.lin-searchtabl-ratio').css('position', 'absolute').css('top','0');
      l=false;
    }
    if(!l && dis>0)
    {
      $('.lin-searchtabl-ratio').css('position', 'absolute');
      l=true;

    }

  }
 }
    	}
//获取页面url参数
    function hasParameter(name){
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return decodeURI(r[2]);
        return null;
     }
    //替换页面url已有参数
    function replaceParamVal(oldUrl, paramName, replaceWith) {
        var re = eval('/(' + paramName + '=)([^&]*)/gi');
        var nUrl = oldUrl.replace(re, paramName + '=' + replaceWith);
        return nUrl;
     }
     //给已选条件 添加样式
     function AddBlock(txt,that){
     	  var issame=(that.html()==txt);
     	  var isid=that.parent().attr('id');
    		if(txt!=="全部"&&issame){
    			$('.lin-seachbox-condi').removeClass('lin-hide');
    			var chooseval='<em class="'+isid+'-em">'+txt+'<span class="iconfont icon-close lin-seachbox-close"></span></em>';
    			that.addClass('clf-active');
    			that.siblings().removeClass('clf-active');
    			$('.lin-seachbox-choose').append(chooseval);
    		}
     }
     //获取url中参数方法
     function getUrlname(oldurl){
     	var changeurl=oldurl.split('?')[1];
    	var newarr=changeurl.split('&');
     }
     //获取点击值设置url
     function SelectCol(type,that){
    			var txt=that.html();
    			if(type=='schoolprop'){
    				txt=txt+'类';
    			}
    			if(type=='recomschprop'){
    				txt=txt+'类';
    			}
    			 if(txt.indexOf('全部')>-1){//包含全部字样不把参数写入url
    	    		 txt = '';
    	    }
          var ishaveplace=oldurl.indexOf(type);
          if(ishaveplace==-1){
          	if(type.indexOf('&')!=-1){
          		newurl=oldurl+type+'='+txt;
          	}else{
          		newurl=oldurl+'&'+type+'='+txt;
          	}
          }else{
          	newurl=replaceParamVal(oldurl,type,txt);
          }
          window.location.href=newurl;
     }
     //判断是否有page参数
     function IsHavePage(oldurl){
     	var ishavepage=oldurl.indexOf('page');
     	  if(ishavepage!==-1){
      		oldurl=replaceParamVal(oldurl,'page',1);
      	}
     	  return oldurl;
     }
     var oldurl=window.location.href;
     if(oldurl.indexOf("/soudaxue/queryProvince.html")!=-1&&(oldurl.indexOf("province3")!=-1 || oldurl.indexOf("luqutype3")!=-1  || oldurl.indexOf("recomprovince")!=-1 || oldurl.indexOf("argyear")!=-1 || oldurl.indexOf("recomluqutype")!=-1)){
    	 oldurl = oldurl.replace("province3", "province");
    	 oldurl = oldurl.replace("luqutype3", "luqutype");
    	 oldurl = oldurl.replace('recomprovince','schoolprovince');
    	 oldurl = oldurl.replace('argyear','schoolyear');
    	 oldurl = oldurl.replace('recomluqutype','luqutype');
    	 window.location.href=oldurl;
     }
     if(oldurl.indexOf("/soudaxue/queryschoolgufen.html")!=-1&&(oldurl.indexOf("province")!=-1 && oldurl.indexOf("fsxxxS")==-1)){
    	 oldurl = oldurl.replace("province", "fsxxxS");
    	 oldurl = oldurl.replace("type", "examineeType");
    	 window.location.href=oldurl;
     }
     var isfirst=oldurl.indexOf('?');
     var newurl;
     var page=hasParameter('page');
     var size;
     var province=hasParameter('schoolprovince')||hasParameter('recomprovince')||hasParameter('province');
     var schoolprop=hasParameter('schoolprop')||hasParameter('recomschprop');
     var newschoolprop;
     var schooltype=hasParameter('schooltype')||hasParameter('argschtype');
     var schoolflag=hasParameter('schoolflag');
     var keyWord1=hasParameter('keyWord1')||hasParameter('keyWord');
     var schoolpc=hasParameter('schoolpc');
     var schoolyear=hasParameter('schoolyear')||hasParameter('fsyear')||hasParameter('argyear');
     var studentprovince=hasParameter('studentprovince');
     var fstype=hasParameter('fstype');
     var mark=hasParameter('mark');
     var fsxxxS=hasParameter('fsxxxS');
     var examineeType=hasParameter('examineeType');
     var schoolrisk=hasParameter('schoolrisk');
     var argzycengci=hasParameter('argzycengci')||hasParameter('zycengci');
     var argspecialtyname=hasParameter('argspecialtyname')||hasParameter('keyWord1');
     var zytype=hasParameter('zytype');
     var schoolsort=hasParameter('schoolsort');
     var schoolpropty=hasParameter('schoolpropty');
     var zycengci=hasParameter('zycengci');
     var ranktotal=hasParameter('ranktotal');
     var luqutype=hasParameter('luqutype')||hasParameter('recomluqutype');
     var special=hasParameter('special')||hasParameter('special');
     if(schoolprop!=null&&schoolprop!=''){
       if(schoolprop.indexOf('类')==-1){
     	schoolprop+='类';
       }
     }
     if(isfirst==-1){
       oldurl=oldurl+'?';
     }
     if(schoolprop!==null){
     	newschoolprop=schoolprop.substring(0,2);
     }
     if(keyWord1=='输入院校名称'){
     	keyWord1=null;
     }
     if(province=='全部'){
     	province=null;
     }
     if(newschoolprop=='全部'){
     	schoolprop=null;
     }
     if(schooltype=='全部'){
     	 schooltype=null;
     }
     if(schoolflag=='全部'){
     	 schoolflag=null;
     }
     if(schoolpc=='全部'){
     	schoolpc=null;
     }
     if(schoolyear=='全部'||schoolyear==''){
     	schoolyear=null;
     	$('#majoryear').html('2016');
     }
     if(schoolrisk=='全部'){
     	schoolrisk=null;
     }
     if(zytype=='全部'){
     	zytype=null;
     }
     if(page==null){
     	page=1;
     }
     if(fstype!==null && fstype != ""){
      	$('#fstype').html(fstype);
      }
     if(page!==null){
     	$('.nowpage').html(page);
     }
     if(studentprovince!==null && studentprovince!=""){
     	$('#studentprovince').html(studentprovince);
     }
     if(special!=null && special != ""){
     	$('#keyWord1_gufen').val(special);
     }
     if(schoolflag!==null||schoolpc!==null||schoolyear!==null){
     	$(".lin-sechple-special").css('display','block');
     	$('.lin-sechple-open').html("收起");
     }
     if(keyWord1!==null&&keyWord1!==''){
     	$('.studentmessage-key').html(keyWord1);
     	$('#majorval').val(keyWord1);
     	$('#searchval').val(keyWord1);
     	$('#searchval2').val(keyWord1);
     	$('#searchval3').val(keyWord1);
     	$('.lin-seachbox-condi').removeClass('lin-hide');
     	$('.lin-seachbox-choose').append('<em class="searchcol-em">'+keyWord1+'<span class="iconfont icon-close lin-seachbox-close"></span></em>');
     }
     if(mark!==null){
     	$('#forval').val(mark);
     	$('.student-mark').html(mark);
     	$('#markval').val(mark);
     	$('.studentmessage-mark').html(mark);
     }
     if(fsxxxS!==null && fsxxxS!=""){
     	$('.student-province').html(fsxxxS);
     	$('#studentprovince').html(fsxxxS);
     	$('.studentmessage-province').html(fsxxxS);
     }
     if(fsxxxS==''){
     	$('#studentprovince').html('北京');
     }
     if(examineeType=='文科'){
     	$('#s-liberal').attr('checked',true);
     	$('.student-subject').html('文科');
     	$('.studentmessage-subject').html('文科');
     }
     if(examineeType=='理科'){
     	$('#s-science').attr('checked',true);
     	$('.student-subject').html('理科');
     	$('.studentmessage-subject').html('理科');
     }
     if(argzycengci!==null){
     	$('#majorclass').html(argzycengci);
     }
     if(argzycengci=='全部'||argzycengci==''||argzycengci==null){
     	$('#majorclass').html('本科');
     	argzycengci=null;
     	$('#majortype').children().each(function(){
     		if($(this).html()=='法学类'){
     			$(this).css('margin-left','34px');
     		}
     		if($(this).html()=='水利类'){
     			$(this).css('margin-left','34px');
     		}
     		if($(this).html()=='公共事业类'){
     			$(this).css('margin-left','34px');
     		}
     	});
     }
     if(argzycengci=='本科'){
     	$('.spetype').nextAll().css('display','none');
     	$('#majortype').children().each(function(){
     		if($(this).html()=='法学类'){
     			$(this).css('margin-left','34px');
     		}
     	});
     }
     if(argzycengci=='专科'){
     	$('.spetype').prevAll().css('display','none');
     	$('.spetype').css('display','none');
     	console.log($('.majortype').children().eq(0));
     	$('#majortype').children().eq(0).css('display','block');
     	$('#majortype').children().each(function(){
     		if($(this).html()=='电子信息类'){
     			$(this).css('margin-left','34px');
     		}
     		if($(this).html()=='艺术设计传媒类'){
     			$(this).css('margin-left','34px');
     		}
     	});
     }
     if(argspecialtyname!==null){
     	$('#majorval').val(argspecialtyname);
     }
     if(zycengci=="全部专业"){
      zycengci=null;
     }
     if(ranktotal!==null){
     	$('#rankval').val(ranktotal);
     	$('.studentmessage-rank').html(ranktotal+'名');
     }
     if(schoolpropty=='全部'){
     	schoolpropty=null;
     }
     if(luqutype=='全部'){
     	luqutype=null;
     }
     if(schoolyear!==null){
     	$('#majoryear').html(schoolyear);
     }
     if(luqutype=='文科'){
     	$('#s-liberal').attr('checked',true);
     }
     if(luqutype=='理科'){
     	$('#s-science').attr('checked',true);
     }
     if(luqutype=='全部'){
     	luqutype=null;
     }
     if($('#pointsbt').length>0){
     	$('#schoolplace').find('em').each(function(){var that=$(this);AddBlock(province,that);});
     	$('#schoolyear').find('em').each(function(){var that=$(this);AddBlock(schoolyear,that);});
     	$('#luqutype').find('em').each(function(){var that=$(this);AddBlock(luqutype,that)});
     	$('#schoolpc').find('em').each(function(){var that=$(this);AddBlock(schoolpc,that);});
     	if(province!==null){
     		$('#studentprovince').html(province);
     	}
     	if(province==''){
     		$('#studentprovince').html('北京');
     	}
     }else{
     	    $('#schoolrisk').find('em').each(function(){var that=$(this);AddBlock(schoolrisk,that);});
        	$('#schoolplace').find('em').each(function(){var that=$(this);AddBlock(province,that);});
    	    $('#schoolmajor').find('em').each(function(){var that=$(this);AddBlock(newschoolprop,that);});
    	    $('#schoolpt').find('em').each(function(){var that=$(this);AddBlock(schooltype,that);});
    	    $('#schoogc').find('em').each(function(){var that=$(this);AddBlock(schoolflag,that);});
            $('#schoolpc').find('em').each(function(){var that=$(this);AddBlock(schoolpc,that);});
    	    $('#schoolyear').find('em').each(function(){var that=$(this);AddBlock(schoolyear,that);});
    	    $('#majorsubject').find('em').each(function(){var that=$(this);AddBlock(argzycengci,that);});
    	    $('#majortype').find('em').each(function(){var that=$(this);AddBlock(zytype,that);var isactive=that.hasClass('clf-active');if(isactive){var itindex=$(this).index();if(itindex>10){$('.moremajor').html('收起');if(argzycengci=='本科'){$('#majortype').css({height:'58px'});}if(argzycengci=='专科'){$('#majortype').css({height:'95px'});}if(argzycengci=='全部'||argzycengci==null){$('#majortype').css({height:'130px'});}}}});
            $('#totalclick').find('em').each(function(){var that=$(this);AddBlock(schoolsort,that);});
            $('#schoolpropty').find('em').each(function(){var that=$(this);AddBlock(schoolpropty,that);});
            $('#argzycengci').find('em').each(function(){var that=$(this);AddBlock(argzycengci,that);});
            $('#zycengci').find('em').each(function(){var that=$(this);AddBlock(zycengci,that);});
            $('#luqutype').find('em').each(function(){var that=$(this);AddBlock(luqutype,that)})
     }

     //设置清空按钮
      if(!$('.lin-seachbox-choose').hasClass('lin-hide')){
     	 $('.lin-seachbox-choose').append('<em class="close-em" style="color:red;">清空所有<span class="iconfont icon-close lin-seachbox-close"></span></em>')
      }
    	$('body').on('click','.schoolplace-em',function(){
    	  newurl=replaceParamVal(oldurl,"province",'');
    	  newurl=replaceParamVal(newurl,"schoolprovince",'');
    	  window.location.href=newurl;
    	})
    	$('body').on('click','.schoolmajor-em',function(){
    	  newurl=replaceParamVal(oldurl,"recomschprop",'');
    	  newurl=replaceParamVal(newurl,"schoolprop",'');
    	  window.location.href=newurl;
    	})
    	$('body').on('click','.schoolpt-em',function(){
    	  newurl=replaceParamVal(oldurl,"argschtype",'');
    	  newurl=replaceParamVal(newurl,"schooltype",'');
    	  window.location.href=newurl;
    	})
    	$('body').on('click','.schoogc-em',function(){
    	  newurl=replaceParamVal(oldurl,"schoolflag",'');
    	  window.location.href=newurl;
    	})
    	$('body').on('click','.searchcol-em',function(){
    	  newurl=replaceParamVal(oldurl,"keyWord1",'');
    	  window.location.href=newurl;
    	})
    	$('body').on('click','.schoolpc-em',function(){
    	  newurl=replaceParamVal(oldurl,"schoolpc",'');
    	  window.location.href=newurl;
    	})
    	$('body').on('click','.schoolyear-em',function(){
    	  newurl=replaceParamVal(oldurl,"fsyear",'');
    	  newurl=replaceParamVal(newurl,"schoolyear",'');
    	  newurl=replaceParamVal(newurl,"argyear",'')
    	  window.location.href=newurl;
    	})
    	$('body').on('click','.schoolrisk-em',function(){
    	  newurl=replaceParamVal(oldurl,"schoolrisk",'');
    	  window.location.href=newurl;
    	});
    	$('body').on('click','.majorsubject-em',function(){
    	  newurl=replaceParamVal(oldurl,"zycengci",'');
    	  newurl=replaceParamVal(newurl,"argzycengci",'');
    	  window.location.href=newurl;
    	})
    	$('body').on('click','.majortype-em',function(){
    	  newurl=replaceParamVal(oldurl,"zytype",'');
    	  window.location.href=newurl;
    	});
    	$('body').on('click','.schoolpropty-em',function(){
    	  newurl=replaceParamVal(oldurl,"schoolpropty",'1');
    	  window.location.href=newurl;
    	});
    	$('body').on('click','.totalclick-em',function(){
    	  newurl=replaceParamVal(oldurl,"schoolsort",'1');
    	  window.location.href=newurl;
    	});
    	$('body').on('click','.luqutype-em',function(){
    	  newurl=replaceParamVal(oldurl,"recomluqutype",'');
    	  newurl=replaceParamVal(newurl,"luqutype",'');
    	  window.location.href=newurl;
    	});
    	$('body').on('click','.close-em',function(){
    		var removeurl;
    		//估分  位次  查询特殊处理清空条件按钮    只清空筛选条件，不清空控制参数
    		if(oldurl.indexOf('queryschoolgufen.html')!=-1 || oldurl.indexOf('querySchoolSection.html')!=-1){
    			oldurl=replaceParamVal(oldurl,'province','');
    			oldurl=replaceParamVal(oldurl,'schoolrisk','');
    			oldurl=replaceParamVal(oldurl,'schoolprovince','');
    			oldurl=replaceParamVal(oldurl,'schoolflag','');
    			removeurl=replaceParamVal(oldurl,'schoolpc','');
    		}else{
    			removeurl=oldurl.split('?')[0];
    		}

    	  window.location.href=removeurl;
    	});
//院校省份点击筛选
    $('#schoolplace em').on('click',function(){
    	var that=$(this);
    	oldurl=IsHavePage(oldurl);
    	var is1= oldurl.indexOf('schoolprovince');
    	if(is1>0){
    		SelectCol('schoolprovince',that,oldurl);
    	}else{
    	SelectCol('studentprovince',that,oldurl);
    	SelectCol('recomprovince',that,oldurl);
    	SelectCol('&province',that,oldurl);
    	}
    });
//院校分类点击筛选
    $('#schoolmajor em').on('click',function(){
    	var that=$(this);
    	oldurl=IsHavePage(oldurl);
    	/*SelectCol('schoolprop',that);*/
    	SelectCol('recomschprop',that);
    });
//学历层次点击筛选
    $('#schoolpt em').on('click',function(){
    	var that=$(this);
    	oldurl=IsHavePage(oldurl);
    	SelectCol('schooltype',that);
    	SelectCol('argschtype',that);
    });
//特殊属性点击筛选
    $('#schoogc em').on('click',function(){
    	var that=$(this);
    	oldurl=IsHavePage(oldurl);
    	SelectCol('schoolflag',that);
    });
//录取批次点击筛选
    $('#schoolpc em').on('click',function(){
    	var that=$(this);
    	oldurl=IsHavePage(oldurl);
    	SelectCol('schoolpc',that);
    });
//录取年份点击筛选
    $('#schoolyear em').on('click',function(){
    	var that=$(this);
    	oldurl=IsHavePage(oldurl);
    	if(schoolyear==hasParameter('schoolyear')){
    	   SelectCol('argyear',that);
    	   SelectCol('fsyear',that);
    	   SelectCol('schoolyear',that);
    	}else{
    	  SelectCol('schoolyear',that);
    	  SelectCol('fsyear',that);
    	  SelectCol('argyear',that);
    	}
    });
//录取风险点击筛选
    $('#schoolrisk em').on('click',function(){
    	var that=$(this);
    	oldurl=IsHavePage(oldurl);
    	SelectCol('schoolrisk',that);
    })
//专业层次点击筛选
    $('#majorsubject em').on('click',function(){
    	var that=$(this);
    	oldurl=IsHavePage(oldurl);
    	SelectCol('argzycengci',that);
    	SelectCol('zycengci',that);
    })
//专业类别点击筛选
    $('#majortype em').on('click',function(){
    	var that=$(this);
    	oldurl=IsHavePage(oldurl);
    	SelectCol('zytype',that);
    })
//人气值点击筛选
    $('#totalclick em').on('click',function(){
      var that=$(this);
      oldurl=IsHavePage(oldurl);
      SelectCol('schoolsort',that);
    })
//排行榜中学校类别点击筛选
    $('#schoolpropty em').on('click',function(){
      var that=$(this);
      oldurl=IsHavePage(oldurl);
      SelectCol('schoolpropty',that);
    })
//分数线学生类别筛选
    $('#luqutype em').on('click',function(){
      var that=$(this);
      oldurl=IsHavePage(oldurl);
      SelectCol('recomluqutype',that);
      SelectCol('luqutype',that);
    })
//根据专业层次判断
    $('#zycengci em').on('click',function(){
      var that=$(this);
      oldurl=IsHavePage(oldurl);
      SelectCol('zycengci',that);
    })
//专业中更多按钮判断
    $('.displaymajor').find('em').each(function(){
    	if($(this).hasClass('clf-active')){
    		$('.moremajor').html('收起');
    		$('.displaymajor').css('display','block');
    	}

    });
//点击查询学校关键字
function search2(){
  var searchSchool = $('#searchval2').val();
  var re = /^([a-zA-Z\u4E00-\u9FA5]|(\(|\)|（|）))+$/g;
  var istrueval=re.test(searchSchool);
  if(istrueval || searchSchool.length == 0){
	  window.location.href="/soudaxue/queryschool.html?&keyWord1="+ searchSchool +"";
  }else{
	  alert('请输入正确中文名称或者关键字');
  }
  
}
function search3(){
  var searchcol=$('#searchval3').val();
  var re = /^([a-zA-Z\u4E00-\u9FA5]|(\(|\)|（|）))+$/g;
  var istrueval=re.test(searchcol);
  var studentprovince=$('#studentprovince').html();
  var fstype=$('#fstype').html();
  var txt=$('#searchbt').html();
  newurl = oldurl.split("?")[0]+"?";

  if(istrueval || searchcol.length == 0){
    if(searchcol!='输入院校或专业名称'){
    		  newurl =newurl+"&keyWord1="+searchcol;
    }
    if(studentprovince!=""){
    	newurl =newurl+"&studentprovince="+studentprovince;
    }
    if(fstype!=""){
    	newurl =newurl+"&fstype="+fstype;
    }
    window.location.href=newurl;
  }else{
    alert('请输入正确中文名称或者关键字');
   }
}
    function search(){
      var searchcol=$('#searchval').val();
      var re = /^([a-zA-Z\u4E00-\u9FA5]|(\(|\)|（|）))+$/g;
      var istrueval=re.test(searchcol);
      oldurl = oldurl.split("?")[0]+"?";
      if(oldurl.indexOf('newChangeAll')>-1){
        	oldurl='/soudaxue/queryschool.html?';
      }
      if(istrueval || searchcol.length == 0){
    	  if(searchcol!='输入院校名称'){
    		  newurl=oldurl+'&keyWord1='+searchcol;
          }else{
        	  newurl = oldurl;
          }
    	  if(searchcol!='输入院校名称'){
    		  newurl=oldurl+'&keyWord1='+searchcol;
          }else{
        	  newurl = oldurl;
          }
    	  if(oldurl.indexOf('queryProvinceScore')>-1){
    		  var studentprovince=$('#studentprovince').html();
    	      var fstype=$('#fstype').html();
    		  newurl = newurl+"&studentprovince="+studentprovince+"&fstype="+fstype;
    	  }
    	  window.location.href=newurl;
      }else{
        alert('请输入正确中文名称或者关键字');
       }
    }
//点击预测搜搜预估分
function foreSearch(){
   	  var rex=/^[1-9]\d{2}$/;
      var mark=$('#forval').val();
      if(mark=='高考分:600'){
    	  mark = 600;
      }
      var istrueval=rex.test(mark);
      var fsxxxS=$('#studentprovince').html();
      var examineeType=$("input[name='subject']:checked").val();
      var special=$("#keyWord1_gufen").val();
      if(special == "请输入专业名称"){
    	  special = "";
      }
      var ishavepage=oldurl.indexOf('page');
      var ishavemark=oldurl.indexOf('mark');
      var ishavefsxxx=oldurl.indexOf('fsxxxS');
      var ishavespecial=oldurl.indexOf('special');
      var ishaveexaineeType=oldurl.indexOf('examineeType');
      if(ishavepage > -1){
        oldurl=replaceParamVal(oldurl,'page','1');
      }
      if(oldurl.indexOf('schoolrisk')!=-1){
    	  oldurl=replaceParamVal(oldurl,'schoolrisk','');
      }
      if(oldurl.indexOf('province')!=-1){
    	  oldurl=replaceParamVal(oldurl,'province','');
      }
      if(oldurl.indexOf('special')!=-1){
    	  oldurl=replaceParamVal(oldurl,'special','');
      }
      	if(istrueval || mark.length == 0){
      		// newurl = oldurl.split("?")[0]+'?fsxxxS='+fsxxxS+'&examineeType='+examineeType+'&province='+fsxxxS+'&mark='+mark;//默认 学校所在地为生源地
      		newurl ='/soudaxue/queryschoolgufen.html?fsxxxS='+fsxxxS+'&examineeType='+examineeType+'&province='+fsxxxS+'&mark='+mark;//默认 学校所在地为生源地
      		if($('.subject_special').css('display') != 'none'){//非隐藏
      		  newurl=newurl+'&special='+special;
  			}
      	}else{
      		alert('分数的格式不正确，请输入三位数');
      		return;
      	}
      window.location.href=newurl;
    }
//点击预测名次排行
    function rankSearch(){
      var rankval=$('#rankval').val();
      if(rankval=='高考位次：12801'){
    	  rankval = 12801;
      }
      var re= /^[1-9]\d*$/;
      var istrueval=re.test(rankval);
      var special=$("#keyWord1_gufen").val();
      if(special == "请输入专业名称"){
    	  special = "";
      }
      var fsxxxS=$('#studentprovince').html();
      var examineeType=$("input[name='subject']:checked").val();
     /* var ishaverank=oldurl.indexOf('ranktotal');
      var ishavefsxxx=oldurl.indexOf('fsxxxS');
      var ishavespecial=oldurl.indexOf('special');
      var ishaveexaineeType=oldurl.indexOf('examineeType');
      if(oldurl.indexOf('province')!=-1){
    	  oldurl = replaceParamVal(oldurl,'province','');
      }
      if(oldurl.indexOf('schoolrisk')!=-1){
    	  oldurl = replaceParamVal(oldurl,'schoolrisk','');
      }*/
      if(istrueval || rankval.length == 0){
    	  newurl = oldurl.split("?")[0]+'?fsxxxS='+fsxxxS+'&examineeType='+examineeType+'&province='+fsxxxS+'&ranktotal='+rankval;//默认 学校所在地为生源地
    	  if($('.subject_special').css('display') != 'none'){//非隐藏
    		  newurl=newurl+'&special='+special;
			}
      }else{
    	  alert('位次的格式不正确，请重新输入');
    	  newurl=oldurl;
      }
      /*if(rankval!=='高考位次：12801'){
      	if(istrueval || rankval.length == 0){
      		if(ishaverank==-1&&ishavefsxxx==-1&&ishaveexaineeType==-1){
      			newurl=oldurl+'&ranktotal='+rankval+'&fsxxxS='+fsxxxS+'&examineeType='+examineeType;
      		}else{
      			var thurl=replaceParamVal(oldurl,'ranktotal',rankval);
      			var thurl1=replaceParamVal(thurl,'fsxxxS',fsxxxS);
      			newurl=replaceParamVal(thurl1,'examineeType',examineeType);
      		  }
      	}else{
      		alert('位次的格式不正确，请重新输入');
      		newurl=oldurl;
      	}
      }else{
      	    if(ishaverank==-1&&ishavefsxxx==-1&&ishaveexaineeType==-1){
      	    	if(rankval=='高考位次：12801'){
      	    		rankval=12801;
      	    	}
      	    	newurl=oldurl+'&ranktotal='+rankval+'&fsxxxS='+fsxxxS+'&examineeType='+examineeType;
      		}else{
      			var rankval1=12801;
      			var thurl=replaceParamVal(oldurl,'ranktotal',rankval1);
      			var thurl1=replaceParamVal(thurl,'fsxxxS',fsxxxS);
      			newurl=replaceParamVal(thurl1,'examineeType',examineeType);
      		  }

      }*/
      window.location.href=newurl
    }
//点击专业查询搜索专业
    function majorSearch(){
      var majorclass=$('#majorclass').html();
      var majorval=$('#majorval').val();
      var re= /^[\u4e00-\u9fa5]*$/;
      var istrueval=re.test(majorval);
      var fsxxxS=$('#studentprovince').html();
      var examineeType=$("input[name='subject']:checked").val();
      var ishaveplace=oldurl.indexOf('argspecialtyname');
      var ishaveplace1=oldurl.indexOf('keyWord1');
      var ishavemajorclass=oldurl.indexOf('argzycengci');
      var ishavepage=oldurl.indexOf('page');
      if(ishavepage > -1){
        oldurl=replaceParamVal(oldurl,'page','1');
      }
      if(istrueval){
      	if(majorval!=='可输入专业名称'){
      		if(ishaveplace1!=-1){
              if(ishavemajorclass==-1){
      		    newurl=replaceParamVal(oldurl,'keyWord1',majorval);
      		    newurl=newurl+'&argzycengci='+majorclass;
      	      }
              if(ishavemajorclass!=-1){
      		    var exurl=replaceParamVal(oldurl,'keyWord1',majorval);
      		    newurl=replaceParamVal(exurl,'argzycengci',majorclass)
              }
      		}else{
      		  if(ishaveplace==-1&&ishavemajorclass==-1){
      			newurl=oldurl+'&argspecialtyname='+majorval+'&argzycengci='+majorclass;
      		  }
      		  if(ishavemajorclass==-1&&ishaveplace!==-1){
      			var replaceurl=replaceParamVal(oldurl,'argspecialtyname',majorval);
      			newurl=replaceurl+'&argzycengci='+majorclass;
      		  }
      		  if(ishavemajorclass!==-1&&ishaveplace!==-1){
      			var replaceurl=replaceParamVal(oldurl,'argspecialtyname',majorval);
      			newurl=replaceParamVal(replaceurl,'argzycengci',majorclass);
      		  }
      		  if(ishavemajorclass!==-1&&ishaveplace==-1){
      			var replaceurl=replaceParamVal(oldurl,'argzycengci',majorclass);
      			newurl=replaceurl+'&argspecialtyname='+majorval;
      		  }
      		}
      		window.location.href=newurl;
      	}else{
      		alert('请输入要查询的专业名称');
      	}
      }else{
        alert('请输入正确中文名称或者关键字');
      }
    }
//根据分数选专业-点击查询搜索结果
    function majorgradeSearch(){
        var majorval=$('#majorval').val();
        var majorre= /^[\u4e00-\u9fa5]*$/;
        var ismajorval=majorre.test(majorval);
        var mark=$('#markval').val();
        var numre= /^[1-9]\d*$/;
        var ismark=numre.test(mark);
        var fsxxxS=$('#studentprovince').html();
        var examineeType=$("input[name='subject']:checked").val();
        var year=$('#majoryear').html();
      	var ishavefsxxx=oldurl.indexOf('fsxxxS');
      	var ishaveexaineeType=oldurl.indexOf('examineeType');
      	var ishavemark=oldurl.indexOf('mark');
      	var ishaveyear=oldurl.indexOf('year');
      	var ishavekeyWord1=oldurl.indexOf('keyWord1');
        var ishavepage=oldurl.indexOf('page');
        if(ishavepage > -1){
          oldurl=replaceParamVal(oldurl,'page','1');
        }
        if(majorval=="可输入专业名称"){
        	if(ishavefsxxx==-1&&ishaveexaineeType==-1&&ishavemark==-1&&ishaveyear==-1){
        		newurl=oldurl+'&fsxxxS='+fsxxxS+'&examineeType='+examineeType+'&mark='+mark+'&schoolyear='+year+'&keyWord1=';
        	}else{
      			var thurl=replaceParamVal(oldurl,'fsxxxS',fsxxxS);
      			var thurl1=replaceParamVal(thurl,'examineeType',examineeType);
      			var thurl2=replaceParamVal(thurl1,'mark',mark);
      			var newurl=replaceParamVal(thurl2,'schoolyear',year);
        	}
        }else{
        if(ismark==true&&ismajorval==true){
      		if(ishavefsxxx==-1&&ishaveexaineeType==-1&&ishavemark==-1&&ishaveyear==-1&&ishavekeyWord1==-1){
      			newurl=oldurl+'&fsxxxS='+fsxxxS+'&examineeType='+examineeType+'&mark='+mark+'&schoolyear='+year+'&keyWord1='+majorval;
      		}else{
      			var thurl=replaceParamVal(oldurl,'fsxxxS',fsxxxS);
      			var thurl1=replaceParamVal(thurl,'examineeType',examineeType);
      			var thurl2=replaceParamVal(thurl1,'mark',mark);
      			var thurl3=replaceParamVal(thurl2,'schoolyear',year);
      			newurl=replaceParamVal(thurl3,'keyWord1',majorval);
      		}
        }else{
        	alert('请检查您输入的分数与专业是否正确');
        	newurl=oldurl;
        }
        }
       window.location.href=newurl;
    }
//各省分数线搜索按钮
    function PlacepointSearch(){
    	var schoolyear=$('#majoryear').html();
    	var schoolprovince=$('#studentprovince').html();
    	var luqutype=$("input[name='subject']:checked").val();
      oldurl=replaceParamVal(oldurl,'page','1');
      oldurl=replaceParamVal(oldurl,'schoolpc','');
      newurl = oldurl;
      if(newurl.indexOf('schoolprovince')!=-1){
    	  newurl=replaceParamVal(newurl,'schoolprovince',schoolprovince);
      }else{
    	  newurl=newurl+'&schoolprovince='+schoolprovince
      }
      if(newurl.indexOf('schoolprovince')!=-1){
    	  newurl=replaceParamVal(newurl,'schoolprovince',schoolprovince);
      }else{
    	  newurl=newurl+'&schoolprovince='+schoolprovince
      }

      if(newurl.indexOf('schoolyear')!=-1){
    	  newurl=replaceParamVal(newurl,'schoolyear',schoolyear);
      }else{
    	  newurl=newurl+'&schoolyear='+schoolyear
      }

      if(newurl.indexOf('luqutype')!=-1){
    	  newurl=replaceParamVal(newurl,'luqutype',luqutype);
      }else{
    	  newurl=newurl+'&luqutype='+luqutype
      }
      window.location.href=newurl;
    }
//首页点击查询
function HomeSearch(){
   	  var rex=/^[1-9]\d{2}$/;
      var mark=$('#forval').val();
      var istrueval=rex.test(mark);
      var fsxxxS=$('#studentprovince').html();
      var examineeType=$("input[name='subject']:checked").val();
      var special=$("#keyWord1_gufen").val();
      if(special == "请输入专业名称"){
    	  special = "";
      }
      if(mark=='高考分:600'){
        mark = 600;
      }
      if (istrueval != true) {
        alert('分数的格式不正确，请输入三位数');
        return false;
      }
      // newurl = '/soudaxue/queryschoolgufen.html?fsxxxS='+fsxxxS+'&examineeType='+examineeType+'&province='+fsxxxS+'&mark='+mark+'&special='+special;
      newurl='/soudaxue/queryschoolgufen.html?&mark='+mark+'&fsxxxS='+fsxxxS+'&examineeType='+examineeType;
      window.location.href=newurl;
}
//查询按钮连接Enter键
    $(function(){
      document.onkeydown = function(e){
        var ev = document.all?window.event:e;
        if(ev.keyCode ==13 ){
        	if(document.all){ //判断IE浏览器
        		  window.event.returnValue = false;
        		}
        		else{
        		  ev.preventDefault();
        		};
          //查询学校关键字enter绑定
          if($('#searchval').length>0){
            if($('#searchval').val()!='输入院校名称'){
              search();
            }
          }
          //查询学校关键字enter绑定
          if($('#searchval2').length>0){
            if($('#searchval2').val()!='输入院校名称'){
              search2();
            }
          }
           //查询学校关键字enter绑定
          if($('#searchval3').length>0){
            if($('#searchval3').val()!='输入院校或专业名称'){
              search3();
            }
          }
          //预测分数enter绑定
          if($('#forval').length>0){
            if($('#forval').val()!='高考分:600'){
          	  foreSearch();
            }
          }
          //预测名次enter绑定
          if($('#rankval').length>0){
          	if($('#rankval').val()!=='高考位次：12801'){
          		rankSearch();
          	}
          }
        //预测名次enter绑定
          if($('#keyWord1_gufen').length>0){
          	if($('#keyWord1_gufen').val()!=='请输入专业名称'){
          		rankSearch();
          	}
          }
          //查询专业enter绑定
          if($('#majorbt').length>0){
          	if($('#majorval').val()!=='可输入专业名称'){
          		majorSearch();
          	}
          }
          //根据分数选专业-点击查询enter绑定
          if($('#majorgradebt').length>0){
          	if($('#majorval').val()!=='可输入专业名称'){
          		majorgradeSearch();
          	}
          }
          //各省分数线搜索按钮
          if($('#pointsbt').length>0){
          	PlacepointSearch()
          }
          //首页搜索按钮
          if($('#homebt').length>0){
          	HomeSearch();
          }
        }
      }
    });
//按钮方法绑定
    $('#searchbt').on('click',search);
    $('#searchbt2').on('click',search2);
    $('#forecast').on('click',foreSearch);
    $('#forecast2').on('click',rankSearch);
    $('#searchbt3').on('click',search3);
    $('#rankbt').on('click',rankSearch);
    $('#majorbt').on('click',majorSearch)
    $('#majorgradebt').on('click',majorgradeSearch);
    $('#pointsbt').on('click',PlacepointSearch);
    $('#homebt').on('click',HomeSearch);
//院校输入框焦点设置
    $('#searchval').focus(function(){
    	var serval=$('#searchval').val();
    	if(serval=='输入院校名称'){
    		$('#searchval').val('');
    	}
    })
    $('#searchval').blur(function(){
    	var serval=$('#searchval').val();
    	if(serval==''){
    		$('#searchval').val('输入院校名称');
    	}
    });
    $('#searchval2').focus(function(){
    	var serval=$('#searchval2').val();
    	if(serval=='输入院校名称'){
    		$('#searchval2').val('');
    	}
    })
    $('#searchval2').blur(function(){
    	var serval=$('#searchval2').val();
    	if(serval==''){
    		$('#searchval2').val('输入院校名称');
    	}
    });
    $('#searchval3').focus(function(){
    	var serval=$('#searchval3').val();
    	if(serval=='输入院校或专业名称'){
    		$('#searchval3').val('');
    	}
    })
    $('#searchval3').blur(function(){
    	var serval=$('#searchval3').val();
    	if(serval==''){
    		$('#searchval3').val('输入院校或专业名称');
    	}
    });
//预测输入框焦点设置
    $('#forval').focus(function(){
    	var forval=$('#forval').val();
    	if(forval=='高考分:600'){
    		$('#forval').val('');
    	}
    })
    $('#forval').blur(function(){
    	var forval=$('#forval').val();
    	if(forval==''){
    		$('#forval').val('高考分:600');
    	}
    });
  //预测  专业名称输入框焦点设置
    $('#keyWord1_gufen').focus(function(){
    	var forval=$('#keyWord1_gufen').val();
    	if(forval=='请输入专业名称'){
    		$('#keyWord1_gufen').val('');
    	}
    })
    $('#keyWord1_gufen').blur(function(){
    	var forval=$('#keyWord1_gufen').val();
    	if(forval==''){
    		$('#keyWord1_gufen').val('请输入专业名称');
    	}
    });
//专业页输入专业名称输入框焦点设置
    $('#majorval').focus(function(){
    	var majorval=$('#majorval').val();
    	if(majorval=='可输入专业名称'){
    		$('#majorval').val('');
    	}
    })
    $('#majorval').blur(function(){
    	var majorval=$('#majorval').val();
    	if(majorval==''){
    		$('#majorval').val('可输入专业名称');
    	}
    });
//根据位次选大学 位次预测输入框焦点设置
    $('#rankval').focus(function(){
    	var rankval=$('#rankval').val();
    	if(rankval=='高考位次：12801'){
    		$('#rankval').val('');
    	}
    })
    $('#rankval').blur(function(){
    	var rankval=$('#rankval').val();
    	if(rankval==''){
    		$('#rankval').val('高考位次：12801');
    	}
    });
//根据分数选专业--分数框焦点
    $('#markval').focus(function(){
    	var rankval=$('#markval').val();
    	if(rankval=='600'){
    		$('#markval').val('');
    	}
    })
    $('#markval').blur(function(){
    	var rankval=$('#markval').val();
    	if(rankval==''){
    		$('#markval').val('600');
    	}
    });
//专业类别选择更多按钮切换
    $('.moremajor').on('click',function(){
    	if($(this).html()=='更多'){
    		$(this).html('收起');
    		if(argzycengci=='本科'){
    			$('#majortype').animate({height:'58px'});
    		}
    		if(argzycengci=='专科'){
    			$('#majortype').animate({height:'95px'});
    		}
    		if(argzycengci=='全部'||argzycengci==null){
    			$('#majortype').animate({height:'130px'});
    		}
    	}else{
    		$(this).html('更多');
    		$('#majortype').animate({height:'37px'});
    	}
    })
//分页点击
if(oldurl.indexOf('schoolhtm')==-1){
$('body').on('click','.lin-searchtabl-footer ul li',function(){
      var cltxt=$(this).html();
      var ispre=cltxt=='上一页';
      var isnex=cltxt=='下一页';
      var islast=cltxt=='末页';
      var isfirst=cltxt=='首页';
      var lastpage=sessionStorage.getItem('total');
      var ishavapage=oldurl.indexOf('page');
      var page2=hasParameter('page');
      //判断点击分页不为上一页与下一页
      if(!ispre&&!isnex&&!isfirst&&!islast){
      	var page2=hasParameter('page');
      if(page2 == null){
    	var newurl=oldurl+'&page='+cltxt;
    	window.location.href=newurl;
    	return false;
      }else{
      	cltxt=cltxt;
      	newurl=replaceParamVal(oldurl,'page',cltxt);
        window.location.href=newurl;
       }

      }
      //点击分页上一页
      if(ispre){
      	if(ishavapage==-1){
      		alert('这已经是第一页了！');
      		cltxt=1;
      		newurl=oldurl+'&page='+cltxt;
      	}else{
      		if(page==1){
      			alert('这已经是第一页了！');
      		}if(page>1){
      		  cltxt=page-1;
      		  newurl=replaceParamVal(oldurl,'page',cltxt);
      		  window.location.href=newurl;
      	   }else{
      		  cltxt=page;
      		  newurl=replaceParamVal(oldurl,'page',cltxt);

      	  }
      	}
      }
      //点击分页下一页
      if(isnex){
      	if(lastpage==1){
      		alert('这已经是最后一页了');
      		cltxt=1;
      	 }else{
      	 	if(page2 == null){
		    	var newurl=oldurl+'&page=2';
		    	window.location.href=newurl;
		    	return false;
		      }
      	 	 else if(parseInt(page)<lastpage){
      	 		cltxt=parseInt(page)+1;
      	 		newurl=replaceParamVal(oldurl,'page',cltxt);
      		    window.location.href=newurl;
      	 	}else{
      	 		cltxt=lastpage;
      	 		alert('这已经是最后一页了');
      	 	}
      	 }
      	}
       //点击首页
      if(isfirst){
      	if(page!=1){
	      	cltxt=1;
	      	newurl=replaceParamVal(oldurl,'page',cltxt);
	      	window.location.href=newurl;
      	}else{
      		alert("这已经是首页了")
      		return;
      	}
      }
      //点击末页
      if(islast){

      	if(page!=lastpage){
      		if(page2 == null){
		    	var newurl=oldurl+'&page='+lastpage;
		    	window.location.href=newurl;
		    	return false;
		      }
	      	cltxt=lastpage;
	      	newurl=replaceParamVal(oldurl,'page',cltxt);
	      	window.location.href=newurl;
      	}else{
      		alert("这已经是末页了")
      		return;
      	}
      }
    });
}
//点击显示展开筛选
    $('.lin-sechple-open').click(function(){
        if($(this).html()=="展开全部筛选"){
          $(".lin-sechple-special").slideDown();
          $(this).html("收起");
        }else{
          $(".lin-sechple-special").slideUp();
          $(this).html("展开全部筛选");
        }
    });
