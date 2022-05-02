let text, input, btn, idx, color;

function video() {
  let video = document.createElement("video");
  video.src = "video.mp4";
  document.body.appendChild(video);
  video.requestFullscreen();
  video.play();
  video.onended = function () {
    console.log(1);
    document.location = "?1";
  };
}

function generate_checker(secret) {
  secret = secret.map((s) => s.replace(/\s/g, ""));
  return () => {
    if (secret.includes(input.value.replace(/\s/g, ""))) {
      console.log("success");
      window.location = "?" + (idx + 1);
    } else {
      console.log("failed");
      input.style.color = "red";
      input.style.borderColor = "red";
    }
  };
}

let riddles = [
  {
    text: "Press enter to start",
    checker: video,
  },
  {
    text: "Summenformel",
    checker: generate_checker(["Cl + H3O", "Cl- + H3O+"]),
  },
  {
    text: "444",
    checker: generate_checker(["4.1", "4,1"]),
  },
  {
    text: "Filzstiftschublade",
    checker: generate_checker(["xxx"]),
  },
  {
    text: "Welche Farbe hat die Lösung in der Soxhletapparatur?",
    checker: generate_checker(["grün", "Grün"]),
  },
  {
    text: "537",
    checker: generate_checker([]),
  },
];

window.onload = function () {
  text = document.getElementById("text");
  input = document.getElementById("input");

  let url = new URL(window.location);
  idx = parseInt(url.search.substr(1));
  console.log("idx:", idx);
  if (isNaN(idx)) {
    document.location = "?0";
  }

  color = input.style.color;
  input.oninput = () => {
    input.style.color = color;
    input.style.borderColor = color;
  };

  text.innerHTML = riddles[idx].text;
  window.onkeydown = (e) => {
    if (e.key == "Enter") {
      // enter
      riddles[idx].checker();
    }
  };

  input.onblur = () => setTimeout(() => input.focus());
  input.focus();
};
