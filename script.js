const terminal = document.getElementById("terminal");

const bootLines = [
  "\nlove@terminal:~$ booting loveOS v1.0",
  "love@terminal:~$ compiling feelings",
  "love@terminal:~$ running love_script.sh",
  "\n> Enter a number (1-5) to unlock a message",
  "> Or use help for more <3"
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
  line.classList.add("fade-in");
  terminal.appendChild(line);
  let i = 0;
  const interval = setInterval(() => {
    if (i < text.length) {
      line.textContent += text[i];
      i++;
      window.scrollTo(0, document.body.scrollHeight);
    } else {
      clearInterval(interval);
      if (callback) callback();
    }
  }, 40);
}

function showPrompt() {
  const inputLine = document.createElement("div");
  const inputId = `cmdInput_${Date.now()}`;
  inputLine.innerHTML = `<span>love@terminal:~$ </span><input id="${inputId}" type="text" autocomplete="off" style="background: transparent; border: none; color: rgb(255, 255, 255); outline: none; font-family: inherit; width: 80px; font-size: 16px;">`;
  terminal.appendChild(inputLine);
  window.scrollTo(0, document.body.scrollHeight);

  const input = document.getElementById(inputId);
  setTimeout(() => input.focus(), 50);

  input.addEventListener("keydown", event => {
    if (event.key === "Enter") {
      const val = input.value.trim().toLowerCase();
      input.disabled = true;
      handleCommand(val);
    }
  });
}

function handleCommand(inputVal) {
  if (["clear", "cls"].includes(inputVal)) {
    terminal.innerHTML = "";
    bootIndex = 0;
    return bootSequence();
  }

  if (inputVal === "help") {
    typeLine("> Valid options: 1 - 5\n> Commands: help, clear, exit, sudo love, 69, 404", showPrompt);
    return;
  }

  if (inputVal === "exit") {
    typeLine("> exiting loveOS... goodbye <3");
    return;
  }

  if (inputVal === "69") {
    typeLine("> Nice.", showPrompt);
    return;
  }

  if (inputVal === "404") {
    typeLine("> Love not found. Try again.", showPrompt);
    return;
  }

  if (inputVal === "sudo love") {
    typeLine("> You are now root of my heart ❤️", showPrompt);
    return;
  }

  if (inputVal === "love --version") {
    typeLine("> loveOS v1.0.∞-dev ❤️", showPrompt);
    return;
  }

  const val = parseInt(inputVal);
  const message = loveMessages.find(m => m.id === val);
  if (!message || revealedMessages.has(val)) {
    typeLine(`> Invalid or already viewed. Try a number 1-5.`, showPrompt);
    return;
  }

  revealedMessages.add(val);

  const processingLine = document.createElement("div");
  processingLine.className = "processing";
  processingLine.textContent = "> processing...";
  terminal.appendChild(processingLine);
  window.scrollTo(0, document.body.scrollHeight);

  setTimeout(() => {
    processingLine.remove();
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
  }, 800);
}

function displayHeartBar(count) {
  const total = loveMessages.length;
  const hearts = "♥".repeat(count).padEnd(total, " ");
  const line = `\n[${hearts}]`;
  typeLine(line);
}

function showFinalMessage() {
  const sequence = [
    "> compiling final message...",
    "> loading heart.exe...",
    "> ♥♥♥♥♥ COMPLETE",
    "\n> FINAL MESSAGE UNLOCKED:\n❤️ You’re everything to me. You’ve seen me at my worst, laughed with me at my dumbest, and stayed when you didn’t have to. Happy Anniversary. You make life better just by being in it.",
    "\n[🧑‍💻] 💞 [💘]"
  ];

  let i = 0;
  function next() {
    if (i < sequence.length) {
      typeLine(sequence[i], () => {
        i++;
        setTimeout(next, 800);
      });
    }
  }

  next();
}

window.onload = bootSequence;

document.addEventListener("click", () => {
  const inputs = document.querySelectorAll('input[type="text"]:not([disabled])');
  if (inputs.length > 0) {
    inputs[inputs.length - 1].focus();
  }
});
