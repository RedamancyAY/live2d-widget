import fa_comment from "@fortawesome/fontawesome-free/svgs/solid/comment.svg";
import fa_paper_plane from "@fortawesome/fontawesome-free/svgs/solid/paper-plane.svg";
import fa_user_circle from "@fortawesome/fontawesome-free/svgs/solid/circle-user.svg";
import fa_street_view from "@fortawesome/fontawesome-free/svgs/solid/street-view.svg";
import fa_camera_retro from "@fortawesome/fontawesome-free/svgs/solid/camera-retro.svg";
import fa_info_circle from "@fortawesome/fontawesome-free/svgs/solid/circle-info.svg";
import fa_xmark from "@fortawesome/fontawesome-free/svgs/solid/xmark.svg";
import fa_left from "@fortawesome/fontawesome-free/svgs/solid/angle-left.svg";
import fa_right from "@fortawesome/fontawesome-free/svgs/solid/angle-right.svg";
import showMessage from "./message.js";

function showHitokoto() {
    // 增加 hitokoto.cn 的 API
    fetch("https://v1.hitokoto.cn")
        .then(response => response.json())
        .then(result => {
            const text = `这句一言来自 <span>「${result.from}」</span>，是 <span>${result.creator}</span> 在 hitokoto.cn 投稿的。`;
            showMessage(result.hitokoto, 6000, 9);
            setTimeout(() => {
                showMessage(text, 4000, 9);
            }, 6000);
        });
}

const tools = {
    "hitokoto": {
        icon: fa_comment,
        callback: showHitokoto
    },
    "asteroids": {
        icon: fa_paper_plane,
        callback: () => {
            if (window.Asteroids) {
                if (!window.ASTEROIDSPLAYERS) window.ASTEROIDSPLAYERS = [];
                window.ASTEROIDSPLAYERS.push(new Asteroids());
            } else {
                const script = document.createElement("script");
                script.src = "https://fastly.jsdelivr.net/gh/stevenjoezhang/asteroids/asteroids.js";
                document.head.appendChild(script);
            }
        }
    },
    "switch-model": {
        icon: fa_user_circle,
        callback: () => {}
    },
    "switch-texture": {
        icon: fa_street_view,
        callback: () => {}
    },
    "photo": {
        icon: fa_camera_retro,
        callback: () => {
            showMessage("照好了嘛，是不是很可爱呢？", 6000, 9);
            Live2D.captureName = "photo.png";
            Live2D.captureFrame = true;
        }
    },
    "info": {
        icon: fa_info_circle,
        callback: () => {
            open("https://github.com/stevenjoezhang/live2d-widget");
        }
    },
    "quit": {
        icon: fa_xmark,
        callback: () => {
            localStorage.setItem("waifu-display", Date.now());
            showMessage("愿你有一天能与重要的人重逢。", 2000, 11);
            document.getElementById("waifu").style.bottom = "-500px";
            setTimeout(() => {
                document.getElementById("waifu").style.display = "none";
                document.getElementById("waifu-toggle").classList.add("waifu-toggle-active");
            }, 3000);
        }
    },
    "left": {
        icon: fa_right,
        callback: () => { // 切换看板娘位置（左 => 右）
			localStorage.setItem("Live2DPlace", "right");
			showMessage("耶，可以去右边了呢～。", 2000, 11);
			document.getElementById("waifu").style.bottom = "-500px";
			document.getElementById("waifu-toggle").style.display = "none";
			setTimeout(() => {
				document.getElementById("live2d_css").href = live2d_path + "waifu_right.css";
				document.getElementById("waifu").style.bottom = "0px";
				document.getElementById("waifu-tool-left").style.display = "none";
				document.getElementById("waifu-tool-right").style.display = "block";
			}, 3000);
			setTimeout('document.getElementById("waifu-toggle").style.display = "inline"',6000);
		}
    },
    "right": {
        icon: fa_left,
        callback: () => { // 切换看板娘位置（左 <= 右）
			localStorage.setItem("Live2DPlace", "left");
			showMessage("耶，可以去左边了呢～。", 2000, 11);
			document.getElementById("waifu").style.bottom = "-500px";
			document.getElementById("waifu-toggle").style.display = "none";
			setTimeout(() => {
				document.getElementById("live2d_css").href = live2d_path + "waifu_left.css";
				document.getElementById("waifu").style.bottom = "0px";
				document.getElementById("waifu-tool-left").style.display = "block";
				document.getElementById("waifu-tool-right").style.display = "none";
			}, 3000);
			setTimeout('document.getElementById("waifu-toggle").style.display = "inline"',6000);
		}
    },
};

export default tools;
