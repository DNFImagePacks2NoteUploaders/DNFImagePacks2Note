/**
 * Created by JS-3 on 2017/2/12.
 */
var body0 = document.getElementsByTagName('body')[0];
var wtable1 = document.getElementById('wtable');
var inputHelp = document.getElementById('inputHelp');
var guide = document.getElementById('guide');
var help = document.getElementById('help');
var ip2 = {ImagePacks2:[]};
var recentInput = [];
var recentBlurR;
var recentBlurD;

window.onresize = function(){
    guide.style.height = body0.offsetHeight-220+'px';
    wtable1.style.height = body0.offsetHeight-86+'px';
};


var checkNew = function(old,nev){
    var jo =old.ImagePacks2;
    var jn =nev.ImagePacks2;
    console.log('old长度'+jo.length);
    console.log('new长度'+jn.length);
    if(jo.length==jn.length){
        alert('新旧数据可能相同，几乎无需更新');
    }else{
        var r=confirm("新旧数据不同，是否搜索新增？？？");
        if (r==true){
            //alert("You pressed OK!");
            for(x in jo){
                for(y in jn){
                    if(jo[x][2] == jn[y][2]){
                        jn.splice(y,1)
                    }
                }
            }
            var str = '！！新增文件名：';
            for(x in jn){
                str+=jn[x][2] +'，';
                for(i=0;i<100;i++){
                    if(jn[x].length < jo[1].length){
                        jn[x].push('')
                    }else break
                }
                ip3.ImagePacks2.push(jn[x]);
            }
            alert(str);
            alert('！！新增项已添加至文档尾部，请注意保存');
            var c = check();
            wtable(ip3.ImagePacks2,c)
        }
    }
};
var startDownload = function (data, filename) {
    var blob = new Blob([data], { type: 'application/octet-stream' });
    var url = window.URL.createObjectURL(blob);
    var saveas = document.createElement('a');
    saveas.href = url;
    saveas.style.display = 'none';
    document.body.appendChild(saveas);
    saveas.download = filename;
    saveas.click();
    setTimeout(function () { saveas.parentNode.removeChild(saveas); }, 1000);
    document.addEventListener('unload', function () { window.URL.revokeObjectURL(url); });
};

window.addEventListener('load', function () {
    var upload = document.querySelector('#upload');
    upload.addEventListener('change', function () {
        var file = upload.files[0];
        var name = file.name;
        var reader = new FileReader();
        if (file.size > (1 << 24)) alert('error');
        else reader.addEventListener('load', function () {
            ip2.ImagePacks2 = [];
            var patt1 = /\d{4}.*?\.\w{3}/g;
            var names = this.result.match(patt1);
            var str = '';
            ip2.ImagePacks2[0]=['序号','日期','体积','文件名','时间戳'];
            for(i=0;i<names.length;i++){
                var pat = /\w.*?(?=\s)|\w.*?\.\w{3}/g;
                var part = names[i].match(pat);
                ip2.ImagePacks2[i+1]=[];
                ip2.ImagePacks2[i+1].push(part[0] + '/' + part[1]);
                ip2.ImagePacks2[i+1].push(parseInt(part[2].replace(/,/g,'')));
                ip2.ImagePacks2[i+1].push(part[3]);
                ip2.ImagePacks2[i+1].push(Date.parse(ip2.ImagePacks2[i+1][0]));
            }
            checkNew(ip3,ip2);
            str = JSON.stringify(ip2, null, 2);
            //document.getElementById('filecontent').innerText = str;
            //startDownload(str.replace(/ /g,''),name + '.json');
        });
        reader.readAsText(file);
        upload.value = '';
    });


});

window.addEventListener('click',function(evt){                                          //clicks
    if(evt.target.id == 'reload'){
        load()
    }else if(evt.target.tagName == 'LI'){       //快捷最近输入
        ip3.ImagePacks2[recentBlurR][recentBlurD] = evt.target.innerText;
        var c = check();
        wtable(ip3.ImagePacks2,c)
    }else if(evt.target.id == 'showHelp'){
        help.style.display='block'
    }else if(evt.target.id == 'help'){
        help.style.display='none'

    }else if(evt.target.tagName == 'TH'){
        var hinput =  document.createElement('input');
        hinput.value = evt.target.innerHTML;
        evt.target.innerHTML = '';
        evt.target.appendChild(hinput);
        hinput.focus();
        hinput.select();
        hinput.addEventListener('blur',function(){
            evt.target.innerHTML = hinput.value;
            ip3.ImagePacks2[0][evt.target.cellIndex] = hinput.value;
        });
        console.log(evt.target);
        console.log(evt.target.cellIndex);
        console.log(ip3.ImagePacks2[0][evt.target.cellIndex]);
    }else if(evt.target.id == 'save'){
        console.log(ip3.ImagePacks2[0][4]=Date.parse(Date()));
        startDownload(JSON.stringify(ip3, null, 2).replace(/ /g,''),'ImagePacks2'+Date.parse(Date())+'.json');
    }else if(evt.target.id == 'show'){
        wtable(ip3.ImagePacks2);
    }else if(evt.target.tagName == 'TD'){
        if(evt.target.className == 'solid'){                        //点击固定区以添加
            var new_tag = document.createElement('TD');
            var newInput = document.createElement('input');
            var num = evt.target.parentNode.firstChild.innerText;
            newInput.type = 'text';
            newInput.placeholder = '当前序号：' + num;
            newInput.addEventListener('focus',function(){
                //console.log(this.value||this.placeholder);
            });
            newInput.addEventListener('blur',function(){
                //console.log(this.value||this.placeholder);
                if(this.value){
                    for(x in ip3.ImagePacks2){
                        if(x == num){
                            ip3.ImagePacks2[x].push(this.value);
                        }else{
                            ip3.ImagePacks2[x].push('');
                        }
                        //console.log(ip3.ImagePacks2[x])
                    }
                }
                var c = check();
                wtable(ip3.ImagePacks2,c)
            });
            new_tag.appendChild(newInput);
            evt.target.parentNode.appendChild(new_tag);
        }else{                                                      //点击其他表格进入编辑模式
            var editInput = document.createElement('input');
            editInput.addEventListener('blur',function(){
                recentInput.push(this.value);
                this.parentNode.innerText = this.value;
                var row3 = evt.target.parentNode.firstChild.innerText;
                var table3 = document.getElementById('active_table');
                ip3.ImagePacks2[row3][--evt.target.cellIndex] = table3.rows[row3].cells[evt.target.cellIndex].innerHTML;
                recentBlurR =row3;
                recentBlurD =--evt.target.cellIndex;
            });
            editInput.value = evt.target.innerText;
            evt.target.innerText = '';
            evt.target.appendChild(editInput);
            editInput.focus();
            editInput.select();
                                                    //进入编辑模式之后弹出最近输入项
            inputHelp.style.left=evt.clientX+'px';
            inputHelp.style.top=evt.clientY+32+'px';
            var str = '隐藏 ';
            var tmp = {};
            for(x in recentInput){
                if(!tmp[recentInput[x]]){
                    str += '<li>'+recentInput[x]+'</li>';
                    tmp[recentInput[x]]=1
                }
            }
            inputHelp.innerHTML = str;
            inputHelp.style.display='block';
        }
    }else if(evt.target.id == 'inputHelp'){
        inputHelp.style.display='none';
    }
});
var check = function(){
    t1 = document.getElementById('active_table');
    var th = t1.firstChild.firstChild.childNodes;
    //console.log('表格大小'+t1.offsetWidth);
    //console.log('容器大小'+wtable1.offsetWidth);
    if(t1.offsetWidth > wtable1.offsetWidth){
        console.log('表格大小>容器大小，表格将被缩略');
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
var wtable = function(json,c){
    var str='<table id="active_table"><thead><tr>';
    var sort = 0;
    var sort_list = [];
    for(x in json[0]){
        if(json[0][x] == '职业/类别'){
            sort = x-1;
            str = str + '<th id="filter">' + json[0][x] + '</th>';
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
                        str = str + '<td class="hide solid">' + json[x][y] + '</td>'
                    }else if(y!=3&&y<4){
                        str = str + '<td class="solid">' + json[x][y] + '</td>'
                    }else{
                        str = str + '<td>' + json[x][y] + '</td>'
                    }
                    break;
                case 2:
                    if(y == 3||y==1){
                        str = str + '<td class="hide solid">' + json[x][y] + '</td>'
                    }else if(y!=3&&y!=1&&y<4){
                        str = str + '<td class="solid">' + json[x][y] + '</td>'
                    }else{
                        str = str + '<td>' + json[x][y] + '</td>'
                    }
                    break;
                case 3:
                    if(y == 3||y==1||y==0){
                        str = str + '<td class="hide solid">' + json[x][y] + '</td>'
                    }else if(y!=3&&y!=1&&y!=0&&y<4){
                        str = str + '<td class="solid">' + json[x][y] + '</td>'
                    }else{
                        str = str + '<td>' + json[x][y] + '</td>'
                    }
                    break;
                case 4:
                    if(y == 3||y==1||y==0){
                        str = str + '<td class="hide solid">' + json[x][y] + '</td>'
                    }else if(y!=3&&y!=1&&y!=0&&y<4){
                        str = str + '<td class="solid">' + json[x][y] + '</td>'
                    }else{
                        str = str + '<td>' + json[x][y] + '</td>'
                    }
                    break;
                default:
                    if(y<4){
                        str = str + '<td class="solid">' + json[x][y] + '</td>'
                    }else{
                        str = str + '<td>' + json[x][y] + '</td>'
                    }
            }
        }
        str = str + '</tr>';
    }
    str = str + '</tbody></table>';
    //wlist(sort_list);
    wtable1.innerHTML = str;
    wtable1.style.height = body0.offsetHeight-86+'px';
};

var load = function(){
    console.log('load');
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
            var c = check();
            wtable(ip3.ImagePacks2,c);
        }
    };
    xmlhttp.open("GET","ImagePacks2.json?t=" + Math.random(),true);            //which file
    xmlhttp.send();

    body0.style.fontSize = '16px';
    guide.style.height = body0.offsetHeight-220+'px';
    wtable1.style.height = body0.offsetHeight-86+'px';

};
load();