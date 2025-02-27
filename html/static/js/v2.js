/*
 * static.https://github.com/insoxin - v1.0.0  License By redy
 */
; !
function(window, undefined) {
    var Xclass = function(config) {
        var that = this;
        that.loseblur();
        that.ifmob = /Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent);
        var rand = Math.random().toString().split('.')[1];
        var mainid = 'xtiper_' + rand;
        that.mainid = mainid;
        config = that.namefix(config);
        that.c = config;
        if (config.model == 'close') {
            that.close(config.closeid);
            return false;
        }
        if (config.model == 'closeAll') {
            that.closeAll();
            return false;
        }
        that.creat();
    };
    Xclass.pt = Xclass.prototype;
    Xclass.pt.loseblur = function() {
        var button = document.getElementsByTagName('button');
        if (button.length > 0) {
            for (var i = 0; i < button.length; i++) {
                button[i].blur();
            }
        }
        var input = document.getElementsByTagName('input');
        if (input.length > 0) {
            for (var i = 0; i < input.length; i++) {
                input[i].blur();
            }
        }
    };
    Xclass.pt.creat = function() {
        var that = this;
        var c = that.c;
        var html = that.html();
        if (!html) {
            return false;
        }
        var body = document.body;
        var div = document.createElement('div');
        div.setAttribute('id', that.mainid);
        div.setAttribute('class', 'xtiper');
        div.innerHTML = html;
        body.appendChild(div);
        var xtipdiv = document.getElementById(that.mainid);
        that.xtipdiv = xtipdiv;
        that.attr();
        that.on();
        that.after();
    };
    Xclass.pt.namefix = function(c) {
        if (c.pos) {
            c.pos = c.pos.toLowerCase();
            if (c.pos == 't') {
                c.pos = 'top';
            } else if (c.pos == 'b') {
                c.pos = 'bottom';
            } else if (c.pos == 'l') {
                c.pos = 'left';
            } else if (c.pos == 'r') {
                c.pos = 'right';
            } else if (c.pos == 'm') {
                c.pos = 'middle';
            }
        }
        if (c.type) {
            c.type = c.type.toLowerCase();
            if (c.type == 'r') {
                c.type = 'ready';
            } else if (c.type == 'n') {
                c.type = 'noready';
            } else if (c.type == 'notready') {
                c.type = 'noready';
            } else if (c.type == 'u') {
                c.type = 'url';
            } else if (c.type == 'h') {
                c.type = 'html';
            } else if (c.type == 'p') {
                c.type = 'photo';
            } else if (c.type == 'w') {
                c.type = 'white';
            } else if (c.type == 'b') {
                c.type = 'black';
            } else if (c.type == 'a') {
                c.type = 'alert';
            } else if (c.type == 'c') {
                c.type = 'confirm';
            }
        }
        c.iconColor = '';
        if (c.icon) {
            if (typeof(c.icon) == 'object') {
                c.iconColor = c.icon[1];
                c.icon = c.icon[0];
            }
            c.icon = c.icon.toLowerCase();
            c.iconFlag = true;
            if (c.icon == 's') {
                c.icon = 'success';
            } else if (c.icon == 'e') {
                c.icon = 'error';
            } else if (c.icon == 'w') {
                c.icon = 'warning';
            } else if (c.icon == 'a') {
                c.icon = 'ask';
            } else if (c.icon == 'h') {
                c.icon = 'hello';
            }
            if (c.icon !== 'success' && c.icon !== 'error' && c.icon !== 'warning' && c.icon !== 'ask' && c.icon !== 'hello') {
                c.iconFlag = false;
            }
        }
        if (c.align) {
            c.align = c.align.toLowerCase();
            if (c.align == 'l') {
                c.align = 'left';
            } else if (c.align == 'c') {
                c.align = 'center';
            } else if (c.align == 'r') {
                c.align = 'right';
            }
        }
        return c;
    };
    Xclass.pt.html = function() {
        var that = this;
        var c = that.c;
        var xtipdiv = that.xtipdiv;
        var html = '';
        if (c.model == 'msg') {
            html += '<p>';
            if (c.icon) {
                html += c.iconFlag === true ? '<i class="xtiper_icon xtiper_icon_' + c.icon + ' xtiper_icon_min"></i>': '<img class="xtiper_icon xtiper_icon_min" src="' + c.icon + '" />';
            }
            html += c.tip + '</p>';
        } else if (c.model == 'danmu') {
            var danmuli = document.getElementsByClassName('xtiper_danmu');
            if (danmuli.length > 300) {
                return false;
            }
            html += '<p>';
            if (c.icon) {
                html += c.iconFlag === true ? '<i class="xtiper_icon xtiper_icon_' + c.icon + ' xtiper_icon_min"></i>': '<img class="xtiper_icon xtiper_icon_min" src="' + c.icon + '" />';
            }
            html += c.tip + '</p>';
        } else if (c.model == 'tips') {
            that.newelement = document.getElementById(c.element) || c.element;
            dataTips = that.dataset(that.newelement, 'xtips');
            if (dataTips) {
                return false;
            } else {
                that.dataset(that.newelement, 'xtips', 1);
            }
            if (c.bgcolor) {
                html += '<p style="background-color:' + c.bgcolor + ';' + (c.color ? ' color:' + c.color + ';"': '') + '">' + c.tip + '</p>';
            } else {
                html += '<p>' + c.tip + '</p>';
            }
            html += '<em style="background-color:' + c.bgcolor + ';"></em>';
        } else if (c.model == 'win') {
            if (c.type == 'alert') {
                c.btn = c.btn != null ? c.btn: ['确定'];
                c.btn1 = 1 == 2 ? null: function() {
                    return false;
                };
                c.btn2 = null;
                c.btn3 = null;
                c.btn4 = null;
            } else if (c.type == 'confirm') {
                c.btn = c.btn != null ? c.btn: ['确定', '取消'];
                c.btn1 = c.btn1 != null ? c.btn1: function() {
                    return false;
                };
                c.btn2 = c.btn2 != null ? c.btn2: null;
                c.btn3 = c.btn3 != null ? c.btn3: null;
                c.btn4 = c.btn4 != null ? c.btn4: null;
            }
            xtiper_con_icon = c.icon ? ' xtiper_con_icon': '';
            var btnclass = new Array();
            btnclass[0] = c.btn1 != null ? ' class="active"': '';
            btnclass[1] = c.btn2 != null ? ' class="active"': '';
            btnclass[2] = c.btn3 != null ? ' class="active"': '';
            btnclass[3] = c.btn4 != null ? ' class="active"': '';
            var btnfun = new Array();
            btnfun[0] = c.btn1 ? c.btn1: null;
            btnfun[1] = c.btn2 ? c.btn2: null;
            btnfun[2] = c.btn3 ? c.btn3: null;
            btnfun[3] = c.btn4 ? c.btn4: null;
            that.btnfun = btnfun;
            if (c.shade === true) {
                html += '<div class="xtiper_bg"></div>';
            }
            html += '<div class="xtiper_main"' + (c.width ? 'style="width:' + c.width + ';"': '') + '>';
            html += '<div class="xtiper_tit"><p>' + c.title + '</p><div class="xtiper_minmax">';
            if (c.min === true) {
                html += '<div class="xtiper_min"></div>';
            }
            html += '<div class="xtiper_close"></div>';
            html += '</div></div>';
            var iconer = that.iconer();
            html += '<div class="xtiper_pad"><div class="xtiper_pr"><div class="xtiper_tip">' + iconer + '<div class="xtiper_con' + xtiper_con_icon + '"><div class="xtiper_conin">' + c.tip;
            if (c.type == 'alert' && c.times > 0) {
                c.times++;
                html += '(<span class="xtiper_times">' + c.times + '</span>)';
            }
            html += '</div></div></div></div></div>';
            html += '<div class="xtiper_btn' + (c.icon && c.iconFlag === true ? ' xtiper_btn_' + c.icon: '') + ' xtiper_btn' + c.btn.length + '"><ul>';
            for (var i = 0; i < 4; i++) {
                if (c.btn[i]) {
                    html += '<li' + btnclass[i] + '><button' + (btnclass[i] && c.iconColor && c.type == 'confirm' ? ' style="background-color:' + c.iconColor + '"': '') + '>' + c.btn[i] + '</button></li>';
                }
            }
            html += '</ul><div class="xtiper_btnbor"' + (c.iconColor ? ' style="background-color:' + c.iconColor + '"': '') + '></div></div></div>';
        } else if (c.model == 'open') {
            if (c.width == '100%' && c.height == '100%') {
                c.max = false;
            }
            var width = that.getsize(c.width);
            var height = that.getsize(c.height) || ['', ''];
            if (height[1] == '%') {
                var bheight = window.innerHeight * height[0] / 100;
                height[0] = Math.round(bheight);
                height[1] = 'px';
            }
            var height_css = '';
            if (c.title) {
                height_css = ' xtit';
            } else {
                if (c.move === true) {
                    height_css = ' xmin';
                }
            }
            var newcontent;
            var xtiper_over = '';
            if (c.over === false) {
                xtiper_over = ' xtiper_over';
            }
            if (c.type == 'ready' || c.type == 'noready') {
                var fir = c.content.substr(0, 1),
                element,
                content,
                reg;
                if (fir == '#') {
                    element = document.getElementById(c.content.substr(1, c.content.length));
                } else if (fir == '.') {
                    element = document.getElementsByClassName(c.content.substr(1, c.content.length))[0];
                } else {
                    return false;
                }
                if (!element) {
                    return false;
                }
                if (c.type == 'ready') {
                    content = element.outerHTML;
                    reg = /\s+(id\=["'][A-z0-9_-]*["'])/g;
                    content = content.replace(reg, '');
                } else {
                    content = element.innerHTML;
                    reg = /\<\!\-{2}[\s\n]*([\S\s]*)[\s\n]*\-{2}\>/;
                    var match = content.match(reg);
                    if (!match || !match[1]) {
                        return false;
                    }
                    content = match[1];
                }
                newcontent = '<div class="xtiper_content' + xtiper_over + '' + height_css + '"' + (c.bgcolor ? ' style="background-color:' + c.bgcolor + '"': '') + '>' + content + '</div>';
            } else if (c.type == 'url') {
                var scrolling = 'auto';
                if (c.over === false) {
                    var scrolling = 'no';
                }
                newcontent = '<div class="xtiper_content' + height_css + ' xtiper_over"' + (c.bgcolor ? ' style="background-color:' + c.bgcolor + '"': '') + '><div class="zw"></div><iframe parentid="' + that.mainid + '" scrolling="' + scrolling + '" allowtransparency="true" frameborder="0" src="' + c.content + '" style="width:100%; height:100%;"></iframe></div>';
            } else if (c.type == 'html') {
                newcontent = '<div class="xtiper_content' + xtiper_over + '' + height_css + '"' + (c.bgcolor ? ' style="background-color:' + c.bgcolor + '"': '') + '>' + c.content + '</div>';
            } else if (c.type == 'photo') {
                var img = document.getElementsByTagName('img');
                if (img.length == 0) {
                    return false;
                }
                var photo = new Array();
                for (var i = 0; i < img.length; i++) {
                    if (that.dataset(img[i], 'xphoto') == c.content) {
                        photo.push(img[i]);
                    }
                }
                if (!photo || photo.length == 0) {
                    return false;
                }
                var li = '<div class="xtiper_photo_num"' + (c.color ? 'style="color:' + c.color + ';"': '') + '><span class="xtiper_words"></span><span class="xtiper_num">' + c.index + '</span> / ' + photo.length + '</div>';
                if (photo.length > 1) {
                    li += '<div class="xtiper_photo_btn xtiper_photo_prev"></div><div class="xtiper_photo_btn xtiper_photo_next"></div>';
                }
                li += '<div class="xtiper_photo_ul"><ul>';
                var xhref, xsrc;
                var xindex = c.index - 1;
                for (var i = 0; i < photo.length; i++) {
                    xhref = that.dataset(photo[i], 'xhref') ? that.dataset(photo[i], 'xhref') : '';
                    xsrc = that.dataset(photo[i], 'xsrc') ? that.dataset(photo[i], 'xsrc') : photo[i].src;
                    li += '<li class="xtiper_photo_li' + (i == xindex ? ' xon': '') + (that.ifmob === true ? ' xapp': '') + '" data-xtitle="' + photo[i].title + '"><p style="background-image:url(\'' + xsrc + '\');">' + (xhref ? '<a href="' + xhref + '" target="_blank">': '') + '<img src="' + xsrc + '">' + (xhref ? '</a>': '') + (i == xindex && that.ifmob === true ? '<span class="xtiper_icon xtiper_icon_load xtiper_photo_load"></span>': '') + '</p></li>';
                }
                li += '</ul></div>';
                newcontent = '<div class="xtiper_content' + xtiper_over + '' + height_css + '"' + (c.bgcolor ? ' style="background-color:' + c.bgcolor + '"': '') + '>' + li + '</div>';
            }
            if (c.shade === true) {
                html += '<div class="xtiper_bg"></div>';
            }
            if (c.app === true) {
                html += '<div class="xtiper_sheet' + (that.ifmob === true && c.type == 'photo' ? ' xapp': '') + '" style="height:' + height[0] + "" + height[1] + ';">';
                if (c.title) {
                    html += '<div class="xtiper_sheet_tit xtiper_sheet_left">' + c.title + '</div>';
                }
            } else {
                html += '<div class="xtiper_main' + (that.ifmob === true && c.type == 'photo' ? ' xapp': '') + '" style="width:' + width[0] + "" + width[1] + '; height:' + height[0] + "" + height[1] + ';">';
                if (c.title) {
                    html += '<div class="xtiper_tit' + (c.move === true ? '': ' xminmax') + '"><p>' + c.title + '</p><div class="xtiper_minmax">';
                    if (c.min === true) {
                        html += '<div class="xtiper_min"></div>';
                    }
                    if (c.max === true) {
                        html += '<div class="xtiper_max"></div>';
                    }
                    if (c.closeBtn === true) {
                        html += '<div class="xtiper_close"></div>';
                    }
                    html += '</div></div>';
                } else {
                    if (c.move === true) {
                        html += '<div class="xtiper_tit xtiper_tit_none"></div>';
                    }
                    if (c.closeBtn === true) {
                        html += '<div class="xtiper_close xtiper_close_notit"></div>';
                    };
                }
            }
            html += newcontent;
            html += '</div>';
        } else if (c.model == 'load') {
            html = '<div class="xtiper_bg xtiper_bg_white"></div><div class="xtiper_loadin"><div class="xtiper_icon xtiper_icon_load"></div>';
            if (c.tip) {
                html += '<span>' + c.tip + '</span>';
            }
            html += '</div>';
        } else if (c.model == 'sheet') {
            var btnfun = new Array();
            btnfun[0] = c.btn1 ? c.btn1: null;
            btnfun[1] = c.btn2 ? c.btn2: null;
            btnfun[2] = c.btn3 ? c.btn3: null;
            btnfun[3] = c.btn4 ? c.btn4: null;
            btnfun[4] = c.btn5 ? c.btn5: null;
            btnfun[5] = c.btn6 ? c.btn6: null;
            btnfun[6] = c.btn7 ? c.btn7: null;
            btnfun[7] = c.btn8 ? c.btn8: null;
            that.btnfun = btnfun;
            var align = 'xtiper_sheet_' + c.align;
            html += '<div class="xtiper_bg"></div><div class="xtiper_sheet">';
            if (c.title) {
                html += '<div class="xtiper_sheet_tit ' + align + '">' + c.title + '</div>';
            }
            html += '<ul class="xtiper_sheet_ul ' + align + '">';
            var licon, href, target;
            for (var i = 0; i < c.btn.length; i++) {
                if (btnfun[i]) {
                    if (typeof(btnfun[i]) == 'function') {
                        licon = '<p>' + c.btn[i] + '</p>';
                    } else {
                        if (typeof(btnfun[i]) == 'object') {
                            href = btnfun[i][0];
                            target = btnfun[i][1] ? btnfun[i][1] : '';
                            if (target && target.substr(0, 1) != '_') {
                                target = '_' + target;
                            }
                            target = ' target="' + target + '"';
                        } else {
                            href = btnfun[i];
                            target = '';
                        }
                        licon = '<a href="' + href + '"' + target + '><p>' + c.btn[i] + '</p></a>';
                    }
                } else {
                    licon = '<p>' + c.btn[i] + '</p>';
                }
                html += '<li class="xtiper_sheet_li">' + licon + '</li>';
            }
            if (!c.force) {
                html += '<li class="xtiper_sheet_li xlast"><p>' + c.btnClose + '</p></li>';
            }
            html += '</ul></div>';
        }
        return html;
    };
    Xclass.pt.iconer = function(css) {
        var that = this;
        var c = that.c;
        var html = '';
        if (c.icon) {
            if (c.iconFlag === true) {
                html = '<i class="xtiper_icon xtiper_icon_' + c.icon + ' ' + css + '"></i>';
            } else {
                html = '<img class="xtiper_icon ' + css + '" src="' + c.icon + '" />';
            }
        }
        return html;
    };
    Xclass.pt.dataset = function(element, datakey, dataval) {
        if (dataval == null) {
            return element.getAttribute('data-' + datakey);
        } else {
            element.setAttribute('data-' + datakey, dataval);
        }
    };
    Xclass.pt.attr = function() {
        var that = this;
        var c = that.c;
        var xtipdiv = that.xtipdiv;
        if (c.model == 'msg') {
            xtipdiv.classList.add('xtiper_msg');
            xtipdiv.classList.add('xtiper_msg_' + c.pos);
            xtipdiv.classList.add('xtiper_msg_' + c.type);
            xtipdiv.style.whiteSpace = 'nowrap';
            var xwidth = xtipdiv.offsetWidth;
            xwidth = xwidth / 2;
            xtipdiv.style.marginLeft = '-' + xwidth + 'px';
            xtipdiv.style.whiteSpace = '';
        } else if (c.model == 'danmu') {
            xtipdiv.classList.add('xtiper_msg');
            xtipdiv.classList.add('xtiper_msg_' + c.type);
            xtipdiv.classList.add('xtiper_danmu');
            function randomNum(n, m) {
                var rander = Math.round(Math.random() * (m - n)) + n;
                return rander;
            }
            var bheight = Math.round(window.innerHeight * 0.65);
            var danmuTop = randomNum(10, bheight);
            var bwidth = document.body.offsetWidth + 22;
            xtipdiv.style.transform = 'translate(' + bwidth + 'px)';
            xtipdiv.style.top = danmuTop + 'px';
            var danmuli = document.getElementsByClassName('xtiper_danmu');
            if (danmuli.length > 1) {
                if (c.light === true) {
                    xtipdiv.classList.add('xtiper_danmu_light');
                }
            }
        } else if (c.model == 'tips') {
            xtipdiv.classList.add('xtiper_tips');
            xtipdiv.classList.add('xtiper_tips_' + c.pos);
            xtipdiv.style.width = xtipdiv.offsetWidth + 'px';
            var newelement = document.getElementById(c.element) || c.element;
            var S = document.documentElement.scrollTop || document.body.scrollTop;
            var C = newelement.getBoundingClientRect();
            var W = newelement.offsetWidth;
            var H = newelement.offsetHeight;
            var dtop = S + C.top;
            var dleft = C.left;
            var B = 10;
            if (c.pos == 'left') {
                var selfWidth = xtipdiv.offsetWidth;
                dleft = dleft - selfWidth - B;
            } else if (c.pos == 'right') {
                dleft = dleft + W + B;
            } else if (c.pos == 'top') {
                var selfHeight = xtipdiv.offsetHeight;
                dtop = dtop - selfHeight - B;
            } else if (c.pos == 'bottom') {
                dtop = dtop + H + B;
            }
            xtipdiv.style.left = dleft + 'px';
            xtipdiv.style.top = dtop + 'px';
        } else if (c.model == 'win' || c.model == 'open') {
            xtipdiv.classList.add('xtiper_win');
            if (c.shade === true) {
                xtipdiv.classList.add('xtiper_win_fixed');
            }
            var maincss = c.app === true ? 'xtiper_sheet': 'xtiper_main';
            var xtiper_main = xtipdiv.getElementsByClassName(maincss)[0];
            var xtiper_tit = xtipdiv.getElementsByClassName('xtiper_tit')[0];
            if (c.min === true || c.max === true) {
                var xmcss = 'xmcss';
                var y = 0;
                if (c.min === true) {
                    y++;
                }
                if (c.max === true) {
                    y++;
                }
                xmcss = xmcss + y;
                if (xtiper_tit) {
                    xtiper_tit.classList.add(xmcss);
                }
            }
            var xleft, xtop;
            if (c.model == 'win') {
                xleft = (window.innerWidth - xtiper_main.offsetWidth) / 2 + 'px';
                xtop = (window.innerHeight - xtiper_main.offsetHeight) / 2 + 'px';
                xtiper_main.style.height = xtiper_main.offsetHeight + 'px';
                xtiper_main.style.left = xleft;
                xtiper_main.style.top = xtop;
            } else if (c.model == 'open') {
                if (c.type == 'ready') {
                    xtiper_main.getElementsByClassName('xtiper_content')[0].firstChild.style.display = '';
                }
                if (c.app === false) {
                    var width = that.getsize(c.width);
                    if (c.type == 'photo' && c.autoHeight === true) {
                        var xindex = c.index - 1;
                        var imgdiv = xtipdiv.getElementsByClassName('xtiper_photo_li')[xindex].getElementsByTagName('img')[0];
                        imgdiv.onload = function() {
                            var img = imgdiv.offsetHeight;
                            img = img + 100;
                            if (img > window.innerHeight) {
                                if (c.title) {
                                    img = window.innerHeight;
                                } else {
                                    img = window.innerHeight - 26;
                                }
                            }
                            xtop = (window.innerHeight - img) / 2;
                            xtop = c.y ? xtop + c.y: xtop;
                            xtop = xtop + 'px';
                            xtiper_main.style.height = img + 'px';
                            if (width[1] == '%') {
                                xleft = (100 - width[0]) / 2;
                                xleft = c.x ? xleft + c.x: xleft;
                                xleft = xleft + width[1];
                            } else {
                                xleft = (window.innerWidth - xtiper_main.offsetWidth) / 2;
                                xleft = c.x ? xleft + c.x: xleft;
                                xleft = xleft + 'px';
                            }
                            xtiper_main.style.left = xleft;
                            xtiper_main.style.top = xtop;
                        }
                    } else {
                        xtiper_main.style.height = xtiper_main.offsetHeight + 'px';
                        xtop = (window.innerHeight - xtiper_main.offsetHeight) / 2;
                        xtop = c.y ? xtop + c.y: xtop;
                        xtop = xtop + 'px';
                    }
                    if (width[1] == '%') {
                        xleft = (100 - width[0]) / 2;
                        xleft = c.x ? xleft + c.x: xleft;
                        xleft = xleft + width[1];
                    } else {
                        xleft = (window.innerWidth - xtiper_main.offsetWidth) / 2;
                        xleft = c.x ? xleft + c.x: xleft;
                        xleft = xleft + 'px';
                    }
                    xtiper_main.style.left = xleft;
                    xtiper_main.style.top = xtop;
                }
            }
            if (c.shade === false) {
                xtiper_main.style.position = 'fixed';
            }
        } else if (c.model == 'load') {
            xtipdiv.classList.add('xtiper_win');
            xtipdiv.classList.add('xtiper_win_fixed');
        } else if (c.model == 'sheet') {
            xtipdiv.classList.add('xtiper_win');
            xtipdiv.classList.add('xtiper_win_fixed');
        }
        if (c.zindex) {
            xtipdiv.style.zIndex = c.zindex;
        }
    };
    Xclass.pt.on = function() {
        var that = this;
        var c = that.c;
        var xtipdiv = that.xtipdiv;
        setTimeout(function() {
            xtipdiv.classList.add('xon');
        },
        1);
    };
    Xclass.pt.after = function() {
        var that = this;
        var c = that.c;
        var xtipdiv = that.xtipdiv;
        if (c.model == 'msg' || c.model == 'tips') {
            that.autoClose();
        } else if (c.model == 'danmu') {
            that.danmuStar();
            xtipdiv.addEventListener('mouseenter',
            function() {
                that.danmuStop();
            });
            xtipdiv.addEventListener('mouseleave',
            function() {
                that.danmuStar();
            });
        } else if (c.model == 'win' || c.model == 'open') {
            if (c.model == 'win') {
                var button = xtipdiv.getElementsByTagName('button');
                var btnfun = that.btnfun;
                for (var i = 0; i < 4; i++) {
                    that.bclick(button[i], btnfun[i], true);
                }
            }
            if (c.min) {
                var minbtn = xtipdiv.getElementsByClassName('xtiper_min')[0];
                if (minbtn) {
                    minbtn.addEventListener('click',
                    function() {
                        that.minmax('min');
                    });
                }
            }
            if (c.max) {
                var maxbtn = xtipdiv.getElementsByClassName('xtiper_max')[0];
                if (maxbtn) {
                    maxbtn.addEventListener('click',
                    function() {
                        that.minmax('max');
                    });
                }
            }
            if (c.move === true) {
                that.drag(true);
            }
            that.shade();
            that.key();
            if (c.model == 'win' && c.type == 'alert' && c.times > 0) {
                that.autoClose();
            }
            if (c.type == 'photo') {
                that.photo();
                var xindex = c.index - 1;
                var li = xtipdiv.getElementsByClassName('xtiper_photo_li')[xindex];
                var xtiper_words = xtipdiv.getElementsByClassName('xtiper_words')[0];
                xtiper_words.innerHTML = that.dataset(li, 'xtitle');
            }
        } else if (c.model == 'load') {
            that.autoClose();
        } else if (c.model == 'sheet') {
            that.shade();
            var btnfun = that.btnfun;
            var xtipdiv_appli = xtipdiv.getElementsByClassName('xtiper_sheet_li');
            var btnlen = xtipdiv_appli.length;
            if (!c.force) {
                btnlen = btnlen - 1;
            }
            for (var i = 0; i < btnlen; i++) {
                that.bclick(xtipdiv_appli[i], btnfun[i]);
            }
            if (!c.force) {
                xtipdiv_appli[btnlen].addEventListener('click',
                function() {
                    that.close();
                    if (c.end) {
                        c.end();
                        c.end = null;
                    }
                });
            }
        }
        that.lock();
    };
    Xclass.pt.ulli = function(li, aa, xx, yy, close) {
        var that = this;
        var xtipdiv = that.xtipdiv;
        var xtiper_content = xtipdiv.getElementsByClassName('xtiper_content')[0];
        var opacity;
        for (var i = 0; i < li.length; i++) {
            if (li[i].classList.contains('xon') === true) {
                if (aa == 'left') {
                    if (xx) {
                        li[i].style.left = xx + 'px';
                    } else {
                        li[i].style.left = '';
                    }
                } else {
                    li[i].style.left = xx + 'px';
                    li[i].style.top = yy + 'px';
                    opacity = 1 - ((yy / 4 * 3) / 120);
                    if (opacity < 0) {
                        opacity = 0;
                    }
                    xtiper_content.style.backgroundColor = 'rgba(0,0,0,' + opacity + ')';
                    if (close === true) {
                        if (yy > 120) {
                            that.close();
                        } else {
                            li[i].style.left = '';
                            li[i].style.top = '';
                            xtiper_content.style.backgroundColor = 'rgba(0,0,0,1)';
                        }
                    }
                }
            }
        }
    };
    Xclass.pt.photo = function() {
        var that = this;
        var c = that.c;
        var xtipdiv = that.xtipdiv;
        var ul = xtipdiv.getElementsByClassName('xtiper_photo_ul')[0];
        var li = xtipdiv.getElementsByClassName('xtiper_photo_li');
        var prev = xtipdiv.getElementsByClassName('xtiper_photo_prev')[0];
        var next = xtipdiv.getElementsByClassName('xtiper_photo_next')[0];
        if (prev && li.length > 1) {
            prev.addEventListener('click',
            function() {
                that.photoBtn('prev');
            });
        }
        if (next && li.length > 1) {
            next.addEventListener('click',
            function() {
                that.photoBtn('next');
            });
        }
        if (that.ifmob === true && li.length > 1) {
            var aa = null;
            var moveX1, moveX2, moveY1, moveY2, xx, yy;
            ul.addEventListener('touchstart',
            function(e) {
                moveX1 = e.changedTouches[0].pageX;
                moveY1 = e.changedTouches[0].pageY;
                that.touchmove(false);
            });
            ul.addEventListener('touchmove',
            function(e) {
                moveX2 = e.changedTouches[0].pageX;
                moveY2 = e.changedTouches[0].pageY;
                xx = moveX2 - moveX1;
                yy = moveY2 - moveY1;
                if (Math.abs(xx) > Math.abs(yy)) {
                    aa = aa ? aa: 'left';
                } else {
                    aa = aa ? aa: 'top';
                }
                that.ulli(li, aa, xx, yy);
            });
            ul.addEventListener('touchend',
            function(e) {
                if (moveX1 > moveX2) {
                    if ((moveX1 - moveX2 > 50) && aa == 'left') {
                        that.photoBtn('next');
                    }
                } else {
                    if ((moveX2 - moveX1 > 50) && aa == 'left') {
                        that.photoBtn('prev');
                    }
                }
                that.ulli(li, aa, '', yy, true);
                aa = null;
            });
            ul.addEventListener('click',
            function(e) {
                that.close();
            });
        } else {
            ul.addEventListener('touchstart',
            function(e) {
                return false;
            });
            ul.addEventListener('touchend',
            function(e) {
                return false;
            });
            ul.addEventListener('click',
            function(e) {
                return false;
            });
        }
    };
    Xclass.pt.photoBtn = function(type) {
        var that = this;
        var c = that.c;
        var xtipdiv = that.xtipdiv;
        var li = xtipdiv.getElementsByClassName('xtiper_photo_li');
        var xtiper_main = xtipdiv.getElementsByClassName('xtiper_main')[0];
        xtiper_main.classList.add('xtiper_main_photo');
        var index = 0,
        old = 0;
        for (var i = 0; i < li.length; i++) {
            if (li[i].classList.contains('xon') === true) {
                index = old = i;
            }
        }
        if (type == 'prev') {
            index--;
            if (index < 0) {
                index = li.length - 1;
            }
        } else if (type == 'next') {
            index++;
            if (index > li.length - 1) {
                index = 0;
            }
        }
        that.now = index;
        var xnum = index + 1;
        var xtiper_num = xtiper_main.getElementsByClassName('xtiper_num')[0];
        xtiper_num.innerHTML = xnum;
        var xtiper_words = xtiper_main.getElementsByClassName('xtiper_words')[0];
        var img;
        for (var i = 0; i < li.length; i++) {
            if (i == index) {
                li[i].classList.add('xon');
                xtiper_words.innerHTML = that.dataset(li[i], 'xtitle');
                xtiper_num.innerHTML = xnum;
                if (c.autoHeight === true) {
                    img = li[i].getElementsByTagName('img')[0].offsetHeight;
                    img = img + 100;
                    if (img > window.innerHeight) {
                        if (c.title) {
                            img = window.innerHeight;
                        } else {
                            img = window.innerHeight - 26;
                        }
                    }
                    xtiper_main.style.height = img + 'px';
                    xtiper_main.style.top = ((window.innerHeight - img) / 2) + 'px';
                }
            } else {
                li[i].classList.remove('xon');
            }
            if (i == old) {
                li[i].classList.add('xold_' + type);
            } else {
                li[i].classList.remove('xold_prev');
                li[i].classList.remove('xold_next');
            }
        }
        setTimeout(function() {
            li[old].classList.remove('xold_' + type);
            xtiper_main.classList.remove('xtiper_main_photo');
        },
        401);
    };
    Xclass.pt.appScroll = function(e) {
        e.preventDefault();
    };
    Xclass.pt.touchmove = function(type) {
        var that = this;
        if (type === false) {
            document.body.addEventListener('touchmove', that.appScroll, {
                passive: false
            });
        } else {
            document.body.removeEventListener('touchmove', that.appScroll, {
                passive: false
            });
        }
    };
    Xclass.pt.danmuStar = function() {
        var that = this;
        var c = that.c;
        var xtipdiv = that.xtipdiv;
        xtipdiv.classList.add('xtiper_danmu_animate');
        if (xtipdiv.style.animationDuration == '') {
            xtipdiv.style.animationDuration = '6s';
        }
        var danmutime = Number(xtipdiv.style.animationDuration.replace(/s/, ''));
        that.dataset(xtipdiv, 'xdanmu', danmutime);
        that.outtime = setTimeout(function() {
            that.close();
        },
        (danmutime * 1000) + 1);
    };
    Xclass.pt.danmuStop = function() {
        var that = this;
        var c = that.c;
        var xtipdiv = that.xtipdiv;
        var bwidth = document.body.offsetWidth + 22;
        var newtranslate = xtipdiv.getBoundingClientRect().left;
        xtipdiv.style.transform = 'translate(' + newtranslate + 'px)';
        if (that.outtime) {
            clearInterval(that.outtime);
            that.outtime = null;
        }
        var progress = newtranslate / bwidth;
        var lesstime = 6 * progress;
        if (lesstime < 0.2) {
            lesstime = 0.2;
        }
        that.dataset(xtipdiv, 'xdanmu', lesstime);
        xtipdiv.style.animationDuration = lesstime + 's';
        xtipdiv.classList.remove('xtiper_danmu_animate');
    };
    Xclass.pt.bclick = function(btn, fun, ifclose) {
        var that = this;
        if (btn) {
            if (fun && typeof(fun) == 'function') {
                btn.addEventListener('click',
                function() {
                    fun();
                    that.close();
                });
            } else {
                if (ifclose === true) {
                    btn.addEventListener('click',
                    function() {
                        that.close();
                    });
                }
            }
        }
    };
    Xclass.pt.autoClose = function() {
        var that = this;
        var c = that.c;
        var xtipdiv = that.xtipdiv;
        if (xtipdiv.getElementsByClassName('xtiper_times')[0]) {
            var times = c.times - 1;
            var i = times;
            var fn = function() {
                xtiper_times = xtipdiv.getElementsByClassName('xtiper_times')[0];
                xtiper_times.innerHTML = i;
                if (i <= 0) {
                    that.close();
                    clearInterval(that.timer);
                    that.timer = null;
                }
                i--;
            };
            that.timer = setInterval(fn, 1000);
            fn();
        } else {
            var times = c.times;
            if (times && times != 0) {
                setTimeout(function() {
                    that.close();
                },
                times * 1000);
            }
        }
    };
    Xclass.pt.lock = function() {
        var that = this;
        var c = that.c;
        var xtipdiv = that.xtipdiv;
        if (c.lock === true) {
            that.dataset(xtipdiv, 'xlock', 1);
            document.documentElement.style.overflowY = 'hidden';
            that.touchmove(false);
        }
    };
    Xclass.pt.unlock = function() {
        var that = this;
        var flag = 0;
        var winli = document.getElementsByClassName('xtiper_win');
        for (var i = 0; i < winli.length; i++) {
            if (that.dataset(winli[i], 'xlock') == 1) {
                flag++;
            }
        }
        if (flag <= 1) {
            document.documentElement.style.overflowY = '';
        }
    };
    Xclass.pt.minmax = function(mtype) {
        var that = this;
        var c = that.c;
        var xtipdiv = that.xtipdiv;
        var iftype, setwidth, setheight;
        if (mtype == 'min') {
            iftype = that.dataset(xtipdiv, 'xmin');
            setwidth = '190px';
            setheight = '40px';
        } else if (mtype == 'max') {
            iftype = that.dataset(xtipdiv, 'xmax');
            setwidth = '100%';
            setheight = '100%';
        }
        var xtiper_tit = xtipdiv.getElementsByClassName('xtiper_tit')[0];
        var xtiper_main = xtipdiv.getElementsByClassName('xtiper_main')[0];
        var xtiper_content = xtipdiv.getElementsByClassName('xtiper_content')[0];
        var minbtn = xtipdiv.getElementsByClassName('xtiper_min')[0];
        var maxbtn = xtipdiv.getElementsByClassName('xtiper_max')[0];
        if (iftype == 1) {
            xtiper_main.style.width = that.dataset(xtipdiv, 'xwidth');
            xtiper_main.style.height = that.dataset(xtipdiv, 'xheight');
            var data_width = xtiper_main.offsetWidth;
            var data_height = xtiper_main.offsetHeight;
            var xleft = (window.innerWidth - data_width) / 2;
            var xtop = (window.innerHeight - data_height) / 2;
            xtiper_main.style.left = xleft + 'px';
            xtiper_main.style.top = xtop + 'px';
            xtiper_tit.classList.remove('xminmax');
            xtiper_tit.classList.remove('xmin');
            xtiper_tit.getElementsByTagName('p')[0].setAttribute('title', '');
            that.dataset(xtipdiv, 'xmin', '');
            that.dataset(xtipdiv, 'xmax', '');
            that.dataset(xtipdiv, 'xwidth', '');
            that.dataset(xtipdiv, 'xheight', '');
            if (minbtn) {
                minbtn.classList.remove('xon');
                minbtn.style.display = '';
            }
            if (maxbtn) {
                maxbtn.classList.remove('xon');
                maxbtn.style.display = '';
            }
            that.drag(true);
        } else {
            that.dataset(xtipdiv, 'xwidth', xtiper_main.style.width);
            that.dataset(xtipdiv, 'xheight', xtiper_main.style.height);
            xtiper_main.style.width = setwidth;
            xtiper_main.style.height = setheight;
            xtiper_tit.classList.add('xminmax');
            if (mtype == 'min') {
                xtiper_tit.classList.add('xmin');
                xtiper_tit.getElementsByTagName('p')[0].setAttribute('title', xtiper_tit.getElementsByTagName('p')[0].innerHTML);
                that.dataset(xtipdiv, 'xmin', 1);
                xtiper_main.style.top = 'auto';
                xtiper_main.style.bottom = '0';
                xtiper_main.style.left = '0';
                minbtn.classList.add('xon');
                if (maxbtn) {
                    maxbtn.style.display = 'none';
                }
            } else if (mtype == 'max') {
                that.dataset(xtipdiv, 'xmax', 1);
                xtiper_main.style.top = '0';
                xtiper_main.style.left = '0';
                maxbtn.classList.add('xon');
                if (minbtn) {
                    minbtn.style.display = 'none';
                }
            }
            that.drag(false);
        }
    };
    Xclass.pt.drag = function(open) {
        var that = this;
        var c = that.c;
        var xtipdiv = that.xtipdiv;
        var drag = xtipdiv.getElementsByClassName('xtiper_tit')[0];
        if (!drag) {
            return false;
        }
        var drag_main = xtipdiv.getElementsByClassName('xtiper_main')[0];
        if (open === true) {
            drag.onmousedown = function(event) {
                var overX = drag_main.offsetWidth / 4 * 3;
                var overY = drag_main.offsetHeight / 4 * 3;
                drag_main.classList.add('xon');
                var event = event || window.event;
                var diffX = event.clientX - drag_main.offsetLeft;
                var diffY = event.clientY - drag_main.offsetTop;
                if (typeof drag_main.setCapture !== 'undefined') {
                    drag_main.setCapture();
                };
                document.onmousemove = function(event) {
                    var event = event || window.event;
                    var moveX = event.clientX - diffX;
                    var moveY = event.clientY - diffY;
                    if (moveX < -overX) {
                        moveX = -overX;
                    } else if (moveX > document.body.offsetWidth - drag_main.offsetWidth + overX) {
                        moveX = document.body.offsetWidth - drag_main.offsetWidth + overX;
                    }
                    if (moveY < 0) {
                        moveY = 0
                    } else if (moveY > window.innerHeight - drag_main.offsetHeight + overY) {
                        moveY = window.innerHeight - drag_main.offsetHeight + overY;
                    }
                    drag_main.style.left = moveX + 'px';
                    drag_main.style.top = moveY + 'px'
                };
                document.onmouseup = function(event) {
                    drag_main.classList.remove('xon');
                    this.onmousemove = null;
                    this.onmouseup = null;
                    if (typeof drag_main.releaseCapture != 'undefined') {
                        drag_main.releaseCapture();
                    }
                };
            };
        } else {
            drag.onmousedown = function(event) {
                return false;
                document.onmousemove = function(event) {
                    return false;
                };
                document.onmouseup = function(event) {
                    return false;
                };
            }
        }
    };
    Xclass.pt.shade = function() {
        var that = this;
        var c = that.c;
        var xtipdiv = that.xtipdiv;
        var close = xtipdiv.getElementsByClassName('xtiper_close')[0];
        if (close) {
            close.addEventListener('click',
            function() {
                that.close();
                if (c.end && typeof(c.end) == 'function') {
                    c.end();
                    c.end = null;
                }
            });
        }
        if (c.shadeClose) {
            var bg = xtipdiv.getElementsByClassName('xtiper_bg')[0];
            bg.addEventListener('click',
            function() {
                if (c.model == 'sheet' && c.force) {
                    xtip.msg(c.force);
                    return false;
                } else {
                    that.close();
                    if (c.end && typeof(c.end) == 'function') {
                        c.end();
                        c.end = null;
                    }
                }
            });
        }
    };
    Xclass.pt.key = function() {
        var that = this;
        var c = that.c;
        var xtipdiv = that.xtipdiv;
        document.onkeydown = function(event) {
            var e = event || window.event || arguments.callee.caller.arguments[0];
            if (e) {
                if (e.keyCode == 27) {
                    that.close();
                } else if (e.keyCode == 13) {
                    if (c.btn2 || c.btn3) {
                        return false;
                    }
                    that.close();
                    if (c.btn1 && typeof(c.btn1) == 'function') {
                        c.btn1();
                        c.btn1 = null;
                    }
                    return false;
                } else {
                    return e;
                }
            }
        };
    };
    Xclass.pt.close = function(closeid) {
        var that = this;
        var c = that.c;
        var checkLock = false;
        if (closeid) {
            var xtipdiv = document.getElementById(closeid);
            if (!xtipdiv) {
                return false;
            }
            if (that.dataset(xtipdiv, 'xlock') == 1) {
                checkLock = true;
            }
        } else {
            var xtipdiv = that.xtipdiv;
            if (c.lock === true) {
                checkLock = true;
            }
        }
        if (!xtipdiv) {
            return false;
        }
        var closenow = false;
        if (xtipdiv.classList.contains('xtiper_danmu') === true) {
            closenow = true;
        } else {
            closenow = false;
        }
        if (closenow === true) {
            var parent_xtipdiv = xtipdiv.parentNode;
            if (parent_xtipdiv) {
                parent_xtipdiv.removeChild(xtipdiv);
            }
        } else {
            xtipdiv.classList.remove('xon');
            setTimeout(function() {
                var parent_xtipdiv = xtipdiv.parentNode;
                if (parent_xtipdiv) {
                    parent_xtipdiv.removeChild(xtipdiv);
                }
            },
            201);
        }
        if (c.model == 'tips') {
            that.dataset(that.newelement, 'xtips', '');
        }
        if (checkLock === true) {
            that.unlock();
            that.touchmove(true);
        }
    };
    Xclass.pt.closeAll = function() {
        var that = this;
        var msgall = document.getElementsByClassName('xtiper');
        if (msgall.length <= 0) {
            return false;
        }
        for (var i = 0; i < msgall.length; i++) {
            that.close(msgall[i].getAttribute('id'));
        }
    };
    Xclass.pt.getsize = function(size) {
        if (size) {
            reg = /([0-9]+)(px|\%)/;
            size_arr = size.match(reg);
            arr = new Array();
            arr[0] = Number(size_arr[1]);
            arr[1] = size_arr[2];
            return arr;
        }
    };
    window.xtip = {
        ver: '2.5.5',
        msg: function(tip, config) {
            if (!tip) {
                return false;
            }
            config = config || {};
            var o = {};
            o.model = 'msg';
            o.tip = tip;
            o.times = config.times ? config.times: 2;
            o.type = config.type ? config.type: 'black';
            o.pos = config.pos ? config.pos: 'middle';
            o.icon = config.icon ? config.icon: '';
            o.zindex = config.zindex ? config.zindex: 99999;
            return (this.run(o));
        },
        danmu: function(tip, config) {
            if (!tip) {
                return false;
            }
            config = config || {};
            var o = {};
            o.model = 'danmu';
            o.tip = tip;
            o.type = config.type ? config.type: 'black';
            o.icon = config.icon ? config.icon: '';
            o.light = config.light != null ? config.light: false;
            o.zindex = config.zindex ? config.zindex: 99999;
            return (this.run(o));
        },
        tips: function(tip, element, config) {
            if (!tip || !element) {
                return false;
            }
            var o = {};
            o.model = 'tips';
            o.tip = tip;
            if (typeof(element) == 'string') {
                var fir = element.substr(0, 1);
                if (fir == '#') {
                    element = element.substr(1, element.length);
                }
            }
            o.element = element;
            o.bgcolor = config.bgcolor ? config.bgcolor: '#000000';
            if (config.color) {
                o.color = config.color;
            } else {
                var reg = /rgba\((255\,){3}[0-9.]+/;
                var rgba = reg.test(o.bgcolor);
                if (o.bgcolor == '#fff' || o.bgcolor == '#ffffff' || o.bgcolor == 'white' || o.bgcolor == 'rgb(255,255,255)' || o.bgcolor == 'rgba(255,255,255)' || rgba === true) {
                    o.color = '#333333';
                } else {
                    o.color = '#ffffff';
                }
            }
            o.times = config.times ? config.times: 2;
            o.pos = config.pos ? config.pos: 'right';
            o.zindex = config.zindex ? config.zindex: 99999;
            return (this.run(o));
        },
        alert: function(tip, icon, config) {
            config = config || {};
            var o = {};
            o.type = 'alert';
            o.tip = tip ? tip: '';
            o.icon = icon ? icon: '';
            o.title = config.title ? config.title: '提示';
            if (config.btn) {
                o.btn = typeof(config.btn) == 'string' ? [config.btn] : [config.btn[0]];
            } else {
                o.btn = ['确定'];
            }
            o.times = config.times ? config.times: 0;
            o.shade = config.shade != null ? config.shade: true;
            return (this.win(o));
        },
        confirm: function(tip, myfun, config) {
            config = config || {};
            var o = {};
            o.type = 'confirm';
            o.tip = tip ? tip: '';
            o.btn1 = myfun != null ? myfun: function() {
                return false;
            };
            o.icon = config.icon ? config.icon: 'warning';
            o.title = config.title ? config.title: '警告';
            o.btn = config.btn ? config.btn: ['确定', '取消'];
            o.shade = config.shade != null ? config.shade: true;
            return (this.win(o));
        },
        win: function(config) {
            if (!config) {
                return false;
            }
            var o = {};
            o.model = 'win';
            o.tip = config.tip ? config.tip: '';
            o.times = config.times ? config.times: 0;
            o.type = config.type ? config.type: 'confirm';
            o.icon = config.icon ? config.icon: '';
            o.title = config.title ? config.title: '提示';
            o.shade = config.shade != null ? config.shade: true;
            if (o.shade === true) {
                o.shadeClose = config.shadeClose != null ? config.shadeClose: true;
            } else {
                o.shadeClose = false;
            }
            o.lock = config.lock ? config.lock: false;
            o.btn = config.btn ? config.btn: null;
            o.btn1 = config.btn1 != null ? config.btn1: null;
            o.btn2 = config.btn2 != null ? config.btn2: null;
            o.btn3 = config.btn3 != null ? config.btn3: null;
            o.btn4 = config.btn4 != null ? config.btn4: null;
            o.width = config.width ? config.width: '';
            o.end = typeof(config.end) == 'function' ? config.end: null;
            o.min = config.min != null ? config.min: false;
            o.move = true;
            o.app = false;
            o.zindex = config.zindex ? config.zindex: 99999;
            return (this.run(o));
        },
        photo: function(content, config) {
            if (!content) {
                return false;
            }
            config = config || {};
            var o = {};
            o.type = 'photo';
            o.title = config.title ? config.title: '';
            o.autoHeight = config.height ? false: true;
            o.width = config.width ? config.width: '600px';
            o.height = config.height ? config.height: '400px';
            o.content = content;
            o.lock = true;
            o.index = config.index ? config.index: 1;
            return (this.open(o));
        },
        photoApp: function(content, index) {
            if (!content) {
                return false;
            }
            var o = {};
            o.type = 'photo';
            o.width = '100%';
            o.height = '100%';
            o.bgcolor = 'rgba(0,0,0,1)';
            o.title = false;
            o.move = false;
            o.shade = true;
            o.shadeClose = false;
            o.closeBtn = false;
            o.content = content;
            o.lock = true;
            o.index = index ? index: 1;
            return (this.open(o));
        },
        open: function(config) {
            if (!config == null || !config.type || !config.content) {
                return false;
            }
            var o = {};
            o.model = 'open';
            o.type = config.type;
            o.content = config.content;
            o.title = config.title ? config.title: '';
            if (config.autoHeight) {
                o.autoHeight = config.autoHeight;
            } else {
                o.autoHeight = config.height ? false: true;
            }
            o.width = config.width ? config.width: '600px';
            o.height = config.height ? config.height: '400px';
            o.x = config.x ? config.x: '';
            o.y = config.y ? config.y: '';
            o.x = sizef(o.x);
            o.y = sizef(o.y);
            function sizef(str) {
                if (str) {
                    if (!isNaN(str)) {
                        return Number(str);
                    } else {
                        var reg = /\-?[0-9\.]*(px|%)*/,
                        match, num;
                        if (str) {
                            match = str.match(reg);
                            if (!match[1] || (match[1] && match[1] == 'px')) {
                                match[0] = match[0].replace(/px/g, '');
                                num = Number(match[0]);
                            } else {
                                num = '';
                            }
                            return num;
                        }
                    }
                } else {
                    return '';
                }
            }
            o.bgcolor = config.bgcolor ? config.bgcolor: '';
            var reg = /rgba\((0\,){3}[0-9.]+/;
            var rgba = reg.test(o.bgcolor);
            if (o.bgcolor == '#000' || o.bgcolor == '#000000' || o.bgcolor == 'black' || o.bgcolor == 'rgb(0,0,0)' || o.bgcolor == 'rgba(0,0,0)' || rgba === true) {
                o.color = '#ffffff';
            } else {
                o.color = '';
            }
            o.shade = config.shade != null ? config.shade: true;
            if (o.shade === true) {
                o.shadeClose = config.shadeClose != null ? config.shadeClose: true;
            } else {
                o.shadeClose = false;
            }
            o.end = typeof(config.end) == 'function' ? config.end: null;
            o.min = config.min != null ? config.min: false;
            o.max = config.max != null ? config.max: false;
            o.closeBtn = config.closeBtn != null ? config.closeBtn: true;
            o.move = config.move != null ? config.move: true;
            o.lock = config.lock != null ? config.lock: false;
            o.over = config.over != null ? config.over: true;
            o.index = config.index ? config.index: 1;
            o.app = config.app != null ? config.app: false;
            if (o.app === true) {
                if (o.type == 'photo') {
                    return (this.photoApp(o.content, o.index));
                } else {
                    o.height = config.height ? config.height: '';
                    o.lock = true;
                    o.shade = true;
                    o.shadeClose = true;
                }
            }
            o.zindex = config.zindex ? config.zindex: 99999;
            return (this.run(o));
        },
        load: function(tip, config) {
            config = config || {};
            var o = {};
            o.model = 'load';
            o.tip = tip ? tip: '';
            o.times = config.times ? config.times: 0;
            o.lock = config.lock != null ? config.lock: false;
            o.zindex = config.zindex ? config.zindex: 99999;
            return (this.run(o));
        },
        sheet: function(config) {
            if (!config || !config.btn) {
                return false;
            }
            var o = {};
            o.model = 'sheet';
            o.title = config.title ? config.title: '';
            o.align = config.align ? config.align: 'center';
            var btn = new Array();
            for (var i = 0; i < 8; i++) {
                if (config.btn[i]) {
                    btn[i] = config.btn[i];
                }
            }
            o.btn = btn;
            o.btn1 = config.btn1 ? config.btn1: null;
            o.btn2 = config.btn2 ? config.btn2: null;
            o.btn3 = config.btn3 ? config.btn3: null;
            o.btn4 = config.btn4 ? config.btn4: null;
            o.btn5 = config.btn5 ? config.btn5: null;
            o.btn6 = config.btn6 ? config.btn6: null;
            o.btn7 = config.btn7 ? config.btn7: null;
            o.btn8 = config.btn8 ? config.btn8: null;
            o.force = config.force ? config.force: '';
            o.btnClose = config.btnClose ? config.btnClose: '取消';
            o.lock = true;
            o.shadeClose = true;
            o.end = typeof(config.end) == 'function' ? config.end: null;
            o.zindex = config.zindex ? config.zindex: 99999;
            return (this.run(o));
        },
        run: function(options) {
            var x = new Xclass(options);
            return x.mainid;
        },
        close: function(closeid) {
            var o = {};
            o.model = 'close';
            o.closeid = closeid;
            return (this.run(o));
        },
        closeAll: function() {
            var o = {};
            o.model = 'closeAll';
            return (this.run(o));
        },
    };
} (window);