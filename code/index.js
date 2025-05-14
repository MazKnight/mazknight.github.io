const apiKey = "AIzaSyCXeIVV5NU_TBeNnRH3esC3huLHNiGBpTQ"
const channelId = "UCaVHUa2B7cJG_24daxCijxA"
const tabbyPacID = 133874906;

const accessToken = "vczc3lg13rbkxxif4umiv4z1skcji9";
const clientId = "kmw7r66tr2hfg0drht2u5ve0pbhuvn";
const url = "https://api.twitch.tv/helix/search/channels?query=tabbypac&live_only=true&first=1";
const parent = "mazknight.github.io"

async function fetchVideos() {
    try {

        running = true
        const res = await fetch(`https://www.googleapis.com/youtube/v3/search?key=${apiKey}&part=snippet&channelId=${channelId}&type=video&maxResults=50&order=date`)

        if (!res.ok) {
            throw new Error(`HTTP error: ${res.status}`)
        }

        const data = await res.json();

        var videoId = "";
        

        for (let index = 0; index < 50; index++) {
            var res1 = await fetch(`https://www.googleapis.com/youtube/v3/videos?key=${apiKey}&part=snippet,contentDetails,statistics&id=${data["items"][index]["id"]["videoId"]}`);

            var data1 = await res1.json();
            var duration = data1["items"]["0"]["contentDetails"]["duration"]

            duration = getTime(duration)
            if (duration > 180) {
                videoId = data["items"][index]["id"]["videoId"]
                break
            }

        }

        var player = document.getElementById("player")

        player.setAttribute("src", `https://www.youtube.com/embed/${videoId}`)

        getLiveStatus()

    
    }
    catch (error) {
        console.log(error);
        
    }
}

function getTime(value) {
    var temp = []

        for (let i = 0; i < value.length; i++) {
            temp.push(value[i])
        }
        temp.splice(0,2)

        // var duration = 0;
        var minutes = "0";
        var seconds = "0";
        
        var letterInTemp = false
        for (let i = 0; i < temp.length; i++) {
            if (temp[i] == "M") {
                letterInTemp = true
            } 
        }

        if (letterInTemp) {
            for (let i = 0; i < temp.findIndex(function temp(arg) {if (arg == "M") {return true} else {return false}}); i++) {
                minutes += temp[i]
            }
            temp.splice(0,temp.findIndex(function temp(arg) {if (arg == "M") {return true} else {return false}}) + 1)

        }

        var letterInTemp = false
        for (let i = 0; i < temp.length; i++) {
            if (temp[i] == "S") {
                letterInTemp = true
            } 
        }
        
        if (letterInTemp) {
            for (let i = 0; i < temp.findIndex(function temp(arg) {if (arg == "S") {return true} else {return false}}); i++) {
                seconds += temp[i]
            }
            temp.splice(0,temp.findIndex(function temp(arg) {if (arg == "S") {return true} else {return false}}) + 1)

        }

        return parseInt(minutes) * 60 + parseInt(seconds)
}

async function getLiveStatus() {
    

    const res = await fetch(url, {
    headers: {
        'Authorization': 'Bearer ' + accessToken,
        'Client-Id': clientId
    }
    })

    
    
    var result = await res.json()
    if (result["data"]["0"]["id"] == tabbyPacID || true) {

        var player = document.getElementById("player")
        player.remove()
        
        var width = (window.innerWidth / 100) * 40
        var height = (window.innerHeight / 100) * 40
        
        var options = {
            width: width,
            height: height,
            channel: "astralspiff",
        };
        var player = new Twitch.Player("twitchPlayer", options);
        player.setVolume(0.5);
        player.setMuted(false);
    }
}

// getLiveStatus()

var temp = {"access_token":"vczc3lg13rbkxxif4umiv4z1skcji9","expires_in":5449226,"token_type":"bearer"};

