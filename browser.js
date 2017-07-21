/**
 * Created by JS-3 on 2017/2/6.
 */
var body0 = document.getElementsByTagName('body')[0];
var wtable1 = document.getElementById('wtable');
var t1;
var list = document.getElementById('filter_list');
var lastDate = document.getElementById('date');
window.onresize = function(){wtable1.style.height = body0.offsetHeight-86+'px'};
var flt =function(str){
    var cld = document.getElementById('active_table').childNodes[1].childNodes;
    for(x=0; x< cld.length;x++){
        if(cld[x].childNodes[5].innerHTML == str){
            cld[x].style.display = 'table-row';
        }else if(str == '全部'){
            cld[x].style.display = 'table-row';
        }else{
            cld[x].style.display='none';
        }
    }
};
var showtable = function(json){
    for(x in json){
        if(typeof json[x] == 'object'){
            //console.log(x);
            showtable(json[x]);
        }else{
            //console.log(x + ': ' + json[x]);
        }
    }
};
var wlist = function(lst){          //填充筛选菜单
    var str = '';
    var tmp = {};
    str += '<li>全部</li>';
    for(x in lst){
        if(!tmp[lst[x]]&&lst[x]!=''){
	        switch (lst[x]) {
		        //-----------------------------------------
		        case '鬼泣':
			        str += '<li class="sword gq"><div class="gq"></div>'+lst[x]+'</li>';
			        break;
		        case '狂战士':
			        str += '<li class="sword kzs"><div class="kzs"></div>'+lst[x]+'</li>';
			        break;
		        case '剑魂':
			        str += '<li class="sword jh"><div class="jh"></div>'+lst[x]+'</li>';
			        break;
		        case '阿修罗':
			        str += '<li class="sword axl"><div class="axl"></div>'+lst[x]+'</li>';
			        break;
		        //-----------------------------------------
		        //case '剑宗':
			     //   str += '<li class="swordAt jz"><div class="jz"></div>'+lst[x]+'</li>';
			     //   break;
		        //case '流浪武士':
			     //   str += '<li class="swordAt llws"><div class="llws"></div>'+lst[x]+'</li>';
			     //   break;
		        //case '暗殿骑士':
			     //   str += '<li class="swordAt adqs"><div class="adqs"></div>'+lst[x]+'</li>';
			     //   break;
		        //case '剑魔':
			     //   str += '<li class="swordAt jm"><div class="jm"></div>'+lst[x]+'</li>';
			     //   break;
		        //-----------------------------------------
		        case '弹药专家':
			        str += '<li class="gunner dyzj"><div class="dyzj"></div>'+lst[x]+'</li>';
			        break;
		        case '机械师':
			        str += '<li class="gunner jxs"><div class="jxs"></div>'+lst[x]+'</li>';
			        break;
		        case '枪炮师':
			        str += '<li class="gunner qps"><div class="qps"></div>'+lst[x]+'</li>';
			        break;
		        default:
			        str += '<li>'+lst[x]+'</li>';
	        }
            tmp[lst[x]]=1
        }
    }
    list.innerHTML=str;
};
var check = function(){
    t1 = document.getElementById('active_table');
    var th = t1.firstChild.firstChild.childNodes;
    //console.log('表格大小'+t1.offsetWidth);
    //console.log('容器大小'+wtable1.offsetWidth);
    if(t1.offsetWidth > wtable1.offsetWidth){
        //console.log('表格大小>容器大小，表格将被缩略');
        if(t1.offsetWidth-wtable1.offsetWidth<=th[4].offsetWidth){
            return 1
        }else if(t1.offsetWidth-wtable1.offsetWidth>th[4].offsetWidth&&t1.offsetWidth-wtable1.offsetWidth<=th[4].offsetWidth+th[2].offsetWidth){
            return 2
        }else if(t1.offsetWidth-wtable1.offsetWidth>th[4].offsetWidth+th[2].offsetWidth&&t1.offsetWidth-wtable1.offsetWidth<=th[4].offsetWidth+th[2].offsetWidth+th[1].offsetWidth){
            return 3
        }else{
            return 4
        }
    }
};
var load = function(){
    //console.log('load');
    var xmlhttp;
    if (window.XMLHttpRequest){         // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp=new XMLHttpRequest();
    }else{                              // code for IE6, IE5
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange=function(){
        if (xmlhttp.readyState==4 && xmlhttp.status==200){
            ip3 = JSON.parse(xmlhttp.responseText);
            wtable(ip3.ImagePacks2);
	        wtable(ip3.ImagePacks2,check());
            lastDate.innerText ='最后发布于：'+ new Date(ip3.ImagePacks2[0][4]).toLocaleString();
            //console.log(lastDate.innerText);
        }
    };
    xmlhttp.open("GET","ImagePacks2.json?t=" + Math.random(),true);            //which file
    xmlhttp.send();
    body0.style.fontSize = '16px';
};
load();
var wtable = function(json,c){
    var str='<table id="active_table"><thead><tr>';
    var sort = 0;
    var sort_list = [];
    for(x in json[0]){
        if(json[0][x] == '职业/类别'){
            sort = x-1;
            str = str + '<th id="filter">' + json[0][x] + '<div style="position: relative;z-index: -999"><p class="downA"></p><p class="downA" id="downBg" style="position: relative;top: -10px;margin-bottom: -10px" datatype="a"></p></div></th>';
            continue
        }
        switch(c){
            case 1:
                if(x == 4){
                    str = str + '<th class="hide">' + json[0][x] + '</th>'
                }else{
                    str = str + '<th>' + json[0][x] + '</th>'
                }
                break;
            case 2:
                if(x == 4||x==2){
                    str = str + '<th class="hide">' + json[0][x] + '</th>'
                }else{
                    str = str + '<th>' + json[0][x] + '</th>'
                }
                break;
            case 3:
                if(x == 4||x==2||x==1){
                    str = str + '<th class="hide">' + json[0][x] + '</th>'
                }else{
                    str = str + '<th>' + json[0][x] + '</th>'
                }
                break;
            case 4:
                if(x == 4||x==2||x==1){
                    str = str + '<th class="hide">' + json[0][x] + '</th>'
                }else{
                    str = str + '<th>' + json[0][x] + '</th>'
                }
                break;
            default:
                str = str + '<th>' + json[0][x] + '</th>'
        }
    }
    str = str + '</tr></thead><tbody>';
    for(x=1;x< json.length;x++){
        str = str + '<tr>' + '<td>'+ x +'</td>';
        for(y in json[x]){
            if(y == sort){
                sort_list.push(json[x][y])
            }
            switch(c){
                case 1:
                    if(y == 3){
                        str = str + '<td class="hide">' + json[x][y] + '</td>'
                    }else{
                        str = str + '<td>' + json[x][y] + '</td>'
                    }
                    break;
                case 2:
                    if(y == 3||y==1){
                        str = str + '<td class="hide">' + json[x][y] + '</td>'
                    }else{
                        str = str + '<td>' + json[x][y] + '</td>'
                    }
                    break;
                case 3:
                    if(y == 3||y==1||y==0){
                        str = str + '<td class="hide">' + json[x][y] + '</td>'
                    }else{
                        str = str + '<td>' + json[x][y] + '</td>'
                    }
                    break;
                case 4:
                    if(y == 3||y==1||y==0){
                        str = str + '<td class="hide">' + json[x][y] + '</td>'
                    }else{
                        str = str + '<td>' + json[x][y] + '</td>'
                    }
                    break;
                default:
                    str = str + '<td>' + json[x][y] + '</td>'
            }
        }
        str = str + '</tr>';
    }
    str = str + '</tbody></table>';
    wlist(sort_list);
    wtable1.innerHTML = str;
    wtable1.style.height = body0.offsetHeight-86+'px';
};
function getCookie(c_name) {
	if (document.cookie.length>0) {
		c_start=document.cookie.indexOf(c_name + "=");
		if (c_start!=-1) {
			c_start=c_start + c_name.length+1;
			c_end=document.cookie.indexOf(";",c_start);
			if (c_end==-1) c_end=document.cookie.length;
			return unescape(document.cookie.substring(c_start,c_end))
		}
	}
	return ""
}
function setCookie(c_name,value,expiredays) {
	var exdate=new Date();
	exdate.setDate(exdate.getDate()+expiredays);
	document.cookie=c_name+ "=" +escape(value)+
		((expiredays==null) ? "" : "; expires="+exdate.toGMTString())
}
function checkCookie() {
	var infoCon = document.getElementById('infoCon');
	bigGuide=getCookie('bigGuide');
	if (bigGuide!=null && bigGuide!="") {
		//alert('Welcome again '+bigGuide+'!')
		infoCon.style.display = 'none';
	} else {
		//bigGuide=prompt('Please enter your name:',"");
		//if (bigGuide!=null && bigGuide!="") {
		//	setCookie('bigGuide',bigGuide,365)
		//}
		infoCon.style.display = 'block';
	}
}
checkCookie();
window.onload = function(){
	document.onclick = function(e){
        var evt = e || window.event;
        var target = evt.target || evt.srcElement;
        //console.log(target.id);
        if(target.id == 'reload'){
            //console.log('reload');
            //var c = check();
            //wtable(ip3.ImagePacks2,c);        //测试自隐藏弱势信息
            load();                              //真重加载
        }else if(target.tagName == 'LI'){
            flt(target.innerText);
            list.style.display = 'none';
        }else if(target.id == 'show'){
            wtable(ip3.ImagePacks2);
        }else if(target.id.indexOf('filter')+1){
            var ft = document.getElementById('filter');
            var infoCon = document.getElementById('infoCon');
            var downBg = document.getElementById('downBg');
            var showGuide = document.getElementById('showGuide');
	        showGuide.checked?setCookie('bigGuide',1,365):void(0);
	        downBg.setAttribute("datatype","b");
	        infoCon.style.display = 'none';
            //list.style.left=ft.offsetLeft+10+'px';
            list.style.left=evt.clientX+'px';
            list.style.top=evt.clientY+'px';
            //list.childNodes[1].style.width = ft.offsetWidth+'px';
            if(!list.style.display||list.style.display=='none'){
                list.style.display = 'block'
            }else{
                list.style.display = 'none'
            }
        }else{
            list.style.display = 'none';
            //console.log(evt)
        }
    };
};
function myBrowser(){
    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
    var isOpera = userAgent.indexOf("Opera") > -1;
    if (userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera) return "IE"; //判断是否IE浏览器
}
var mb = myBrowser();
if ("IE" == mb) {
	var warning = document.createElement("span");
	var warningText = document.createTextNode("本工具对IE10，及更早浏览器，存在或多或少的，不支持！");
	warning.appendChild(warningText);
	warning.className = 'info';
	warning.style.fontSize = Math.floor(body.offsetWidth / warning.innerText.length) + 'px';
	warning.style.color = 'red';
	warning.style.outline = '5px solid red';
	document.getElementById('infoCon').appendChild(warning);
	//alert("本工具对IE10，及更早浏览器，存在或多或少的，不支持！");
}
