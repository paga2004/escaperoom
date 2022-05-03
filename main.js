// DON'T LOOK AT THE CODE

const hash = function (str, seed = 0) {
  str = str.toString();
  let h1 = 0xdeadbeef ^ seed,
    h2 = 0x41c6ce57 ^ seed;
  for (let i = 0, ch; i < str.length; i++) {
    ch = str.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  h1 =
    Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^
    Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 =
    Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^
    Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  return 4294967296 * (2097151 & h2) + (h1 >>> 0);
};

let text, input, btn, idx, color;

function video() {
  let video = document.createElement("video");
  video.src = "video.mp4";
  document.body.appendChild(video);
  video.requestFullscreen();
  video.play();
  video.onended = function () {
    document.location = "?" + hash(1);
  };
}

function generate_checker(secret) {
  secret = secret.map((s) => s.replace(/\s/g, ""));
  return () => {
    if (secret.includes(input.value.replace(/\s/g, ""))) {
      console.log("success");
      window.location = "?" + hash(idx + 1);
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
    checker: generate_checker(["16", "17", "18", "16ml", "17ml", "18ml"]),
  },
  {
    text: "Welche Farbe hat die Lösung in der Soxhletapparatur?",
    checker: generate_checker(["grün", "Grün"]),
  },
  {
    text: "537",
    checker: generate_checker([]),
  },
  {
    text: "nope",
    checker: generate_checker([]),
  },
];

window.onload = function () {
  text = document.getElementById("text");
  input = document.getElementById("input");

  let url = new URL(window.location);
  h = url.search.substr(1);
  if (h === "") idx = 0;
  else {
    idx = riddles.length - 1;
    for (let i = 0; i < riddles.length; i++) {
      if (hash(i) == h) {
        idx = i;
        break;
      }
    }
  }
  console.log("idx:", idx);

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

  input.focus();
};
