// /docs/js/terminal.js

document.addEventListener("DOMContentLoaded", () => {
  const output = document.getElementById("terminal-output");
  const form = document.getElementById("terminal-form");
  const input = document.getElementById("terminal-input");
  const fs = window.ObfuscateFS;

  const commandTips = {
    ls: "📘 List directories and files",
    cd: "📘 Change directory",
    cat: "📘 Display contents of a file",
    open: "📘 Launch GUI module",
    gui: "📘 Alias of 'open'",
    man: "📘 Manual page for a command",
    splash: "📘 Show welcome screen",
    pwd: "📘 Show current path",
    help: "📘 List available commands",
    clear: "📘 Clear screen"
  };

  const splashArt = `
    ██╗  ██╗ ██████╗ ██████╗ ██╗   ██╗███████╗███████╗
    ██║  ██║██╔═══██╗██╔══██╗╚██╗ ██╔╝██╔════╝██╔════╝
    ███████║██║   ██║██████╔╝ ╚████╔╝ █████╗  ███████╗
    ██╔══██║██║   ██║██╔═══╝   ╚██╔╝  ██╔══╝  ╚════██║
    ██║  ██║╚██████╔╝██║        ██║   ███████╗███████║
    ╚═╝  ╚═╝ ╚═════╝ ╚═╝        ╚═╝   ╚══════╝╚══════╝
  `;

  function markdownToTerminal(text) {
    return text
      .replace(/^# (.*$)/gm, "\n\u001b[1m$1\u001b[0m")
      .replace(/^• /gm, "  • ")
      .replace(/^-\s/gm, "  – ")
      .replace(/\$ ([^\n]+)/g, "\n  $ $1");
  }

  function typePrint(text, speed = 8, callback) {
    let i = 0;
    function printNext() {
      if (i < text.length) {
        output.innerHTML += text.charAt(i);
        i++;
        setTimeout(printNext, speed);
      } else if (callback) callback();
    }
    printNext();
  }

  function handleCommand(cmdLine) {
    const [cmdRaw, ...args] = cmdLine.trim().split(" ");
    const cmd = cmdRaw.toLowerCase();
    const arg = args[0];
    const current = fs.currentPath;
    const path = current === "/" ? `/${arg}` : `${current}/${arg}`;
    let result = "";
    let tip = commandTips[cmd] || "";

    switch (cmd) {
      case "ls":
        result = fs.structure[current]?.join("  ") || "Empty directory.";
        break;

      case "cd":
        if (!arg) result = "Usage: cd [folder]";
        else if (arg === "..") {
          fs.currentPath = current.split("/").slice(0, -1).join("/") || "/";
          result = `Moved to ${fs.currentPath}`;
        } else {
          const newPath = `${current}/${arg}`.replace(/\/+/g, "/");
          if (fs.structure[newPath]) {
            fs.currentPath = newPath;
            result = `Entered ${newPath}`;
          } else result = `No such folder: ${arg}`;
        }
        break;

      case "pwd":
        result = fs.currentPath;
        break;

      case "clear":
        return { result: "__CLEAR__", tip: "" };

      case "cat":
        result = fs.files[path]
          ? markdownToTerminal(fs.files[path])
          : `File not found: '${arg}'`;
        break;

      case "open":
      case "gui":
        const guiPaths = {
          cpu: "modules/cpu/cpu.html",
          sec: "modules/cpu/sec.html",
          keypair: "modules/crypto/keypair.html",
          cypher: "modules/crypto/cypher.html",
          net: "modules/net/net.html",
          guide: "modules/guide/guide.html",
          tools: "modules/crypto/tools.html",
          ethics: "modules/crypto/ethics.html",
          blockchain: "modules/blockchain/blockchain.html"
        };
        if (!arg) result = "Usage: open [module]";
        else if (guiPaths[arg]) window.location.href = guiPaths[arg];
        else result = `No GUI module named '${arg}'`;
        return { result, tip };

      case "man":
        result = commandTips[arg] || `No manual entry for '${arg}'`;
        break;

      case "splash":
        result = splashArt;
        break;

      case "help":
        result = Object.keys(commandTips).map(k => `• ${k}`).join("\n");
        break;

      default:
        result = `Unknown command: '${cmd}'`;
    }

    return { result, tip };
  }

  form.addEventListener("submit", e => {
    e.preventDefault();
    const userInput = input.value.trim();
    if (!userInput) return;
    output.innerHTML += `\n$ ${userInput}\n`;
    const { result, tip } = handleCommand(userInput);
    if (result === "__CLEAR__") output.innerHTML = "";
    else {
      if (tip) typePrint(`\n${tip}\n`, 10, () => typePrint(`\n${result}\n`));
      else typePrint(`\n${result}\n`);
    }
    input.value = "";
    output.scrollTop = output.scrollHeight;
  });

  typePrint("Obfuscate-OS v2.1\nType 'help' or 'splash' to begin.\n", 10);
});