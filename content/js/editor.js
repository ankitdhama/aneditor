(function() {
    this.editor = function() {
        this.master_container;
        this.editor_container = document.createElement("div");
        this.add_heading_btn = document.createElement("li");
        this.heading_ctrls = {};
        this.add_paragraph_btn = document.createElement("li");
        this.add_image_btn = document.createElement("li");
        this.add_video_btn = document.createElement("li");
        this.add_code_btn = document.createElement("li");
        this.editor_components = document.createElement("div");

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
            this.add_image_btn.innerHTML = '<span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M18 20H4V6h9V4H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-9h-2v9zm-7.79-3.17l-1.96-2.36L5.5 18h11l-3.54-4.71zM20 4V1h-2v3h-3c.01.01 0 2 0 2h3v2.99c.01.01 2 0 2 0V6h3V4h-3z"/></svg>Image</span>';
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
            console.log(_this.output_obj);
        });
       
        _this.editor_components.append(paragraph_ele);
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
            console.log(_this.output_obj);
        });

        hding_ele.addEventListener("focus", function() {
            console.log("ele is focused");
        });
        
        _this.editor_components.append(hding_ele);
        hding_ele.focus();
    }

    function calculate_offset(el) {
        var rect = el.getBoundingClientRect(),
        scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
        scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
    }

    function position_focused_ctrls() {
        
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
        
        this.add_image_btn.addEventListener("click", function() {
            console.log("add image");
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
            
            //CREATE SELECT ELEMENT FOR CODE LANGUAGE SELECTION
            var lang_select_ele = document.createElement("select");
            _this.options.code_languages.unshift("select language");
            _this.options.code_languages.forEach(function(item, index) {
                var option_ele = document.createElement("option");
                option_ele.textContent = item;
                (index === 0) ? option_ele.setAttribute("value", "") : option_ele.setAttribute("value", item);
                lang_select_ele.appendChild(option_ele);
            });

            pre_ele.appendChild(lang_select_ele);
            lang_select_ele.addEventListener("change", function() {
                code_ele.setAttribute("data-code-class", this.value);
            });
                
            code_ele.setAttribute("contenteditable", "true");
            code_ele.setAttribute("class", "__code __placeholder");
            
            _this.output_obj[_uuid] = code_ele;
            
            code_ele.addEventListener("keyup", function(e) {
                if (e.target.textContent.trim() != "") {
                    e.target.classList.remove("__placeholder");
                } else {
                    e.target.classList.add("__placeholder");
                }
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
 }());
 
 var editor = new editor({
    "container": "editor",
    "show_controls": ["heading", "paragraph", "image", "video", "code"]
 });
 
 