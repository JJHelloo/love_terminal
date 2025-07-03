const terminal = document.getElementById("terminal");

const bootLines = [
  "love@terminal:~$ booting loveOS v1.0",
  "love@terminal:~$ compiling feelings",
  "love@terminal:~$ running love_script.sh",
  "\n> Enter a number (1-5) to unlock a message"
];

const loveMessages = [
  {
    id: 1,
    text: "1. You stuck with me when I was down",
    extra: "\u27a4 You never gave up on me when I didn’t even believe in myself."
  },
  {
    id: 2,
    text: "2. You make me laugh even when I’m grumpy",
    extra: "\u27a4 No matter how mad I am, you always crack me up like a goof."
  },
  {
    id: 3,
    text: "3. You’re hot and also somehow weird, in the best way",
    extra: "\u27a4 It's like dating a model with gremlin energy. I love it."
  },
  {
    id: 4,
    text: "4. You supported me when things were rough",
    extra: "\u27a4 You didn’t just say you had my back — you *showed* me."
  },
  {
    id: 5,
    text: "5. You’re my favorite person to annoy",
    extra: "\u27a4 I literally don’t get tired of you. You’re stuck with me forever."
  }
];

let bootIndex = 0;
let revealedMessages = new Set();

function bootSequence() {
  if (bootIndex < bootLines.length) {
    typeLine(bootLines[bootIndex], () => {
      bootIndex++;
      setTimeout(bootSequence, 500);
    });
  } else {
    setTimeout(showPrompt, 500);
  }
}

function typeLine(text, callback) {
  const line = document.createElement("div");
  terminal.appendChild(line);
  let i = 0;
  const interval = setInterval(() => {
    line.textContent += text[i];
    i++;
    if (i >= text.length) {
      clearInterval(interval);
      if (callback) callback();
    }
  }, 40);
}

function showPrompt() {
  const inputLine = document.createElement("div");
  const inputId = `cmdInput_${Date.now()}`;
  inputLine.innerHTML = `<span>love@terminal:~$ </span><input id="${inputId}" type="text" autocomplete="off" style="background: transparent; border: none; color:rgb(255, 255, 255); outline: none; font-family: inherit; width: 80px;">`;
  terminal.appendChild(inputLine);

  const input = document.getElementById(inputId);
  setTimeout(() => input.focus(), 50);

  input.addEventListener("keydown", event => {
    if (event.key === "Enter") {
      const val = parseInt(input.value);
      input.disabled = true;
      handleCommand(val);
    }
  });
}

function handleCommand(val) {
  const message = loveMessages.find(m => m.id === val);
  if (!message || revealedMessages.has(val)) {
    typeLine(`> Invalid or already viewed. Try a number 1-5.`, showPrompt);
    return;
  }

  revealedMessages.add(val);
  typeLine(`> ${message.text}`, () => {
    setTimeout(() => {
      typeLine(`  ${message.extra}`, () => {
        displayHeartBar(revealedMessages.size);
        if (revealedMessages.size === loveMessages.length) {
          setTimeout(showFinalMessage, 1000);
        } else {
          showPrompt();
        }
      });
    }, 500);
  });
}

function displayHeartBar(count) {
  const total = loveMessages.length;
  const hearts = "♥".repeat(count).padEnd(total, " ");
  const line = `\n[${hearts}]`;
  typeLine(line);
}

function showFinalMessage() {
  const finalMessage = "\n> FINAL MESSAGE UNLOCKED:\n\u2764\ufe0f You’re everything to me. You’ve seen me at my worst, laughed with me at my dumbest, and stayed when you didn’t have to. Happy Anniversary. You make life better just by being in it.";
  typeLine(finalMessage, showSprites);
}

function showSprites() {
  document.querySelectorAll('.sprite').forEach(sprite => {
    sprite.style.display = 'block';
  });
}
document.addEventListener("click", () => {
  const inputs = document.querySelectorAll('input[type="text"]:not([disabled])');
  if (inputs.length > 0) {
    inputs[inputs.length - 1].focus();
  }
});


window.onload = bootSequence;
