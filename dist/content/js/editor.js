!function(){function e(t,e){var n=Math.random().toString(36).substring(2,15)+e.options.output_counter;e.options.output_counter+=1;var i=document.createElement(t);i.setAttribute("contenteditable","true"),i.setAttribute("class","__heading __placeholder"),(e.output_obj[n]=i).addEventListener("keypress",function(t){o(t)}),i.addEventListener("keyup",function(t){""!=t.target.textContent.trim()?t.target.classList.remove("__placeholder"):t.target.classList.add("__placeholder"),console.log(e.output_obj)}),i.addEventListener("focus",function(){console.log("ele is focused")}),e.editor_components.append(i),i.focus()}function o(t){"13"==t.which&&t.preventDefault()}this.editor=function(){this.master_container,this.editor_container=document.createElement("div"),this.add_heading_btn=document.createElement("li"),this.heading_ctrls={},this.add_paragraph_btn=document.createElement("li"),this.add_image_btn=document.createElement("li"),this.add_video_btn=document.createElement("li"),this.add_code_btn=document.createElement("li"),this.editor_components=document.createElement("div"),this.ctrl_validation_flags={},this.focused_elems_ctrls=document.createElement("div"),this.remove_ele_ctrl=document.createElement("button"),this.focused_element={},this.output_obj={};if(!arguments[0]||"object"!=typeof arguments[0])return console.error("Enter id where editor will be built"),!1;this.options=function(t,e){var n;for(n in e)e.hasOwnProperty(n)&&(t[n]=e[n]);return t}({output_counter:1,headings:["h1","h2","h3","h4","h5","h6"],code_languages:["html","css","javascript","typescript","python","java","c","c#","php","perl","dart","sql","other"]},arguments[0]),this.master_container=document.getElementById(this.options.container),function(){var t=!1;void 0!==this.options.show_controls&&(t=!0);this.editor_container.classList.add("__editor_container"),this.editor_components.classList.add("__editor_components"),this.editor_container.appendChild(this.editor_components);var e=document.createElement("ul");if(e.classList.add("__add_ctrls"),t&&-1!=this.options.show_controls.indexOf("heading")||!t){this.add_heading_btn.innerHTML='<span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M4 15h16v-2H4v2zm0 4h16v-2H4v2zm0-8h16V9H4v2zm0-6v2h16V5H4z"/></svg>Heading</span>',this.add_heading_btn.classList.add("has_dropdown");var n=function(t){var e=document.createElement("ul");e.classList.add("dropdown");for(var n=0;n<this.options.headings.length;n++){var i=document.createElement("li");i.textContent=this.options.headings[n],i.setAttribute("data-heading-type",this.options.headings[n]),this.heading_ctrls[this.options.headings[n]]=i,e.appendChild(i)}return e}.call(this);this.add_heading_btn.appendChild(n),e.appendChild(this.add_heading_btn)}(t&&-1!=this.options.show_controls.indexOf("paragraph")||!t)&&(this.add_paragraph_btn.innerHTML='<span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M16 4H4c-1.1 0-2 .9-2 2v12.01c0 1.1.9 1.99 2 1.99h16c1.1 0 2-.9 2-2v-8l-6-6zM4 18.01V6h11v5h5v7.01H4z"/></svg>Paragraph</span>',e.appendChild(this.add_paragraph_btn));(t&&-1!=this.options.show_controls.indexOf("image")||!t)&&(this.add_image_btn.innerHTML='<span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M18 20H4V6h9V4H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-9h-2v9zm-7.79-3.17l-1.96-2.36L5.5 18h11l-3.54-4.71zM20 4V1h-2v3h-3c.01.01 0 2 0 2h3v2.99c.01.01 2 0 2 0V6h3V4h-3z"/></svg>Image</span>',e.appendChild(this.add_image_btn));(t&&-1!=this.options.show_controls.indexOf("video")||!t)&&(this.add_video_btn.innerHTML='<span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4zM15 16H5V8h10v8zm-6-1h2v-2h2v-2h-2V9H9v2H7v2h2z"/></svg>Video</span>',e.appendChild(this.add_video_btn));(t&&-1!=this.options.show_controls.indexOf("code")||!t)&&(this.add_code_btn.innerHTML='<span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/></svg>Code</span>',e.appendChild(this.add_code_btn));this.remove_ele_ctrl.textContent="&times;",this.focused_elems_ctrls.appendChild(this.remove_ele_ctrl),this.editor_container.appendChild(e),this.master_container.appendChild(this.editor_container)}.call(this),function(){var s=this;for(var t in this.heading_ctrls)this.heading_ctrls[t].addEventListener("click",function(){e(this.getAttribute("data-heading-type"),s)});this.add_paragraph_btn.addEventListener("click",function(){!function e(n){var t=Math.random().toString(36).substring(2,15)+n.options.output_counter;n.options.output_counter+=1;var i=document.createElement("p");i.setAttribute("contenteditable","true");i.setAttribute("class","__paragraph __placeholder");console.log(i.innerHTML);i.innerHTML="";n.output_obj[t]=i;i.addEventListener("keypress",function(t){"13"==t.which&&""!==i.textContent.trim()&&e(n),o(t)});i.addEventListener("keyup",function(t){""!=t.target.textContent.trim()?t.target.classList.remove("__placeholder"):t.target.classList.add("__placeholder"),console.log(n.output_obj)});i.addEventListener("paste",function(t){t.preventDefault();var e=(t.originalEvent||t).clipboardData.getData("text/plain");document.execCommand("insertText",!1,e)});n.editor_components.append(i);i.focus()}(s)}),this.add_image_btn.addEventListener("click",function(){console.log("add image")}),this.add_video_btn.addEventListener("click",function(){console.log("add video")}),this.add_code_btn.addEventListener("click",function(){var t=Math.random().toString(36).substring(2,15)+s.options.output_counter;s.options.output_counter+=1;var e=document.createElement("pre"),n=document.createElement("code"),i=document.createElement("span");i.classList.add("__comp_error"),i.textContent="Please select code language";var o=document.createElement("span");o.classList.add("__lang_selection_wrapper");var a=document.createElement("select");a.setAttribute("id","select-ctrl-"+t),a.classList.add("__lang_selection_ctrl"),s.options.code_languages.unshift("select language"),s.options.code_languages.forEach(function(t,e){var n=document.createElement("option");n.textContent=t,0===e?n.setAttribute("value",""):n.setAttribute("value",t),a.appendChild(n)}),a.addEventListener("change",function(){""!=this.value?(s.ctrl_validation_flags[t]=!0,i.style.display="none"):(s.ctrl_validation_flags[t]=!1,i.style.display="block")}),o.appendChild(a),o.appendChild(i),e.appendChild(o),a.addEventListener("change",function(){n.setAttribute("data-style-class",this.value)}),n.setAttribute("contenteditable","true"),n.setAttribute("class","__code __placeholder"),s.output_obj[t]=n,s.ctrl_validation_flags[t]=!1,n.addEventListener("keyup",function(t){""!=t.target.textContent.trim()?t.target.classList.remove("__placeholder"):t.target.classList.add("__placeholder")}),n.addEventListener("paste",function(t){t.preventDefault();var e=(t.originalEvent||t).clipboardData.getData("text/plain");document.execCommand("insertText",!1,e)}),e.appendChild(n),s.editor_components.append(e),n.focus()})}.call(this)},editor.prototype.get_html=function(){var t="";for(var e in this.output_obj)if(this.output_obj.hasOwnProperty(e)){var n=this.output_obj[e],i=n.localName,o=n.getAttribute("data-style-class");""!=n.innerText.trim()&&(t+="code"==i?"<pre>":"",t+=null!=o?"<"+i+' class="language-'+o+'">':"<"+i+">",t+=n.innerText,t+="</"+i+">",t+="code"==i?"</pre>":"")}return t},editor.prototype.clear=function(){for(var t in this.output_obj)this.output_obj.hasOwnProperty(t)&&this.output_obj[t].remove();this.editor_components.innerHTML="",this.output_obj={}}}();var editor=new editor({container:"editor",show_controls:["heading","paragraph","image","video","code"]});