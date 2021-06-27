// var i = localStorage.getItem("idx");

// 1. Search 
var input = document.querySelector(".js-submit");
input.addEventListener('click', function(e){
    var inputData = document.querySelector(".js-search").value;
    console.log(inputData);
    SoundCloudApi.getSongs(inputData);
})

// 2. Call api for text

var SoundCloudApi = {};

SoundCloudApi.init = function(){
  
  SC.initialize({
      client_id: 'cd9be64eeb32d1741c17cb39e41d254d'
  });

}
SoundCloudApi.init();

SoundCloudApi.getSongs = function(data){
    console.log(data);
    SoundCloudApi.init();
  // find all sounds of buskers licensed under 'creative commons share alike'
    SC.get('/tracks', {
      q: data
    }).then(function(tracks) {
      SoundCloudApi.renderSongs(tracks);
    });
  
}

// 3. Display cards in body

SoundCloudApi.renderSongs = function(tracks){
    var searchResults = document.querySelector(".js-search-results");
    searchResults.innerHTML = "";

    tracks.forEach(track => {
        var card = document.createElement('div');
        card.classList.add("card");
        document.body.appendChild(card);

        var imageDiv = document.createElement("div");
        imageDiv.classList.add("image");

        var image = document.createElement("img");
        image.classList.add("image_img");
        image.src = track.artwork_url || "http://lorempixel.com/100/100/abstract/";

        imageDiv.appendChild(image);

        card.appendChild(imageDiv);

        var content = document.createElement("div");
        content.classList.add("content");

        var header = document.createElement("div");
        header.classList.add("header");

        var a = document.createElement("a");
        a.href = track.permalink_url;
        a.target = "_blank";
        a.innerHTML = track.title;

        header.appendChild(a);

        content.appendChild(header);

        card.appendChild(content);

        var btn = document.createElement("div");
        btn.classList.add("ui", "bottom", "attached", "button", "js-button");
        btn.addEventListener('click', function(){
            console.log("Play Clicked");
            SoundCloudApi.addToPlaylist(track.permalink_url);
        })


        var i = document.createElement("i");
        i.classList.add("add", "icon");

        var span = document.createElement("span");
        span.innerHTML = "Add to playlist";

        btn.appendChild(i);
        btn.appendChild(span);

        card.appendChild(btn);

        searchResults.appendChild(card);
    });

    

}



// 4. Display cards in playlist
SoundCloudApi.addToPlaylist = function(song){
  console.log("inside addto playlist ");
  SC.oEmbed(song, {
        auto_play: true
    }).then(function(embed){
        var leftbar = document.querySelector(".js-playlist");
        var box = document.createElement("div")
        var className = "container" + String(i++);
        // localStorage.setItem("idx", i);
        box.classList.add(className);

        var inner = document.createElement("div");
        inner.classList.add("inner");
        inner.innerHTML = embed.html;
        
        var rmv = document.createElement("a");
        rmv.classList.add("rmvbtn","ui", "bottom", "attached", "button", "js-button");
        rmv.innerHTML = "Remove This Song";
        rmv.addEventListener("click", function(){
            var b = rmv.parentElement;
            b.remove();
            // localStorage.setItem("key", leftbar.innerHTML)
        });

        box.appendChild(inner);
        box.appendChild(rmv);

        leftbar.insertBefore(box, leftbar.firstChild);
        // localStorage.setItem("key", leftbar.innerHTML)
    });

}

// var leftbar = document.querySelector(".js-playlist");
// var playlist = localStorage.getItem("key");
// leftbar.innerHTML = playlist;

var rmv = document.querySelector(".rmvbtn");
if(rmv !== null){
  rmv.addEventListener("click", function(e){
    var del = e.path[1];
    console.log(del);
    del.remove();
    // localStorage.setItem("key", leftbar.innerHTML);
    location.reload();
  });
}

function myfunc(e){
    e.remove();
}
