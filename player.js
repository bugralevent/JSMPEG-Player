(function (window) { "use strict";
    var center = document.createElement("center");
    var player = window.player = function (jsmpegObj, data) {
        this.jsmpegObj = jsmpegObj;
        this.container = data.container;
        this.duration = data.pDuration;
        this.isPlaying = true;
        this.canvas = jsmpegObj.canvas;
        this.canvas.onclick = function () {
            window.player.statusChange();
        };
        this.container.appendChild(center);
        this.canvasComputedStyle = window.getComputedStyle(this.container,null);
        this.canvasHeight = this.canvasComputedStyle.getPropertyValue("height");
        this.canvasHeight = this.canvasHeight.substr(0,this.canvasHeight.length -2);
        this.canvasHeight += 40;
        var time = 0;
        var minutes = 0;
        var hours = 0;
        var seconds = 0;
        setInterval(function(){
            if(window.player.isPlaying === true){
                time += 1;
                hours = time / 3600;
                minutes = (time % 3600) / 60;
                seconds = time % 60;
                this.duration.textContent =  Math.floor(hours) + ":" + Math.floor(minutes) + ":" + seconds;
            }
        },1000);
    };
    player.prototype.statusChange = function(){
        this.isPlaying = !this.isPlaying;
        var text = document.createElement("a"); 
        var but = document.createElement("i");
        text.appendChild(but);
        text.className = "btn-floating btn-large waves-effect waves-light blue";
        text.style.marginTop = "-" + this.canvasHeight + "px";
        text.onclick = function(){
           window.player.statusChange(); 
        };
        if(this.isPlaying === false){
            text.firstChild.className = "mdi-av-play-circle-outline";
            center.appendChild(text);
            this.jsmpegObj.pause();
        }else{
            center.removeChild(center.firstChild);
            text.firstChild.className = "mdi-av-pause-circle-outline";
            text.firstChild.id = "button";
            center.appendChild(text);
            $("#button").animate({
               opacity: 0.0
            }, 1000, function(){
                center.removeChild(text);
            });
            this.jsmpegObj.play();
        }
    };
    player.prototype.play = function(){
       if(this.isPlaying === true){return;}
        this.statusChange();
    };
    player.prototype.pause = function(){
       if(this.isPlaying === false){return;}
       this.statusChange();
    };
    
})(window);