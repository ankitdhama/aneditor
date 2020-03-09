(function() {
    this.editor = function() {
        this.master_container;
        this.editor_container = document.createElement("div");
        this.add_heading_btn = document.createElement("li");
        this.heading_ctrls = {};
        this.add_paragraph_btn = document.createElement("li");
        this.add_image_btn = document.createElement("li");
        this.upload_image_label = document.createElement("label");
        this.upload_image_file_ctrl = document.createElement("input");
        this.upload_image_file_ctrl.setAttribute("type", "file");
        
        this.ul_comps = document.createElement("ul");
        this.li_remove = document.createElement("li");

        this.add_video_btn = document.createElement("li");
        this.add_code_btn = document.createElement("li");
        this.editor_components = document.createElement("div");
        this.ctrl_validation_flags = {};
        
        this.focused_elems_ctrls = document.createElement("div");
        this.remove_ele_ctrl = document.createElement("button");
        this.focused_element = {};
        
        this.output_obj = {};
        
        var defaults = {
            output_counter: 1,
            headings: ["h1", "h2", "h3", "h4", "h5", "h6"],
            code_languages: ["html", "css", "javascript", "typescript", "python", "java", "c", "c#", "php", "perl", "dart", "sql", "other"]
        };
        
        //EXTEND DEFAULTS
        if (arguments[0] && typeof arguments[0] === "object") {
            this.options = extendDefaults(defaults, arguments[0]);
            this.master_container = document.getElementById(this.options.container);
        } else {
            console.error("Enter id where editor will be built");
            return false;
        }
        
        function extendDefaults(source, properties) {
            var property;
            for (property in properties) {
                if (properties.hasOwnProperty(property)) {
                    source[property] = properties[property];
                }
            }
            return source;
        }
        
        build_controls.call(this);
        apply_events.call(this);

        create_editor_comp_ctrls.call(this);
        apply_events_comp_ctrls.call(this);
    }
    
    function build_controls() {
        var isCustomCtrl = false;
        if (typeof this.options.show_controls != "undefined") {
            isCustomCtrl = true;
        }
        
        this.editor_container.classList.add("__editor_container");
        
        this.editor_components.classList.add("__editor_components");
        this.editor_container.appendChild(this.editor_components);
        
        //CREATE <UL> tag
        var ctrls_ul = document.createElement("ul");
        ctrls_ul.classList.add("__add_ctrls");
        
        if (isCustomCtrl && this.options.show_controls.indexOf("heading") != -1 || !isCustomCtrl) {
            this.add_heading_btn.innerHTML = '<span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M4 15h16v-2H4v2zm0 4h16v-2H4v2zm0-8h16V9H4v2zm0-6v2h16V5H4z"/></svg>Heading</span>';
            this.add_heading_btn.classList.add("has_dropdown");
            
            //BUILD DROPDOWN CONTROLS
            var heading_list_dom = create_heading_ctrls.call(this);
            this.add_heading_btn.appendChild(heading_list_dom);
            
            ctrls_ul.appendChild(this.add_heading_btn);
        }
        
        if (isCustomCtrl && this.options.show_controls.indexOf("paragraph") != -1 || !isCustomCtrl) {
            this.add_paragraph_btn.innerHTML = '<span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M16 4H4c-1.1 0-2 .9-2 2v12.01c0 1.1.9 1.99 2 1.99h16c1.1 0 2-.9 2-2v-8l-6-6zM4 18.01V6h11v5h5v7.01H4z"/></svg>Paragraph</span>';
            ctrls_ul.appendChild(this.add_paragraph_btn);
        }
        
        if (isCustomCtrl && this.options.show_controls.indexOf("image") != -1 || !isCustomCtrl) {
            this.upload_image_label.innerHTML = '<span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M18 20H4V6h9V4H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-9h-2v9zm-7.79-3.17l-1.96-2.36L5.5 18h11l-3.54-4.71zM20 4V1h-2v3h-3c.01.01 0 2 0 2h3v2.99c.01.01 2 0 2 0V6h3V4h-3z"/></svg>Image</span>';
            this.upload_image_label.appendChild(this.upload_image_file_ctrl);
            this.add_image_btn.appendChild(this.upload_image_label);
            ctrls_ul.appendChild(this.add_image_btn);
        }
        
        if (isCustomCtrl && this.options.show_controls.indexOf("video") != -1 || !isCustomCtrl) {
            this.add_video_btn.innerHTML = '<span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4zM15 16H5V8h10v8zm-6-1h2v-2h2v-2h-2V9H9v2H7v2h2z"/></svg>Video</span>';
            ctrls_ul.appendChild(this.add_video_btn);
        }
        
        if (isCustomCtrl && this.options.show_controls.indexOf("code") != -1 || !isCustomCtrl) {
            this.add_code_btn.innerHTML = '<span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/></svg>Code</span>';
            ctrls_ul.appendChild(this.add_code_btn);
        }

        //MAKE FOCUSED ELEMENT OPTIONS
        this.remove_ele_ctrl.textContent = "&times;";
        this.focused_elems_ctrls.appendChild(this.remove_ele_ctrl);
        
        this.editor_container.appendChild(ctrls_ul);
        
        this.master_container.appendChild(this.editor_container);
    }
    
    function create_heading_ctrls(heading_arr) {
       var hd_ul = document.createElement("ul");
       hd_ul.classList.add("dropdown");
       
       for (var i = 0; i < this.options.headings.length; i++) {
          var hd_li = document.createElement("li");
          hd_li.textContent = this.options.headings[i];
          hd_li.setAttribute("data-heading-type", this.options.headings[i]);
          
          this.heading_ctrls[this.options.headings[i]] = hd_li;
          hd_ul.appendChild(hd_li);
       }
       
       return hd_ul;
    }
    
    //ADD PARAGRAPH INTO EDITOR
    function add_paragraph(_this) {
        var _uuid = Math.random().toString(36).substring(2, 15) + _this.options.output_counter;
        _this.options.output_counter += 1;
        
        //CREATE NEW PARAGRAPH ELEMENT
        var paragraph_ele = document.createElement("p");
        paragraph_ele.setAttribute("contenteditable", "true");
        paragraph_ele.setAttribute("class", "__paragraph __placeholder");
        console.log(paragraph_ele.innerHTML);
        paragraph_ele.innerHTML = "";
        
        _this.output_obj[_uuid] = paragraph_ele;
       
        paragraph_ele.addEventListener("keypress", function(e) {
            //ADD NEW <P> ELEMENT
            if (e.which == '13' && paragraph_ele.textContent.trim() !== "") {
                add_paragraph(_this);
                disable_enter_key(e);
            } else {
                disable_enter_key(e);
            }
        });
       
        paragraph_ele.addEventListener("keyup", function(e) {
            if (e.target.textContent.trim() != "") {
                e.target.classList.remove("__placeholder");
            } else {
                e.target.classList.add("__placeholder");
            }
        });

        paragraph_ele.addEventListener("paste", function (e) {
            e.preventDefault();
            var text = (e.originalEvent || e).clipboardData.getData('text/plain');
            document.execCommand("insertText", false, text);
        });

        paragraph_ele.addEventListener("focus", function() {
            position_comp_ctrls(_this, paragraph_ele, _uuid);
        });
        
        // _this.editor_components.append(paragraph_ele);
        update_editor_components.call(_this);
        paragraph_ele.focus();
    }
    
    function add_heading(heading_type, _this) {
        var _uuid = Math.random().toString(36).substring(2, 15) + _this.options.output_counter;
        _this.options.output_counter += 1;
        
        //CREATE NEW HEADING ELEMENT
        var hding_ele = document.createElement(heading_type);
        hding_ele.setAttribute("contenteditable", "true");
        hding_ele.setAttribute("class", "__heading __placeholder");
        
        _this.output_obj[_uuid] = hding_ele;
        
        hding_ele.addEventListener("keypress", function(e) {
            disable_enter_key(e);
        });
        
        hding_ele.addEventListener("keyup", function(e) {
            if (e.target.textContent.trim() != "") {
            e.target.classList.remove("__placeholder");
            } else {
            e.target.classList.add("__placeholder");
            }
        });

        hding_ele.addEventListener("focus", function() {
            position_comp_ctrls(_this, hding_ele, _uuid);
        });
        
        update_editor_components.call(_this);
        hding_ele.focus();
    }

    function create_uuid(op_counter) {
        return Math.random().toString(36).substring(2, 15) + op_counter;
    }

    function add_image(_this, image_url) {
        var _uuid = create_uuid(_this.options.output_counter);
        _this.options.output_counter += 1;

        //CREATE NEW DIV ELEMENT AND INSIDE IT IMG ELEMENT
        var div_ele = document.createElement("div");
        div_ele.classList.add("img_panel")
        var img_ele = document.createElement("img");
        img_ele.setAttribute("src", image_url);
        div_ele.appendChild(img_ele);

        div_ele.addEventListener("click", function() {
            position_comp_ctrls(_this, div_ele, _uuid);
        });
        
        _this.output_obj[_uuid] = div_ele;
        update_editor_components.call(_this);
    }

    function calculate_offset(el) {
        var rect = el.getBoundingClientRect(),
        scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
        scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
    }
    
    function position_comp_ctrls(_this, e, uuid) {
        var position = calculate_offset(e);
        _this.ul_comps.style["top"] = (position.top - 30) + "px";
        _this.ul_comps.style["left"] = position.left + "px";
        _this.ul_comps.classList.remove("__hide");

        //SET ATTRIBUTES
        _this.li_remove.setAttribute("data-uuid", uuid);
    }
    
    function apply_events() {
        var _this = this;
        
        //ADD EVENTS ON HEADING CONTROLS
        for (var hdName in this.heading_ctrls ) {
            this.heading_ctrls[hdName].addEventListener("click", function() {
                var headingType = this.getAttribute("data-heading-type");
                add_heading(headingType, _this);
            });
        }
        
        this.add_paragraph_btn.addEventListener("click", function() {
            add_paragraph(_this);
        });
        
        this.upload_image_file_ctrl.addEventListener("change", function(e) {
            //SEND XHR REQUEST
            var data = new FormData();
            data.append('media', e.target.files[0]);

            var xhr = new XMLHttpRequest();
            xhr.open('POST', _this.options.file_upload_url, true);
            xhr.setRequestHeader('authtoken', '79D45B0D-990F-4517-B676-8DF835CECDBF');
            xhr.onload = function () {
                if (this.responseText !== "") {
                    var response = JSON.parse(this.responseText);
                    if (response.media_link) {
                        add_image(_this, response.media_link);
                    } else {
                        alert("Error while uploading media");
                    }
                }
            };
            xhr.send(data);
        });
        
        this.add_video_btn.addEventListener("click", function() {
            console.log("add video");
        });
        
        this.add_code_btn.addEventListener("click", function() {
            var _uuid = Math.random().toString(36).substring(2, 15) + _this.options.output_counter;
            _this.options.output_counter += 1;
            
            //CREATE NEW CODE ELEMENT
            var pre_ele = document.createElement("pre"),
            code_ele = document.createElement("code");
            
            var select_error_msg = document.createElement("span");
            select_error_msg.classList.add("__comp_error");
            select_error_msg.textContent = "Please select code language";
            
            var select_wrapper = document.createElement("span");
            select_wrapper.classList.add("__lang_selection_wrapper");
            
            var lang_select_ele = document.createElement("select");
            lang_select_ele.setAttribute("id", "select-ctrl-" + _uuid);
            lang_select_ele.classList.add("__lang_selection_ctrl");
            _this.options.code_languages.unshift("select language");
            _this.options.code_languages.forEach(function(item, index) {
                var option_ele = document.createElement("option");
                option_ele.textContent = item;
                (index === 0) ? option_ele.setAttribute("value", "") : option_ele.setAttribute("value", item);
                lang_select_ele.appendChild(option_ele);
            });
            
            //ADD ONCHANGE EVENT ON SELECT ELEMENT
            lang_select_ele.addEventListener("change", function() {
                if (this.value != '') {
                    _this.ctrl_validation_flags[_uuid] = true;
                    select_error_msg.style.display = "none";
                } else {
                    _this.ctrl_validation_flags[_uuid] = false;
                    select_error_msg.style.display = "block";
                }
            });

            select_wrapper.appendChild(lang_select_ele);
            select_wrapper.appendChild(select_error_msg);
            pre_ele.appendChild(select_wrapper);
            
            lang_select_ele.addEventListener("change", function() {
                code_ele.setAttribute("data-style-class", this.value);
            });
            
            code_ele.setAttribute("contenteditable", "true");
            code_ele.setAttribute("class", "__code __placeholder");
            
            _this.output_obj[_uuid] = code_ele;
            _this.ctrl_validation_flags[_uuid] = false;
            
            code_ele.addEventListener("keyup", function(e) {
                if (e.target.textContent.trim() != "") {
                    e.target.classList.remove("__placeholder");
                } else {
                    e.target.classList.add("__placeholder");
                }
            });
            
            code_ele.addEventListener("paste", function (e) {
                e.preventDefault();
                var text = (e.originalEvent || e).clipboardData.getData('text/plain');
                document.execCommand("insertText", false, text);
            });

            code_ele.addEventListener("focus", function() {
                position_comp_ctrls(_this, code_ele, _uuid);
            });
            
            pre_ele.appendChild(code_ele);
            _this.editor_components.append(pre_ele);
            code_ele.focus();
        });
    }
    
    function disable_enter_key(event) {
        if (event.which == '13') {
            event.preventDefault();
        }
    }

    function update_editor_components() {
        var _childNodes = this.editor_components.childNodes;

        for (var i = 0; i < _childNodes.length; i++) {
            this.editor_components.removeChild(_childNodes[i]);
        }
        
        for (var uuid in this.output_obj) {
            this.editor_components.appendChild(this.output_obj[uuid]);
        }
    }

    function delete_component(_this, uuid) {
        delete _this.output_obj[uuid];
        update_editor_components.call(_this);
        _this.ul_comps.classList.add("__hide");
    }

    function create_editor_comp_ctrls() {
        this.ul_comps.classList.add("__hide");
        this.ul_comps.classList.add("__editor_comp_ctrls");

        this.li_remove.innerHTML = "Remove";
        this.ul_comps.appendChild(this.li_remove);
        
        this.editor_container.appendChild(this.ul_comps);
    }

    function apply_events_comp_ctrls() {
        var _this = this;
        this.li_remove.addEventListener("click", function(e) {
            var _uuid = e.target.getAttribute("data-uuid");
            delete_component(_this, _uuid);
        });
    }
    
    editor.prototype.get_html = function () {
        var op_str = "";
        for (var op_key in this.output_obj) {
            if (this.output_obj.hasOwnProperty(op_key)) {
                var domObj = this.output_obj[op_key];
                var tagName = domObj.localName;
                var addedClassName = domObj.getAttribute("data-style-class");
                
                if (domObj.innerText.trim() != "") {
                    op_str += (tagName == 'code') ? '<pre>' : '';
                    op_str += (addedClassName != null) ? '<' + tagName + ' class="language-'+ addedClassName +'">' : '<' + tagName + '>';
                    op_str += domObj.innerText;
                    op_str += '</' + tagName + '>';
                    op_str += (tagName == 'code') ? '</pre>' : '';
                }

                if (tagName === 'div' && domObj.className === 'img_panel') {
                    op_str += domObj.outerHTML;
                }
            }
        }
        return op_str;
    }

    editor.prototype.set_html = function(htmlStr) {
        
    }

    editor.prototype.clear = function() {
        for (var op_key in this.output_obj) {
            if (this.output_obj.hasOwnProperty(op_key)) {
                this.output_obj[op_key].remove();
            }
        }
        this.editor_components.innerHTML = '';
        this.output_obj = {};
    }
}());
 
var editor = new editor({
    "container": "editor",
    "show_controls": ["heading", "paragraph", "image", "code"],
    "headings": ["h2", "h3", "h4", "h5"],
    "file_upload_url": "http://localhost/devsheet/app/api/v2/upload/media.php"
});